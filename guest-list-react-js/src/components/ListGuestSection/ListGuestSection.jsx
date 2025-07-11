import './ListGuestSection.css';

function ListGuestSection(props) {

/*------------------------------------------------------------------------------------------*/
    return (
      <div className="listGuestSection-component">
        <h2>Guest's List:</h2>
        {/* content */}

        <ol id="guest_mane_ul_list" className="guest-mane-ul-list">
          {props.guests.map(
            function (guest, index){
              return (
                <li key={index}>
                  <span style={{color: guest.confirmed ? "#008000" : "#837e7e", marginRight: "10px"}} > 
                    {guest.name}
                  </span>

                    {/*"Cobfirm" Button*/}
                    <button className={`btn-confirm ${guest.confirmed ? 'confirmed' : ''}`}
                      onClick={function () {
                        props.onConfirmGuest(index);
                      }}
                      disabled={guest.confirmed}
                      >Confirm</button>

                    {/*"Remove" Button*/}
                    <button className="btn-remove"
                      onClick={function (){
                        props.onRemoveGuest(index);
                      }}
                      style={{ marginLeft: "10px" }}
                    >x</button>
                </li>
              );
            }
          )}
        </ol>

      {/*"Clear All" Button*/}
      {props.guests.length > 0 ? (
        <button className="btn-clearAll"
        onClick={function () {
          props.onClearAllGuests();
        }}
        style={{ marginTop: "15px", }}
        >Clear All</button>
      ) : null}
      
      </div>
    );
}
export default ListGuestSection;