// netlify/functions/contact-info.js
//
// Serves the real phone number and email ONLY when explicitly requested by a
// click on the page (see revealContact() in the resume HTML). The values live
// only in Netlify's environment variables — never in the static HTML/JS — so
// scrapers that just read page source (which is how virtually all data
// brokers and spam-list bots work) find nothing to harvest.

exports.handler = async (event) => {
  if (event.httpMethod !== 'GET') {
    return { statusCode: 405, body: JSON.stringify({ error: 'Method not allowed' }) };
  }

  const phone = process.env.CONTACT_PHONE;
  const email = process.env.CONTACT_EMAIL;

  if (!phone || !email) {
    return { statusCode: 500, body: JSON.stringify({ error: 'Contact info not configured on server' }) };
  }

  return {
    statusCode: 200,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ phone, email })
  };
};
