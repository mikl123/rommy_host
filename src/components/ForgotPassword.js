import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContexts";
import { Link } from "react-router-dom"

export default function ForgotPassword() {
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [message, setMessage] = useState('')
    const [loading, setLoading] = useState(false)

    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setMessage('')
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            setMessage('Заглянь на пошту за подальшими інструкціями')
        } catch {
            setError('Не вдалосяя відновити пароль')
        }
        setLoading(false)
    }

    return(
        <>
        <Card>
            <Card.Body style={{backgroundColor: "#FAECE1"}}>
                <h2 className = 'text-center mb-4' style={{color: "#542400", fontFamily: "unset"}}>Скинути пароль</h2>
                {error && <Alert variant = 'danger'>{error}</Alert>}
                {message && <Alert variant = 'success'>{message}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id = 'email'>
                        <Form.Label style={{color: "#542400", fontFamily: "Forum"}}>Корпоративна пошта</Form.Label>
                        <Form.Control type = 'email' ref = {emailRef} required></Form.Control>
                    </Form.Group>
                    <Button disabled = {loading} className = 'w-100' type = 'submit' style={{backgroundColor: "#542400", border: "#542400", marginTop: "35px", height: "65px", fontFamily: "Forum", fontSize: "20px"}}>Скинути пароль</Button>
                </Form>
                <div className = 'w-100 text-center mt-3'>
                    <Link to="/login" style={{color: "#542400", fontFamily: "Forum"}}>Увійти</Link>
                </div>
            </Card.Body>
        </Card>
        <div className = 'w-100 text-center mt-2' style={{color: "#542400", fontFamily: "Forum"}}>
             Не зареєстрований? <Link to="/signup" style={{color: "#542400", fontFamily: "Forum"}}>Зареєструватися</Link>
        </div>
        </>
    )
}
