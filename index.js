"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InbucketAPIClient = void 0;
/**
 * https://github.com/jhillyerd/inbucket/wiki/REST-API
 */
class InbucketAPIClient {
    baseUrl;
    requestInitDefault;
    /**
     * @param baseUrl string - http://your.host.com/
     * @param requestInitDefault pass additional RequestInit options that will be used for fetch requests
     * https://developer.mozilla.org/en-US/docs/Web/API/RequestInit
     */
    constructor(baseUrl, requestInitDefault = { headers: {} }) {
        this.baseUrl = baseUrl;
        this.requestInitDefault = requestInitDefault;
    }
    async doRequest(path, requestInit) {
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
            throw new Error(`[inbucket-js-client] request error: ${response.status} ${await response.text()}`);
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
    async mailbox(name) {
        return this.doRequest(`/api/v1/mailbox/${name}`, { method: "GET" });
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
    async prugeMailbox(name) {
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
    async purgeMailbox(name) {
        return this.doRequest(`/api/v1/mailbox/${name}`, { method: "DELETE" });
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
        return this.doRequest(`/api/v1/mailbox/${name}/${id}`, { method: "GET" });
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
        return this.doRequest(`/api/v1/mailbox/${name}/${id}/source`, {
            method: "GET",
        });
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
        return this.doRequest(`/api/v1/mailbox/${name}/${id}`, {
            method: "DELETE",
        });
    }
}
exports.InbucketAPIClient = InbucketAPIClient;
