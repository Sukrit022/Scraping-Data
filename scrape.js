import { Builder, By, until } from 'selenium-webdriver';
import chrome from 'selenium-webdriver/chrome.js';
import fs from 'fs';

function replacer(key,value){
  if(key=="price"){
    let val=value.substr(value.length-8,8);
    // let j=0;
    let val1="";
    for(let i=0;i<val.length;i++){
      if(val[i]!=','){
        val1+=val[i];
      }
    }
    let a=Number(val1)
    return a;
  }
  return value;
}

async function scrape() {
  let driver = await new Builder().forBrowser('chrome').setChromeOptions(new chrome.Options()).build();

  try {
    await driver.get('https://www.nvidia.com/en-in/geforce/buy/');

    let gpus = await driver.findElements(By.id('container-0c56a80eb9'));
    let gpuData = [];
    console.log(gpus);
    for (let gpu of gpus) {
      let name = await gpu.findElement(By.className('title')).getText();
      let priceElement = await gpu.findElement(By.className('startingprice'));
      let price = priceElement ? await priceElement.getText() : 'NULL';
      
      gpuData.push({name, price});
    }

    fs.writeFileSync('gpuData.json', JSON.stringify(gpuData, replacer, 2));
    
  } finally {
    await driver.quit();
  }
}

scrape();
