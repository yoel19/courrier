import { redirect } from "react-router-dom";
import { deleteUser } from "../../users";

export async function action({ params }) {
    // throw new Error("oh dang!");
    await deleteUser(params.userId);
    return redirect("/admin/dashboard");
}