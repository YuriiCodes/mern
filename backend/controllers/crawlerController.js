import CrawledPage from '../models/CrawledPageModel';
import {getHTMLAndBaseUrlFromUrl} from "../services/puppeteer";
import {ParseHTML} from "../services/parse/parseHTML";
import {bfsCrawl} from "../services/bfsCrawl";

export  const crawl = async (req, res) => {
  const {url, max_depth, max_pages} = req.body;

  // Get an array of page info objects.
  const crawledPagesInfo = await bfsCrawl(url, max_pages, max_depth);

  let results = [];
  for (const pageInfo of crawledPagesInfo) {
    try {
      const saved = await new CrawledPage(pageInfo).save();
      results.push(saved);
      console.log({saved});
    }
    catch( err) {
      return res.status(500).send(err);
    }
  }
  return res.send(results);
};

//load history using mongoose -> https://mongoosejs.com/
export const getHistory = (req, res) => {
  CrawledPage.find({}, (error, pages) => {
    if (error) {
      return res.status(400).json(error);
    }

    return res.send(pages);
  });
};

