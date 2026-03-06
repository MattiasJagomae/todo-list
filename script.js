const addBtn = document.querySelector('#addBtn');
const itemInput = document.querySelector('#itemInput');
const itemList = document.querySelector('#itemList');

addBtn.addEventListener('click', function() {
  const inputValue = itemInput.value;
  const newItem = document.createElement('div');
  newItem.textContent = inputValue;
  newItem.classList.add('item');
  itemList.appendChild(newItem);
  itemInput.value = '';
});