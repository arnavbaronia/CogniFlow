import { ChatOpenAI } from "@langchain/openai";
import { LLMChain } from "langchain/chains";
import { PromptTemplate } from "@langchain/core/prompts";

export const generate = async ({
  input,
  selectedTemplate,
}: {
  input: string;
  selectedTemplate: string;
}) => {
  try {
    const model = new ChatOpenAI({
      modelName: "gpt-3.5-turbo",
      temperature: 0.9,
      openAIApiKey: process.env.OPENAI_API_KEY,
    });

    const template =
      "{syntax} - {instructions} learn from syntax above and write {template} in mermaid syntax about {input}?";
    
    const prompt = new PromptTemplate({
      template,
      inputVariables: ["template", "input", "syntax", "instructions"],
    });

    const chain = new LLMChain({ llm: model, prompt });

    const syntaxDoc = await import(
      `@/lib/syntax/${selectedTemplate.toLowerCase()}.md`
    );

    const res = await chain.call({
      template: selectedTemplate,
      input,
      syntax: syntaxDoc.default,
      instructions: `
      - Use different shapes, colors, and icons when possible as mentioned in the doc.
      - Strict rules: Do not add Note, do not explain the code, and do not add any additional text except code.
      - Do not use 'end' syntax.
      - Do not use any parentheses inside the block.
      `,
    });

    return res;
  } catch (e: any) {
    console.error("OpenAI error:", e.message);
    throw e;
  }
};