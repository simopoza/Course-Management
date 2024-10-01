import { Form, Button, Card, Alert } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import useLoginStore from '../store/loginStore';
import { handleLoginSubmit } from '../FormUtils/loginFormHandlers';

const LoginForm = () => {
  const { email, password, errorMessage, setEmail, setPassword, setErrorMessage } = useLoginStore();

  const navigate = useNavigate();

  const handleSubmit = handleLoginSubmit({
    email,
    password,
    setErrorMessage,
    navigate,
  });

  return (
    <>
      {errorMessage && (
        <Alert variant="danger" className="text-center">
          {errorMessage}
        </Alert>
      )}
      <div className="container-card">
        <Card
          style={{
            backgroundColor: '#f5f5f5',
            border: '1px solid #e0e0e0',
            color: '#333',
            width: '20rem',
          }}
          className="p-4"
        >
          <Card.Body>
            <Card.Title className="text-center mb-4">Sign In</Card.Title>
            <Form onSubmit={handleSubmit}>
              <Form.Group className="mb-3">
                <Form.Label>Email address</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </Form.Group>

              <Button variant="primary" type="submit" className="w-100">
                Submit
              </Button>
            </Form>
            <div className="text-center mt-3">
              <p>
                Don't have an account? <Link to="/register">Register Here</Link>
              </p>
            </div>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};

export default LoginForm;
