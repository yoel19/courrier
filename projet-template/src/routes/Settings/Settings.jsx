import { Outlet, Link, NavLink, useLoaderData, Form, redirect, useNavigation, useSubmit } from "react-router-dom";
import { getContacts, createContact } from "../../contacts";
import { useEffect } from "react";
import "../../styles/root.css"
import { requireAuth } from "../../services/auth";

export async function action() {
    const contact = await createContact();
    return redirect(`contacts/${contact.id}/edit`);
}

export async function loader({ request }) {

    await requireAuth(request);
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const contacts = await getContacts(q);
    return { contacts, q };
}



export default function Settings() {
    // const { contacts, q } = useLoaderData();
    const navigation = useNavigation();
    // const submit = useSubmit();

    // const searching =
    //     navigation.location &&
    //     new URLSearchParams(navigation.location.search).has(
    //         "q"
    //     );

    // useEffect(() => {
    //     document.getElementById("q").value = q;
    // }, [q]);

    return (
        <div className="root">
            <div id="sidebar">
                <h1>WATEBA MAILS PARAMETRE</h1>
                <div id="search-form">


                    <div
                        className="sr-only"
                        aria-live="polite"
                    ></div>
                </div>
                <nav>
                    <ul>
                        <li>
                            <NavLink
                                // to={`infos/${user.id}`}
                                to={`infos`}
                                className={({ isActive, isPending }) =>
                                    isActive
                                        ? "active"
                                        : isPending
                                            ? "pending"
                                            : ""
                                }
                            >
                                Modifier Vos infos
                            </NavLink>
                            <NavLink
                                to={`/logout`}
                                className={({ isActive, isPending }) =>
                                    isActive
                                        ? "active"
                                        : isPending
                                            ? "pending"
                                            : ""
                                }
                            >
                                Se deconnecter
                            </NavLink>

                        </li>
                    </ul>
                </nav>
            </div>
            <div id="detail"
                className={
                    navigation.state === "loading" ? "loading" : ""
                }
            >
                <Outlet />
            </div>
        </div>
    );
}
