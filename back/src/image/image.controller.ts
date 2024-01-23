import { UserService } from 'src/user/user.service';
import { Controller, Get, Param, Post, Query, Req } from "@nestjs/common";
import { ImageService } from "./image.service";
import { ApiParam, ApiProperty, ApiTags } from "@nestjs/swagger";
import { UpdateUserAndHealthInfoDto } from 'src/user/dto/UpdateUserAndHealthInfo.dto';

@ApiTags('image')
@Controller("image")
export class ImageController {
    constructor(
        private imageService: ImageService,
        private userService: UserService
    ) { }

    // presigned url for uploading food image
    @Post('/presigned-url/food/:filename')
    @ApiProperty( {description: "get presigned url for put"} )
    @ApiParam({ name: 'filename', type: 'string', description: 'Name of the file to upload' })
    async handleGetPresignedUrlForUploadFoodImg(@Param('filename') fileName: string) {
        const presinedUrl = await this.imageService.getPresignedUrlForPut(`food/${fileName}`);
        return presinedUrl;
    }

    // presigned url for uploading profile image
    @Post('/presigned-url/profile/:filename')
    @ApiProperty( {description: "get presigned url for put"} )
    @ApiParam({ name: 'filename', type: 'string', description: 'Name of the file to upload' })
    async handleGetPresignedUrlForUploadProfileImg(@Param('filename') fileName: string) {
        return this.imageService.getPresignedUrlForPut(`profile/${fileName}`);
    }

    // // 이미지 저장하기
    // @Post('food')
    // async handleSaveFoodImg() {
        
    // }

    // // 이미지 가져오기
    // @Get('food') 
    // async handleGetFoodImg {

    // }

    // // 이미지 수정하기
    // @Put('food') 
    // async handleModifyFoodImg {

    // }

    // // 이미지 삭제하기
    // @Delete('food') 
    // async handleDeleteFoodImg {

    // }
    
}