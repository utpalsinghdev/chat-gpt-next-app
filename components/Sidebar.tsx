'use client'
import { useSession, signOut } from "next-auth/react"
import NewChat from "./NewChat"
import { useCollection } from "react-firebase-hooks/firestore"
import { collection, orderBy, query } from "firebase/firestore"
import { db } from "@/firebase"
import ChatRow from "./ChatRow"

function Sidebar() {
    const { data: session } = useSession()

    const [chats, loading, error] = useCollection(
        session && query (collection(db, 'users', session.user?.email!, 'chats'), 
        orderBy('createdAt', 'asc')
    )
)
    console.log(chats?.docs)
    return (
        <div className="p-2 flex flex-col h-screen">
            <div className="flex-1 ">
                <div>

                    {/**New Chat */}
                    <NewChat />
                    <div>
                        {/** Model Selection */}
                    </div>
                    {/** Chat List */}
                    {
                        chats?.docs.map((chat) => (
                            <ChatRow key={chat.id} id={chat.id} />
                        ))
                    }

                </div>
            </div>
            {session &&
                // eslint-disable-next-line @next/next/no-img-element
                <img onClick={() => signOut()} src={session.user?.image!} alt="img" className="h-12 w-12 cursor-pointer rounded-full mx-auto mb-2 hover:opacity-50" />
            }
        </div>
    )
}

export default Sidebar