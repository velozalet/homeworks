//import React from 'react';
import { useState } from 'react';

import './NewGuestAddSection.css';

function NewGuestAddSection(props) {
    const [guestName, setGuestName] = useState("");

    const handleSubmit = (e) => { console.log("Guest added:", guestName);
        //Prevents the default behavior for input's form for "Enter" or "Submit button"
        e.preventDefault();
        //Don't submit if the input is empty or only spaces
        if( guestName.trim() === "" ){ return; } //OR: if (guestName.trim() === "") return;
        //Call parent function
        props.onAddGuest(guestName.trim());
        //Clear input
        setGuestName(""); //Clear input
    };

    const addGuestName = (e) => { //console.log(e.target.value); 
        setGuestName(e.target.value);
    }
/*------------------------------------------------------------------------------------------*/
    return (
      <div className="newGuestAddSection-component">
         <h2>Add new Guest to the "Guest's List:</h2>
        {/* content */}

        <form onSubmit={handleSubmit}>
            <input
                type="text"
                name="guest_name"
                id="guest_name_input"
                placeholder="Guest's name"
                value={guestName}
                onChange={addGuestName}
            />
            <button type="submit">Add Guest</button>
        </form>
      </div>
    );
}
export default NewGuestAddSection;