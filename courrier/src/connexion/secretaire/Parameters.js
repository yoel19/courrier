import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap';
import '@fontsource/inter';
import { apiUrl } from '../../config';


const Parameters = () => {
  const [emails, setEmails] = useState([]);
  const [status, setStatus] = useState('');
  const [user, setUser] = useState({
    name: '',
    email: '',
    role: '',
  });
  const [incomingCount, setIncomingCount] = useState(0);
  const [outgoingCount, setOutgoingCount] = useState(0);

  useEffect(() => {
    fetch(`${apiUrl}/ Parameters/emails`)
      .then((response) => response.json())
      .then((emails) => {
        setEmails(emails);
      });

    fetch(`${apiUrl}/ Parameters/users/me`)
      .then((response) => response.json())
      .then((user) => {
        setUser(user);
      });

    fetch(`${apiUrl}/statistics/emails `)
      .then((response) => response.json())
      .then((statistics) => {
        setIncomingCount(statistics.incomingCount);
        setOutgoingCount(statistics.outgoingCount);
      });
  }, []);

  const handleLogout = () => {
    fetch(`${apiUrl}/logout `)
      .then((response) => response.json())
      .then((user) => {
        setUser(user);
      });
  };

  const renderEmails = () => {
    return emails.map((email) => (
      <Card key={email.id}>
        <CardBody>
          <CardTitle>{email.subject}</CardTitle>
          <p>{email.body}</p>
          <Button onClick={() => handleStatusChange(email.status)}>
            {email.status}
          </Button>
        </CardBody>
      </Card>
    ));
  };

  const renderUser = () => (
    <Card key={user.id}>
      <CardBody>
        <CardTitle>{user.name}</CardTitle>
        <p>{user.email}</p>
        <p>{user.role}</p>
      </CardBody>
    </Card>
  );

  const renderStatistics = () => (
    <Card key={user.id}>
      <CardBody>
        <CardTitle>Statistiques</CardTitle>
        <p>Courrier entrants : {incomingCount}</p>
        <p>Courrier sortants : {outgoingCount}</p>
        <p>Total : {incomingCount + outgoingCount}</p>
      </CardBody>
    </Card>
  );

  return (
    <Container>
      <Row>
        <Col md="6">
          <h1>Courrier interne</h1>
          <ul>
            {renderEmails()}
          </ul>
        </Col>
        <Col md="6">
          <h1>Profil utilisateur</h1>
          {renderUser()}
        </Col>
      </Row>
      <Row>
        <Col md="6">
          <h1>Statistiques</h1>
          {renderStatistics()}
        </Col>
        <Col md="6">
          <Button onClick={() => handleLogout()}>
            Se déconnecter
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default Parameters;
