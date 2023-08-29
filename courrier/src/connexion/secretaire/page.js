import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import '@fontsource/inter';



const Page = () => {
  const [requestData, setRequestData] = useState({
    type: '',
    libelle: '',
    motif: '',
    timestamp: '',
    screenshot: '',
    //mailType: '', // Nouveau champ pour le type de courrier (entrant/sortant)
    email:'',
    expediteur:'',
    destinataire:'',
    media:[],
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'media') {
      const mediaFiles = Array.from(files); // Convertir la liste de fichiers en un tableau
      setRequestData((prevState) => ({
        ...prevState,
        [name]: mediaFiles,
      }));
    } else {
      setRequestData((prevState) => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const mediaUrls = [];
      

      // Sauvegarder les données de la demande dans Firestore
      //await firestore.collection('requests').add({
      //  ...requestData,
       // media: mediaUrls, // Ajouter les URL des médias à la demande
     // });

      // Effacer les données du formulaire après une soumission réussie
      setRequestData({
        type: '',
        libelle: '',
        motif: '',
        timestamp: '',
        email:'',
        expediteur:'',
        destinataire:'',
        media:[],
        
      });

      alert('Votre demande de support a été soumise avec succès !');
    } catch (error) {
      console.error('Erreur lors de la soumission de la demande :', error);
      alert('Une erreur est survenue lors de la soumission de la demande de support. Veuillez réessayer ultérieurement.');
    }
  };

  return (
    <Container>
      <h2>Tableau de bord </h2>
      <Form onSubmit={handleSubmit}>
        {/* ... Autres champs de formulaire ... */}
        
        <Form.Group controlId="media">
          <Form.Label>media</Form.Label>
          <Form.Control
            type="file"
            name="media"
            accept="image/*"
            multiple
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Button variant="primary" type="submit">
          Envoyer
        </Button>
      </Form>
    </Container>
  );
};

export default Page;
