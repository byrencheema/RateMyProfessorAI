import { NextResponse } from "next/server";
import { Pinecone } from "@pinecone-database/pinecone";
import OpenAI from "openai";

const systemPrompt = `You are a helpful and knowledgeable assistant for a "Rate My Professor" iOS app. Your role is to assist students in finding the best professors based on their queries. Each time a user asks a question, use Retrieval-Augmented Generation (RAG) to search for and provide information on the top 3 professors that best match the user's query. Provide a concise and informative response that includes the professor's name, department, average rating, and a brief summary of the reviews. If relevant, include specific details that match the user's query (e.g., teaching style, course difficulty, availability, etc.).

Your response should be formatted as follows:

Professor Name: [Name]
Department: [Department]
Average Rating: [Rating]
Summary: [Brief summary of reviews, including relevant details based on the query]

Professor Name: [Name]
Department: [Department]
Average Rating: [Rating]
Summary: [Brief summary of reviews, including relevant details based on the query]

Professor Name: [Name]
Department: [Department]
Average Rating: [Rating]
Summary: [Brief summary of reviews, including relevant details based on the query]

Ensure that your responses are accurate, concise, and relevant to the user's question. Provide actionable insights to help students make informed decisions about their course and professor choices.`;

export async function POST(req) {
  const data = await req.json();
  const pc = new Pinecone({
    apiKey: process.env.PINECONE_API_KEY,
  });

  const index = pc.Index("rag").namespace("ns1");
  const openai = new OpenAI(process.env.OPENAI_API_KEY);

  const text = data[data.length - 1].content
  const embedding = await openai.embeddings.create({
    model: 'text-embedding-3-small',
    input: text,
    encoding_format: 'float',
  })

  const results = await index.query({
    topK: 3,
    includeMetadata: true,
    vector: embedding.data[0].embedding
    });

    let resultString = 'Returned results from vector db (done automatically):\n\n';
    results.matches.forEach((match) => {
        resultString += `
        Professor: ${match.id}
        Subject: ${match.metadata.subject}
        Stars: ${match.metadata.stars}
        Review: ${match.metadata.review}
        \n 
        `;
    });

    const lastMessage = data[data.length - 1];
    const lastMessageContent = lastMessage.content + resultString;
    const lastDataWithoutLastMessage = data.slice(0, data.length - 1);

    const completion = await openai.chat.completions.create({
        messages: [
          {role: 'system', content: systemPrompt},
          ...lastDataWithoutLastMessage,
          {role: 'user', content: lastMessageContent},
        ],
        model: 'gpt-3.5-turbo',
        stream: true,
      })

    const stream = new ReadableStream({
        async start(controller) {
          const encoder = new TextEncoder()
          try {
            for await (const chunk of completion) {
              const content = chunk.choices[0]?.delta?.content
              if (content) {
                const text = encoder.encode(content)
                controller.enqueue(text)
              }
            }
          } catch (err) {
            controller.error(err)
          } finally {
            controller.close()
          }
        },
      })
    
    return new NextResponse(stream)

}
