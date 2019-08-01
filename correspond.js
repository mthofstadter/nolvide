//correspond.js
//mthofstadter.github.io/nolvide


document.addEventListener("DOMContentLoaded", function(event) {
  init();
});

function init() {
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

function goHome() {
  document.getElementById('whiteBox').classList.add('grow');
  setTimeout("location.href='index.html';",600);
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

  setTimeout("checkbox.checked = false;", 800);
}

function example() {
  var c = document.getElementById("namesContainer").children;
  c[0].value = "hello";
  c[2].value = "123";
}
