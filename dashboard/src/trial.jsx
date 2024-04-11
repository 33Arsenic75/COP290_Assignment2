import React, { useState } from 'react';
import axios from 'axios';
import data from './demo.json';

const MyComponent = () => {
  // State for input text
  const [inputText, setInputText] = useState('');

  // Handler for input change
  const handleInputChange = (event) => {
    setInputText(event.target.value);
  };

  // Function to write data to JSON
  const writeToJSON = () => {
    // Prepare data object with the input text
    const newData = { input: inputText };
    console.log(newData);
    // Make a POST request to the backend to write data
    axios.post('/api/writeData', newData)
    .then(() => {
      // Clear input field after successful write
      setInputText('');
    })
    .catch(error => {
      console.error('Error writing data:', error);
    });
  
  };
  

  return (
    <div>
      <h1>Data from JSON:</h1>
      <ul>
        {/* Rendering data from demo.json */}
        {Object.keys(data).map(key => (
          <li key={key}>
            <strong>{key}:</strong> {data[key]}
          </li>
        ))}
      </ul>

      {/* Input field and button for writing data */}
      <input
        type="text"
        value={inputText}
        onChange={handleInputChange}
        placeholder="Enter text..."
      />
      <button onClick={writeToJSON}>Write Data to JSON</button>
    </div>
  );
};

export default MyComponent;
