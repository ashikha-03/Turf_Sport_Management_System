import styled from "styled-components";
// Styled Components

export const Container = styled.div`
  padding: 20px;
  font-family: Arial, sans-serif;
  background-color:black;
  border-radius: 8px;
  max-width: 1000px;
  margin: 0 auto;
  color:white;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

export const Title = styled.h2`
  text-align: center;
  font-size: 24px;
  color: white;
`;

export const ErrorMessage = styled.p`
  color: red;
  text-align: center;
`;

export const UserList = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
`;

export const Card = styled.div`
  background-color: #fff;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid #ddd;
  width: 250px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  transition: transform 0.3s ease;

  &:hover {
    transform: translateY(-5px);
  }
`;

export const CardHeader = styled.div`
  text-align: center;
  margin-bottom: 10px;
`;

export const CardTitle = styled.h3`
  font-size: 20px;
  color: #333;
`;

export const CardBody = styled.div`
  font-size: 14px;
  color: #555;
`;

export const CardItem = styled.p`
  margin: 5px 0;
  display: flex;
  justify-content: space-between;
`;

export const NoUsers = styled.p`
  text-align: center;
  font-size: 18px;
  color: #555;
`;


export const DeleteButton = styled.button`
  background-color: red;
  color: white;
  border: none;
  padding: 8px 16px;
  font-size: 14px;
  cursor: pointer;
  border-radius: 4px;
  margin-top: 10px;
  &:hover {
    background-color: darkred;
  }
`;

// Popup Styles

export const PopupMessage = styled.p`
  margin: 0;
`;


// Popup Styles
export const PopupContainer = styled.div<{ type: 'success' | 'error' | null }>`
  position: fixed;
  top: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: ${(props) => (props.type === 'success' ? 'green' : props.type === 'error' ? 'red' : 'transparent')};
  color: white;
  padding: 10px 20px;
  border-radius: 5px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  z-index: 9999;
`;


export const ConfirmationPopup = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  z-index: 9999;
  width: 300px;
  text-align: center;
  border: 1px solid #ddd;
`;

export const ConfirmationButtons = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-evenly;
`;

export const ConfirmButton = styled.button`
  padding: 10px 20px;
  background-color: green;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: darkgreen;
  }
`;

export const CancelButton = styled.button`
  padding: 10px 20px;
  background-color: red;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  &:hover {
    background-color: darkred;
  }
`;
