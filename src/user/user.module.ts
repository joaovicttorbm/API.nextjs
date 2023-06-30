import { EmailSingleValidator } from "src/validation/emailSingle.validator";
import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserRepository } from "./user.respository";

@Module({
    controllers: [ UserController ],
    providers: [ EmailSingleValidator, UserRepository]
})
export class UserModule {}