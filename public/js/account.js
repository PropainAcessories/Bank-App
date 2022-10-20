const createAccount = async (event) => {
    event.preventDefault();

    const account_type = document.querySelector('#account-type').value.trim();
    const balance = document.querySelector('#initial-deposit').value.trim();
    const pin = document.querySelector('#pin').value.trim();

    if (!account_type || !pin || !balance) {
        alert('Fields Empty');
    }

    if (pin.length > 4 || pin.length <= 3) {
        alert('Pin must be 4 numbers');
        return;
    }

    const response = await fetch('/api/account/', {
        method: 'POST',
        body: JSON.stringify({
            account_type,
            balance,
            pin
        }),
        headers: { 'Content-Type': 'application/json' }
    });

    if(response.ok) {
        document.location.replace('/account');
    } else {
        alert(response.statusText);
    }
};

document.querySelector('.signup-form').addEventListener('submit', createAccount);

function getInitial() {
    var assetsArray = [];
    var firstDeposit = document.getElementById("initial-deposit").value;
    if (localStorage.getItem("totalAssets") == null) {
        localStorage.setItem("totalAssets", "[]");
    }
    var assetsArray = JSON.parse(localStorage.getItem("totalAssets"));
    assetsArray.push(firstDeposit);
    localStorage.setItem("totalAssets", JSON.stringify(assetsArray))
}
document.querySelector('.signup-form').addEventListener('submit', getInitial);
// function for input animation
$(function(){
    $('.inputBox input').on('focus', function(){
      $(this).parents('.parents-elm').addClass('foucs-content'); 
    });
    $(document).mouseup(function(e){
          if($(e.target).parents('.inputBox input').length==0 && !$(e.target).is('.inputBox input')){
              $('.parents-elm').removeClass('foucs-content');
          }
      });
  });
