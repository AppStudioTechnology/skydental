<?php
/**
 * Job application API for cPanel. POST JSON: { name, email, cvBase64, cvFilename }
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
$name = trim((string) ($body['name'] ?? ''));
$email = trim((string) ($body['email'] ?? ''));
$cvBase64 = $body['cvBase64'] ?? '';
$cvFilename = trim((string) ($body['cvFilename'] ?? 'CV.pdf'));

if ($name === '' || $email === '') {
    api_json_response(['error' => 'Name and email are required'], 400);
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    api_json_response(['error' => 'Invalid email address'], 400);
}
if ($cvBase64 === '') {
    api_json_response(['error' => 'CV file is required'], 400);
}

// Sanitize filename for attachment
$cvFilename = preg_replace('/[^a-zA-Z0-9._-]/', '_', $cvFilename) ?: 'CV.pdf';
if (strpos($cvFilename, '.') === false) {
    $cvFilename .= '.pdf';
}

$attachments = [['filename' => $cvFilename, 'content' => $cvBase64]];
$subject = 'Job application from ' . $name;
$html = '<p><strong>Name:</strong> ' . htmlspecialchars($name) . '</p>'
    . '<p><strong>Email:</strong> ' . htmlspecialchars($email) . '</p>'
    . '<p>CV attached.</p>';

$result = cpanel_send_email($from, $to, $subject, $html, ['attachments' => $attachments]);
if (!$result['success']) {
    api_json_response(['error' => 'Failed to send application', 'message' => $result['message'] ?? ''], 500);
}

api_json_response(['success' => true]);
