let folderId;

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
    return list.innerHTML = list.innerHTML + `<li><button class='folder-btn' id=${folder.id}>${folder.name}</button></li>`;
  })
}

const displayUrls = (urlArray, folderId) => {
  console.log(folderId)
  let main = document.querySelector('.main');
  urlArray.map(url => {
    return main.innerHTML = main.innerHTML + `<li><a href='#' class='url-btn'>${url.name}</a></li>`;
  })
  console.log(urlArray);
}

document.querySelector('.folder-submit-btn').addEventListener('click', () => {
  let input = document.querySelector('.folder-input').value;
  let list = document.querySelector('.folder-list');

  list.innerHTML = list.innerHTML + `<li><button class='folder-btn'>${input}</button></li>`;

  saveFolder(input);
});

document.querySelector('.folder-list').addEventListener('click', (e) => {
  folderId = e.target.id;
  loadUrls(e.target.id);
  let main = document.querySelector('.main');
  main.innerHTML = main.innerHTML + `<h2>${e.target.innerText}</h2>`
})

const loadUrls = (folderId) => {
  let url = 'http://localhost:3000/api/folders/' + folderId;
  fetch(url, {
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
  })
  .then(response => response.json())
  .then(response => displayUrls(response, folderId));
}

document.querySelector('.url-submit-btn').addEventListener('click', () => {
  console.log('bla');
  let urlInput = document.querySelector('.url-input').value;
  let list = document.querySelector('.url-list');

  list.innerHTML = list.innerHTML + `<li><button class='url-btn'>${urlInput}</button></li>`;

  saveUrl(folderId, urlInput);
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

const saveUrl = (folderId, urlInput) => {
  let input = document.querySelector('.url-input').value;
  if(folderId){
    let url = 'http://localhost:3000/api/folders' + folderId;

    fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        url: url,
      })
    })
    .then(response => response.json())
    .then(response => console.log(response))
  }
}
