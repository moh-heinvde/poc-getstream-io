const stream = require('getstream');

require('dotenv').config();

// Create a client
const getStreamClient = stream.connect(process.env.GET_STREAM_API_KEY, process.env.GET_STREAM_API_SECRET);
// Note: getstream uses a feed per user, because we are using one main feed I am calling the "user" community
const communityFeed = 'community';
const channelName = 'general';

const getCommunityFeed = async () => {
    const feed = getStreamClient.feed(communityFeed, channelName);
    return await feed.get({ limit: 3, id_gt: '9a592348-4b7a-11f0-8401-06bdee72734b' });
}

getCommunityFeed().then(resp => console.log('response', resp));//.catch(err => console.log('error', err));
