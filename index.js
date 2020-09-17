const {Builder, By, Key, until,Capabilities} = require('selenium-webdriver');
const chrome = require('selenium-webdriver/chrome');

(async function example() {
  const o = new chrome.Options();
  o.addArguments("--user-data-dir=/home/koulgi/.config/google-chrome/Default");
  const driver = new Builder().withCapabilities(Capabilities.chrome())
            .setChromeOptions(o).build();
  try {
    await driver.get('https://codeforces.com/enter');
  } catch(err) {
    console.log(err);
  }
})();