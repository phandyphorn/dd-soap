
// export default async function handler(req, res) {
//   if (req.method !== 'POST') {
//     return res.status(405).json({ error: 'Method Not Allowed' });
//   }

//   const { phone, address, items, total } = req.body;

//   if (!phone || !address || !items || !total) {
//     return res.status(400).json({ error: 'Missing required order fields' });
//   }

//   // Clean environment variables (remove quotes and whitespace)
//   const token = (process.env.TELEGRAM_BOT_TOKEN || "").replace(/['"]/g, '').trim();
//   const ownerChatId = (process.env.OWNER_CHAT_ID || "").replace(/['"]/g, '').trim();

//   if (!token || !ownerChatId) {
//     console.error('Environment variables missing or empty: TELEGRAM_BOT_TOKEN or OWNER_CHAT_ID');
//     return res.status(500).json({ error: 'Server configuration error' });
//   }

//   // Debug log (partial token for security)
//   console.log(`Sending Telegram message using token: ${token.substring(0, 5)}...`);

//   const itemsList = items.map(item => `- ${item.name} x ${item.quantity} ($${(item.price * item.quantity).toFixed(2)})`).join('\n');
  
//   const text = `🛍️ *New Items Order!* 🧼\n\n` +
//                `*Items:*\n${itemsList}\n\n` +
//                `*Total:* $${Number(total).toFixed(2)}\n\n` +
//                `*Customer Details:*\n` +
//                `📞 Phone: ${phone}\n` +
//                `📍 Address: ${address}`;

//   console.log('Telegram message text:', text);

//   try {
//     const url = `https://api.telegram.org/bot${token}/sendMessage`;
//     const response = await fetch(url, {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify({
//         chat_id: ownerChatId,
//         text: text,
//         parse_mode: 'Markdown'
//       })
//     });

//     if (!response.ok) {
//       const errorData = await response.json();
//       console.error('Telegram API Error:', errorData);
//       return res.status(502).json({ error: 'Failed to send Telegram message' });
//     }

//     return res.status(200).json({ success: true, message: 'Order sent successfully' });
//   } catch (error) {
//     console.error('Order Submission Error:', error);
//     return res.status(500).json({ error: 'Internal server error' });
//   }
// }


import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const botToken = process.env.TELEGRAM_BOT_TOKEN!;
    const chatId = process.env.TELEGRAM_CHAT_ID!;

    const { phone, address, items, total } = await req.json();

    const itemsList = items
      .map((i: any) => `- ${i.name} x ${i.quantity} ($${(i.price * i.quantity).toFixed(2)})`)
      .join("\n");

    const message =
      `🛍️ *New Order Received!*\n\n` +
      `*Items:*\n${itemsList}\n\n` +
      `*Total:* $${total}\n\n` +
      `*Customer Details:*\n📞 ${phone}\n📍 ${address}`;

    // Send to telegram
    await fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: chatId,
        text: message,
        parse_mode: "Markdown",
      }),
    });

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error("Telegram error:", error);
    return NextResponse.json({ ok: false }, { status: 500 });
  }
}
