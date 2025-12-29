const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

const site = 'https://e-sube.bullskatilim.online';
const telf = '';

const viewsPath = path.join(__dirname, 'views');
fs.readdirSync(viewsPath).forEach(file => {
  const viewName = path.parse(file).name;
  app.get(`/${viewName}`, (req, res) => {
    res.render(viewName, { site, telf });
  });
});
app.get(`/`, (req, res) => {
  res.render('index', { site, telf });
});



const PORT = 15019;
app.listen(PORT, () => console.log(`Express server running at http://localhost:${PORT}`));