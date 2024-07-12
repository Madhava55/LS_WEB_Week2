import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Form } from 'react-bootstrap';
import Note from './Note';
import './App.css';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    const savedNotes = JSON.parse(localStorage.getItem('notes'));
    if (savedNotes) {
      setNotes(savedNotes);
    }
    const savedTheme = JSON.parse(localStorage.getItem('darkMode'));
    if (savedTheme !== null) {
      setDarkMode(savedTheme);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('notes', JSON.stringify(notes));
    localStorage.setItem('darkMode', JSON.stringify(darkMode));

    if (darkMode) {
      document.body.classList.add('dark-mode');
      document.body.classList.remove('light-mode');
    } else {
      document.body.classList.add('light-mode');
      document.body.classList.remove('dark-mode');
    }
  }, [notes, darkMode]);

  const addNote = () => {
    if (title && content) {
      setNotes([...notes, { title, content }]);
      setTitle('');
      setContent('');
    }
  };

  const editNote = (index, editedTitle, editedContent) => {
    const newNotes = [...notes];
    newNotes[index] = { title: editedTitle, content: editedContent };
    setNotes(newNotes);
  };

  const deleteNote = (index) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
  };

  return (
    <Container>
      <Row className="my-3">
        <Col>
          <h1>Notes Keeper</h1>
        </Col>
      </Row>
      <Row className="my-3">
        <Col>
          <Button variant="secondary" onClick={() => setDarkMode(!darkMode)}>
            {darkMode ? 'Light Mode' : 'Dark Mode'}
          </Button>
        </Col>
      </Row>
      <Row>
        <Col>
          <Form>
            <Form.Group controlId="formTitle">
              <Form.Control
                type="text"
                placeholder="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={!darkMode ? 'dark-title' : ''}
              />
            </Form.Group>
            <Form.Group controlId="formContent">
              <Form.Control
                as="textarea"
                rows={3}
                placeholder="Content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </Form.Group>
            <Button variant="primary" onClick={addNote}>
              Add Note
            </Button>
          </Form>
        </Col>
      </Row>
      <Row>
        {notes.map((note, index) => (
          <Col key={index} sm={6} md={4} lg={3}>
            <Note note={note} index={index} deleteNote={deleteNote} editNote={editNote} />
          </Col>
        ))}
      </Row>
    </Container>
  );
};

export default App;
