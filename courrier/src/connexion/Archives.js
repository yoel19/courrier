import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap';
import '@fontsource/inter';
import { apiUrl } from '../config';


const Archives = () => {
  const [archives, setArchives] = useState([]);
  const [id, setId] = useState('');
  const [label, setLabel] = useState('');
  const [reason, setReason] = useState('');
  const [creator, setCreator] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('');
  const [sender, setSender] = useState('');
  const [recipient, setRecipient] = useState('');

  useEffect(() => {
    fetch(`${apiUrl}/archives`)
      .then((response) => response.json())
      .then((archives) => {
        setArchives(archives);
      });
  }, []);

  const handleRestoreArchive = (id) => {
    fetch(`${apiUrl}/archives/${id}/restore`, {
      method: 'POST',
    })
      .then((response) => response.json())
      .then((archive) => {
        setArchives(archives.filter(a => a.id !== id));
      });
  };

  const renderArchives = () => {
    return archives.map((archive) => (
      <Card key={archive.id}>
        <CardBody>
          <CardTitle>{archive.id}</CardTitle>
          <p>{archive.label}</p>
          <p>{archive.reason}</p>
          <p>{archive.creator}</p>
          <p>{archive.date}</p>
          <p>{archive.type}</p>
          <p>{archive.sender}</p>
          <p>{archive.recipient}</p>
          <Button onClick={() => handleRestoreArchive(archive.id)}>
            Restaurer
          </Button>
        </CardBody>
      </Card>
    ));
  };

  return (
    <Container>
      <Row>
        <Col md="6">
          <h1>Archives</h1>
          <ul>
            {renderArchives()}
          </ul>
        </Col>
        <Col md="6">
          <h1>Tableau des archives</h1>
          <table>
            <thead>
              <tr>
                <th>ID</th>
                <th>Libellé</th>
                <th>Motif</th>
                <th>Créateur</th>
                <th>Date</th>
                <th>Type</th>
                <th>Expéditeur</th>
                <th>Destinataire</th>
              </tr>
            </thead>
            <tbody>
              {archives.map((archive) => (
                <tr key={archive.id}>
                  <td>{archive.id}</td>
                  <td>{archive.label}</td>
                  <td>{archive.reason}</td>
                  <td>{archive.creator}</td>
                  <td>{archive.date}</td>
                  <td>{archive.type}</td>
                  <td>{archive.sender}</td>
                  <td>{archive.recipient}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Col>
      </Row>
    </Container>
  );
};

export default Archives;
