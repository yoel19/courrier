import { redirect } from "react-router-dom";
import { deleteIncomingMail } from "../../incomingMails";

export async function action({ params }) {
    // throw new Error("oh dang!");
    await deleteIncomingMail(params.incomingMailId);
    return redirect("/secretary/courriers");
}