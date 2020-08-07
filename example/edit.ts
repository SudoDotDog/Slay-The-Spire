/**
 * @author WMXPY
 * @namespace SlayTheSpire
 * @description Edit
 * @override Example
 */

import { readTextFile, writeTextFile, removeFile } from "@sudoo/io";
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
    await writeTextFile(backupFileName, beforeContent);

    const decrypted: SaveFile = decryptSaveFile(beforeContent);

    await writeTextFile('temp.json', JSON.stringify(decrypted, null, 2));

    const tempJsonLocation: string = Path.resolve('temp', 'temp.json');
    console.log(`Edit <${tempJsonLocation}>`);
    console.log('Press any key to continue...');

    await waitForKeyPress();

    const afterContent: string = await readTextFile(tempJsonLocation);
    await removeFile(tempJsonLocation);

    const encrypted: string = encryptSaveFile(JSON.parse(afterContent));

    await writeTextFile(fileName, encrypted);

    console.log('DONE!');
})();
