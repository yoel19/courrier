import { Form, useFetcher, useLoaderData } from "react-router-dom";
import { getIncomingMail, updateIncomingMail } from "../../incomingMails";

export async function action({ request, params }) {
    // let formData = await request.formData();
    // return updateIncomingMail(params.incomingMailId, 
    // //     {
    // //     favorite: formData.get("favorite") === "true",
    // // }
    // );
    return null
}

export async function loader({ params }) {

    const incomingMail = await getIncomingMail(params.incomingMailId);
    if (!incomingMail) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
        });
    }
    return { incomingMail };
}

export default function IncomingMail() {
    const { incomingMail } = useLoaderData();

    // const incomingMail = {
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
                    key={incomingMail.avatar}
                    src={incomingMail.avatar || null}
                />
            </div>

            <div>
                <h1>
                    {incomingMail.label ? (
                        <>
                            {incomingMail.label}
                        </>
                    ) : (
                        <i>Courrier Sans Label</i>
                    )}{" "}
                    {/* <Favorite incomingMail={incomingMail} /> */}
                </h1>

                {incomingMail.senderEmail && (
                    <p> Par {" "}
                        <a>
                            {incomingMail.senderEmail}
                        </a>
                    </p>
                )}

                {incomingMail.receiverName && <p>Destiné à {" "} {incomingMail.receiverName}</p>}

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

// function Favorite({ incomingMail }) {

//     const fetcher = useFetcher();

//     // yes, this is a `let` for later
//     let favorite = incomingMail.favorite;
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