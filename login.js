puppeteer = require('puppeteer');

(async () => {
    let browser = await puppeteer.launch({ headless: false, userDataDir: "./pinterest_user_data", defaultViewport: null } );
    let page = await browser.newPage();
    await page.goto("https://pinterest.com/login/");
})();