let signInBtn = document.getElementById("signIn");
let signUpBtn = document.getElementById("signUp");
let fistForm = document.getElementById("form1");
let container = document.querySelector(".container");


fistForm.addEventListener("submit", (e) => e.preventDefault());
let btn = document.querySelector(".btn");
btn.addEventListener("click", function(){
    // alert("Hi");
    let username = document.getElementById("name").value;
    let email = document.getElementById("email-id").value;
    let pass = document.getElementById("password").value;
    if(username == 'abc' && email == 'abc@gmail.com' && pass == '123456')
    {
        window.location.href='./data/index.html';

    }
    else{
        alert("Invalid entry ! ");
        return ;
    }
});
// function func()
//     {
//     var username = document.getElemetById("name").value;
//     var email = document.getElemetById("email-Id").value;
//     var pass = document.getElemetById("password").value;
//     if(username == 'Yashi Ratnakar' && email == 'yashirt07@gmail.com' && pass == '123456')
//     {
//         alert("successfull ! ");
//         window.location.assign("neworld.html");

//     }
//     else{
//         alert("Invalid entry ! ");
//         return ;
//     }
//     }
    