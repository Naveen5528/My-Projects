const http = require('http');
const fs = require('fs');
const path = require('path');
const db = require('./config');

db.connect(err => {
  if (err) throw err;
  console.log("Connected to MySQL.");
});

const server = http.createServer((req, res) => {
  if (req.url === '/' && req.method === 'GET') {
    fs.readFile('./form.html', (err, data) => {
      if (err) {
        res.writeHead(500);
        return res.end('Error loading form.');
      }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });

  } else if (req.url === '/submit' && req.method === 'POST') {
    let body = '';
    req.on('data', chunk => { body += chunk.toString(); });
    req.on('end', () => {
      const formData = new URLSearchParams(body);

      // Handle multiple skills (skills[])
      const skills = formData.getAll('skills[]');
      const skillsString = skills.join(', ');  // Combine into one string

      // Prepare data for DB
      const values = [
        formData.get('fname'),
        formData.get('mname'),
        formData.get('lname'),
        formData.get('dob'),
        formData.get('age'),
        formData.get('gender'),
        formData.get('nationality'),
        formData.get('mail'),
        formData.get('ph'),
        formData.get('address'),
        formData.get('city'),
        formData.get('state'),
        formData.get('zip'),
        formData.get('X_Marks'),
        formData.get('XII_Marks'),
        formData.get('Deg_percent'),
        formData.get('position'),
        formData.get('experience'),
        formData.get('linkedin'),
        skillsString,
        formData.get('cover')
      ];

      const sql = `
        INSERT INTO applications (
          fname, mname, lname, dob, age, gender, nationality, email, phone,
          address, city, state, zip,
          x_marks, xii_marks, degree_percent,
          position, experience, linkedin, skills, cover_letter
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
      `;

      db.query(sql, values, (err, result) => {
        if (err) {
          console.error(err);
          res.writeHead(500);
          return res.end("Error saving to database.");
        }

        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.end('<h2>Application submitted successfully!</h2>');
      });
    });

  } else {
    res.writeHead(404);
    res.end("Not Found");
  }
});

server.listen(3000, () => {
  console.log("Server running at http://localhost:3000");
});