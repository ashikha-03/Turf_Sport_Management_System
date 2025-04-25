import React, { useState } from 'react';
import { Input, Button, NewUserLink, FormContainer, FormWrapper, Message, ErrorMessage } from './styles'; // Import additional styled components
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate for routing
import { toast, ToastContainer } from 'react-toastify'; // Import toast from react-toastify
import 'react-toastify/dist/ReactToastify.css'; // Import the toast CSS for styling

const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [registrationMessage, setRegistrationMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validate if any of the fields are empty
    if (!username || !email || !phone || !password) {
      setErrorMessage('All fields are required!');
      toast.error('All fields are required!'); // Show error toast
      return;
    } else {
      setErrorMessage('');
    }

    const userData = {
      userName: username,
      password: password,
      phone: phone,
      email: email,
    };

    try {
      const response = await fetch('https://localhost:7167/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(userData),
      });

      if (response.ok) {
        setRegistrationMessage('Registration successful! Redirecting to login...');
        toast.success('Registration successful! Redirecting to login...'); // Show success toast
        setTimeout(() => {
          navigate('/login'); // Redirect to login page after successful registration
        }, 2000);
      } else {
        const errorData = await response.json();
        console.error('Error:', errorData);
        toast.error('Registration failed!'); // Show error toast
      }
    } catch (error) {
      console.error('Error:', error);
      toast.error('An error occurred during registration'); // Show error toast
    }
  };

  return (
    <>
      {/* Toast Container */}
      <ToastContainer position="top-center" autoClose={3000} hideProgressBar={true} newestOnTop={true} closeOnClick pauseOnHover draggable pauseOnFocusLoss />

      <FormWrapper>
        <FormContainer>
          <h2>Create an Account</h2>
          <form onSubmit={handleSubmit}>
            <Input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Username"
            />
            <Input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
            />
            <Input
              type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="Phone"
            />
            <Input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
            />

            <Button type="submit">Register</Button>

            {registrationMessage && <Message>{registrationMessage}</Message>}
            {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>} {/* Display error message */}

            <NewUserLink>
              <Link to="/login">Already have an account? Login here</Link>
            </NewUserLink>
          </form>
        </FormContainer>
      </FormWrapper>
    </>
  );
};

export default RegisterForm;
