import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import './Navbar.css';
function Navbar() {
    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classlist.toggle("responsive_nav");
    }
    return (
        <header>
            <h3>WATEBA</h3>
            <nav ref={navRef}>
                <a href='/dashboard/secretary/parameters'>Parametre</a>
                <a href='/dashboard/secretary/incoming'>Courriers entrant</a>
                <a href='/dashboard/secretary/outcoming'>courriers sortants</a>

                <a href='/dashboard/Archives'>Archive</a>
                <button className="nav-btn nav-close-btn" onClick={showNavbar}>
                    <FaTimes />

                </button>
            </nav>
            <button onClick={showNavbar}>
                <FaBars />
            </button>
        </header>
    )
}




export default Navbar;
