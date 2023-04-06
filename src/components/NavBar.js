import React from 'react'
import { useAuth } from "../contexts/AuthContexts"
import { useNavigate } from "react-router-dom";
const NavBar = () => {
    const { logout } = useAuth()
    const { currentUser, role } = useAuth()
    let navigate = useNavigate();
    const routeChange = (path) => {
        navigate("/"+path);
    }
    const LogOut = async function () {
          await logout();
          navigate("/")
          if (role === null) {
            alert('Success! No user is logged in anymore!');
          }
          return true;
      };
    return (
        <div className="header">
            <div onClick={()=>navigate("/")} className="logo">RooMy</div>
            <div className="button_group">
                {role === "USER" ? <>
                    <button onClick={() => routeChange("rooms_curator")} className="header_button-login">Мої кімнати</button>
                    <button onClick={LogOut} className="header_button-login">Вийти</button>
                </> : <></>}
                {role === "ADMIN" ? <>
                    <button onClick={() => routeChange("manager")} className="header_button-login">Адмін</button>
                    <button onClick={LogOut} className="header_button-login">Вийти</button>
                </> : <></>}
                {role === null ? <>
                    <button onClick={() => routeChange("login")} className="header_button-login">Увійти</button>
                </> : <></>}
            </div>
        </div>
    )
}

export default NavBar