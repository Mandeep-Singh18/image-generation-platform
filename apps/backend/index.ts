import express from 'express';
import { GenerateImageSchema, GenerateImagePackSchema, TrainModelSchema } from 'common/types';

const app = express();
const PORT = process.env.PORT || 3000;

app.post('/ai/training', (req, res) => {
});

app.post('/ai/generate', (req, res) => {

});

app.post('/pack/generate', (req, res) => {
});

app.get('/pack/bulk', (req, res) => {
});

app.get('/image', (req, res) => {
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});