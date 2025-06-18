const stream = require('getstream');

// Load .env file
require('dotenv').config();

// Create a client
const getStreamClient = stream.connect(process.env.GET_STREAM_API_KEY, process.env.GET_STREAM_API_SECRET);

const deleteReaction = async (reactionId) => {
    return await getStreamClient.reactions.delete(reactionId);
}

const run = async ({ reactionId }) => {
    return await deleteReaction(reactionId);
}

const args = process.argv.slice(2);
if (args.length < 1) {
    console.log('Command requires 1 argument: <post-id>');
    process.exit(1);
}
const reactionId = args[0];

run({ reactionId })
    .then(resp => console.log('response', resp))
    .catch(err => {
        if (!err.response || !err.response.data) {
            throw err;
        }
        console.log('error', err.response.data)
    });
