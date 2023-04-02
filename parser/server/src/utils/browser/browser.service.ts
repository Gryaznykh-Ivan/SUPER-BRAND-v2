/* eslint-disable @typescript-eslint/no-var-requires */
import { Builder, WebDriver } from 'selenium-webdriver'
import { ServiceBuilder, Options } from 'selenium-webdriver/chrome'
import { Injectable } from '@nestjs/common';
import { ProxyService } from '../proxy/proxy.service';


@Injectable()
export class BrowserService {
    constructor(
        private proxy: ProxyService
    ) { }

    private _browser: WebDriver = null

    async createOrUpdateBrowser() {
        if (this._browser !== null && this._browser.getSession() !== null) {
            try {
                await this._browser.quit()
            } catch (e) { }
        }

        const service = new ServiceBuilder(/* process.env.WEBDRIVER_PATH */);
        const options = new Options()//.setChromeBinaryPath(process.env.CHROME_BINARY_PATH)

        const proxyUrl = await this.proxy.getProxy()
        if (proxyUrl !== null) {
            options.addArguments(`--proxy-server=${proxyUrl}`)
        }

        this._browser = new Builder()
            .forBrowser('chrome')
            .setChromeOptions(options)
            .setChromeService(service)
            .build();

        return this._browser
    }
}