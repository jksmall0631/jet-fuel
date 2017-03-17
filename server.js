const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const fs = require('fs');
const md5 = require('md5');

app.use(express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.set('port', process.env.PORT || 3000);

app.locals.title = 'jet fuel.';
app.locals.id = 0;
app.locals.folders = [
  // {
  //  id: 1,
  //  name: "Test"
  // }
];
app.locals.urls = [
  // {
  //   id: 'abc',
  //   url: 'www.google.com',
  //   date: Date.now(),
  //   folderId: 1
  // }
];

app.get('/', (req, res) => {
  fs.readFile(`${__dirname}/index.html`, (err, file) => {
    res.send(file)
  });
});

app.get('/api/folders', (req, res) => {
  res.json(app.locals.folders);
})

app.post('/api/folders', (req, res) => {
  const name = req.body.name
  console.log('name', name);
  const id = md5(name);

  app.locals.folders.push({ id, name });
  res.json({ id, name });
});

app.get('/api/folders/:folderId', (req, res) => {
  const { folderId } = req.params;
  const filtered = app.locals.urls.filter(url => {
    if(url.folderId == folderId){
      return url;
    }
  })
  res.json(filtered);
})

app.post('/api/folders/:folderId', (req, res) => {
  const id = app.locals.id++;
  const { folderId } = req.params;
  let date = new Date;
  const url = req.body.url;
  app.locals.urls.push({ date, url, folderId, id })
  res.json({ date, url, folderId, id })
})


// app.get('/folders', (req, res) => {
//   {folder} = req.body;
//   app.locals.folders.push(folder);
//   res.send(folder)
// })

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
})

module.exports = app
