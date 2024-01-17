const esprima = require('esprima');
const fs = require('fs');
const { getFilePathFromCommandLine } = require('./util/commandLineUtils');

function findUnusedImports(filePath) {
    const code = fs.readFileSync(filePath, 'utf-8');
    const ast = esprima.parseModule(code);
  
    // saving AST as JSON
    const astJson = JSON.stringify(ast, null, 2);
    const outputFilePath = 'astOutput.json';
    fs.writeFileSync(outputFilePath, astJson);
    console.log(`AST successfully written to ${outputFilePath}`);

    const imports = new Set();
    const usedIdentifiers = new Set();
    const importCount = [];

    // Traverse AST for import declarations
    ast.body.forEach(node => {
        if (node.type === 'ImportDeclaration') {
            node.specifiers.forEach(spec => {
                imports.add(spec.local.name);
                importCount.push(0);
            });
        }
    });

    let importCheck = Array.from(imports);

    // Traverse AST for identifier usage
    esprima.tokenize(code, {}, token => {
        if (token.type == 'Identifier' && imports.has(token.value)) {
            const i = importCheck.indexOf(token.value);
            if (importCount[i] !== 0) {
                usedIdentifiers.add(token.value);
            } else {
                importCount[i] += 1;
            }
        }
    });

    let usedIdentifiersArray = Array.from(usedIdentifiers);

    // Check for unused imports
    const unusedImports = [...imports].filter(i => !usedIdentifiers.has(i));
    console.log('Used Imports:', usedIdentifiersArray);
    console.log('Unused Imports:', unusedImports);
}

const filePath = getFilePathFromCommandLine();
findUnusedImports(filePath);
