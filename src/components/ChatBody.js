import { AiOutlineSend } from 'react-icons/ai'
import { useContext, useState } from "react";
import { chatContext } from "../context";
import { addDoc, collection } from 'firebase/firestore';
import { db } from '../firebase';

const ChatBody = ({ messages }) => {
    const [newMessage, setNewMessage] = useState("")
    const { userId, setUserId } = useContext(chatContext) //current chat user
    const logedInId = localStorage.getItem("id")
    const message = messages.filter(m => {
        return ((m.sender_id === userId) && (m.receiver_id === logedInId)) || ((m.receiver_id === userId) && (m.sender_id === logedInId))
    })
    const handelSendMessage = async (e) => {
        const messageCollection = collection(db, "messages")
        const messageContent = { message: newMessage, sender_id: userId, receiver_id: logedInId }
        await addDoc(messageCollection, messageContent, message)
        window.location.reload();


        setNewMessage("")
    }
    return (
        <div className="w-full bg-gray-300 ">
            <div className="flex justify-between items-center  bg-blue-400 w-full h-[70px] px-8">
                <span className="font-bold  text-white">Chats</span>
                <span className="flex items-end  text-white "><img src="b.jpg" alt="" className="w-10 h-10 rounded-full" />chat user</span>
            </div>
            {userId && <>
                <div className="md:w-[500px] md:ml-20 mt-5 p-4 h-[90%] bg-white rounded-lg">
                    {message.map(m => {
                        return <p key={m.id} className={` text-black p-2 mt-2 ${m.receiver_id !== logedInId && 'bg-blue-100 rounded-l-full  flex justify-end'}`} >{m.message}</p>
                    })}
                    <div className="w-full absolute bottom-2 flex items-center">
                        <input className='max-w-[450px] w-[55%] mr-1 outline-none border-b border-b-blue-700' placeholder="Write message..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} />
                        <span onClick={handelSendMessage} className='cursor-pointer'><AiOutlineSend size={26} fill='blue' /></span>
                    </div>
                </div>
            </>}

        </div>
    );
}

export default ChatBody;