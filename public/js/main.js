function dropDown(x) {
    x.classList.toggle("change");
  
    document.getElementById("myDropdown").style.display =
      document.getElementById("myDropdown").style.display == "block"
        ? "none"
        : "block";
  }