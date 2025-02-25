import { z } from 'zod';

const SignInCredentialsSchema = z.object({
  username: z.string().email({ message: 'Please, provide a valid e-mail address.' }),
  password: z.string().min(1, { message: 'Please, provide your password.' }),
});

class SignInCredentialsDto {
  username: string;
  password: string;
}

export {
  SignInCredentialsSchema,
  SignInCredentialsDto,
}
