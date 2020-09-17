const { Builder, By, Key, until, Capabilities } = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');
const yargs = require('yargs');
const validate = require('./validate');

const argv = yargs
  .option('code', {
    alias: 'c',
    description: 'Problem Code',
    type: 'string',
  })
  .option('file', {
    alias: 'f',
    description: 'File name of solution',
    type: 'string',
  })
  .option('contest', {
    alias: 'co',
    description: 'Live Contest',
    type: 'boolean',
  })
  .help()
  .alias('help', 'h').argv;

const validated = validate(argv);
const baseurl = 'https://codeforces.com';
const selector = argv.contest
  ? '#sidebar > div:nth-child(4) > div:nth-child(4) > form > table > tbody > tr:nth-child(3) > td:nth-child(2) > input[type=file]'
  : '#sidebar > div:nth-child(5) > div:nth-child(4) > form > table > tbody > tr:nth-child(3) > td:nth-child(2) > input[type=file]';

if (validated) {
  (async function example() {
    const o = new chrome.Options();
    o.addArguments('<your chrome profile path>');
    const driver = new Builder()
      .withCapabilities(Capabilities.chrome())
      .setChromeOptions(o)
      .build();
    try {
      const url = argv.contest
        ? `/contest/${argv.code.slice(0, -1)}/problem/${argv.code
            .slice(-1)
            .toUpperCase()}`
        : `/problemset/problem/${argv.code.slice(0, -1)}/${argv.code
            .slice(-1)
            .toUpperCase()}`;
      await driver.get(baseurl + url);
      const upload = await driver.findElement(By.css(selector));
      await upload.sendKeys(__dirname + `/${argv.file}`);
      const submit = await driver.findElement(By.className('submit'));
      await submit.click();
    } catch (err) {
      console.log(err);
    }
  })();
} else {
  console.log('Please enter valid arguments');
}
