const perfexUrl = 'https://surajwood.com/crm/api/leads/health';

async function test() {
  console.log('Testing Health Check at:', perfexUrl);

  try {
    const response = await fetch(perfexUrl);
    console.log('Status Code:', response.status);
    const text = await response.text();
    console.log('Response Body:', text);
  } catch (err) {
    console.error('Error:', err);
  }
}

test();
