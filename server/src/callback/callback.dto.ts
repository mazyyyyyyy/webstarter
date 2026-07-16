import { IsOptional, IsString, MaxLength, Matches } from 'class-validator'

export class CallbackDto {
  @IsOptional()
  @IsString()
  @MaxLength(100)
  service?: string

  @IsOptional()
  @IsString()
  @MaxLength(120)
  branch?: string

  @IsString()
  @MaxLength(30)
  @Matches(/^[+\d\s()\-]{5,}$/, { message: 'Некорректный номер телефона' })
  phone: string

  // honeypot-поле: у настоящего пользователя всегда пустое
  @IsOptional()
  @IsString()
  @MaxLength(200)
  website?: string
}
