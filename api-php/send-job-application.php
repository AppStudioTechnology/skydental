<?php
/**
 * Job application API for cPanel: send CV and details to clinic.
 * POST JSON: { name, email, cvBase64, cvFilename }
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
$name = trim($body['name'] ?? '');
$email = trim($body['email'] ?? '');
$cvBase64 = $body['cvBase64'] ?? '';
$cvFilename = $body['cvFilename'] ?? '';
$from = $config['FROM_EMAIL'] ?? null;
$to = $config['JOB_APPLICATIONS_EMAIL'] ?? 'smile@skydc.ae';
if (!$from) {
    api_json_response(['error' => 'FROM_EMAIL not set in config.php. Use an email from cPanel → Email Accounts.'], 500);
}
if (!$name || !$email || !$cvBase64) {
    api_json_response(['error' => 'Missing name, email, or CV file'], 400);
}

$filename = $cvFilename && preg_match('/^[\w.-]+\.(pdf|doc|docx)$/i', $cvFilename)
    ? $cvFilename
    : 'CV-' . preg_replace('/\s+/', '-', $name) . '.pdf';
$attachments = [['filename' => $filename, 'content' => $cvBase64]];

$jobSubject = 'Job Application - ' . $name;
$jobHtml = '<p><strong>New job application</strong></p>'
    . '<p><strong>Name:</strong> ' . htmlspecialchars($name) . '</p>'
    . '<p><strong>Email:</strong> ' . htmlspecialchars($email) . '</p>'
    . '<p>CV is attached.</p>';
$result = cpanel_send_email($from, $to, $jobSubject, $jobHtml, ['attachments' => $attachments]);
if (!$result['success']) {
    $msg = $result['message'] ?? 'Email service error';
    if (preg_match('/only send testing emails|verify a domain/i', $msg)) {
        $msg = "We're temporarily unable to receive applications by email. Please send your CV directly to smile@skydc.ae.";
    }
    api_json_response(['error' => 'Failed to send application', 'message' => $msg], 500);
}

api_json_response(['success' => true]);
