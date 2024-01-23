import { Controller, Get, Param, Post, Query } from "@nestjs/common";
import { ImageService } from "./image.service";
import { ApiParam, ApiProperty, ApiTags } from "@nestjs/swagger";

@ApiTags('image')
@Controller("image")
export class ImageController {
    constructor(private imageService: ImageService) { }

    // presigned url for uploading food image
    @Post('/presigned-url/upload/food/:filename')
    @ApiProperty( {description: "get presigned url for put"} )
    @ApiParam({ name: 'filename', type: 'string', description: 'Name of the file to upload' })
    async handleGetPresignedUrlForFoodImg(@Param('filename') fileName: string) {
        return this.imageService.getPresignedUrlForPut(fileName);
    }

    // presigned url for uploading profile image
    @Post('/presigned-url/upload/profile/:filename')
    @ApiProperty( {description: "get presigned url for put"} )
    @ApiParam({ name: 'filename', type: 'string', description: 'Name of the file to upload' })
    async handleGetPresignedUrlForProfileImg(@Param('filename') fileName: string) {
        return this.imageService.getPresignedUrlForPut(fileName);
    }
    
}