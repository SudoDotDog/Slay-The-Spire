/**
 * @author WMXPY
 * @namespace SlayTheSpire
 * @description Util
 */

export const convertTextToByteArray = (data: string): number[] => {

    const buffer: number[] = [];
    for (let i = 0; i < data.length; i++) {
        buffer.push(data.charCodeAt(i));
    }

    return buffer;
};

export const xorBinaryString = (data: string): string => {

    const buffer: string[] = [];
    const byteData: number[] = convertTextToByteArray(data);
    const keyData: number[] = convertTextToByteArray('key');

    for (let i = 0; i < data.length; i++) {

        buffer.push(
            // eslint-disable-next-line no-bitwise
            String.fromCharCode(byteData[i] ^ keyData[i % keyData.length]),
        );
    }

    return buffer.join('');
};
