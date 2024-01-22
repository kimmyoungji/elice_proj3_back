import { Controller, Post } from "@nestjs/common";
import { ApiTags, ApiOperation, ApiCreatedResponse } from "@nestjs/swagger";
import { UserService } from "./user.service";

@Controller("user")
@ApiTags("User API")
export class UserController {
  constructor(private userService: UserService) {}

  // @Post()
  // @ApiOperation({ summary: 'User 생성 API', description: '유저를 추가한다.'})
  // @ApiCreatedResponse({ description: '유저를 추가한다.', type: User })
}
