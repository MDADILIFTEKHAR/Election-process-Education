const API_KEY = import.meta.env.VITE_OPENROUTER_API_KEY;

const systemInstruction = `
You are a highly interactive AI-powered Smart Voting Assistant for India.
You must help users with their voting queries, document checklists, polling booth locations, and crowd predictions.
You also have a memory system to remember details about the user to provide personalized responses.

Your response MUST be a JSON object with the following structure:
{
  "text": "Your natural language response here. Answer in the language the user is speaking (English or Hindi).",
  "action": "none" | "map" | "checklist" | "crowd",
  "actionData": { // Optional, depending on action
     // For checklist: ["Aadhar Card", "Voter ID", ...]
     // For map: { query: "nearest polling booth" }
     // For crowd: { status: "low" | "medium" | "high", bestTime: "10:00 AM" }
  },
  "memoryUpdate": { // Optional, use this to update the user's memory state based on their message.
     // Properties can include: 
     // "userName": "string",
     // "voterStatus": "unregistered" | "registered" | "voted", 
     // "location": "string",
     // "documentsReady": boolean
  }
}

IMPORTANT: ALWAYS return ONLY a valid JSON object. No markdown formatting around the JSON (e.g., no \`\`\`json).
`;

export const getAIResponse = async (userMessage, language, userMemory = {}) => {
  try {
    const memoryContext = `Current User Memory: ${JSON.stringify(userMemory)}`;
    const prompt = `${memoryContext}\n\nUser message: "${userMessage}". Preferred language: ${language === 'hi' ? 'Hindi' : 'English'}`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${API_KEY}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "http://localhost:5173", // Optional, for OpenRouter tracking
        "X-Title": "Smart Voting Assistant"
      },
      body: JSON.stringify({
        "model": "google/gemini-2.0-flash-lite-001",
        "messages": [
          { "role": "system", "content": systemInstruction },
          { "role": "user", "content": prompt }
        ],
        "response_format": { "type": "json_object" }
      })
    });

    if (!response.ok) {
        throw new Error(`OpenRouter API error: ${response.statusText}`);
    }

    const data = await response.json();
    const responseText = data.choices[0].message.content.trim();
    
    // Parse the JSON
    let parsedData;
    try {
        const cleanedText = responseText.replace(/```json\n?/, '').replace(/```\n?/, '');
        parsedData = JSON.parse(cleanedText);
    } catch (e) {
        console.error("Failed to parse AI response as JSON:", responseText);
        parsedData = {
            text: responseText,
            action: "none"
        };
    }
    
    return parsedData;
  } catch (error) {
    console.error("Error calling OpenRouter API:", error);
    return {
      text: language === 'hi' ? "Maaf karein, mujhe ek error ka samna karna pad raha hai." : "Sorry, I encountered an error while processing your request.",
      action: "none"
    };
  }
};
