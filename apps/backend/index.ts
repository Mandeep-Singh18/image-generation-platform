import express from 'express';
import { GenerateImageSchema, GenerateImagePackSchema, TrainModelSchema } from 'common/types';
import { prismaClient } from 'db';
const app = express();

const USERID = '1111'
const PORT = process.env.PORT || 8080;
app.use(express.json());
 
app.post('/ai/training', async (req, res) => {
  const parsedbody = TrainModelSchema.safeParse(req.body);

  if(!parsedbody.success) {
    res.status(411).json({
      message: 'Incorrects Inputs'
    })
    return;
  }

  const data = await prismaClient.model.create({
    data: {
      name: parsedbody.data.name,
      type: parsedbody.data.type,
      age: parsedbody.data.age,
      ethnicity: parsedbody.data.ethinicity,
      eyecolor: parsedbody.data.eyeColor,
      bald: parsedbody.data.bald,
      userId: USERID
    }
  })

  res.json({
    modelId: data.id,
    message: 'Model created successfully'
  })
});

app.post('/ai/generate',async (req, res) => {
  const parsedbody = GenerateImageSchema.safeParse(req.body);
  
  if(!parsedbody.success) {
    res.status(411).json({
      message: 'Incorrects Inputs'
    })
    return;
  }

  const data = await prismaClient.outputImages.create({
    data: {
      prompt: parsedbody.data.prompt,
      modelId: parsedbody.data.modelId,
      userId: USERID,
      imageUrl: ""
    }
  })

  res.json({
    message: 'Image generation started',
    imageId: data.id
  })
});

app.post('/pack/generate',async (req, res) => {
  const parsedbody = GenerateImagePackSchema.safeParse(req.body);

  if(!parsedbody.success) {
    res.status(411).json({
      message: 'Incorrects Inputs'
    })
    return;
  }

  const prompts = await prismaClient.packPrompts.findMany({
    where: {
      packId: parsedbody.data.packId,
    }
  })

  const images = await prismaClient.outputImages.createManyAndReturn({
    data: prompts.map((prompt: { prompt: string }) => ({
      prompt: prompt.prompt,
      modelId: parsedbody.data.modelId,
      userId: USERID,
      imageUrl: ""
    }))
  })

  res.json({
    images: images.map((image: { id: string }) => image.id),
  });
});

app.get('/pack/bulk',async (req, res) => {
  const packs =await prismaClient.packs.findMany({})
  res.json({
    packs
  })
});

app.get('/image/bulk',async (req, res) => {  
  const ids = req.query.images as string[];
  const limit = req.query.limit ? parseInt(req.query.limit as string) : 10;
  const offset = req.query.offset ? parseInt(req.query.offset as string) : 0; 

  const imageData = await prismaClient.outputImages.findMany({
    where: {
      id: {
        in: ids
      },
      userId: USERID
    },
    skip: offset,
    take: limit
  })

  res.json({
    images: imageData
  })
});

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});