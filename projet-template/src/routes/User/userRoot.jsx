import { Outlet, NavLink, useLoaderData, Form, redirect, useNavigation, useSubmit } from "react-router-dom";
import { getUsers, createUser } from "../../users";
import { useEffect } from "react";
import "../../styles/root.css"
import { requireAuth } from "../../services/auth";

export async function action() {
    const user = await createUser();
    return redirect(`users/${user.id}/edit`);
}

export async function loader({ request }) {

    await requireAuth(request);
    const url = new URL(request.url);
    const q = url.searchParams.get("q");
    const users = await getUsers(q);
    return { users, q };
}



export default function Root() {
    const { users, q } = useLoaderData();
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
                            aria-label="Search users"
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
                    {users.length ? (
                        <ul>
                            {users.map((user) => (
                                <li key={user.id}>
                                    {/* <Link to={`users/${user.id}`}>
                                        {user.first || user.last ? (
                                            <>
                                                {user.first} {user.last}
                                            </>
                                        ) : (
                                            <i>No Name</i>
                                        )}{" "}
                                        {user.favorite && <span>★</span>}
                                    </Link> */}
                                    <NavLink
                                        to={`users/${user.id}`}
                                        className={({ isActive, isPending }) =>
                                            isActive
                                                ? "active"
                                                : isPending
                                                    ? "pending"
                                                    : ""
                                        }
                                    >
                                        {user.first || user.last ? (
                                            <>
                                                {user.first} {user.last}
                                            </>
                                        ) : (
                                            <i>No Name</i>
                                        )}{" "}
                                        {user.favorite && <span>★</span>}
                                    </NavLink>

                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p>
                            <i>Pas d'Utilisateur</i>
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
