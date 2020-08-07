/**
 * @author WMXPY
 * @namespace SlayTheSpire
 * @description Edit
 * @override Example
 */

import { readTextFile, writeTextFile } from "@sudoo/io";
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

    await writeTextFile('backup.autosave')

    const beforeContent: string = await readTextFile(fileName);
    const decrypted: SaveFile = decryptSaveFile(beforeContent);

    await writeTextFile('temp.json', JSON.stringify(decrypted, null, 2));

    await waitForKeyPress();

    const afterContent: string = await readTextFile('temp.json');
    const encrypted: string = encryptSaveFile(JSON.parse(afterContent));

    await writeTextFile(fileName, encrypted);

    console.log('DONE!');
})();
