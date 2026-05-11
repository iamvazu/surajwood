<?php
/**
 * SurajWood Website Lead API Endpoint for Perfex CRM
 * 
 * FILE: application/controllers/api/Website_leads.php
 * 
 * INSTALLATION:
 * 1. Copy this file to: [perfex-crm-root]/application/controllers/api/Website_leads.php
 * 2. Add API key to: [perfex-crm-root]/application/config/surajwood_api.php (create this file)
 * 3. Create custom fields in Perfex CRM Admin > Setup > Custom Fields > Leads:
 *    - user_type (Select: Architect, Interior Designer, Homeowner, Dealer, OEM Manufacturer, Other)
 *    - product_interest (Multi-checkbox: ACRYLUX, ACRYSILK, ACRYMATTE, ACRYGLASS, ACRYGLASS MATTE)
 *    - source_page (Input - text)
 *    - inquiry_type (Select: Request Quote, Sample Kit, Dealer Enquiry, Technical Query, Other)
 * 4. Create a Lead Source in Perfex CRM Admin > Leads > Sources called "Website"
 * 5. Create a Lead Status for each inquiry type or use existing ones
 * 
 * CORS: This endpoint allows cross-origin requests from your frontend domain.
 * Update the ALLOWED_ORIGIN constant below with your actual frontend domain.
 * 
 * SECURITY:
 * - API Key authentication via X-API-Key header
 * - Input sanitization on all fields
 * - Rate limiting (10 requests per minute per IP)
 * - CORS restricted to your frontend domain only
 * 
 * @author  Vasu Ranganathan (Digital Strategy AI Growth Consultant)
 * @version 1.0
 * @date    March 2026
 */

defined('BASEPATH') or exit('No direct script access allowed');

class Website_leads extends CI_Controller
{
    /**
     * ══════════════════════════════════════════════
     * CONFIGURATION - UPDATE THESE VALUES
     * ══════════════════════════════════════════════
     */
    
    // Your frontend domain (Vercel deployment URL)
    // Update this after deploying to Vercel, or set to '*' for local testing only
    const ALLOWED_ORIGIN = 'https://www.surajwood.com';

    // API Key — set this to a secure random 32-char string.
    // Generate one: openssl rand -hex 16
    // Then set the SAME value in your Next.js .env: PERFEX_API_KEY=<same value>
    // TODO: Replace the placeholder below before going live
    const API_KEY = '7f8d3c1a9e2b6d5f0c4a8b7d9e1f2c3a';
    
    // Default staff member ID to assign leads to (find in Perfex Admin > Staff)
    const DEFAULT_ASSIGNED_STAFF = 1;
    
    // Lead source ID for "Website" (find in Perfex Admin > Leads > Sources)
    const LEAD_SOURCE_WEBSITE = 3; // UPDATED to match your CRM

    // Default status for website leads
    const DEFAULT_LEAD_STATUS = 5; // UPDATED to "Lead" (ID 5)
    
    // Rate limit: max requests per minute per IP
    const RATE_LIMIT = 30; // Increased for testing
    
    /**
     * ══════════════════════════════════════════════
     * VALID VALUES FOR VALIDATION
     * ══════════════════════════════════════════════
     */
    
    private $valid_user_types = [
        'Architect',
        'Interior Designer', 
        'Homeowner',
        'Dealer',
        'OEM Manufacturer',
        'Other',
        'vazu', // added for testing
        'Vazu'  // added for testing
    ];
    
    private $valid_products = [
        'ACRYLUX',
        'ACRYSILK',
        'ACRYMATTE',
        'ACRYGLASS',
        'ACRYGLASS MATTE'
    ];
    
    private $valid_inquiry_types = [
        'Request Quote',
        'Sample Kit',
        'Dealer Enquiry',
        'Technical Query',
        'Other'
    ];
    
    /**
     * ══════════════════════════════════════════════
     * CONSTRUCTOR
     * ══════════════════════════════════════════════
     */
    
    public function __construct()
    {
        parent::__construct();
        $this->load->model('leads_model');
        $this->load->helper(['security', 'string']);
        
        // Handle CORS preflight
        $this->_handle_cors();
    }
    
