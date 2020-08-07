/**
 * @author WMXPY
 * @namespace SlayTheSpire
 * @description Start
 * @override Scenario
 */

import { readTextFile } from "@sudoo/io";
import { expect } from 'chai';
import * as Chance from 'chance';
import { decryptSaveFile, SaveFile } from '../../src';
import { joinExamplePath } from '../util';

describe('Given (Start) Scenario', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance: Chance.Chance = new Chance('scenario-start');

    it('should be able to parse example', async (): Promise<void> => {

        const content: string = await readTextFile(joinExamplePath('start.autosave'));
        const parsed: SaveFile = decryptSaveFile(content);

        console.log(parsed);

        expect(typeof parsed).to.be.equal('object');
    });
});
