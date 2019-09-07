const agent = require('superagent');
const statusCode = require('http-status-codes');
const chai = require('chai');

const { expect } = chai;

async function getToken() {
  const auth = Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64');
  const response = await agent
    .post('https://accounts.spotify.com/api/token')
    .set('Content-Type', 'application/x-www-form-urlencoded')
    .set('Authorization', `Basic ${auth}`)
    .send('grant_type=client_credentials');
  return response;
}

describe('Spotify Api Test', () => {
  it('Auth test', async () => {
    const response = await getToken();
    expect(response.status).to.equal(statusCode.OK);
    expect(response.body).to.have.property('access_token');
  });

  it('Search test', async () => {
    const query = {
      q: 'Till I Collapse',
      type: 'track'
    };

    const getAuth = await getToken();
    const response = await agent
      .get('https://api.spotify.com/v1/search')
      .set('Authorization', `Bearer ${getAuth.body.access_token}`)
      .query(query);

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body.tracks.items.length).to.equal(20);
  });
});
