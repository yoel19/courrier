import { Link, useRouteError } from "react-router-dom";


export default function ErrorPage() {
    const error = useRouteError();
    console.error(error);

    return (
        <div id="error-page">
            <h1>Oops!</h1>
            <p>Desole, une erreure a été rencontrée.</p>
            <p>
                <i>{error.statusText || error.message}</i>
            </p>
            <div>
                Cliquer pour revenir <Link to="/">Accueil</Link>
            </div>
        </div>
    );
}