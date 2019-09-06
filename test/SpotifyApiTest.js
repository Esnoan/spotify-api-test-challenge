const agent = require('superagent');
const statusCode = require('http-status-codes');
const chai = require('chai');

const { expect } = chai;

describe('Spotify Api Test', () => {
  it('Auth test', async () => {
    // Client Credentials Flow
    const auth = Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64');
    const response = await agent
      .post('https://accounts.spotify.com/api/token')
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Authorization', `Basic ${auth}`)
      .send('grant_type=client_credentials');

    expect(response.status).to.equal(statusCode.OK);
    expect(response.body).to.have.property('access_token');
  });
});
