import Alert from "react-bootstrap/Alert";

const ConfirmationPage = () => {
  return (
    <div className="d-flex justify-content-center align-items-center vh-100">
      <Alert variant="success" className="text-center">
        You need to confirm your registration.
      </Alert>
    </div>
  );
};

export default ConfirmationPage;
