import { Type } from 'class-transformer'
import { IsArray, IsString, MaxLength, Matches, ValidateNested, ArrayMaxSize } from 'class-validator'

export class PriceColumnItemDto {
  // Только допустимые поля модели PriceRow
  @IsString()
  @Matches(/^col[0-5]$/, { message: 'colKey должен быть col0..col5' })
  colKey: string

  @IsString()
  @MaxLength(120)
  label: string
}

export class ReplaceColumnsDto {
  @IsArray()
  @ArrayMaxSize(6)
  @ValidateNested({ each: true })
  @Type(() => PriceColumnItemDto)
  columns: PriceColumnItemDto[]
}
