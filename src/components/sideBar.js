
import { useContext, useEffect, useState } from "react";
import { useGetUsers } from "../data";
import { useNavigate } from "react-router-dom";
import { chatContext } from "../context";
const SideBar = ({ userId, users }) => {
    const [session, setSession] = useState(userId)
    const navigate = useNavigate()
    const { setUserId } = useContext(chatContext)
    // const f = myFriends.map((mf) => {
    //     return mf.friend
    // })
    // const myfriendsId = f.flat().filter((friendId) => friendId !== Number(userId))

    const userAcc = users.filter((u) => u.id === userId)
    const myFriends = users.filter(mf => mf.id !== userId)
    useEffect(() => {
        if (!session)
            navigate('/chat-app-with-firebase/login')
    }, [session])
    const handelLogout = () => {
        localStorage.removeItem('id')
        setSession("")
    }
    return (
        <div className=" bg-blue-400 w-[44%] max-w-[230px] h-screen pt-8 px-2 text-white overflow-y-scroll">
            {(session && users) && (<>
                <div className="uppercase  flex flex-col md:flex-row justify-between "><span>{userAcc[0].first_name}</span>
                    <button onClick={handelLogout} className="uppercase bg-blue-700 text-white px-2 py-1 rounded-md text-sm">Logout</button>
                </div>

                <div className="">
                    <hr className="mt-3" />
                    {myFriends.map((user) => {
                        return <ul key={user.id}>
                            <li onClick={() => setUserId(user.id)} className="flex items-center gap-2 mt-4 cursor-pointer">
                                <img src="b.jpg" alt="" className="w-14 h-14 rounded-full" />
                                <span>{user.first_name}</span>

                            </li>

                        </ul>
                    })}
                </div></>)}

        </div>
    );
}

export default SideBar;