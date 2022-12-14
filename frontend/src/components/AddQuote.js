import "../index.css"
import { AuthContext } from "../context/auth.context";
import { useState } from "react";
import axios from "axios";
import { useContext } from "react";

const API_URL = "http://localhost:5005";
const API_URL2 = "https://plain-belt.cyclic.app"

function AddQuote({refreshQuotes}) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const {user} = useContext(AuthContext)
  console.log(user.name)
  

  const handleSubmit = (e) => {
    e.preventDefault();
    let owner = user.name
    const requestBody = { title, description, owner };

    // Get the token from the localStorage
    const storedToken = localStorage.getItem('authToken');

    // Send the token through the request "Authorization" Headers
    axios
      .post(
        `${API_URL2}/api/my-quotes`,
        requestBody,
        { headers: { Authorization: `Bearer ${storedToken}` } }
      )
      .then((response) => {
        // Reset the state
        setTitle("");
        setDescription("");
        refreshQuotes();
      })
      .catch((error) => console.log(error));
  };


  return (
    <div className="AddQuote">
     <div> 
        <h3>Add Quote</h3>

          <form onSubmit={handleSubmit}>
            
            <textarea
              id="textarea"
              maxLength={150}
              placeholder="Your quote..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />

            <br/>
            <button className="SubmitButton" type="submit">Submit</button>
          </form>
      </div>
    </div>
  );
}

export default AddQuote;