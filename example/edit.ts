/**
 * @author WMXPY
 * @namespace SlayTheSpire
 * @description Edit
 * @override Example
 */

import { readTextFile, writeTextFile, removeFile, attemptMarkDir } from "@sudoo/io";
import { decryptSaveFile, SaveFile, encryptSaveFile } from "../src";
import { waitForKeyPress } from "./util";
import * as Path from "path";

(async () => {

    const argv: string[] = process.argv;
    const fileName: string = argv[2];
    if (!fileName) {
        console.log('Provide File');
        return;
    }

    const fileExtension: string = Path.extname(fileName);
    if (fileExtension !== '.autosave') {
        console.log('Provide AutoSave');
        return;
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

    console.log(`Backup at <${backupLocation}>`);
    console.log(`Edit <${tempJsonLocation}>`);
    console.log('Press any key to continue...');

    await waitForKeyPress();

    const afterContent: string = await readTextFile(tempJsonLocation);
    await removeFile(tempJsonLocation);

    const encrypted: string = encryptSaveFile(JSON.parse(afterContent));

    await writeTextFile(fileName, encrypted);

    console.log('DONE!');
})();
