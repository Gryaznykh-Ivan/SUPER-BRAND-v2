import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { access, mkdir, rm, unlink } from 'fs';
import { resolve, join } from 'path';
import { v4 as uuid } from 'uuid';
import * as sharp from 'sharp'
import { DeleteFileDto } from './dto/deleteFile.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { IResponse } from 'src/interfaces/response.interface';

@Injectable()
export class FilesService {
    private SIZES = [2048, 1000, 800, 600, 300, 200]

    async upload(files: Express.Multer.File[], quality: number): Promise<IResponse<{ path: string, src: string }[]>> {
        try {
            const result = []

            for (const file of files) {
                const fileName = uuid();

                const randomFolder1 = Math.floor(Math.random() * 256).toString(16).padStart(2, "0");
                const randomFolder2 = Math.floor(Math.random() * 256).toString(16).padStart(2, "0");
                const randomFolder3 = Math.floor(Math.random() * 256).toString(16).padStart(2, "0");
                const filePath = resolve(process.env.STATIC_FILES_PATH, randomFolder1, randomFolder2, randomFolder3, fileName)

                const isPathExist = await this.exists(filePath)
                if (isPathExist === false) {
                    await this.mkdir(filePath)
                }

                for (const size of this.SIZES) {
                    const path = join(filePath, `${size}.jpg`)
                    await sharp(file.buffer).resize(size).jpeg({ quality: quality }).toFile(path)
                }

                result.push({
                    path: filePath,
                    src: `/${randomFolder1}/${randomFolder2}/${randomFolder3}/${fileName}`,
                })
            }

            return { success: true, data: result }
        } catch (e) {
            throw new HttpException(e.message, HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async delete({ paths }: DeleteFileDto) {
        try {
            for (const path of paths) {
                await this.rm(path)
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