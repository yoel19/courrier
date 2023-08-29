import React, { useState } from "react";
import { Form, useLoaderData, redirect, useNavigate } from "react-router-dom";
import { updateOutgoingMail } from "../../outgoingMails";
import SelectOutgoingMailType from "../../components/SelectOutgoingType";

export async function action({ request, params }) {
    const formData = await request.formData();
    const updates = Object.fromEntries(formData);
    await updateOutgoingMail(params.outgoingMailId, updates);
    return redirect(`/secretary/mails/outgoingMails/${params.outgoingMailId}`);
}

export default function EditOutgoingMail() {
    const [selectedOption, setSelectedOption] = useState('');

    const handleSelect = (option) => {
        setSelectedOption(option);
    };

    const { outgoingMail } = useLoaderData();
    const navigate = useNavigate();


    return (
        <Form method="post" id="contact-form">
            <p>
                <span>Destinateur du Courrier</span>
                <input
                    placeholder="Nom du Destinateur"
                    aria-label="Sender Name"
                    type="text"
                    name="receiverName"
                    defaultValue={outgoingMail.receiverName}
                />
                <input
                    placeholder="Email Du Destinateur"
                    aria-label="Receiver Email"
                    type="email"
                    name="receiverEmail"
                    defaultValue={outgoingMail.receiverEmail}
                />
            </p>
            <label>
                <span>Libellé</span>
                <input
                    type="text"
                    name="label"
                    placeholder="Saisir le Libellé"
                    defaultValue={outgoingMail.label}
                />
            </label>
            <label>
                <span>Date d'expedition</span>
                <input
                    type="date"
                    name="date"
                    placeholder="La Date"
                    defaultValue={outgoingMail.date}
                />
            </label>
            <label>
                <span>Type de Courrier</span>
                <SelectOutgoingMailType name="type" onSelect={handleSelect} defaultValue={outgoingMail.type} />
            </label>
            <label>
                <span>Expediteur</span>
                <input
                    placeholder="Nom De l'Expediteur"
                    aria-label="Avatar URL"
                    type="text"
                    name="senderName"
                    defaultValue={outgoingMail.senderName}
                />
            </label>

            <label>
                <span>Motif</span>
                <textarea
                    name="reason"
                    defaultValue={outgoingMail.reason}
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