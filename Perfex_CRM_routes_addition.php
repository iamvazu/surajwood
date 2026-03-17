<?php
/**
 * SurajWood API Routes
 * 
 * ADD THESE LINES to: [perfex-root]/application/config/routes.php
 * Add them BEFORE the line: $route['404_override'] = '';
 */

// SurajWood Website Lead API
$route['api/leads/create']  = 'api/website_leads/create';
$route['api/leads/health']  = 'api/website_leads/health';
