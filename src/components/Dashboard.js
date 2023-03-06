import React, { useState } from 'react'
import { Card, Button, Alert } from 'react-bootstrap'
import { useAuth } from '../contexts/AuthContexts'
import { Link, useNavigate } from 'react-router-dom'

export default function Dashboard() {
    const [error, setError] = useState("")
    const { currentUser, logout } = useAuth()
    const navigate = useNavigate()

    async function handleLogOut() {
        setError('')

        try {
          await logout()
          navigate('/login')
        } catch {
            setError('Не вдалося вийти')
        }
    }
    return (
        <>
        <Card>
            <Card.Body style={{color: "#542400", fontFamily: "unset", backgroundColor: "#FAECE1", textAlign: "center"}}>
                <h2 className = 'text-center mb-4' style={{color: "#542400", fontFamily: "unset"}}><strong>Профіль</strong></h2>
                {error && <Alert variant = 'danger'>{error}</Alert>}
                Корпоративна пошта: {currentUser.email}
                <Link to="/update-profile" className="btn btn-primary w-100 mt-3" style={{backgroundColor: "#542400", border: "#542400", marginTop: "10px", height: "46px", fontFamily: "Forum", fontSize: "18px", padding: "8px"}}>Редагувати профіль</Link>
            </Card.Body>
        </Card>
        <div className = 'w-100 text-center mt-2'>
            <Link to="/login" onClick={handleLogOut} style={{color: "#542400", fontFamily: "Forum"}}>Вийти</Link>
        </div>
        </>
    )
}
