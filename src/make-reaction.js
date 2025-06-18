const stream = require('getstream');

// Load .env file
require('dotenv').config();

// Create a client
const getStreamClient = stream.connect(process.env.GET_STREAM_API_KEY, process.env.GET_STREAM_API_SECRET);

const makeReaction = async (postId, reactionType) => {
    return await getStreamClient.reactions.add(
        reactionType,
        postId,
        {},
        { userId: 'me' },
    );
}
const run = async ({ postId, reactionType }) => {
    // Create post
    return await makeReaction(postId, reactionType);
}

const args = process.argv.slice(2);
if (args.length < 2) {
    console.log('Command requires 2 arguments: <post-id> <comment>');
    process.exit(1);
}
const postId = args[0];
const reactionType = args[1];

run({ postId, reactionType })
    .then(resp => console.log('response', resp))
    .catch(err => {
        if (!err.response || !err.response.data) {
            throw err;
        }
        console.log('error', err.response.data)
    });
