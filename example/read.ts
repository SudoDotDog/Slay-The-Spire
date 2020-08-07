/**
 * @author WMXPY
 * @namespace SlayTheSpire
 * @description Read
 * @override Example
 */

import { readTextFile } from "@sudoo/io";
import { decryptSaveFile, SaveFile } from "../src";
import { joinStaticPath } from "./util";

(async () => {

    const content: string = await readTextFile(joinStaticPath('start.autosave'));
    const parsed: SaveFile = decryptSaveFile(content);

    console.log(parsed);
})();
