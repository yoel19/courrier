import React, { useState } from 'react';

const optionsData = [
  { value: 'Facture', label: 'Facture' },
  { value: 'Courrier Postal', label: 'Courrier Postal' },
  { value: 'Colis & Livraison', label: 'Colis & Livraison' },
  { value: 'Retour & Reclamations', label: 'Retour & Reclamations' },
  { value: 'Documents Officiels', label: 'Documents Officiels' },
  { value: 'Autre', label: 'Autre ...' },
  // { value: '', label: '' },
  // { value: '', label: '' },
  // { value: '', label: '' },
];

function SelectIncomingMailType({ onSelect }) {
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

export default SelectIncomingMailType;
