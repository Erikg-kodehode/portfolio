#!/usr/bin/env node

/**
 * Comprehensive test script for portfolio functionality
 * Run with: node test-all-functionality.js
 */

require('dotenv').config({ path: '.env.local' });

const baseUrl = process.env.NEXTAUTH_URL || 'https://myportfolio-git-dev-fjorfotts-projects.vercel.app';

console.log('🧪 Starting comprehensive functionality tests...');
console.log('🌐 Base URL:', baseUrl);

// Test configurations
const tests = [
  {
    name: 'Contact Form Submission',
    method: 'POST',
    endpoint: '/api/contact',
    body: {
      name: 'Test User',
      email: 'test@example.com',
      subject: 'Test Contact Form',
      message: 'This is a test message from the automated test script.'
    }
  },
  {
    name: 'CV Request Submission (English)',
    method: 'POST',
    endpoint: '/api/cv-request',
    body: {
      name: 'John Doe',
      email: 'john.test@example.com',
      company: 'Test Corporation',
      purpose: 'Testing the CV request functionality for English users.',
      isEnglish: true
    }
  },
  {
    name: 'CV Request Submission (Norwegian)',
    method: 'POST',
    endpoint: '/api/cv-request',
    body: {
      name: 'Ole Hansen',
      email: 'ole.test@example.com',
      company: 'Test Firma AS',
      purpose: 'Tester CV-forespørsel funksjonaliteten for norske brukere.',
      isEnglish: false
    }
  },
  {
    name: 'Invalid Login Attempt',
    method: 'POST',
    endpoint: '/api/admin',
    body: {
      username: 'wrong-user',
      password: 'wrong-password'
    },
    expectError: true
  },
  {
    name: 'Protected Route Without Auth',
    method: 'GET',
    endpoint: '/api/cv-request/list',
    expectError: true
  }
];

async function runTest(test) {
  console.log(`\n🔍 Testing: ${test.name}`);
  
  try {
    const options = {
      method: test.method,
      headers: {
        'Content-Type': 'application/json',
        'User-Agent': 'Portfolio-Test-Script/1.0'
      }
    };

    if (test.body) {
      options.body = JSON.stringify(test.body);
    }

    const response = await fetch(`${baseUrl}${test.endpoint}`, options);
    const data = await response.json();

    if (test.expectError) {
      if (!response.ok) {
        console.log('✅ Expected error received:', response.status, data.error);
      } else {
        console.log('❌ Expected error but got success:', data);
      }
    } else {
      if (response.ok) {
        console.log('✅ Success:', data.message || 'Request completed successfully');
      } else {
        console.log('❌ Unexpected error:', response.status, data.error);
      }
    }

    // Log response details
    console.log(`   Status: ${response.status}`);
    console.log(`   Response time: ${response.headers.get('date') ? 'Available' : 'N/A'}`);

  } catch (error) {
    console.log('❌ Network error:', error.message);
  }
}

async function testEnvironmentVariables() {
  console.log('\n🔧 Checking Environment Variables:');
  
  const required = [
    'DATABASE_URL',
    'NEXTAUTH_SECRET', 
    'RESEND_API_KEY',
    'CV_URL_EN',
    'CV_URL_NO',
    'ADMIN_EMAIL'
  ];

  required.forEach(env => {
    const value = process.env[env];
    if (!value) {
      console.log(`❌ Missing: ${env}`);
    } else if (value.includes('[your-') || value.includes('placeholder')) {
      console.log(`⚠️  Placeholder detected: ${env}`);
    } else {
      console.log(`✅ ${env}: ${value.substring(0, 20)}...`);
    }
  });
}

async function testGoogleDocsUrls() {
  console.log('\n📄 Testing Google Docs CV URLs:');
  
  const urls = {
    'English CV': process.env.CV_URL_EN,
    'Norwegian CV': process.env.CV_URL_NO
  };

  for (const [name, url] of Object.entries(urls)) {
    if (!url) {
      console.log(`❌ ${name}: URL not set`);
      continue;
    }

    try {
      console.log(`🔍 Testing ${name}: ${url.substring(0, 50)}...`);
      const response = await fetch(url, { method: 'HEAD' });
      
      if (response.ok) {
        console.log(`✅ ${name}: Accessible (${response.status})`);
        console.log(`   Content-Type: ${response.headers.get('content-type')}`);
      } else {
        console.log(`❌ ${name}: Error ${response.status}`);
      }
    } catch (error) {
      console.log(`❌ ${name}: Network error - ${error.message}`);
    }
  }
}

async function main() {
  // Test environment variables first
  await testEnvironmentVariables();
  
  // Test Google Docs URLs
  await testGoogleDocsUrls();
  
  // Run API tests
  console.log('\n🚀 Running API Tests:');
  for (const test of tests) {
    await runTest(test);
    await new Promise(resolve => setTimeout(resolve, 1000)); // Wait 1 second between tests
  }

  console.log('\n🏁 All tests completed!');
  console.log('\nNext steps:');
  console.log('1. Check your email for test messages');
  console.log('2. Log into admin panel to see test CV requests');
  console.log('3. Approve test requests to verify email functionality');
  console.log('4. Check system logs in admin panel for detailed information');
}

// Run the tests
main().catch(console.error);

