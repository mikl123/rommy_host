import "../styles/Main_page.css"
import { useNavigate } from "react-router-dom";
function Main_Page() {

    let navigate = useNavigate(); 
    const routeChange = (path) =>{ 
      navigate(path);
    }
    return (
        <div>
            <div className="header">
                <div className="logo">RooMy</div>
                <div className="button_group">
                    <button onClick={()=>routeChange("reg")} className="header_button"> Login</button>
                    <button onClick={()=>routeChange("about")} className="header_button"> About</button>
                    <button onClick={()=>routeChange("rules")} className="header_button"> Rules</button>
                    <button onClick={()=>routeChange("reg")} className="header_button"> Login</button>
                </div>
            </div>
            <div className="steps">
                <div className="step">first</div>
                <div className="step">first</div>
                <div className="step">first</div>
                <div className="step">first</div>
                <div className="step">first</div>
                <div className="step">first</div>
                <div className="step">first</div>
            </div>
        </div>

    )
}
export default Main_Page