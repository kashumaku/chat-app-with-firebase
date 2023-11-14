import { useNavigate } from "react-router-dom";
import SideBar from "../components/sideBar";
import { useGetMessages, useGetUsers } from "../data";
import ChatBody from "../components/ChatBody";


const Home = () => {
    const navigator = useNavigate()
    //fetching data from the firestore database
    const users = useGetUsers()
    const messages = useGetMessages()

    const userId = localStorage.getItem("id")
    if (!userId && (users <= 0))
        navigator("/login")
    return (
        <div className="flex w-full h-screen overflow-y-hidden overflow-x-hidden">
            {users.length > 0 && <>
                <SideBar users={users} userId={userId} />
                <ChatBody messages={messages} />
            </>}

        </div>
    );
}

export default Home;