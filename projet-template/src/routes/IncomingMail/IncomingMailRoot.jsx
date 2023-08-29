import { Outlet, NavLink, useLoaderData, Form, redirect, useNavigation, useSubmit } from "react-router-dom";
import { getIncomingMails, createIncomingMail } from "../../incomingMails";
import { useEffect } from "react";
import "../../styles/root.css"
import { requireAuth, requireAuthorization } from "../../services/auth";
import { IS_SECRETARY } from "../../utils/constants";

export async function action() {
    const incomingMail = await createIncomingMail();
    return redirect(`incomingMails/${incomingMail.id}/edit`);
}

export async function loader({ request }) {

    await requireAuth(request);
    // await requireAuthorization(request, IS_SECRETARY)
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const incomingMails = await getIncomingMails(q);
    return { incomingMails, q };
}



export default function IncomingMailRoot() {
    const { incomingMails, q } = useLoaderData();
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
                            aria-label="Search incomingMails"
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
                    {incomingMails.length ? (
                        <ul>
                            {incomingMails.map((incomingMail) => (
                                <li key={incomingMail.id}>
                                    {/* <Link to={`incomingMails/${incomingMail.id}`}>
                                        {incomingMail.first || incomingMail.last ? (
                                            <>
                                                {incomingMail.first} {incomingMail.last}
                                            </>
                                        ) : (
                                            <i>No Name</i>
                                        )}{" "}
                                        {incomingMail.favorite && <span>★</span>}
                                    </Link> */}
                                    <NavLink
                                        to={`incomingMails/${incomingMail.id}`}
                                        className={({ isActive, isPending }) =>
                                            isActive
                                                ? "active"
                                                : isPending
                                                    ? "pending"
                                                    : ""
                                        }
                                    >
                                        {incomingMail.label ? (
                                            <>
                                                {incomingMail.label}
                                            </>
                                        ) : (
                                            <i>Courrier Sans Label</i>
                                        )}{" "}
                                        {incomingMail.favorite && <span>★</span>}
                                    </NavLink>

                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>
                            <i>Pas De Courrier Entrant</i>
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
