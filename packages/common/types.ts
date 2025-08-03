import { z } from 'zod';

export const TrainModelSchema = z.object({
    name: z.string(),
    age: z.number(),
    type: z.enum(['Man', 'Women', 'Other']),
    ethinicity: z.enum(['Asian American',
        'South Asian', 
        'South East Asian', 
        'Middle Eastern',
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