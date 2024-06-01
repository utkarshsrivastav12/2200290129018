import React, { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [response, setResponse] = useState(null);
  const [selectedOption, setSelectedOption] = useState("");
  const [average, setAverage] = useState(0);

  const urlMap = {
    fibonacci: "http://20.244.56.144/test/fibo",
    prime: "http://20.244.56.144/test/primes",
    even: "http://20.244.56.144/test/even",
    rand: "http://20.244.56.144/test/rand",
  };

  const getUrl = (selectedOption) => {
    return urlMap[selectedOption] || "";
  };

  useEffect(() => {
    const fetchData = async () => {
      const url = getUrl(selectedOption);
      if (selectedOption && url) {
        try {
          const authToken = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiZXhwIjoxNzE3MjI1NzYxLCJpYXQiOjE3MTcyMjU0NjEsImlzcyI6IkFmZm9yZG1lZCIsImp0aSI6ImYwZWQ4NWU5LTU3NDktNDBjOS05ZmQyLTcyMzNmMjRiNzM3MyIsInN1YiI6InRoZXV0a2Fyc2g1NUBnbWFpbC5jb20ifSwiY29tcGFueU5hbWUiOiJnb01hcnQiLCJjbGllbnRJRCI6ImYwZWQ4NWU5LTU3NDktNDBjOS05ZmQyLTcyMzNmMjRiNzM3MyIsImNsaWVudFNlY3JldCI6Imd4UmNhSWxMRG50b3d2d2siLCJvd25lck5hbWUiOiJ1dGthcnNoIiwib3duZXJFbWFpbCI6InRoZXV0a2Fyc2g1NUBnbWFpbC5jb20iLCJyb2xsTm8iOiIyMjAwMjkwMTI5MDE4In0.n-Uy5374WoPOsB_e_QMVf-IcVC7U4D6oooLSH5_XuQc";
          const response = await axios.get(url, {
            headers: {
              Authorization: `Bearer ${authToken}`,
            },
          });
          const data = response.data;
          setResponse(data);
          let sum = 0;
          for (let i = 0; i < data.length; i++) {
            sum += data[i];
          }
          setAverage(sum / data.length);
        } catch (error) {
          console.error("Error:", error);
        }
      }
    };

    fetchData();
  }, [selectedOption]); // Remove getUrl from the dependency array

  const handleChange = (event) => {
    setSelectedOption(event.target.value);
  };

  return (
    <div className="App">
      <div>
        <label htmlFor="options">Choose an option:</label>
        <select id="options" value={selectedOption} onChange={handleChange}>
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
