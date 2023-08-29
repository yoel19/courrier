import { useRef } from "react";
import{FaBars, FaTimes} from "react-icons/fa";
import './Navbar.css';
import '@fontsource/inter';

function Navbar(){
    const navRef = useRef();

    const showNavbar = () => {
        navRef.current.classlist.toggle("responsive_nav");
    }
    return(
        <header>
            <h3>WATEBA</h3>
            <nav ref={navRef}>
                <a href="/#">Parametre</a>
                <a href="/#">Courriers interne</a>
                <a href="/#">Archive</a>
                <button className="nav-btn nav-close-btn" onClick={showNavbar}>
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
