//correspond.js
//mthofstadter.github.io/nolvide

var editing = false;

document.addEventListener("DOMContentLoaded", function(event) {
  init();
});

function init() {
  //RESET
  // localStorage.clear();
  if(localStorage.getItem("groupsArray") == null) { //on first visit
    let groupsArray = [[]];
    let groupsNames = [""];
    localStorage.setItem("groupsArray", JSON.stringify(groupsArray));
    localStorage.setItem("groupsNames", JSON.stringify(groupsNames));
  }
  restoreLoop();
}

function goHome() {
  document.getElementById('whiteBox').classList.add('grow');
  setTimeout("location.href='index.html';",1200);
}

function restoreLoop() {
  let groupsArray = accessGroups();
  let groupsNames = accessNames();
  for(let groupNum=0; groupNum<groupsArray.length; groupNum++) {
    restoreEmptyGroup(groupNum);
    document.getElementById("groupHeader-"+groupNum).value = groupsNames[groupNum];
    for(let personNum=0; personNum<groupsArray[groupNum].length; personNum++) {
      restore(groupNum, personNum);
    }
  }

}

function accessGroups() {
  return JSON.parse(localStorage.getItem("groupsArray"));
}

function accessNames() {
  return JSON.parse(localStorage.getItem("groupsNames"));
}

function restore(groupNum, personNum) {
  let duplicate = document.getElementById("exPerson"); //exPerson = example to clone
  let newPerson = duplicate.cloneNode(true);

  newPerson.id = "person-" + groupNum + "-" + personNum;

  let groupsArray = accessGroups();
  let personArray = groupsArray[groupNum][personNum];

  newPerson.children[0].id = "name-" + groupNum + "-" + personNum;
  newPerson.children[0].value = personArray["name"];

  newPerson.children[1].id = "timer-" + groupNum + "-" + personNum;

  newPerson.children[2].id = "days-" + groupNum + "-" + personNum;
  newPerson.children[2].value = personArray["days"];

  newPerson.children[4].id = "checkbox-" + groupNum + "-" + personNum;

  document.getElementById("people-" + groupNum).appendChild(newPerson);
  calculate(groupNum, personNum);
}

function restoreEmptyGroup(groupNum) {
  let duplicate = document.getElementById("group-");
  let newGroup = duplicate.cloneNode(true);
  let newGroupChildren = newGroup.getElementsByTagName("*");

  newGroup.id += groupNum;
  for(let i=0; i<newGroupChildren.length; i++) {
    newGroupChildren[i].id += groupNum;
  }
  document.getElementById("container").appendChild(newGroup);
}

function save(input) {
  let groupNum = input.id.split('-')[1];
  let personNum = input.id.split('-')[2];
  let groupsArray = accessGroups();
  let personArray = groupsArray[groupNum][personNum];

  let inputID = input.id.split('-')[0];
  personArray[inputID] = input.value;
  groupsArray[groupNum][personNum] = personArray;
  localStorage.setItem("groupsArray", JSON.stringify(groupsArray));
  calculate(groupNum, personNum);
}

function saveGroupName(input) {
  let groupNum = input.id.split('-').pop();
  let groupsNames = accessNames();
  groupsNames[groupNum] = input.value;
  localStorage.setItem("groupsNames", JSON.stringify(groupsNames));
  
}


function addPerson(group) {
  group = group.parentElement;
  let duplicate = document.getElementById("exPerson"); //exPerson = example to clone
  let newPerson = duplicate.cloneNode(true);
  let groupsArray =  JSON.parse(localStorage.getItem("groupsArray"));
  let groupNum = group.id.split('-').pop();
  let personNum = groupsArray[groupNum].length;

  let textID = "person-";
  newPerson.id = textID.concat(personNum);

  let emptyArray = {name:"", days:"", startDate:new Date()}
  groupsArray[groupNum].push(emptyArray);
  localStorage.setItem("groupsArray", JSON.stringify(groupsArray));

  newPerson.children[0].id = "name-" + groupNum + "-" + personNum;
  newPerson.children[1].id = "timer-" + groupNum + "-" + personNum;
  newPerson.children[2].id = "days-" + groupNum + "-" + personNum;
  newPerson.children[4].id = "checkbox-" + groupNum + "-" + personNum;

  document.getElementById("people-"+groupNum).appendChild(newPerson);
}

function addGroup() {
  let groupsArray = accessGroups();
  let groupsNames = accessNames();
  let groupNum = groupsArray.length;
  groupsArray.push([]);
  groupsNames.push("");
  localStorage.setItem("groupsArray",JSON.stringify(groupsArray));
  localStorage.setItem("groupsNames",JSON.stringify(groupsNames));

  let duplicate = document.getElementById("group-");
  let newGroup = duplicate.cloneNode(true);
  let newGroupChildren = newGroup.getElementsByTagName("*");

  newGroup.id += groupNum;
  for(let i=0; i<newGroupChildren.length; i++) {
    console.log("hello" + i);
    newGroupChildren[i].id += groupNum;
  }
  document.getElementById("container").appendChild(newGroup);

}

