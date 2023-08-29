import Connexion from "../connexion/login";
import Navbar from "../connexion/Navbar";
import ParametreAdmin from "../connexion/parametreAdmin";
import Users from "../connexion/Users";
import WorkspaceAdmin from "../connexion/WorkspaceAdmin";

import SecretaryDashoard from "../connexion/secretaire/Navbar";
import IncomingMail from "../connexion/secretaire/IncomingMail";
import OutComingMail from "../connexion/secretaire/OutgoingMail";
import Archives from "../connexion/Archives";
// import Parameters from "../connexion/secretaire/Parameters";

const routes = [

    {
        path: '',
        element: <Connexion />
    },
    {
        path: '/dashboard/secretary/outcoming',
        element: <OutComingMail />
    },
    {
        path: '/dashboard/secretary/incoming',
        element: <IncomingMail />
    },
    {
        path: '/dashboard/Navbar',
        element: <Navbar />
    },
    {
        path: '/dashboard/parametreAdmin',
        element: <ParametreAdmin />
    },
    {
        path: '/dashboard/workspaceAdmin',
        element: <WorkspaceAdmin />
    },
    {
        path: '/dashboard/users',
        element: <Users />
    },
    {
        path: '/dashboard/secretary',
        element: <SecretaryDashoard />
    },
    {
        pqath: '/dashboard/Archives',
        element: <Archives />
    },
    {
        path: '/dashboard/secretary/parameters',
        element: <SecretaryDashoard />
    },
    {
        path: '/dashboard/chief',
        element: <ChiefDashboard />
    },
    /*{
        path: '*',
        element: <Connexion />
    },*/
];

export default routes;