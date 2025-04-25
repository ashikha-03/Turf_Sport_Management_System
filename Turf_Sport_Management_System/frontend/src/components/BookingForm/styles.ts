// src/components/BookingForm/styles.ts
import styled from 'styled-components';

export const FormWrapper = styled.form`
  background-color: #f4f4f9;
  padding: 30px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  max-width: 500px;
  margin: 0 auto;
  font-family: 'Arial', sans-serif;
`;

export const FormTitle = styled.h2`
  text-align: center;
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
`;

export const FormSection = styled.div`
  margin-bottom: 20px;
`;

export const Label = styled.label`
  display: block;
  font-size: 14px;
  color: #555;
  margin-bottom: 8px;
`;

export const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 14px;
  border: 1px solid #ddd;
  border-radius: 5px;
  background-color: #fff;
  color: #333;

  &:focus {
    outline: none;
    border-color: #4CAF50;
  }
`;

export const Button = styled.button`
  width: 100%;
  padding: 12px;
  background-color: #4CAF50;
  color: white;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  &:hover {
    background-color: #45a049;
  }
`;

export const Error = styled.span`
  color: red;
  font-size: 12px;
  margin-top: 5px;
  display: block;
`;

export const Message = styled.p`
  margin-top: 20px;
  font-size: 16px;
  color: green;
  text-align: center;
`;


export const SlotList = styled.ul`
  list-style-type: none;
  padding: 0;
  margin: 10px 0;
`;

export const SlotItem = styled.li`
  font-size: 1rem;
  color: #555;
  padding: 5px 0;
  display: flex;
  align-items: center;
`;

export const CheckboxLabel = styled.label`
  margin-left: 10px;
  font-size: 1rem;
  color: #555;
  cursor: pointer;
`;
