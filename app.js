const express = require('express');
const path = require('path');
const multer = require('multer');
const cors = require('cors');
const fs = require('fs');

const app = express();
app.use(cors());

const upload = multer({ dest: 'uploads/' });

const uploadFolder = path.join(__dirname, 'uploads');

const emptyUploadFolder = async () => {
  try {
    // Read all files in the folder
    const files = await fs.promises.readdir(uploadFolder);

    // Iterate over each file and delete it
    for (const file of files) {
      const filePath = path.join(uploadFolder, file);
      await fs.promises.unlink(filePath); // Delete the file
    }

    console.log('Upload folder emptied successfully.');
  } catch (error) {
    console.error('Error while emptying the upload folder:', error);
  }
};

app.get('/empty-files', async (req, res) => {
  await emptyUploadFolder();
  res.send('Upload folder has been emptied.');
});



app.post('/upload', upload.single('file'), (req, res) => {
  const filePath = req.file.path;
  res.json({ filePath });
});

// Serve the fonts folder as static files
app.use('/fonts', express.static(path.join(__dirname, 'fonts')));

// Endpoint to download a specific font
app.get('/download-font/:fontName', (req, res) => {
  const fontName = req.params.fontName;
  const fontPath = path.join(__dirname, 'fonts', fontName);

  // Check if the font file exists
  res.sendFile(fontPath, (err) => {
    if (err) {
      res.status(404).send('Font file not found');
    }
  });
});


app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.listen(5000, () => console.log('Server running on https://pdf-editor-backend-mgej.onrender.com'));
