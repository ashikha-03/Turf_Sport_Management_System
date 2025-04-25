import styled from 'styled-components';

// Wrapper for the entire page (center content)
export const FormWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color:rgb(0, 0, 0);
  padding: 0 20px;
`;

// Container for the register form
export const FormContainer = styled.div`
  background-color: white;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 400px;

  h2 {
    text-align: center;
    margin-bottom: 20px;
    color: #333;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 15px;
  }
`;

// Styled input fields
export const Input = styled.input`
  padding: 12px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ccc;
  outline: none;

  &:focus {
    border-color:rgb(10, 10, 10);
  }
`;

// Styled button
export const Button = styled.button`
  padding: 12px;
  background-color:rgb(8, 8, 8);
  color: white;
  font-size: 16px;
  border-radius: 4px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color:rgb(22, 23, 23);
  }
`;

// Success/Error message styling
export const Message = styled.p`
  text-align: center;
  color: #28a745; /* Green for success message */
  font-size: 14px;
  margin-top: 10px;
`;

// Error message styling
export const ErrorMessage = styled.p`
  text-align: center;
  color: #dc3545; /* Red for error message */
  font-size: 14px;
  margin-top: 10px;
`;

// Styled link for login
export const NewUserLink = styled.div`
  text-align: center;
  margin-top: 20px;

  a {
    color: #007bff;
    text-decoration: none;

    &:hover {
      text-decoration: underline;
    }
  }
`;
