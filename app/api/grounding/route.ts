import { GoogleGenAI, Type } from '@google/genai';
import { NextRequest, NextResponse } from 'next/server';

// Initialize the GoogleGenAI SDK with server-side API Key
// Telemetry User-Agent is set to 'aistudio-build' as required
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { query, type } = body;

    if (!query || typeof query !== 'string' || query.trim() === '') {
      return NextResponse.json({ error: 'Query is required and must be a valid string' }, { status: 400 });
    }

    const cleanQuery = query.trim();

    if (type === 'directory') {
      // Prompt for institution search
      const prompt = `Perform a real-time search about the film archive, museum, or film preservation institution named "${cleanQuery}".
We need accurate, up-to-date details about this institution. 
If it is a real film preservation vault, library, archive, or department, provide the information. 
Format your output as a raw JSON object with the following keys:
- title: The official name of the institution
- region: General city, state/country (e.g., "Bologna, Italy" or "Washington D.C., USA")
- status: Use one of these exact values: "Verified Archive", "Historical Vault", "Research Center", "Public Library"
- generalMission: A concise single-sentence summary of their primary archival mandate or purpose
- description: A highly informative paragraph (2-3 sentences) explaining their physical film preservation efforts, formats handled (e.g., 35mm, nitrate, safety film), and specialized scanning or liquid wet gate workflows if any.

Do not wrap the JSON output in markdown blocks (like \`\`\`json). Just return the raw JSON string.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              region: { type: Type.STRING },
              status: { type: Type.STRING },
              generalMission: { type: Type.STRING },
              description: { type: Type.STRING },
            },
            required: ['title', 'region', 'status', 'generalMission', 'description'],
          },
        },
      });

      const text = response.text || '';
      let parsedData;
      try {
        parsedData = JSON.parse(text.trim());
      } catch (err) {
        // Fallback parsing if JSON schema enforcement has issues
        parsedData = {
          title: cleanQuery,
          region: 'Global',
          status: 'Research Center',
          generalMission: 'Dedicated to cinematographic preservation and film restoration.',
          description: text || 'Details dynamically fetched from the web.',
        };
      }

      // Extract Grounding Metadata / Citations
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const sources = chunks
        .map((chunk: any) => ({
          title: chunk.web?.title || 'Web Reference',
          uri: chunk.web?.uri || '',
        }))
        .filter((source) => source.uri !== '');

      return NextResponse.json({
        data: parsedData,
        sources,
      });

    } else if (type === 'glossary') {
      // Prompt for technical glossary term search
      const prompt = `Perform a real-time search about the film restoration or physical preservation term: "${cleanQuery}".
Provide a concise but highly informative, technically accurate definitions of this term.
Format your output as a raw JSON object with the following keys:
- title: The standard name of the technical term or concept
- categoryLabel: The category label (e.g., "Film Stock & Formats", "Preservation & Storage", "Restoration Processes", "Scanning & Digitization", "Sound Preservation")
- shortDefinition: A single sentence summary defining the term.
- detailedExplainer: A longer, 2-3 sentence highly technical paragraph explaining the chemical, physical, or digital mechanics of this concept in film archives.

Do not wrap the JSON output in markdown blocks. Just return the raw JSON string.`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              categoryLabel: { type: Type.STRING },
              shortDefinition: { type: Type.STRING },
              detailedExplainer: { type: Type.STRING },
            },
            required: ['title', 'categoryLabel', 'shortDefinition', 'detailedExplainer'],
          },
        },
      });

      const text = response.text || '';
      let parsedData;
      try {
        parsedData = JSON.parse(text.trim());
      } catch (err) {
        parsedData = {
          title: cleanQuery,
          categoryLabel: 'Technical Process',
          shortDefinition: 'Concept fetched dynamically via search grounding.',
          detailedExplainer: text || 'Details dynamically fetched from the web.',
        };
      }

      // Extract Grounding Metadata / Citations
      const chunks = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];
      const sources = chunks
        .map((chunk: any) => ({
          title: chunk.web?.title || 'Web Reference',
          uri: chunk.web?.uri || '',
        }))
        .filter((source) => source.uri !== '');

      return NextResponse.json({
        data: parsedData,
        sources,
      });
    }

    return NextResponse.json({ error: 'Invalid search grounding type specified' }, { status: 400 });

  } catch (error: any) {
    console.error('Grounding API Error:', error);
    return NextResponse.json(
      { error: error.message || 'An unexpected error occurred during search grounding' },
      { status: 500 }
    );
  }
}
