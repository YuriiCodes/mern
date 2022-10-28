import {getHTMLAndBaseUrlFromUrl} from "./puppeteer";
import {ParseHTML} from "./parse/parseHTML";

export async function bfsCrawl(startUrl, maxPages, maxDepth) {
  const visited = new Set();
  const queue = [{ url: startUrl, depth: 0 }];
  const results = [];

  while (queue.length > 0 && results.length < maxPages) {
    const { url, depth } = queue.shift();
    if (visited.has(url) || depth > maxDepth) {
      continue;
    }

    visited.add(url);
    const { html, baseUrl } = await getHTMLAndBaseUrlFromUrl(url);
    const { title, description, h1, h2, linksArray } =  ParseHTML(html, baseUrl);

    results.push({
      url,
      title,
      description,
      h1,
      h2,
      links: linksArray,
    });


    linksArray.forEach((link) => {
      queue.push({ url: link, depth: depth + 1 });
    });
  }

  return results;
}
