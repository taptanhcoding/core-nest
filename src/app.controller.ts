import { Body, Controller, Get, Param, ParseFilePipeBuilder, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { AppService } from './app.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { extname, join } from 'path'
import { readFileSync } from 'fs';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  // @Get('uploads/:file-name')
  // getHello(
  //   @Param('file-name') fileName: string
  // ) {
  //   console.log(fileName);
    
  //   let file = readFileSync(join(__dirname,'..','src','uploads',fileName)).buffer
  //   console.log(file);
    
  //   return file;
  // }

  @UseInterceptors(FileInterceptor('file',
    {
      storage: diskStorage({
        destination: function (req, file, cb) {
          cb(null, join(__dirname,'..','src','uploads'))
        },
        filename: (req, file, cb) => {
          const randomName = Array(32).fill(null).map(() => (Math.round(Math.random() * 16)).toString(16)).join('')
          //Calling the callback passing the random name generated with the original extension name
          cb(null, `${randomName}${extname(file.originalname)}`)
        }
      })
    }))
  @Post('file')
  uploadFile(
    @Body() body: any,
    @UploadedFile() file: Express.Multer.File,
  ) {

    console.log('file', file);

    return {
      body,
      file: "uploads/"+ file.filename,
    };
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('file/pass-validation')
  uploadFileAndPassValidation(
    @Body() body: any,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'json',
        })
        .build({
          fileIsRequired: false,
        }),
    )
    file?: Express.Multer.File,
  ) {
    return {
      body,
      file: file?.buffer.toString(),
    };
  }

  @UseInterceptors(FileInterceptor('file'))
  @Post('file/fail-validation')
  uploadFileAndFailValidation(
    @Body() body: any,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpg',
        })
        .build(),
    )
    file: Express.Multer.File,
  ) {
    return {
      body,
      file: file.buffer.toString(),
    };
  }
}