function edit(editButton) {
  let groupNum = editButton.id.split('-').pop();
  let groupsArray = accessGroups();

  if(editing == false) {
    document.getElementById("people-"+groupNum).classList.add("editMode");
    editing = true;
    for(let i=0; i<=groupsArray[groupNum].length; i++) {
      let timer = document.getElementById("timer-"+groupNum+"-"+i);
      if(timer != null) {
        timer.innerHTML = "";
        editDate(timer);
      }
    }
  }
  else {
    document.getElementById("people-"+groupNum).classList.remove("editMode");
    editing = false;
    for(let i=0; i<=groupsArray[groupNum].length; i++) {
      let timer = document.getElementById("timer-".concat(i));
      if(timer != null) {
        timer.removeChild(timer.firstChild);
      }
    }
  }
}

function checkMe(element) {
  if(editing == true) { //in edit mode = delete
    removePerson(element);
    return;
  }
  let groupNum = element.parentElement.parentElement.id.split('-').pop();
  let personNum = element.id.split('-').pop();
  let groupsArray = accessGroups();

  groupsArray[groupNum][personNum]["startDate"] = new Date();
  localStorage.setItem("groupsArray", JSON.stringify(groupsArray));
  calculate(groupNum, personNum);
  element.parentElement.children[1].classList.add("drain");
  element.classList.add("checkAnimate");
  setTimeout(`document.getElementById("${element.id}").checked = false;`, 500);
  setTimeout(`document.getElementById("${element.id}").classList.remove("checkAnimate");`, 1000);

}

function removePerson(element) {  
  let groupNum = element.id.split('-')[1];
  let personNum = element.id.split('-').pop();
  let groupsArray = accessGroups();
  groupsArray[groupNum].splice(personNum,1); //removes person from array
  localStorage.setItem("groupsArray", JSON.stringify(groupsArray));
  element.parentElement.remove();
}

function calculate(groupNum, personNum) {
  let groupsArray = accessGroups();
  let personArray = groupsArray[groupNum][personNum];
  let elapsed = getElapsed(groupNum, personNum);

  let percent = Math.round(elapsed / parseInt(personArray["days"]) * 100);
  let timer = document.getElementById("timer-"+groupNum + "-" + personNum);
  let inverse = 100 - percent;
  if(percent > inverse) {
    timer.style.cssText =
      `background: linear-gradient(to left, #eeeeee ${percent}%, #17a772 ${inverse}%)`;
  }
  else {
    timer.style.cssText =
      `background: linear-gradient(to right, #17a772 ${inverse}%, #eeeeee ${percent}%)`;
  }

  if(percent >= 100) {
    timer.classList.add("empty");
  }
  else {
    timer.classList.remove("empty");
  }
}

function getElapsed(groupNum, personNum) {
  var currentDate = new Date();
  let groupsArray = accessGroups();
  let personArray = groupsArray[groupNum][personNum];
  var startDate = Date.parse(personArray["startDate"]);
  var secs = Math.abs(currentDate - startDate) / 1000;
  return Math.round(secs / 86400);
}

function showDate(timer) {
  let groupNum = timer.parentElement.parentElement.id.split('-').pop();
  let personNum = timer.id.split('-').pop();
  if(editing) {
    return;
  }
  let elapsed = getElapsed(groupNum, personNum);
  if(elapsed == 0) {
    timer.innerHTML = "Today";
  } else if(elapsed == 1) {
    timer.innerHTML = elapsed + " day ago";
  } else {
    timer.innerHTML = elapsed + " days ago";
  }
  timer.classList.add("showDate");
  setTimeout(`document.getElementById("${timer.id}").classList.remove("showDate");`, 2000);
}

function editDate(timer) {
  let groupsArray = accessGroups();
  let groupNum = timer.parentElement.parentElement.id.split('-').pop();
  let personNum = timer.id.split('-').pop();

  const datePicker = document.createElement("input");
  datePicker.id = "date" + timer.id.split('-').pop();
  datePicker.classList.add("date");
  datePicker.type = "date";
  datePicker.setAttribute("onchange", "saveNewDate(this)");
  datePicker.value = groupsArray[groupNum][personNum]["startDate"].split('T')[0];
  timer.appendChild(datePicker);
}

function saveNewDate(datePicker) {
  let groupsArray = accessGroups();
  let groupNum = datePicker.parentElement.parentElement.parentElement.id.split('-').pop();
  let personNum = datePicker.parentElement.id.split('-').pop();
  groupsArray[groupNum][personNum]["startDate"] = new Date(datePicker.value);
  localStorage.setItem("groupsArray", JSON.stringify(groupsArray));
  calculate(groupNum, personNum);
}

  //var currentDate = new Date("Aug 22, 2022 15:00:00")

  function testA() {
    // let groupsArray = accessGroups();
    // groupsArray.splice(1,3);
    // localStorage.setItem("groupsArray", JSON.stringify(groupsArray));
    console.log(accessGroups());
  }
