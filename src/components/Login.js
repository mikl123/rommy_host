import { logDOM } from "@testing-library/react";
import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContexts";
import { Link, useNavigate } from "react-router-dom"

export default function Login() {
    const [isHover, setIsHover] = useState(false)
    const handleMouseEnter = () => {
        setIsHover(true);
    };
  
    const handleMouseLeave = () => {
        setIsHover(false);
    };
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            navigate("/")
        } catch {
            setError('Не вдалося увійти')
        }
        setLoading(false)
    }

    return(
        <>
        <Card>
            <Card.Body style={{backgroundColor: "#FAECE1"}}>
                <h2 className = 'text-center mb-4' style={{color: "#542400", fontFamily: "unset"}}><strong>Увійти</strong></h2>
                {error && <Alert variant = 'danger'>{error}</Alert>}
                <Form onSubmit={handleSubmit} style={{height: "250px"}}>
                    <Form.Group id = 'email'>
                        <Form.Label style={{color: "#542400", fontFamily: "Forum"}}>Корпоративна пошта</Form.Label>
                        <Form.Control type = 'email' ref = {emailRef} required></Form.Control>
                    </Form.Group>
                    <Form.Group id = 'password'>
                        <Form.Label style={{color: "#542400", fontFamily: "Forum"}}>Пароль</Form.Label>
                        <Form.Control type = 'password' ref = {passwordRef} required></Form.Control>
                    </Form.Group>
                    <Button disabled = {loading} className = 'w-100' type = 'submit' style={{backgroundColor: "#542400", border: "#542400", marginTop: "35px", height: "65px", fontFamily: "Forum", fontSize: "20px", backgroundColor: isHover ? '#896347' : 'rgb(84, 36, 0)', color: isHover ? 'white' : 'white', padding: '15px'}}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>
                        Увійти
                    </Button>
                </Form>
                <div className = 'w-100 text-center mt-3'>
                    <Link style={{color: "#542400", fontFamily: "Forum"}} to="/forgot-password">Забув пароль?</Link>
                </div>
            </Card.Body>
        </Card>
        <div className = 'w-100 text-center mt-2' style={{color: "#542400", fontFamily: "Forum"}} >
            Не зареєстрований? <Link style={{color: "#542400", fontFamily: "Forum"}} to="/signup">Зареєструватися</Link>
        </div>
        </>
    )
}
