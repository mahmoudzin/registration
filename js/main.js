// Get the Ements of the
var registraionComponent = document.getElementById('registraionParent');
var homeComponent = document.querySelector('#home');
var signupForm = document.querySelector('#registraion');

var userName = document.querySelector('#userName');
var email = document.querySelector('#email');
var pass = document.querySelector('#pass');

var resForm = document.querySelector('#signupInputs');
var logForm = document.querySelector('#signinInputs');

var authedName = document.querySelector('#authedName');
var logoutBtn = document.querySelector('#logout-btn')
var signinBtn = document.querySelector('#signin');
var signUpBtn = document.querySelector('#signup')
var loginForm = document.querySelector('#login');

var alert1 = document.getElementById('alert1');
var alert2 = document.getElementById('alert2');
var alert3 = document.getElementById('alert3');
var alert4 = document.getElementById('alert4');

var emailLog = document.querySelector('#emailLog');
var passLog= document.querySelector('#passLog');


var AUTHED_USER;
if(localStorage.getItem('AUTHED_USER') == null ){
    AUTHED_USER = 'null';
}else{
    AUTHED_USER = localStorage.getItem('AUTHED_USER');
}
if(AUTHED_USER == 'null'){
    registraionComponent.classList.replace('d-none', 'd-block');
    homeComponent.classList.replace('d-flex', 'd-none')
}else{
    homeComponent.classList.replace('d-none', 'd-flex');
    registraionComponent.classList.replace('d-block', 'd-none')
}
var cruntlyForm;
if (localStorage.getItem('cruntlyForm') == null){
  cruntlyForm = '0' ;
}else{
  cruntlyForm = localStorage.getItem('cruntlyForm');
}

signinBtn.addEventListener('click', function(e){
  e.preventDefault();
  loginForm.classList.replace('d-none', 'd-flex');
  signupForm.classList.replace('d-flex', 'd-none');
  localStorage.setItem('cruntlyForm', '1');
})
signUpBtn.addEventListener('click', function(e){
  e.preventDefault()
  signupForm.classList.replace('d-none', 'd-flex');
  loginForm.classList.replace('d-flex', 'd-none');
  localStorage.setItem('cruntlyForm', '0');
})
if(cruntlyForm == '0'){
  signupForm.classList.replace('d-none', 'd-flex');
  loginForm.classList.replace('d-flex', 'd-none');
}else{
  loginForm.classList.replace('d-none', 'd-flex');
  signupForm.classList.replace('d-flex', 'd-none');
}
function checkEmail(email){
    for(var i = 0; i < users.length; i++){
        if(users[i].userEmail === email){
            return false;
        }
    }
    return true;
}

function errName(msg, hide = false){
    if(hide){
      alert1.innerHTML = ''
    }else{
      alert1.innerHTML = `<div class="alert alert-danger" role="alert">${msg}<div>`
    }
  }
  function errUrl(msg, hide = false){
    if(hide){
      alert2.innerHTML = ''
    }else{
      alert2.innerHTML = `<div class="alert alert-danger" role="alert">${msg}<div>`
    }
  }
  function errPass(msg, hide = false){
    if(hide){
      alert3.innerHTML = ''
    }else{
      alert3.innerHTML = `<div class="alert alert-danger" role="alert">${msg}<div>`
    }
  }
  function errForm(msg, hide = false){
    if(hide){
      alert4.innerHTML = ''
    }else{
      alert4.innerHTML = `<div class="alert alert-danger" role="alert">${msg}<div>`
    }
  }
  logoutBtn.addEventListener("click", function(e){
    localStorage.setItem('AUTHED_USER', 'null')
    homeComponent.classList.replace('d-flex', 'd-none')
    registraionComponent.classList.replace('d-none', 'd-block');
  })

  userName.addEventListener('input', function(e){
    vilidateName();
    if(userName.value == ''){
      errName('', true);
      userName.classList.remove('is-invalid');
    }
    else if(userName.value.length < 4){
      errName('The username should be 4 at less or more')
    }else if(userName.value.length > 29){
      errName('The username can\'t be more than 30 characters')
    }else{
      errName('', true);
    }
   
  })
  email.addEventListener('input', function(e){
    vilidateUrl();
    if(email.value == ''){
      email.classList.remove('is-invalid');
      errUrl('', true)
    }else if(!vilidateUrl()){
      errUrl('Please Entr Correct email');
    }
    else{
      errUrl('', true);
    }
  })
  pass.addEventListener('input', function(e){
    if(pass.value == ''){
      pass.classList.remove('is-invalid');
      
      errPass('', true)
    }else if(pass.value.length < 7){
        pass.classList.add('is-invalid');
      errPass('Your password must be at least 8 characters');
    }
    else{
        pass.classList.replace('is-invalid', 'is-valid');
      errPass('', true);
    }
  })