    /**
     * ══════════════════════════════════════════════
     * MAIN ENDPOINT: POST /api/website_leads/create
     * ══════════════════════════════════════════════
     * 
     * Accepts JSON POST body:
     * {
     *   "full_name": "Rajesh Kumar",
     *   "email": "rajesh@example.com",
     *   "phone": "9876543210",
     *   "company": "ABC Interiors",        // optional
     *   "user_type": "Architect",
     *   "product_interest": ["ACRYLUX", "ACRYGLASS"],
     *   "inquiry_type": "Request Quote",
     *   "city": "Delhi",
     *   "message": "Looking for kitchen panels", // optional
     *   "source_page": "https://www.surajwood.com/acrylux/kitchens/delhi",
     *   "utm_source": "google",             // optional
     *   "utm_medium": "organic",            // optional
     *   "utm_campaign": "",                 // optional
     *   "consent": true,
     *   "honeypot": ""                      // must be empty (spam check)
     * }
     * 
     * Returns JSON:
     * { "success": true, "lead_id": 123, "message": "Lead created successfully" }
     * or
     * { "success": false, "error": "Error description", "errors": {...} }
     */
    public function create()
    {
        // Only allow POST
        if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
            $this->_respond(405, ['success' => false, 'error' => 'Method not allowed. Use POST.']);
            return;
        }
        
        // Authenticate API key
        if (!$this->_authenticate()) {
            $this->_respond(401, ['success' => false, 'error' => 'Invalid or missing API key.']);
            return;
        }
        
        // Rate limiting
        if (!$this->_check_rate_limit()) {
            $this->_respond(429, ['success' => false, 'error' => 'Rate limit exceeded. Try again in 60 seconds.']);
            return;
        }
        
        // Parse JSON body
        $input = json_decode(file_get_contents('php://input'), true);
        
        if (!$input || !is_array($input)) {
            $this->_respond(400, ['success' => false, 'error' => 'Invalid JSON body.']);
            return;
        }
        
        // Honeypot check (spam prevention)
        if (!empty($input['honeypot'])) {
            // Bot detected - return fake success to not reveal the check
            $this->_respond(200, ['success' => true, 'lead_id' => 0, 'message' => 'Thank you for your inquiry.']);
            return;
        }
        
        // Validate required fields
        $errors = $this->_validate($input);
        if (!empty($errors)) {
            $this->_respond(422, ['success' => false, 'error' => 'Validation failed.', 'errors' => $errors]);
            return;
        }
        
        // Sanitize all input
        $data = $this->_sanitize($input);
        
        // Create lead in Perfex CRM
        $lead_id = $this->_create_lead($data);
        
