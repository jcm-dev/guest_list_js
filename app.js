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

  UIguestForm.addEventListener('submit', addGuest);
  UIguestList.addEventListener('click', removeGuest);
  UIclearBtn.addEventListener('click', clearGuests);
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

