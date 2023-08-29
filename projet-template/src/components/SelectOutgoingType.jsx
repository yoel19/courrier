import React, { useState } from 'react';

const optionsData = [
  { value: 'Facture', label: 'Facture' },
  { value: 'Courrier Postal', label: 'Courrier Postal' },
  { value: 'Documents & Contrats', label: 'Documents & Contrats' },
  { value: 'Courrier Publicitaire', label: 'Courrier Publicitaire' },
  { value: 'Courrier de Recrutement', label: 'Courrier de Recrutement' },
  { value: 'Autres', label: 'Autres ...' },
  // { value: '', label: '' },
];

export default function SelectOutgoingMailType({ onSelect }) {
  const [selectedValue, setSelectedValue] = useState('');

  const handleValueChange = (event) => {
    const newValue = event.target.value;
    setSelectedValue(newValue);
    onSelect(newValue); // Appel de la fonction de rappel avec la nouvelle valeur
  };

  return (
    <div className="select-form-container">
      <select value={selectedValue} onChange={handleValueChange}>
        <option value="">Sélectionnez une type de Courrier</option>
        {optionsData.map(option => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
}