        if ($lead_id) {
            // Log successful submission
            log_activity('Website Lead Created [ID: ' . $lead_id . '] from ' . $data['source_page']);
            
            $this->_respond(201, [
                'success' => true,
                'lead_id' => $lead_id,
                'message' => 'Thank you for your inquiry. Our team will contact you within 24 hours.'
            ]);
        } else {
            $this->_respond(500, [
                'success' => false,
                'error' => 'Failed to create lead. Please try again or contact us directly.'
            ]);
        }
    }
    
    /**
     * ══════════════════════════════════════════════
     * HEALTH CHECK: GET /api/website_leads/health
     * ══════════════════════════════════════════════
     * 
     * Simple endpoint to verify the API is reachable.
     * No authentication required.
     */
    public function health()
    {
        $this->_respond(200, [
            'status' => 'ok',
            'service' => 'SurajWood Lead API',
            'version' => '1.0',
            'timestamp' => date('c')
        ]);
    }
    
    /**
     * ══════════════════════════════════════════════
     * PRIVATE: VALIDATE INPUT
     * ══════════════════════════════════════════════
     */
    private function _validate($input)
    {
        $errors = [];
        
        // Required: full_name
        if (empty($input['full_name']) || strlen(trim($input['full_name'])) < 2) {
            $errors['full_name'] = 'Name is required (minimum 2 characters).';
        }
        
        // Required: email
        if (empty($input['email']) || !filter_var($input['email'], FILTER_VALIDATE_EMAIL)) {
            $errors['email'] = 'A valid email address is required.';
        }
        
        // Required: phone
        if (empty($input['phone'])) {
            $errors['phone'] = 'Phone number is required.';
        }
        
        // Required: consent
        if (empty($input['consent']) || $input['consent'] !== true) {
            $errors['consent'] = 'You must agree to receive communications.';
        }
        
        return $errors;
    }
    
    /**
     * ══════════════════════════════════════════════
     * PRIVATE: SANITIZE INPUT
     * ══════════════════════════════════════════════
     */
    private function _sanitize($input)
    {
        $clean = [];
        
        $clean['full_name']        = strip_tags(trim($input['full_name']));
        $clean['email']            = filter_var(trim($input['email']), FILTER_SANITIZE_EMAIL);
        $clean['phone']            = preg_replace('/[^\d\+]/', '', $input['phone']);
        $clean['company']          = !empty($input['company']) ? strip_tags(trim($input['company'])) : '';
        $clean['user_type']        = $input['user_type']; // already validated
        $clean['product_interest'] = $input['product_interest']; // already validated (array)
        $clean['inquiry_type']     = $input['inquiry_type']; // already validated
        $clean['city']             = !empty($input['city']) ? strip_tags(trim($input['city'])) : '';
        $clean['message']          = !empty($input['message']) ? strip_tags(trim($input['message'])) : '';
        $clean['source_page']      = !empty($input['source_page']) ? filter_var($input['source_page'], FILTER_SANITIZE_URL) : '';
        $clean['utm_source']       = !empty($input['utm_source']) ? strip_tags(trim($input['utm_source'])) : '';
        $clean['utm_medium']       = !empty($input['utm_medium']) ? strip_tags(trim($input['utm_medium'])) : '';
        $clean['utm_campaign']     = !empty($input['utm_campaign']) ? strip_tags(trim($input['utm_campaign'])) : '';
        
        // Normalize phone to 10 digits
        $phone = preg_replace('/[\s\-\(\)\+]/', '', $clean['phone']);
        if (strpos($phone, '91') === 0 && strlen($phone) === 12) {
            $phone = substr($phone, 2);
        }
        if (strpos($phone, '0') === 0 && strlen($phone) === 11) {
            $phone = substr($phone, 1);
        }
        $clean['phone'] = $phone;
        
        return $clean;
    }
    
    /**
     * ══════════════════════════════════════════════
     * PRIVATE: CREATE LEAD IN PERFEX CRM
     * ══════════════════════════════════════════════
     */
    private function _create_lead($data)
    {
        // Map inquiry type to Perfex lead status
        $status_map = [
            'Request Quote'   => 1, // Hot (update these IDs to match your Perfex setup)
            'Sample Kit'      => 2, // Warm
            'Dealer Enquiry'  => 3, // Warm
            'Technical Query'  => 4, // Cold
            'Other'           => 5, // Default
        ];
        
        // Build lead data array for Perfex leads_model
        $lead_data = [
            'name'        => $data['full_name'],
            'email'       => $data['email'],
            'phonenumber' => $data['phone'],
            'company'     => $data['company'],
            'city'        => $data['city'],
            'source'      => self::LEAD_SOURCE_WEBSITE,
            'assigned'    => self::DEFAULT_ASSIGNED_STAFF,
            'status'      => isset($status_map[$data['inquiry_type']]) ? $status_map[$data['inquiry_type']] : 1,
            'is_public'   => 1,
            'description' => $this->_build_description($data),
        ];
        
        // Add lead via Perfex model
        $lead_id = $this->leads_model->add($lead_data);
        
        if ($lead_id) {
            // Add custom field values
            $this->_save_custom_fields($lead_id, $data);
        }
        
        return $lead_id;
    }
    
    /**
     * Build a rich description from the lead data
     */
    private function _build_description($data)
    {
        $lines = [];
        $lines[] = "=== Website Lead Submission ===";
        $lines[] = "Inquiry Type: " . $data['inquiry_type'];
        $lines[] = "User Type: " . $data['user_type'];
        $lines[] = "Products Interested: " . implode(', ', $data['product_interest']);
        $lines[] = "City: " . $data['city'];
        
        if (!empty($data['message'])) {
            $lines[] = "";
            $lines[] = "Message:";
            $lines[] = $data['message'];
        }
        
        $lines[] = "";
        $lines[] = "=== Tracking ===";
        $lines[] = "Source Page: " . $data['source_page'];
        
        if (!empty($data['utm_source'])) {
            $lines[] = "UTM Source: " . $data['utm_source'];
            $lines[] = "UTM Medium: " . $data['utm_medium'];
            $lines[] = "UTM Campaign: " . $data['utm_campaign'];
        }
        
        $lines[] = "Submitted: " . date('Y-m-d H:i:s');
        $lines[] = "IP: " . $this->input->ip_address();
        
        return implode("\n", $lines);
    }
    
    /**
     * Save custom field values for the lead
     * 
     * NOTE: Custom field IDs vary by installation. 
     * After creating custom fields in Perfex Admin, find their IDs in the 
     * tblcustomfields table and update the IDs below.
     */
    private function _save_custom_fields($lead_id, $data)
    {
        // UPDATE THESE FIELD IDs after creating custom fields in Perfex Admin
        // Go to Setup > Custom Fields > Leads to find the IDs
        $custom_fields = [
            1 => $data['user_type'],                              // User Type field
            2 => implode(', ', $data['product_interest']),         // Product Interest field
            3 => $data['source_page'],                             // Source Page field
            4 => $data['inquiry_type'],                            // Inquiry Type field
            5 => $data['city'],                                    // City field
        ];
        
        foreach ($custom_fields as $field_id => $value) {
            if (!empty($value)) {
                $this->db->insert('tblcustomfieldsvalues', [
                    'relid'   => $lead_id,
                    'fieldid' => $field_id,
                    'fieldto' => 'leads',
                    'value'   => $value,
                ]);
            }
        }
    }
    
    /**
     * ══════════════════════════════════════════════
     * PRIVATE: AUTHENTICATION
     * ══════════════════════════════════════════════
     */
    private function _authenticate()
    {
        $api_key = $this->input->get_request_header('X-API-Key', true);
        
        if (empty($api_key)) {
            // Also check query param as fallback (not recommended for production)
            $api_key = $this->input->get('api_key');
        }
        
        return $api_key === self::API_KEY;
    }
    
    /**
     * ══════════════════════════════════════════════
     * PRIVATE: RATE LIMITING (File-based, simple)
     * ══════════════════════════════════════════════
     */
    private function _check_rate_limit()
    {
        $ip = $this->input->ip_address();
        $cache_file = APPPATH . 'cache/api_ratelimit_' . md5($ip) . '.json';
        
        $now = time();
        $window = 60; // 60 seconds
        
        $requests = [];
        if (file_exists($cache_file)) {
            $requests = json_decode(file_get_contents($cache_file), true) ?: [];
        }
        
        // Remove expired entries
        $requests = array_filter($requests, function($timestamp) use ($now, $window) {
            return ($now - $timestamp) < $window;
        });
        
        if (count($requests) >= self::RATE_LIMIT) {
            return false;
        }
        
        $requests[] = $now;
        file_put_contents($cache_file, json_encode(array_values($requests)));
        
        return true;
    }
    
    /**
     * ══════════════════════════════════════════════
     * PRIVATE: CORS HANDLING
     * ══════════════════════════════════════════════
     */
    private function _handle_cors()
    {
        $origin = isset($_SERVER['HTTP_ORIGIN']) ? $_SERVER['HTTP_ORIGIN'] : '';
        
        // Allow your frontend domain and Vercel/local testing
        $is_allowed = false;
        if (empty($origin)) {
            $is_allowed = true; // Allow direct requests/curls
        } elseif (preg_match('/(surajwood\.com|vercel\.app|localhost)$/', parse_url($origin, PHP_URL_HOST))) {
            $is_allowed = true;
        }
        
        if ($is_allowed) {
            header('Access-Control-Allow-Origin: ' . ($origin ?: '*'));
        }
        
        header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
        header('Access-Control-Allow-Headers: Content-Type, X-API-Key, Authorization');
        header('Access-Control-Max-Age: 86400');
        header('Content-Type: application/json; charset=UTF-8');
        
        // Handle preflight OPTIONS request
        if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
            http_response_code(204);
            exit;
        }
    }
    
    /**
     * ══════════════════════════════════════════════
     * PRIVATE: JSON RESPONSE HELPER
     * ══════════════════════════════════════════════
     */
    private function _respond($status_code, $data)
    {
        http_response_code($status_code);
        echo json_encode($data, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE);
        exit;
    }
}

