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
  console.log("restoring:", newPerson.id);

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
  }
  else {
    document.getElementById("people").classList.remove("editMode");
    editing = false;
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
    //array1["startDate"] = new Date("Aug 8, 2019 15:00:00");
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
  var currentDate = new Date();
  //var currentDate = new Date("Aug 10, 2019 15:00:00")
  var personArray = accessArray(nameID);
  var startDate = Date.parse(personArray["startDate"]);
  //var startDate = new Date("Aug 3, 2019 15:00:00");
  var secs = Math.abs(currentDate - startDate) / 1000;
  var elapsed = Math.round(secs / 86400);
  console.log("elapsed", elapsed);
  console.log("days", parseInt(personArray["days"]));

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

function resetDays(checkbox) {
  setTimeout("document.getElementById('body').classList.remove('checked');", 800);
  if(document.getElementById("name0").value == "Christopher") {
    document.getElementById("body").classList.add("checked");
  }

  setTimeout("checkbox0.checked = false;", 800);
}
