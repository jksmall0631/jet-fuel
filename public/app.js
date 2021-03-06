let folderId;

const loadDb = () => {
  let url = '/api/folders';

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
  list.innerHTML = '';
  folderArray.map(folder => {
    return list.innerHTML = list.innerHTML + `<li><button class='folder-btn' id=${folder.id}>${folder.name}</button></li>`;
  })
}

const displayUrls = (urlArray) => {
  let urlList = document.querySelector('.url-list');
  urlList.innerHTML = '';
  if(urlArray.length){
    urlArray.map(url => {
    return urlList.innerHTML = urlList.innerHTML + `<li><a href='http://${url.url}' id=${url.folder_id} folderId=${url.folder_id} target='_blank' class='url-btn'>${url.id}</a><p>${url.date}</p><p>${url.clicks}</p></li>`;
    })
  }
}

document.querySelector('.folder-submit-btn').addEventListener('click', () => {
  let input = document.querySelector('.folder-input').value
  let list = document.querySelector('.folder-list')

  saveFolder(input)
})

document.querySelector('.folder-list').addEventListener('click', (e) => {
  folderId = e.target.id;
  loadUrls(e.target.id);
})

document.querySelector('.url-list').addEventListener('click', (e) => {
  console.log(e.target.innerText);
  let url = '/api/folders/' + e.target.innerText;

  fetch(url, {
    method: 'PATCH',
    headers: {
      'content-type': 'application/json',
    },
    body: JSON.stringify({
      folderId: e.target.id,
    })
  })
  .then(response => response.json())
  .then(response => displayUrls(response))
})

const loadUrls = (folderId, filter) => {
  if(folderId){
    let url = '/api/folders/' + folderId;
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
      } else if (filter == 'mostPopular') {
        response = sortByPopularity(response, filter)
      } else if (filter == 'leastPopular') {
        response = sortByPopularity(response, filter)
      }
      displayUrls(response)
    })
  }
}

const sortByDate = (urls, filter) => {
  let sortedUrls = urls.sort((a, b) => {
    if(filter == 'newest') {
      return new Date(b.date).getTime() - new Date(a.date).getTime()
    } else {
      return new Date(a.date).getTime() - new Date(b.date).getTime()
    }
  })
  return sortedUrls;
}

const sortByPopularity = (urls, filter) => {
 let sortedUrls = urls.sort((a, b) => {
   if(filter == 'mostPopular') {
     return b.clicks - a.clicks
   } else {
     return a.clicks - b.clicks    }
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
  let url = '/api/folders/';

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
  .then(response => displayFolders(response))
}

const saveUrl = (folderId, urlInput) => {
  let input = document.querySelector('.url-input').value;
  if(folderId){
    let url = '/api/folders/' + folderId;

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
    .then(response => displayUrls(response))
  }
}

document.querySelector('.newest-date-btn').addEventListener('click', (e) => {
  loadUrls(folderId, 'newest');
})

document.querySelector('.oldest-date-btn').addEventListener('click', (e) => {
  loadUrls(folderId, 'oldest');
})

document.querySelector('.most-popular-btn').addEventListener('click', (e) => {
 loadUrls(folderId, 'mostPopular');
})

document.querySelector('.least-popular-btn').addEventListener('click', (e) => {
 loadUrls(folderId, 'leastPopular');
})
