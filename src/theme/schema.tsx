import { z } from 'zod';

export const signUpSchema = z.object({
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(10, 'Username must be at most 10 characters'),
  email: z.string().email('Invalid email address'),
  password: z.string()
    .min(6, 'Password must be at least 6 characters')
    .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
    .regex(/[0-9]/, 'Password must contain at least one number'),
  phone: z.string()
    .min(10, 'Phone number must be at least 10 digits')
    .max(15, 'Phone number must be at most 15 digits'),
});

export const signInSchema = z.object({
  email: z.string().email('Invalid email').nonempty('Email is required'),
  password: z.string().min(1, 'Password is required'),
});

export const otpSchema = z.object({
  otp: z.string()
    .length(4, 'OTP must be exactly 4 digits')
    .regex(/^\d{4}$/, 'OTP must contain only numbers'),
});

export type SignUpFormData = z.infer<typeof signUpSchema>;
export type SignInFormData = z.infer<typeof signInSchema>;
export type OtpFormData = z.infer<typeof otpSchema>;
