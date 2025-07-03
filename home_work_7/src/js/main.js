//==========================================================
//Student Yaroslav Lutskyi. A Dynamic Guest List App
// =========================================================

/* I) Assignment: Build a Dynamic Guest List App

Create a simple Guest List application using HTML, CSS, and JavaScript.
Overview:
    - The app will allow users to:
    - Add guest names to a visible list
    - Mark guests as "confirmed"
    - Remove guests from the list
    - This project is focused on DOM manipulation — no page refreshes allowed!

Core Features:
1. HTML Structure:
Your initial page should have:
    - An input field to type a guest's name
    - An "Add Guest" button
    - An empty container where the list will appear

2. JS Behavior:
When the user clicks "Add Guest":
    - Create a new list item element with the guest's name
    - Add a "Confirm" button and "Remove" button next to each guest
    - Clicking "Confirm" should toggle a "confirmed" style (e.g. green background or check icon)
    - Clicking "Remove" should remove that guest from the list

3. CSS Styling
Style the guest list clearly. Visually distinguish confirmed guests. Add hover/focus effects to buttons. Use spacing and alignment to keep the UI clean


 Bonus Features (Optional):
 + Add a count of confirmed guests
 + Add a "Clear All" button to remove all guests
 - Save the guest list in localStorage
 + Sort the list alphabetically

 All buttons work as expected
 No errors in the browser console
 Clean and readable HTML/CSS/JS
 DOM updates in real time
 Your name is in a comment in index.html
*/
//====================================================================================================================
document.addEventListener( 'DOMContentLoaded', function () {

    const wrapper_grid = document.querySelector('.wrapper-grid'); //main parent GRID-container
    const new_guest_add_section = wrapper_grid.querySelector('.wrapper-grid .new-guest-add-section'); //section - block where new guests are added
    const list_guest_section = wrapper_grid.querySelector('.wrapper-grid .list-guest-section'); //section - a block where already added guests are displayed

    const guest_mane_input = document.getElementById('guest_mane_input'); //input field for enter a new guest
    const guest_mane_btn = document.getElementById('guest_mane_btn'); //button for adding a new guest
    const guest_mane_ul_list = document.getElementById('guest_mane_ul_list'); // ul list - container where added guests will be located

    const clear_guest_list = document.getElementById('clear_guest_list'); //button "Clear All"
    const sort_guest_list = document.getElementById('sort_guest_list'); //button "Sort Guests A–Z"
//-------------------------------------------------------------------------------------------------------------------

/* I. Create a "createBtnFunc" function for creating "Remove" and a "Confirm" buttons for all li-elements of the `Guests List` and
     create events by clicking on these buttons - removing a guest from the list and confirming the guest.
    Additionally, we make logic for adding/removing CSS-classes for visual display of content when there is at least 1 guest or more in the list and when there is none
*/
    /**createBtnFunc function
     * @param {HTMLElement} item - The parent element where the button will be added
     * @param {string} tagName - The tag name for the element
     * @param {string} content - The text content for the button
     * @param {string} className - The class name(s) to assign to the button
     * @param {boolean} [prepend=true] - If true, prepends the button to the 'item'; otherwise, appends it
     * @returns {void}
    */
    const createBtnFunc = (item, tagName, content, className, prepend = true) => {
        let button = document.createElement(tagName);
        button.className = className;
        button.appendChild( document.createTextNode(content) );

        (prepend === true) ? item.prepend(button) : item.appendChild(button);

        item.addEventListener('click', function(event) { //console.log(event.target);
           if( event.target.classList.value === 'btn-remove' ){ //When "Remove" button pressed
               item.remove();

               updateCntAllGuests(); //Run count All Guest (after removing a guest)
               updateCntConfirmedGuests(); //Run count Confirmed Guest (after removing a guest)
           }
           if( event.target.classList.value === 'btn-confirm' ){ //When "Confirm" button pressed
               item.classList.toggle("confirmed", true);
               event.target.style.visibility = "hidden";

               updateCntAllGuests();//Run count All Guest (after confirming a guest)
               updateCntConfirmedGuests(); //Run count Confirmed Guest (after confirming a guest)
           }

           //When in `Guests List` is no one:
           if( guest_mane_ul_list.querySelectorAll('li').length === 0 ){
               list_guest_section.classList.add('display-none');
               new_guest_add_section.classList.add('--show-one-block-only');
               wrapper_grid.classList.add('--justify-items-center');
           //When in `Guests List` is at least 1 guest or more:
           }else{
               list_guest_section.classList.remove('display-none');
               new_guest_add_section.classList.remove('--show-one-block-only');
               wrapper_grid.classList.remove('--justify-items-center');
           }
        });
    };


/* II. Create list items <li> with the required "Remove" and a "Confirm" buttons.
 Additionally, we make logic for adding/removing CSS-classes for visual display of content when there is at least 1 guest or more in the list and when there is none
*/
    function addGuestToList(){
        let new_li_elem = document.createElement("li");
        let guest_mane_input_value = document.createTextNode(guest_mane_input.value);
        new_li_elem.appendChild(guest_mane_input_value);

        createBtnFunc( new_li_elem,'button','Confirm','btn-confirm',false);
        createBtnFunc( new_li_elem,'button','X','btn-remove',false);

        guest_mane_ul_list.appendChild(new_li_elem);
        guest_mane_input.value = ''; //clear the input field after adding another list items <li> with guest's name

        //When in `Guests List` is no one:
        if( guest_mane_ul_list.querySelectorAll('li').length === 0 ){
            list_guest_section.classList.add('display-none');
            new_guest_add_section.classList.add('--show-one-block-only');
            wrapper_grid.classList.add('--justify-items-center');
        //When in `Guests List` is at least 1 guest or more:
        }else{
            list_guest_section.classList.remove('display-none');
            new_guest_add_section.classList.remove('--show-one-block-only');
            wrapper_grid.classList.remove('--justify-items-center');
        }

        updateCntAllGuests(); //Run count All Guest (after adding a new guest)
    }

    /* Event handler for key button "Enter" and click on the "Add Guest" button */
    function handleEvent(event) {
        //When "Enter" pressed:
        if( event.type === 'keypress' && event.key === "Enter" ){
            event.preventDefault(); //prevents the default behavior for input's form for "Enter"
            if( guest_mane_input.value === '' ){ return false; } //if the input field for a new guest is empty - return to false, do nothing
            addGuestToList();
         //When our button "Add Guest" pressed:
        }else if( event.type === 'click' ){
            if( guest_mane_input.value === '' ){ return false; } //if the input field for a new guest is empty - return to false, do nothing
            addGuestToList();
        }
    }


/* III. Events for key button "Enter" and click on the "Add Guest" button
*/
    guest_mane_btn.addEventListener("click", handleEvent);
    guest_mane_input.addEventListener("keypress", handleEvent);



/* ___________________________________________________B O N U S   F E A T U R E S */
    //1)
    /*ADDITIONAL functionality of counting ALL Guests in the Guest's List*/
    const cntAllGuests = () => { return guest_mane_ul_list.querySelectorAll('li').length; };
    const updateCntAllGuests = () => {
        const count = cntAllGuests();
        document.getElementById("allCount").textContent = `${count}`;
    };

    /*ADDITIONAL functionality of counting CONFIRMED Guests in the Guest's List*/
    const cntConfirmedGuests = () => { return guest_mane_ul_list.querySelectorAll('li.confirmed').length; };
    const updateCntConfirmedGuests = () => {
        const count = cntConfirmedGuests();
        document.getElementById("confirmedCount").textContent = `${count}`;
    };

    //2)
    /*ADDITIONAL functionality of removing ALL Guests from the Guest's List*/
    clear_guest_list.addEventListener("click", function(){
        guest_mane_ul_list.innerHTML = ''; // Remove all <li> elements in 'Guest's List'
        updateCntAllGuests();              // Update total count - all guests
        updateCntConfirmedGuests();        // Update confirmed count  - confirmed guests

        //When in `Guests List` is no one - hide sections with 'Guest's List'
        list_guest_section.classList.add('display-none');
        new_guest_add_section.classList.add('--show-one-block-only');
        wrapper_grid.classList.add('--justify-items-center');
    });

    //3)
    /* ADDITIONAL functionality of sorting the list of Guests by alphabetically*/
    const sortGuestList = () => {
        // 1. Get all <li> items in an array
        const itemsArray = Array.from(guest_mane_ul_list.querySelectorAll("li"));

        // 2. Sort the array based on the text inside each <li>
        itemsArray.sort((a, b) => {
            const nameA = a.firstChild.textContent.toLowerCase();
            const nameB = b.firstChild.textContent.toLowerCase();
            return nameA.localeCompare(nameB);
        });

        // 3. Clear the list
        guest_mane_ul_list.innerHTML = '';

        // 4. Append the sorted <li> items back to the list
        itemsArray.forEach(item => guest_mane_ul_list.appendChild(item));
    };

    sort_guest_list.addEventListener("click", sortGuestList);


    //4)
    /*Save the guest list in localStorage.
        Save/Delete and Set the status to "confirmed" for the "Guest list" in localStorage
    */ /*(!) See this in the 'useLocalStorage.js' file*/

}); //addEventListener()

