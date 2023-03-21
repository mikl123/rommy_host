import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import Room from './Room';

const Rooms = (props) => {
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState([])

  let navigate = useNavigate();
  const routeChange = (path) => {
    navigate(path);
  }
  useEffect(() => {
    setLoading(true)
    axios.get(`http://localhost:5000/curator_rooms/${props.user_id}`)
      .then(res => {
        console.log(res)
        setResponse(res.data)
        setLoading(false)
      }).catch(err =>
        setLoading(false))
  }, []);
  return (
    <div className="main"
      style={{ minHeight: '100vh' }}>
      {loading ? <>
      Loading please wait
      
      </> : <><div className="header">
        <div className="logo">RooMy</div>
        <div className="button_group">
          <button onClick={() => routeChange("/")} className="header_button-home">Головна</button>
        </div>
      </div>
        <div className="main-text">
          <strong>Список кімнат</strong>
        </div>
        <div className="rooms">
          {response.map((ele, index) => (
            <div onClick={() => <Room room={ele} />} className="header_button-room">ele.number</div>
          ))}
          {/* <div onClick={() => routeChange("419")} classNameF="header_button-room">Кімната №419</div> */}
        </div></>}
    </div>
  )
}

export default Rooms