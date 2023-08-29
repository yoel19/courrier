import React from 'react'
import Header from '../components/Header'
import { Outlet, useLoaderData } from 'react-router-dom'
import "../styles/app.css"
import { IS_ADMIN, IS_HOD, IS_SECRETARY } from '../utils/constants'

export async function loader() {


    return user
}

export default function App() {

    const user = useLoaderData()
    const USER_ROLE = undefined

    if (user.role.isAdmin) {
        USER_ROLE = IS_ADMIN
    } else {
        if (user.role.isHOD) {
            USER_ROLE = IS_HOD
        } else {
            USER_ROLE = IS_SECRETARY
        }
    }

    return (
        <div className='app'>
            <Header role={USER_ROLE} />
            <div><Outlet /></div>
        </div>
    )
}
