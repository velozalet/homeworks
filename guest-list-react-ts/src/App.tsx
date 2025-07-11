import { useState } from 'react';
import reactLogo from './assets/react.svg';
import viteLogo from '/vite.svg';
import jsLogo from './assets/JS_logo.png';

//import { Guest } from './types/Guest'; //Wrong (with verbatimModuleSyntax)
import type { Guest } from './types/Guest';

//Components:
import NewGuestAddSection from './components/NewGuestAddSection/NewGuestAddSection';
import ListGuestSection from './components/ListGuestSection/ListGuestSection';

// Styles:
import './App.css';



function App() {
  const [guestList, setGuestList] = useState<Guest[]>([]);

  /**Add a new guest to the 'Guest List'*/
  function addGuest(name: string) {
    const newGuest = {
      name: name,
      confirmed: false,
    };
    setGuestList([...guestList, newGuest]);
    /* setGuestList() — React's function to update the guestList state
      [...] — JavaScript's spread syntax (ES6) to copy an array
      Adding a new item at the end of the copied array
      ---------------------------
      guestList is your current list of guests (an array)
      ...guestList spreads (copies) each item from the original array
      newGuest is added as a new item at the end
      The result is a brand-new array with all previous guests + the new one
      setGuestList(...) updates the state with that new array
      ---------------------------
      In React, state should always be immutable. That’s why [...guestList, newGuest] is preferred — it creates a new array, so React knows to re-render.
     */
  }

  /**Remove a guest from the 'Guest List'*/
  function removeGuest(indexToRemove: number) {
    setGuestList(
      guestList.filter(function (_, index) {
        return index !== indexToRemove;
      })
    );
  }

  /**Confirm a guest in the 'Guest List'*/
  function confirmGuest(indexToConfirm: number) {
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
export default App;
