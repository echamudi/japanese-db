const fs = require('fs');
const xml2json = require('xml2json');

class JMnedictUtil {
  /**
   * @param {string} path
   */
  constructor(path, shortEntities = true) {
    // Properties

    /** @type {string} */
    this.data = null;
    this.jmnedictObj = null;
    this.jmnedictEntries = null;
    /** @type {Object<string, string>} */
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
  }

  /**
   * Get JMnedict Entries
   * @returns {JMnedict.entry[]}
   */
  getJMnedictEntries() {
    if (this.jmnedictEntries) return this.jmnedictEntries;

    const jmnedictObj = /** @type {JMnedict.JMnedict} */ (xml2json.toJson(this.data, {
      object: true,
      arrayNotation: true,
    }));

    return jmnedictObj.JMnedict[0].entry;
  }
}
module.exports = JMnedictUtil;