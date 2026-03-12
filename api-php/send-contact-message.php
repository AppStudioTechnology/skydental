<?php
/**
 * Contact form API for cPanel. POST JSON: { fullName, emailAddress, phoneNumber?, subject, message }
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
        'message' => 'Copy config.sample.php to config.php and set FROM_EMAIL and CLINIC_EMAIL.',
    ], 500);
}
$config = require $configFile;
$to = $config['CLINIC_EMAIL'] ?? 'smile@skydc.ae';
$from = $config['FROM_EMAIL'] ?? null;
if (!$from) {
    api_json_response(['error' => 'FROM_EMAIL not set in config.php'], 500);
}

$raw = file_get_contents('php://input');
$body = json_decode($raw, true) ?: [];
$fullName = trim((string) ($body['fullName'] ?? ''));
$emailAddress = trim((string) ($body['emailAddress'] ?? ''));
$phoneNumber = trim((string) ($body['phoneNumber'] ?? ''));
$subject = trim((string) ($body['subject'] ?? ''));
$message = trim((string) ($body['message'] ?? ''));

if ($fullName === '' || $emailAddress === '') {
    api_json_response(['error' => 'Full name and email are required'], 400);
}
if (!filter_var($emailAddress, FILTER_VALIDATE_EMAIL)) {
    api_json_response(['error' => 'Invalid email address'], 400);
}

$emailSubject = 'Contact form: ' . ($subject !== '' ? $subject : 'No subject');
$html = '<p><strong>Name:</strong> ' . htmlspecialchars($fullName) . '</p>'
    . '<p><strong>Email:</strong> ' . htmlspecialchars($emailAddress) . '</p>'
    . '<p><strong>Phone:</strong> ' . htmlspecialchars($phoneNumber ?: '—') . '</p>'
    . '<p><strong>Subject:</strong> ' . htmlspecialchars($subject ?: '—') . '</p>'
    . '<p><strong>Message:</strong></p><p>' . nl2br(htmlspecialchars($message)) . '</p>';

$result = cpanel_send_email($from, $to, $emailSubject, $html);
if (!$result['success']) {
    api_json_response(['error' => 'Failed to send message', 'message' => $result['message'] ?? ''], 500);
}

api_json_response(['success' => true]);
