import CrawledPage from '../models/CrawledPageModel';
import {bfsCrawl} from "../services/bfsCrawl";

export  const crawl = async (req, res) => {
  const {url, max_depth, max_pages} = req.body;

  // Data validation
  if (!url || !max_depth || !max_pages) {
    return res.status(400).json({error: 'Missing required fields'});
  }
  if (max_depth < 1 || max_depth > 10) {
    return res.status(400).json({error: 'max_depth must be between 1 and 10'});
  }
  if (max_depth === 1 && max_pages > 1) {
    return res.status(400).json({error: 'max_pages must be 1 if max_depth is 1'});
  }

  // Get an array of page info objects.
  const crawledPagesInfo = await bfsCrawl(url, max_pages, max_depth);

  let results = [];
  for (const pageInfo of crawledPagesInfo) {
    // Save all recursive crawl results in the DB
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

