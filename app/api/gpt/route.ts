import { OpenAI } from "openai";
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(request: Request) {
  // Check if the OpenAI API key is configured
  // Parse the request body
  const req = await request.json();
  // Extract the audio data from the request body
  const text = req.text;
  const prompt =
    "Return the 3 most related reviews in bullet points listed below that talks about " +
    text +
    ":" +
    "\nReviews:\n" +
    req.reviews;
  console.log(prompt);
  const response = await openai.chat.completions.create({
    model: "gpt-3.5-turbo",
    max_tokens: 100,
    messages: [{ role: "user", content: prompt }],
  });
  // Convert the Base64 audio data back to a Buffer
  try {
    // Convert the audio data to text
    // Return the transcribed text in the response
    return NextResponse.json(
      { result: response.choices[0].message.content },
      { status: 200 }
    );
  } catch (error) {
    // Handle any errors that occur during the request
    if (error.response) {
      console.error(error.response.status, error.response.data);
      return NextResponse.json({ error: error.response.data }, { status: 500 });
    } else {
      console.error(`Error with OpenAI API request: ${error.message}`);
      return NextResponse.json(
        { error: "An error occurred during your request." },
        { status: 500 }
      );
    }
  }
}
import { NextResponse } from "next/server";
