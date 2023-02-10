import { db } from '@/firebase'
import { ChatBubbleLeftIcon } from '@heroicons/react/24/outline'
import { TrashIcon } from '@heroicons/react/24/outline'
import { collection, deleteDoc, doc, orderBy, query } from 'firebase/firestore'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { type } from 'os'
import React, { useEffect } from 'react'
import { useCollection } from 'react-firebase-hooks/firestore'

type ChatRowProps = {
    id: string
}

function ChatRow({ id }: ChatRowProps) {
    const pathname = usePathname()
    const router = useRouter()
    const { data: session } = useSession()

    const [active, setActive] = React.useState(false)

    const [messages] = useCollection(
        collection(db, 'users', session?.user?.email!, 'chats', id, 'messages')
    )

    useEffect(() => {
        if (!pathname) return

        setActive(pathname.includes(id))
    }, [pathname, id])

    const removeChat = async () => {
        await deleteDoc(doc(db, 'users', session?.user?.email!, 'chats', id))
        router.replace('/')
    }
    return (
        <Link
            href={`/chat/${id}`}
            className={`chatRow flex mt-1 justify-center ${active && 'bg-gray-700/50'}`}
        >
            <ChatBubbleLeftIcon className='h-5 w-5' />
            <p
                className='flex-1 hidden md:inline-flex truncate '
            >{messages?.docs[messages?.docs.length - 1]?.data().text || "New Chat"}</p>
            <TrashIcon onClick={removeChat} className='h-5 w-5 text-gray-700 hover:text-red-700' />
        </Link>
    )
}

export default ChatRow