const stream = require('getstream');

// Load .env file
require('dotenv').config();

// Create a client
const getStreamClient = stream.connect(process.env.GET_STREAM_API_KEY, process.env.GET_STREAM_API_SECRET);

const getPost = async (postId) => {
    const { results: posts = [] } = await getStreamClient.getActivities({
        ids: [postId],
        limit: 1,
        reactions: {
            own: true,
            counts: true,
        },
    });
    if (!posts.length) {
        console.log('Post not found');
        return null;
    }
    const [ { own_reactions: reactions, reaction_counts: reactionCounts, ...post} ] = posts;
    return {
        ...post,
        comments: reactions.comment,
        reactionCounts,
    }
}

const run = async ({ postId }) => {
    return await getPost(postId);
}

const args = process.argv.slice(2);
if (args.length < 1) {
    console.log('Command requires 1 argument: <post-id>');
    process.exit(1);
}
const postId = args[0];

run({ postId }).then(resp => console.log('response', resp));//.catch(err => console.log('error', err));
