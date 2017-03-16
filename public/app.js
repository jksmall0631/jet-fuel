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
  .then(response => displayFolders(response))
}
loadDb();

const displayFolders = (folderArray) => {
  let list = document.querySelector('.folder-list');
  folderArray.map(folder => {
    return list.innerHTML = list.innerHTML + `<li><button class='folder-btn' id=${folder.id}>${folder.name}</button></li>`;
  })
}

const displayUrls = (urlArray) => {
  let urlList = document.querySelector('.url-list');
  urlList.innerHTML = '';
  urlArray.map(url => {
    // console.log(url)
    return urlList.innerHTML = urlList.innerHTML + `<li><a href='http://${url.url}' target='_blank' class='url-btn'>${url.id}</a><p>${url.date}</p></li>`;
  })
}

document.querySelector('.folder-submit-btn').addEventListener('click', () => {
  let input = document.querySelector('.folder-input').value
  let list = document.querySelector('.folder-list')

  saveFolder(input)
})

document.querySelector('.folder-list').addEventListener('click', (e) => {
  folderId = e.target.id;
  // console.log(e.target);
  // console.log(folderId);
  loadUrls(e.target.id);
  // let main = document.querySelector('.main');
  // main.innerHTML = main.innerHTML + `<h2>${e.target.innerText}</h2>`
})

const loadUrls = (folderId, filter) => {
  // console.log(folderId)
  // console.log('filter', filter)
  if(folderId){
    let url = 'http://localhost:3000/api/folders/' + folderId;
    fetch(url, {
      method: 'GET',
      headers: {
        'content-type': 'application/json',
      },
    })
    .then(response => response.json())
    .then((response) => {
      if (filter == 'newest'){
        response = sortByDate(response, filter)
      }else if (filter == 'oldest'){
        response = sortByDate(response, filter)
      } else if (filter == 'popularity') {
        response = sortByPopularity(response)
      }
      displayUrls(response)
    })
  }
}

const sortByDate = (urls, filter) => {
  let sortedUrls = urls.sort((a, b) => {
    if(filter == 'newest') {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    } else {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    }
  })
  return sortedUrls;
}

document.querySelector('.url-submit-btn').addEventListener('click', () => {
  let urlInput = document.querySelector('.url-input').value;
  let list = document.querySelector('.url-list')

  saveUrl(folderId, urlInput)
  loadUrls(folderId)
})

const saveFolder = (input) => {
  let url = 'http://localhost:3000/api/folders/';

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
  .then(response => displayFolders([response]))
}

const saveUrl = (folderId, urlInput) => {
  // console.log('save')
  let input = document.querySelector('.url-input').value;
  if(folderId){
    let url = 'http://localhost:3000/api/folders/' + folderId;

    fetch(url, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        url: urlInput,
      })
    })
    .then(response => response.json())
    .then(response => console.log(response))
  }
}

document.querySelector('.newest-date-btn').addEventListener('click', (e) => {
  loadUrls(folderId, 'newest');
})

document.querySelector('.oldest-date-btn').addEventListener('click', (e) => {
  console.log('click')
  loadUrls(folderId, 'oldest');
})
