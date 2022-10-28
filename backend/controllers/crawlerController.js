import CrawledPage from '../models/CrawledPageModel';
import {getHTMLAndBaseUrlFromUrl} from "../services/puppeteer";
import {ParseHTML} from "../services/parseHTML";

export  const crawl = async (req, res) => {
  const {url} = req.body;


  // We need to fetch baseUrl, because some websites provide relative links, and we need to know the base url to resolve them.
  const {html, baseUrl} = await getHTMLAndBaseUrlFromUrl(url);

  const parsedData = ParseHTML(html, baseUrl);
  const { title, description, h1, h2, linksArray} = parsedData;

  try {
    const saved = await new CrawledPage({
      url,
      title,
      description,
      h1,
      h2,
      links: linksArray,
    }).save();
    return res.send(saved);
  }
  catch( err) {
    return res.status(500).send(err);
  }
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

