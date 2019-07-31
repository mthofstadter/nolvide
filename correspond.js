//correspond.js
//mthofstadter.github.io/nolvide


document.addEventListener("DOMContentLoaded", function(event) {
  init();
});

function init() {
  if(localStorage.getItem('groupHeader') != null) {
      document.getElementById('groupHeader').value = localStorage.getItem('groupHeader');
  }
}

function save(input) {
  var inputID = input.id;
  var value = input.value;
  console.log(inputID)
  localStorage.setItem(inputID, value);
  if(input.id == "days1") {
    calculate()
  }
}

function goHome() {
  document.getElementById('whiteBox').classList.add('grow');
  setTimeout("location.href='index.html';",1250);
}


function calculate(nameID) {
  //startDate = nameSD
  //days = nameDays
  var startDate = nameID.concat("SD");
  startDate = localStorage.getItem(startDate);
  console.log(startDate);

}

function resetDays(checkbox) {
  if(document.getElementById("name1").value == "Tofukima" || document.getElementById("name1").value == "tofukima" )  {
    document.getElementById("body").classList.add("checked");
    setTimeout("document.getElementById('body').classList.remove('checked');", 800);
  }
  setTimeout("checkbox.checked = false;", 800);

}
