import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode'; 
import { Container, Input, Button, Heading, Label, Info, SuccessMessage, Modal, ModalContent, TurfCard, TurfName, TurfDetails, TurfGrid, ActionButton, Column, ImageUpload, ButtonContainer, CreateTurfButton, EditTurfButton, DeleteTurfButton } from './style'; 

const CreateTurf: React.FC = () => {
  const token = localStorage.getItem('authToken');
  const decodedToken = token ? jwtDecode(token) : null;

  const [formData, setFormData] = useState({
    location: '',
    turfName: '',
    contactNo: '',
    rating: 0,
    maxMembers: 0,
    price: 0,
    sports: [''],
    slots: [''],
    image: null, // Image field
  });

  const [errorMessage, setErrorMessage] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [userTurfs, setUserTurfs] = useState([]); 
  const [showCreateForm, setShowCreateForm] = useState(false); 
  const [editingTurfId, setEditingTurfId] = useState<string | null>(null); 
  const [showDeleteModal, setShowDeleteModal] = useState(false); 
  const [turfToDelete, setTurfToDelete] = useState<string | null>(null);

  // Fetch the user turfs
  useEffect(() => {
    if (token) {
      axios.get('https://localhost:7167/turf/get_userturf', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setUserTurfs(response.data);
      })
      .catch(error => {
        console.error('Error fetching turfs:', error);
      });
    }
  }, [token]);

  // Fetch turf details when editing
  const handleEdit = (turfId: string) => {
    const turfToEdit = userTurfs.find(turf => turf.id === turfId);
    if (turfToEdit) {
      setFormData({
        location: turfToEdit.location,
        turfName: turfToEdit.turfName,
        contactNo: turfToEdit.contactNo,
        rating: turfToEdit.rating,
        maxMembers: turfToEdit.maxMembers,
        price: turfToEdit.price,
        sports: turfToEdit.sports || [''],
        slots: turfToEdit.slots || [''],
        image: null,
      });
      setEditingTurfId(turfId);
      setShowCreateForm(true);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSportsChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newSports = [...formData.sports];
    newSports[index] = e.target.value;
    setFormData(prev => ({
      ...prev,
      sports: newSports,
    }));
  };

  const handleSlotsChange = (e: React.ChangeEvent<HTMLInputElement>, index: number) => {
    const newSlots = [...formData.slots];
    newSlots[index] = e.target.value;
    setFormData(prev => ({
      ...prev,
      slots: newSlots,
    }));
  };

  const handleAddSport = () => {
    setFormData(prev => ({
      ...prev,
      sports: [...prev.sports, ''],
    }));
  };

  const handleAddSlot = () => {
    setFormData(prev => ({
      ...prev,
      slots: [...prev.slots, ''],
    }));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFormData(prev => ({
        ...prev,
        image: e.target.files[0],
      }));
    }
  };
  <Heading>My Turfs</Heading>

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const { location, turfName, contactNo, rating, maxMembers, price, sports, slots, image } = formData;

    if (!location || !turfName || !contactNo || !rating || !maxMembers || !price || !sports || !slots || !image) {
      setErrorMessage('Please fill in all the fields and upload an image.');
      return;
    }

    const formDataToSubmit = new FormData();
    formDataToSubmit.append('location', location);
    formDataToSubmit.append('turfName', turfName);
    formDataToSubmit.append('contactNo', contactNo);
    formDataToSubmit.append('rating', rating.toString());
    formDataToSubmit.append('maxMembers', maxMembers.toString());
    formDataToSubmit.append('price', price.toString());
    formDataToSubmit.append('sports', JSON.stringify(sports)); 
    formDataToSubmit.append('slots', JSON.stringify(slots)); 
    formDataToSubmit.append('ImageFile', image); 

    try {
      if (editingTurfId) {
        // Update existing turf
        const response = await axios.put(`https://localhost:7167/turf/update/${editingTurfId}`, formDataToSubmit, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response.status === 200) {
          setSuccessMessage('Turf updated successfully!');
          setEditingTurfId(null); // Clear the editing state
          setFormData({
            location: '',
            turfName: '',
            contactNo: '',
            rating: 0,
            maxMembers: 0,
            price: 0,
            sports: [''],
            slots: [''],
            image: null,
          });
          fetchUserTurfs(); // Refetch user turfs
        }
      } else {
        // Create new turf
        const response = await axios.post('https://localhost:7167/turf/create', formDataToSubmit, {
          headers: {
            Authorization: `Bearer ${token}`,
            'Content-Type': 'multipart/form-data',
          },
        });
        if (response.status === 201) {
          setSuccessMessage('Turf created successfully!');
          setFormData({
            location: '',
            turfName: '',
            contactNo: '',
            rating: 0,
            maxMembers: 0,
            price: 0,
            sports: [''],
            slots: [''],
            image: null,
          });
          fetchUserTurfs(); // Refetch user turfs
        }
      }
    } catch (error) {
      setErrorMessage('There was an error processing the request.');
      console.error('Error:', error);
    }
  };

  const fetchUserTurfs = () => {
    if (token) {
      axios.get('https://localhost:7167/turf/get_userturf', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(response => {
        setUserTurfs(response.data);
      })
      .catch(error => {
        console.error('Error fetching turfs:', error);
      });
    }
  };

  const handleDeleteModal = (turfId: string) => {
    setTurfToDelete(turfId);
    setShowDeleteModal(true);
  };

  const handleConfirmDelete = async () => {
    if (turfToDelete) {
      try {
        const response = await axios.delete(`https://localhost:7167/turf/delete/${turfToDelete}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (response.status === 200) {
          setSuccessMessage('Turf deleted successfully!');
          setShowDeleteModal(false);
          fetchUserTurfs();
        }
      } catch (error) {
        setErrorMessage('Error deleting the turf.');
      }
    }
  };

  const handleCancelDelete = () => {
    setShowDeleteModal(false);
    setTurfToDelete(null);
  };

  // Close Create/Edit Turf Modal
  const closeCreateForm = () => {
    setShowCreateForm(false);
    setEditingTurfId(null);
    setFormData({
      location: '',
      turfName: '',
      contactNo: '',
      rating: 0,
      maxMembers: 0,
      price: 0,
      sports: [''],
      slots: [''],
      image: null,
    });
  };

  // Close Delete Turf Modal
  const closeDeleteModal = () => {
    setShowDeleteModal(false);
    setTurfToDelete(null);
  };

  return (
    <Container>
<ButtonContainer>
  <CreateTurfButton onClick={() => setShowCreateForm(true)}>Create Turf</CreateTurfButton>
</ButtonContainer>

      

      <TurfGrid>
        {userTurfs && userTurfs.length > 0 ? (
          userTurfs.map((turf, index) => (
            <TurfCard key={index}>
              <TurfName>{turf.turfName}</TurfName>
              <TurfDetails>Location: {turf.location}</TurfDetails>
              <TurfDetails>Price per Hour: {turf.price}</TurfDetails>
              <TurfDetails>Rating: {turf.rating}</TurfDetails>
              <ButtonContainer>
              <EditTurfButton onClick={() => handleEdit(turf.id)}>Edit Turf</EditTurfButton>
              </ButtonContainer>
              <ButtonContainer>
              <DeleteTurfButton onClick={() => handleDeleteModal(turf.id)}>Delete Turf</DeleteTurfButton> 
              </ButtonContainer>
              </TurfCard>
          ))
        ) : (
          <p>You don't have any turfs yet. Click below to create one!</p>
        )}
      </TurfGrid>

      {showCreateForm && (
        <Modal>
          <ModalContent>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <Heading>{editingTurfId ? 'Edit Turf' : 'Create Turf'}</Heading>
              <Button onClick={closeCreateForm} style={{ fontSize: '20px', cursor: 'pointer' }}>X</Button> {/* Close Button */}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap' }}>
              <Column>
                <Label>Location</Label>
                <Input
                  type="text"
                  name="location"
                  value={formData.location}
                  onChange={handleChange}
                  placeholder="Enter location"
                />
                <Label>Turf Name</Label>
                <Input
                  type="text"
                  name="turfName"
                  value={formData.turfName}
                  onChange={handleChange}
                  placeholder="Enter turf name"
                />
                <Label>Contact No</Label>
                <Input
                  type="text"
                  name="contactNo"
                  value={formData.contactNo}
                  onChange={handleChange}
                  placeholder="Enter contact number"
                />
                <Label>Rating</Label>
                <Input
                  type="number"
                  name="rating"
                  value={formData.rating}
                  onChange={handleChange}
                  placeholder="Enter rating"
                />
                <Label>Max Members</Label>
                <Input
                  type="number"
                  name="maxMembers"
                  value={formData.maxMembers}
                  onChange={handleChange}
                  placeholder="Enter max members"
                />
              </Column>
              <Column>
                <Label>Price per Hour</Label>
                <Input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder="Enter price"
                />
                <Label>Sports Available</Label>
                {formData.sports.map((sport, index) => (
                  <div key={index}>
                    <Input
                      type="text"
                      value={sport}
                      onChange={(e) => handleSportsChange(e, index)}
                      placeholder={`Enter sport #${index + 1}`}
                    />
                  </div>
                ))}
                <Button type="button" onClick={handleAddSport}>Add Sport</Button>

                <Label>Available Slots</Label>
                {formData.slots.map((slot, index) => (
                  <div key={index}>
                    <Input
                      type="text"
                      value={slot}
                      onChange={(e) => handleSlotsChange(e, index)}
                      placeholder={`Enter slot #${index + 1}`}
                    />
                  </div>
                ))}
                <Button type="button" onClick={handleAddSlot}>Add Slot</Button>

                <Label>Upload Image</Label>
                <ImageUpload
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                />
              </Column>
            </div>

            {errorMessage && <Info>{errorMessage}</Info>}
            {successMessage && <SuccessMessage>{successMessage}</SuccessMessage>}

            <Button type="submit" onClick={handleSubmit}>
              {editingTurfId ? 'Update Turf' : 'Create Turf'}
            </Button>
          </ModalContent>
        </Modal>
      )}

      {showDeleteModal && (
        <Modal>
          <ModalContent>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <h3>Are you sure you want to delete this turf?</h3>
              <Button onClick={closeDeleteModal} style={{ fontSize: '20px', cursor: 'pointer' }}>X</Button> {/* Close Button */}
            </div>
            <Button onClick={handleConfirmDelete}>Yes, Delete</Button>
            <Button onClick={handleCancelDelete}>Cancel</Button>
          </ModalContent>
        </Modal>
      )}
    </Container>
  );
};


export default CreateTurf;