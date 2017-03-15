const loadDb = () => {
  let url = 'http://localhost:3000/api/folders';

  fetch(url, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  })
  .then(response => response.json())
  .then(response => displayFolders(response));
}
loadDb();

const displayFolders = (folderArray) => {
  let list = document.querySelector('.folder-list');
  folderArray.map(folder => {
    return list.innerHTML = list.innerHTML + `<li><button class='folder-btn'>${folder.name}</button></li>`;
  })
}

document.querySelector('.folder-submit-btn').addEventListener('click', () => {
  let input = document.querySelector('.folder-input').value;
  let list = document.querySelector('.folder-list');

  list.innerHTML = list.innerHTML + `<li><button class='folder-btn'>${input}</button></li>`;

  saveFolder(input);
});

document.querySelector('.folder-list').addEventListener('click', (e) => {
  loadUrls(e.target.innerText);
  let main = document.querySelector('.main');

  main.innerHTML = main.innerHTML + `<h2>${e.target.innerText}</h2>`
})

const loadUrls = (urlName) => {
  let url = 'http://localhost:3000/api/folders/' + urlName;
  console.log(url);
  fetch(url, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  })
  .then(response => response.json())
  .then(response => console.log(response));
}

document.querySelector('.url-submit-btn').addEventListener('click', () => {
  let input = document.querySelector('.url-input').value;
  let list = document.querySelector('.url-list');

  list.innerHTML = list.innerHTML + `<li><button class='url-btn'>${input}</button></li>`;

  saveUrl(input);
});

const saveFolder = (input) => {
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

const saveUrl = (input) => {
  console.log(input);
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
