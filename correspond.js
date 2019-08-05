//correspond.js
//mthofstadter.github.io/nolvide

document.addEventListener("DOMContentLoaded", function(event) {
  init();
});

function init() {
  //RESET
  //localStorage.setItem("peopleCount", 0);
  for(var i = 0; i < localStorage.length; i++) {
    //console.log(localStorage.getItem(localStorage.key(i)));
    if(document.getElementById(localStorage.key(i)) != null) { //If saved element exists on the page
      document.getElementById(localStorage.key(i)).value = localStorage.getItem(localStorage.key(i));
    }
  }
  restorePeople();
}

function goHome() {
  document.getElementById('whiteBox').classList.add('grow');
  setTimeout("location.href='index.html';",1200);
}

function restorePeople() {
  for(var i=1; i<=parseInt(localStorage.getItem("peopleCount")); i++) {
    var checkThis = "person";
    checkThis = checkThis.concat(i);
    if(localStorage.getItem(checkThis) != null) {
      restore(i);
    }
  }
}

function save(input) {
  var parent = input.parentElement;
  var personArray =
    {name:parent.children[0].value, days:parent.children[2].value, startDate:"SD"}
  localStorage.setItem(parent.id, JSON.stringify(personArray));
  var peopleArray = [];
}


function save3(input) {
  var parent = input.parentElement;
  var num = input.id[input.id.length - 1]; //get number of person
  var personArray = {}
  peopleArray.push(parent);
  console.log(peopleArray);
  console.log("json", JSON.stringify(peopleArray));
  localStorage.setItem("peopleArray", JSON.stringify(peopleArray));
  var temp = localStorage.getItem("peopleArray");
  console.log(temp);
  peopleArray = JSON.parse(temp);
  console.log(peopleArray);
}

function add() {
  var duplicate = document.getElementById("exPerson");
  var newPerson = duplicate.cloneNode(true);
  var newCount =  parseInt(localStorage.getItem("peopleCount")) + 1;
  localStorage.setItem("peopleCount", newCount);


  var textID = "person";
  newPerson.id = textID.concat(newCount);

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
  access = JSON.parse(localStorage.getItem(newPerson.id));

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
}

var editing = false;

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
    console.log("not editing");
  }
}



function calculate(nameID) {
  //startDate = nameSD
  //days = nameDays

  var startDate = nameID.concat("SD");
  startDate = localStorage.setItem(startDate, 0);

  var time = new Date();
  time = time.getMinutes();
  var elapsed = time - localStorage.getItem(startDate);

}

function resetDays(checkbox) {
  setTimeout("document.getElementById('body').classList.remove('checked');", 800);
  if(document.getElementById("name0").value == "Christopher") {
    document.getElementById("body").classList.add("checked");
  }

  setTimeout("checkbox0.checked = false;", 800);
}
