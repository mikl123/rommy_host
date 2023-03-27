import React from 'react'
import { useAuth } from "../contexts/AuthContexts"
import { useNavigate } from "react-router-dom";
const NavBar = () => {
    const { currentUser, role } = useAuth()
    let navigate = useNavigate();
    const routeChange = (path) => {
        navigate(path);
    }
    return (
        <div className="header">
            <div className="logo">RooMy</div>
            <div className="button_group">
                {currentUser ?
                    <div className='auth_log'>
                        {currentUser._delegate.email+" "}

                        {role ?
                            <>
                                {"Ваші права: "+" "}
                                {role === "USER" ? <>
                                    {"Куратор"+" "}
                                </> : <></>}
                                {role === "ADMIN" ? <>
                                    {"Адміністратор"+" "}
                                </> : <></>}
                            </>
                            : <></>}
                    </div>
                    :
                    <div>Не зареєстровані</div>
                }
                <button onClick={() => routeChange("login")} className="header_button-login">Увійти</button>
                {role === "USER" | role === "ADMIN" ? <>
                    <button onClick={() => routeChange("/rooms_curator")} className="header_button-login">Мої кімнати</button>
                </> : <></>}
                {role === "ADMIN" ? <>
                    <button onClick={() => routeChange("/manager")} className="header_button-login">Cторінка адміністратора</button>
                </> : <></>}

            </div>
        </div>
    )
}

export default NavBar