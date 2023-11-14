import { useNavigate } from "react-router-dom";
import SideBar from "../components/sideBar";
import { useGetMessages, useGetUsers } from "../data";
import ChatBody from "../components/ChatBody";
import { toggleContext } from "../context";
import { useContext } from "react";


const Home = () => {
    const navigator = useNavigate()
    const { toggleMenu } = useContext(toggleContext)
    //fetching data from the firestore database
    const users = useGetUsers()
    const messages = useGetMessages()

    const userId = localStorage.getItem("id")
    if (!userId && (users <= 0))
        navigator("/login")

    return (
        <div className="flex w-full overflow-hidden relative justify-center ">
            {users.length > 0 && <>
                {/* absolute left-0  w-full   absolute w-full left-[-300px] */}
                {/* <div className={toggleMenu ? 'block absolute w-full left-2 duration-[6s]' : 'z-[-10] absolute w-full left-[-40%]'}  ><SideBar users={users} userId={userId} /></div> */}
                <div className={`absolute w-full duration-[1s] ${toggleMenu ? 'left-0 z-10  ' : 'left-[-44%] -z-10 '}`}  >
                    <SideBar users={users} userId={userId} />
                </div>
                <ChatBody messages={messages} />
            </>}
        </div>
    );
}

export default Home;