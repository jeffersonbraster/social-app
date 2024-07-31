import { z } from 'zod'

const requiredString = z.string().trim().min(1, "Campo obrigatório")

export const signUpSchema = z.object({
  email: requiredString.email("Email inválido"),
  username: requiredString.regex(/^[a-zA-Z0-9_-]+$/, "Somente letras, números, hífens e underlines"),
  password: requiredString.min(8, "Mínimo de 8 caracteres"),
})

export type SignUpValues = z.infer<typeof signUpSchema>

export const loginSchema = z.object({
  username: requiredString,
  password: requiredString,
})

export type LoginValues = z.infer<typeof loginSchema>

export const createPostSchema = z.object({
  content: requiredString,
})