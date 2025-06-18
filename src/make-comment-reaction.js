const stream = require('getstream');

// Load .env file
require('dotenv').config();

// Create a client
const getStreamClient = stream.connect(process.env.GET_STREAM_API_KEY, process.env.GET_STREAM_API_SECRET);

const makeCommentReaction = async (commentId, reactionType) => {
    return await getStreamClient.reactions.addChild(reactionType, { id: commentId }, null, { userId: 'me' });
}
const run = async ({ commentId, reactionType }) => {
    // Create post
    return await makeCommentReaction(commentId, reactionType);
}

const args = process.argv.slice(2);
if (args.length < 2) {
    console.log('Command requires 2 arguments: <comment-id> <reaction-type>');
    process.exit(1);
}
const commentId = args[0];
const reactionType = args[1];

run({ commentId, reactionType })
    .then(resp => console.log('response', resp))
    .catch(err => {
        if (!err.response || !err.response.data) {
            throw err;
        }
        console.log('error', err.response.data)
    });
