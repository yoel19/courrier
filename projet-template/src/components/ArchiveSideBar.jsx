import { NavLink } from 'react-router-dom'

export default function ArchiveSideBar() {
    return (
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
                            to={`infos/1`}
                            className={({ isActive, isPending }) =>
                                isActive
                                    ? "active"
                                    : isPending
                                        ? "pending"
                                        : ""
                            }
                        >
                            Tous les Courriers
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
                            Courriers Entrants
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
                            Courriers Sortants
                        </NavLink>

                    </li>
                </ul>
            </nav>
        </div>
    )
}
