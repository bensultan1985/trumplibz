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

app.use(express.json());
app.use(express.urlencoded({extended: false}));

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));

app.post('/nytimes', async (req, res) => {
console.log(req.body.pagecount)
let response = await fetch(`https://api.nytimes.com/svc/search/v2/articlesearch.json?q=Trump&page=${req.body.pagecount}&api-key=9hF6uiZFm8pPLDGLCGZoP3MhhVsHiMsL`).then(res => res.json());
console.log(response)
res.send(response);
console.log('request made successfully');
//
})