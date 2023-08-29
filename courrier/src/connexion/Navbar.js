import { useRef } from "react";
import{FaBars, FaTimes} from "react-icons/fa";
import './Navbar.css';
import { useNavigate } from "react-router-dom";
import '@fontsource/inter';
import IMAGE from "../image";


function Navbar(){
    const navRef = useRef();

    const navigate = useNavigate();

    const showNavbar = () => {
        navRef.current.classList.toggle("responsive_nav");

    }
    
    return(
        <header>
            <h3>WATEBA</h3>
            <nav ref={navRef}>
                <a href="/dashboard/parametreAdmin">Parametre</a>
                <a href='/dashboard/workspaceAdmin'>espace de travails</a>
                <a href='/dashboard/users'>Utilisateurs</a>
                <a href='/dashboard/Archives'>Archives</a>
                <button className="nav-btn nav-close-btn responsive_nav" onClick={() => showNavbar()}>
                    <FaTimes/>

                </button>
            </nav>
            <button onClick={showNavbar}>
                <FaBars/>
            </button>
           
        </header>
    )
}




export default Navbar;
