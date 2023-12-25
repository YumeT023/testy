import fs from "graceful-fs";
import {createRequire} from "module";

const require = createRequire(import.meta.url);

export const targets = ignoreAllInvalid(fs.readdirSync("packages"));

/**
 * Ignores all invalid targets
 * @param {string[]} targets
 * @returns {string[]}
 */
export function ignoreAllInvalid(targets = []) {
  return targets.filter((f) => {
    if (!fs.statSync(`packages/${f}`).isDirectory()) {
      return false;
    }
    const pkg = require(`../packages/${f}/package.json`);
    if (pkg.private) {
      return false;
    }
    return true;
  });
}
