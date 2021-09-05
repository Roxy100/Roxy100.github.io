const loginForm = document.querySelector("#login-form");
const loginInput = document.querySelector("#login-form input");
const greeting = document.querySelector("#greeting");

const HIDDEN_CLASSNAME = "hidden";
const USERNAME_KEY = "username";

// 4. form이 submit되면 우리는 input으로부터 유저정보를 받고,
// 5. input에서 받은 user를 가진 paintGreetings를 호출하게 됨.
function onLoginSubmit(event) {
  // 1. 브라우저의 기본동작을 막는다.
  event.preventDefault();
  // 2. form에 hidden이라는 class를 추가해서 다시 form을 숨긴다.
  loginForm.classList.add(HIDDEN_CLASSNAME);
  // 3. loginInput의 값을 변수에 저장하고,
  const username = loginInput.value;
  // 3.(1) 유저 정보를 저장할 수 있게 만드는 localStorage를 만들어준다.
  localStorage.setItem(USERNAME_KEY, username);
  paintGreetings(username);
}

// 1. username을 arument로 받는 함수를 만들었다.
function paintGreetings(username) {
  greeting.innerText = `Hello ${username}`;
  greeting.classList.remove(HIDDEN_CLASSNAME);
}

const savedUsername = localStorage.getItem(USERNAME_KEY);

// 3. localStorage에 유저정보가 없을 때 form의 submit을 기다리고
// 2. localStorage에 유저정보가 있다면, 유저정보를 받아서 argument로 넣어준다.
if (savedUsername === null) {
  //show the form
  loginForm.classList.remove(HIDDEN_CLASSNAME);
  loginForm.addEventListener("submit", onLoginSubmit);
} else {
  // show the greetings
  paintGreetings(savedUsername);
}
