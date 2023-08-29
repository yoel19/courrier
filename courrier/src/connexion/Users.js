import React, { useState, useEffect } from 'react';
import { Button, Card, CardBody, CardTitle, Col, Container, Form, FormGroup, Input, Row } from 'reactstrap';
import '@fontsource/inter';
import { apiUrl } from '../config';

const Users = () => {
  const [users, setUsers] = useState([]);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [position, setPosition] = useState('');
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/users`)
      .then((response) => response.json())
      .then((users) => {
        setUsers(users);
      });

    fetch(`${apiUrl}/online-users`)
      .then((response) => response.json())
      .then((onlineUsers) => {
        setOnlineUsers(onlineUsers);
      });
  }, []);

  const handleCreateUser = (e) => {
    e.preventDefault();

    fetch(`${apiUrl}/users`, {
      method: 'POST',
      body: JSON.stringify({
        username,
        password,
        position,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((response) => response.json())
      .then((user) => {
        setUsers([...users, user]);
        setUsername('');
        setPassword('');
        setPosition('');
      });
  };

  const handleDeleteUser = (id) => {
    fetch(`${apiUrl}/users/${id}`, {
      method: 'DELETE',
    })
      .then((response) => response.json())
      .then(() => {
        setUsers(users.filter(u => u.id !== id));
      });
  };

  const renderUsers = () => {
    return users.map((user) => (
      <Card key={user.id}>
        <CardBody>
          <CardTitle>{user.username}</CardTitle>
          <p>{user.position}</p>
          <Button onClick={() => handleDeleteUser(user.id)}>
            Supprimer
          </Button>
        </CardBody>
      </Card>
    ));
  };

  const renderOnlineUsers = () => {
    return onlineUsers.map((user) => (
      <Card key={user.id}>
        <CardBody>
          <CardTitle>{user.username}</CardTitle>
          <p>{user.position}</p>
        </CardBody>
      </Card>
    ));
  };

  return (
    <div>
      <a href="/dashboard/navbar">Home</a>
      <Container>
        <Row>
          <Col md="6">
            <h1>Utilisateurs</h1>
            <div>
              {renderUsers()}
            </div>
            <Form onSubmit={handleCreateUser} className="card card-body">
              <FormGroup>
                <Input
                  type="text"
                  placeholder="Nom d'utilisateur"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="password"
                  placeholder="Mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="text"
                  placeholder="Poste"
                  value={position}
                  onChange={(e) => setPosition(e.target.value)}
                />
              </FormGroup>
              <Button type="submit">Ajouter</Button>
            </Form>
          </Col>
          <Col md="6">
            <h1>Utilisateurs en ligne</h1>
            <div>
              {renderOnlineUsers()}
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default Users;

