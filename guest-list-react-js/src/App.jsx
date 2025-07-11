//import React from 'react';
import { useState } from 'react';
//import { useEffect } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import jsLogo from './assets/JS_logo.png';

//Components:
import NewGuestAddSection from './components/NewGuestAddSection/NewGuestAddSection';
import ListGuestSection from './components/ListGuestSection/ListGuestSection';

//Styles:
import './App.css'

function App() {
  const [guestList, setGuestList] = useState([]);

  /**Add a new guest to the 'Guest List'*/
  function addGuest(name) {
    const newGuest = {
      name: name,
      confirmed: false,
    };
    setGuestList([...guestList, newGuest]); // Add guest as object //OR: guestList.concat(newGuest)
  }

  /**Remove a guest from the 'Guest List'*/
  function removeGuest(indexToRemove) {
    setGuestList(
      guestList.filter(function (_, index) {
        return index !== indexToRemove;
      })
    );
  }

  /**Confirm a guest in the 'Guest List'*/
  function confirmGuest(indexToConfirm) {
    const updatedList = guestList.map(function (guest, index) {
      if (index === indexToConfirm) {
        return {
          ...guest,
          confirmed: true,
        };
      }
      return guest;
    });
    setGuestList(updatedList);
  }

  /*Remove all guests from the 'Guest List' */
  function clearAllGuests() {
    setGuestList([]); //Set the list to an empty array
  }
/*------------------------------------------------------------------------------------------*/
  return (
    <>
      <div>
        <h1 className="js-is-power">JS is power!</h1>
          <a href="https://vite.dev" target="_blank">
            <img src={viteLogo} className="logo" alt="Vite logo" />
          </a>
          <a href="https://react.dev" target="_blank">
            <img src={reactLogo} className="logo react" alt="React logo" />
          </a>
          <a href="#" target="_self">
            <img src={jsLogo} className="logo js" alt="JS logo" />
          </a>
      </div>
      <hr /><hr />

      <main>
        <h1>Dynamic Guest List</h1>

          <NewGuestAddSection 
            onAddGuest={addGuest} 
          />

          <ListGuestSection 
            guests={guestList} 
            onRemoveGuest={removeGuest} 
            onConfirmGuest={confirmGuest}
            onClearAllGuests={clearAllGuests}
          />
      </main>
    </>
  )
}
export default App
