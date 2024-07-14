let userName ;
let userEmail;
let userPass;
let rePassword;
let userPhone;
let userAge;

let nameRegex;
let emailRegex;
let passRegex;
let PhoneRegex;
let ageRegex ;

$('#nameInput').on('input',function(){
    validUserName();
    userName = $('#nameInput').val();
    if(!userName.match(nameRegex)){
        $('#nameAlert').removeClass('d-none')
        $('#nameAlert').addClass('d-block')
    }else{
        $('#nameAlert').addClass('d-none')
        $('#nameAlert').removeClass('d-block')        
    }
    allIsValid();
    console.log(userName);


})
$('#emailInput').on('input',function(){
    validEmail();
    userEmail = $('#emailInput').val();
    if(!userEmail.match(emailRegex)){
        $('#emailAlert').removeClass('hidden')
        $('#emailAlert').addClass('d-block')
    }else{
        $('#emailAlert').addClass('hidden')
        $('#emailAlert').removeClass('d-block')
    }
    allIsValid()
    console.log(userEmail);

})
$('#phoneInput').on('input',function(){
    validPhoneNumber();
    userPhone = $('#phoneInput').val();
    if(!userPhone.match(PhoneRegex)){
        $('#phoneAlert').removeClass('hidden')
        $('#phoneAlert').addClass('d-block')
    }else{
        $('#phoneAlert').addClass('hidden')
        $('#phoneAlert').removeClass('d-block')
    }
    allIsValid()
    console.log(userPhone);

   

})
$('#ageInput').on('input',function(){
    validAge();
    userAge = $('#ageInput').val();
    if(!userAge.match(ageRegex)){
        $('#ageAlert').removeClass('hidden')
        $('#ageAlert').addClass('d-block')
    }else{
        $('#ageAlert').addClass('hidden')
        $('#ageAlert').removeClass('d-block')
    }
    allIsValid()
    console.log(userAge);


    

})
$('#passwordInput').on('input',function(){
    validPassword();
    userPass = $('#passwordInput').val();
    if(!userPass.match(passRegex)){
        $('#passwordAlert').removeClass('hidden')
        $('#passwordAlert').addClass('d-block')
    }else{
        $('#passwordAlert').addClass('hidden')
        $('#passwordAlert').removeClass('d-block')
    }
    allIsValid()
    console.log(userPass);



})
$('#repasswordInput').on('input',function(){
    rePassword = $('#repasswordInput').val();
    if(rePassword !=   userPass ){
        $('#repasswordAlert').removeClass('hidden')
        $('#repasswordAlert').addClass('d-block')
    }else{
        $('#repasswordAlert').addClass('hidden')
        $('#repasswordAlert').removeClass('d-block')
    }
    allIsValid()
    console.log(rePassword);

    
})

function allIsValid() {
    if(validUserName() &&
       validEmail() &&
       validPhoneNumber() &&
       validAge() &&
       validPassword() &&
       validRePass() )
    {
        $('button').addClass('btn-enable')
    }else{
        $('button').addClass('btn-disabled')
    }
};


function validUserName(){
     nameRegex = /^[a-zA-Z ]{3,}$/;
    userName = $('#nameInput').val();
     return (userName.match(nameRegex))
    
}
function validEmail(){
    emailRegex = /^[a-zA-Z0-9]{3,10}\@[a-z]{4,}\.[a-z]{3,}$/gm;
   userEmail = $('#emailInput').val();
    return (userEmail.match(emailRegex))

}
function validPassword(){
   passRegex = /^(?=.*\d)(?=.*[a-z])[0-9a-zA-Z]{8,}$/
  userPass = $('#passwordInput').val();
   return (userPass.match(passRegex))

}
function validRePass(){
    rePassword = $('#repasswordInput').val();
   return (rePassword == userPass)
}
function validPhoneNumber(){
    PhoneRegex = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/
   userPhone = $('#phoneInput').val();
   return (userPhone.match(PhoneRegex))
   
}

function validAge(){
    ageRegex = /^(1[2-9]|[2-9]\d)$/;
    userAge = $('#ageInput').val();
   return (userAge.match(ageRegex))
}