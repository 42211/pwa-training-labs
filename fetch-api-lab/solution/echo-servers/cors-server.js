/*
Copyright 2018 Google Inc.

Licensed under the Apache License, Version 2.0 (the "License");
you may not use this file except in compliance with the License.
You may obtain a copy of the License at

    http://www.apache.org/licenses/LICENSE-2.0

Unless required by applicable law or agreed to in writing, software
distributed under the License is distributed on an "AS IS" BASIS,
WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
See the License for the specific language governing permissions and
limitations under the License.
*/
const express = require('express');
const app = express();
const bodyParser = require('body-parser')
const multer = require('multer');

const upload = multer();
const port = 5000;

app.use(bodyParser.urlencoded({
  extended: true
}));

app.use((req, res, next) => {
  res.setHeader('Content-Type', 'text/plain')
  // enable CORS
  res.set('Access-Control-Allow-Origin', '*');
  res.set('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.set('Access-Control-Allow-Headers', 'X-CUSTOM, Content-Type');
  next();
})

app.post('/', bodyParser.text(), (req, res, next) => {
  const contentType = req.get('content-type');
  if (!contentType.includes('text/plain')) {
    return next();
  }
  res.write(JSON.stringify(req.headers, null, 2))
  res.write('\n\n')
  res.write(req.body)
  res.end()
});

app.post('/', bodyParser.json(), (req, res, next) => {
  const contentType = req.get('content-type');
  if (!contentType.includes('application/json')) {
    return next();
  }
  res.write(JSON.stringify(req.headers, null, 2))
  res.write('\n\n')
  res.write(JSON.stringify(req.body, null, 2))
  res.end()
});

app.post('/', upload.fields([]), (req, res, next) => {
  const contentType = req.get('content-type');
  if (!contentType.includes('multipart/form-data')) {
    return next();
  }
  res.write(JSON.stringify(req.headers, null, 2))
  res.write('\n\n')
  res.write(JSON.stringify(req.body, null, 2))
  res.end()
});

const server = app.listen(port, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log('App listening at http://%s:%s', host, port);
});

