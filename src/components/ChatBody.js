import { AiOutlineSend } from 'react-icons/ai'
import { useContext, useState } from "react";
import { chatContext } from "../context";
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

const ChatBody = ({ messages }) => {
    const [newMessage, setNewMessage] = useState("")
    const { userId } = useContext(chatContext) //current chat user
    const { chatUserId, chatUserName } = userId
    const logedInId = localStorage.getItem("id")
    const message = messages.filter(m => {
        return ((m.sender_id === chatUserId) && (m.receiver_id === logedInId)) || ((m.receiver_id === chatUserId) && (m.sender_id === logedInId))
    })


    const handelSendMessage = async (e) => {
        const date = new Date()
        //date format YYYY-MM-DDTHH:MM:SS
        const y = date.getFullYear(), m = date.getMonth() + 1, d = date.getDate(), h = date.getHours(), mt = date.getMinutes(), s = date.getSeconds()

        const mesageDate = (`${y}-${m}-${d}T${h}:${mt}:${s}`)
        const messageCollection = collection(db, "messages")
        const messageContent = { message: newMessage, sender_id: chatUserId, receiver_id: logedInId, date: mesageDate }
        await addDoc(messageCollection, messageContent, message)
        window.location.reload();


        setNewMessage("")
    }
    return (
        <div className="w-full bg-gray-300 ">
            <div className="flex justify-between items-center  bg-blue-400 w-full h-[70px] px-8">
                <span className="font-bold  text-white">Chats</span>
                <div className="flex w-[150px] pl-2  text-white items-center">
                    <svg className='w-10 h-10' fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"></path>
                    </svg>
                    <span>{chatUserName}</span></div>
            </div>
            {chatUserId && <>
                <div className="md:w-[500px] md:ml-20  bg-white rounded-lg h-[95%] overflow-y-scroll">
                    {message.map(m => {
                        return <p key={m.id} className={` text-black p-2 mt-2 ${m.receiver_id === logedInId && 'bg-blue-100 rounded-l-full  flex justify-end'}`} >
                            {m.message}
                            <span>{

                            }</span>
                        </p>
                    })}
                    <div className="w-[inherit] fixed bottom-0 flex  bg-white">
                        <input className=' p-2 w-full  outline-none border-b border-b-blue-700' placeholder="Write message..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
                        <span onClick={handelSendMessage} className={`cursor-pointer ${newMessage.trim() ? 'inline' : 'hidden'}`}><AiOutlineSend size={26} fill='blue' /></span>
                    </div>
                </div>
            </>}

        </div>
    );
}

export default ChatBody;