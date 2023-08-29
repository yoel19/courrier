import OutgoingRoot, { loader as rootLoader, action as rootAction } from '../../routes/OutgoingMail/outgoingMailRoot';
import OutgoingMail, { loader as outgoingMailLoader, action as outgoingMailAction } from '../../routes/OutgoingMail/outgoingMail';
import EditOutgoingMail, { action as editOutgoingMailAction } from '../../routes/OutgoingMail/editOutgoingMail';
import OutgoingMailErrorPage from '../errors/outgoingMailErrorPage';
import OutgoingMailIndex from '../../routes/OutgoingMail/outgoingMailIndex';
import { action as destroyOutgoingMailAction } from '../../routes/OutgoingMail/destroyOutgoingMail';





const outgoingMailRoutes = {
    path: "mails",
    element: <OutgoingRoot />,
    errorElement: <OutgoingMailErrorPage />,
    // loader: async ({ request }) => await requireAuth(request),
    loader: rootLoader,
    action: rootAction,
    children: [
        {
            errorElement: <OutgoingMailErrorPage />,
            children: [{ index: true, element: <OutgoingMailIndex /> },
            {
                path: "outgoingMails/:outgoingMailId",
                element: <OutgoingMail />,
                loader: outgoingMailLoader,
                action: outgoingMailAction
            },
            {
                path: "outgoingMails/:outgoingMailId/edit",
                element: <EditOutgoingMail />,
                loader: outgoingMailLoader,
                action: editOutgoingMailAction,
            },
            {
                path: "outgoingMails/:outgoingMailId/destroy",
                action: destroyOutgoingMailAction,
                errorElement: <div>Une erreur est arrivée. Vous ne pouvez pas encore supprimez cet Courrier Sortant</div>,
            },]
        }
    ],

}


export default outgoingMailRoutes






