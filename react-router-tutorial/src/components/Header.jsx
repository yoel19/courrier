import React from "react";
import "../styles/header.css";
// import { LinksFunction } from "@remix-run/node";
// import logo from "../../public/logo.svg";
// import { NavLink } from "@remix-run/react"



export default function Header() {
    return (


        <header class="header">

            <div id="menu-btn" class="fas fa-bars"></div>

            <a href="" class="logo">
                WATEBA
            </a>

            <nav class="navbar">
                <a href="/dashboard/parametreAdmin">Parametre</a>
                <a href='/dashboard/workspaceAdmin'>espace de travails</a>
                <a href='/dashboard/users'>Utilisateurs</a>
                <a href='/dashboard/Archives'>Archives</a>
            </nav>

            <a href="#request-form" class="btn">Support us</a>

        </header>
    );
}
