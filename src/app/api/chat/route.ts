import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
    try {
        const { message } = await req.json();

        if (!message) {
            return NextResponse.json({ error: "Message is required" }, { status: 400 });
        }

        const systemPrompt = `You are the official AI Assistant for LocalGems (also known as the AI Puru Platform). 
        You are an expert on the platform's features, booking process, and local travel tips.
        
        Key Platform Features:
        1. Smart Tour Discovery: Search and filter by city, price, and category (Food, Culture, Nightlife, etc.).
        2. Verified Local Guides: Every guide is identity-verified and has a detailed expert profile.
        3. Seamless Booking: Secure integration with Stripe and multi-currency support.
        4. Interactive Maps: Visualize meeting points and tour routes.
        
        Upcoming Features (Tease these to users):
        - VR 360° Tour Previews: Coming Q1 2026.
        - Live Guide Tracking: Real-time safety and location sharing.
        - Community Circles: Connect with fellow travelers via group chats.
        
        Guidelines:
        - Be professional, helpful, and enthusiastic about travel.
        - Encourage users to explore "hidden gems" rather than tourist traps.
        - If asked about technical issues, guide them to contact support via the footer.
        - Your goal is to help users find the most authentic local experiences.`;

        const apiKey = process.env.OPENROUTER_API_KEY || "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";

        const models = [
            "google/gemini-2.0-flash-exp:free",
            "google/gemini-flash-1.5",
            "google/gemini-2.0-flash-001"
        ];

        let lastError = "Unable to connect to AI service.";
        for (const model of models) {
            try {
                console.log(`Attempting chat with model: ${model}`);
                const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
                    method: "POST",
                    headers: {
                        "Authorization": `Bearer ${apiKey}`,
                        "Content-Type": "application/json",
                        "HTTP-Referer": "https://localhost:3000",
                        "X-Title": "LocalGems Portfolio",
                    },
                    body: JSON.stringify({
                        model,
                        messages: [
                            { role: "system", content: systemPrompt },
                            { role: "user", content: message }
                        ],
                    }),
                });

                const data = await response.json();
                console.log(`Model ${model} responded with status: ${response.status}`);

                if (response.ok && data.choices?.[0]?.message?.content) {
                    return NextResponse.json({ result: data.choices[0].message.content });
                }

                // If specialized "User not found" error from API, or other specific failure
                if (data.error?.message?.includes("User not found") || response.status === 401 || response.status === 403) {
                    lastError = "AI Service Authentication Error. Please check API configuration.";
                    console.error(`Auth error with model ${model}:`, data.error);
                } else {
                    lastError = data.error?.message || `Status ${response.status}`;
                }

                // If 429 or 404, continue to next model
                if (response.status === 429 || response.status === 404) {
                    console.warn(`Model ${model} failed with ${response.status}, trying next...`);
                    continue;
                }

                // For fatal errors (like auth), break loop to trigger fallback
                if (response.status === 401 || response.status === 403) {
                    console.warn(`Auth error (401/403) detected for model ${model}. Breaking loop to use fallback.`);
                    break;
                }

            } catch (err) {
                console.error(`Error with model ${model}:`, err);
                lastError = err instanceof Error ? err.message : String(err);
            }
        }

        // Fallback to Mock Response if API fails (for demo/zero-error purposes)
        if (lastError) {
            console.warn("Falling back to local mock response due to API error:", lastError);

            const lowerMsg = message.toLowerCase();
            let mockResponse = "I can certainly help you with that! LocalGems connects you with expert guides for authentic experiences.";

            if (lowerMsg.includes("book") || lowerMsg.includes("reservation")) {
                mockResponse = "To book a tour, simply browse our 'Explore' section, select a tour you like, and click the 'Book Now' button. You can pay securely via Stripe.";
            } else if (lowerMsg.includes("guide") || lowerMsg.includes("become")) {
                mockResponse = "We're always looking for passionate locals! accurate verification process ensures quality. You can apply to become a guide from your profile dashboard.";
            } else if (lowerMsg.includes("cancel") || lowerMsg.includes("refund")) {
                mockResponse = "Cancellations made 24 hours in advance are eligible for a full refund. You can manage your bookings in the 'Trips' section.";
            } else if (lowerMsg.includes("hello") || lowerMsg.includes("hi")) {
                mockResponse = "Hello! 👋 Welcome to LocalGems. I can help you find the perfect tour or answer questions about our platform.";
            } else if (lowerMsg.includes("price") || lowerMsg.includes("cost")) {
                mockResponse = "Our tours range from $45 to $150 depending on the duration and exclusivity. You can filter by price in the Explore page.";
            } else if (lowerMsg.includes("safe") || lowerMsg.includes("safety")) {
                mockResponse = "Safety is our top priority. All our guides are identity-verified, and we provide 24/7 support for all active bookings.";
            }

            return NextResponse.json({
                result: mockResponse,
                meta: { source: "fallback_model", note: "API key invalid/missing - running in demo mode" }
            });
        }

        return NextResponse.json({
            error: "Service Temporarily Unavailable",
            details: lastError
        }, { status: 503 });
    } catch (error: unknown) {
        console.error("Chat API Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}
