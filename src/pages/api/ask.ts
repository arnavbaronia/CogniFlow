import { NextApiRequest, NextApiResponse } from "next";
import { ChatOpenAI } from "@langchain/openai";  // Updated import path
import { sanitizeText } from "@/lib/helpers";
import { promptByTemplate, TemplateEnum } from "@/lib/prompt-by-template";
import { generate } from "@/lib/generate";

const chat = new ChatOpenAI({
  modelName: "gpt-3.5-turbo",
  temperature: 0,
  openAIApiKey: process.env.OPENAI_API_KEY,
});

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { input, selectedTemplate = TemplateEnum.FLOWCHART } = req.body;

  if (!input) {
    return res.status(400).json({ message: "No input in the request" });
  }

  try {
    const ans = await generate({ input, selectedTemplate });

    // Clean up the response
    const text = ans.text
      .replaceAll("```", "")
      .replaceAll(`"`, `'`)
      .replaceAll(`end[End]`, `ends[End]`)
      .replace("mermaid", "");

    return res.status(200).json({ text });
  } catch (e: any) {
    console.error("Error generating response:", e.message);
    return res.status(500).json({ error: e.message });
  }
}