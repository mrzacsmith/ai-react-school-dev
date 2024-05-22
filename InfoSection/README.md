# InfoSection Component Documentation

## Component Name
**InfoSection**

## Purpose
The `InfoSection` component is designed to display a section with a title, two paragraphs, and a button. It is a simple, reusable component that can be used to present information in a structured and visually appealing manner.

## Properties
This component does not accept any properties.

## Usage Example
```jsx
import React from 'react';
import InfoSection from './InfoSection';

function App() {
  return (
    <div className="App">
      <InfoSection />
    </div>
  );
}

export default App;
```

## Styling
The component uses TailwindCSS classes for layout and styling. Ensure you have TailwindCSS set up in your project to use this component effectively.

## Default Content
- **Title**: 'Lorem Ipsum'
- **Paragraph 1**: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.'
- **Paragraph 2**: 'Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.'
- **Button**: 'Visit Us Now' (1/3 width)

## User Interactions
The button is clickable but does not perform any specific action by default. You can add functionality to the button as needed.

## Component Code
```jsx
import React from 'react';

const InfoSection = () => {
  return (
    <section className="p-6 bg-gray-100 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-4">Lorem Ipsum</h2>
      <p className="mb-4">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
      </p>
      <p className="mb-6">
        Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
      </p>
      <button className="w-1/3 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-700">
        Visit Us Now
      </button>
    </section>
  );
};

export default InfoSection;
```

## Notes
- Ensure TailwindCSS is properly configured in your project to apply the styles correctly.
- You can customize the content and styles as needed by modifying the component code.
- To add functionality to the button, you can pass an `onClick` handler to the button element.