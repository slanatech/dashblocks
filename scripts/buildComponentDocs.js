/*
 * Build Components documentation based on JSDoc comments in component files
 *
 */
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
  { folder: 'd3', name: 'DbHorizon.vue' },
  { folder: 'd3', name: 'DbSankey.vue' },
  { folder: 'd3', name: 'DbSunburst.vue' },
  { folder: 'dygraphs', name: 'DbDygraphs.vue' },
  { folder: 'dygraphs', name: 'DbDygraphsBar.vue' },
  { folder: 'dygraphs', name: 'DbDygraphsLine.vue' }
];

function camelCaseToDash(str) {
  return str.replace(/([a-zA-Z])(?=[A-Z])/g, '$1-').toLowerCase();
}

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

// Pre-process component examples
// TODO Generate proper imports of sample components for vuepress ( enhanceApp.js )
function processExamples(componentData, filePath, fileName) {
  let result = [];

  let examplesData = pathOr(null, ['tags', 'examples'], componentData);
  if (!examplesData || !Array.isArray(examplesData) || examplesData.length <= 0) {
    return result;
  }

  for (let example of examplesData) {
    let exampleContent = pathOr(null, ['content'], example);
    if (exampleContent) {
      let exampleFileName = path.join(filePath, exampleContent);
      let exampleBaseName = path.basename(exampleFileName, '.vue');
      let exampleComponent = camelCaseToDash(exampleBaseName);
      try {
        let exampleFileContent = fs.readFileSync(exampleFileName);
        let exampleCode = exampleFileContent.toString();
        result.push({
          code: exampleCode,
          component: exampleComponent,
          filePath: filePath,
          fileName: fileName
        });
      } catch (e) {
        // NOOP //
      }
    }
  }

  return result;
}

function renderComponentDoc(componentData, filePath, fileName) {
  let renderData = {
    name: pathOr('', ['displayName'], componentData),
    description: linkify(pathOr('', ['description'], componentData)),
    props: processProps(componentData),
    examples: processExamples(componentData, filePath, fileName)
  };

  let renderedDoc = ejs.render(templateString, renderData);
  return renderedDoc;
}

function processComponents() {
  for (let componentFile of componentFiles) {
    let filePath = path.join(basePath, componentFile.folder);

    let fullFN = path.join(filePath, componentFile.name);

    let parseResult = parseComponentFile(fullFN);

    let renderResult = renderComponentDoc(parseResult, filePath, componentFile.name);

    if (!fs.existsSync(path.join(baseDocsPath, componentFile.folder))) {
      fs.mkdirSync(path.join(baseDocsPath, componentFile.folder));
    }

    let docFN = path.join(baseDocsPath, componentFile.folder, componentFile.name + '.md');

    let defFS = fs.createWriteStream(docFN);
    defFS.write(renderResult);
    defFS.end();
  }
}

processComponents();

//console.log('Test here!');
