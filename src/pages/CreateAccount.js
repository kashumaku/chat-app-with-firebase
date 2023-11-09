import { useState } from "react";
import { Link } from "react-router-dom";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../firebase";

const CreateAccount = () => {
    const [firstName, setFirstName] = useState("")
    const [lastName, setLastName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirm, setConfirm] = useState("")
    const [alert, setAlert] = useState("")

    const handelCreate = async () => {
        if (password !== confirm) {
            setAlert("password doesn't match try again")
            return
        }
        const newUser = { first_name: firstName, last_name: lastName, email: email, password: password }
        const userCollection = collection(db, "users")
        await addDoc(userCollection, newUser)
        setAlert("user created succesfully")


    }
    return (
        <div className="h-screen bg-blue-700 flex justify-center items-center">
            <div className="h-[500px] rounded bg-white flex flex-col gap-8 justify-center items-center w-[80%] md:w-[400px]">
                <h1 className="text-blue-700 font-bold text-2xl">Create Account</h1>
                <p className="text-yellow-500">{alert}</p>
                <input placeholder="First Name..." onChange={(e) => setFirstName(e.target.value)} className="border-b border-b-blue-700 outline-none h-8 px-2 w-[90%]" />
                <input placeholder="Last Name..." onChange={(e) => setLastName(e.target.value)} className="border-b border-b-blue-700 outline-none h-8 px-2 w-[90%]" />
                <input type="email" placeholder="Email..." onChange={(e) => setEmail(e.target.value)} className="border-b border-b-blue-700 outline-none h-8 px-2 w-[90%]" />
                <input type="password" placeholder="Password" onChange={(e) => setPassword(e.target.value)} className="border-b border-b-blue-700 outline-none h-8 px-2 w-[90%]" />
                <input type="password" placeholder="Confirm Password" onChange={(e) => setConfirm(e.target.value)} className="border-b border-b-blue-700 outline-none h-8 px-2 w-[90%]" />
                <button onClick={handelCreate} className="bg-blue-700 text-white px-10 py-2" >Create account</button>
                <p className="">Have an account?
                    <Link className="text-blue-700 font-bold underline " to='/login'>Login</Link></p>
            </div>
        </div>
    );
}

export default CreateAccount;