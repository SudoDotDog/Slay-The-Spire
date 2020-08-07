/**
 * @author WMXPY
 * @namespace SlayTheSpire
 * @description Edit
 * @override Example
 */

import { attemptMarkDir, readTextFile, removeFile, writeTextFile } from "@sudoo/io";
import * as Path from "path";
import { decryptSaveFile, encryptSaveFile, SaveFile } from "../src";

const escCharCode: number = 27;

const waitForKeyPress = (): Promise<boolean> => {

    process.stdin.setRawMode(true);

    return new Promise((resolve: () => void) => {

        process.stdin.on('data', (buffer: Buffer) => {

            const charCode: number = buffer.toString().charCodeAt(0);
            process.stdin.setRawMode(false);

            console.log(charCode);

            if (charCode === escCharCode) {

                console.log('Abandoned');
                process.exit();
            } else {

                resolve();
            }
        });
    });
};

(async () => {

    const argv: string[] = process.argv;
    const fileName: string = argv[2];
    if (!fileName) {
        console.log('Provide File');
        process.exit();
    }

    const fileExtension: string = Path.extname(fileName);
    if (fileExtension !== '.autosave') {
        console.log('Provide AutoSave');
        process.exit();
    }

    const baseFileName: string = Path.basename(fileName, '.autosave');
    const backupFileName: string = `${baseFileName}.backup.autosave`;

    const beforeContent: string = await readTextFile(fileName);

    const tempFolderPath: string = Path.resolve('temp');
    await attemptMarkDir(tempFolderPath);

    const backupLocation: string = Path.join(tempFolderPath, backupFileName);
    await writeTextFile(backupLocation, beforeContent);

    const decrypted: SaveFile = decryptSaveFile(beforeContent);

    const tempJsonLocation: string = Path.join(tempFolderPath, 'temp.json');
    await writeTextFile(tempJsonLocation, JSON.stringify(decrypted, null, 2));

    console.log(`BACKUP AT --- <${backupLocation}>`);
    console.log(`EDITING ----- <${tempJsonLocation}>`);
    console.log('Press any key to continue...');
    console.log('Press <ESC> to cancel...');

    await waitForKeyPress();

    const afterContent: string = await readTextFile(tempJsonLocation);
    await removeFile(tempJsonLocation);

    const encrypted: string = encryptSaveFile(JSON.parse(afterContent));

    await writeTextFile(fileName, encrypted);

    console.log('DONE!');
    process.exit();
})();
