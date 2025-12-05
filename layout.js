const path = require('path');
const fs = require('fs-extra');
const cheerio = require('cheerio');

const viewsDir = path.join(__dirname, 'views');
const oldViewsDir = path.join(__dirname, 'views_old');
const partialsDir = path.join(viewsDir, 'layouts');

function replaceBeat(html) {
  for (let i = 0; i < 1000; i++) {
    html = html.replace('><', '>\n<')
    html = html.replace('\n\n', '\n')
  }
  return html;
}
function replaceRoute(html) {
  html = html.replaceAll('Acar Menkul', 'Neta Menkul')
  html = html.replaceAll('ACAR MENKUL', 'NETA MENKUL')
  html = html.replaceAll('acarmenkul', 'netamenkul')
  

  return html;
}
function replaceHead(html) {
  const startIndex = html.indexOf('<head>');
  const endIndex = html.indexOf('</head>');
  if (startIndex === -1 || endIndex === -1) return html;
  const check_index = html.indexOf('<%- include("layouts/head") %>');
  if (check_index !== -1) return html;

  let updatedHtml = `${html.substring(0, startIndex)}\n<%- include("layouts/head") %>\n${html.substring(endIndex + 7)}`;
  return updatedHtml;
}
function replaceHeader(html) {
  const startIndex = html.indexOf('<div class="header');
  const endIndex = html.indexOf('<div class="main middle');
  if (startIndex === -1 || endIndex === -1) return html;
  const check_index = html.indexOf('<%- include("layouts/header") %>');
  if (check_index !== -1) return html;

  let updatedHtml = `${html.substring(0, startIndex)}\n<%- include("layouts/header") %>\n${html.substring(endIndex)}`;
  return updatedHtml;
}
function replaceFooter(html) {
  const startIndex = html.indexOf('<footer');
  const endIndex = html.indexOf('</footer>');
  if (startIndex === -1 || endIndex === -1) return html;
  const check_index = html.indexOf('<%- include("layouts/footer") %>');
  if (check_index !== -1) return html;

  let updatedHtml = `${html.substring(0, startIndex)}\n<%- include("layouts/footer") %>\n${html.substring(endIndex + 9)}`;
  return updatedHtml;
}
function replaceGtm(html) {
  const startIndex = html.indexOf('<noscript');
  const endIndex = html.indexOf('(noscript) -->');
  if (startIndex === -1 || endIndex === -1) return html;

  let updatedHtml = `${html.substring(0, startIndex)}${html.substring(endIndex + 15)}`;
  return updatedHtml;
}
function replaceBullsAsistan(html) {
  const startIndex = html.indexOf('<!-- Bulls Assistant -->');
  if (startIndex === -1) return html;
  let updatedHtml = `${html.substring(0, startIndex)}</html>`;
  return updatedHtml;
}

async function generateLayout() {
  const files = (await fs.readdir(viewsDir)).filter(file => file.endsWith('.ejs'));
  for (const file of files) {
    const filePath = path.join(viewsDir, file);
    let content = await fs.readFile(filePath, 'utf-8');
    //content = replaceBeat(content);
    //content = replaceHead(content);
    content = replaceRoute(content);
    //content = replaceHeader(content);
    //content = replaceFooter(content);
    //content = replaceGtm(content);
    //content = replaceBullsAsistan(content);
    await fs.writeFile(path.join(viewsDir, file), content);
  }

  /**
  const partialFiles = (await fs.readdir(partialsDir)).filter(file => file.endsWith('.ejs'));
  for (const file of partialFiles) {

    const filePath = path.join(partialsDir, file);
    let content = await fs.readFile(filePath, 'utf-8');
    content = replaceLeftBarText(content);
    await fs.writeFile(path.join(partialsDir, file), content);
  }
  console.log('✅ Layout ve partial dosyalar başarıyla oluşturuldu!');
   */
}

generateLayout();