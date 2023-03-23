import React from 'react'
import { useEffect, useState } from 'react'
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import { object } from 'prop-types';
import "../styles/Curator.css"
import { useAuth } from "../contexts/AuthContexts"
const Rooms = (props) => {
  const { currentUser } = useAuth()
  const [loading, setLoading] = useState(false)
  const [response, setResponse] = useState([])
  const [currentRoom, setCurrentRoom] = useState(null)

  let navigate = useNavigate();
  const routeChange = (path) => {
    navigate(path);
  }
  const verify = (room_number, user_id) => {
    axios.post(`http://localhost:5000/verify`, { room_n: room_number, u_id: user_id})
      .then(res => {
        let new_rooms = []
        for (let room of response) {
          let new_room = room
          if (room.number === room_number) {
            new_room.verified = true
          }
          new_rooms.append(new_room)
        }
        setResponse(new_rooms)
      }).catch(err =>
        setLoading(false))
  

 
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
    {currentRoom === null ? <>
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
            <div className="header_button-room" onClick={() => setCurrentRoom(ele)}>{ele.number}{ele.verified ? "verified" : "not veryfied"}</div>
          ))}
        </div></>}
    </> : <>
      <div>
        <div>
          Імя жильців
          {currentRoom.names.map((name, index) => (
            <div key={name + index}>{name}</div>
          ))}
        </div>
        <div>
          {currentRoom.furniture_list.map((list_fur, index_fur) => (
            <>
              {list_fur.map((furniture, index) => (
                <div key={"furniture_div" + index + index_fur}>
                  <div>{furniture.type_expanded}</div>
                  Повідомлено про
                  <div>{furniture.description + "asdasdasd"}</div>
                  {furniture.owner ? <>
                    <div>{furniture.owner + "owner"}</div>
                  </> : <></>}
                  {furniture.images.length ? <>
                    asda!!!!!!!!!!!!
                    {furniture.images}
                  </> : <></>}
                  <img src={furniture.images} />
                </div>
              ))}
            </>
          ))}

        </div>
        <button onClick={() => verify(currentRoom.number, currentUser._delegate.uid)}>Підтвердити</button>
      </div>
    </>}

  </div>
)
}

export default Rooms
