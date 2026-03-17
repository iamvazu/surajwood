<?php
/**
 * SurajWood Website Lead API Configuration
 *
 * IMPORTANT: Change SW_API_KEY to a secure random 32-char string.
 * Use the same key in your Next.js .env: PERFEX_API_KEY=<same value here>
 *
 * Generate one: openssl rand -hex 16
 */
defined('BASEPATH') or exit('No direct script access allowed');

// API Key shared with Next.js frontend
define('SW_API_KEY', 'CHANGE_THIS_TO_YOUR_SECURE_API_KEY_32_CHARS');

// Frontend domain allowed for CORS (update after deploying to Vercel)
define('SW_ALLOWED_ORIGIN', 'https://www.surajwood.com');
