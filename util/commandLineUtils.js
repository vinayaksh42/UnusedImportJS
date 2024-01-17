// commandLineUtils.js

function getFilePathFromCommandLine() {
    const filePath = process.argv[2];
    if (!filePath) {
        console.log("Please provide a file path as an argument.");
        process.exit(1);
    }
    return filePath;
}

module.exports = {
    getFilePathFromCommandLine
};
