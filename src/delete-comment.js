const stream = require('getstream');

// Load .env file
require('dotenv').config();

// Create a client
const getStreamClient = stream.connect(process.env.GET_STREAM_API_KEY, process.env.GET_STREAM_API_SECRET);

const deleteReaction = async (reactionId) => {
    return await getStreamClient.reactions.delete(reactionId);
}

const run = async ({ postId }) => {
    return await deleteReaction(postId);
}

const args = process.argv.slice(2);
if (args.length < 1) {
    console.log('Command requires 1 argument: <post-id>');
    process.exit(1);
}
const postId = args[0];

run({ postId })
    .then(resp => console.log('response', resp))
    .catch(err => {
        if (!err.response || !err.response.data) {
            throw err;
        }
        console.log('error', err.response.data)
    });
