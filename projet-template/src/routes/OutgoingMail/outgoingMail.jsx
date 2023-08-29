import { Form, useFetcher, useLoaderData } from "react-router-dom";
import { getOutgoingMail, updateOutgoingMail } from "../../outgoingMails";

export async function action({ request, params }) {
    // let formData = await request.formData();
    // return updateOutgoingMail(params.outgoingMailId, 
    // //     {
    // //     favorite: formData.get("favorite") === "true",
    // // }
    // );
    return null
}

export async function loader({ params }) {

    const outgoingMail = await getOutgoingMail(params.outgoingMailId);
    if (!outgoingMail) {
        throw new Response("", {
            status: 404,
            statusText: "Not Found",
        });
    }
    return { outgoingMail };
}

export default function outgoingMail() {
    const { outgoingMail } = useLoaderData();

    // const outgoingMail = {
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
                    key={outgoingMail.avatar}
                    src={outgoingMail.avatar || null}
                />
            </div>

            <div>
                <h1>
                    {outgoingMail.label ? (
                        <>
                            {outgoingMail.label}
                        </>
                    ) : (
                        <i>Courrier Sans Label</i>
                    )}{" "}
                    {/* <Favorite outgoingMail={outgoingMail} /> */}
                </h1>

                {outgoingMail.receiverEmail && (
                    <p>
                        <a
                            target="_blank"
                            href={`mailto:${outgoingMail.receiverEmail}`}
                        >
                            Destiné à   {outgoingMail.receiverEmail}
                        </a>
                    </p>
                )}

                {outgoingMail.senderName && <p>Envoyé par {outgoingMail.senderName}</p>}

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

// function Favorite({ outgoingMail }) {

//     const fetcher = useFetcher();

//     // yes, this is a `let` for later
//     let favorite = outgoingMail.favorite;
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