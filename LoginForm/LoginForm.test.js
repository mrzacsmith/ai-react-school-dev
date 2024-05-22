import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import LoginForm from './LoginForm';

describe('LoginForm Component', () => {
  test('renders email input, password input, and login button', () => {
    render(<LoginForm handleLogin={jest.fn()} />);
    
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login/i })).toBeInTheDocument();
  });

  test('updates state on email and password input', () => {
    render(<LoginForm handleLogin={jest.fn()} />);
    
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    
    expect(emailInput.value).toBe('test@example.com');
    expect(passwordInput.value).toBe('password123');
  });

  test('calls handleLogin with correct values on form submission', () => {
    const handleLoginMock = jest.fn();
    render(<LoginForm handleLogin={handleLoginMock} />);
    
    const emailInput = screen.getByPlaceholderText('Email');
    const passwordInput = screen.getByPlaceholderText('Password');
    const loginButton = screen.getByRole('button', { name: /login/i });
    
    fireEvent.change(emailInput, { target: { value: 'test@example.com' } });
    fireEvent.change(passwordInput, { target: { value: 'password123' } });
    fireEvent.click(loginButton);
    
    expect(handleLoginMock).toHaveBeenCalledWith('test@example.com', 'password123');
  });

  test('login button is clickable and triggers form submission', () => {
    const handleLoginMock = jest.fn();
    render(<LoginForm handleLogin={handleLoginMock} />);
    
    const loginButton = screen.getByRole('button', { name: /login/i });
    
    fireEvent.click(loginButton);
    
    expect(handleLoginMock).toHaveBeenCalled();
  });
});
