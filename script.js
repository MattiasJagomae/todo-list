const addBtn = document.querySelector('#addBtn');
const itemInput = document.querySelector('#itemInput');
const itemList = document.querySelector('#itemList');

addBtn.addEventListener('click', function() {
  const inputValue = itemInput.value;
  if (inputValue.trim() === '') return;

  const newItem = document.createElement('div');
  newItem.classList.add('item');

  const text = document.createElement('span');
  text.textContent = inputValue;

  const delBtn = document.createElement('button');
  delBtn.textContent = "Delete";
  
  delBtn.onclick = function() {
    newItem.remove();
  };
  newItem.appendChild(text);
  newItem.appendChild(delBtn);
  itemList.appendChild(newItem);
  itemInput.value = '';
});
const url = 'tinkr.tech/sdb/https://tinkr.tech/sdb/mattias_todo/mattias_todo//todo_data';

async function showTodos() {
  const res = await fetch(url);
  const data = await res.json();
  const list = document.querySelector('#todo-list');
  list.innerHTML = "";

  data.forEach(todo => {
    const li = document.createElement('li');
    li.textContent = todo.text;
    li.onclick = () => li.classList.toggle('completed');

    const del = document.createElement('button');
    del.textContent = "Delete";
    del.onclick = async (e) => {
      e.stopPropagation();
      await fetch(url + todo.id, { method: "DELETE" });
      li.remove();
    };

    li.appendChild(del);
    list.appendChild(li);
  });
}

document.querySelector('#add-btn').onclick = async () => {
  const input = document.querySelector('#todo-input');
  if (input.value == "") return;

  await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ text: input.value })
  });

  input.value = "";
  showTodos();
};

showTodos();