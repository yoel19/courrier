import { apiURL } from "./auth";

const API_URL = apiURL

export const getUsers = async () => {
    const response = await fetch(`${API_URL}/users`);
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error('Erreur lors de la récupération des utilisateurs');
    }
};

export const getUser = async (userID) => {
    const response = await fetch(`${API_URL}/users/${userID}`);
    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error("Erreur lors de la récupération de l'utilisateur ");
    }
};

export const createUser = async (user) => {
    const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error('Erreur lors de la création de l\'utilisateur');
    }
};

export const updateUser = async (id, user) => {
    const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(user),
    });

    if (response.ok) {
        const data = await response.json();
        return data;
    } else {
        throw new Error('Erreur lors de la mise à jour de l\'utilisateur');
    }
};

export const deleteUser = async (id) => {
    const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE',
    });

    if (!response.ok) {
        throw new Error('Erreur lors de la suppression de l\'utilisateur');
    }
};
