import React from 'react'
import { useAuth } from "../contexts/AuthContexts";
import axios from 'axios';
import { useEffect, useState } from 'react';
const Room = (props) => {

    return (
        <div>
            <div>
                Імя жильців
                {props.room.name.map((name, index) => (
                    <div key={name + index}>name</div>
                ))}
            </div>
            <div>
                {props.room.furniture_list.map((list_fur, index_fur) => (
                    <>
                    {list_fur((furniture, index) => (
                        <div key={"furniture_div" + index+index_fur}>
                            <div>{furniture.description}</div>
                            {/* {furniture.image.} */}
                        </div>
                    ))}
                    </>
                ))}

            </div>
        </div>
    )
}

export default Room