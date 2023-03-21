import React from 'react'
import { useAuth } from "../contexts/AuthContexts";
import axios from 'axios';
import { useEffect, useState } from 'react';
const Curator_menager = () => {
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState([])
    const [create_new, setCreate_new] = useState(false)
    // Form
    const [error, setError] = useState("")
    const [role_new, setRole_new] = useState("")
    const [login_new, setLogin_new] = useState([])
    const [password_new, setPassword_new] = useState([])
    const [rooms, setRooms] = useState([])
    const { signup } = useAuth()
    useEffect(() => {
        setLoading(true)
        axios.get(`http://localhost:5000/curators`)
            .then(res => {
                console.log(res.data)
                setResponse(res.data)
                setLoading(false)
            }).catch(err => {
                console.log(err)
                setLoading(false)
            })
    }, []);
    const create_new_user = (e) => {
        e.preventDefault()
        if (login_new === "") {
            setError("New login is empty")
            return
        } else if (password_new === "") {
            setError("New password is empty")
            return
        }
        console.log("adsasd")
        signup(login_new, password_new, role_new, rooms)
    }

    return (
        <div>
            <button onClick={() => setCreate_new(true)}>+</button>
            {response.length === 0 ?
                <>
                    No Users
                </> :
                <>
                    {response.map((ele, index) => (
                        <div>
                            <div>{ele.email}   {"  " + ele.rooms}</div>
                        </div>
                    ))}
                </>}

            {create_new ? <>
                {error ? <>
                    <div>{error}</div>
                </> : <></>}
                <form onSubmit={(e) => create_new_user(e)}>
                    <div>
                        <input type="text" value={login_new} onChange={(e) => setLogin_new(e.target.value)} />
                    </div>
                    <div> <input type="password" value={password_new} onChange={(e) => setPassword_new(e.target.value)} />
                    </div>
                    <div><input type="text" value={rooms} onChange={(e) => setRooms(e.target.value)} /></div>
                    <div><select key={"_select_"} value={role_new} className="select_owner"
                        onChange={(e) => setRole_new(e.target.value)}>
                        <option key={"role_1"} value={"ADMIN"}>Адмін</option>
                        <option key={"role_2"} value={"USER"}>Куратор</option>
                    </select>
                    </div>
                    <div><input type="submit" value={"Створити куратора"} /></div>
                </form>

            </> : <></>}
        </div>
    )
}

export default Curator_menager