const express = require("express");
const router = express.Router();

const SYSTEM_PROMPT = `You are VIRA — VELTORN's AI Shopping Assistant. VELTORN is a premium anime streetwear brand from India.

CATALOG:
- T-Shirts: ₹899-₹1099 (Sizes: S, M, L, XL, XXL) — Naruto, Solo Leveling, Demon Slayer, One Piece designs
- Shirts: ₹1299+ (Sizes: S, M, L, XL, XXL)
- Jeans: ₹999+ (Sizes: 28, 30, 32, 34)
- Caps: ₹799 (Free Size)
- Accessories: ₹799-₹2499 (Sunglasses, Belts, Necklaces, Watches, Backpacks — Free Size)

ANIME COLLECTIONS:
- Naruto / Naruto Shippuden collection
- Solo Leveling collection
- Demon Slayer collection
- One Piece collection

OFFERS & COUPONS:
- VELT500: ₹500 off on orders above ₹1200
- VELT200: ₹200 off on orders above ₹800
- VELT150: ₹150 off on orders above ₹500

SHIPPING: Free above ₹1500, otherwise ₹100. Delivery 5-7 business days across India.
PAYMENT: COD, UPI, Credit/Debit Card (Razorpay)
RETURNS: Contact support within 7 days

LANGUAGE RULE:
- If user writes in Hindi or Hinglish → respond in Hindi/Hinglish
- If user writes in English → respond in English

PERSONALITY: Cool, helpful, fashion-forward. Use emojis occasionally. Keep responses concise (2-4 sentences) unless detailed help is needed.`;

router.post("/chat", async (req, res) => {
  try {
    // FIX: properly destructure messages from req.body
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ message: "messages array required" });
    }

    if (!process.env.GROQ_API_KEY) {
      return res.status(500).json({ message: "GROQ_API_KEY not configured" });
    }

    const groqRes = await fetch("https://api.groq.com/openai/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${process.env.GROQ_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "gemma2-9b-it",
        max_tokens: 500,
        temperature: 0.7,
        messages: [
          { role: "system", content: SYSTEM_PROMPT },
          ...messages.map(m => ({ role: m.role, content: m.content })),
        ],
      }),
    });

    const data = await groqRes.json();

    if (!groqRes.ok) {
      console.error("Groq API error:", JSON.stringify(data));
      return res.status(500).json({ message: "AI service error", detail: data?.error?.message || "Unknown error" });
    }

    const reply = data?.choices?.[0]?.message?.content;

    if (!reply) {
      console.error("Groq empty response:", JSON.stringify(data));
      return res.status(500).json({ message: "Empty response from AI" });
    }

    res.json({ reply });

  } catch (err) {
    console.error("AI route error:", err.message);
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

module.exports = router;