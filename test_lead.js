const perfexUrl = 'https://surajwood.com/crm/api/leads/create';
const perfexKey = '7f8d3c1a9e2b6d5f0c4a8b7d9e1f2c3a';

async function test() {
  const payload = {
    full_name: 'Test Lead Vasu',
    email: 'test@example.com',
    phone: '9876543210',
    company: 'Test Company',
    user_type: 'Architect',
    product_interest: ['ACRYLUX'],
    inquiry_type: 'Request Quote',
    city: 'Delhi',
    message: 'Testing API connection',
    source_page: 'https://surajvercel-rho.vercel.app/contact',
    consent: true,
    honeypot: ''
  };

  console.log('Sending payload to:', perfexUrl);

  try {
    const response = await fetch(perfexUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': perfexKey
      },
      body: JSON.stringify(payload)
    });

    console.log('Status Code:', response.status);
    const text = await response.text();
    console.log('Response Body:', text);
  } catch (err) {
    console.error('Error:', err);
  }
}

test();
