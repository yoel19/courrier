import * as React from "react"
import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import "../styles/connexion.css";
import { loginUser } from "../services/auth";
// import { updateContact } from "../contacts";

// export async function action({ request, params }) {
//     const formData = await request.formData();
//     const updates = Object.fromEntries(formData);
//     await updateContact(params.contactId, updates);
//     return redirect(`/contacts/${params.contactId}`);
// }

export default function Connexion() {
    // const { contact } = useLoaderData();
    const [status, setStatus] = React.useState("idle")
    // const [error, setError] = React.useState(null)
    // const message = useLoaderData()
    const [loginFormData, setLoginFormData] = React.useState({ email: "", password: "" })
    const navigate = useNavigate();
    function handleSubmit(e) {
        e.preventDefault()
        setStatus("submitting")
        console.log(loginFormData)
        // loginUser(formData).then(redirect("/")).catch(e => setError(e))
        navigate("/dashboard")
    }

    function handleChange(e) {
        const { name, value } = e.target
        setLoginFormData(prev => ({
            ...prev,
            [name]: value
        }))
    }

    return (
        <form method="post" id="contact-form" className="connexion" onSubmit={handleSubmit}>

            <h2>Veuillez vous connecter à votre espace</h2>

            <label>
                <span>Email</span>
                <input
                    placeholder="joel@satsi.com"
                    name="email"
                    onChange={handleChange}
                    type="email"
                    value={loginFormData.email}
                // defaultValue={contact.twitter}
                />
            </label>
            <label>
                <span>Password</span>
                <input
                    type="password"
                    name="password"
                    onChange={handleChange}
                    value={loginFormData.password}
                />
            </label>

            <p>
                <button type="submit" disabled={status === "submitting"} className={status === "submitting" ? "submit" : undefined}>
                    {status === "submitting"
                        ? "En cours de connexion..."
                        : "Connexion"
                    }
                </button>
                <button
                    className={status === "submitting" ? "displayed" : undefined}
                    type="reset"
                // onClick={() => {
                //     // navigate(-1);
                //     redirect("/");
                // }}
                >
                    Cancel
                </button>
            </p>
        </form>
    );
}