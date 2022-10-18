const loginHandler = async (event) => {
    event.preventDefault();

    const email = document.querySelector('#email-login').value.trim();
    const password = document.querySelector('#password-login').value.trim();

    if (!email || !password) {
        alert("Fields empty.");
        return
    }

    if (password.length < 10) {
        alert("Password must be 10 characters");
        return;
    }

    const response = await fetch('/api/user/login', {
        method: 'POST',
        body: JSON.stringify({
            email,
            password
        }),
        headers: { 'Content-Type': 'application/json' },
    });

    if (response.ok) {
        document.location.replace('/');
    } else {
        alert(response.statusText);
    }
};

// Function for input animation
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
document.querySelector('.login-form').addEventListener('submit', loginHandler);
