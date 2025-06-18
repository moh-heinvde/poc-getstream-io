const stream = require('getstream');

// Load .env file
require('dotenv').config();

// Create a client
const getStreamClient = stream.connect(process.env.GET_STREAM_API_KEY, process.env.GET_STREAM_API_SECRET);

const makeComment = async (postId, message) => {
    return await getStreamClient.reactions.add(
        "comment",
        postId,
        { text: message },
        { userId: 'me' },
    );
}
const run = async ({ postId, message }) => {
    // Create post
    return await makeComment(postId, message);
}

const args = process.argv.slice(2);
if (args.length < 2) {
    console.log('Command requires 2 arguments: <post-id> <comment>');
    process.exit(1);
}
const postId = args[0];
const message = args.slice(1).join(' ');

run({ postId, message }).then(resp => console.log('response', resp)).catch(err => {
    if (!err.response || !err.response.data) {
        throw err;
    }
    console.log('error', err.response.data)
});
