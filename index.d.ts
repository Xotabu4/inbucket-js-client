/// <reference types="request" />
import * as request from 'request-promise-native';
/**
 * https://github.com/jhillyerd/inbucket/wiki/REST-API
 */
export declare class InbucketAPIClient {
    protected baseUrl: string;
    protected options: request.RequestPromiseOptions;
    /**
     * @param baseUrl string - http://your.host.com/
     * @param options pass request-promise options to override default
     */
    constructor(baseUrl: string, options?: request.RequestPromiseOptions);
    protected defaults(): import("request").RequestAPI<request.RequestPromise<any>, request.RequestPromiseOptions, import("request").RequiredUriUrl>;
    /**
     * List contents of mailbox.
     *
     * GET /api/v1/mailbox/{name}
     *
     * https://github.com/jhillyerd/inbucket/wiki/REST-GET-mailbox
     * @param name - mailbox name
     */
    mailbox(name: string): Promise<PreviewMessageModel[]>;
    /**
     * Purge contents of mailbox.
     *
     * DELETE /api/v1/mailbox/{name}
     *
     * https://github.com/jhillyerd/inbucket/wiki/REST-DELETE-mailbox
     * @param name - mailbox name
     */
    purgeMailbox(name: string): Promise<string>;
    /**
     * Retrieve parsed message body
     * GET /api/v1/mailbox/{name}/{id}
     *
     * https://github.com/jhillyerd/inbucket/wiki/REST-GET-message
     * @param name - mailbox name
     * @param id - message id
     */
    message(name: string, id: string): Promise<MessageModel>;
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
    messageSource(name: string, id: string): Promise<string>;
    /**
     *
     * DELETE /api/v1/mailbox/{name}/{id}
     *
     * https://github.com/jhillyerd/inbucket/wiki/REST-DELETE-message
     * @param name - mailbox name
     * @param id - message id
     * @returns "OK"
     */
    deleteMessage(name: string, id: string): Promise<string>;
}
export interface PreviewMessageModel {
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
        "Date": string[];
        "From": string[];
        "Mime-Version": string[];
        "Subject": string[];
        "To": string[];
    };
    attachments: {
        "filename": string;
        "content-type": string;
        "download-link": string;
        "view-link": string;
        "md5": string;
    }[];
}
