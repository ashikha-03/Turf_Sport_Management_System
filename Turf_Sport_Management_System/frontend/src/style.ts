// src/styles.ts
import styled from "styled-components";

// Home Section
export const HomeSection = styled.section`
  height: 100vh;
  background: #f4f4f4;
  padding: 50px;
  text-align: center;

  h1 {
    margin: 0;
  }

  img {
    max-width: 100%;
    height: auto;
  }
`;

// Turfs Section
export const TurfsSection = styled.section`
  padding: 50px;
`;

export const TurfCard = styled.div`
  min-width: 300px;
  background: #eee;
  padding: 20px;
  margin-right: 20px;
  text-align: center;
  border-radius: 5px;

  img {
    width: 100%;
    height: auto;
    border-radius: 5px;
  }
`;

// Contact Section
export const ContactSection = styled.section`
  padding: 50px;
  background: #f4f4f4;
  text-align: center;

  form {
    display: flex;
    flex-direction: column;
    max-width: 400px;
    margin: 0 auto;

    input,
    textarea {
      padding: 10px;
      margin-bottom: 10px;
      width: 100%;
      border: 1px solid #ccc;
      border-radius: 5px;
    }

    button {
      padding: 10px 20px;
      background: #333;
      color: white;
      border: none;
      border-radius: 5px;
      cursor: pointer;

      &:hover {
        background: #555;
      }
    }
  }
`;
