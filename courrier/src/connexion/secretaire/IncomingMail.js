import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap';
import '@fontsource/inter';


const IncomingMail = () => {
  const [id, setId] = useState('');
  const [label, setLabel] = useState('');
  const [reason, setReason] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('');
  const [senderName, setSenderName] = useState('');
  const [senderEmail, setSenderEmail] = useState('');
  const [userName, setUserName] = useState('');

  const handleSubmit = () => {
    // Submit the form data to the archive file.
  };

  return (
    <div>
      <a href="/dashboard/secretary">Home</a>
      <Container>
        <Row>
          <Col md="6">
            <h1>Courrier entrant</h1>
            <form onSubmit={handleSubmit}>


              <div class="form-group">
                <label for="label">Libellé</label>
                <input type="text" className="form-control" id="label" value={label} onChange={(e) => setLabel(e.target.value)} />
              </div>
              <div class="form-group">
                <label htmlFor="reason">Motif</label>
                <textarea className="form-control textareaGlobal" id="reason" value={reason} onChange={(e) => setReason(e.target.value)} />

              </div>
              <div class="form-group">
                <label for="date">Date</label>
                <input type="date" className="form-control" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
              <div class="form-group">
                <label for="type">Type</label>
                <input type="text" className="form-control" id="type" value={type} onChange={(e) => setType(e.target.value)} />
              </div>
              <div class="form-group">
                <label for="senderName">Nom de l'expéditeur</label>
                <input type="text" className="form-control" id="senderName" value={senderName} onChange={(e) => setSenderName(e.target.value)} />
              </div>
              <div class="form-group">
                <label for="senderEmail">Email de l'expéditeur</label>
                <input type="email" className="form-control" id="senderEmail" value={senderEmail} onChange={(e) => setSenderEmail(e.target.value)} />
              </div>
              <div class="form-group">
                <label for="userName">Nom de l'utilisateur</label>
                <input type="text" className="form-control" id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} />
              </div>
              <button type="submit" className="btn btn-primary">Soumettre</button>
            </form>
          </Col>
        </Row>
      </Container>

    </div>

  );
};

export default IncomingMail;
