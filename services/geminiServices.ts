
import { GoogleGenAI } from "@google/genai";

if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateLogo(businessIdea: string, logoStyle: string): Promise<string> {
    const prompt = `A ${logoStyle} logo design for a company named '${businessIdea}'`;

    try {
        const response = await ai.models.generateImages({
            model: 'imagen-3.0-generate-002',
            prompt: prompt,
            config: {
                numberOfImages: 1,
                outputMimeType: 'image/jpeg',
                aspectRatio: '1:1',
            },
        });

        if (response.generatedImages && response.generatedImages.length > 0) {
            const base64ImageBytes: string = response.generatedImages[0].image.imageBytes;
            return `data:image/jpeg;base64,${base64ImageBytes}`;
        } else {
            throw new Error("No image was generated. The response may have been blocked.");
        }
    } catch (error) {
        console.error("Error generating logo:", error);
        if (error instanceof Error) {
            throw new Error(`Failed to generate logo: ${error.message}`);
        }
        throw new Error("An unknown error occurred while generating the logo.");
    }
}
