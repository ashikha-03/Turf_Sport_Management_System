import React, { useState, useEffect, useRef } from 'react';
import { SliderContainer, TurfCard, TurfImage, TurfDetailsWrapper, TurfName, TurfLocation, TurfRating, TurfPrice, TurfButton, ScrollWrapper, LeftButton, RightButton } from './styles';
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

const TurfSlider = () => {
    const [turfs, setTurfs] = useState<Turfs[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const scrollRef = useRef<HTMLDivElement>(null);
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

                setTurfs(response.data);
            } catch (err: any) {
                setError('Failed to load turfs.');
            } finally {
                setLoading(false);
            }
        };

        fetchTurfs();
    }, []);

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -300, behavior: 'smooth' });
        }
    };

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 300, behavior: 'smooth' });
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <SliderContainer>
            <LeftButton onClick={scrollLeft}>‹</LeftButton>
            <ScrollWrapper ref={scrollRef}>
                {turfs.map((turf: any) => (
                    <TurfCard key={turf.id}>
                        {/* Check if image exists, otherwise use error image */}
                        <TurfImage
                            src={turf.image ? turf.image : errorImage}
                            alt={turf.turfName}
                        />
                        <TurfDetailsWrapper>
                            <TurfName>{turf.turfName}</TurfName>
                            <TurfLocation>{turf.location}</TurfLocation>
                            <TurfRating>Rating: {turf.rating} / 5</TurfRating>
                            <TurfPrice>₹{turf.price}/hr</TurfPrice>
                            <div>
                                <TurfButton onClick={() => { navigate(`/turf/${turf.id}`); }}>
                                    View Details
                                </TurfButton>
                            </div>
                        </TurfDetailsWrapper>
                    </TurfCard>
                ))}
            </ScrollWrapper>
            <RightButton onClick={scrollRight}>›</RightButton>
        </SliderContainer>
    );
};

export default TurfSlider;
