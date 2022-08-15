# inbucket-js-client

Изначально [тут]("https://github.com/Xotabu4/inbucket-js-client/)

Simple API client for amazing https://www.inbucket.org/ service

TypeScript typings are included

Supported all base methods from https://github.com/jhillyerd/inbucket/wiki/REST-API :
- Get inbox
- Get message
- Get raw message source
- Delete message
- Pruge (wipe) inbox

Legacy methods are not supported

Small example:
```typescript
import { InbucketAPIClient } from ('./index.js')

const client = new InbucketAPIClient('http://192.168.1.1:9001/'); // your base url
const inbox = await client.mailbox('inboxname') 
const message = await client.message('inboxname', inbox[0].id)
await client.deleteMessage('inboxname', inbox[0].id)
```