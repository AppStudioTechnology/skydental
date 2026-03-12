<?php
/**
 * Send email via PHP mail() (cPanel). Supports HTML body and base64 attachments.
 */

function api_json_response(array $data, int $code = 200) {
    http_response_code($code);
    header('Content-Type: application/json; charset=utf-8');
    echo json_encode($data);
    exit;
}

/**
 * @param string $from From address (e.g. smile@skydc.ae)
 * @param string $to To address
 * @param string $subject Subject line
 * @param string $htmlBody HTML body
 * @param array $options ['attachments' => [['filename' => 'x.pdf', 'content' => base64_string], ...]]
 * @return array ['success' => bool, 'message' => string]
 */
function cpanel_send_email(string $from, string $to, string $subject, string $htmlBody, array $options = []) {
    $boundary = '----_' . md5(uniqid());
    $headers = [
        'MIME-Version: 1.0',
        'From: ' . $from,
        'Content-Type: multipart/mixed; boundary="' . $boundary . '"',
    ];
    $body = "--$boundary\r\n";
    $body .= "Content-Type: text/html; charset=UTF-8\r\n\r\n";
    $body .= $htmlBody . "\r\n";

    $attachments = $options['attachments'] ?? [];
    foreach ($attachments as $att) {
        $filename = $att['filename'] ?? 'attachment';
        $content = $att['content'] ?? '';
        $decoded = base64_decode($content, true);
        if ($decoded === false) {
            return ['success' => false, 'message' => 'Invalid attachment encoding'];
        }
        $body .= "--$boundary\r\n";
        $body .= "Content-Type: application/octet-stream; name=\"" . $filename . "\"\r\n";
        $body .= "Content-Transfer-Encoding: base64\r\n";
        $body .= "Content-Disposition: attachment; filename=\"" . $filename . "\"\r\n\r\n";
        $body .= chunk_split(base64_encode($decoded)) . "\r\n";
    }
    $body .= "--$boundary--";

    $ok = @mail($to, $subject, $body, implode("\r\n", $headers));
    return ['success' => $ok, 'message' => $ok ? 'Sent' : 'mail() failed'];
}
