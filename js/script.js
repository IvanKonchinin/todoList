'use strict';

const todoControl = document.querySelector('.todo-control'),
      headerInput = document.querySelector('.header-input'),
      todoList = document.querySelector('.todo-list'),
      todoCompleted = document.querySelector('.todo-completed'),
      todoRemove = document.querySelectorAll('.todo-remove');

let toDoData = [];  
toDoData = JSON.parse(localStorage.myTodoList);

const render = function() {
  todoList.textContent = '';
  todoCompleted.textContent = '';
  headerInput.value = '';

  toDoData.forEach(function(item){
    const li = document.createElement('li');
    li.classList.add('todo-item');
    li.innerHTML = '<span class="text-todo">' + item.value + '</span>' +
    '<div class="todo-buttons">' + 
      '<button class="todo-remove"></button>' +
      '<button class="todo-complete"></button>' +
    '</div';
    if(item.completed){
      todoCompleted.append(li);
    } else {
      todoList.append(li);
    }

    const btnTodoComplete = li.querySelector('.todo-complete');
    btnTodoComplete.addEventListener('click', function(){
      item.completed = !item.completed;
      render();
    });

  });
};

todoControl.addEventListener('submit', function(e){
  e.preventDefault();
  const newTodo = {
    value: headerInput.value,
    completed: false
  };
  if(headerInput.value !== ''){
    toDoData.push(newTodo);
    let toJson = JSON.stringify(toDoData);
    localStorage.myTodoList = toJson;
  }
  
  render();
});

todoList.addEventListener('click', function(e){
  let target = e.target;
  let targetText = target.closest('.todo-item').querySelector('.text-todo').textContent;
  toDoData.forEach(function(item, i){
    if (targetText === item.value && target.classList.contains('todo-remove')){
      toDoData.splice(i,1);
      render();
    }
  });
  
});


render();