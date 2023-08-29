import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { updateUser } from "../users";

export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateUser(params.userId, updates);
    return redirect(`/admin/dashboard/users/${params.userId}`);
}

export default function EditUser() {
    const { user } = useLoaderData();
    const navigate = useNavigate();

    return (
        <Form method="post" id="contact-form">
            <p>
                <span>Name</span>
                <input
                    placeholder="First"
                    aria-label="First name"
                    type="text"
                    name="first"
                    defaultValue={user.first}
                />
                <input
                    placeholder="Last"
                    aria-label="Last name"
                    type="text"
                    name="last"
                    defaultValue={user.last}
                />
            </p>
            <label>
                <span>Email</span>
                <input
                    type="email"
                    name="email"
                    placeholder="email@jack.som"
                    defaultValue={user.email}
                />
            </label>
            <label>
                <span>Le Mot de Passe</span>
                <input
                    placeholder="Mot de Passe"
                    aria-label="The Password"
                    type="password"
                    name="password"
                    defaultValue={user.password}
                />
            </label>
            {/* <label>
                <span>Notes</span>
                <textarea
                    name="notes"
                    defaultValue={user.notes}
                    rows={6}
                />
            </label> */}
            <p>
                <button type="submit">Save</button>
                <button
                    type="button"
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    Cancel
                </button>
            </p>
        </Form>
    );
}