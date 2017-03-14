document.querySelector('.folder-submit-btn').addEventListener('click', () => {
  let input = document.querySelector('.folder-input').value;
  let list = document.querySelector('.folder-list');

  list.innerHTML = list.innerHTML + `<li><button class='folder-btn'>${input}</button></li>`;

  saveFolder(input);
});

function saveFolder(input){
  let url = 'http://localhost:3000/api/folders';

  fetch(url, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      name: input,
    })
  })
  .then(response => response.json())
  .then(response => console.log(response))
}
