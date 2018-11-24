"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const request = require("request-promise-native");
/**
 * https://github.com/jhillyerd/inbucket/wiki/REST-API
 */
class InbucketAPIClient {
    /**
     * @param baseUrl string - http://your.host.com/
     * @param options pass request-promise options to override default
     */
    constructor(baseUrl, options = {}) {
        this.baseUrl = baseUrl;
        this.options = options;
    }
    defaults() {
        return request.defaults(Object.assign({
            baseUrl: this.baseUrl,
            json: true
        }, this.options));
    }
    /**
     * List contents of mailbox.
     *
     * GET /api/v1/mailbox/{name}
     *
     * https://github.com/jhillyerd/inbucket/wiki/REST-GET-mailbox
     * @param name - mailbox name
     */
    async mailbox(name) {
        const resp = this.defaults().get(`/api/v1/mailbox/${name}`);
        return resp;
    }
    /**
     * Purge contents of mailbox.
     *
     * DELETE /api/v1/mailbox/{name}
     *
     * https://github.com/jhillyerd/inbucket/wiki/REST-DELETE-mailbox
     * @param name - mailbox name
     */
    async prugeMailbox(name) {
        const resp = this.defaults().delete(`/api/v1/mailbox/${name}`);
        return resp;
    }
    /**
     * Retrieve parsed message body
     * GET /api/v1/mailbox/{name}/{id}
     *
     * https://github.com/jhillyerd/inbucket/wiki/REST-GET-message
     * @param name - mailbox name
     * @param id - message id
     */
    async message(name, id) {
        const resp = this.defaults().get(`/api/v1/mailbox/${name}/${id}`);
        return resp;
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
    async messageSource(name, id) {
        const resp = this.defaults().get(`/api/v1/mailbox/${name}/${id}/source`);
        return resp;
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
    async deleteMessage(name, id) {
        const resp = this.defaults().delete(`/api/v1/mailbox/${name}/${id}`);
        return resp;
    }
}
exports.InbucketAPIClient = InbucketAPIClient;
