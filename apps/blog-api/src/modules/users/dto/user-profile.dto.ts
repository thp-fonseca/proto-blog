import { ApiProperty } from '@nestjs/swagger';
import { RoleEnum } from '@workspace/acl';

export class ProfileDto {
  @ApiProperty({ example: 'John Doe', description: 'The name of the user' })
  name: string;

  @ApiProperty({ example: 'ADMIN', description: 'The role of the user', enum: RoleEnum })
  role: RoleEnum;

  @ApiProperty({ example: 'john.doe@example.com', description: 'The email of the user' })
  email: string;

  @ApiProperty({ example: '12345', description: 'The ID of the user' })
  id: string;

  @ApiProperty({ example: 'http://example.com/avatar.jpg', description: 'The avatar URL of the user', required: false })
  avatarUrl?: string;
}

export class UserProfileDto {
  @ApiProperty({ type: ProfileDto })
  user: ProfileDto;
}
