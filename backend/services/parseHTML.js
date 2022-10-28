import { parse } from 'node-html-parser';


function isLinkValid(linkHref) {
  // Check, if linkHref is not a href to html tag via id (e.g. #top)
  if (!linkHref || linkHref[0] === '#') {
    return false;
  }

  // Check if linkHref is not mailTo link, e.g. mailto:company@gmail.com
  if (linkHref.includes('mailto:')) {
    return false;
  }

  // Check if linkHref is not ending with pdf, png, jpg (we need to parse web pages, not static files):
  if (linkHref.includes('.jpg') || linkHref.includes('.png') || linkHref.includes('.pdf')) {
    return false;
  }

  return true;
}

function isLinkRelative(linkHref) {
  return linkHref[0] === '/';
}

export function ParseHTML(rawHTML, baseUrl) {
  const root = parse(rawHTML);

  // Get title text, if any
  let  title = "";
  try {
     title = root.querySelector('title').text;
  } catch(err){
    title = null;
  }


  // Get description text, if any
  let  description = "";
  try {
    description = root.querySelector('meta[name=description]').getAttribute('content');
  } catch(err){
    description = null;
  }

  // Get h1 text, if any
  let h1 = "";
  try {
    h1 = root.querySelector('h1').text;
  } catch (err) {
    h1 = null;
  }


  // Get h2 text, if any
  let h2= "";
  try {
    h2 = root.querySelector('h2').text;
  } catch (err) {
    h2 = null;
  }

  // get all links:
  let linksArray = [];
  try {
    const links = root.querySelectorAll('a');
    links.forEach(link => {
      const linkHref = link.getAttribute('href');

      // Check if Link is valid
      if (isLinkValid(linkHref)) {

        // If link is relative, we have to prepend baseUrl to it, because we need absolute in order to perform further crawling
        if (isLinkRelative(linkHref)) {
          linksArray.push(baseUrl + linkHref);
        } else {
          linksArray.push(linkHref);
        }
      }
    });
  } catch (err) {
    linksArray = null;
  }

  return { title, description, h1, h2, linksArray};
}
