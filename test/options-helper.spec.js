import { copyOptions, ensureFlagExists, ensureKeyExists } from '../lib/options-helper';

/*global describe,it,expect*/

describe('Testing options.js:', function () {

  describe('Helpers:', function () {

    describe('Copy options:', function () {

      it('Copy unprovided options', function () {
        expect(copyOptions()).toEqual({});
      });

      it('Copy provided options', function () {
        var options = {ignoreText: true, textKey: true};
        expect(copyOptions(options)).toEqual(options);
      });

    });

    describe('Ensure flag existance:', function () {

      it('New flag', function () {
        var options = {};
        ensureFlagExists('foo', options);
        expect(options).toEqual({foo: false});
      });

      it('Existing flag, not boolean', function () {
        var options = {foo: 123};
        ensureFlagExists('foo', options);
        expect(options).toEqual({foo: false});
      });

      it('Existing flag', function () {
        var options = {foo: true};
        ensureFlagExists('foo', options);
        expect(options).toEqual({foo: true});
      });

    });

    describe('Ensure key existance:', function () {

      it('New key', function () {
        var options = {};
        ensureKeyExists('foo', options);
        expect(options).toEqual({fooKey: 'foo'});
      });

      it('Existing key, not string', function () {
        var options = {fooKey: 123};
        ensureKeyExists('foo', options);
        expect(options).toEqual({fooKey: 'foo'});
      });

      it('Existing key, string', function () {
        var options = {fooKey: 'baa'};
        ensureKeyExists('foo', options);
        expect(options).toEqual({fooKey: 'baa'});
      });

    });

  });

});
