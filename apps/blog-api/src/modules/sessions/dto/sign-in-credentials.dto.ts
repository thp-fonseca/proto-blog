import { z } from 'zod';

const SignInCredentialsSchema = z.object({
  email: z.string().email({ message: 'Please, provide a valid e-mail address.' }),
  password: z.string().min(1, { message: 'Please, provide your password.' }),
});

class SignInCredentialsDto {
  email: string;
  password: string;
}

export {
  SignInCredentialsSchema,
  SignInCredentialsDto,
}
