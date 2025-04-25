import React, { useState } from 'react';
import { Input, Button, NewUserLink, FormContainer, FormWrapper, Message } from './styles'; // Import additional styled components
import { Link, useNavigate } from 'react-router-dom'; // Import Link and useNavigate for routing
import { jwtDecode } from 'jwt-decode'; // Make sure to import jwt-decode

// Import error image from src/assets
import errorImage from '../../assets/images/errorimage.png';

// Type for the response from the backend (token and message)
interface LoginResponse {
  token: string;
  message: string;
}

// Type for the decoded JWT token
interface DecodedToken {
  'http://schemas.microsoft.com/ws/2008/06/identity/claims/role': string;
}

const LoginForm: React.FC = () => {
  const [username, setUsername] = useState<string>(''); // Username state
  const [password, setPassword] = useState<string>(''); // Password state
  const [loginMessage, setLoginMessage] = useState<string>(''); // Message for successful login
  const [errorMessage, setErrorMessage] = useState<string>(''); // Message for errors
  const [isAdmin, setIsAdmin] = useState<boolean>(false); // Admin status flag

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Check if both fields are filled
    if (!username || !password) {
      setErrorMessage('Both fields are required!');
      return;
    }

    const loginData = {
      userName: username,
      password: password,
    };

    try {
      const response = await fetch('https://localhost:7167/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(loginData),
      });

      if (response.ok) {
        const responseData: LoginResponse = await response.json(); // Type the response
        const token = responseData.token; // Assuming the token is returned in 'token' field

        // Decode the token to check the role
        const decodedToken: DecodedToken = jwtDecode(token);

        // Check if the role claim exists and if it is 'admin'
        const userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        if (userRole === 'admin') {
          setIsAdmin(true); // Set admin flag if the user is an admin
        }

        // Store token in local storage
        localStorage.setItem('authToken', token);

        setLoginMessage('Login successful! Redirecting to home...');

        setTimeout(() => {
          navigate('/'); // Redirect to home page
        }, 2000);
      } else {
        const errorData: { message: string } = await response.json(); // Type the error response
        setErrorMessage(errorData.message || 'Login failed!');
      }
    } catch (error) {
      console.error('Error:', error);
      setErrorMessage('An error occurred during login.');
    }
  };

  return (
    <FormWrapper>
      <FormContainer>
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
          <Button type="submit">Login</Button>

          {/* Display success message */}
          {loginMessage && <Message>{loginMessage}</Message>}

          {/* Replace all error messages with the error image */}
          {errorMessage && (
            <div style={{ textAlign: 'center' }}>
              <img
                src={errorImage} // Using the imported error image
                alt="Error"
                style={{ width: '100px', height: '100px', marginBottom: '10px' }}
              />
            </div>
          )}

          {/* Link to Register */}
          <NewUserLink>
            <Link to="/register">New user? Sign up</Link>
          </NewUserLink>
        </form>
      </FormContainer>
    </FormWrapper>
  );
};

export default LoginForm;
