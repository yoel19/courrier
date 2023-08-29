import * as React from "react"
import { useNavigate } from 'react-router-dom'
import { logout } from "../services/auth"


export default function Logout() {
    const navigate = useNavigate()
    function handleLogout() {
        logout()

        navigate("/login", { replace: true })
    }
    return (<div>Home Content <button onClick={() => handleLogout()}>Logout</button></div>)
}

