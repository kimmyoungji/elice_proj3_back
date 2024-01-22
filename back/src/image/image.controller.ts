import { Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ImageService } from "./image.service";
import { ApiParam, ApiProperty, ApiTags } from "@nestjs/swagger";

@ApiTags('image')
@Controller("image")
export class ImageController {
    constructor(private imageService: ImageService) { }

    // get presigned url for downloading image
    @Post('/presigned-url/download/:filename')
    @ApiProperty( {description: "get presigned url for put"} )
    @ApiParam({ name: 'filename', type: 'string', description: 'Name of the file to download' })
    async getPresignedUrlForDownload(@Param('filename') fileName: string) {
        return this.imageService.getPresignedUrlForPut(fileName);
    }

    // presigned url for uploading image
    @Post('/presigned-url/upload/:filename')
    @ApiProperty( {description: "get presigned url for put"} )
    @ApiParam({ name: 'filename', type: 'string', description: 'Name of the file to upload' })
    async getPresignedUrlForUpload(@Param('filename') fileName: string) {
        return this.imageService.getPresignedUrlForPut(fileName);
    }
    
}