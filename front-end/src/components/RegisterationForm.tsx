import React, { useState } from "react";
import FloatingLabel from "react-bootstrap/FloatingLabel";
import Form from "react-bootstrap/Form";
import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";
import useUserStore from "../store/userStore";
import { Link, useNavigate } from "react-router-dom";
import { handleSubmit as handleFormSubmit } from "../FormUtils/registrationFormHandlers";

const RegisterationForm = () => {
  const {
    email,
    fullName,
    password,
    errorMessage,
    setEmail,
    setFullName,
    setPassword,
    setErrorMessage,
  } = useUserStore();

  const [showConfirmation, setShowConfirmation] = useState(false);

  const formValues = {
    email,
    fullName,
    password,
  };

  const resetForm = () => {
    setEmail("");
    setFullName("");
    setPassword("");
  };

  const navigate = useNavigate();

  const handleSubmit = handleFormSubmit({
    formValues,
    setErrorMessage,
    setShowConfirmation,
    resetForm,
    navigate,
  });

  return (
    <>
      {errorMessage && (
        <Alert variant="danger" className="text-center">
          {errorMessage.split("\n").map((line, index) => (
            <React.Fragment key={index}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </Alert>
      )}

      {showConfirmation && (
        <Alert variant="success" className="text-center">
          You need to confirm your registration.
        </Alert>
      )}

      <div className="container-card">
        <Card
          style={{
            backgroundColor: "#f5f5f5",
            border: "1px solid #e0e0e0",
            color: "#333",
            width: "25rem",
          }}
          className="p-4"
        >
          <Card.Body>
            <Card.Title className="text-center mb-4">Sign Up</Card.Title>
            <Form onSubmit={handleSubmit}>
              <FloatingLabel controlId="floatingFullName" label="Full Name" className="mb-3">
                <Form.Control
                  type="text"
                  placeholder="John Doe"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                />
              </FloatingLabel>

              <FloatingLabel controlId="floatingInput" label="Email address" className="mb-3">
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </FloatingLabel>

              <FloatingLabel controlId="floatingPassword" label="Password" className="mb-3">
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </FloatingLabel>

              <Button variant="primary" type="submit" className="w-100">
                Submit
              </Button>
            </Form>
            <div className="text-center mt-3">
              <p>
                have an account? <Link to="/">SignIn Here</Link>
              </p>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default RegisterationForm;