var users;
if (localStorage.getItem('users') == null){
  users = [];
}else{
  users = JSON.parse(localStorage.getItem('users'));
}
userObject = users.filter(user => user.userEmail === AUTHED_USER)[0];
if(userObject != undefined){
  authedName.innerHTML = 'Hello, ' + userObject.username;
}



resForm.addEventListener('submit', function(e){
    e.preventDefault();
    signUp();
    
})
logForm.addEventListener('submit', function(e){
  e.preventDefault();
  login();
})
function login(){
  var email =  emailLog.value;
  var pass = passLog.value;
  if (email == '' || pass == ''){
    errForm('Email and password are required');
  }else{
    if(users.length != 0){

      for(var i = 0; i < users.length; i++){
    if(email === users[i].userEmail && pass === users[i].userPass){
      authedName.innerHTML = 'Hallo, ' + users[i].username;
      registraionComponent.classList.replace('d-block', 'd-none')
      homeComponent.classList.replace('d-none', 'd-flex');
      localStorage.setItem('AUTHED_USER',  users[i].userEmail)
      emailLog.value = '';
      passLog.value = '';
      errForm('', true);
    }else{
      errForm('incorrect email or password');
    }
    }
    
  }else{
    errForm('incorrect email or password');
  }
  }
  
}

function signUp(){
    
    if(vilidateName() && vilidateUrl()){
        
        if(userName.value === ""){
          errName('Name is required');
        }else if(email.value === ""){
          errUrl('Email is required');
        }else if(pass.value === ""){
            errPass('Password is required');
        }
        else{
            
          errName('', true);
          errUrl('', true);
          errPass('', true);
          var user = {
            username: userName.value,
            userEmail: email.value,
            userPass: pass.value
        }
        if(checkEmail(user.userEmail)){
            users.push(user);
            localStorage.setItem('users', JSON.stringify(users));
            localStorage.setItem('AUTHED_USER', user.userEmail);
            authedName.innerHTML = 'Hallo, ' + user.username;
            registraionComponent.classList.replace('d-block', 'd-none')
            homeComponent.classList.replace('d-none', 'd-flex');
            clear();
        }else{
            errUrl('this emmail already exsists');
        }
        }
    }
}
function clear(){
    userName.value = '';
    email.value = '';
    pass.value = '';

    userName.classList.remove('is-valid');
    email.classList.remove('is-valid');
    pass.classList.remove('is-valid');
}
/*Validation*/ 
function vilidateName(){
  var regExp = /^[\w\s]{4,30}$/
  if(regExp.test(userName.value)){
    userName.classList.replace('is-invalid', 'is-valid');
    return true
  }else{
    userName.classList.add('is-invalid');
    return false
  }
}
function vilidateUrl(){

  var regExp = /^[\w_]+@[A-Za-z]{3,5}\.[A-Za-z]{3,5}$/
  if(regExp.test(email.value)){
    email.classList.replace('is-invalid', 'is-valid');
        return true
    }else{
        email.classList.add('is-invalid');
        return false
    }
}


