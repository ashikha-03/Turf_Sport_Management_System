import React, { useState, useEffect } from 'react';
import { TurfCard, TurfImage, TurfDetailsWrapper, TurfName, TurfLocation, TurfRating, TurfPrice, TurfButton, Turfcontainer } from './styles';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import errorImage from '../../assets/images/errorimage.png'; // Import the error image

// TypeScript Interface for Turfs
interface Turfs {
    userId?: string;
    id?: string;
    location?: string;
    sports?: string[];
    maxMembers?: number;
    turfName?: string;
    contactNo?: string;
    rating?: number;
    slots?: string[];
    price?: number;
    image?: string; // Add image field for base64 string
}

const ErrorDisplay: React.FC = () => {
    return (
        <div style={{ textAlign: 'center', padding: '20px' }}>
            <img 
                src={errorImage} // Use the imported error image here
                alt="Error Image" 
                style={{ width: '300px', height: 'auto', marginBottom: '20px' }} 
            />
            <p style={{ fontSize: '18px', color: '#555' }}>Oops! No data found</p>
        </div>
    );
};

const AllTurfs = () => {
    const [turfs, setTurfs] = useState<Turfs[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<boolean>(false); // Change to boolean error state

    const navigate = useNavigate();

    useEffect(() => {
        const fetchTurfs = async () => {
            try {
                const token = localStorage.getItem('authToken');
                const response = await axios.get('https://localhost:7167/turf/get_all_turfs', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (response.data && response.data.length > 0) {
                    setTurfs(response.data);
                } else {
                    setError(true); // Set error if no data found
                }
            } catch (err: any) {
                setError(true); // Set error on fetch failure
            } finally {
                setLoading(false);
            }
        };

        fetchTurfs();
    }, []);

    if (loading) {
        return (
            <ErrorDisplay /> // Show error image while loading if no data
        );
    }

    if (error) {
        return <ErrorDisplay />; // Show error image if there’s any error
    }

    return (
        <Turfcontainer>
            {turfs.map((turf: Turfs) => (
                <TurfCard key={turf.id}>
                    {/* Display base64 image if present, otherwise show error image */}
                    {turf.image ? (
                        <TurfImage src={turf.image} alt={turf.turfName} />
                    ) : (
                        <TurfImage src={errorImage} alt="Error Image" /> 
                    )}
                    <TurfDetailsWrapper>
                        <TurfName>{turf.turfName}</TurfName>
                        <TurfLocation>{turf.location}</TurfLocation>
                        <TurfRating>Rating: {turf.rating} / 5</TurfRating>
                        <TurfPrice>₹{turf.price}/hr</TurfPrice>
                        <div>
                            <TurfButton onClick={() => { navigate(`/turf/${turf.id}`); }}>View Details</TurfButton>
                        </div> 
                    </TurfDetailsWrapper>
                </TurfCard>
            ))}
        </Turfcontainer>
    );
};

export default AllTurfs;
