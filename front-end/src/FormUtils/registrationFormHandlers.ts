import axios from 'axios';
import { validateFullName, validateEmail, validatePassword } from "./validationRegistration";

type FormValues = {
  fullName: string;
  email: string;
  password: string;
};

type HandleSubmitParams = {
  formValues: FormValues;
  setErrorMessage: (message: string) => void;
  setShowConfirmation: (show: boolean) => void;
  resetForm: () => void;
  navigate: (path: string) => void;
};

export const handleSubmit = ({
  formValues,
  setErrorMessage,
  setShowConfirmation,
  resetForm,
  navigate,
}: HandleSubmitParams) => async (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();

  const { fullName, email, password } = formValues;

  // Validate the form inputs
  if (!validateFullName(fullName)) {
    setErrorMessage("You must provide a valid full name (e.g., 'John Doe')");
    return;
  }

  if (!validateEmail(email)) {
    setErrorMessage("Your email is not valid");
    return;
  }

  const passwordErrorMessage = validatePassword(password);
  if (passwordErrorMessage) {
    setErrorMessage(passwordErrorMessage);
    return;
  }

  setErrorMessage(""); // Clear error message if everything is valid

  // Prepare the form data for submission
  const data = {
    fullName,
    email,
    password,
  };

  try {
    // Send request to the backend
    const response = await axios.post('https://localhost:3000/auth/register', data);

    // Handle successful registration
    if (response.data === true) {
      setShowConfirmation(true); // Show confirmation message
      resetForm();
      navigate('/confirmation');
    } else {
      setErrorMessage('Unexpected response from server');
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      // Handle known errors from backend
      setErrorMessage(error.response?.data.message || 'An error occurred');
    } else {
      // Handle other types of errors
      setErrorMessage('An unexpected error occurred');
    }
  }
};
