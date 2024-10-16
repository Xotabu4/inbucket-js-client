/**
 * https://github.com/jhillyerd/inbucket/wiki/REST-API
 */
export class InbucketAPIClient {
  /**
   * @param baseUrl string - http://your.host.com/
   * @param requestInitDefault pass additional RequestInit options that will be used for fetch requests
   * https://developer.mozilla.org/en-US/docs/Web/API/RequestInit
   */
  constructor(
    protected baseUrl: string,
    protected requestInitDefault: RequestInit = { headers: {} }
  ) {}

  private async doRequest(path: string, requestInit: RequestInit) {
    const fullUrl = new URL(path, this.baseUrl).toString();
    const response = await fetch(fullUrl, {
      ...this.requestInitDefault,
      ...requestInit,
      headers: {
        ...this.requestInitDefault.headers,
        ...requestInit.headers,
      },
    });
    if (!response.ok) {
      throw new Error(
        `[inbucket-js-client] request error: ${
          response.status
        } ${await response.text()}`
      );
    }

    return response.json();
  }
  /**
   * List contents of mailbox.
   *
   * GET /api/v1/mailbox/{name}
   *
   * https://github.com/jhillyerd/inbucket/wiki/REST-GET-mailbox
   * @param name - mailbox name
   */
  async mailbox(name: string): Promise<PreviewMessageModel[]> {
    return this.doRequest(`/api/v1/mailbox/${name}`, { method: "GET" }) as Promise<PreviewMessageModel[]>;
  }

  /**
   * Purge contents of mailbox.
   *
   * DELETE /api/v1/mailbox/{name}
   *
   * https://github.com/jhillyerd/inbucket/wiki/REST-DELETE-mailbox
   * @param name - mailbox name
   * @deprecated use prugeMailbox (typo)
   */
  async prugeMailbox(name: string): Promise<string> {
    return this.purgeMailbox(name);
  }

  /**
   * Purge contents of mailbox.
   *
   * DELETE /api/v1/mailbox/{name}
   *
   * https://github.com/jhillyerd/inbucket/wiki/REST-DELETE-mailbox
   * @param name - mailbox name
   */
  async purgeMailbox(name: string): Promise<string> {
    return this.doRequest(`/api/v1/mailbox/${name}`, { method: "DELETE" }) as Promise<string>;
  }

  /**
   * Retrieve parsed message body
   * GET /api/v1/mailbox/{name}/{id}
   *
   * https://github.com/jhillyerd/inbucket/wiki/REST-GET-message
   * @param name - mailbox name
   * @param id - message id
   */
  async message(name: string, id: string): Promise<MessageModel> {
    return this.doRequest(`/api/v1/mailbox/${name}/${id}`, { method: "GET" }) as Promise<MessageModel>;
  }

  /**
   * Retrieve unparsed message source
   *
   * Output
   * Plain text dump of the message headers and body in SMTP format.
   *
   * GET /api/v1/mailbox/{name}/{id}/source
   *
   * https://github.com/jhillyerd/inbucket/wiki/REST-GET-message-source
   * @param name - mailbox name
   * @param id - message id
   */
  async messageSource(name: string, id: string): Promise<string> {
    return this.doRequest(`/api/v1/mailbox/${name}/${id}/source`, {
      method: "GET",
    }) as Promise<string>;
  }

  /**
   *
   * DELETE /api/v1/mailbox/{name}/{id}
   *
   * https://github.com/jhillyerd/inbucket/wiki/REST-DELETE-message
   * @param name - mailbox name
   * @param id - message id
   * @returns "OK"
   */
  async deleteMessage(name: string, id: string): Promise<string> {
    return this.doRequest(`/api/v1/mailbox/${name}/${id}`, {
      method: "DELETE",
    }) as Promise<string>;
  }
}

export interface PreviewMessageModel {
  // "mailbox": "swaks",
  // "id": "20131015T161202-0000",
  // "from": "jamehi03@server.com",
  // "subject": "Swaks Plain Text",
  // "date": "2013-10-15T16:12:02.231532239-07:00",
  // "size": 264
  mailbox: string;
  id: string;
  from: string;
  subject: string;
  date: string;
  size: number;
}

export interface MessageModel {
  /**
"mailbox": "swaks",
    "id": "20131016T164638-0001",
    "from": "jamehi03@server.com",
    "subject": "Swaks HTML",
    "date": "2013-10-16T16:46:38.646370568-07:00",
    "size": 705,
    "body": {
        "text": "This is a test mailing.\r\n\r\nThis should be clickable: http://google.com/\r\n",
        "html": "<html>\n<body>\n<p>This is a test mailing <b>in HTML</b></p>\n\n<p>This should be clickable: [...]"
    },
    "header": {
        "Content-Type": [
            "multipart/alternative; boundary=\"----=_MIME_BOUNDARY_000_62717\""
        ],
        "Date": [
            "Wed, 16 Oct 2013 16:46:38 -0700"
        ],
        "From": [
            "jamehi03@server.com"
        ],
        "Mime-Version": [
            "1.0"
        ],
        "Subject": [
            "Swaks HTML"
        ],
        "To": [
            "swaks@inbucket.local"
        ]
    },
    "attachments": [
        {
            "filename": "favicon.png",
            "content-type": "image/png",
            "download-link": "http://localhost:9000/mailbox/dattach/swaks/20131016T164638-0001/0/favicon.png",
            "view-link": "http://localhost:9000/mailbox/vattach/swaks/20131016T164638-0001/0/favicon.png",
            "md5": "a72a7565b6b6587ac15fc35746307d0e"
        }
    ]
     */

  mailbox: string;
  id: string;
  from: string;
  subject: string;
  date: string;
  size: number;
  body: {
    text: string;
    html: string;
  };
  header: {
    "Content-Type": string[];
    Date: string[];
    From: string[];
    "Mime-Version": string[];
    Subject: string[];
    To: string[];
  };
  attachments: {
    filename: string;
    "content-type": string;
    "download-link": string;
    "view-link": string;
    md5: string;
  }[];
}