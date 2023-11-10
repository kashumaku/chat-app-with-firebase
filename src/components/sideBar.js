
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
        <div className=" bg-blue-400 w-[44%] max-w-[230px] h-screen   text-gray-300 overflow-y-scroll">
            {(session && users) && (<>
                <div className="fixed bg-blue-400 pt-4">
                    {/* side bar header */}
                    <div className="uppercase  flex flex-col md:flex-row justify-between gap-2 pl-4">
                        <span>{userAcc[0].first_name}</span>
                        <button onClick={handelLogout} className="uppercase bg-blue-700 text-white px-2 py-1 rounded-md text-sm">Logout</button>
                    </div>
                    <hr className="mt-3 w-[120%] md:w-[130%]" />
                    <h1 className="text-center  font-bold tracking-wider text-2xl font-mono my-3">Friends</h1>
                </div>
                <div className="pl-4 mt-40">

                    {myFriends.map((user) => {
                        return <ul key={user.id}>
                            <li onClick={() => setUserId({ chatUserId: user.id, chatUserName: user.first_name })} className="flex items-center gap-2 mt-4 cursor-pointer">
                                <svg className="w-8 h-8 p-1 border border-white rounded-full" fill="none" stroke="currentColor" stroke-width="1.5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
                                    <path stroke-linecap="round" stroke-linejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z"></path>
                                </svg>
                                <span>{user.first_name}</span>

                            </li>

                        </ul>
                    })}
                </div></>)}

        </div>
    );
}

export default SideBar;