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

  document.addEventListener('DOMContentLoaded', getGuests);
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
  } else {

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

  // store guest in local storage
  storeGuestLocal(UIguestInput.value);
  }
  // clear input box after each entry
  UIguestInput.value = '';

  e.preventDefault();
}

// REMOVE GUEST FUNCTION
function removeGuest(e){
  // tests if item clicked contains 'delete-item class
  // if so, delete item prompting user approval
  if (e.target.parentElement.classList.contains('delete-item')) {
  if (confirm('Are you sure?')){
    e.target.parentElement.parentElement.remove();
    // also removing the item from local storage
    removeGuestLocal(e.target.parentElement.parentElement);
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
  // clear all from local storage
  clearGuestsLocal();
}

// FILTER GUESTS FUNCTION
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

// GET GUESTS FUNCTION
function getGuests(){
  // create empty variable to store localStorage
  // guestList
  let guests;
  // test if localStorage contains any guests
  // if not, then assign empty array to guests var
  // to allow new guests to be added
  // else, assign found list to guests var
  // converting the items to an array of objects
  if(localStorage.getItem('guests') === null){
    guests = [];
  } else {
    guests = JSON.parse(localStorage.getItem('guests'));
  }

  // loop through each guest found
  // and append to the guestList
  guests.forEach(function(guest){
    // create empty <li>
  const li = document.createElement('li');
  // assign empty <li> the collection-item class
  li.className = 'collection-item';
  // create and insert text node to empty <li>
  // with the value of user input
  li.appendChild(document.createTextNode(guest));
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
  });

}

// STORE GUESTS LOCAL FUNCTION
function storeGuestLocal(guest){
  // create temp variable to hold local storage items
  // if local storage contains no items, set empty
  // array to local storage as a placeholdr
  // else, assign and parse local list to temp variable
  // then push the guest passed in to this list and then
  // parse back to string to store in local storage
  let guests;
  if(localStorage.getItem('guests') === null){
    guests = [];
  }else {
    guests = JSON.parse(localStorage.getItem('guests'));
  }
  guests.push(guest);
  localStorage.setItem('guests', JSON.stringify(guests));
}

// REMOVE GUESTS LOCAL FUNCTION
function removeGuestLocal(guestItem){
  // create temp variable to hold local storage guests
  // if local storage does not have guests assign empty
  // array as placeholder 
  // else parse to object array and test each index against
  // guestItem, if match then remove from object array and
  // send back to local storage
  let guests;
  if(localStorage.getItem('guests') === null){
    guests = [];
  }else{
    guests = JSON.parse(localStorage.getItem('guests'));
  }

  guests.forEach(function(guest, index){
    if(guestItem.textContent === guest){
      guests.splice(index, 1);
    }
  });
  localStorage.setItem('guests', JSON.stringify(guests));
}

// CLEAR GUESTS LOCAL
function clearGuestsLocal(){
  localStorage.clear();
}