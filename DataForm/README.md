# DataForm Component Documentation

## Purpose
The `DataForm` component is a React functional component designed to collect user input for first name, last name, phone, and email. Upon submission, it displays the entered data in a card above the form.

## Properties
The `DataForm` component does not accept any props.

## State Management
The component uses the `useState` hook to manage the state of the form inputs:
- `firstName`
- `lastName`
- `phone`
- `email`

## Styling
The component uses pure CSS with high contrast colors to ensure accessibility. The CSS is designed to be simple and effective, making the form easy to read and use for all users, including those with visual impairments.

## Usage
To use the `DataForm` component, import it into your React application and include it in your component tree as shown below:

```jsx
import DataForm from './DataForm';

function App() {
  return (
    <div>
      <DataForm />
    </div>
  );
}

export default App;
```

## User Interactions
- Users can enter their first name, last name, phone, and email into the form inputs.
- Upon form submission, the entered data is displayed in a card above the form.

## Accessibility
The component is styled with high contrast colors to ensure it is accessible to users with visual impairments. The form inputs and labels are designed to be easily readable, and the form is structured to be navigable via keyboard.

## Example Code
Here is an example implementation of the `DataForm` component:

```jsx
import React, { useState } from 'react';
import './DataForm.css'; // Assuming you have a CSS file for styling

const DataForm = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [submittedData, setSubmittedData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmittedData({ firstName, lastName, phone, email });
  };

  return (
    <div className="data-form-container">
      {submittedData && (
        <div className="data-card">
          <h2>Submitted Data</h2>
          <p><strong>First Name:</strong> {submittedData.firstName}</p>
          <p><strong>Last Name:</strong> {submittedData.lastName}</p>
          <p><strong>Phone:</strong> {submittedData.phone}</p>
          <p><strong>Email:</strong> {submittedData.email}</p>
        </div>
      )}
      <form onSubmit={handleSubmit} className="data-form">
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="phone">Phone</label>
          <input
            type="tel"
            id="phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default DataForm;
```

## CSS Styling
Here is an example of the CSS that could be used to style the `DataForm` component:

```css
.data-form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.data-card {
  background-color: #f9f9f9;
  border: 1px solid #ccc;
  padding: 20px;
  margin-bottom: 20px;
}

.data-card h2 {
  margin-top: 0;
}

.data-form .form-group {
  margin-bottom: 15px;
}

.data-form label {
  display: block;
  margin-bottom: 5px;
  font-weight: bold;
}

.data-form input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
}

.data-form button {
  background-color: #007bff;
  color: white;
  padding: 10px 15px;
  border: none;
  cursor: pointer;
}

.data-form button:hover {
  background-color: #0056b3;
}
```

This documentation provides a comprehensive overview of the `DataForm` component, including its purpose, usage, and implementation details.