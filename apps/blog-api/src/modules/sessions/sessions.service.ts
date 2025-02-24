import { Injectable } from '@nestjs/common';
import { SignInCredentialsDto } from './dto/sign-in-credentials.dto';

@Injectable()
export class SessionsService {
  constructor() {}

  async signinWithPassword(credentials: SignInCredentialsDto) {
    // Implement logic for password-based authentication
    // Return the user's session token
    console.log(credentials)
    return {token: 'SESSION_TOKEN'};
  }
}
