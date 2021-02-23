// UI VARIABLES
const UIguestForm = document.querySelector('#guest-form');
const UIguestList = document.querySelector('.collection');
const UIclearBtn = document.querySelector('.clear-guests');
const UIfilter = document.querySelector('#filter');
const UIguestInput = document.querySelector('#guest');

// LISTENER LOAD CALL
loadEventListeners();

// LISTNER CALL FUNCTION
function loadEventListeners(){

  document.addEventListener('DOMContentLoaded', getTasks);
  UIguestForm.addEventListener('submit', addGuest);
  UIguestList.addEventListener('click', removeGuest);
  UIclearBtn.addEventListener('click', clearGuests);
  UIfilter.addEventListener('keyup', filterGuests);
}

// ADD GUEST FUNCTION
function addGuest(e){
  // test input box for value
  if (UIguestInput.value === '') {
    alert ('Add a guest');
  }

  // create empty <li>
  const li = document.createElement('li');
  // assign empty <li> the collection-item class
  li.className = 'collection-item';
  // create and insert text node to empty <li>
  // with the value of user input
  li.appendChild(document.createTextNode(UIguestInput.value));
  // create empty <a>
  const link = document.createElement('a');
  // assign empty <a> the delete-item and secondary-content class
  link.className = 'delete-item secondary-content';
  // insert <i> tag to empty link and assign fontawesome icon classes
  link.innerHTML = '<i class="fa fa-remove"></i>';
  // append the link to the empty <li>
  li.appendChild(link);
  // append the newly appeneded <li> to the <ul>
  UIguestList.appendChild(li);



  // clear input box after each entry
  UIguestInput.value = '';

  e.preventDefault();
}

// REMOVE GUEST FUNCTION
function removeGuest(e){
  if (e.target.parentElement.classList.contains('delete-item')) {
  if (confirm('Are you sure?')){
    e.target.parentElement.parentElement.remove();
    }
  }
}

// CLEAR GUEST FUNCTION
function clearGuests(){
  // while loop testing if the guestList contains a child in
  // position 1 and if so removing it until none are left
  while (UIguestList.firstChild){
    UIguestList.removeChild(UIguestList.firstChild);
  }
}

function filterGuests(e){
  // grabbing filter input box value, converting it to toLowerCase
  //and assigning it to variable filterText 
  const filterText = e.target.value.toLowerCase();
  // grabbing all elements with .collection-item class
  // and looping through them temp assigning the iteration value
  // to guestItem variable
  document.querySelectorAll('.collection-item').forEach(function(guest){
    const guestItem = guest.firstChild.textContent;
    // converting guestItem to lower case and
    // test if the guestItem contains the filterText input
    // if it does then keep the guestItem displayed
    // if it does not then hide the guestItem
    if(guestItem.toLowerCase().indexOf(filterText) != -1){
      guest.style.display = 'block';
    } else {
      guest.style.display = 'none';
    }
  });
}