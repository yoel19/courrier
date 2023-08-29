import { apiURL } from "./auth";

const API_URL = apiURL

export const getIncomingMails = async () => {
    const response = await fetch(`${API_URL}/incoming_mails`);
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error('Erreur lors de la récupération des courriers');
    }
};

export const getIncomingMail = async (mailID) => {
    const response = await fetch(`${API_URL}/incoming_mails/${mailID}`);
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error('Erreur lors de la récupération du courrier');
    }
};

export const createIncomingMail = async (mail) => {
    const response = await fetch(`${API_URL}/incoming_mails`, {
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
        throw new Error('Erreur lors de la création du courrier');
    }
};

export const updateIncomingMail = async (id, mail) => {
    const response = await fetch(`${API_URL}/incoming_mails/${id}`, {
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
        throw new Error('Erreur lors de la mise à jour du courrier');
    }
};

export const deleteIncomingMail = async (id) => {
    const response = await fetch(`${API_URL}/incoming_mails/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Erreur lors de la suppression du courrier');
    }
};
