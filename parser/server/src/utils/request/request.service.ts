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
    
    private getRandomBetween(min: number, max: number) {
        return Math.floor(Math.random() * (max - min) + min)
    }

    async getFetcher() {
        const proxyUrl = await this.proxy.createOrUpdateProxy()

        const headers = new Headers()
        const userAgent = new UserAgent({ deviceCategory: 'mobile' });
        headers.append('authority', 'stockx.com')
        headers.append('accept', '*/*')
        headers.append('accept-language', 'en-US,en;q=0.9')
        headers.append('user-agent', userAgent.toString())

        // for perimeterX
        const r3_16 = this.getRandomBetween(0, 4095).toString(16).padEnd(3, "0")
        const r4_16 = this.getRandomBetween(0, 65535).toString(16).padEnd(4, "0")
        headers.append('cookie', `_pxvid=${r4_16}${r4_16}-${r4_16}-11ed-8${r3_16}-${r4_16}${r4_16}${r4_16}`)

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