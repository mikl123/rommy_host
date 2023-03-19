import { useEffect, useState } from 'react';
import { useParams } from "react-router-dom";
import "../styles/Main_form.css"
import axios from 'axios';
import Form_reg from './Form_reg';
function Main_Form() {
    const { id_coded } = useParams();
    const [loading, setLoading] = useState(true)
    const [response, setResponse] = useState(null);
    useEffect(() => {
        axios.get(`http://localhost:5000/room/${id_coded}`)
            .then(res => {
                setResponse(res.data)
                setLoading(false)
            }).catch(err=>
                setLoading(false))
    }, []);
    return (
        <div className='main_form'>
            {loading ?<div class="loader_block"><div class="loader"></div><p>Wait a little</p></div>:
                <>
                    {response ? <>
                    <div className='reg_text_div' >Ви реєструєте кімнату №{response.number}</div>
                    <Form_reg room={response} id_coded={id_coded}  />
                    </> : <>
                    <h1>Sorry your code is invalid</h1>
                    </>}
                </>}

        </div>
    )
}
export default Main_Form