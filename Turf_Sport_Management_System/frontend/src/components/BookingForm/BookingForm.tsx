// import React, { useState } from 'react';
// import { Input, Button, FormWrapper, FormTitle, FormSection, Label, Error } from './styles';
// import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
// import Modal from '../../models/modal'; // Import the modal component

// const BookingForm = () => {
//   const [formData, setFormData] = useState({
//     name: '',
//     contact: '',
//   });

//   const [errors, setErrors] = useState({
//     name: '',
//     contact: '',
//   });

//   const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
//   const [selectedSlots, setSelectedSlots] = useState<string[]>([]);
//   const [showModal, setShowModal] = useState<boolean>(false);
//   const [modalMessage, setModalMessage] = useState<string>('');
  
//   const navigate = useNavigate();

//   const checkLoginStatus = () => {
//     const loggedInUser = localStorage.getItem('authToken');
//     return loggedInUser ? true : false;
//   };

//   // Regular expression for validating Indian mobile number
//   const phoneRegex = /^[+]?[91]?\s?-?\(?\d{10}\)?$/;

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData({ ...formData, [name]: value });

//     // Validation on contact number change
//     if (name === 'contact') {
//       if (!phoneRegex.test(value)) {
//         setErrors((prevErrors) => ({
//           ...prevErrors,
//           contact: 'Please enter a valid Indian mobile number.',
//         }));
//       } else {
//         setErrors((prevErrors) => ({
//           ...prevErrors,
//           contact: '',
//         }));
//       }
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();

//     const loggedIn = checkLoginStatus();
//     setIsLoggedIn(loggedIn);

//     let formIsValid = true;
//     let errors = { name: '', contact: '' };

//     if (!formData.name) {
//       errors.name = 'Name is required';
//       formIsValid = false;
//     }
//     if (!formData.contact) {
//       errors.contact = 'Contact is required';
//       formIsValid = false;
//     }

//     // Additional check for contact validation
//     if (formData.contact && !phoneRegex.test(formData.contact)) {
//       errors.contact = 'Please enter a valid Indian mobile number.';
//       formIsValid = false;
//     }

//     setErrors(errors);

//     if (formIsValid && loggedIn) {
//       // Proceed with booking confirmation if user is logged in
//       const date = new Date().toISOString();
//       const status = 0;
//       const days = selectedSlots.length;

//       const bookingData = {
//         turfId: turfId,
//         date: date,
//         status: status,
//         slots: selectedSlots,
//         days: days,
//       };

//       axios
//         .post(`https://localhost:7167/slots/book_slot/${role}`, bookingData)
//         .then((response) => {
//           setModalMessage('Booking Confirmed! We will send you details shortly.');
//           setShowModal(true);
//         })
//         .catch((error) => {
//           setModalMessage('Error booking the turf. Please try again later.');
//           setShowModal(true);
//         });
//     } else if (formIsValid && !loggedIn) {
//       navigate('/login');
//     }
//   };

//   const handleCloseModal = () => {
//     setShowModal(false);
//   };

//   return (
//     <FormWrapper onSubmit={handleSubmit}>
//       <FormTitle>Book Your Turf</FormTitle>

//       <FormSection>
//         <Label htmlFor="name">Your Name</Label>
//         <Input
//           type="text"
//           name="name"
//           value={formData.name}
//           placeholder="Enter your name"
//           onChange={handleChange}
//           required
//         />
//         {errors.name && <Error>{errors.name}</Error>}
//       </FormSection>

//       <FormSection>
//         <Label htmlFor="contact">Your Contact</Label>
//         <Input
//           type="text"
//           name="contact"
//           value={formData.contact}
//           placeholder="Enter your contact number"
//           onChange={handleChange}
//           required
//         />
//         {errors.contact && <Error>{errors.contact}</Error>}
//       </FormSection>

//       <Button type="submit">Book Now</Button>

//       {/* Show the modal if there's a message */}
//       {showModal && <Modal message={modalMessage} onClose={handleCloseModal} />}
//     </FormWrapper>
//   );
// };

// export default BookingForm;
