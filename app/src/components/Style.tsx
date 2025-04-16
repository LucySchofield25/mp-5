'use client';

import styled from "styled-components";

export const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #fce7f3; 
  padding: 1.5rem;
  text-align: center;
`;

export const Heading = styled.h1`
  font-size: 2.25rem; 
  font-weight: bold;
  margin-bottom: 1rem;
  color: #be185d; 
`;

export const Subheading = styled.p`
  font-size: 1.125rem; 
  color: #db2777; 
  margin-bottom: 1.5rem;
`;

export const FormWrapper = styled.form`
  background-color: #fff;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  border-radius: 0.5rem;
  padding: 1.5rem;
  width: 100%;
  max-width: 28rem; 
`;

export const Input = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  border: 1px solid #d1d5db; 
  border-radius: 0.375rem;
  margin-bottom: 1rem;
  color: black;
  &::placeholder {
    color: #6b7280;
  }
`;

export const Button = styled.button`
  width: 100%;
  background-color: #db2777; 
  color: white;
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  transition: background-color 0.2s;
  &:hover {
    background-color: #be185d; /* Tailwind's indigo-700 */
  }
`;

export const ShortUrlOutput = styled.input`
  width: 100%;
  padding: 0.5rem 1rem;
  border: 2px solid #ec4899; 
  border-radius: 0.375rem;
  background-color: white;
  color: black;
  margin-top: 1.5rem;
`;

export const ErrorMessage = styled.p`
  color: #dc2626; 
  margin-top: 1.5rem;
`;
