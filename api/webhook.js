
import { GoogleGenAI } from "@google/genai";

/**
 * Serverless function to handle Telegram Bot Webhook updates.
 * Expected environment variables:
 * - TELEGRAM_BOT_TOKEN: Your bot token from @BotFather
 * - API_KEY: Your Google Gemini API Key
 * - OWNER_CHAT_ID: (Optional) Your numeric Telegram ID to receive notifications
 */

export default async function handler(req, res) {
  if (req.method === 'GET') {
    const hasToken = !!process.env.TELEGRAM_BOT_TOKEN;
    const hasApiKey = !!process.env.API_KEY;
    const hasOwnerId = !!process.env.OWNER_CHAT_ID;
    
    return res.status(200).json({
      status: "Webhook handler is reachable",
      check_list: {
        telegram_token_detected: hasToken,
        gemini_api_key_detected: hasApiKey,
        owner_notification_id_set: hasOwnerId
      },
      setup_tip: "To receive notifications when people chat with your bot, message the bot '/myid' and save that number as OWNER_CHAT_ID in Vercel."
    });
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const token = process.env.TELEGRAM_BOT_TOKEN;
  const ownerId = process.env.OWNER_CHAT_ID;
  const body = req.body;

  if (!body || !body.message) {
    return res.status(200).send('OK'); 
  }

  const chatId = body.message.chat.id;
  const userText = body.message.text || "";
  const firstName = body.message.from?.first_name || "Customer";

  try {
    let responseText = "";

    // 1. Handle Commands
    if (userText.startsWith('/start')) {
      responseText = `Hello ${firstName}! Welcome to Suds & Scents! 🧼✨\n\nI'm your AI assistant. You can ask me about our handmade soaps, ingredients, or how to place an order.`;
      
      // Notify owner that a new customer started the bot
      if (ownerId && chatId.toString() !== ownerId.toString()) {
        await sendTelegramMessage(token, ownerId, `👤 *New Customer Alert*\n${firstName} (@${body.message.from?.username || 'no_username'}) just started the bot.`);
      }
    } 
    // UTILITY: Help owner find their Chat ID
    else if (userText.startsWith('/myid')) {
      responseText = `Your numeric Telegram Chat ID is: \`${chatId}\``;
    }
    // 2. Handle Order Summaries (If sent to bot by mistake)
    else if (userText.includes('New Soap Order') || userText.includes('🧼')) {
      responseText = "I've detected an order summary! 📝 Our team has been notified and will reach out to you soon. Thank you! ✨";
      
      // Forward the order to the owner if they have the bot open
      if (ownerId) {
        await sendTelegramMessage(token, ownerId, `📦 *Order forwarded from Bot:*\n\n${userText}`);
      }
    }
    // 3. Handle general queries using Gemini AI
    else {
      if (!process.env.API_KEY) throw new Error("API_KEY missing.");
      
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const prompt = `You are a helpful customer service assistant for "Suds & Scents", an artisanal handmade soap shop. 
      Customer name: ${firstName}
      Message: "${userText}"
      
      Respond politely and concisely. We sell: Dish Soap, Ombox (Rice), Crispy Rice, and Papaya.`;

      const aiResponse = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: prompt,
      });

      responseText = aiResponse.text || "I'm sorry, I'm having trouble thinking. Please contact us at phornphandy20@gmail.com";

      // Notify owner of the question
      if (ownerId && chatId.toString() !== ownerId.toString()) {
        await sendTelegramMessage(token, ownerId, `💬 *Bot Chat Notification*\nUser: ${firstName}\nQ: ${userText}\nAI: ${responseText}`);
      }
    }

    await sendTelegramMessage(token, chatId, responseText);
    return res.status(200).json({ status: 'success' });
  } catch (error) {
    console.error('Webhook Error:', error);
    return res.status(200).send('Error processed');
  }
}

async function sendTelegramMessage(token, chatId, text) {
  if (!token) return;
  const url = `https://api.telegram.org/bot${token}/sendMessage`;
  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      chat_id: chatId,
      text: text,
      parse_mode: 'Markdown'
    })
  });
}
