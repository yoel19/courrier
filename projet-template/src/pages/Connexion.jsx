import * as React from "react"
import { Form, useLoaderData, redirect, useNavigate, useActionData, useNavigation } from "react-router-dom";
import "../styles/connexion.css";
import { loginUser } from "../services/auth";

export function loader({ request }) {
    const url = new URL(request.url)
    const LoggedIn = localStorage.getItem("loggedIn")
    const isLoggedIn = LoggedIn == null

    console.log(isLoggedIn, "From Login");

    // if (isLoggedIn == null) return redirect("/dashboard")




    return { message: url.searchParams.get("message"), isLoggedIn: !isLoggedIn }
}



export async function action({ request }) {

    const formData = await request.formData()
    const email = formData.get("email")
    const password = formData.get("password")

    const pathname = new URL(request.url)
        .searchParams.get("redirectTo") || "/admin/dashboard"

    try {
        const data = await loginUser({ email, password })
        localStorage.setItem("user", JSON.stringify(data.user))
        return redirect(pathname)
    } catch (err) {
        if (err.status === 400) {
            err.message = "Email ou Mot de passe incorrect"
            return err.message
        }
        return "Veuillez saisir vos identifiants"
    }
}


export default function Connexion() {
    const navigation = useNavigation()
    const [error, setError] = React.useState(null)
    const loaderData = useLoaderData()

    const navigate = useNavigate()
    React.useEffect(() => {

        if (loaderData.isLoggedIn) navigate("/user/dashboard")//console.log("Yes already")//redirect(loaderData.redirectPage)
    }, [loaderData.isLoggedIn])


    const errorForm = useActionData()

    function handleSubmit(e) {
        e.preventDefault()
        setStatus("submitting")
        setError(null)
        loginUser(loginFormData)
            .then(data => {
                navigate("/host", { replace: true })
            })
            .catch(err => setError(err))
            .finally(() => setStatus("idle"))
    }

    return (
        <Form replace method="post" id="contact-form" className="connexion">

            <h2 id="bigLabel">Veuillez vous connecter à votre espace</h2>
            {loaderData.message && <h3 className="red">{loaderData.message}</h3>}
            {errorForm && <h3 className="red">{errorForm}</h3>}

            <label htmlFor="email">
                <span>Email</span>
                <input
                    required
                    placeholder="joel@satsi.com"
                    name="email"
                    type="email"
                // defaultValue={contact.twitter}
                />
            </label>
            <label htmlFor="password">
                <span>Password</span>
                <input
                    required
                    type="password"
                    name="password"
                />
            </label>

            <p className="connexionButtons">
                <button
                    type="submit" disabled={navigation.state === "submitting"}
                    className={navigation.state === "submitting" ? "submit" : undefined}>
                    {navigation.state === "submitting"
                        ? "En cours de connexion..."
                        : "Connexion"
                    }
                </button>
                <button
                    className={navigation.state === "submitting" ? "displayed" : undefined}
                    type="reset"
                // onClick={() => {
                //     // navigate(-1);
                //     redirect("/");
                // }}
                >
                    Cancel
                </button>
            </p>
        </Form>
    );
}