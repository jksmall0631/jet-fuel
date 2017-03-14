document.querySelector('.folder-submit-btn').addEventListener('click', () => {
  let input = document.querySelector('.folder-input').value;
  let list = document.querySelector('.folder-list');

  list.innerHTML = list.innerHTML + `<li><button class='folder-btn'>${input}</button></li>`;

  
});
