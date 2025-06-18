const stream = require('getstream');

// Load .env file
require('dotenv').config();

// Create a client
const getStreamClient = stream.connect(process.env.GET_STREAM_API_KEY, process.env.GET_STREAM_API_SECRET);
// Note: getstream uses a feed per user, because we are using one main feed I am calling the "user" community
const communityFeed = 'community';
const channelName = 'general';

const getChannel = (channelName) => getStreamClient.feed(communityFeed, channelName);
const makePost = async (channelName, postToMake) => {
    const channel = getChannel(channelName);
    return await channel.addActivity(postToMake);
}

const run = async ({ message }) => {
    // Create post
    const postToMake = {
        actor: 'Me',
        verb: 'post',
        object: `uniqueid:${Date.now()}`,
        ...{
            this: 'can',
            be: 'anything',
            nested: { whoo: 'whoo' },
            message,
        },
    };

    // Post to channel
    const postedResult = await makePost(channelName, postToMake);

    console.log(postedResult);
}

const args = process.argv.slice(2);
const message = args.join(' ') || 'No message provided';

run({ message }).then(resp => console.log('response', resp));//.catch(err => console.log('error', err));