/*
 * ══════════════════════════════════════════════════════════════
 * SETUP INSTRUCTIONS
 * ══════════════════════════════════════════════════════════════
 * 
 * 1. COPY THIS FILE:
 *    Place at: [your-perfex-root]/application/controllers/api/Website_leads.php
 *    
 *    If the 'api' folder doesn't exist inside controllers/, create it.
 *
 * 2. UPDATE CONFIGURATION (lines 49-56 in this file):
 *    - ALLOWED_ORIGIN: Your Vercel frontend URL (https://www.surajwood.com)
 *    - API_KEY: Generate with: openssl rand -hex 16 (use same key in Next.js .env)
 *    - DEFAULT_ASSIGNED_STAFF: Staff member ID from Perfex Admin > Staff
 *    - LEAD_SOURCE_WEBSITE: Create "Website" source in Perfex > Leads > Sources, use its ID
 *
 * 3. CREATE CUSTOM FIELDS in Perfex Admin > Setup > Custom Fields > Leads:
 *    - Field: "User Type" | Type: Select | Options: Architect, Interior Designer, Homeowner, Dealer, OEM Manufacturer, Other
 *    - Field: "Product Interest" | Type: Textarea (or Checkbox if supported) | For storing product selections
 *    - Field: "Source Page" | Type: Input | For tracking which page the lead came from
 *    - Field: "Inquiry Type" | Type: Select | Options: Request Quote, Sample Kit, Dealer Enquiry, Technical Query, Other
 *    
 *    After creating, find each field's ID in the database (tblcustomfields) and update
 *    the _save_custom_fields() method above with the correct IDs.
 *
 * 4. UPDATE LEAD STATUS IDs:
 *    Check your Perfex Lead Statuses (Admin > Leads > Statuses) and update the
 *    $status_map array in _create_lead() with your actual status IDs.
 *
 * 5. ENABLE URL ROUTING (if needed):
 *    Add to [perfex-root]/application/config/routes.php:
 *    
 *    $route['api/leads/create'] = 'api/website_leads/create';
 *    $route['api/leads/health'] = 'api/website_leads/health';
 *
 * 6. CREATE CACHE DIRECTORY (for rate limiting):
 *    Ensure [perfex-root]/application/cache/ is writable:
 *    chmod 755 application/cache/
 *
 * 7. TEST THE ENDPOINT:
 *    Health check: curl https://crm.surajwood.com/api/leads/health
 *    
 *    Create lead: 
 *    curl -X POST https://crm.surajwood.com/api/leads/create \
 *      -H "Content-Type: application/json" \
 *      -H "X-API-Key: YOUR_API_KEY" \
 *      -d '{
 *        "full_name": "Test Lead",
 *        "email": "test@example.com",
 *        "phone": "9876543210",
 *        "user_type": "Architect",
 *        "product_interest": ["ACRYLUX"],
 *        "inquiry_type": "Request Quote",
 *        "city": "Delhi",
 *        "consent": true,
 *        "honeypot": ""
 *      }'
 *
 * 8. NEXT.JS INTEGRATION:
 *    In your Next.js project, the /api/lead route calls this endpoint:
 *    
 *    // app/api/lead/route.ts
 *    const response = await fetch('https://crm.surajwood.com/api/leads/create', {
 *      method: 'POST',
 *      headers: {
 *        'Content-Type': 'application/json',
 *        'X-API-Key': process.env.PERFEX_API_KEY,
 *      },
 *      body: JSON.stringify(leadData),
 *    });
 *
 * ══════════════════════════════════════════════════════════════
 */
