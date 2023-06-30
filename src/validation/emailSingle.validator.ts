import { Injectable } from "@nestjs/common";
import { UserRepository } from "src/user/user.respository";
import {ValidationArguments, ValidationOptions, ValidatorConstraint, ValidatorConstraintInterface, registerDecorator} from "class-validator"

@Injectable()
@ValidatorConstraint({ async: true})
export class EmailSingleValidator implements ValidatorConstraintInterface {
         
    constructor(private userRepository: UserRepository) {}

    async validate(value: any, validationArguments?: ValidationArguments): Promise<boolean> {
        const existingEmail = await this.userRepository.thereEmail(value);

        return !existingEmail
    }
}

export const EmailSingle= (validationOptions: ValidationOptions) => {
    return (obj: Object, prop: string) => {
        registerDecorator({
            target: obj.constructor,
            propertyName: prop,
            options: validationOptions,
            validator: EmailSingleValidator
        })
    }
}