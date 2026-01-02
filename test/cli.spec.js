import { join } from "path";
import { version } from "../package.json";
import util from 'node:util';
import child_process from "node:child_process";
const exec = util.promisify(child_process.exec);

var command = "node " + join(__dirname, "../bin/cli.js");

/*exec('node ./bin/cli.js --version', function (error, stdout, stderr) {
    console.log(stdout, stderr);
  });*/
//console.log(exec('node ./bin/cli.js --version'), {encoding: 'utf8'});

/*global describe,it,expect*/

describe("Testing cli.js:", function () {
  describe("Getting version and help on usage:", function () {
    it("Get version --version", async function () {
      const { stdout, stderr } = await exec(command + " --version");
      expect(stdout).toEqual(version + "\n");
    });

    it("Get version -v", async function () {
      const { stdout, stderr } = await exec(command + " -v");
      expect(stdout).toEqual(version + "\n");
    });

    it("Get help when no arguments supplied", async function () {
      // the command will return with an error
      await exec(command).catch((error)=>{
        expect(error.stdout.substring(0, 13)).toEqual("Usage: xml-js");
      });

    });

    it("Get help --help", async function () {
      const { stdout, stderr } = await exec(command + " --help");
      expect(stdout.substring(0, 13)).toEqual("Usage: xml-js");
    });

    it("Get help -h", async function () {
      const { stdout, stderr } = await exec(command + " -h");
      expect(stdout.substring(0, 13)).toEqual("Usage: xml-js");
    });

  });

  describe("Convert XML:", function () {
    it("should convert xml file", async function () {
      const { stdout, stderr } = await exec(
        command + " " + join(__dirname, "../bin/test.xml")
      );
      expect(stdout).toEqual(
        '{"elements":[{"type":"element","name":"a","attributes":{"x":"1"},"elements":[{"type":"element","name":"b","elements":[{"type":"text","text":"bye!"}]}]}]}' +
          "\n"
      );
    });
  });

  it("should convert xml file, --compact", async function () {
    const { stdout, stderr } = await exec(
      command + " " + join(__dirname, "../bin/test.xml") + " --compact"
    );
    expect(stdout).toEqual(
      '{"a":{"_attributes":{"x":"1"},"b":{"_text":"bye!"}}}' + "\n"
    );
  });
});
