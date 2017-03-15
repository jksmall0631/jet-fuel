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
app.locals.folders = [];
app.locals.urls = [];

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
  const id = md5(name);

  app.locals.folders.push({ id, name });

  res.json({ id, name });
});

app.get('/api/folders/:folder', (req, res) => {
  const { folder } = req.params;
  const filtered = app.locals.urls.filter(url => {
    if(url.folder === folder){
      return url;
    }
  })
  res.json(filtered);
})

app.post('/api/folders/:folder', (req, res) => {
const { folder } = req.params;
const date = Date.now();
const url = req.body.url;
app.locals.urls.push({ date, url, folder })

res.json({ date, url, folder })
})


// app.get('/folders', (req, res) => {
//   {folder} = req.body;
//   app.locals.folders.push(folder);
//   res.send(folder)
// })

app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
})
