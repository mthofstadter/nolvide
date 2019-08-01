//correspond.js
//mthofstadter.github.io/nolvide

var peopleArray = [];

document.addEventListener("DOMContentLoaded", function(event) {
  init();
});

function init() {
  //RESET
  localStorage.setItem("peopleCount", 0);
  if(localStorage.getItem("peopleArray") == null) {
    localStorage.setItem("peopleArray", peopleArray);
  }
  for(var i = 0; i < localStorage.length; i++) {
    //console.log(localStorage.getItem(localStorage.key(i)));
    if(document.getElementById(localStorage.key(i)) != null) { //If saved element exists on the page
      document.getElementById(localStorage.key(i)).value = localStorage.getItem(localStorage.key(i));
    }
  }
}

function save(input) {
  var inputID = input.id;
  var value = input.value;
  localStorage.setItem(inputID, value);
}

function save2(input) {
  var parent = input.parentElement;
  var num = input.id[input.id.length - 1]; //get number of person
  if(localStorage.getItem(input.id) == null) {
    peopleArray.push([parent.children[0].value, parent.children[1].value, "date"]);
  }
  console.log(peopleArray[0][0]);

}

function add() {
  var duplicate = document.getElementById("person0"); //always will have at least one
  var newPerson = duplicate.cloneNode(true);
  var newCount =  parseInt(localStorage.getItem("peopleCount")) + 1;
  localStorage.setItem("peopleCount", newCount);

  var textID = "person";
  newPerson.children[0].value = "";
  newPerson.children[0].id = textID.concat(newCount);

  textID = "timer";
  newPerson.children[1].value = "";
  newPerson.children[1].id = textID.concat(newCount);

  textID = "days";
  newPerson.children[2].value = "";
  newPerson.children[2].id = textID.concat(newCount);

  textID = "checkbox";
  newPerson.children[4].value = "";
  newPerson.children[4].id = textID.concat(newCount);

  document.getElementById("people").appendChild(newPerson);
}

function goHome() {
  document.getElementById('whiteBox').classList.add('grow');
  setTimeout("location.href='index.html';",1200);
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
