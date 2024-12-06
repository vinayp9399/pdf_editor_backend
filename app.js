const express = require('express');
const path = require('path');
const multer = require('multer');
const cors = require('cors');

const app = express();
app.use(cors());

const upload = multer({ dest: 'uploads/' });

app.post('/upload', upload.single('file'), (req, res) => {
  const filePath = req.file.path;
  res.json({ filePath });
});

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(5000, () => console.log('Server running on http://localhost:5000'));
