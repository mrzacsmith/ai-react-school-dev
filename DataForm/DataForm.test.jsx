import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import DataForm from './DataForm';

describe('DataForm Component', () => {
  test('renders form with all input fields', () => {
    render(<DataForm />);
    expect(screen.getByPlaceholderText('First Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Last Name')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Phone')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
  });

  test('updates state correctly when input values change', () => {
    render(<DataForm />);
    const firstNameInput = screen.getByPlaceholderText('First Name');
    const lastNameInput = screen.getByPlaceholderText('Last Name');
    const phoneInput = screen.getByPlaceholderText('Phone');
    const emailInput = screen.getByPlaceholderText('Email');

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });

    expect(firstNameInput.value).toBe('John');
    expect(lastNameInput.value).toBe('Doe');
    expect(phoneInput.value).toBe('1234567890');
    expect(emailInput.value).toBe('john.doe@example.com');
  });

  test('displays input data in the card upon form submission', () => {
    render(<DataForm />);
    const firstNameInput = screen.getByPlaceholderText('First Name');
    const lastNameInput = screen.getByPlaceholderText('Last Name');
    const phoneInput = screen.getByPlaceholderText('Phone');
    const emailInput = screen.getByPlaceholderText('Email');
    const submitButton = screen.getByText('Submit');

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });

    fireEvent.click(submitButton);

    expect(screen.getByTestId('submitted-data')).toBeInTheDocument();
    expect(screen.getByText('First Name: John')).toBeInTheDocument();
    expect(screen.getByText('Last Name: Doe')).toBeInTheDocument();
    expect(screen.getByText('Phone: 1234567890')).toBeInTheDocument();
    expect(screen.getByText('Email: john.doe@example.com')).toBeInTheDocument();
  });

  test('clears form after submission', () => {
    render(<DataForm />);
    const firstNameInput = screen.getByPlaceholderText('First Name');
    const lastNameInput = screen.getByPlaceholderText('Last Name');
    const phoneInput = screen.getByPlaceholderText('Phone');
    const emailInput = screen.getByPlaceholderText('Email');
    const submitButton = screen.getByText('Submit');

    fireEvent.change(firstNameInput, { target: { value: 'John' } });
    fireEvent.change(lastNameInput, { target: { value: 'Doe' } });
    fireEvent.change(phoneInput, { target: { value: '1234567890' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });

    fireEvent.click(submitButton);

    expect(firstNameInput.value).toBe('');
    expect(lastNameInput.value).toBe('');
    expect(phoneInput.value).toBe('');
    expect(emailInput.value).toBe('');
  });

  test('has high contrast colors for accessibility', () => {
    render(<DataForm />);
    const form = screen.getByRole('form');
    const style = window.getComputedStyle(form);
    expect(style.backgroundColor).toBe('rgb(255, 255, 255)'); // Assuming white background
    expect(style.color).toBe('rgb(0, 0, 0)'); // Assuming black text
  });
});