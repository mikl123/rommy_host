import "../styles/Form_reg.css"
import { useState } from 'react';
import axios from 'axios';
import {
    ref,
    uploadBytes,
    getDownloadURL,
    listAll,
    list,
} from "firebase/storage";
import { storage } from "../firebase";
import { v4 } from "uuid";
import { async } from "@firebase/util";

function Form_reg(props) {
    const id_coded = props.id_coded
    const [room, setRoom] = useState(props.room);
    const [ruleAccepted, setRuleAccepted] = useState(false);
    const [step, setStep] = useState(1)
    const [stepfur, setStepfur] = useState(0)
    const [error, setError] = useState("")
    console.log(room)
    function uuidv4() {
        return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, c =>
            (c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
        );
    }
    async function uploadFile(file, categorie) {
        return new Promise(function (resolve, reject) {
            const imageRef = ref(storage, `images/${categorie}/${uuidv4()}`);
            uploadBytes(imageRef, file).then((snapshot) => {
                getDownloadURL(snapshot.ref).then((url) => {
                    resolve(url)
                }).catch((error) => { reject(error) });
            });
        });
    };
    const handleChangeUser = (index, value) => {
        let users = room.names
        users[index] = value
        console.log(users)
        setRoom((prev) => ({ ...prev, "names": users }))
    }
    const handleChangeRoom = (index, option, value) => {
        let obj = room.furniture_list[index]
        obj[option] = value
        let new_list = room.furniture_list
        new_list[index] = obj
        setRoom((prev) => ({ ...prev, "furniture_list": new_list }))
    }
    function checkUsers_inp() {
        for (const [index, user_name] of room.names.entries()) {
            if (user_name === "") {
                let index_pr = index + 1
                setError("You should input name for " + index_pr + " user.")
                return;
            } else {
                if (user_name.length < 5) {
                    let index_pr = index + 1
                    setError("You should input full name for " + index_pr + " user.")
                    return;
                }
            }
        }
        setStep(prev => prev + 1)
    }
    function checkFurniture_inp() {
        for (const [index, furniture] of room.furniture_list.entries()) {
            if (furniture.description === "") {
                setError("You should input description for " + furniture.type_expanded)
                return;
            } else {
            }
        }
        setStep(prev => prev + 1)
    }
    const handle_post = async (e) => {
        e.preventDefault();
        let new_furniture_list = []
        console.log(room.furniture_list)
        for (let furnit of room.furniture_list) {
            if (furnit.images.length !== 0) {
                console.log("grea")
                const res = await uploadFile(furnit.images, room.number);
                furnit.images = res
                new_furniture_list.push(furnit)
            } else {
                new_furniture_list.push(furnit)
            }
        }
        console.log(room.furniture_list)
        setRoom((prev) => ({ ...prev, "furniture_list": new_furniture_list }))
        axios.post(`http://127.0.0.1:5000/room/${id_coded}/submit`, room)
            .then(res => {
                console.log(res.data)
            }).catch(err =>
                console.log(err))
    }
    return (
        <div className="main_div">
            <form className="main_form" key="submit_form" onSubmit={handle_post}>
                {(() => {
                    switch (step) {
                        case 1:
                            return (<div key="users_div" className="user_div">
                                {error ? <div className="error_block">
                                    {error}
                                </div> : <></>}
                                {room.names.map((ele, index) => (
                                    <div className="user_div_inner">
                                        <label className="user_label" key={"user_" + index}>
                                            Ім'я мешканця {index + 1}
                                        </label>
                                        <input placeholder="text" className="user_input" type="text" key={"inp_user_" + index} onChange={(e) => handleChangeUser(index, e.target.value)} value={room.names[index]} />
                                    </div>
                                ))}

                                <button className="button_next" key="button_users" onClick={(e) => checkUsers_inp()}>Next</button>
                            </div>)

                        case 2:
                            return (<>
                                <p className="step_2">Step2 ➧</p>
                                {room.furniture_list.map((block, index_block) => (
                                    <>
                                        {(() => {
                                            switch (stepfur) {
                                                case index_block:
                                                    return (<>
                                                        <div className='furniture_list' key="furniture_div">
                                                            {block.map((ele, index) => (<>
                                                                <div key={"div_" + index} className='furniture_block'>
                                                                    <div key={"div_header_" + index} className="header_furniture">
                                                                        <div className="text_header">{index + ")    "} {ele.type_expanded}<br /></div>
                                                                        {ele.questions}
                                                                    </div>
                                                                    <div key={"div_body_" + index} className="body_furniture">
                                                                        {ele.type === "bed" ? <div><select className="select_owner"
                                                                            onChange={(e) => handleChangeRoom(index, index_block, "owner", e.target.value)}>
                                                                            {room.names.map((elem, index_user) => (
                                                                                <option key={"opt_" + index + "_" + index_user + index_block} value={elem}>{elem}</option>
                                                                            ))}
                                                                        </select></div> : <></>}

                                                                        <div className="obj_input">
                                                                            <textarea className="obj_description"
                                                                                onChange={(e) => handleChangeRoom(index, index_block, "description", e.target.value)}
                                                                                value={room.furniture_list[index_block][index].description}
                                                                                key={"inp_" + index + index_block} type="text"
                                                                                placeholder={"Enter data"} />
                                                                        </div>
                                                                        <div className="file_div">
                                                                            <input
                                                                                className="file_input"
                                                                                type="file"
                                                                                onChange={(event) => {
                                                                                    handleChangeRoom(index, index_block, "images", event.target.files[0])
                                                                                }}
                                                                            />
                                                                        </div>
                                                                    </div>
                                                                </div>

                                                            </>))}
                                                            <button className="button_next" key="button_room" onClick={(e) => {
                                                                if (stepfur+1 >= room.furniture_list.length) {
                                                                    setStep((prev) => prev + 1)
                                                                } else {
                                                                    setStepfur((prev) => prev + 1)
                                                                }
                                                            }}>Next</button>
                                                        </div>
                                                    </>)
                                            }

                                        })()}
                                    </>

                                ))}

                            </>)
                        case 3:
                            return (<div key="rules_div">
                                Rules
                                <input
                                    key="check_rules"
                                    type="checkbox"
                                    checked={ruleAccepted}
                                    onChange={(e) => setRuleAccepted(e.target.value)}
                                />
                                <input onClick={handle_post} key="submit_button" type={"submit"} />
                            </div>)
                        default:
                            return null
                    }
                })()}
            </form>
        </div>
    );
}
export default Form_reg 