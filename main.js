//main.js
//mthofstadter.github.io/nolivde

function hello() {
  //this will be a welcome screen for first time
}


function boxClick(element) {
  var linkClass = element.className;
  var box = document.getElementById(linkClass);
  box.classList.add("grow");
  var url = linkClass.slice(0,-3); //remove "Box" from name
  url = url.concat(".html"); //add ".html" to name
  setTimeout(`location.replace("${url}");`,1400);
}
