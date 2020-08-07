/**
 * @author WMXPY
 * @namespace SlayTheSpire
 * @description Util
 * @override Test
 */

import * as Path from "path";

export const joinExamplePath = (...paths: string[]): string => {

    return Path.resolve(__dirname, '..', 'example', ...paths);
};
