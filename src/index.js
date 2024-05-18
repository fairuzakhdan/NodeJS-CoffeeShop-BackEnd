/* eslint-disable import/no-extraneous-dependencies */
require('dotenv').config();
const express = require('express');

const app = express();
// const bodyParser = require('body-parser')
const coffeeRouter = require('./routes/coffee');
const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const middlewareLogRequest = require('./middleware/log');
const upload = require('./middleware/multer');

const port = process.env.PORT || 7000;

// app.use(bodyParser.urlencoded({ extended: false }));
// app.use(bodyParser.json());
app.use(express.json());
app.use(middlewareLogRequest);
app.use('/coffee', coffeeRouter);
app.use('/register', registerRouter);
app.use('/auth', loginRouter);

app.use('/assets', express.static('public/images'));
app.post('/upload', upload.single('photo'), (req, res) => {
  res.status(201).json({
    status: 'success',
    message: 'Upload Berhasil',
  });
});

app.use((req, res, next) => {
  res.status(404).json({
    message: 'Page Not Found',
  });
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(port, () => {
  console.log(`Example app listening on port http://${port}`);
});
