import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardTitle, Col, Container, Row } from 'reactstrap';
import '@fontsource/inter';
import "./globalStyles.css"


const OutgoingMail = () => {
  const [id, setId] = useState('');
  const [label, setLabel] = useState('');
  const [reason, setReason] = useState('');
  const [date, setDate] = useState('');
  const [type, setType] = useState('');
  const [recipientName, setRecipientName] = useState('');
  const [recipientEmail, setRecipientEmail] = useState('');
  const [userName, setUserName] = useState('');

  const handleSubmit = () => {
    // Submit the form data to the administrator.
  };


  // useEffect(() => {
  //   fetch("../../services/data.js")
  //     .then((response) => response.json())
  //     .then(data => console.log(data))


  // }, [])

  return (
    <div>
      <a href="/dashboard/secretary">Home</a>
      <Container>
        <Row>
          <div></div>
          <Col md="6">
            <h1>Courrier sortant</h1>
            <form onSubmit={handleSubmit}>

              <div className="form-group">
                <label htmlFor="label">Libellé</label>
                <input type="text" className="form-control inputGlobal" id="label" value={label} onChange={(e) => setLabel(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="reason">Motif</label>
                <textarea className="form-control textareaGlobal" id="reason" value={reason} onChange={(e) => setReason(e.target.value)} />
                {/* <input type="text" className="form-control inputGlobal" id="reason" value={reason} onChange={(e) => setReason(e.target.value)} /> */}
              </div>
              <div className="form-group">
                <label htmlFor="date">Date</label>
                <input type="date" className="form-control inputGlobal" id="date" value={date} onChange={(e) => setDate(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="type">Type</label>
                <input type="text" className="form-control inputGlobal" id="type" value={type} onChange={(e) => setType(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="recipientName">Nom du destinataire</label>
                <input type="text" className="form-control inputGlobal" id="recipientName" value={recipientName} onChange={(e) => setRecipientName(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="recipientEmail">Email du destinataire</label>
                <input type="email" className="form-control inputGlobal" id="recipientEmail" value={recipientEmail} onChange={(e) => setRecipientEmail(e.target.value)} />
              </div>
              <div className="form-group">
                <label htmlFor="userName">Nom de l'utilisateur</label>
                <input type="text" className="form-control inputGlobal" id="userName" value={userName} onChange={(e) => setUserName(e.target.value)} />
              </div>
              <button type="submit" className="btn btn-primary">Soumettre</button>
            </form>
          </Col>
        </Row>
      </Container>

    </div>

  );
};

export default OutgoingMail;


