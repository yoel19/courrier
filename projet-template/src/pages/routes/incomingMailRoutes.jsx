import IncomingMailRoot, { loader as rootLoader, action as rootAction } from '../../routes/incomingMail/incomingMailRoot';
import IncomingMail, { loader as incomingMailLoader, action as incomingMailAction } from '../../routes/IncomingMail/incomingMail';
import EditIncomingMail, { action as editIncomingMailAction } from '../../routes/IncomingMail/editIncomingMail';
import IncomingMailErrorPage from '../errors/incomingMailErrorPage';
import IncomingMailIndex from '../../routes/IncomingMail/incomingMailIndex';
import { action as destroyIncomingMailAction } from '../../routes/IncomingMail/destroyIncomingMail';



const incomingMailRoutes = {
    path: "courriers",
    element: <IncomingMailRoot />,
    errorElement: <IncomingMailErrorPage />,
    // loader: async ({ request }) => await requireAuth(request),
    loader: rootLoader,
    action: rootAction,
    children: [
        {
            errorElement: <IncomingMailErrorPage />,
            children: [{ index: true, element: <IncomingMailIndex /> },
            {
                path: "incomingMails/:incomingMailId",
                element: <IncomingMail />,
                loader: incomingMailLoader,
                action: incomingMailAction
            },
            {
                path: "incomingMails/:incomingMailId/edit",
                element: <EditIncomingMail />,
                loader: incomingMailLoader,
                action: editIncomingMailAction,
            },
            {
                path: "incomingMails/:incomingMailId/destroy",
                action: destroyIncomingMailAction,
                errorElement: <div>Une erreur est arrivée. Vous ne pouvez pas encore supprimez cet Utilisateur</div>,
            },]
        }
    ],

}


export default incomingMailRoutes






