**⚠️ This project has been moved**

<p align="center">
  <a href="https://github.com/echamudi/japanese-toolkit/tree/master/packages/japanese-db">
    <img src="https://raw.githubusercontent.com/echamudi/echamudi-docs/master/images/truck-git.svg" width="150" height="200">
  </a>
</p>

`japanese-db-maker` has been renamed to `japanese-db`. Please use the latest version of `japanese-db` instead of `japanese-db-maker`.

**NPM URL:** https://www.npmjs.com/package/japanese-db

**GitHub URL:** https://github.com/echamudi/japanese-toolkit/tree/master/packages/japanese-db

-----

## Japanese DB Maker

[![NPM Downloads](https://img.shields.io/npm/dm/japanese-db-maker?label=downloads)](https://www.npmjs.com/package/japanese-db-maker)

Japanese language resources database maker from various open source materials.

## Usage
1. Download required materials
    - Download `JMdict_e.gz` from http://www.edrdg.org/jmdict/edict_doc.html.
    - Download `JMnedict.xml.gz` from https://www.edrdg.org/enamdict/enamdict_doc.html.
    - Download `kanjidic2.xml.gz` from http://www.edrdg.org/wiki/index.php/KANJIDIC_Project.

1. Extract all the files and create folder structure as follow:
    ```
    myJpProject/
    ├── sourceFolder/
    │   ├── JMdict_e
    │   ├── JMnedict.xml
    │   └── kanjidic2.xml
    └── destinationFolder/
        └── (empty)
    ```

    The file names must be the same as above.

1. Open `myJpProject` folder in terminal.

1. Run following commands

    ```sh
    npm install japanese-db-maker -g
    japanese-db-maker sqlite -s ./sourceFolder -d ./destinationFolder
    ```

1. If it runs successfully, you'll get the result as `japanese.db` inside `destinationFolder` folder.

## Development

### Testing
```sh
npm link .
npm test
```

## Acknowledgment

The generated database file contains data from following sources.

- JMdict https://www.edrdg.org/jmdict/edict_doc.html
- JMnedict http://www.edrdg.org/enamdict/enamdict_doc.html
- KANJIDIC Project http://www.edrdg.org/wiki/index.php/KANJIDIC_Project
- Wanikani Audio https://github.com/tofugu/japanese-vocabulary-pronunciation-audio
- KanjiVG https://github.com/KanjiVG/kanjivg
- Kanji https://github.com/echamudi/kanji

## Authors

* **Ezzat Chamudi** - [echamudi](https://github.com/echamudi)

See also the list of [contributors](https://github.com/echamudi/japanese-db-maker/graphs/contributors) who participated in this project.

## License

Copyright © 2020 [Ezzat Chamudi](https://github.com/echamudi)

Japanese DB Maker code is licensed under [MPL-2.0](https://www.mozilla.org/en-US/MPL/2.0/). Images, logos, docs, and articles in this project are released under [CC-BY-SA-4.0](https://creativecommons.org/licenses/by-sa/4.0/legalcode).

Libraries, dependencies, and tools used in this project are tied with their licenses.
