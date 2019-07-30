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
}

function goHome() {
  document.getElementById('whiteBox').classList.add('grow');
  setTimeout("location.href='index.html';",1250);
}
