import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Title,
  ErrorMessage,
  UserList,
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardItem,
  NoUsers,
  DeleteButton,
  PopupContainer,
  PopupMessage,
  ConfirmationPopup,
  ConfirmationButtons,
  ConfirmButton,
  CancelButton,
} from './style'; 

interface User {
  email: string;
  id: string;
  phone: string;
  userName: string;
}

interface Res {
  message: User[];
}

const Users: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]); // Users state
  const [error, setError] = useState<string>(''); // Error state if fetching fails
  const [popup, setPopup] = useState<{ message: string; type: 'success' | 'error' | null }>({
    message: '',
    type: null,
  }); // Popup state to show success or error messages
  const [isConfirmDeleteVisible, setIsConfirmDeleteVisible] = useState(false); // Show delete confirmation modal
  const [deleteUserId, setDeleteUserId] = useState<string>(''); // The ID of the user to delete

  // Fetch users when the component mounts
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const token = localStorage.getItem('authToken');
        const response = await axios.get('https://localhost:7167/api/admin/get_users', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setUsers(response.data.message);
      } catch (error) {
        setError('Error fetching users');
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers(); // Call the function to fetch users
  }, []);

  // Function to delete a user
  const handleDeleteUser = async () => {
    try {
      const token = localStorage.getItem('authToken');
      const response = await axios.delete(`https://localhost:7167/api/admin/delete_user/${deleteUserId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200) {
        setUsers(users.filter((user) => user.id !== deleteUserId));
        setPopup({
          message: 'User deleted successfully',
          type: 'success',
        });
        setTimeout(() => {
          setPopup({ message: '', type: null });
        }, 3000);
      }
      setIsConfirmDeleteVisible(false); // Close confirmation modal
    } catch (error) {
      setPopup({
        message: 'Error deleting user',
        type: 'error',
      });
      console.error('Error deleting user:', error);
      setTimeout(() => {
        setPopup({ message: '', type: null });
      }, 3000);
      setIsConfirmDeleteVisible(false); // Close confirmation modal
    }
  };

  // Function to show delete confirmation popup
  const showDeleteConfirmation = (id: string) => {
    setDeleteUserId(id);
    setIsConfirmDeleteVisible(true);
  };

  return (
    <Container>
      <Title>User Management</Title>
      {error && <ErrorMessage>{error}</ErrorMessage>}
      <UserList>
        {users.length > 0 ? (
          users.map((user) => (
            <Card key={user.id}>
              <CardHeader>
                <CardTitle>{user.userName}</CardTitle>
              </CardHeader>
              <CardBody>
                <CardItem>
                  <strong>Phone: </strong> {user.phone}
                </CardItem>
                <CardItem>
                  <strong>Email: </strong> {user.email}
                </CardItem>
                <DeleteButton onClick={() => showDeleteConfirmation(user.id)}>Delete</DeleteButton>
              </CardBody>
            </Card>
          ))
        ) : (
          <NoUsers>No users available</NoUsers>
        )}
      </UserList>

      {/* Popup for success/error messages */}
      {popup.message && (
        <PopupContainer type={popup.type}>
          <PopupMessage>{popup.message}</PopupMessage>
        </PopupContainer>
      )}

      {/* Confirmation popup for delete action */}
      {isConfirmDeleteVisible && (
        <ConfirmationPopup>
          <p>Are you sure you want to delete this user?</p>
          <ConfirmationButtons>
            <ConfirmButton onClick={handleDeleteUser}>Yes</ConfirmButton>
            <CancelButton onClick={() => setIsConfirmDeleteVisible(false)}>No</CancelButton>
          </ConfirmationButtons>
        </ConfirmationPopup>
      )}
    </Container>
  );
};

export default Users;
