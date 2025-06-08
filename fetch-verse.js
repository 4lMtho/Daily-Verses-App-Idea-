// fetch-verse.js
const fs = require('fs');
const https = require('https');

const verse = 'John 3:16'; // You can rotate or randomize this later

https.get(`https://bible-api.com/${encodeURIComponent(verse)}`, (res) => {
  let data = '';
  res.on('data', chunk => data += chunk);
  res.on('end', () => {
    fs.writeFileSync('verse-of-the-day.json', data);
    console.log('Verse saved successfully.');
  });
}).on('error', (err) => {
  console.error('Error fetching verse:', err.message);
});
