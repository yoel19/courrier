import { Link } from "react-router-dom"
export default function Index() {
    return (
        <p id="zero-state">
            WATEBA MAILS DASHBOARD.
            <br />
            Vous etes bien connecté. Consultez{"    "}
            <Link className="link" to="https://reactrouter.com">
                les archives
            </Link>
            .
        </p>
    );
}