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
import { decryptSaveFile, SaveFile } from '../../src';

describe('Given (Start) Scenario', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance: Chance.Chance = new Chance('scenario-start');

    it('should be able to parse example', async (): Promise<void> => {

        const content: string = await readTextFile(joinStaticPath('start.autosave'));
        const parsed: SaveFile = decryptSaveFile(content);

        expect(typeof parsed).to.be.equal('object');
    });
});
