/**
 * @author WMXPY
 * @namespace SlayTheSpire
 * @description Start
 * @override Scenario
 */

import { readTextFile } from "@sudoo/io";
import { expect } from 'chai';
import * as Chance from 'chance';
import { joinStaticPath } from '../../example/util';
import { decryptSaveFile, SaveFile, encryptSaveFile } from '../../src';

describe('Given (Start) Scenario', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance: Chance.Chance = new Chance('scenario-start');

    let simpleContent: string;

    let decrypted: SaveFile;

    before(async (): Promise<void> => {

        simpleContent = await readTextFile(joinStaticPath('start.autosave'));
    });

    it('should be able to parse example', (): void => {

        const parsed: SaveFile = decryptSaveFile(simpleContent);
        decrypted = parsed;

        expect(typeof decrypted).to.be.equal('object');
    });

    it('should be able to stringify example', (): void => {

        const stringified: string = encryptSaveFile(decrypted);

        expect(typeof stringified).to.be.equal('string');

        const reparsed: SaveFile = decryptSaveFile(stringified);
        expect(reparsed).to.be.deep.equal(decrypted);
    });
});
