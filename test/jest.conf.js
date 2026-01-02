import { fileURLToPath } from "url";
import { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

export const rootDir = dirname(__dirname);
export const modulePaths = ["<rootDir>/lib", "<rootDir>/node_modules"];
export const reporters = [
  "default",
  [
    "./node_modules/jest-html-reporter",
    {
      pageTitle: "Test Report",
    },
  ],
];
export const moduleFileExtensions = ["js"];
export const testEnvironment = "node";
export const testMatch = ["**/*.spec.(ts|js)?(x)"];
export const collectCoverage = true;
export const collectCoverageFrom = [
  "lib/**/*.{js,ts}",
  "bin/**/*.{js,ts}",
  "!**/*.spec.{js,ts}",
  "!**/node_modules/**",
  "!**/test/**",
];
export const coverageDirectory = "<rootDir>/test/coverage-jest";
export const coverageReporters = ["json", "lcov", "text", "html"];
