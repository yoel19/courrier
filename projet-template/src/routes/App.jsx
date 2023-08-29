import React from 'react'
import Header from '../components/Header'
import { Outlet, useLoaderData, useNavigate } from 'react-router-dom'
import "../styles/app.css"
import { IS_ADMIN, IS_HOD, IS_SECRETARY } from '../utils/constants'
import { requireAuth } from '../services/auth'

export async function loader({ request, params }) {
    await requireAuth(request)
    const userFake = {
        email: "admin@wateba.org",
        username: "Admin WATEBA",
        role: {
            isHOD: true
        },
        id: 1
    }



    const userStorage = localStorage.getItem("user")
    const user = userStorage && JSON.parse(userStorage)

    const prefixeURL = params.roleURL

    return { user, prefixeURL }
}

export default function App() {


    const data = useLoaderData()

    let USER_ROLE = undefined
    let roleURL = undefined

    if (data.user.role.isAdmin) {
        USER_ROLE = IS_ADMIN
    } else {
        if (data.user.role.isHOD) {
            USER_ROLE = IS_HOD
        } else {
            USER_ROLE = IS_SECRETARY
        }
    }

    switch (USER_ROLE) {
        case IS_ADMIN:
            roleURL = "admin"
            break
        case IS_HOD:
            roleURL = "hod"
            break
        case IS_SECRETARY:
            roleURL = "secretary"
            break

        default:
            roleURL = "admin"
            break
    }

    console.log(roleURL);

    const navigate = useNavigate()
    React.useEffect(() => {

        if (roleURL != data.prefixeURL) navigate(`/${roleURL}/dashboard`, { replace: true })//console.log("Yes already")//redirect(loaderData.redirectPage)
    }, [data.prefixeURL, roleURL])


    return (
        <div id='app'>
            <Header prefixe={roleURL} />
            <div className='renderOutlet'><Outlet /></div>
        </div>
    )
}
