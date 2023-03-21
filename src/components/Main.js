import "../styles/Main.css"
import { useNavigate } from "react-router-dom";
import logo from './collegium.png'
<<<<<<< HEAD
import { Container } from "react-bootstrap";
import { useAuth } from "../contexts/AuthContexts"
=======
import  { MapComponent } from './Map.js';
function Main_Page() {
>>>>>>> 0e3edd71952ba2ace24d46a75fbfe2883f13f1a7

function Main_Page() {
    const { role } = useAuth()
    let navigate = useNavigate();
    const routeChange = (path) => {
        navigate(path);
    }
    return (
        <div className="main"
            style={{ minHeight: '100vh' }}>
            <div className="header">
                <div className="logo">RooMy</div>
                <div className="button_group">
<<<<<<< HEAD
                    <button onClick={() => routeChange("login")} className="header_button-login">Увійти</button>
                    {role != "ADMIN" ? <>
                        <button onClick={() => routeChange("signup")} className="header_button-login">Зареєструвати</button>
                    </> : <></>}
=======
                    <button onClick={()=>routeChange("login")} className="header_button-login">Куратор</button>
>>>>>>> 0e3edd71952ba2ace24d46a75fbfe2883f13f1a7
                </div>
            </div>
            <div>
                <img className="image" src={logo}></img>
            </div>
            <div className="text">
                <strong>Як зареєструвати кімнату?</strong>
            </div>
            <div className="numbers">
                <p><strong>1</strong> Скануйте QR-код на дверях.</p>
                <p><strong>2</strong> Запишіть всіх жителів кімнати.</p>
                <p><strong>3</strong> Детально опишіть стан кімнати.</p>
                <p><strong>4</strong> Натисніть зберегти.</p>
            </div>
            <div className="footer">
                <div className="contacts">
                    <strong>Контакти</strong>
                </div>
                <div className="contacts1">
                    <strong><p>Зателефонувати</p></strong>
                    <p>+38 (032) 240 99 44</p>
                    <p>+38 (068) 076 29 74</p>
                    <strong><p>Пошта</p></strong>
                    <p>collegium@ucu.edu.ua</p>
                    <strong><p>Соціальні мережі</p></strong>
                </div>
                <div>
                    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"></link>
                    <a href="https://www.instagram.com/collegium.ucu/?hl=en" class="fa fa-instagram"></a>
                    <a href="https://www.youtube.com/channel/UCL0HwqYxLxL_l35FNE24kQw" class="fa fa-youtube"></a>
                    <a href="https://collegium.ucu.edu.ua/" class="fa fa-dribbble"></a>
                </div>
                <div className="greeting">
                    <strong><p>Вітаємо вдома!</p></strong>
                    <MapComponent />
                </div>

            </div>
        </div>

    )
}
export default Main_Page
