/**
 * @typedef {import("..").JMdict.JMdict} JMdict.JMdict
 * @typedef {import("..").JMdict.entry} JMdict.entry
 */

/** */
const fs = require('fs');
const xml2json = require('xml2json');

class JMdictUtil {
  /**
   * @param {string} path
   */
  constructor(path, shortEntities = true) {
    // Properties

    /** @type {string} */
    this.dictDate = null;
    /** @type {string} */
    this.data = null;
    /** @type {JMdict.JMdict} */
    this.jmdictObj = null;
    /** @type {JMdict.entry[]} */
    this.jmdictEntries = null;
    /** @type {Object.<string, string>} */
    this.entities = null;

    // Constructor script
    this.load(path, shortEntities);
  }

  /**
   * Load JMdict_e file
   * @param {string} path
   * @param {boolean} shortEntities
   * If true, the entities will be the short version.
   * ("adj-ix" vs "adjective (keiyoushi) - yoi/ii class")
   * @returns {void}
   */
  load(path, shortEntities = true) {
    /** @type {string} */
    this.data = fs.readFileSync(path, 'utf8');

    /** @type {RegExp} */
    const entityRegex = /<!ENTITY (.*?) "(.*?)">/g;

    // save entities
    this.entities = {};
    let captures = entityRegex.exec(this.data);

    while (captures !== null) {
      const key = captures[1];
      const value = captures[2];

      this.entities[key] = value;

      captures = entityRegex.exec(this.data);
    }

    // remove entities from data
    if (shortEntities) {
      this.data = this.data.replace(/<!ENTITY (.*?) "(.*?)">/g, '<!ENTITY $1 "$1">');
    }

    /** @type {RegExp} */
    const createdDateRegex = /<!-- JMdict created: (.*?) -->/g;
    ({ 1: this.dictDate } = createdDateRegex.exec(this.data));
  }

  /**
   * Get JMdict Entries
   * @returns {JMdict.entry[]}
   */
  getJMdictEntries() {
    if (this.jmdictEntries) return this.jmdictEntries;

    const jmdictObj = /** @type {JMdict.JMdict} */ (xml2json.toJson(this.data, {
      object: true,
      arrayNotation: true,
    }));

    this.jmdictEntries = jmdictObj.JMdict[0].entry;

    return jmdictObj.JMdict[0].entry;
  }

  /**
   * @param {Array<string>} argPriArray
   * @returns {number}
   */
  static priCalc(argPriArray) {
    let priArray = argPriArray;

    if (priArray === undefined || priArray === null) {
      priArray = [];
    }

    let priNum = 0;

    // news
    if (priArray.indexOf('news1') !== -1) priNum += 0;
    else if (priArray.indexOf('news2') !== -1) priNum += 12001;
    else priNum += 24001;

    // ichi
    if (priArray.indexOf('ichi1') !== -1) priNum += 0;
    else if (priArray.indexOf('ichi2') !== -1) priNum += 9401;
    else priNum += 9501;

    // spec
    if (priArray.indexOf('spec1') !== -1) priNum += 0;
    else if (priArray.indexOf('spec2') !== -1) priNum += 1601;
    else priNum += 3201;

    // gai
    if (priArray.indexOf('gai1') !== -1) priNum += 0;
    else if (priArray.indexOf('gai2') !== -1) priNum += 4200;
    else priNum += 4410;

    // nf
    const nfCheck = /** @type {[string] | []} */ (priArray.filter((el) => {
      if (el.slice(0, 2) === 'nf') return true;
      return false;
    }));

    if (nfCheck.length === 1) {
      const nfNum = Number(nfCheck[0].slice(2, 4)); // Get the number from "nfxx"
      priNum += ((nfNum - 1) * 500 + 1);
    } else {
      priNum += 23541;
    }

    return priNum;
  }
}
module.exports = JMdictUtil;
