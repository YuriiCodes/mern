import superagent from 'superagent';

const API = 'http://localhost:3000'
const responseBody = (res: any) => {
  return res.body;
};

const httpHeaders = (req: any) => {
  req.set('Accept', 'application/json');
};

const requests = {
  del: (url: string) =>
    superagent.del(`${API}${url}`).use(httpHeaders).then(responseBody),
  get: (url: string) =>
    superagent.get(`${API}${url}`).then(responseBody),
  put: (url: string, body: any) =>
    superagent.put(`${API}${url}`, body).use(httpHeaders).then(responseBody),
  post: (url: string, body: any) =>
    superagent.post(`${API}${url}`, body).then(responseBody),
};

const Crawler = {
  crawl: (url: string, max_depth: number, max_pages: number) =>
    requests.post('/crawler/crawl', {url, max_depth, max_pages}),
  getHistory: () =>
    requests.get(`/crawler/history`),
};

export default {
  Crawler,
};
