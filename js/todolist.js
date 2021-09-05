const toDoForm = document.getElementById("todo-form");
const toDoInput = document.querySelector(" #todo-form input");
const toDoList = document.getElementById("todo-list");

const TODOS_KEY = "todos";

// newTodo가 행해질 때마다 그 텍스를 toDos array에 push하고 싶어진다.
// toDos 는 항상 빈 array로 시작한다.
// 이전 newTodo 와 계속 추가되는 newTodo를 유지하고 싶기 때문에 const => let
// 데이터베이스에 ToDo내용을 추가하는 곳.
let toDos = [];

//toDos array의 내용을 localStorage에 넣는 함수.
// JSON.stringify === toDos를 string으로 바꾸는 형태.
function saveToDos() {
  localStorage.setItem(TODOS_KEY, JSON.stringify(toDos));
}

//X라는 이모지 클릭했을 때 li 사라지기
function deleteToDo(event) {
  // target은 클릭된 HTML element이다. target === button
  // parentElemnent 는 클릭된 element의 부모이다.
  // 우리가 삭제하고 싶은 li이다.
  const li = event.target.parentElement;
  li.remove();
  // 클릭했던 li의 id를 갖고 있는 toDo를 지우고 싶다.
  // toDo의 id가 li의 id와 다른 걸로 남기고 싶다.
  // li.id == string타입 / toDo.id == number타입
  // 그래서 parseInt 이용해서 문자열로 바꿔준다.
  // toDos DB에서 todo를 지운 뒤에
  toDos = toDos.filter((toDo) => toDo.id !== parseInt(li.id));
  // saveToDos를 한 번 더 부른다.
  saveToDos();
}

// handleToDoSubmit에서 호출한 submit이벤트의 결과를 보여주는 함수.
// paintToDo는 text를 받았던 함수였다.
// 이제는 object로 받아야 하는 상태.
function paintToDo(newTodo) {
  const li = document.createElement("li");
  // id로 각각의 item을 구별하고 싶다.
  li.id = newTodo.id;
  const span = document.createElement("span");
  // span의 텍스트는 handleToDoSubmit에서 온 newTodo 텍스트가 되는 것이다. / 텍스트를 span내부에 넣다.
  // text로 받았던 걸 object로 받아야 하기 때문에 newTodo.text로 고친다.
  span.innerText = newTodo.text;
  // Text추가할 때 삭제하는 button 만들기
  const button = document.createElement("button");
  // button텍스트를 X이모지로 대체하기
  button.innerText = "❌";
  // button클릭할 때 eventlistener주기
  button.addEventListener("click", deleteToDo);
  // span, button을 li의 자식으로 넣고 싶은 코드
  li.appendChild(span);
  li.appendChild(button);
  // 새로운 li를 toDoList에 추가한다.
  toDoList.appendChild(li);
}

function handleToDoSubmit(event) {
  event.preventDefault();
  // newTodo === input의 value를 비우기 전의 값을 나타내는 string이다.
  const newTodo = toDoInput.value;
  // input을 비우고,
  toDoInput.value = "";
  // text 대신 object를 push한다.
  const newTodoObj = {
    text: newTodo,
    id: Date.now(),
  };
  // toDos array를 가지고 와서 newTodo를 toDos array에 push하는 것.
  // 데이터베이스로 매번 사용자가 적어둔 text를 push한다.
  // toDos 배열에 newTodoObj추가하게 된다.
  toDos.push(newTodoObj);
  // 화면에 toDo를 나타내주고,
  // paintToDo에는 text 대신 object로 변하고 싶어 newTodoObj추가하게 된다.
  paintToDo(newTodoObj);
  // toDo들을 저장하기
  saveToDos();
}

// 사용자가 form을 submit하면,
toDoForm.addEventListener("submit", handleToDoSubmit);

// toDos Loading하기
const savedToDos = localStorage.getItem(TODOS_KEY);
if (savedToDos !== null) {
  // localStorage에서 온 string이 살아있는 JavaScript object로 변하게 하는 것.
  // JSON.parse === toDos 살아있는 array가 된 형태.
  const parsedToDos = JSON.parse(savedToDos);
  // toDos에 parsedToDos를 넣어서 전에 있던 toDo들을 복원할 것임. 이전의 toDos 사라지기 않기 위해.
  toDos = parsedToDos;
  // forEach는 array의 각 item에 대해 function을 실행하게 해주는 역할.
  // item을 화면에 그려주고 싶다.
  // forEach함수는 이 paintToDo를 parsedToDos 배열의 요소마다 실행한다.
  parsedToDos.forEach(paintToDo);
}
