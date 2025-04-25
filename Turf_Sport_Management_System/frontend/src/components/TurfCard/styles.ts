// src/components/TurfCard/styles.ts
import styled from 'styled-components';

export const CardContainer = styled.div`
  width: 300px;
  border: 1px solid #ddd;
  border-radius: 8px;
  overflow: hidden;
  margin: 10px;
`;

export const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: cover;
`;

export const DetailsWrapper = styled.div`
  padding: 16px;
`;

export const Name = styled.h3`
  font-size: 1.2em;
  margin-bottom: 8px;
`;

export const Location = styled.p`
  font-size: 1em;
  color: #555;
  margin-bottom: 8px;
`;

export const Rating = styled.p`
  font-size: 0.9em;
  color: #777;
  margin-bottom: 8px;
`;

export const Price = styled.p`
  font-size: 1em;
  font-weight: bold;
  margin-bottom: 8px;
`;

export const ViewButton = styled.button`
  padding: 10px 15px;
  background-color: #007bff;
  color: white;
  border: none;
  cursor: pointer;
  border-radius: 4px;

  &:hover {
    background-color: #0056b3;
  }
`;
