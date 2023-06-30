import { Body, Controller, Delete, Get, Param, Post, Put } from "@nestjs/common";
import { CreateUserDTO } from "src/dto/createUser.dto";
import { ListUserDTO } from "src/dto/listUser.dto";
import { PathUserDTO } from "src/dto/patchUser.dto";
import { UserEntity } from "./user.entity";
import { UserRepository } from "./user.respository";
import { v4 as uuid } from 'uuid';

@Controller('/users')
export class UserController {

    constructor(private userRepository:UserRepository) {}

    @Post()
    async criateUser(@Body() dateUser: CreateUserDTO) {
        const newUser = new UserEntity();
        newUser.email = dateUser.email;
        newUser.password = dateUser.password;
        newUser.name = dateUser.name;
        newUser.id = uuid();

        this.userRepository.save(newUser);
  
        return  {
            id: newUser.id,
            mensagem: 'user created'
        };
    }

    @Get()
    async listUser() {
        const users = await this.userRepository.list();

        const listUser = users.map( user => new ListUserDTO(user.id, user.name) );
        
        return listUser
    }

    @Put('/:id')
    async putUser(@Param('id') id: string, @Body() newDate: PathUserDTO){
        const user = await this.userRepository.put(id, newDate);

        return {
            user: user,
            message: `User data updated for id ${id}`
        }
    }

    @Delete('/:id')
    async DelUser(@Param('id') id: string) {
        const user = await this.userRepository.del(id);

        return {
            user: user,
            message: `User data deleted for id ${id}`
        }
    }
}

