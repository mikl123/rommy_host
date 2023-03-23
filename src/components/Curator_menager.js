import React from 'react'
import { useAuth } from "../contexts/AuthContexts";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import Select from 'react-select'
import { MultiSelect } from "react-multi-select-component"
import '../styles/Manager.css'
import '../styles/Main.css'

const Curator_menager = () => {
    const { role } = useAuth()
    let navigate = useNavigate();
    const routeChange = (path) => {
        navigate(path);
    }
    const [loading, setLoading] = useState(false)
    const [response, setResponse] = useState([])
    const [create_new, setCreate_new] = useState(false)
    // Form
    const [error, setError] = useState("")
    const [role_new, setRole_new] = useState("")
    const [wing, setWing] = useState("")
    const [login_new, setLogin_new] = useState([])
    const [password_new, setPassword_new] = useState([])
    const [rooms, setRooms] = useState([])
    const { signup } = useAuth()
    const options = [
        { label: "201-218", value: '2 floor left'},
        { label: "219-234", value: '2 floor right' },
        { label: "301-318", value: '3 floor left' },
        { label: "319-334", value: '3 floor right' },
        { label: "401-418", value: '4 floor left' },
        { label: "419-434", value: '4 floor right' },
        { label: "501-518", value: '5 floor left'},
        { label: "519-534", value: '5 floor right' },
      ];
    const [selected, setSelected] = useState([]);
    
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
            <div className="header">
                <div className="logo">RooMy</div>
                <div className="button_group">
                    <button onClick={() => routeChange("login")} className="header_button-login">Увійти</button>
                    {role != "ADMIN" ? <>
                        <button onClick={() => routeChange("signup")} className="header_button-login">Зареєструвати</button>
                    </> : <></>}
                </div>
            </div>
            <div className='add_curator_div'>
            <button className = 'button_add_curator' onClick={() => setCreate_new(true)}>+</button>
            <label className='add_curator'>Додати куратора</label>
            </div>
            {create_new ? <>
                {error ? <>
                    <div>{error}</div>
                </> : <></>}
                <form className = 'form_add_curator' onSubmit={(e) => create_new_user(e)}>
                    <div>
                        <label>Корпоративна пошта куратора</label>
                        <p><input type="text" value={login_new} onChange={(e) => setLogin_new(e.target.value)} /></p>
                    </div>
                    <div> 
                        <label>Пароль</label>
                        <p><input type="password" value={password_new} onChange={(e) => setPassword_new(e.target.value)} /></p></div>
                    <div>
                    <MultiSelect className='multiselect'
                        options={options}
                        value={selected}
                        onChange={setSelected}
                    />
                    </div>
                    <div>
                        <label>Оберіть статус</label>
                        <p><select key={"_select_"} value={role_new} className="select_owner"
                        onChange={(e) => setRole_new(e.target.value)}>
                        <option key={"role_1"} value={"ADMIN"}>Адмін</option>
                        <option key={"role_2"} value={"USER"}>Куратор</option>
                    </select></p>
                    </div>
                    <div><input type="submit" value={"Створити куратора"} /></div>
                </form>

            </> : <></>}
            <div>{response.length === 0 ?
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
            </div>
        </div>
    )
}

export default Curator_menager
