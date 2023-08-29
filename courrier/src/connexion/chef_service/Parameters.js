import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap';
import '@fontsource/inter';


const Parameters = () => {
  const [incomingEmails, setIncomingEmails] = useState([]);
  const [outgoingEmails, setOutgoingEmails] = useState([]);
  const [incomingCount, setIncomingCount] = useState(0);
  const [outgoingCount, setOutgoingCount] = useState(0);
  const [status, setStatus] = useState('');

  useEffect(() => {
    fetch('https://api.example.com/incoming_emails')
      .then((response) => response.json())
      .then((incomingEmails) => setIncomingEmails(incomingEmails));
  }, []);

  useEffect(() => {
    fetch('https://api.example.com/outgoing_emails')
      .then((response) => response.json())
      .then((outgoingEmails) => setOutgoingEmails(outgoingEmails));
  }, []);

  useEffect(() => {
    fetch('https://api.example.com/statistics')
      .then((response) => response.json())
      .then((statistics) => {
        setIncomingCount(statistics.incomingCount);
        setOutgoingCount(statistics.outgoingCount);
      });
  }, []);

  const handleLogout = () => {
    // Log the user out.
  };

  return (
    <Container>
      <Row>
        <Col md="6">
          <h1>Paramètres du chef de service</h1>
          <ul>
            <li>
              <h2>Courrier</h2>
              <ul>
                <li>
                  <h3>Courriers entrants</h3>
                  <ul>
                    {incomingEmails.map((email) => (
                      <li key={email.id}>
                        {email.subject}
                        <button onClick={() => {
                          // View the email.
                        }}>Voir</button>
                      </li>
                    ))}
                  </ul>
                </li>
                <li>
                  <h3>Statistiques</h3>
                  <ul>
                    <li>Courrier entrant: {incomingCount}</li>
                    <li>Courrier sortant: {outgoingCount}</li>
                  </ul>
                </li>
              </ul>
            </li>
            <li>
              <h2>État</h2>
              <ul>
                <li>
                  <h3>État du courrier</h3>
                  <ul>
                    <li>
                      {status}
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
          <button onClick={handleLogout}>Se déconnecter</button>
        </Col>
      </Row>
    </Container>
  );
};

export default Parameters;
