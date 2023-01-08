import type { Response } from 'express';
import { HttpException, HttpStatus, Injectable, StreamableFile } from '@nestjs/common';
import { access, createReadStream, mkdir, rm, unlink } from 'fs';
import { resolve, join } from 'path';
import { v4 as uuid } from 'uuid';
import * as sharp from 'sharp'
import { DeleteFileDto } from './dto/deleteFile.dto';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FilesService {
    constructor(
        private readonly prisma: PrismaService
    ) { }

    private SIZES = [2048, 1000, 800, 600, 300, 200]

    async static(res: Response, folders: string, name: string, width = "800") {
        if (isNaN(+width) === true || this.SIZES.includes(+width) === false) {
            throw new HttpException("Неверный width параметр", HttpStatus.BAD_REQUEST)
        }

        const [n, e] = name.split(".")
        const path = join(process.env.STATIC_FILES_PATH, folders, `${n}_${width}.${e}`)

        const isExist = await this.exists(path)
        if (isExist === false) {
            throw new HttpException("Файл не найден", HttpStatus.NOT_FOUND)
        }

        const file = createReadStream(path);

        res.set({
            "Cache-Control": "public, max-age=31557600",
            "Content-Type": "image/jpeg",
            "Content-Disposition": "inline",
        })

        return new StreamableFile(file);
    }

    async upload(files: Express.Multer.File[], quality: number) {
        try {
            const result = []

            for (const file of files) {
                const fileName = uuid();

                const randomFolder1 = Math.floor(Math.random() * 256).toString(16).padStart(2, "0");
                const randomFolder2 = Math.floor(Math.random() * 256).toString(16).padStart(2, "0");
                const randomFolder3 = Math.floor(Math.random() * 256).toString(16).padStart(2, "0");
                const fileFolder = resolve(process.env.STATIC_FILES_PATH, randomFolder1, randomFolder2, randomFolder3)

                const isPathExist = await this.exists(fileFolder)
                if (isPathExist === false) {
                    await this.mkdir(fileFolder)
                }

                for (const size of this.SIZES) {
                    const filePath = join(fileFolder, `${fileName}_${size}.jpg`)
                    await sharp(file.buffer).resize(size).jpeg({ quality: quality }).toFile(filePath)
                    await this.prisma.image.create({
                        data: {
                            name: fileName,
                            path: filePath,
                            src: `/static/${randomFolder1}/${randomFolder2}/${randomFolder3}/${fileName}_${size}.jpg`
                        }
                    })
                }

                result.push({
                    name: fileName,
                    url: `/static/${randomFolder1}/${randomFolder2}/${randomFolder3}/${fileName}.jpg`,
                })
            }

            return { success: true, data: result }
        } catch (e) {
            throw new HttpException('Произошла ошибка во время записи файлов', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async delete({ items }: DeleteFileDto) {
        try {
            for (const item of items) {
                const files = await this.prisma.image.findMany({
                    where: { name: item }
                })
    
                for (const file of files) {
                    await this.unlink(file.path)
                    await this.prisma.image.delete({ where: { id: file.id } })
                }
            }

            return { success: true }
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    private async exists(path: string) {
        return new Promise((resolve, _) => {
            access(path, function (error) {
                if (error) return resolve(false)

                return resolve(true)
            });
        })
    }

    private async mkdir(path: string) {
        return new Promise((resolve, reject) => {
            mkdir(path, { recursive: true }, function (error) {
                if (error) return reject(error)

                return resolve(true)
            });
        })
    }

    private async unlink(path: string) {
        return new Promise((resolve, reject) => {
            unlink(path, function (error) {
                if (error) return reject(error)

                return resolve(true)
            });
        })
    }

    private async rm(path: string) {
        return new Promise((resolve, reject) => {
            rm(path, { recursive: true, force: true }, function (error) {
                if (error) return reject(error)

                return resolve(true)
            });
        })
    }
}