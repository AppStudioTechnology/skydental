<?php
/**
 * Contact / general inquiry API for cPanel: send message to clinic.
 * POST JSON: { fullName, emailAddress, phoneNumber?, subject, message }
 */
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit;
}
require __DIR__ . '/cpanel-mail-helper.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    api_json_response(['error' => 'Method not allowed'], 405);
}

$configFile = __DIR__ . '/config.php';
if (!is_file($configFile)) {
    api_json_response([
        'error' => 'Config missing',
        'message' => 'Copy config.sample.php to config.php and set FROM_EMAIL (e.g. smile@skydc.ae) and recipients.',
    ], 500);
}
$config = require $configFile;

$raw = file_get_contents('php://input');
$body = json_decode($raw, true) ?: [];
$fullName = trim($body['fullName'] ?? '');
$emailAddress = trim($body['emailAddress'] ?? '');
$phoneNumber = trim($body['phoneNumber'] ?? '');
$subject = trim($body['subject'] ?? '');
$message = trim($body['message'] ?? '');
$from = $config['FROM_EMAIL'] ?? null;
$to = $config['CONTACT_INQUIRIES_EMAIL'] ?? 'smile@skydc.ae';
if (!$from) {
    api_json_response(['error' => 'FROM_EMAIL not set in config.php. Use an email from cPanel → Email Accounts.'], 500);
}
if (!$fullName || !$emailAddress || !$subject || !$message) {
    api_json_response(['error' => 'Missing required fields: full name, email, subject, message'], 400);
}

$subjectLine = 'Contact: ' . (strlen($subject) > 60 ? substr($subject, 0, 60) . '…' : $subject);
$html = '<p><strong>New message from the website contact form</strong></p>'
    . '<p><strong>Name:</strong> ' . htmlspecialchars($fullName) . '</p>'
    . '<p><strong>Email:</strong> ' . htmlspecialchars($emailAddress) . '</p>';
if ($phoneNumber !== '') {
    $html .= '<p><strong>Phone:</strong> ' . htmlspecialchars($phoneNumber) . '</p>';
}
$html .= '<p><strong>Subject:</strong> ' . htmlspecialchars($subject) . '</p>'
    . '<p><strong>Message:</strong></p><p>' . nl2br(htmlspecialchars($message)) . '</p>';

$result = cpanel_send_email($from, $to, $subjectLine, $html, ['reply_to' => $emailAddress]);
if (!$result['success']) {
    api_json_response([
        'error' => 'Failed to send message',
        'message' => $result['message'] ?? 'Email service error',
    ], 500);
}

api_json_response(['success' => true]);
