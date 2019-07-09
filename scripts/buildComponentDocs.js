const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const { parse } = require('vue-docgen-api');

const basePath = path.join(__dirname, '..', 'src', 'components');
const baseDocsPath = path.join(__dirname, '..', 'docs', 'components');

const templateFN = path.join(__dirname, 'templates', 'component.md');
const templateString = fs.readFileSync(templateFN, 'utf-8');

const componentFiles = [
  {
    folder: 'd3',
    name: 'DbHorizon.vue'
  }
];

function parseComponentFile(componentFile) {
  // TODO Options ?
  let parseResult = parse(componentFile);
  return parseResult;
}

function renderComponentDoc(componentData) {
  // TODO
  /*
  let renderData = {
    name: 'aaa', // Name
    obj: {}, // Object to render
    spec: componentData // Full specification
  };
  */

  let renderedDoc = ejs.render(templateString, componentData);
  return renderedDoc;
}

function processComponents() {
  for (let componentFile of componentFiles) {
    let fullFN = path.join(basePath, componentFile.folder, componentFile.name);

    let parseResult = parseComponentFile(fullFN);

    let renderResult = renderComponentDoc(parseResult);

    let docFN = path.join(baseDocsPath, componentFile.folder, componentFile.name + '.md');

    let defFS = fs.createWriteStream(docFN);
    defFS.write(renderResult);
    defFS.end();
  }
}

processComponents();

//console.log('Test here!');
