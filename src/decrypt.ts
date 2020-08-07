/**
 * @author WMXPY
 * @namespace SlayTheSpire
 * @description Decrypt
 */

import { SaveFile } from "./declare";

const byteArray = (data: string): number[] => {

    const buffer: number[] = [];
    for (let i = 0; i < data.length; i++) {
        buffer.push(data.charCodeAt(i));
    }

    return buffer;
};

const xorBinary = (data: string): string => {

    const buffer: string[] = [];
    const byteData: number[] = byteArray(data);
    const keyData: number[] = byteArray('key');

    for (let i = 0; i < data.length; i++) {
        buffer.push(
            // eslint-disable-next-line no-bitwise
            String.fromCharCode(byteData[i] ^ keyData[i % keyData.length]));
    }

    return buffer.join('');
};

export const decryptSaveFile = (content: string): SaveFile => {

    const binary: string = Buffer.from(content).toString('binary');
    const parsed: string = xorBinary(binary);

    return JSON.parse(parsed);
};
