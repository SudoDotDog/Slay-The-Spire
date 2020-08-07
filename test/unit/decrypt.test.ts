/**
 * @author WMXPY
 * @namespace SlayTheSpire
 * @description Decrypt
 * @override Unit
 */

import { expect } from 'chai';
import * as Chance from 'chance';
import { decryptSaveFile } from '../../src';

describe('Given [Decrypt] Helper functions', (): void => {

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const chance: Chance.Chance = new Chance('slay-the-spire-decrypt');

    it('should be able to verify type', (): void => {

        expect(typeof decryptSaveFile).to.be.equal('function');
    });
});
