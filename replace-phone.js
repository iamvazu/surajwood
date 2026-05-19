const fs = require('fs');
const path = require('path');

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fullPath.includes('node_modules') || fullPath.includes('.next') || fullPath.includes('.git')) continue;
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            walkDir(fullPath);
        } else if (stat.isFile() && (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx'))) {
            const content = fs.readFileSync(fullPath, 'utf8');
            if (content.includes('9999995553')) {
                const newContent = content.replace(/9999995553/g, '9009171819');
                fs.writeFileSync(fullPath, newContent, 'utf8');
                console.log(`Replaced in ${fullPath}`);
            }
        }
    }
}
walkDir('c:\\\\Users\\\\dell\\\\Desktop\\\\surajwood\\\\surajwood-frontend');
