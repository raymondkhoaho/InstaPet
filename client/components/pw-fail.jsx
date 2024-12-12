import React, { useState } from 'react';
import Alert from 'react-bootstrap/Alert';

export default function AlertDismissable() {
  const [show, setShow] = useState(true);

  if (show) {
    return (
      <Alert variant="danger" onClose={() => setShow(false)} dismissible>
        <Alert.Heading>Oh snap! You got an error!</Alert.Heading>
        <p>
          Change this and that and try again.
        </p>
      </Alert>
    );
  }
}
