//woo

function boxClick(element) {
  var container = document.getElementById("boxMainContainer");
  container.classList.add("leave");

  var linkClass = element.className;
  var box = document.getElementById(linkClass);
  box.style.cssText = "animation-play-state: paused;";

  //delay animation until boxes are off page
  setTimeout(function(){ loadPage(linkClass);}, 300);
}

function loadPage(name) {
  console.log(name);
  var box = document.getElementById(name);
  box.classList.add("grow");
  var url = name.slice(0,-3); //remove "Box" from name
  url = url.concat(".html");
  console.log(url);
  setTimeout(`location.replace("${url}");`,1400);
}
