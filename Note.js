import React, { useState } from 'react';
import { Card, Button, Form } from 'react-bootstrap';

const Note = ({ note, index, deleteNote, editNote }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(note.title);
  const [editedContent, setEditedContent] = useState(note.content);

  const handleSave = () => {
    editNote(index, editedTitle, editedContent);
    setIsEditing(false);
  };

  return (
    <Card className="my-3">
      <Card.Body>
        {isEditing ? (
          <>
            <Form.Control
              type="text"
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
              className="mb-2"
            />
            <Form.Control
              as="textarea"
              rows={3}
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
              className="mb-2"
            />
            <Button variant="primary" onClick={handleSave} className="mr-2">
              Save
            </Button>
            <Button variant="secondary" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Card.Title>{note.title}</Card.Title>
            <Card.Text>{note.content}</Card.Text>
            <Button variant="info" onClick={() => setIsEditing(true)} className="mr-2">
              Edit
            </Button>
            <Button variant="danger" onClick={() => deleteNote(index)}>
              Delete
            </Button>
          </>
        )}
      </Card.Body>
    </Card>
  );
};

export default Note;
