import React from 'react'
import { useState } from 'react';
import '@fontsource/inter';


export default function ParametreAdmin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogout = () => {
        setUsername('');
        setPassword('');
    };

    const handleSave = () => {
        // Logique de sauvegarde
        alert('Paramètres enregistrés avec succès !');
    };

    return (
        <div className="container mt-5" style={{width: 500}}>
            <a href="/dashboard/navbar">Home</a>

            <h2>Paramètres Administrateur</h2>
            <div className="mb-3">
                <label htmlFor="username" className="form-label">
                    Nom d'utilisateur:
                </label>
                <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
            </div>
            <div className="mb-3">
                <label htmlFor="password" className="form-label">
                    Mot de passe:
                </label>
                <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <button className="btn btn-primary mr-2" onClick={handleSave}>
                Enregistrer
            </button>
            <button className="btn btn-secondary" onClick={handleLogout}>
                Se Déconnecter
            </button>
        </div>
    );
}
