/**
 * @author WMXPY
 * @namespace SlayTheSpire
 * @description Decrypt
 */

import { SaveFile } from "./declare";
import { xorBinaryString } from "./util";

export const decryptSaveFile = (content: string): SaveFile => {

    const binary: string = Buffer.from(content, 'base64').toString('binary');
    const parsed: string = xorBinaryString(binary);

    return JSON.parse(parsed);
};
