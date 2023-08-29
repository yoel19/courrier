import { Outlet, NavLink, useLoaderData, Form, redirect, useNavigation, useSubmit } from "react-router-dom";
import { getOutgoingMails, createOutgoingMail } from "../../outgoingMails";
import { useEffect } from "react";
import "../../styles/root.css"
import { requireAuth, requireAuthorization } from "../../services/auth";
import { IS_SECRETARY } from "../../utils/constants";

export async function action() {
    const outgoingMail = await createOutgoingMail();
    return redirect(`outgoingMails/${outgoingMail.id}/edit`);
}

export async function loader({ request }) {

    await requireAuth(request);
    // await requireAuthorization(request, IS_SECRETARY)
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const outgoingMails = await getOutgoingMails(q);
    return { outgoingMails, q };
}



export default function OutgoingMailRoot() {
    const { outgoingMails, q } = useLoaderData();
    const navigation = useNavigation();
    const submit = useSubmit();

    const searching =
        navigation.location &&
        new URLSearchParams(navigation.location.search).has(
            "q"
        );

    useEffect(() => {
        document.getElementById("q").value = q;
    }, [q]);

    return (
        <div className="root">
            <div id="sidebar">
                <h1>WATEBA MAILS</h1>
                <div>
                    <Form id="search-form" role="search">
                        <input
                            id="q"
                            className={searching ? "loading" : ""}
                            aria-label="Search outgoingMails"
                            placeholder="Search"
                            type="search"
                            name="q"
                            defaultValue={q}
                            onChange={(event) => {
                                const isFirstSearch = q == null;
                                submit(event.currentTarget.form, {
                                    replace: !isFirstSearch,
                                });
                            }}
                        />

                        <div
                            id="search-spinner"
                            aria-hidden
                            hidden={!searching}
                        />
                        <div
                            className="sr-only"
                            aria-live="polite"
                        ></div>
                    </Form>
                    <Form method="post">
                        <button type="submit">New</button>
                    </Form>
                </div>
                <nav>
                    {outgoingMails.length ? (
                        <ul>
                            {outgoingMails.map((outgoingMail) => (
                                <li key={outgoingMail.id}>
                                    {/* <Link to={`outgoingMails/${outgoingMail.id}`}>
                                        {outgoingMail.first || outgoingMail.last ? (
                                            <>
                                                {outgoingMail.first} {outgoingMail.last}
                                            </>
                                        ) : (
                                            <i>No Name</i>
                                        )}{" "}
                                        {outgoingMail.favorite && <span>★</span>}
                                    </Link> */}
                                    <NavLink
                                        to={`outgoingMails/${outgoingMail.id}`}
                                        className={({ isActive, isPending }) =>
                                            isActive
                                                ? "active"
                                                : isPending
                                                    ? "pending"
                                                    : ""
                                        }
                                    >
                                        {outgoingMail.label ? (
                                            <>
                                                {outgoingMail.label}
                                            </>
                                        ) : (
                                            <i>Courrier Sans Label</i>
                                        )}{" "}
                                        {outgoingMail.favorite && <span>★</span>}
                                    </NavLink>

                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>
                            <i>Pas de Courrier Sortant</i>
                        </p>
                    )}
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
