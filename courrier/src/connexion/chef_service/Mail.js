import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap';
import '@fontsource/inter';


const Mail = () => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    fetch('https://api.example.com/emails')
      .then((response) => response.json())
      .then((emails) => setEmails(emails));
  }, []);

  return (
    <Container>
      <Row>
        <Col md="6">
          <h1>Courrier</h1>
          <ul>
            {emails.map((email) => (
              <li key={email.id}>
                {email.subject}
                <button onClick={() => {
                  // View the email.
                }}>Voir</button>
              </li>
            ))}
          </ul>
        </Col>
      </Row>
    </Container>
  );
};

export default Mail;
