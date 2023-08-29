import { useRef } from "react";
// import { FaBars, FaTimes } from "react-icons/fa";
const navRef = useRef();

export default function SecretaryNavBar() {
    return (
        <nav ref={navRef}>
            <a href='/dashboard/secretary/parameters'>Parametre</a>
            <a href='/dashboard/secretary/incoming'>Courriers entrant</a>
            <a href='/dashboard/secretary/outcoming'>courriers sortants</a>

            <a href='/dashboard/Archives'>Archive</a>
            <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                <FaTimes />

            </button>
        </nav>
    )
}