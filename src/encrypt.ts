/**
 * @author WMXPY
 * @namespace SlayTheSpire
 * @description Encrypt
 */

import { SaveFile } from "./declare";
import { xorBinaryString } from "./util";

export const encryptSaveFile = (save: SaveFile): string => {

    const stringified: string = JSON.stringify(save);
    const encrypted: string = xorBinaryString(stringified);

    const base64: string = Buffer.from(encrypted, 'binary').toString('base64');
    return base64;
};
