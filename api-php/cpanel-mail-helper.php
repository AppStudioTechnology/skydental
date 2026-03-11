<?php
/**
 * cPanel-only mail: send email using the server’s built-in mail (no Resend).
 * Use an address from cPanel → Email Accounts as FROM_EMAIL.
 * Returns [ 'success' => true ] or [ 'success' => false, 'message' => '...' ].
 */
function cpanel_send_email($from, $to, $subject, $html, $options = []) {
    $toAddress = is_array($to) ? $to[0] : $to;
    $replyTo = $options['reply_to'] ?? null;
    $attachments = $options['attachments'] ?? [];

    $boundary = '----=_Part_' . str_replace('.', '', uniqid('', true));
    $headers = [
        'MIME-Version: 1.0',
        'Content-Type: multipart/mixed; boundary="' . $boundary . '"',
        'From: ' . $from,
    ];
    if ($replyTo) {
        $replyToAddress = is_array($replyTo) ? $replyTo[0] : $replyTo;
        $headers[] = 'Reply-To: ' . $replyToAddress;
    }
    $headers[] = 'X-Mailer: PHP/' . PHP_VERSION;

    $body = "--{$boundary}\r\n";
    $body .= "Content-Type: text/html; charset=UTF-8\r\n";
    $body .= "Content-Transfer-Encoding: 7bit\r\n\r\n";
    $body .= $html . "\r\n";

    foreach ($attachments as $att) {
        $filename = $att['filename'] ?? 'attachment';
        $content = $att['content'];
        if (strpos($content, ',') !== false && preg_match('/^[a-z0-9+\/=]+$/i', $content) === 0) {
            $content = preg_replace('/^data:[^;]+;base64,/', '', $content);
        }
        $raw = base64_decode($content, true);
        if ($raw === false) {
            return ['success' => false, 'message' => 'Invalid attachment encoding'];
        }
        $mimeType = 'application/octet-stream';
        if (preg_match('/\.pdf$/i', $filename)) {
            $mimeType = 'application/pdf';
        } elseif (preg_match('/\.(doc|docx)$/i', $filename)) {
            $mimeType = 'application/msword';
        }
        $body .= "--{$boundary}\r\n";
        $body .= "Content-Type: {$mimeType}; name=\"" . addslashes($filename) . "\"\r\n";
        $body .= "Content-Transfer-Encoding: base64\r\n";
        $body .= "Content-Disposition: attachment; filename=\"" . addslashes($filename) . "\"\r\n\r\n";
        $body .= chunk_split(base64_encode($raw)) . "\r\n";
    }

    $body .= "--{$boundary}--";

    $sent = @mail($toAddress, $subject, $body, implode("\r\n", $headers));
    if ($sent) {
        return ['success' => true];
    }
    return ['success' => false, 'message' => 'Server mail() failed. Check cPanel Email or use an address from Email Accounts.'];
}

if (!function_exists('api_json_response')) {
    function api_json_response($data, $statusCode = 200) {
        http_response_code($statusCode);
        header('Content-Type: application/json; charset=utf-8');
        header('Access-Control-Allow-Origin: *');
        header('Access-Control-Allow-Methods: POST, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type');
        echo json_encode($data);
        exit;
    }
}
