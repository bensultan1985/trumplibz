const http = require('http');
const path = require('path');
const fs = require('fs');
const fetch = require("node-fetch");

// const server = http.createServer((req, res) => {
//     if (req.url === '/') {
//         fs.readFile(path.join(__dirname, 'public', 'index.html'), (err, content) => {
//             if (err) throw err;
//             res.writeHead(200, { 'Content-Type': 'text/html'})
//             res.end(content)
//         })
//         fs.readFile(path.join(__dirname, 'public', 'style.css'), (err, content) => {
//             if (err) throw err;
//             res.writeHead(200, { 'Content-Type': 'text/css'})
//             res.end(content)
            
//         })
//         fs.readFile(path.join(__dirname, 'public', 'script.js'), (err, content) => {
//             if (err) throw err;
//             res.writeHead(200, { 'Content-Type': 'text/javascript'})
//             res.end(content)
//         })
//         fs.readFile(path.join(__dirname, 'public', 'favicon.ico'), (err, content) => {
//             if (err) throw err;
//             res.writeHead(200)
//             res.end(content)
//         })
//     }
// })

const express = require('express');

const app = express()

app.use(express.static(path.join(__dirname, 'public')))


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

let count = 0;

app.get('/nytimes', async (req, res) => {
let response = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=Trump&page=${count}&api-key=9hF6uiZFm8pPLDGLCGZoP3MhhVsHiMsL`).then(res => res.json());
res.send(response);
count++
console.log(count)
console.log(response.response.docs[0].abstract)
console.log('request made successfully');
//
})