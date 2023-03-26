import { Injectable } from '@nestjs/common';
import { anonymizeProxy } from 'proxy-chain'
import { ParserDBService } from 'src/db/parser/parser.service';

@Injectable()
export class ProxyService {
    constructor (
        private prisma: ParserDBService
    ) {}

    private _selectedProxy = ""
        
    async getProxyList() {
        const settings = await this.prisma.settings.findUnique({
            where: { id: process.env.BOT_ID }
        })

        if (settings === null) return []

        return settings.proxy.split("\n").map(c => c.trim()).filter(c => c.length !== 0)
    }

    async getFormatProxy(url: string) {
        return await anonymizeProxy(url);
    }

    async getProxy() {
        const proxyList = await this.getProxyList();

        if (proxyList.length === 0) return null
        if (proxyList.length === 1) return this.getFormatProxy("http://" + proxyList[0])

        const filteredproxyList = proxyList.filter(str => str !== this._selectedProxy);
        const randomIndex = Math.floor(Math.random() * filteredproxyList.length);

        this._selectedProxy = filteredproxyList[randomIndex]

        return this.getFormatProxy("http://" + this._selectedProxy)
    }
}