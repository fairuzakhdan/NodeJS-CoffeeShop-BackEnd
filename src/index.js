require('dotenv').config();
const express = require('express');
const coffeeRouter = require('./routes/coffee');
const middlewareLogRequest = require('./middleware/log');
const upload = require('./middleware/multer');

const app = express();
const port = process.env.PORT || 7000;

app.use(express.json());
app.use(middlewareLogRequest);
app.use('/coffee', coffeeRouter);

app.use('/assets', express.static('public/images'));
app.post('/upload', upload.single('photo'), (req, res) => {
  res.status(201).json({
    status: 'success',
    message: 'Upload Berhasil',
  });
});
app.use((err, req, res) => {
  res.json({
    message: err.message,
  });
});
app.listen(port, () => {
  console.log(`Example app listening on port http://${port}`);
});
