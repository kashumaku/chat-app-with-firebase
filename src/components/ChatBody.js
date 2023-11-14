import { AiOutlineSend } from 'react-icons/ai'
import { useContext, useState } from "react";
import { chatContext, toggleContext } from "../context";
import { addDoc, collection, Timestamp } from 'firebase/firestore';
import { db } from '../firebase';

const ChatBody = ({ messages }) => {
    const [newMessage, setNewMessage] = useState("")
    const { userId } = useContext(chatContext) //current chat user
    const { setToggleMenu } = useContext(toggleContext)
    const { chatUserId, chatUserName } = userId

    const logedInId = localStorage.getItem("id")

    const message = messages.filter(m => {
        return ((m.sender_id === chatUserId) && (m.receiver_id === logedInId)) || ((m.receiver_id === chatUserId) && (m.sender_id === logedInId))
    })
    console.log(message);

    const handelSendMessage = async (e) => {
        const date = new Date()
        //date format YYYY-MM-DDTHH:MM:SS
        const y = date.getFullYear(), m = date.getMonth() + 1, d = date.getDate(), h = date.getHours(), mt = date.getMinutes(), s = date.getSeconds()
        const sentDate = (`${y}-${m}-${d}T${h}:${mt}:${s}`)
        const timeStamp = Timestamp.now()
        const messageCollection = collection(db, "messages")
        const messageContent = { message: newMessage, sender_id: chatUserId, receiver_id: logedInId, timestamp: timeStamp, sent_date: sentDate }
        await addDoc(messageCollection, messageContent, message)
        setNewMessage("")
    }

    return (
        <div className="w-full bg-gray-300 h-screen ">
            <div className="flex justify-between items-center  bg-blue-400 w-full h-[70px] px-8">
                <svg onClick={() => (setToggleMenu(true))} className='w-7 text-white cursor-pointer' aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9 15L3 9m0 0l6-6M3 9h12a6 6 0 010 12h-3" stroke-linecap="round" stroke-linejoin="round"></path>
                </svg>
                <span className="font-bold  text-white">Chats</span>
                <div className="flex w-[150px] pl-2  text-white items-center">
                    <svg className="w-7 h-7 p-1 mr-1 border border-white rounded-full" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"></path>
                    </svg>
                    <span>{chatUserName}</span></div>
            </div>
            {chatUserId && <>
                <div className="md:w-[500px] md:ml-20 w-full bg-white rounded-lg h-[95%] pb-[100px] overflow-y-scroll">
                    {message.map(m => {
                        return <div key={m.id} className={`break-all  text-white mx-2 p-2  mt-2 max-w-[300px]   ${m.receiver_id === logedInId ? 'bg-gray-500  rounded-tl-[10px] rounded-tr-[10px] rounded-bl-[10px]' : 'rounded-tl-[10px] rounded-tr-[10px] rounded-br-[10px] bg-blue-500'}`} >
                            {m.message}
                            <p className='text-orange-200  '>{new Date(m.sent_date).getFullYear()}-{new Date(m.sent_date).getMonth() + 1}-{new Date(m.sent_date).getDate()} {new Date(m.sent_date).getHours()}:{new Date(m.sent_date).getMinutes()} </p>

                        </div>
                    })}
                    <div className=" fixed bg-white bottom-0 flex items-center w-[100vw] max-w-[500px]">
                        <input className=' p-3 w-full  outline-none border-b border-b-blue-700 mb-2' placeholder="Write message..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
                        <svg className='w-10 h-10 mr-2 text-blue-600' aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 18.75a6 6 0 006-6v-1.5m-6 7.5a6 6 0 01-6-6v-1.5m6 7.5v3.75m-3.75 0h7.5M12 15.75a3 3 0 01-3-3V4.5a3 3 0 116 0v8.25a3 3 0 01-3 3z" stroke-linecap="round" stroke-linejoin="round"></path>
                        </svg>
                        <svg className='w-10 h-10 mr-2 text-blue-600' fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" d="M18.375 12.739l-7.693 7.693a4.5 4.5 0 01-6.364-6.364l10.94-10.94A3 3 0 1119.5 7.372L8.552 18.32m.009-.01l-.01.01m5.699-9.941l-7.81 7.81a1.5 1.5 0 002.112 2.13"></path>
                        </svg>
                        <span onClick={handelSendMessage} className={`cursor-pointer mr-4 text-blue-600 ${newMessage.trim() ? 'inline' : 'hidden'}`}><AiOutlineSend size={30} /></span>
                    </div>
                </div>
            </>}

        </div>
    );
}

export default ChatBody;