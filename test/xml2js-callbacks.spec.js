import { xml2js } from "../lib";
import testItems from "./test-items";

/*global describe,it,expect*/

var args;

function manipulate(val) {
  args = [...arguments];
  args[0] = val.toUpperCase();
  return val.toUpperCase();
}

function manipulateAttribute(obj) {
  args = arguments;
  var key, temp;
  for (key in obj) {
    try {
      temp = obj[key];
      delete obj[key];
      obj[key.toUpperCase()] = temp.toUpperCase();
    } catch (e) {}
  }
  return obj;
}

var callbacks = [
  //  fn field name     expected      has position data
  ["doctypeFn", "doctype"],
  ["instructionFn", "instruction"],
  ["cdataFn", "cdata"],
  ["commentFn", "comment"],
  ["textFn", "text"],
];

describe("Testing xml2js.js:", function () {
  describe("Adding function callbacks, options = {compact: false}", function () {
    describe.each(callbacks)(
      "options = {%s: manipulate}",
      function (fnFieldName, expectedField) {
        var options = { compact: false };
        options[fnFieldName] = manipulate;
        it.each(testItems("xml2js", options))(
          "$desc",
          function ({ desc, xml, js }) {
            expect(xml2js(xml, options)).toEqual(js);
            if (js.elements && js.elements[0][expectedField]) {
              expect(args).toContain(
                js.elements[js.elements.length - 1][expectedField]
              );
            }
          }
        );
      }
    );

    describe("options = {elementNameFn: manipulate}", function () {
      var options = { compact: false, elementNameFn: manipulate };
      it.each(testItems("xml2js", options))("$desc", function ({desc, xml, js}) {
        expect(xml2js(xml, options)).toEqual(js);
        if (
          js.elements &&
          js.elements[js.elements.length - 1].type === "element" &&
          !js.elements[js.elements.length - 1].elements
        ) {
          expect(args).toContain(
            js.elements[js.elements.length - 1].name
          );
        }
      });
    });

    describe("options = {attributeNameFn: manipulate}", function () {
      var options = { compact: false, attributeNameFn: manipulate };
      it.each(testItems("xml2js", options))("$desc", function ({desc, xml, js}) {
        expect(xml2js(xml, options)).toEqual(js);
      });
    });

    describe("options = {attributeValueFn: manipulate}", function () {
      var options = { compact: false, attributeValueFn: manipulate };
      it.each(testItems("xml2js", options))("$desc", function ({desc, xml, js}) {
        expect(xml2js(xml, options)).toEqual(js);
      });
    });

    describe("options = {attributesFn: manipulateAttribute}", function () {
      var options = { compact: false, attributesFn: manipulateAttribute };
      it.each(testItems("xml2js", options))("$desc", function ({desc, xml, js}) {
        expect(xml2js(xml, options)).toEqual(js);
        if (
          js.elements &&
          js.elements[js.elements.length - 1].attributes
        ) {
          expect(args).toContainEqual(
            js.elements[js.elements.length - 1].attributes
          );
        }
      });
    });

    describe("options = {doctypeFn: manipulate, instructionFn: manipulate, cdataFn: manipulate, commentFn: manipulate, textFn: manipulate}", function () {
      var options = {
        compact: false,
        doctypeFn: manipulate,
        instructionFn: manipulate,
        cdataFn: manipulate,
        commentFn: manipulate,
        textFn: manipulate,
      };
      it.each(testItems("xml2js", options))("$desc", function ({desc, xml, js}) {
        expect(xml2js(xml, options)).toEqual(js);
      });
    });

    describe("options = {instructionNameFn: manipulate, elementNameFn: manipulate, attributeNameFn: manipulate, attributeValueFn: manipulate}", function () {
      var options = {
        compact: false,
        instructionNameFn: manipulate,
        elementNameFn: manipulate,
        attributeNameFn: manipulate,
        attributeValueFn: manipulate,
      };
      it.each(testItems("xml2js", options))("$desc", function ({desc, xml, js}) {
        expect(xml2js(xml, options)).toEqual(js);
      });
    });
  });

  describe("Adding function callbacks, options = {compact: true}", function () {
    // ˇˇˇˇˇˇˇˇˇˇ
    describe("options = {doctypeFn: manipulate}", function () {
      var options = { compact: true, doctypeFn: manipulate };
      it.each(testItems("xml2js", options))("$desc", function ({desc, xml, js}) {
        expect(xml2js(xml, options)).toEqual(js);
        if (js._doctype) {
          expect(args).toContain(
            js._doctype instanceof Array
              ? js._doctype[1]
              : js._doctype
          );
        }
      });
    });

    describe("options = {cdataFn: manipulate}", function () {
      var options = { compact: true, cdataFn: manipulate };
      it.each(testItems("xml2js", options))("$desc", function ({desc, xml, js}) {
        expect(xml2js(xml, options)).toEqual(js);
        if (js._cdata) {
          expect(args).toContain(
            js._cdata instanceof Array ? js._cdata[1] : js._cdata
          );
        }
      });
    });

    describe("options = {commentFn: manipulate}", function () {
      var options = { compact: true, commentFn: manipulate };
      it.each(testItems("xml2js", options))("$desc", function ({desc, xml, js}) {
        expect(xml2js(xml, options)).toEqual(js);
        if (js._comment) {
          expect(args).toContain(
            js._comment instanceof Array
              ? js._comment[1]
              : js._comment
          );
        }
      });
    });
    // ^^^^^^^^

    //ˇˇˇˇˇˇˇˇ
    describe("options = {textFn: manipulate}", function () {
      var options = { compact: true, textFn: manipulate };
      it.each(testItems("xml2js", options))("$desc", function ({desc, xml, js}) {
        expect(xml2js(xml, options)).toEqual(js);
        if (js.a && js.a._text) {
          expect(args).toContain(js.a._text);
        }
      });
    });

    describe("options = {attributesFn: manipulateAttribute}", function () {
      var options = { compact: true, attributesFn: manipulateAttribute };
      it.each(testItems("xml2js", options))("$desc", function ({desc, xml, js}) {
        expect(xml2js(xml, options)).toEqual(js);
        if (js.a && js.a._attributes) {
          expect(args).toContainEqual(js.a._attributes);
        }
      });
    });
    //^^^^^^

    // ˇˇˇˇˇˇˇˇˇˇ
    describe("options = {instructionNameFn: manipulate}", function () {
      var options = { compact: true, instructionNameFn: manipulate };
      it.each(testItems("xml2js", options))("$desc", function ({desc, xml, js}) {
        expect(xml2js(xml, options)).toEqual(js);
      });
    });

    describe("options = {elementNameFn: manipulate}", function () {
      var options = { compact: true, elementNameFn: manipulate };
      it.each(testItems("xml2js", options))("$desc", function ({desc, xml, js}) {
        expect(xml2js(xml, options)).toEqual(js);
      });
    });

    describe("options = {attributeNameFn: manipulate}", function () {
      var options = { compact: true, attributeNameFn: manipulate };
      it.each(testItems("xml2js", options))("$desc", function ({desc, xml, js}) {
        expect(xml2js(xml, options)).toEqual(js);
      });
    });

    describe("options = {attributeValueFn: manipulate}", function () {
      var options = { compact: true, attributeValueFn: manipulate };
      it.each(testItems("xml2js", options))("$desc", function ({desc, xml, js}) {
        expect(xml2js(xml, options)).toEqual(js);
      });
    });

    describe("options = {instructionFn: manipulate}", function () {
      var options = { compact: true, instructionFn: manipulate };
      it.each(testItems("xml2js", options))("$desc", function ({desc, xml, js}) {
        expect(xml2js(xml, options)).toEqual(js);
      });
    });
    // ^^^^^^^^^^^^^^

    describe("options = {doctypeFn: manipulate, instructionFn: manipulate, cdataFn: manipulate, commentFn: manipulate, textFn: manipulate}", function () {
      var options = {
        compact: true,
        doctypeFn: manipulate,
        instructionFn: manipulate,
        cdataFn: manipulate,
        commentFn: manipulate,
        textFn: manipulate,
      };
      it.each(testItems("xml2js", options))("$desc", function ({desc, xml, js}) {
        expect(xml2js(xml, options)).toEqual(js);
      });
    });

    describe("options = {instructionNameFn: manipulate, elementNameFn: manipulate, attributeNameFn: manipulate, attributeValueFn: manipulate}", function () {
      var options = {
        compact: true,
        instructionNameFn: manipulate,
        elementNameFn: manipulate,
        attributeNameFn: manipulate,
        attributeValueFn: manipulate,
      };
      it.each(testItems("xml2js", options))("$desc", function ({desc, xml, js}) {
        expect(xml2js(xml, options)).toEqual(js);
      });
    });
  });
});
