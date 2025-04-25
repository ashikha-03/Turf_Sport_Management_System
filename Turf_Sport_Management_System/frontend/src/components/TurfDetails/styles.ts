import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: rgb(0, 0, 0);
  padding: 20px;
  /* width: 100%; */

`;

export const TurfTile = styled.div`
  background-color: #fff;
  border-radius: 10px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%;
  /* max-width: 600px; */
  margin: 20px;
  display: flex;
  flex-direction: row;
  align-items: center; 
  /* min-height: 500px; */
  box-sizing: border-box; 
  width: 75%;
`;

export const TurfImage = styled.img`
  width: 100%; 
  max-height: 300px; 
  object-fit: cover; 
  border-radius: 15px; 
  margin-bottom: 20px; 
`;


export const Heading = styled.h3`
  font-size: 1.5rem;
  color: #333;
  margin-bottom: 10px;
  font-weight: 600;
  text-align: center;
`;

export const Info = styled.p`
  font-size: 1rem;
  color: #555;
  margin: 5px 0;
  text-align: center; 
`;



export const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  font-size: 1rem;
  cursor: pointer;
  margin-top: 20px;
  transition: background-color 0.3s;

  &:hover {
    background-color: #45a049;
  }

  &:focus {
    outline: none;
  }
`;

export const Modal = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

export const ModalOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
`;

export const ModalContent = styled.div`
  background: white;
  padding: 20px;
  border-radius: 8px;
  position: relative;
  z-index: 1001;
  max-width: 300px;
  width: 100%;
  color: #000;
`;

export const DatePicker = styled.input`
  width: 200px;
  padding: 5px;
  margin-bottom: 10px;

`;

export const DaysInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
`;

export const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color:black;
`;

export const MessageContainer = styled.div`
  background-color: ${({ messageType }) => (messageType === 'success' ? 'green' : 'red')};
  color: black;
  padding: 10px;
  margin-top: 20px;
  text-align: center;
  border-radius: 5px;
`;

export const SlotList = styled.ul`
  list-style: none;
  padding: 0;
`;

export const SlotItem = styled.li`
  margin-bottom: 10px;
  display: flex;
  align-items: center;
`;

export const CheckboxLabel = styled.label`
  margin-left: 10px;
  font-size: 16px;
  cursor: pointer;
`;

export const BookingContainer = styled.div`
  margin-top: 20px;
  padding: 20px;
  border: 1px solid #ccc;
  border-radius: 8px;
  background-color: #f9f9f9;
  color:black;
  width: 75%;
`;
export const ImageSection=styled.div`
  /* flex:1; */
  padding-right:20px;
  align-items: center;
  /* max-width: 600%; */
  width: 70%;
  height: 100%;
`;
export const Tile = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  /* width: 75%; */
`;
export const InfoSection = styled.div`
  /* flex: 1; */
  justify-content: left;
`;