<?php
/**
 * Booking API for cPanel: send booking confirmation PDF to clinic and user.
 * POST JSON: { bookingId, booking: { fullName, email, ... }, pdfBase64, toUser?, toClinic? }
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
$bookingId = $body['bookingId'] ?? '';
$booking = $body['booking'] ?? null;
$pdfBase64 = $body['pdfBase64'] ?? '';
$toUser = $body['toUser'] ?? null;
$toClinic = $body['toClinic'] ?? ($config['CLINIC_EMAIL'] ?? 'smile@skydc.ae');
$from = $config['FROM_EMAIL'] ?? null;
if (!$from) {
    api_json_response(['error' => 'FROM_EMAIL not set in config.php. Use an email from cPanel → Email Accounts.'], 500);
}
if (!$bookingId || !$booking || !$pdfBase64) {
    api_json_response(['error' => 'Missing bookingId, booking, or pdfBase64'], 400);
}

$filename = 'Sky-Dental-Booking-' . $bookingId . '.pdf';
$attachments = [['filename' => $filename, 'content' => $pdfBase64]];

$clinicSubject = 'New appointment request – ' . ($booking['fullName'] ?? '') . ' – ' . $bookingId;
$clinicHtml = '<p><strong>New appointment request</strong></p>'
    . '<p>Booking ID: ' . htmlspecialchars($bookingId) . '</p>'
    . '<p>Name: ' . htmlspecialchars($booking['fullName'] ?? '') . '</p>'
    . '<p>Service: ' . htmlspecialchars($booking['service'] ?? '') . '</p>'
    . '<p>Doctor: ' . htmlspecialchars($booking['doctor'] ?? '') . '</p>'
    . '<p>Date: ' . htmlspecialchars($booking['date'] ?? '') . ' | Time: ' . htmlspecialchars($booking['time'] ?? '') . '</p>'
    . '<p>See attached PDF for full details.</p>';

$clinicResult = cpanel_send_email($from, $toClinic, $clinicSubject, $clinicHtml, ['attachments' => $attachments]);
if (!$clinicResult['success']) {
    api_json_response([
        'error' => 'Failed to send clinic email',
        'message' => $clinicResult['message'] ?? 'Email send failed',
    ], 500);
}

$userEmail = $toUser ?: ($booking['email'] ?? null);
if ($userEmail && !empty(trim($userEmail))) {
    $userSubject = 'Your appointment request – Sky Dental Center – ' . $bookingId;
    $userHtml = '<p>Dear ' . htmlspecialchars($booking['fullName'] ?? '') . ',</p>'
        . '<p>We have received your appointment request.</p>'
        . '<p><strong>Booking ID:</strong> ' . htmlspecialchars($bookingId) . '</p>'
        . '<p><strong>Service:</strong> ' . htmlspecialchars($booking['service'] ?? '') . '</p>'
        . '<p><strong>Doctor:</strong> ' . htmlspecialchars($booking['doctor'] ?? '') . '</p>'
        . '<p><strong>Date:</strong> ' . htmlspecialchars($booking['date'] ?? '') . ' | <strong>Time:</strong> ' . htmlspecialchars($booking['time'] ?? '') . '</p>'
        . '<p>Please find your confirmation details in the attached PDF.</p>'
        . '<p>— Sky Dental Center</p>';
    cpanel_send_email($from, $userEmail, $userSubject, $userHtml, ['attachments' => $attachments]);
}

api_json_response(['success' => true, 'bookingId' => $bookingId]);
