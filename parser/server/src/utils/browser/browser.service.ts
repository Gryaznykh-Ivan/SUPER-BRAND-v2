/* eslint-disable @typescript-eslint/no-var-requires */
import { Injectable } from '@nestjs/common';
import { executablePath } from 'puppeteer';
import { ProxyService } from '../proxy/proxy.service';

const puppeteer = require('puppeteer-extra');
const StealthPlugin = require("puppeteer-extra-plugin-stealth");

@Injectable()
export class BrowserService {
    constructor(
        private proxy: ProxyService
    ) { }

    private _browser = null

    async createOrUpdateBrowser() {
        if (this._browser !== null) {
            await this._browser.close()
        }

        puppeteer.use(StealthPlugin())

        const args = [
            '--no-sandbox',
            '--disable-setuid-sandbox'
        ]

        const proxyUrl = await this.proxy.getProxy()
        if (proxyUrl !== null) {
            args.push(`--proxy-server=${proxyUrl}`)
        }

        console.log(executablePath())

        this._browser = await puppeteer.launch({
            headless: false,
            executablePath: executablePath(),
            args,
        });

        return this._browser
    }
}