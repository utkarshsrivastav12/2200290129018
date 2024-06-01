import React, { useState } from "react";
import "./App.css";
import axios from 'axios';


function App() {
  const [response, setResponse] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const[average,setAverage]=useState(0);

  // Dictionary mapping option IDs to specific URLs
  const urlMap = {
    fibonacci: "http://20.244.56.144/test/fibo",
    prime: "http://20.244.56.144/test/primes",
    even: "http://20.244.56.144/test/even",
    rand: "http://20.244.56.144/test/rand",
  };
  // Function to retrieve URL based on selected option
  const getUrl = (selectedOption) => {
    return urlMap[selectedOption] || "";
  };

  const handleSubmit = async (event) => {
    setSelectedOption(event.target.value);
    if (selectedOption) {
      try {
        const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE3MjIxMTkzLCJpYXQiOjE3MTcyMjA4OTMsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImE1NmU4MTk4LWUzN2QtNDlhMS05NWQzLTk0NDQxYzVkNTkzOCIsInN1YiI6InV0a2Fyc2guMjEyNWNzMTIxM0BraWV0LmVkdSJ9LCJjb21wYW55TmFtZSI6ImdvTWFydCIsImNsaWVudElEIjoiYTU2ZTgxOTgtZTM3ZC00OWExLTk1ZDMtOTQ0NDFjNWQ1OTM4IiwiY2xpZW50U2VjcmV0IjoiWGdJV0hGT1BjTE5GdnlHTCIsIm93bmVyTmFtZSI6IlV0a2Fyc2giLCJvd25lckVtYWlsIjoidXRrYXJzaC4yMTI1Y3MxMjEzQGtpZXQuZWR1Iiwicm9sbE5vIjoiMjIwMDI5MDEyOTAxOCJ9.7rt0ArvtkbUtGLmxuaOSu60KYUbvGjpYsJo3rZaL6h0"; // Replace 'your_auth_token' with your actual authentication token
        const response = await axios.get(getUrl(selectedOption), {
          headers: {
            'Access-Control-Allow-Origin': '*',
            Authorization: `Bearer ${authToken}`,
          },
        });
        const data = await response.json();
        setResponse(data);
        let sum=0;
        for (let i=0;i<data.length;i++){
          sum+=data[i];
        }
        setAverage(sum/data.length);
        console.log(data);
      } catch (error) {
        console.error("Error:", error);
      }
    }
  };



  return (
    <div className="App">
      <div>
        <label htmlFor="options">Choose an option:</label>
        <select id="options" value={selectedOption} onChange={handleSubmit}>
          <option value="">Select an option</option>
          <option value="fibonacci">Fibonacci</option>
          <option value="prime">Prime</option>
          <option value="even">Even</option>
          <option value="rand">Random</option>
        </select>
        {selectedOption && <p>You have selected: {selectedOption}</p>}
        {response && (
          <div>
            <p>Response:</p>
            <pre>{JSON.stringify(response, null, 2)}</pre>
            <p>The average value is : {average}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
