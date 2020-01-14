'use strict'

const fs = require('fs');
var nodemon = require('nodemon');
try {
  if (!fs.existsSync('.env')) {
    console.log('***************************************************');
    console.log('***Please run ./setup.sh or configure .env file!***');
    console.log('***************************************************');
    nodemon.emit('quit');
  }
} catch (err) { console.error(err) }
require('dotenv').config();
const http = require('http');
const https = require('https');
const express = require('express');
const Base64 = require('js-base64').Base64;
const jwt = require('jsonwebtoken');
const bodyParser = require('body-parser');
const cors = require('cors');
const readline = require('readline');
const cmd = require('node-cmd');

const PORT = process.env.PORT || 3000;
const PORTS = process.env.PORTS || 8080;
const options = {
  key: fs.readFileSync(process.env.KEY),
  cert: fs.readFileSync(process.env.CERT),
};
const tokenExperation = '1d';

const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.enable('trust proxy');

//Web Front End
app.use(function (req, res, next) {
  if (req.secure) { // request was via https, so do no special handling   
    next();
  } else { // request was via http, so redirect to https
    res.redirect('https://' + req.headers.host.split(':')[0] + ':' + PORTS + req.url);
  }
});

app.use(express.static('./public'));

app.get('/', (req, res) => {
  res.sendFile('index.html', { root: './public' });
});

let elements = JSON.parse(fs.readFileSync('database/elements/0_Elements.json'));
function getElements() {
  let results = [];
  for (let i = 0; i < elements.length; i++) {
    results.push(JSON.parse(fs.readFileSync(`database/elements/${elements[i].file}`)));
  }
  elements = results;
}
getElements();

app.post('/api/ptoe', (req, res) => { // Periodic table of elements.
  let request = req.body;
  console.log("Body:", req.body);
  res.sendStatus(200);
});

function serverIncriment() {
  let nodePackage = JSON.parse(fs.readFileSync('package.json'));
  let formatting = nodePackage.version.split('.');
  formatting[2]++;

  return nodePackage.version
}

app.listen(PORT, () => {
  console.log('HTTP Listening on port:', PORT, 'use CTRL+C to close.')
});

const server = https.createServer(options, app).listen(PORTS, function () {
  console.log('HTTPS Listening on port:', PORTS, 'use CTRL+C to close.')
  console.log('Server started:', new Date());
  console.log('Currently running on Version', serverIncriment());
  console.log('Type man to see a list of available CLI commands.');
});

// Admin console commands
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

rl.on('line', (input) => {
  if (input.split(' ')[0] === 'man') {
    CLI.manual();
  } else if (input.split(' ')[0] === 'status') {
    const used = process.memoryUsage();
    for (let key in used) {
      console.log(`${key} ${Math.round(used[key] / 1024 / 1024 * 100) / 100} MB`);
    }
  } else if (input.split(' ')[0] === 'elements') {
    console.log(elements);
  } else if (input.split(' ')[0] === 'sha256') {
    console.log("sha256:", CLI.sha256(input.substr(input.indexOf(' ') + 1)));
  } else if (input.split(' ')[0] === 'sha512') {
    console.log("sha512:", CLI.sha512(input.substr(input.indexOf(' ') + 1)));
  } else if (input.split(' ')[0] === 'pbkdf2') {
    CLI.pbkdf2(input.substr(input.indexOf(' ') + 1));
  } else if (input.split(' ')[0] === 'users') {
    console.log("Users:", users);
  } else {
    console.log(input, 'is not a valid input')
  };
});

// Verify Token
function verifyToken(req, res, next) {
  console.log("Verifying Token")
  let bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    let bearer = bearerHeader.split(' ');
    let bearerToken = bearer[1];
    req.token = JSON.parse(bearerToken)
    jwt.verify(req.token, options.key, (err, authData) => {
      if (err) {
        console.log('token error:', err)
        res.sendStatus(403);
      } else {
        next();
      }
    })
  } else {
    console.log('Not Authorized')
    res.sendStatus(403);
  }
};

// Verify Token Admin
function verifyTokenAdmin(req, res, next) {
  console.log("Verifying Token")
  let bearerHeader = req.headers['authorization'];
  if (typeof bearerHeader !== 'undefined') {
    let bearer = bearerHeader.split(' ');
    let bearerToken = bearer[1];
    req.token = JSON.parse(bearerToken)
    jwt.verify(req.token, options.key, (err, authData) => {
      if (err) {
        console.log('token error:', err)
        res.sendStatus(403);
      } else {
        if (authData.permissions === "admin") {
          next();
        } else {
          console.log('Not Authorized')
          res.sendStatus(403);
        }
      }
    })
  } else {
    console.log('Not Authorized')
    res.sendStatus(403);
  }
};