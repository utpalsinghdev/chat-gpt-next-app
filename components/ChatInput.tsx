"use client"
import { db } from '@/firebase'
import { PaperAirplaneIcon } from '@heroicons/react/24/solid'
import { addDoc, collection, serverTimestamp } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import React, { FormEvent, useState } from 'react'
import { toast } from 'react-hot-toast'
function ChatInput({ chatId }: { chatId: string }) {
    const [prompt, setPrompt] = useState('')

    const { data: session } = useSession()
    const model = "text-davinci-003" //TODO: make this dynamic

    const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        if (!prompt) return

        const input = prompt.trim()
        setPrompt('')

        const message: Message = {
            text: input,
            createdAt: serverTimestamp(),
            user: {
                _id: session?.user?.email!,
                name: session?.user?.name!,
                avatar: session?.user?.image! || ''
            }
        }

        await addDoc(collection(db, 'users', session?.user?.email!, 'chats', chatId, 'messages'), message)
        // Notification saying loading
        const notification = toast.loading('Chat GPT is thinking...')
        await fetch('/api/askQuestion', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                prompt: input,
                chatId,
                model,
                session
            })
        }).then(() => {
            console.log("Message sent")
            toast.success("Chat GPT responded", { id: notification })
        })
    }
    return (
        <div className='bg-gray-700/50 text-gray-400 rounded-lg text-sm' >
            <form onSubmit={sendMessage} className='p-5 space-x-5 flex' >
                <input type="text" placeholder="Enter your message"
                    value={prompt}
                    onChange={(e) => setPrompt(e.target.value)}
                    disabled={!session}
                    className='focus:outline-none bg-transparent flex-1 disabled:cursor-not-allowed disabled:text-gray-300'
                />
                <button type='submit'
                    disabled={!prompt || !session}
                    className='bg-[#11A37F] hover:opacity-50 font-bold px-4 py-2 rounded disabled:cursor-not-allowed  disabled:bg-gray-300'
                >

                    <PaperAirplaneIcon className='h-4 w-4  -rotate-45' />
                </button>
            </form>
            <div>
                {/* Modal Selection */}
            </div>
        </div>
    )
}

export default ChatInput