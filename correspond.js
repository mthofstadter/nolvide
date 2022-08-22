//correspond.js
//mthofstadter.github.io/nolvide

var editing = false;

document.addEventListener("DOMContentLoaded", function(event) {
  init();
});

function init() {
  //RESET
  // localStorage.clear();
  if(localStorage.getItem("peopleCount") == null) {
    localStorage.setItem("peopleCount", 0);
  }
  restorePeople();
  basicRestore();
}

function goHome() {
  document.getElementById('whiteBox').classList.add('grow');
  setTimeout("location.href='index.html';",1200);
}

function restorePeople() {
  for(var i=0; i<=parseInt(localStorage.getItem("peopleCount")); i++) {
    var checkThis = "person";
    checkThis = checkThis.concat(i);
    if(localStorage.getItem(checkThis) != null) {
      restore(i);
    }
  }
}

function save(input) {
  var parentID = input.parentElement.id;
  var personArray = accessArray(parentID);
  console.log(personArray);
  var inputID = input.id;
  inputID = inputID.replace(/[0-9]/g, ''); //remove numbers
  personArray[inputID] = input.value;
  localStorage.setItem(parentID, JSON.stringify(personArray));
  calculate(parentID);
}

function basicSave(input) {
  localStorage.setItem(input.id, input.value);
}

function basicRestore() {
  for(var i = 0; i < localStorage.length; i++) {
    if(document.getElementById(localStorage.key(i)) != null) { //If saved element exists on the page
      document.getElementById(localStorage.key(i)).value = localStorage.getItem(localStorage.key(i));
    }
  }
}

function add() {
  var duplicate = document.getElementById("exPerson"); //exPerson = example to clone
  var newPerson = duplicate.cloneNode(true);
  var newCount =  parseInt(localStorage.getItem("peopleCount")) + 1;
  localStorage.setItem("peopleCount", newCount);

  var textID = "person";
  newPerson.id = textID.concat(newCount);

  var emptyArray = {name:"", days:"", startDate:new Date()}
  emptyArray = JSON.stringify(emptyArray);
  localStorage.setItem(newPerson.id, emptyArray);

  textID = "name"
  newPerson.children[0].id = textID.concat(newCount);

  textID = "timer";
  newPerson.children[1].id = textID.concat(newCount);

  textID = "days";
  newPerson.children[2].id = textID.concat(newCount);

  textID = "checkbox";
  newPerson.children[4].id = textID.concat(newCount);

  document.getElementById("people").appendChild(newPerson);
}

function restore(num) {
  var duplicate = document.getElementById("exPerson");
  var newPerson = duplicate.cloneNode(true);

  var textID = "person";
  newPerson.id = textID.concat(num);
  var access = JSON.parse(localStorage.getItem(newPerson.id));

  textID = "name"
  newPerson.children[0].id = textID.concat(num);
  newPerson.children[0].value = access["name"];

  textID = "timer";
  newPerson.children[1].id = textID.concat(num);

  textID = "days";
  newPerson.children[2].id = textID.concat(num);
  newPerson.children[2].value = access["days"];

  textID = "checkbox";
  newPerson.children[4].id = textID.concat(num);

  document.getElementById("people").appendChild(newPerson);
  calculate(newPerson.id);
}

function edit() {
  if(editing == false) {
    document.getElementById("people").classList.add("editMode");
    editing = true;
    for(let i=0; i<=parseInt(localStorage.getItem("peopleCount")); i++) {
      let timer = document.getElementById("timer".concat(i));
      if(timer != null) {
        timer.innerHTML = "";
        editDate(timer);
        // let ymd = accessArray(timer.parentElement.id).startDate;
        // let ymdText = ymd.substring(5,7) + "/" + ymd.substring(8,10) + "/" + ymd.substring(0,4);
        // timer.innerHTML = ymdText;
      }
    }
  }
  else {
    document.getElementById("people").classList.remove("editMode");
    editing = false;
    for(let i=0; i<=parseInt(localStorage.getItem("peopleCount")); i++) {
      let timer = document.getElementById("timer".concat(i));
      if(timer != null) {
        timer.removeChild(timer.firstChild);
      }
    }
  }
}

function checkMe(element) {
  if(editing == true) {
    var parent = element.parentElement;
    localStorage.removeItem(parent.id);
    console.log(parent.id);
    parent.style.display = "none";
  }
  else {
    var parent = element.parentElement;
    var array1 = accessArray(parent.id);
    array1["startDate"] = new Date();
    // array1["startDate"] = new Date("Aug 15, 2022 15:00:00"); //reset for testing
    localStorage.setItem(parent.id, JSON.stringify(array1));
    calculate(parent.id);
    parent.children[1].classList.add("drain");
    element.classList.add("checkAnimate");
    setTimeout(`${element.id}.checked = false;`, 500);
    setTimeout(`${element.id}.classList.remove("checkAnimate");`, 1000);

  }
}

function accessArray(personID) {
  return JSON.parse(localStorage.getItem(personID));
}

function calculate(nameID) {
  var personArray = accessArray(nameID);
  let elapsed = getElapsed(nameID);

  var percent = Math.round(elapsed / parseInt(personArray["days"]) * 100);
  var element = document.getElementById(nameID);
  var inverse = 100 - percent;
  if(percent > inverse) {
    element.children[1].style.cssText =
      `background: linear-gradient(to right, #17a772 ${percent}%, #eeeeee ${inverse}%)`;
  }
  else {
    element.children[1].style.cssText =
      `background: linear-gradient(to left, #eeeeee ${inverse}%, #17a772 ${percent}%)`;
  }

  if(percent >= 100) {
    element.children[1].classList.add("full");
  }
  else {
    element.children[1].classList.remove("full");
  }
}

function getElapsed(nameID) {
  var currentDate = new Date();
  //var currentDate = new Date("Aug 22, 2022 15:00:00")
  var personArray = accessArray(nameID);
  var startDate = Date.parse(personArray["startDate"]);
  //var startDate = new Date("Aug 12, 2022 15:00:00");
  var secs = Math.abs(currentDate - startDate) / 1000;
  return Math.round(secs / 86400);
}

function showDate(timer) {
  if(editing) {
    return;
  }
  let elapsed = getElapsed(timer.parentElement.id);
  if(elapsed == 0) {
    timer.innerHTML = "Today";
  } else if(elapsed == 1) {
    timer.innerHTML = elapsed + " day ago";
  } else {
    timer.innerHTML = elapsed + " days ago";
  }
  timer.classList.add("showDate");
  setTimeout(`${timer.id}.classList.remove("showDate");`, 2000);
}

function editDate(timer) {
  const datePicker = document.createElement("input");
  datePicker.id = "date" + timer.id.slice(-1);
  datePicker.classList.add("date");
  datePicker.type = "date";
  datePicker.setAttribute("onchange", "saveNewDate(this)");
  datePicker.value = accessArray(timer.parentElement.id).startDate.split('T')[0];
  timer.appendChild(datePicker);
}

function resetDays(checkbox) {
  setTimeout("document.getElementById('body').classList.remove('checked');", 800);
  if(document.getElementById("name0").value == "Christopher") {
    document.getElementById("body").classList.add("checked");
  }

  setTimeout("checkbox0.checked = false;", 800);
}

function saveNewDate(datePicker) {
  var person = datePicker.parentElement.parentElement;
  var array1 = accessArray(person.id);
  array1["startDate"] = new Date(datePicker.value);
  // array1["startDate"] = new Date("Aug 15, 2022 15:00:00"); //reset for testing
  localStorage.setItem(person.id, JSON.stringify(array1));
  calculate(person.id)
}