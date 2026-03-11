<?php
/**
 * Sky Dental – cPanel config. Copy this file to config.php and set your values.
 * Emails are sent using your cPanel server mail (PHP mail) and smile@skydc.ae.
 */
return [
    // Sender: must be an address from cPanel → Email Accounts. Use plain address to avoid delivery issues.
    'FROM_EMAIL' => 'smile@skydc.ae',

    // Where to receive booking confirmations
    'CLINIC_EMAIL' => 'smile@skydc.ae',

    // Job applications recipient
    'JOB_APPLICATIONS_EMAIL' => 'smile@skydc.ae',

    // Contact form recipient
    'CONTACT_INQUIRIES_EMAIL' => 'smile@skydc.ae',
];
