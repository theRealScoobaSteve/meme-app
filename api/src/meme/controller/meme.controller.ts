import { 
    Body, 
    Controller, 
    Get, 
    Param, 
    Post, 
    Req, 
    Res, 
    UseGuards, 
    UploadedFile, 
    StreamableFile,
    UseInterceptors 
} from '@nestjs/common';
import { join } from 'path';
import { Readable } from 'stream';
import { Repository } from 'typeorm';
import { createReadStream } from 'fs';
import { Meme } from '../entity/meme.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { JwtAuthGuard } from '../../auth/guard/jwt.guard';
import { FileInterceptor } from '@nestjs/platform-express';
import { MemeRepository } from '../repository/meme.repository';

interface GetImage extends ParameterDecorator {
    id: string;
}

@Controller('meme')
export class MemeController {
    constructor(
        private memeRepository: MemeRepository,
    ) {}

    @UseGuards(JwtAuthGuard)
    @Get('/all')
    async fetchAllMemes() {
        const memes: Array<Meme> = await this.memeRepository.findMemes();
        
        for (let meme of memes) {
            meme.user.password = null;
        }

        return memes;
    }

    @Get('/image/:id')
    async getMeme(@Param() params): Promise<StreamableFile> {
        const { path }: Meme = await this.memeRepository.findOne(parseInt(params.id));
        const readableFile: Readable = createReadStream(join(path));
        
        return new StreamableFile(readableFile);
    }

    @UseGuards(JwtAuthGuard)
    @Post('/')
    @UseInterceptors(FileInterceptor('meme', {
        dest: '/upload'
    }))
    async createMeme(
        @UploadedFile() file: Express.Multer.File, 
        @Body() body: any, 
        @Req() req
    ) {
        const meme = await this.memeRepository.create({
            name: body.name,
            fileName: file.filename,
            path: file.path,
            mimeType: file.mimetype,
            user: req.user
        });

        await this.memeRepository.save(meme);

        return {
            message: "Meme created"
        };
    }
    
}
