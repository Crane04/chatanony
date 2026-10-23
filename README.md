# chatanony

Anonymous group chat: create a group, share the link, chat. No accounts.
React + Vite, running on the [chatanony SDK](https://github.com/Crane04/chatanony-sdk).

## Run locally

```bash
npm install
cp .env.example .env   # VITE_CHATANONY_KEY=<public key from the chatanony dashboard>
npm run dev
```

The chatanony project behind the key needs three optional `string` fields in its message
schema: `message`, `image` and `replied`.

`package.json` currently installs the SDK from a sibling folder (`file:../library`).
Once the SDK is published to npm, change it to a version, e.g. `"chatanony": "^0.1.0"`.
