
# Proof of Concept (getstream.io)

This project is a basic proof of concept that we can use getstream.io to handle our Community component for the mindful system.

This project is set up as follows
 - A new feed group was created on the dashboard called "Community"
 - Only one channel, called `general`, is available and used throughout the application
 - All interactions with the feed will retrieve/create/react/etc. posts/comments/reactions made to the `general` channel

## Requirements

 - Node 20 and NPM
 - getstream.io account with API configuration

## Configure

```bash
cp .env.template .env
```

Add API credentials to the variables in the `.env` file

## Install

```bash
npm i
```

## Commands

### Make a post

Make a post to the `general` channel's feed.

```bash
npm run make-post [message]
```

Example
```bash
npm run make-post Hello World!
```

### Get feed

Returns the feed for the `general` channel

```bash
npm run get-feed
```

### Get post

Returns a post by id

```bash
npm run get-post <post-id>
```

### Make comment

Make a comment on a post

```bash
npm run make-comment <post-id> [comment]
```

Example

```bash
npm run make-comment some-uuid Yay my comment!
```

### Delete post

Delete a post by id

```bash
npm run delete-post <post-id>
```

### Delete comment

Delete a comment by id

```bash
npm run delete-comment <comment-id>
```

### Make reaction on post

Make a new reaction to a post where `reaction-type` is something like `like`

```bash
npm run make-reaction <post-id> <reaction-type>
```

### Delete reaction

Deletes a existing reaction for a post by reaction id

```bash
npm run make-reaction <reaction-id>
```

### Make reaction on comment

Make a new reaction to a comment where `reaction-type` is something like `like`

```bash
npm run make-reaction <comment-id> <reaction-type>
```
