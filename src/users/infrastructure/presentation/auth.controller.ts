import { Controller } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('AuthController')
@Controller('auth')
export class AuthController {}
