import { ApiProperty } from '@nestjs/swagger';
import {IsNotEmpty} from 'class-validator';
import {HttpEnum} from '../../common/enums/http.enum';

export class CreateNewsDto {

    @ApiProperty({
        type: String,
    })
    @IsNotEmpty({ message: '必须填写作者', context: HttpEnum.PARAMS_ERROR })
    readonly author: string;

    @ApiProperty({
        type: String,
    })
    @IsNotEmpty({ message: '必须填写标题', context: HttpEnum.PARAMS_ERROR })
    readonly title: string;

    @ApiProperty({
        type: String,
    })
    @IsNotEmpty({ message: '内容不能为空', context: HttpEnum.PARAMS_ERROR })
    readonly content: string;

}
