import React, { useEffect, useState, useRef } from 'react';
import { Container, NavButton, LoginButton, Links, ProfileButton, LogoutButton, Dropdown, DropdownItem, LeftNavButtonWrapper, RightNavButtonWrapper, LogoWrapper } from './styles';
import { useLocation, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode'; // Import jwt-decode to decode the JWT token
import profileImage from '../../assets/images/profile.png'; // Import the profile image

const Navbar: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false); // State to track if the user is an admin
  const location = useLocation();
  const navigate = useNavigate();
  const dropdownRef = useRef<HTMLDivElement>(null); // Ref for the dropdown container

  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      setIsLoggedIn(true);
      try {
        const decodedToken: any = jwtDecode(token);
        const userRole = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
        setIsAdmin(userRole === 'admin'); 
      } catch (error) {
        console.error('Error decoding token', error);
      }
    } else {
      setIsLoggedIn(false);
    }
    window.scrollTo(0, 0);
  }, [location]);

  // Close dropdown if clicked outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const isActiveRoute = (route: string) => {
    return location.pathname === route;
  };

  const handleLogout = () => {
    localStorage.removeItem('authToken');
    navigate('/');
    setIsLoggedIn(false);
  };

  const toggleDropdown = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleDropdownItemClick = () => {
    setIsDropdownOpen(false); // Close dropdown after an item is selected
  };

  return (
    <Container>
      {/* Left side buttons */}
      <LeftNavButtonWrapper>
        <Links to="/">
          <NavButton active={isActiveRoute('/')}>Home</NavButton>
        </Links>
        <Links to="/turfs">
          <NavButton active={isActiveRoute('/turfs')}>Turfs</NavButton>
        </Links>
      </LeftNavButtonWrapper>

      {/* Centered TurfSpot Name */}
      <LogoWrapper>
        <span style={{ fontSize: '30px', fontWeight: 'bold' }}>TURFSPOT</span>
      </LogoWrapper>

      <RightNavButtonWrapper>
        {isLoggedIn ? (
          <>
            <div onClick={toggleDropdown}>
              <img
                src={profileImage}
                alt="Profile"
                style={{
                  width: '50px', // Increased size of profile image
                  height: '50px',
                  borderRadius: '50%', // Circular image
                  cursor: 'pointer',
                }}
              />
            </div>
            {isDropdownOpen && (
              <Dropdown ref={dropdownRef}>
                <Links to="/turf" onClick={handleDropdownItemClick}>
                  <DropdownItem>My Turfs</DropdownItem>
                </Links>
                <Links to="/booking-history" onClick={handleDropdownItemClick}>
                  <DropdownItem>Booking History</DropdownItem>
                </Links>
                {isAdmin && (
                  <Links to="/users" onClick={handleDropdownItemClick}>
                    <DropdownItem>Users</DropdownItem>
                  </Links>
                )}
                {/* Logout inside the dropdown and styled in red */}
                <DropdownItem onClick={handleLogout} className="logout">
                  Logout
                </DropdownItem>
              </Dropdown>
            )}
          </>
        ) : (
          <Links to="/login">
            <LoginButton>Login / Register</LoginButton>
          </Links>
        )}
      </RightNavButtonWrapper>
    </Container>
  );
};

export default Navbar;
