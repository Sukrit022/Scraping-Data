import express from 'express';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();
const PORT = 8000;

// Define __dirname since it's not available in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Serve static files from the current directory
app.use(express.static(__dirname));

app.get('/gpus', (req, res) => {
  fs.readFile('gpuData.json', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading data');
    }
    res.json(JSON.parse(data));
  });
});

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// import express from 'express';
// import fs from 'fs';
// import cors from 'cors';
// import path from 'path';
// import { fileURLToPath } from 'url';

// const app = express();
// const PORT = 8000;

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = path.dirname(__filename);

// app.use(cors());

// app.get('/gpus', (req, res) => {
//   fs.readFile('gpuData.json', (err, data) => {
//     if (err) {
//       return res.status(500).send('Error reading data');
//     }
//     res.json(JSON.parse(data));
//   });
// });

// app.listen(PORT, () => {
//   console.log(`Server is running on http://localhost:${PORT}`);
// });
