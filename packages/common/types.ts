import { z } from 'zod';

export const TrainModelSchema = z.object({
    name: z.string(),
    age: z.number(),
    type: z.enum(['Man', 'Women', 'Others']),
    ethinicity: z.enum(['Asian_American',
        'South_Asian', 
        'South_East_Asian', 
        'Middle_Eastern',
        'Black', 
        'Caucasian', 
        'Hispanic', 
        'Other'
    ]),
    eyeColor: z.enum(['Brown', 'Black', 'Blue', 'Green', 'Other']),
    bald: z.boolean(),
    images: z.array(z.string())
})

export const GenerateImageSchema = z.object({
    prompt: z.string(),
    modelId: z.string(),
    num: z.number()
});

export const GenerateImagePackSchema = z.object({
    modelId: z.string(),
    packId: z.string()
})