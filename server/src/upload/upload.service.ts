import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import * as uuid from 'uuid';
import * as sharp from 'sharp'

interface IFileOutputInfo {
    path: string;
    mediaType: string;
    width: number;
    height: number;
    aspectRatio: number;
}

@Injectable()
export class UploadService {
    async uploadImage(image: Express.Multer.File): Promise<IFileOutputInfo> {
        try {
            const imageName = uuid.v4() + '.jpg';

            const randomFolder = Math.floor(Math.random() * 256).toString(16).padStart(2, "0");
            const imageFolder = path.resolve(process.env.STATIC_FILES_PATH, randomFolder)

            const isPathExist = await this.exists(imageFolder)
            if (isPathExist === false) {
                await this.mkdir(imageFolder)
            }

            const imagePath = path.join(imageFolder, imageName);
            const info = await sharp(image.buffer).resize(2048).jpeg({ quality: 90 }).toFile(imagePath)

            return {
                path: imagePath,
                width: info.width,
                height: info.height,
                aspectRatio: info.width / info.height,
                mediaType: info.format
            }
        } catch (e) {
            throw new HttpException('Произошла ошибка при записи файла', HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    private async exists(path: string) {
        return new Promise((resolve, _) => {
            fs.access(path, function (error) {
                if (error) return resolve(false)

                return resolve(true)
            });
        })
    }
    private async mkdir(path: string) {
        return new Promise((resolve, reject) => {
            fs.mkdir(path, { recursive: true }, function (error) {
                console.log(error)
                if (error) return reject(error)

                return resolve(true)
            });
        })
    }

    private async writeFile(path: string, buffer: Buffer) {
        return new Promise((resolve, reject) => {
            fs.writeFile(path, buffer, function (error) {
                if (error) return reject(error)

                return resolve(true)
            });
        })
    }
}