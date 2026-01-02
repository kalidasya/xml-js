import { version } from "../package.json";
import {
  mockProcessExit,
  mockConsoleLog,
} from "jest-mock-process";

var cliImportPath = "../bin/cli.js";
var command = ["node", cliImportPath];

describe("Testing cli.js:", function () {
  var mockLog = mockConsoleLog();
  var mockExit = mockProcessExit();
  beforeEach(() => {
    jest.resetModules();
    jest.clearAllMocks();
  });
  afterAll(() => {
    process.stdin.destroy()
  });
  describe("Getting version and help on usage:", function () {
    it("Get version --version", function () {
      process.argv = command.concat("--version");
      import(cliImportPath).then(() => {
        expect(mockLog).toHaveBeenCalledWith(version);
        expect(mockExit).toHaveBeenCalledWith(0);
      });
    });

    it("Get version -v", async function () {
      process.argv = command.concat("-v");
      await import(cliImportPath);
      expect(mockLog).toHaveBeenCalledWith(version);
      expect(mockExit).toHaveBeenCalledWith(0);
    });

    it("Get help when no arguments supplied", async function () {
      process.argv = command;
      await import(cliImportPath);
      expect(mockLog).toHaveBeenCalledWith(expect.stringMatching("^Usage: xml-js.*"));
      expect(mockExit).toHaveBeenCalledWith(1);
    });

    it("Get help --help", async function () {
      process.argv = command.concat("--help");
      await import(cliImportPath);
      expect(mockLog).toHaveBeenCalledWith(expect.stringContaining("Usage: xml-js"));
      expect(mockExit).toHaveBeenCalledWith(0);
    });

    it("Get help -h", async function () {
      process.argv = command.concat("-h");
      await import(cliImportPath);
      expect(mockLog).toHaveBeenCalledWith(expect.stringContaining("Usage: xml-js"));
      expect(mockExit).toHaveBeenCalledWith(0);
    });
  });

  describe("Convert XML:", function () {
    it("should convert xml file", async function () {
      process.argv = command.concat("bin/test.xml");
      await import(cliImportPath);
      expect(mockLog).toHaveBeenCalledWith(expect.stringContaining('{"elements":[{"type":"element","name":"a","attributes":{"x":"1"},"elements":[{"type":"element","name":"b","elements":[{"type":"text","text":"bye!"}]}]}]}'));
      expect(mockExit).toHaveBeenCalledWith(0);
    });

    it("should convert xml file, --compact", async function () {
      process.argv = command.concat("bin/test.xml", "--compact");
      await import(cliImportPath);
      expect(mockLog).toHaveBeenCalledWith(expect.stringContaining('{"a":{"_attributes":{"x":"1"},"b":{"_text":"bye!"}}}'));
      expect(mockExit).toHaveBeenCalledWith(0);
    });
  });
});
