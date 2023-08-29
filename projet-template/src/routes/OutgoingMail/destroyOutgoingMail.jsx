import { redirect } from "react-router-dom";
import { deleteOutgoingMail } from "../../outgoingMails";

export async function action({ params }) {
    // throw new Error("oh dang!");
    await deleteOutgoingMail(params.userId);
    return redirect("/secretary/mails");
}