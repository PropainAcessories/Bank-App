//function for dropdown menu I think it will be on all javascript pages ig but im leaving it here for now currently The list is open by default so I have to figure out how to change that
function dropDown(x) {
  x.classList.toggle("change");

  document.getElementById("myDropdown").style.display =
    document.getElementById("myDropdown").style.display == "block"
      ? "none"
      : "block";
}

