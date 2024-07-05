import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import fs from 'fs';

function replacer(key, value) {
  if (key == "price") {
    const pricePattern = /Rs\.\s*([\d,]+)/i;
    const match = value.match(pricePattern);

    if (match) {
      const priceString = match[1].replace(/,/g, '');
      const priceNumber = Number(priceString);
      return priceNumber;
    } else {
      return null;
    }
  }
  return value;
}

async function scrape() {
  let driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()).build();

  try {
    await driver.get('https://www.nvidia.com/en-in/geforce/buy/');

    let gpus = await driver.findElements(By.className('aem-Grid aem-Grid--10 aem-Grid--default--10 aem-Grid--phone--10 '));


    console.log(`Found ${gpus.length} GPU elements`);
    let gpuData = [];
    console.log(gpus);

    for (let gpu of gpus) {
      let name = await gpu.findElement(By.className('title')).getText();

      let priceElement = await gpu.findElement(By.className('startingprice'));
      let price = priceElement ? await priceElement.getText() : 'NULL';

      gpuData.push({ name, price });
    }

    fs.writeFileSync('gpuData.json', JSON.stringify(gpuData, replacer, 2));

  } finally {
    await driver.quit();
  }
}

scrape();
