import puppeteer from 'puppeteer';

// In this function we create a puppeteer browser instance, navigate to the url and return the raw HTML.
// We use Puppeteer to implement client side rendering, so that we can parse even client-side rendered pages.
export async function getHTMLAndBaseUrlFromUrl (url){
  try {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto(url);

    const html = await page.content();
    const baseUrl = await page.evaluate(() => window.location.origin);

    await page.close();
    await browser.close();

    return {html, baseUrl};
  } catch (err) {
    console.error(err);
    return {error: err};
  }
};
