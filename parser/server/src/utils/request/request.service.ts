/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { ProxyService } from '../proxy/proxy.service';
import fetch, { RequestInit, Headers } from 'node-fetch'

const UserAgent = require('user-agents')

@Injectable()
export class RequestService {
    constructor(
        private proxy: ProxyService
    ) { }

    async getFetcher() {
        const proxyUrl = await this.proxy.createOrUpdateProxy()

        const headers = new Headers()
        const userAgent = new UserAgent({ deviceCategory: 'mobile' });
        headers.append('authority', 'stockx.com')
        headers.append('accept', '*/*')
        headers.append('accept-language', 'en-US,en;q=0.9')
        headers.append('user-agent', userAgent.toString())

        return this.fetch({
            method: 'GET',
            headers: headers,
            redirect: 'follow',
            agent: proxyUrl
        })
    }

    private async fetch(options: RequestInit) {
        return async (url: string) => fetch(url, options)
    }
}