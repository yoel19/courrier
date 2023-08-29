import UserRoot, { loader as rootLoader, action as rootAction } from '../../routes/User/userRoot';
import User, { loader as userLoader, action as userAction } from '../../routes/User/user';
import EditUser, { action as editUserAction } from '../../routes/User/editUser';
import UserErrorPage from '../errors/userErrorPage';
import UserIndex from '../../routes/User/userIndex';
import { action as destroyUserAction } from '../../routes/User/destroyUser';


const userRoutes = {
    path: "allusers",
    element: <UserRoot />,
    errorElement: <UserErrorPage />,
    // loader: async ({ request }) => await requireAuth(request),
    loader: rootLoader,
    action: rootAction,
    children: [
        {
            errorElement: <UserErrorPage />,
            children: [{ index: true, element: <UserIndex /> },
            {
                path: "users/:userId",
                element: <User />,
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
            },]
        }
    ],

}


export default userRoutes






