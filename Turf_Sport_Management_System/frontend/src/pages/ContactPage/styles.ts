// src/pages/ContactPage/styles.ts

import styled from "styled-components";

export const ContactWrapper = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;

  h2 {
    font-size: 2rem;
    margin-bottom: 1rem;
  }

  p {
    font-size: 1.2rem;
    margin-bottom: 2rem;
  }
`;

export const ContactForm = styled.form`
  display: flex;
  flex-direction: column;
  gap: 1rem;

  label {
    font-size: 1rem;
    margin-bottom: 0.5rem;
  }

  input,
  textarea {
    padding: 0.8rem;
    font-size: 1rem;
    border-radius: 8px;
    border: 1px solid #ccc;
  }

  button {
    background-color: #007bff;
    color: #fff;
    font-size: 1rem;
    padding: 1rem;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
      background-color: #0056b3;
    }
  }
`;
