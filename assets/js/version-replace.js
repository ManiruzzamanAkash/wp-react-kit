const fs = require('fs-extra');
const replace = require('replace-in-file');

const pluginFiles = ['includes/**/*', 'templates/*', 'src/*', 'job-place.php'];

const { version } = JSON.parse(fs.readFileSync('package.json'));

replace({
    files: pluginFiles,
    from: /JOBPLACE_SINCE/g,
    to: version,
});
