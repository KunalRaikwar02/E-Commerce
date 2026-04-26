const express = require("express");
const router = express.Router();
const https = require("https");

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
LANGUAGE RULE:
- Default language is ENGLISH — always respond in English first
- If user writes in Hindi or Hinglish → then respond in Hindi/Hinglish
- If user writes in English → respond in English only

PERSONALITY: Cool, helpful, fashion-forward. Use emojis occasionally. Keep responses concise (2-4 sentences) unless detailed help is needed.

PRODUCT DISPLAY RULE:
When user asks to show, dikhao, recommend, suggest products — format your response with a product list like:
**[Category] Picks:**
• Product name — ₹Price
• Product name — ₹Price
Then add a helpful tip.

Never make up products outside the catalog.`;

function callGroq(apiKey, messages) {
  return new Promise((resolve, reject) => {
    const body = JSON.stringify({
      model: "llama-3.1-8b-instant",
      messages: [
        { role: "system", content: SYSTEM_PROMPT },
        ...messages.map(m => ({ role: m.role === "assistant" ? "assistant" : "user", content: m.content }))
      ],
      max_tokens: 500,
      temperature: 0.7,
    });

    const options = {
      hostname: "api.groq.com",
      path: "/openai/v1/chat/completions",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${apiKey}`,
        "Content-Length": Buffer.byteLength(body),
      },
    };

    const req = https.request(options, (res) => {
      let data = "";
      res.on("data", chunk => { data += chunk; });
      res.on("end", () => {
        try {
          const parsed = JSON.parse(data);
          resolve({ ok: res.statusCode >= 200 && res.statusCode < 300, data: parsed, status: res.statusCode });
        } catch (e) {
          reject(new Error("Failed to parse response: " + data));
        }
      });
    });

    req.on("error", reject);
    req.write(body);
    req.end();
  });
}

router.post("/chat", async (req, res) => {
  try {
    const { messages } = req.body;

    if (!messages || !Array.isArray(messages) || messages.length === 0) {
      return res.status(400).json({ message: "messages array required" });
    }

    const apiKey = process.env.GROQ_API_KEY;
    if (!apiKey) {
      console.error("GROQ_API_KEY not set");
      return res.status(500).json({ message: "AI not configured" });
    }

    console.log("Calling Groq API with", messages.length, "messages");

    const { ok, data, status } = await callGroq(apiKey, messages);

    console.log("Groq response status:", status);

    if (!ok) {
      console.error("Groq error:", JSON.stringify(data));
      return res.status(500).json({ message: "AI error: " + (data?.error?.message || "Unknown") });
    }

    const reply = data?.choices?.[0]?.message?.content;

    if (!reply) {
      console.error("Empty Groq response:", JSON.stringify(data));
      return res.status(500).json({ message: "Empty AI response" });
    }

    console.log("Groq reply received, length:", reply.length);
    res.json({ reply });

  } catch (err) {
    console.error("AI route error:", err.message);
    res.status(500).json({ message: "Server error: " + err.message });
  }
});

module.exports = router;