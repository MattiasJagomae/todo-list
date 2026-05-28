const url = 'https://tinkr.tech/sdb/mattiastodo/projekt2';

const addBtn = document.querySelector('#addBtn');
const itemInput = document.querySelector('#itemInput');
const itemList = document.querySelector('#itemList');

addBtn.addEventListener('click', addItem);

async function addItem() {
  const inputValue = itemInput.value;

  if (inputValue.trim() === '') return;

  await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ text: inputValue })
  });

  itemInput.value = '';
  showTodos();
}

async function showTodos() {
  const res = await fetch(url);
  const data = await res.json();

  const list = document.querySelector('#itemList');
  list.innerHTML = '';

  const items = Array.isArray(data) ? data : Object.values(data);

  items.forEach(todo => {

    const li = document.createElement('li');
    li.textContent = todo.text;

    li.onclick = () => li.classList.toggle('completed');

    const del = document.createElement('button');
    del.textContent = 'Delete';

    del.onclick = async (e) => {
      e.stopPropagation();

      await fetch(url + '/' + todo.id, {
        method: 'DELETE'
      });

      showTodos();
    };

    li.appendChild(del);
    list.appendChild(li);
  });
}
showTodos();

