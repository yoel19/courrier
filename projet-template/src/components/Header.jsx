import React from "react";
import "../styles/header.css";
import { NavLink, useNavigate } from "react-router-dom";
import { logout } from "../services/auth";
import { FaBars, FaTimes } from "react-icons/fa";
import { IS_ADMIN, IS_HOD, IS_SECRETARY } from "../utils/constants";



export default function Header({ prefixe }) {
    const [isMobileNav, setIsMobileNav] = React.useState(false)
    const navigate = useNavigate()
    const roleURL = prefixe
    let backgroudColor

    switch (roleURL) {
        case IS_ADMIN.toLowerCase():
            backgroudColor = "#1b1e66ff"
            break
        case IS_HOD.toLowerCase():
            backgroudColor = "#240241"
            break
        case IS_SECRETARY.toLowerCase():
            backgroudColor = "#08687d"
            break

        default:
            backgroudColor = "#1b1e66ff"
            break

    }


    function handleLogout() {
        logout()

        navigate("/login", { replace: true })
    }

    function burgerToggle() {
        setIsMobileNav(!isMobileNav)
    }
    // console.log(role);
    return (


        <header style={{ backgroundColor: backgroudColor }} className="header">
            <div onClick={() => burgerToggle()} id="menu-btn">
                {isMobileNav ? <FaTimes size={25} /> : <FaBars size={25} />}
            </div>

            {/* <NavLink to={`dashboard`} className="logo">
                WATEBA
            </NavLink> */}

            {roleURL == IS_ADMIN.toLowerCase() &&
                <NavLink to={`dashboard`} className="logo">
                    WATEBA ADMIN
                </NavLink>
            }
            {roleURL == IS_HOD.toLowerCase() &&
                <NavLink to={`settings`} className="logo">
                    WATEBA HOD
                </NavLink>
            }
            {roleURL == IS_SECRETARY.toLowerCase() &&
                <NavLink to={`archive`} className="logo">
                    WATEBA SECRETARY
                </NavLink>
            }




            <nav className={isMobileNav ? "navbar active" : "navbar"}>
                <NavLink to={`settings`}>Parametres</NavLink>



                {roleURL == IS_ADMIN.toLowerCase() && <><NavLink to={`workspace`}>espace de travails</NavLink>
                    <NavLink to={`dashboard/all-users`}>Utilisateurs</NavLink></>}

                {roleURL == IS_SECRETARY.toLowerCase() && <><NavLink to={`courriers`}>Courriers entrant</NavLink>
                    <NavLink to={`mails`}>courriers sortants</NavLink></>}

                {roleURL == IS_HOD.toLowerCase() && <NavLink to={`dashboard/internal-mails`}>Courriers interne</NavLink>}


                <NavLink to={`archive`}>Archive</NavLink>
            </nav>

            <button onClick={() => handleLogout()} className="btn">Deconnexion</button>

        </header >
    );
}
