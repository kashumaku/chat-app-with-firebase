
import { useEffect, useState } from 'react'
import { db } from './firebase'
import { collection, getDocs } from 'firebase/firestore'


//fetching users
export const useGetUsers = () => {

    const [users, setUsers] = useState([])
    const userCollection = collection(db, "users")
    useEffect(() => {
        const fetchUsers = async () => {
            const data = await getDocs(userCollection);
            setUsers(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))
            // console.log(data.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        }
        fetchUsers()

    }, [])
    return (users)
}

//Fetching messages
export const useGetMessages = () => {
    const [messages, setMessages] = useState([])

    const messageCollection = collection(db, "messages")
    useEffect(() => {
        const fetchMessages = async () => {
            const data = await getDocs(messageCollection)
            setMessages(data.docs.map(doc => ({ ...doc.data(), id: doc.id })))

        }
        fetchMessages()

    }, [])
    return messages
}


//dumy data
export const userssss = [
    {
        id: 1,
        user_name: "kassahun",
        password: "kassahun1234"
    },
    {
        id: 2,
        user_name: "Yohannes",
        password: "yohannes1234"
    },
    {
        id: 3,
        user_name: "Bereket",
        password: "bereket1234"
    },
    {
        id: 4,
        user_name: "Daniel",
        password: "daniel1234"
    },
    {
        id: 5,
        user_name: "Mekonnen",
        password: "mekonnen1234"
    }, {
        id: 6,
        user_name: "Bruk",
        password: "bruk1234"
    }
]

export const messages = [
    {
        m_id: "m1",
        sender_id: 4,
        receiver_id: 1,
        message: "hello how are you from dani"

    },
    {
        m_id: "m1",
        sender_id: 1,
        receiver_id: 4,
        message: "hello how are you from km"

    },
    {
        m_id: "m1",
        sender_id: 4,
        receiver_id: 1,
        message: "hello how are you from dani"

    },
    {
        m_id: "m1",
        sender_id: 1,
        receiver_id: 4,
        message: "hello how are you from km"

    },
    ///
    {
        m_id: "m1",
        sender_id: 1,
        receiver_id: 2,
        message: "hello how are you from yohannesbbbbbbbbbbbbb"

    },
    {
        m_id: "m0001",
        sender_id: 3,
        receiver_id: 1,
        message: "hello how are you from bereket"

    },
    {
        m_id: "m0100",
        sender_id: 5,
        receiver_id: 1,
        message: "hello how are you from mekonnen"

    },
    {
        m_id: "m010",
        sender_id: 1,
        receiver_id: 6,
        message: "hello how are you"

    },
    {
        m_id: "m100",
        sender_id: 2,
        receiver_id: 3,
        message: "hello how are you"

    },
    {
        m_id: "m01",
        sender_id: 4,
        receiver_id: 1,
        message: "hello how are you from somw one"

    },
    {
        m_id: "m10",
        sender_id: 1,
        receiver_id: 2,
        message: "hello how are you we wil met from kassahun"
    }
]

export const friends = [
    {
        f_id: 1,
        friend: [1, 4],
        date: 10
    },
    {
        f_id: 2,
        friend: [1, 2],
        date: 10
    },
    {
        f_id: 9,
        friend: [1, 6],
        date: 10
    },
    {
        f_id: 7,
        friend: [2, 3],
        date: 10
    },
    {
        f_id: 8,
        friend: [5, 2],
        date: 10
    },
    {
        f_id: 5,
        friend: [1, 5],
        date: 10
    }
]