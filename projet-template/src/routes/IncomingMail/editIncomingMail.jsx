import React, { useState } from "react"
import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { updateIncomingMail } from "../../incomingMails";
import SelectIncomingMailType from "../../components/SelectIncomingType";

export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateIncomingMail(params.incomingMailId, updates);
    return redirect(`/secretary/courriers/incomingMails/${params.incomingMailId}`);
}

export default function EditIncomingMail() {
    const [selectedOption, setSelectedOption] = useState('');

    const handleSelect = (option) => {
        setSelectedOption(option);
    };

    const { incomingMail } = useLoaderData();
    const navigate = useNavigate();


    return (
        <Form method="post" id="contact-form">
            <p>
                <span>Expediteur du Courrier</span>
                <input
                    placeholder="Nom de L'Expediteur"
                    aria-label="Sender Name"
                    type="text"
                    name="senderName"
                    defaultValue={incomingMail.senderName}
                />
                <input
                    placeholder="Email De l'Expediteur"
                    aria-label="Sender Email"
                    type="email"
                    name="senderEmail"
                    defaultValue={incomingMail.senderEmail}
                />
            </p>
            <label>
                <span>Libellé</span>
                <input
                    type="text"
                    name="label"
                    placeholder="Saisir le Libellé"
                    defaultValue={incomingMail.label}
                />
            </label>
            <label>
                <span>Date de reception</span>
                <input
                    type="date"
                    name="date"
                    placeholder="La Date"
                    defaultValue={incomingMail.date}
                />
            </label>
            <label>
                <span>Type de Courrier</span>
                <SelectIncomingMailType name="type" onSelect={handleSelect} defaultValue={incomingMail.type} />
            </label>
            <label>
                <span>Destinataire</span>
                <input
                    placeholder="Nom Du Destinataire"
                    aria-label="Avatar URL"
                    type="text"
                    name="receiverName"
                    defaultValue={incomingMail.receiverName}
                />
            </label>

            <label>
                <span>Motif</span>
                <textarea
                    name="reason"
                    defaultValue={incomingMail.reason}
                    rows={4}
                />
            </label>
            <p>
                <button type="submit">Soumettre</button>
                <button
                    type="button"
                    onClick={() => {
                        navigate(-1);
                    }}
                >
                    Tout Effacer
                </button>
            </p>
        </Form>
    );
}