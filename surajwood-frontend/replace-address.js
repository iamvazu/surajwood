const fs = require('fs');
const path = require('path');

function replaceInFile(filePath) {
    let content = fs.readFileSync(filePath, 'utf8');
    let changed = false;

    const changes = [
        ['45 KM Stone, VPO Rohad, Bahadurgarh, Haryana – 124501', '45 KM Stone, VPO Rohad, Bahadurgarh, Distt. Jhajjar, Haryana - 124501'],
        ['45 KM Stone, VPO Rohad, Bahadurgarh, Haryana 124501', '45 KM Stone, VPO Rohad, Bahadurgarh, Distt. Jhajjar, Haryana - 124501'],
        ['Bahadurgarh, Haryana 124501', 'Bahadurgarh, Distt. Jhajjar, Haryana - 124501'],
        ['Bahadurgarh, Haryana – 124501', 'Bahadurgarh, Distt. Jhajjar, Haryana - 124501'],
        ['45 KM Stone, Bahadurgarh, Haryana, India', '45 KM Stone, VPO Rohad, Bahadurgarh, Distt. Jhajjar, Haryana - 124501, India']
    ];

    for (const [oldStr, newStr] of changes) {
        if (content.includes(oldStr)) {
            content = content.split(oldStr).join(newStr);
            changed = true;
        }
    }

    if (changed) {
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Replaced in ${filePath}`);
    }
}

function walkDir(dir) {
    const files = fs.readdirSync(dir);
    for (const file of files) {
        const fullPath = path.join(dir, file);
        if (fullPath.includes('node_modules') || fullPath.includes('.next') || fullPath.includes('.git')) continue;
        const stat = fs.statSync(fullPath);
        if (stat.isDirectory()) {
            walkDir(fullPath);
        } else if (stat.isFile() && (fullPath.endsWith('.ts') || fullPath.endsWith('.tsx') || fullPath.endsWith('.json'))) {
            replaceInFile(fullPath);
        }
    }
}

walkDir('c:\\\\Users\\\\dell\\\\Desktop\\\\surajwood\\\\surajwood-frontend');
