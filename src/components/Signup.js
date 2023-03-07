import { logDOM } from "@testing-library/react";
import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContexts";
import { Link, useNavigate } from "react-router-dom"

export default function Signup() {
    const [isHover, setIsHover] = useState(false)
    const handleMouseEnter = () => {
        setIsHover(true);
    };
  
    const handleMouseLeave = () => {
        setIsHover(false);
    };
    const authRef = useRef()
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Паролі не збігаються')
        }

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value)
            navigate("/")
        } catch {
            setError('Не вдалося створити профіль')
        }
        setLoading(false)
    }
    return(
        <>
        <Card>
            <Card.Body style={{backgroundColor: "#FAECE1"}}>
                <h2 className = 'text-center mb-4' style={{color: "#542400", fontFamily: "unset"}}>Зареєструватися</h2>
                {error && <Alert variant = 'danger'>{error}</Alert>}
                <Form style={{height: "400px"}} onSubmit={handleSubmit}>
                    <Form.Group id = 'name'>
                        <Form.Label style={{color: "#542400", fontFamily: "Forum"}}>Ім'я та прізвище</Form.Label>
                        <Form.Control type = 'text' ref = {authRef} required></Form.Control>
                    </Form.Group>
                    <Form.Group id = 'email'>
                        <Form.Label style={{color: "#542400", fontFamily: "Forum"}}>Корпоративна пошта</Form.Label>
                        <Form.Control type = 'email' ref = {emailRef} required></Form.Control>
                    </Form.Group>
                    <Form.Group id = 'password'>
                        <Form.Label style={{color: "#542400", fontFamily: "Forum"}}>Пароль</Form.Label>
                        <Form.Control type = 'password' ref = {passwordRef} required></Form.Control>
                    </Form.Group>
                    <Form.Group id = 'password-confirm'>
                        <Form.Label style={{color: "#542400", fontFamily: "Forum"}}>Підтвердження паролю</Form.Label>
                        <Form.Control type = 'password' ref = {passwordConfirmRef} required></Form.Control>
                    </Form.Group>
                    <Button disabled = {loading} className = 'w-100' type = 'submit' 
                    style={{backgroundColor: "#542400", border: "#542400", marginTop: "35px", height: "65px", fontFamily: "Forum", fontSize: "20px", backgroundColor: isHover ? '#896347' : 'rgb(84, 36, 0)', color: isHover ? 'white' : 'white', padding: '15px'}}
                    onMouseEnter={handleMouseEnter}
                    onMouseLeave={handleMouseLeave}>
                        <p>Зареєструватися</p>
                    </Button>
                </Form>
            </Card.Body>
        </Card>
        <div className = 'w-100 text-center mt-2' style={{color: "#542400", fontFamily: "Forum"}}>
            Зареєстрований? <Link style={{color: "#542400", fontFamily: "Forum"}} to="/login">Увійти</Link>
        </div>
        </>
    )
}