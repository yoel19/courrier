import { Form, useFetcher, useLoaderData } from "react-router-dom";
import { getUser, updateUser } from "../../users";

export async function action({ request, params }) {
    // let formData = await request.formData();
    // return updateUser(params.userId, 
    // //     {
    // //     favorite: formData.get("favorite") === "true",
    // // }
    // );
    return null
}

export async function loader({ params }) {

    const user = await getUser(params.userId);
    if (!user) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
        });
    }
    return { user };
}

export default function User() {
    const { user } = useLoaderData();

    // const user = {
    //     first: "Your",
    //     last: "Name",
    //     avatar: "https://placekitten.com/g/200/200",
    //     twitter: "your_handle",
    //     notes: "Some notes",
    //     favorite: true,
    // };

    return (
        <div id="contact">
            <div>
                <img
                    key={user.avatar}
                    src={user.avatar || null}
                />
            </div>

            <div>
                <h1>
                    {user.first || user.last ? (
                        <>
                            {user.first} {user.last}
                        </>
                    ) : (
                        <i>Pas de Nom</i>
                    )}{" "}
                    {/* <Favorite user={user} /> */}
                </h1>

                {user.twitter && (
                    <p>
                        <a
                            target="_blank"
                            href={`https://twitter.com/${user.twitter}`}
                        >
                            {user.twitter}
                        </a>
                    </p>
                )}

                {user.notes && <p>{user.notes}</p>}

                <div>
                    <Form action="edit">
                        <button type="submit">Modifier</button>
                    </Form>
                    <Form
                        method="post"
                        action="destroy"
                        onSubmit={(event) => {
                            if (
                                !confirm(
                                    "Attention! Confirmez vouloir supprimer cet enregistrement."
                                )
                            ) {
                                event.preventDefault();
                            }
                        }}
                    >
                        <button type="submit">Delete</button>
                    </Form>
                </div>
            </div>
        </div>
    );
}

// function Favorite({ user }) {

//     const fetcher = useFetcher();

//     // yes, this is a `let` for later
//     let favorite = user.favorite;
//     if (fetcher.formData) {
//         favorite = fetcher.formData.get("favorite") === "true";
//     }
//     return (
//         <fetcher.Form method="post">
//             <button
//                 name="favorite"
//                 value={favorite ? "false" : "true"}
//                 aria-label={
//                     favorite
//                         ? "Remove from favorites"
//                         : "Add to favorites"
//                 }
//             >
//                 {favorite ? "★" : "☆"}
//             </button>
//         </fetcher.Form>
//     );
// }