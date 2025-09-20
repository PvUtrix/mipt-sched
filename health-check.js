#!/usr/bin/env node

const http = require('http');

const options = {
  hostname: 'localhost',
  port: 3000,
  path: '/api/health',
  method: 'GET',
  timeout: 5000
};

const req = http.request(options, (res) => {
  console.log(`Status: ${res.statusCode}`);
  console.log(`Headers: ${JSON.stringify(res.headers)}`);
  
  let data = '';
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('Response:', data);
    process.exit(res.statusCode === 200 ? 0 : 1);
  });
});

req.on('error', (err) => {
  console.error('Error:', err.message);
  process.exit(1);
});

req.on('timeout', () => {
  console.error('Timeout: Server did not respond within 5 seconds');
  req.destroy();
  process.exit(1);
});

req.end();
