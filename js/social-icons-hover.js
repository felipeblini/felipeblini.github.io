var svgColor = "#828282";

var flickr = document.querySelector(".flickr");
flickr.addEventListener("mouseover", flickrMouseOver);
flickr.addEventListener("mouseout", flickeMouseOut);

var codepen = document.querySelector(".codepen");
codepen.addEventListener("mouseover", codepenMouseOver);
codepen.addEventListener("mouseout", codepenMouseOut);

function flickrMouseOver() {
  document.querySelector("#svg--flickr .red").setAttribute("fill", "red");

  document.querySelector("#svg--flickr .blue").setAttribute("fill", "blue");
}

function flickeMouseOut() {
  document.querySelector("#svg--flickr .red").removeAttribute("fill");

  document.querySelector("#svg--flickr .blue").removeAttribute("fill");
}

function codepenMouseOver() {
  var polygons = document.querySelectorAll("#svg--codepen polygon");
  var lines = document.querySelectorAll("#svg--codepen line");
  
  [].forEach.call(polygons, function(p) {
    p.setAttribute("stroke", "black");
  });
  
  [].forEach.call(lines, function(l) {
    l.setAttribute("stroke", "black");
  });
}

function codepenMouseOut() {
  var polygons = document.querySelectorAll("#svg--codepen polygon");
  var lines = document.querySelectorAll("#svg--codepen line");
  
  [].forEach.call(polygons, function(p) {
    p.setAttribute("stroke", svgColor);
  });

  [].forEach.call(lines, function(l) {
    l.setAttribute("stroke", svgColor);
  });
}