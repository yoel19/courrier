import { apiURL } from "./auth";

const API_URL = apiURL

export const getOutgoingMails = async () => {
    const response = await fetch(`${API_URL}/outgoing_mails`);
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error('Erreur lors de la récupération des courriers sortant');
    }
};

export const getOutgoingMail = async (mailID) => {
    const response = await fetch(`${API_URL}/outgoing_mails/${mailID}`);
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error('Erreur lors de la récupération du courrier sortant');
    }
};

export const createOutgoingMail = async (mail) => {
    const response = await fetch(`${API_URL}/outgoing_mails`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(mail),
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error('Erreur lors de la création du courrier sortant');
    }
};

export const updateOutgoingMail = async (id, mail) => {
    const response = await fetch(`${API_URL}/outgoing_mails/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(mail),
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error('Erreur lors de la mise à jour du courrier sortant');
    }
};

export const deleteOutgoingMail = async (id) => {
    const response = await fetch(`${API_URL}/outgoing_mails/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Erreur lors de la suppression du courrier sortant');
    }
};
