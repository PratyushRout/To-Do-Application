// select the elements
const clear = document.querySelector(".clear");
const dateElement = document.getElementById("date");
const list = document.getElementById("list");
const input = document.getElementById("input");

// classes names
const CHECK = "fa-check-circle";
const UNCHECK = "fa-circle-thin";
const LINE_THROUGH = "lineThrough";

// variables
let LIST, id;

// get item from localstorage
let data = localStorage.getItem("TODO");

// check if data is not empty
if (data) {
  LIST = JSON.parse(data);
  id = LIST.length; // set the id to the last one in the list
  loadList(LIST); // load the list to the user interface
} else {
  // if data isn't empty
  LIST = [];
  id = 0;
}

// load items to the user's interface
function loadList(array) {
  array.forEach(function (item) {
    addToDo(item.name, item.id, item.done, item.trash);
  });
}

// clear the local storage
clear.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});

// show today's date
const options = { weekday: "long", month: "short", day: "numeric" };
const today = new Date();
dateElement.innerHTML = today.toLocaleDateString("en-US", options);

// add to do function
function addToDo(toDo, id, done, trash) {
  if (trash) {
    return;
  }

  const DONE = done ? CHECK : UNCHECK;
  const LINE = done ? LINE_THROUGH : "";

  const item = `<li class='item'>
                    <i class="fa ${DONE} co" job="complete" id="${id}"></i>
                    <p class="text ${LINE}">${toDo}</p>
                    <i class="fa fa-trash-o de" job="delete" id="${id}"></i>
                  <li>
                 `;
  const position = "beforeend";

  list.insertAdjacentHTML(position, item);
}

// add an item to the list user the enter key
document.addEventListener("keyup", function (even) {
  if (event.keyCode == 13) {
    const toDo = input.value;

    // if the input isn't empty
    if (toDo) {
      addToDo(toDo, id, false, false);
      LIST.push({
        name: toDo,
        id: id,
        done: false,
        trash: false,
      });

      // add item to localstorage (this code must be added where the LIST array is updated )
      localStorage.setItem("TODO", JSON.stringify(LIST));

      id++;
    }
    input.value = "";
  }
});

// complete to do
function completeToDo(element) {
  element.classList.toggle(CHECK);
  element.classList.toggle(UNCHECK);
  element.parentNode.querySelector(".text").classList.toggle(LINE_THROUGH);

  LIST[element.id].done = LIST[element.id].done ? false : true;
}

// remove to do
function removeToDo(element) {
  element.parentNode.parentNode.removeChild(element.parentNode);

  LIST[element.id].trash = true;
}

function getTime() {
  var systemDate = new Date();
  var hours = systemDate.getHours();
  var minutes = systemDate.getMinutes();
  var ampm = hours >= 12 ? "pm" : "am";
  var twelve = hours % 12;
  hours = twelve == 0 ? 12 : twelve;
  _hours = checkTimeAddZero(hours);
  _minutes = checkTimeAddZero(minutes);
  //Only update if time is changed, this will prevent unnecessary re-render
  var timeInDOM = document.getElementById("current-time").innerHTML;
  var timeString = _hours + ":" + _minutes;
  if (timeInDOM !== timeString) {
    document.getElementById("current-time").innerHTML = timeString;
  }
}
// getTime() will be called in every 1 second of interval
setInterval(getTime, 1000);

//Function add zero
function checkTimeAddZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

// added quotes
function getQuotes() {
  fetch("https://api.quotable.io/random")
    .then((res) => res.json())
    .then((data) => {
      document.querySelector(".quote").innerHTML = `" ${data.content} "`;
      // ! planned to remove quote author, cuz i know no one cares about that lol.
      //   document.querySelector(
      //     ".credit"
      //   ).innerHTML = `<i> by - ${data.author}</i>`;
      //   document.querySelector("#quotes").style.opacity = 1;
    });
}
function showGreetingMessage(hours) {
  var textNode = document.getElementById("greeting");

  if (hours >= 0 && hours <= 3) {
    textNode.innerText = "You should sleep lmao!";
  }

  if (hours >= 4 && hours <= 11) {
    textNode.innerText = "Good Morning";
  }

  if (hours >= 12 && hours <= 16) {
    textNode.innerText = "Good Afternoon";
  }

  if (hours >= 17 && hours <= 21) {
    textNode.textContent = "Good Evening";
  }

  if (hours >= 22 && hours <= 0) {
    textNode.textContent = "Sweet Dreams";
  }
}

function init() {
  getTime();
  getQuotes();
  showGreetingMessage(new Date().getHours());
}

window.onload = function () {
  init();
};
// target items created dynamically

list.addEventListener("click", function (event) {
  const element = event.target; //return the clicked element inside list
  const elementJob = element.attributes.job.value; //complete or delete

  if (elementJob == "complete") {
    completeToDo(element);
  } else if (elementJob == "delete") {
    removeToDo(element);
  }

  // add item to localstorage (this code must be added where the LIST array is updated )
  localStorage.setItem("TODO", JSON.stringify(LIST));
});
