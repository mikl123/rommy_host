import { logDOM } from "@testing-library/react";
import React, { useRef, useState } from "react";
import { Form, Button, Card, Alert } from "react-bootstrap"
import { useAuth } from "../contexts/AuthContexts";
import { Link, useNavigate } from "react-router-dom"

export default function UpdateProfile() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const passwordConfirmRef = useRef()
    const { currentUser, updatePassword, updateEmail } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !== passwordConfirmRef.current.value) {
            return setError('Паролі не збігаються')
        }

        const promises = []
        setLoading(true)
        setError('')
        if (emailRef.current.value !== currentUser.email) {
            promises.push(updateEmail(emailRef.current.value))
        }
        if (passwordRef.current.value) {
            promises.push(updatePassword(passwordRef.current.value))
        }

        Promise.all(promises).then(() => {
            navigate('/')
        }).catch(() => {
            setError("Не вдалося редагувати профіль")
        }).finally(() => {
            setLoading(false)
        })
    }

    return(
        <>
        <Card>
            <Card.Body style={{color: "#542400", backgroundColor: "#FAECE1"}}>
                <h2 className = 'text-center mb-4' style={{color: "#542400", fontFamily: "unset"}}><strong>Редагувати профіль</strong></h2>
                {error && <Alert variant = 'danger'>{error}</Alert>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group id = 'email'>
                        <Form.Label style={{color: "#542400", fontFamily: "Forum"}}>Корпоративна пошта</Form.Label>
                        <Form.Control type = 'email' ref = {emailRef} required defaultValue={currentUser.email}></Form.Control>
                    </Form.Group>
                    <Form.Group id = 'password'>
                        <Form.Label style={{color: "#542400", fontFamily: "Forum"}}>Пароль</Form.Label>
                        <Form.Control type = 'password' ref = {passwordRef}></Form.Control>
                    </Form.Group>
                    <Form.Group id = 'password-confirm'>
                        <Form.Label style={{color: "#542400", fontFamily: "Forum"}}>Підтвердження паролю</Form.Label>
                        <Form.Control type = 'password' ref = {passwordConfirmRef} required></Form.Control>
                    </Form.Group>
                    <Button disabled = {loading} className = 'w-100' type = 'submit' style={{backgroundColor: "#542400", border: "#542400", marginTop: "20px", height: "65px", fontFamily: "Forum", fontSize: "20px"}}>Редагувати</Button>
                </Form>
            </Card.Body>
        </Card>
        <div className = 'w-100 text-center mt-2'>
            <Link style={{color: "#542400", fontFamily: "Forum"}} to="/">Скасувати</Link>
        </div>
        </>
    )
}
