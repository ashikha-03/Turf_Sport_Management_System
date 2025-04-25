import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 25px 50px;
  background-color: black;
  box-shadow: 0 4px 6px rgba(30, 29, 29, 0.1);
  color: white;
  font-family: 'Poppins', sans-serif;
  font-weight: bold;
  font-size: 30px; /* Increased font size for the navbar */
`;

export const LeftNavButtonWrapper = styled.div`
  display: flex;
  gap: 30px;
`;

export const RightNavButtonWrapper = styled.div`
  display: flex;
  gap: 30px;
  align-items: center;
`;

export const NavButton = styled.button<{ active: boolean }>`
  background: none;
  border: none;
  color: ${(props) => (props.active ? '#eba721' : '#fff')};
  font-size: 24px; /* Increased font size for the nav buttons */
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color:#eba721;
  }
`;

export const Links = styled(Link)`
  text-decoration: none;
  color: inherit;
`;

export const LoginButton = styled.button`
  background: #28a745;
  border: none;
  color: white;
  font-size: 22px; /* Increased font size for the login button */
  cursor: pointer;
  padding: 16px 35px;
  border-radius: 5px;
  transition: background-color 0.3s ease, transform 0.3s ease;

  &:hover {
    background-color: #218838;
    color: rgb(16, 16, 15);
    transform: translateY(-2px);
  }

  &:focus {
    outline: none;
  }

  &:active {
    transform: translateY(2px);
  }
`;

export const ProfileButton = styled.button<{ active: boolean }>`
  background: none;
  border: none;
  color: ${(props) => (props.active ? '#eba721' : '#fff')};
  font-size: 24px; /* Increased font size for profile button */
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: #eba721;
  }
`;

export const LogoutButton = styled.button`
  background: none;
  border: none;
  color: #d9534f;
  font-size: 24px; /* Increased font size for logout button */
  cursor: pointer;
  text-decoration: none;

  &:hover {
    color: #c9302c;
  }
`;

export const Dropdown = styled.div`
margin-top: 15px;
  position:absolute;
  background-color: white;
  box-shadow: 0 4px 6px rgba(229, 213, 213, 0.1);
  border-radius: 4px;
  top: 60px;  /* Increased top value to move the dropdown lower */
  right: 0;
  z-index: 100;
  width: 200px;
`;

export const DropdownItem = styled.div`
  padding: 14px 30px;
  font-size: 20px;
  color: #000;
  cursor: pointer;

  &:hover {
    background-color: #eba721;
    color: #fff;
  }

  &.logout {
    color: #d9534f; /* Red color for logout button */
    
    &:hover {
      background-color: #c9302c; /* Darker red on hover */
      color: #fff;
    }
  }
`;
export const LogoWrapper = styled.div`
  flex: 1; /* Take up the available space */
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 36px;
  font-weight: bold;
  color: white; /* Adjust color as needed */
  font-family: 'Poppins', sans-serif;

`;
