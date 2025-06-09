const fetch = require('node-fetch');

async function testAdminAuth() {
  try {
    console.log('Starting admin authentication tests...');
    
    // Test login functionality
    const loginResponse = await fetch('http://localhost:3000/api/admin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: 'ErikG', password: 'correct-password' })
    });
    
    if (!loginResponse.ok) throw new Error('Login failed');
    const loginData = await loginResponse.json();
    console.log('Login successful:', loginData);

    // Test accessing protected route
    const token = loginData.session.token;
    const protectedResponse = await fetch('http://localhost:3000/admin', {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!protectedResponse.ok) throw new Error('Access to protected route failed');
    console.log('Access to protected route successful');

    // Test logout functionality
    const logoutResponse = await fetch('http://localhost:3000/api/admin/logout', {
      method: 'POST',
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (!logoutResponse.ok) throw new Error('Logout failed');
    console.log('Logout successful');

    console.log('All admin authentication tests passed successfully!');

  } catch (error) {
    console.error('Test failed:', error);
  }
}

testAdminAuth();

