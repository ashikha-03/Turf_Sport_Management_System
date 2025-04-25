import styled from 'styled-components';

// Main container
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 20px;
  background-color: black;
  color: white;
  min-height: 100vh;
`;

// Heading for the page
export const Heading = styled.h2`
  font-size: 24px;
  font-weight: bold;
  margin-bottom: 20px;
  color: white;
`;

export const ButtonContainer = styled.div`
  display: flex;
  gap: 20px;  
  justify-content: center; // Controls the space between the buttons
`;

// General Button Style
export const Button = styled.button`
  background-color: #3498db;
  color: black;
  padding: 10px 20px;
  margin: 10px 15px;
  border: 5px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #2980b9;
  }
`;

// Info message style
export const Info = styled.p`
  color: #e74c3c;
  font-size: 16px;
  margin-top: 10px;
`;

// Success message style
export const SuccessMessage = styled.p`
  color: #2ecc71;
  font-size: 16px;
  margin-top: 10px;
`;

// Input field style
export const Input = styled.input`
  padding: 10px;
  margin: 10px 0;
  width: 100%;
  max-width: 400px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 16px;
`;

// Label style
export const Label = styled.label`
  font-size: 16px;
  margin-bottom: 5px;
  color: #333;
  display: flex;
`;

// Turf Card (tile)
export const TurfCard = styled.div`
  background-color: #fff;
  padding: 20px;
  margin: 15px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
  transition: transform 0.3s ease;

  &:hover {
    transform: scale(1.05);
  }
`;

// Turf Name
export const TurfName = styled.h3`
  font-size: 20px;
  margin-bottom: 10px;
  color: #333;
`;

// Turf Details
export const TurfDetails = styled.p`
  color: #555;
  margin-bottom: 10px;
  font-size: 14px;
`;

// Grid wrapper for turfs
export const TurfGrid = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 20px;
`;

// Button style for edit and delete actions (with specific colors)
export const ActionButton = styled(Button)`
  margin: 10px 0;
  width: 30%;
  max-width: 150px;
  margin-left: 5px;
  margin-right: 5px;
`;

// Column Component: For form grouping
export const Column = styled.div`
  flex: 1;
  padding: 10px;
  display: flex;
  flex-direction: column;
  margin: 10px;
  max-width: 450px;
  width: 100%;
  box-sizing: border-box;
`;

// ImageUpload Component: For styling the file upload input
export const ImageUpload = styled.input`
  padding: 8px;
  border-radius: 5px;
  border: 1px solid #ccc;
  background-color: #fafafa;
  cursor: pointer;

  &:hover {
    border-color: #007bff;
    background-color: #f0f8ff;
  }

  display: block;
  margin: 10px 0;
  width: 100%;
  
  font-size: 14px;
  color: #333;
  outline: none;

  ::file-selector-button {
    background-color:rgb(15, 16, 18);
    color: white;
    padding: 10px 20px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    
    &:hover {
      background-color: #0056b3;
    }
  }
`;

// Modal for creating/editing turf
export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
`;

// Modal content for the form
export const ModalContent = styled.div`
  background-color:rgb(254, 249, 249);
  color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 100%;
  height: auto;
  box-sizing: border-box;
  position: relative;
  flex-wrap: balance;
  max-height: 90%;
`;

// Close button for the modal (X)
export const CloseButton = styled.div`
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  font-size: 20px;
  color: white;

  &:hover {
    color: #e74c3c;
  }
`;

// Submit button in the modal
export const SubmitButton = styled(Button)`
  background-color: #16a085;
  color: white;
  width: 100%;
  padding: 12px;
  font-size: 16px;
  
  &:hover {
    background-color: #1abc9c;
  }
`;

// Input Field styling for modal form
export const ModalInput = styled(Input)`
  background-color: #45423d;
  color: white;
  border: 1px solid #7f8c8d;
  
  &::placeholder {
    color: #ecf0f1;
  }
`;

export const ModalLabel = styled(Label)`
  color: #ecf0f1;
  font-size: 14px;
`;

// Create Turf Button (green)
export const CreateTurfButton = styled(Button)`
  background-color: green;
  color: white;

  &:hover {
    background-color: #45a049; /* Darker green on hover */
  }
`;

// Edit Turf Button (#45423)
export const EditTurfButton = styled(Button)`
  background-color: #45423a;
  color: white;

  &:hover {
    background-color: #333032; /* Darker shade on hover */
  }
`;

// Delete Turf Button (red)
export const DeleteTurfButton = styled(Button)`
  background-color: red;
  color: white;

  &:hover {
    background-color: #e74c3c; /* Darker red on hover */
  }
`;
