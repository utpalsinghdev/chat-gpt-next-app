// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import query from '@/lib/queryApi'
import type { NextApiRequest, NextApiResponse } from 'next'
import admin from 'firebase-admin'
import { adminDb } from '@/firebaseAdmin'
type Data = {
    answer: string
}

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse<Data>
) {
    const {
        prompt,
        chatId,
        model,
        session
    } = req.body

    if (!prompt) {
        res.status(400).json({ answer: 'Please provide promtp' })
        return
    }
    if (!chatId) {
        res.status(400).json({ answer: 'Please provide chatId' })
        return
    }

    const response = await query(prompt, model, chatId )

    const message: Message = {
        text: response || 'Sorry, I don\'t understand',
        createdAt: admin.firestore.Timestamp.now(),
        user: {
            _id: "ChatGPT",
            name: "ChatGPT",
            avatar: "https://avatars.githubusercontent.com/u/76900042?s=200&v=4"
        }
    }
    await adminDb.collection('users').doc(session?.user?.email).collection('chats').doc(chatId).collection('messages').add(message)

    res.status(200).json({ answer: message.text })
}
