// get the reference to the form
const addForm = document.querySelector(".add");
const list = document.querySelector(".todos"); // creating reference for that ul (list) class of todos
const search = document.querySelector(".search input"); // add keyup event to this

// to make code more re-usable we create a separate function for generating HTML template (for an li tag and then its gonna inject that into the DOM)
const generateTemplate = (todo) => {
  // template string for li tag, we could also use JavaScript methods like createElement but thats lengthy
  const html = `
        <li class="list-group-item d-flex justify-content-between align-items-center">
            <span>${todo}</span>
            <i class="far fa-trash-alt delete"></i>
        </li>
    `;

  // now we wanna inject this into the ul tag , creating reference for that ul (list)
  // we use += cuz we want appending of the new todo ; using = would completely overwrite the already existing todo
  list.innerHTML += html;
};

// adding a sumbit event listener to this form
// we listen to submit event and whent that happens we take the event as a parameter into the callback function
addForm.addEventListener("submit", (e) => {
  e.preventDefault(); // prevent default action
  const todo = addForm.add.value.trim();
  //  console.log(todo);  // this is what we actually wanna add to the dom to the page (when we add a todo it gets shown in the todo list as list item)

  if (todo.length > 0) {
    generateTemplate(todo);
    addForm.reset();
  }
});

// delete todos
list.addEventListener("click", (e) => {
  if (e.target.classList.contains("delete")) {
    e.target.parentElement.remove();
  }
});

// for reusability filter todos function is created outside of keyup event
const filterTodos = (term) => {
  Array.from(list.children).forEach((todo) => {
    const isMatch = todo.textContent.toLowerCase().includes(term);
    todo.classList.toggle("filtered", !isMatch);
  });
};

// keyup event on input field on form
search.addEventListener("keyup", () => {
  const term = search.value.trim().toLowerCase();
  filterTodos(term);
});

/* 
PROBLEMS ENCOUNTERED
1. It adds an empty todo also for that we use if condition to check length of to-be added todo, if length is above 0 then only we generateTemplate
2. After a todo is added to the list the input field for adding a new todo still shows the newly added todo to clear that from the form 
   we use reset() , we can use this method on forms that we query on the DOM  and what that does is reset all the input fields that are inside that form
3. FOR DELETE BUTTON
   We can query the DOM for all trash-can icons and attach an event listener to those. But there's 2 problems:
    a) If there's a lot of todos, then lots of work for JS to do, attaching an event listener to every single trash-can, affecting performance of the site
    b) If we attach listeners to the trash-cans, everytime we add a new todo, we've got to manually set up a new listener for that trash-can on that new todo
   To combat this efficient and easier way is Event Delegation
   We could attach event listener to the whole of UL itself, not the individual list items. Then whenever anything is clicked inside that UL, 
   the callback function is gonna fire. Inside that function we can then detect if the target element was infact a trash-can, if it is then 
   we can go for deleting the LI tag for that todo
This method has advantage that we're attaching only one event listener to one containing element, the UL and for new todos we dont need to add new listeners to them
4. For searching a todo
   we need to get a ref on input field which has a name of search not the form which has class of search because we're listening to the keyup event 
   on the input and not the submit event, this time on the search form.  
5. Array.from(list.children)
        .filter(() => {
            // console.log(todo.textContent);
            // return true;
        });  filter() goes thru all of the items of array, all of items in list of li and fires callback function for each one
    filter() filters return todo.textContent.includes(term); those li item aside which matches with our search in input field we dont apply a remove() on matched li coz we want to hide those li's which are not a match so only
    on those lis' we put remove() for hiding them so filter() will give us those li which does not match with our search return !todo.textContent.includes(term);
    putting an ! infront of it negates the boolean
    This process is less efficient and lengthy in code 
    Array.from(list.children)
     // console.log(term);
     // console.log(list.children);  // return html collections so we cant directly use array method filter(), coverting it first into an array would be a better idea
     // console.log(Array.from(list.children));  // return html collections so we cant directly use array method filter(), coverting it first into an array would be a better idea
        .filter(todo => !todo.textContent.toLowerCase().includes(term))
        .forEach(todo => {
            todo.classList.add('filtered');
            todo.classList.remove('d-flex')
        });
    
    Array.from(list.children)
        .filter(todo => todo.textContent.toLowerCase().includes(term))
        .forEach(todo => {
            todo.classList.remove('filtered');
            todo.classList.add('d-flex')
        });
6. after filtering those terms which not included in search when we type in to serch for a li in input field we can cycle through them using forEach and apply a class to each one of those in the array
  that class in css sheet , is gonna hide those todos.  
   add is style sheet - .filtered {display : none} If there's no CSS rule for .filtered, even though the class is being added, you won't see any visible changes.
7. if we type in search todo "mar" class is added to other li's but if we then type "ma" still the class is added on any li which includes those letters it did not get removed . So,
   Next we also remove classes when we get a match (doing reverse of what we did till now)
8. Search bar wasn't hiding any results even though the JS code was working and the classes were changing.
   I noticed that when having a d-flex class in a li tag, display: none !important won't work, therefore remove it first from that todo.
   Bootstrap’s .d-flex applies display: flex !important;, and your .filtered sets display: none !important;, which causes a CSS conflict.
   When both use !important, it's a battle — and the one loaded later in the CSS usually wins.
   Since Bootstrap loads before our custom CSS, our rule should win — but only if the selector is strong enough.
9. 🔎 Yeh (repeatedly add or remove) kyun avoid karna chahiye:
    Extra DOM manipulation ho rahi hai: har filter ke time par repeatedly remove aur add karte h Bootstrap ki class, jabki uska asli kaam display banana hi tha.
    Maintainability kam hoti hai: Kal ko agar Bootstrap update ho gaya ya d-flex ka behavior change ho gaya, to JS mein bhi modify karna padega.
    Better separation of concerns hoti hai CSS handle kare to: Filtering sirf CSS se ho to logic aur styling clearly alag rehte hain.
10. Solution is -- Instead of toggling .filtered and d-flex, just letting CSS override d-flex properly.
    .todos li.filtered {
        display: none !important;
    }
    This selector is more specific than just .filtered — so it overrides Bootstrap’s d-flex even when both use !important.
11. Then keeping JS logic simple by using a toggle ye performance mein bhi efficient hai, kyunki list do baar filter karne ki jagah ek hi baar loop ho rahi hai
    1. Array.from(list.children)
       list.children returns an HTMLCollection of all <li> elements.
       Array.from() converts that collection into a real array so we can use array methods like forEach().

    2. .forEach(todo => { ... })
       We loop over every li (todo item) and check whether it matches the search term.

    3. const isMatch = todo.textContent.toLowerCase().includes(term.toLowerCase());
        todo.textContent.toLowerCase() → makes the text in the todo lowercase (e.g., Play MarioKart → play mariokart)
        term.toLowerCase() → converts the user’s search input into lowercase.
        Then .includes(...) checks if the todo contains that lowercase search term.

    4. todo.classList.toggle('filtered', !isMatch);
        If isMatch === true, then !isMatch === false → 'filtered' class won’t be added.
        If isMatch === false, then !isMatch === true → 'filtered' class will be added.
        Basically:
        ✅ Match → show (no filtered class)
        ❌ No Match → hide (add filtered class)
*/
