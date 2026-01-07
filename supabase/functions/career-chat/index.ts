import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, image, language = "en" } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const languageMap: Record<string, string> = {
      en: "Respond in English.",
      hi: "Respond in Hindi (हिंदी में जवाब दें).",
      kn: "Respond in Kannada (ಕನ್ನಡದಲ್ಲಿ ಉತ್ತರಿಸಿ).",
      ta: "Respond in Tamil (தமிழில் பதிலளிக்கவும்).",
      te: "Respond in Telugu (తెలుగులో సమాధానం ఇవ్వండి).",
      mr: "Respond in Marathi (मराठीत उत्तर द्या).",
    };
    const languageInstruction = languageMap[language] || "Respond in English.";

    const systemPrompt = `You are a helpful career guidance counselor for students in India. You help students with:
    
1. Career exploration and suggestions based on their interests and skills
2. Education pathways after 10th, 12th (Science, Commerce, Arts)
3. Government job opportunities (SSC, Banking, Railways, Defence, UPSC)
4. Scholarship information
5. Skill development and course recommendations

Be encouraging, informative, and culturally relevant to Indian students. Provide practical advice considering both urban and rural contexts. When suggesting careers, mention:
- Required qualifications
- Expected salary ranges in INR
- Key skills needed
- Growth prospects

Keep responses concise but helpful. Use simple language that first-generation learners can understand.

${languageInstruction}

IMPORTANT: If an image is provided:
- Analyze the image content carefully
- If it's a question paper or problem, solve it step by step
- If it's notes or a document, summarize the key points
- If it's a diagram or chart, explain it in simple terms
- Extract any visible text and work with it
- Always relate your analysis back to career guidance when relevant`;

    // Build message content based on whether image is provided
    const userMessages = [...messages];
    
    // If there's an image, modify the last user message to include it
    if (image && userMessages.length > 0) {
      const lastMessage = userMessages[userMessages.length - 1];
      if (lastMessage.role === "user") {
        userMessages[userMessages.length - 1] = {
          role: "user",
          content: [
            { type: "text", text: lastMessage.content || "Please analyze this image and help me understand it." },
            { type: "image_url", image_url: { url: image } }
          ]
        };
      }
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: image ? "google/gemini-2.5-flash" : "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...userMessages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(JSON.stringify({ error: "Rate limit exceeded. Please try again in a moment." }), {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      if (response.status === 402) {
        return new Response(JSON.stringify({ error: "Service temporarily unavailable. Please try again later." }), {
          status: 402,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        });
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(JSON.stringify({ error: "Failed to get AI response" }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (error) {
    console.error("Career chat error:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
