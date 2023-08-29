import { createBrowserRouter, useRoutes, Outlet, useNavigate, redirect } from 'react-router-dom'
import Connexion, { action as LoginAction, loader as LoginLoader } from './pages/Connexion';
import { requireAuth } from './services/auth';
import App, { loader as appLoader } from './routes/App';
import Root, { loader as rootLoader, action as rootAction } from './routes/root';
import Contact, { loader as userLoader, action as userAction } from './routes/contact';
import EditUser, { action as editUserAction } from './routes/edit';
import ErrorPage from './pages/error-page';
import Index from './routes';
import { action as destroyUserAction } from './routes/destroy';
import NotFound from './pages/NotFound';
import Settings, { loader as settingsLoader, action as settingsAction } from './routes/Settings/Settings';
import Archive from './pages/archive/Archive';
import ArchiveIndex from './routes/Archive/ArchiveIndex';
import userRoutes from "./pages/routes/userRoutes"
import incomingMailRoutes from "./pages/routes/incomingMailRoutes"
import outgoingMailRoutes from "./pages/routes/outgoingMailRoutes"
import SettingIndex from './routes/Settings';

export const router = createBrowserRouter([

    {
        path: "/",
        children: [
            { index: true, loader: () => redirect("/login") },
            {
                path: ":roleURL",
                element: <App />,
                loader: appLoader,
                children: [
                    // {
                    //     index: true,
                    //     loader: () => {
                    //         redirect("dashboard")
                    //     }
                    // },

                    {
                        path: "dashboard",
                        element: <Root />,
                        errorElement: <ErrorPage />,
                        // loader: async ({ request }) => await requireAuth(request),
                        loader: rootLoader,
                        action: rootAction,
                        children: [
                            {
                                errorElement: <ErrorPage />,
                                children: [{ index: true, element: <Index /> },
                                {
                                    path: "users/:userId",
                                    element: <Contact />,
                                    loader: userLoader,
                                    action: userAction
                                },
                                {
                                    path: "users/:userId/edit",
                                    element: <EditUser />,
                                    loader: userLoader,
                                    action: editUserAction,
                                },
                                {
                                    path: "users/:userId/destroy",
                                    action: destroyUserAction,
                                    errorElement: <div>Une erreur est arrivée. Vous ne pouvez pas encore supprimez cet Utilisateur</div>,
                                },
                                {
                                    path: "internal-mails",
                                    element: <Index />,
                                },
                                ]
                            }
                        ],

                    },
                    userRoutes,
                    incomingMailRoutes,
                    outgoingMailRoutes,
                    {
                        path: "settings",
                        element: <Settings />,
                        // errorElement: <ErrorPage />,
                        loader: settingsLoader,
                        action: settingsAction,
                        children: [
                            {
                                // errorElement: <ErrorPage />,
                                index: true, element: <SettingIndex />,
                            },
                            {
                                path: "infos",
                                index: true, element: <SettingIndex />,
                            }
                        ]
                    },
                    {
                        path: "archive",
                        element: <Archive />,
                        // errorElement: <ErrorPage />,
                        // loader: async ({ request }) => await requireAuth(request),
                        // loader: settingsLoader,
                        // action: settingsAction,
                        children: [
                            {
                                // errorElement: <ErrorPage />,
                                children: [{ index: true, element: <ArchiveIndex /> },
                                    // {
                                    //     path: "contacts/:contactId",
                                    //     element: <Contact />,
                                    //     loader: contactLoader,
                                    //     action: contactAction
                                    // },
                                    // {
                                    //     path: "contacts/:contactId/edit",
                                    //     element: <EditContact />,
                                    //     loader: contactLoader,
                                    //     action: editAction,
                                    // },
                                    // {
                                    //     path: "contacts/:contactId/destroy",
                                    //     action: destroyAction,
                                    //     errorElement: <div>Oops! Une erreur est arrivée.</div>,
                                    // },
                                ]
                            }
                        ],

                    },
                    {
                        path: "*",
                        element: <NotFound />
                    }
                ]
            },
            {
                path: "login",
                element: <Connexion />,
                loader: LoginLoader,
                action: LoginAction
            },
        ]
    },
    {
        path: "*",

    },
]);




