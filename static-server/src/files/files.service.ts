import type { Response } from 'express';
import { HttpException, HttpStatus, Injectable, StreamableFile } from '@nestjs/common';
import { access, createReadStream, mkdir, rm, unlink } from 'fs';
import { resolve, join } from 'path';
import { v4 as uuid } from 'uuid';
import * as sharp from 'sharp'
import { DeleteFileDto } from './dto/deleteFile.dto';

@Injectable()
export class FilesService {
    private SIZES = [2048, 1200, 800, 400]

    async static(res: Response, url: string) {
        const path = join(process.env.STATIC_FILES_PATH, url)
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

    async upload(files: Express.Multer.File[]) {
        for (const file of files) {
            if (file.mimetype.startsWith('image') === false) {
                throw new HttpException('Загружать можно только картинки', HttpStatus.BAD_REQUEST)
            }
        }

        try {
            const result = []

            for (const file of files) {
                const fileFolderName = uuid();

                const randomFolder1 = Math.floor(Math.random() * 256).toString(16).padStart(2, "0");
                const randomFolder2 = Math.floor(Math.random() * 256).toString(16).padStart(2, "0");
                const randomFolder3 = Math.floor(Math.random() * 256).toString(16).padStart(2, "0");
                const fileFolder = resolve(process.env.STATIC_FILES_PATH, randomFolder1, randomFolder2, randomFolder3, fileFolderName)

                const isPathExist = await this.exists(fileFolder)
                if (isPathExist === false) {
                    await this.mkdir(fileFolder)
                }

                for (const size of this.SIZES) {
                    const filePath = join(fileFolder, `${size}.jpg`)
                    await sharp(file.buffer).resize(size).jpeg({ quality: 80 }).toFile(filePath)
                }

                result.push({
                    name: fileFolderName,
                    path: fileFolder,
                    url: `/static/${randomFolder1}/${randomFolder2}/${randomFolder3}/${fileFolderName}`,
                })
            }

            return { success: true, data: result }
        } catch (e) {
            throw new HttpException('Произошла ошибка во время записи файлов', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async delete({ path }: DeleteFileDto) {
        try {
            const isPathExist = await this.exists(path)
            if (isPathExist === false) {
                throw new HttpException('Такого пути не существует', HttpStatus.BAD_REQUEST)
            }

            await this.rm(path)

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