import { xml2js, xml2json, json2xml, js2xml } from '../lib';
import testItems from './test-items';

/*global describe,it,expect*/

describe('Testing xml2js.js:', function () {
  //var books = require('fs').readFileSync('test/fixtures/books.xml', 'utf8');

  describe('No options supplied (fallback to defaults):', function () {
    var options = {};
    it.each(testItems('xml2js', options))(
      '$desc',
      function ({ desc, xml, js }) {
        expect(xml2js(xml, options)).toEqual(js);
      }
    );
  });

  describe('options = {compact: false}', function () {
    describe.each([
      [
        'Options set to default values explicitly:',
        {
          singleLine: false,
          compact: false,
          trim: false,
          sanitize: false,
          nativeType: false,
          alwaysChildren: false,
          addParent: false,
        },
      ],

      ['options = {compact: false}', { compact: false }],
      ['options = {trim: true}', { compact: false, trim: true }],
      ['options = {sanitize: true}', { compact: false, sanitize: true }],
      ['options = {nativeType: true}', { compact: false, nativeType: true }],
      [
        'options = {nativeTypeAttributes: true}',
        { compact: false, nativeTypeAttributes: true },
      ],
      [
        'options = {alwaysChildren: true}',
        { compact: false, alwaysChildren: true },
      ],
      ['options = {addParent: true}', { compact: false, addParent: true }],
      ['options = {ignoreText: true}', { compact: false, ignoreText: true }],
      [
        'options = {ignoreComment: true}',
        { compact: false, ignoreComment: true },
      ],
      ['options = {ignoreCdata: true}', { compact: false, ignoreCdata: true }],
      [
        'options = {ignoreDoctype: true}',
        { compact: false, ignoreDoctype: true },
      ],
      [
        'options = {ignoreDeclaration: true}',
        { compact: false, ignoreDeclaration: true },
      ],
      [
        'options = {ignoreInstruction: true}',
        { compact: false, ignoreInstruction: true },
      ],
    ])('%s', function (descr, options) {
      it.each(testItems('xml2js', options))(
        '$desc',
        function ({ desc, xml, js }) {
          expect(xml2js(xml, options)).toEqual(js);
        }
      );
    });

    describe('options = {trackPosition: true}', function () {
      var options = { compact: false, trackPosition: true };

      it('Show position information for elements and text', function () {
        var xml = `
<a>
  <b attr="nomen">This is it <c>not?</c>
  but what
  about <c attr2="refer"/> <d>this is not
  </d>
  </b>
</a>`;
        expect(xml2js(xml, options)).toEqual({
          elements: [
            {
              type: 'element',
              name: 'a',
              position: {
                start: { column: 3, line: 1, startTagPosition: 3 },
                end: { column: 4, line: 7, startTagPosition: 115 },
              },
              elements: [
                {
                  type: 'element',
                  name: 'b',
                  attributes: { attr: 'nomen' },
                  position: {
                    start: { column: 18, line: 2, startTagPosition: 9 },
                    end: { column: 6, line: 6, startTagPosition: 110 },
                  },
                  elements: [
                    { type: 'text', text: 'This is it ' },
                    {
                      type: 'element',
                      name: 'c',
                      position: {
                        start: { column: 32, line: 2, startTagPosition: 36 },
                        end: { column: 40, line: 2, startTagPosition: 43 },
                      },
                      elements: [{ type: 'text', text: 'not?' }],
                    },
                    { type: 'text', text: '\n  but what\n  about ' },
                    {
                      type: 'element',
                      name: 'c',
                      attributes: { attr2: 'refer' },
                      position: {
                        start: { column: 26, line: 4, startTagPosition: 67 },
                        end: { column: 26, line: 4, startTagPosition: 67 },
                      },
                    },
                    {
                      type: 'element',
                      name: 'd',
                      position: {
                        start: { column: 30, line: 4, startTagPosition: 86 },
                        end: { column: 6, line: 5, startTagPosition: 103 },
                      },
                      elements: [{ type: 'text', text: 'this is not\n  ' }],
                    },
                  ],
                },
              ],
            },
          ],
        });
      });
    });
  });

  describe('options = {compact: true}', function () {
    describe.each([
      [
        'Options set to default values explicitly:',
        {
          compact: true,
          trim: false,
          sanitize: false,
          nativeType: false,
          alwaysChildren: false,
          addParent: false,
        },
      ],
      ['options = {compact: true}', { compact: true }],
      ['options = {trim: true}', { compact: true, trim: true }],
      ['options = {sanitize: true}', { compact: true, sanitize: true }],
      ['options = {alwaysArray: true}', { compact: true, alwaysArray: true }],
      'options = {alwaysArray: ["a", "c"]}',
      { compact: true, alwaysArray: ['a', 'c'] }[
        ('options = {addParent: true}', { compact: true, addParent: true })
      ],
      ['options = {ignoreText: true}', { compact: true, ignoreText: true }],
      [
        'options = {ignoreComment: true}',
        { compact: true, ignoreComment: true },
      ],
      ['options = {ignoreCdata: true}', { compact: true, ignoreCdata: true }],
      [
        'options = {ignoreDoctype: true}',
        { compact: true, ignoreDoctype: true },
      ],
      [
        'options = {ignoreDeclaration: true}',
        { compact: true, ignoreDeclaration: true },
      ],
      [
        'options = {ignoreInstruction: true}',
        { compact: true, ignoreInstruction: true },
      ],
    ])('%s', function (descr, options) {
      it.each(testItems('xml2js', options))(
        '$desc',
        function ({ desc, xml, js }) {
          expect(xml2js(xml, options)).toEqual(js);
        }
      );
    });
  });

  describe('Various options:', function () {
    describe('options = {trim: true}', function () {
      var options = { trim: true };
      it.each(testItems('xml2js', options))(
        '$desc',
        function ({ desc, xml, js }) {
          expect(xml2js(xml, options)).toEqual(js);
        }
      );
    });

    describe('options = {nativeType: true}', function () {
      var options = { nativeType: true };

      it('Parse number', function () {
        expect(xml2js('<a>123</a>', options)).toEqual({
          elements: [
            {
              type: 'element',
              name: 'a',
              elements: [{ type: 'text', text: 123 }],
            },
          ],
        });
      });
      it('Parse true', function () {
        expect(xml2js('<a>true</a>', options)).toEqual({
          elements: [
            {
              type: 'element',
              name: 'a',
              elements: [{ type: 'text', text: true }],
            },
          ],
        });
      });
      it('Parse false', function () {
        expect(xml2js('<a>false</a>', options)).toEqual({
          elements: [
            {
              type: 'element',
              name: 'a',
              elements: [{ type: 'text', text: false }],
            },
          ],
        });
      });
      xml2js('<a>x', {});
      /*it('Parse improper XML', function () {
        expect(convert.xml2js('<a>x', {})).toEqual({"elements":[{"type":"element","name":"a","elements":[{"type":"text","text":"x"}]}]});
      });*/
    });

    describe('options = {nativeTypeAttributes: true}', function () {
      var options = { nativeTypeAttributes: true };

      it('Parse number', function () {
        expect(xml2js('<a data-value="123"></a>', options)).toEqual({
          elements: [
            { type: 'element', name: 'a', attributes: { 'data-value': 123 } },
          ],
        });
      });
      it('Parse true', function () {
        expect(xml2js('<a data-value="true"></a>', options)).toEqual({
          elements: [
            { type: 'element', name: 'a', attributes: { 'data-value': true } },
          ],
        });
      });
      it('Parse false', function () {
        expect(xml2js('<a data-value="false"></a>', options)).toEqual({
          elements: [
            { type: 'element', name: 'a', attributes: { 'data-value': false } },
          ],
        });
      });
    });

    describe('options = {instructionHasAttributes: true}', function () {
      var options = { compact: true, instructionHasAttributes: true };

      it('Parse attributes in processing instruction', function () {
        expect(xml2js('<?go to="there"?>', options)).toEqual({
          _instruction: { go: { _attributes: { to: 'there' } } },
        });
      });

      it('Parse attributes in processing instruction', function () {
        expect(
          xml2js('<?go to="there"?>', { instructionHasAttributes: true })
        ).toEqual({
          elements: [
            { type: 'instruction', name: 'go', attributes: { to: 'there' } },
          ],
        });
      });
    });
  });

  describe('xml2json:', function () {
    describe('No options supplied (fallback to defaults):', function () {
      var options = {};
      it.each(testItems('xml2js', options))(
        '$desc',
        function ({ desc, xml, js }) {
          expect(xml2json(xml, options)).toEqual(JSON.stringify(js));
        }
      );
    });

    describe('options = {compact: true, addParent: true}:', function () {
      var options = { onlyItem: 6, compact: true, addParent: true };
      it.each(testItems('xml2js', options))(
        '$desc',
        function ({ desc, xml, js }) {
          expect(xml2json(xml, options)).toBe(
            JSON.stringify(js, function (k, v) {
              return k === '_parent' ? '_' : v;
            })
          );
        }
      );
    });
  });

  describe('User reported issues:', function () {
    describe('case by Mark Pareja', function () {
      // see https://github.com/nashwaan/xml-js/issues/3
      var xml =
        '<?xml version="1.0" encoding="utf-8"?>\n' +
        '<dp:ListServicesReply ReturnCode="0" xmlns:dp="http://www.cisco.com/vtg/diagnosticportal">\n' +
        '  <dp:Schema Version="1.0" />\n' +
        '  <dp:ServiceList>\n' +
        '    <dp:Service Name="Cisco ICM usgd1 LoggerA" Description="Provides Call Logging services for Instance usgd1" Status="Running" StartupType="Auto" LogOnAs="****" />\n' +
        '    <dp:Service Name="Cisco ICM Diagnostic Framework" Description="Provides a web-based diagnostic service for Cisco Unified ICM, Contact Center Enterprise application." Status="Running" StartupType="Auto" LogOnAs="LocalSystem" />\n' +
        '  </dp:ServiceList>\n' +
        '</dp:ListServicesReply>';
      var json = {
        _declaration: {
          _attributes: {
            version: '1.0',
            encoding: 'utf-8',
          },
        },
        'dp:ListServicesReply': {
          _attributes: {
            ReturnCode: '0',
            'xmlns:dp': 'http://www.cisco.com/vtg/diagnosticportal',
          },
          'dp:Schema': {
            _attributes: {
              Version: '1.0',
            },
          },
          'dp:ServiceList': {
            'dp:Service': [
              {
                _attributes: {
                  Name: 'Cisco ICM usgd1 LoggerA',
                  Description:
                    'Provides Call Logging services for Instance usgd1',
                  Status: 'Running',
                  StartupType: 'Auto',
                  LogOnAs: '****',
                },
              },
              {
                _attributes: {
                  Name: 'Cisco ICM Diagnostic Framework',
                  Description:
                    'Provides a web-based diagnostic service for Cisco Unified ICM, Contact Center Enterprise application.',
                  Status: 'Running',
                  StartupType: 'Auto',
                  LogOnAs: 'LocalSystem',
                },
              },
            ],
          },
        },
      };

      it('should output as expected json', function () {
        expect(xml2json(xml, { compact: true })).toEqual(JSON.stringify(json));
      });
    });

    describe('case by Félix Dion Robidoux', function () {
      // see https://github.com/nashwaan/xml-js/issues/6
      var xml =
        '<ZohoCreator>\n' +
        '    <applicationslist>\n' +
        '        <application name="testapp">\n' +
        '            <formlist>\n' +
        '                <form name="Untitled_Form">\n' +
        '                    <add>\n' +
        '                        <field name="Subform_Single_Line">\n' +
        '                            <value>BEUHBALUGU</value>\n' +
        '                        </field>\n' +
        '                    </add>\n' +
        '                </form>\n' +
        '                <form name="Untitled_Form">\n' +
        '                    <add>\n' +
        '                        <field name="Subform_Single_Line">\n' +
        '                            <value>IF YOU CAN SEE THIS YOU DESERVE THE SUCC</value>\n' +
        '                        </field>\n' +
        '                    </add>\n' +
        '                </form>\n' +
        '            </formlist>\n' +
        '        </application>\n' +
        '        <application name="derp">\n' +
        '            <formlist></formlist>\n' +
        '        </application>\n' +
        '    </applicationslist>\n' +
        '</ZohoCreator>';

      var json = xml2json(xml, { compact: true, spaces: 4 });

      it('should output json and reverse it back to xml', function () {
        expect(
          json2xml(json, {
            compact: true,
            spaces: 4,
            fullTagEmptyElement: true,
          })
        ).toEqual(xml);
      });
    });

    describe('case by misitoth', function () {
      // see https://github.com/nashwaan/xml-js/issues/13
      var xml =
        '<!DOCTYPE svc_init SYSTEM "MLP_SVC_INIT_300.DTD" [<!ENTITY % extension SYSTEM "PIF_EXTENSION_100.DTD">%extension;]>';
      var json = {
        _doctype:
          'svc_init SYSTEM "MLP_SVC_INIT_300.DTD" [<!ENTITY % extension SYSTEM "PIF_EXTENSION_100.DTD">%extension;]',
      };

      it('should output as expected json', function () {
        expect(xml2js(xml, { compact: true })).toEqual(json);
      });
    });

    describe('case by adamgcraig', function () {
      // see https://github.com/nashwaan/xml-js/issues/26
      var xml =
        '<?xml version="1.0" encoding="UTF-8"?>\n' +
        '<note>\n' +
        '\v<to>xml-js</to>\n' +
        '\v<from>ACraig</from>\n' +
        '\v<heading>Min Example</heading>\n' +
        '\v<body>Here are some characters that get sanitized: " \'</body>\n' +
        '</note>';
      var js = {
        _declaration: {
          _attributes: {
            version: '1.0',
            encoding: 'UTF-8',
          },
        },
        note: {
          to: {
            _text: 'xml-js',
          },
          from: {
            _text: 'ACraig',
          },
          heading: {
            _text: 'Min Example',
          },
          body: {
            _text: 'Here are some characters that get sanitized: " \'',
          },
        },
      };

      it('should convert xml object to js and back to xml correctly', function () {
        xml = xml.replace(/\v/g, '  ');
        var js_ = xml2js(xml, { compact: true });
        expect(js_).toEqual(js);
        expect(js2xml(js_, { spaces: 2, compact: true })).toEqual(xml);
      });
    });

    describe('case by bidiu', function () {
      // see https://github.com/nashwaan/xml-js/issues/26
      var xml = '<title>Support &amp; resistance</title>';
      var js = {
        elements: [
          {
            type: 'element',
            name: 'title',
            elements: [
              {
                type: 'text',
                text: 'Support & resistance',
              },
            ],
          },
        ],
      };

      it('should convert xml object to js and back to xml correctly', function () {
        var js_ = xml2js(xml);
        expect(js_).toEqual(js);
        expect(js2xml(js_)).toEqual(xml);
      });
    });

    describe("case by Daniel 'yngwi'", function () {
      // see https://github.com/nashwaan/xml-js/issues/29
      var xml =
        '<outer> This is <inner> some</inner> <inner>Text </inner> </outer>';
      var js = {
        elements: [
          {
            type: 'element',
            name: 'outer',
            elements: [
              {
                type: 'text',
                text: ' This is ',
              },
              {
                type: 'element',
                name: 'inner',
                elements: [
                  {
                    type: 'text',
                    text: ' some',
                  },
                ],
              },
              {
                type: 'text',
                text: ' ',
              },
              {
                type: 'element',
                name: 'inner',
                elements: [
                  {
                    type: 'text',
                    text: 'Text ',
                  },
                ],
              },
              {
                type: 'text',
                text: ' ',
              },
            ],
          },
        ],
      };

      it('should convert xml object to js and back to xml correctly', function () {
        var js_ = xml2js(xml, { captureSpacesBetweenElements: true });
        expect(js_).toEqual(js);
        expect(js2xml(js_)).toEqual(xml);
      });
    });

    describe('case by Nuno Martins', function () {
      // see https://github.com/nashwaan/xml-js/issues/34
      var xml = "<?xml version='1.0' encoding='UTF-8'?>";
      var js = {
        declaration: {
          attributes: {
            version: '1.0',
            encoding: 'UTF-8',
          },
        },
      };

      it('should accept XML declarations that use single quotes', function () {
        expect(xml2js(xml)).toEqual(js);
      });
    });
  });
});
