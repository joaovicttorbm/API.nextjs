import { error } from "console";
import { Injectable } from "@nestjs/common";
import { UserEntity } from "./user.entity";

@Injectable()
export class UserRepository {
    private users: UserEntity[] = [
        {
        "id": "016df82c-613c-41f4-bb55-221b40a79b58",
        "name": "Gui Silveira",
        "email": "gui@mail.com",
        "password": "12345678"
        }
      ];
    
    private findUserById(id: string) {
        const findUser = this.users.find(
            user => user.id === id
        )
        if(!findUser){
            throw new error('user undefined')
        }
        return findUser;
    }

    async save(user: UserEntity) {
        this.users.push(user)
    }

    async list() {
       return this.users
    }

    async thereEmail(email: string) {
        const findEmail = this.users.find(
            user => user.email === email
        )
        return findEmail !== undefined ;
    }

    async put(id: string, newData: Partial<UserEntity>){
        const user = this.findUserById(id);

        Object.entries(newData).forEach(([key, value]) => {
            if(key === 'id') {
                return;
            }
    
            user[key] = value;
        });
        return user
    }

    async del(id:string) {
        const user = this.findUserById(id);
        this.users = this.users.filter(user => user.id !== id);
        return user;
    }

}