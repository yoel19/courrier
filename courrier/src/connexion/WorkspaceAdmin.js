import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap';
import '@fontsource/inter';
import { apiUrl } from '../config';


const Workspace = () => {
  const [emails, setEmails] = useState([]);
  const [status, setStatus] = useState('');
  const [incomingCount, setIncomingCount] = useState(0);
  const [outgoingCount, setOutgoingCount] = useState(0);
  const [secretaryEmails, setSecretaryEmails] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/ Parameters/emails`)
      .then((response) => response.json())
      .then((emails) => {
        setEmails(emails);
        setIncomingCount(emails.filter(email => email.direction === 'incoming').length);
        setOutgoingCount(emails.filter(email => email.direction === 'outgoing').length);
      });

    fetch(`${apiUrl}/ Parameters/secretary-emails`)
      .then((response) => response.json())
      .then((emails) => {
        setSecretaryEmails(emails);
      });
  }, []);

  const handleStatusChange = (status) => {
    setStatus(status);
  };

  const renderEmails = () => {
    return emails.map((email) => (
      <Card key={email.id}>
        <CardBody>
          <CardTitle>{email.subject}</CardTitle>
          <p>{email.body}</p>
          <Button onClick={() => handleStatusChange('Valider')}>
            valider
          </Button>
          <Button onClick={() => handleStatusChange('non valider')}>
            non valider
          </Button>
        </CardBody>
      </Card>
    ));
  };

  const renderSecretaryEmails = () => {
    return secretaryEmails.map((email) => (
        <div>
            
            <Card key={email.id}>
        <CardBody>
          <CardTitle>{email.subject}</CardTitle>
          <p>{email.body}</p>
          <Button onClick={() => handleStatusChange('read')}>
            Lire
          </Button>
          <Button onClick={() => handleStatusChange('unread')}>
            non lu
          </Button>
        </CardBody>
      </Card>
        </div>
      
    ));
  };

  return (
    <Container>
        <a href="/dashboard/navbar">Home</a>
      <Row>
        <Col md="6">
          <h1>Espace de travail</h1>
          <p>
            Vous avez {incomingCount} e-mails entrants et {outgoingCount} e-mails sortants.
          </p>
          <ul>
            {renderEmails()}
          </ul>
        </Col>
        <Col md="6">
          <h1>Courrier de la secrétaire</h1>
          <p>
            Vous avez {secretaryEmails.length} e-mails de la secrétaire.
          </p>
          <ul>
            {renderSecretaryEmails()}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default Workspace;
