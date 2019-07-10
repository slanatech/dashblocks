const path = require('path');
const fs = require('fs');
const ejs = require('ejs');
const { parse } = require('vue-docgen-api');
const { pathOr } = require('ramda');
const linkify = require('markdown-linkify');

const basePath = path.join(__dirname, '..', 'src', 'components');
const baseDocsPath = path.join(__dirname, '..', 'docs', 'components');

const templateFN = path.join(__dirname, 'templates', 'component.md');
const templateString = fs.readFileSync(templateFN, 'utf-8');

function breakify(str) {
  return str.replace(/\r/g, '').replace(/\n/g, '<br/>');
}

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

// Pre-process component properties
function processProps(componentData) {
  let propsArray = [];
  for (let propName of Object.keys(componentData.props)) {
    let propData = componentData.props[propName];
    let propInfo = {
      name: propName,
      type: pathOr('', ['type', 'name'], propData),
      required: pathOr('', ['required'], propData) === 'true' ? 'true' : 'false',
      description: linkify(breakify(pathOr('', ['description'], propData))),
      default: pathOr('', ['defaultValue', 'value'], propData)
    };
    propsArray.push(propInfo);
  }
  return propsArray;
}

function renderComponentDoc(componentData) {
  let renderData = {
    name: pathOr('', ['displayName'], componentData),
    description: linkify(pathOr('', ['description'], componentData)),
    props: processProps(componentData)
  };

  let renderedDoc = ejs.render(templateString, renderData);
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
