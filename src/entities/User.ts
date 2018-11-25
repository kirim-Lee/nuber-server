import bcrypt from 'bcrypt';
import {IsEmail} from "class-validator"
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, ManyToOne, OneToMany } from "typeorm";

import Chat from './Chat';
import Message from './Message';

const BYCRYPT_ROUNDS = 10;
//Type ORM 
//decorator
//함수안에 뭘 넣는걸 의미
@Entity()
class User extends BaseEntity{
    @PrimaryGeneratedColumn() id : number;
    @Column({type:"text",unique:true})
    @IsEmail()
    email : string;

    @Column({type:"boolean", default:false})
    veryfiedEmail:boolean;

    @Column({type:"text"})
    firstName:string;

    @Column({type:"text"})
    lastName:string;

    @Column({type:"int"})
    age:string;

    @Column({type:"text"})
    password:string;

    @Column({type:"text"})
    phoneNumber:string;

    @Column({type:"boolean", default:false})
    verifiedPhoneNumber:boolean;
    
    @Column({type:"text"})
    profilePhoto:string;

    @CreateDateColumn()    
    cerateAt:string;

    @UpdateDateColumn()    
    updatedAt:string;

    @Column({type:"text", default:false})
    isDriving:string;
    
    @Column({type:"text", default:false})
    isRiding:string;
    
    @Column({type:"text", default:false})
    isTaken:string;
    
    @Column({type:"double precision"})
    lastLng:number;
    
    @Column({type:"double precision"})
    lastLat:number;
    
    @Column({type:"double precision"})
    lastOrientation:number;

    @ManyToOne(type => Chat, chat => chat.participants)
    chat: Chat;

    @OneToMany(type => Message, message => message.user)
    messages: Message[];
    
    get fulName():string{
        return `${this.firstName} ${this.lastName}`;
    }

    public comparePassword(password:string):Promise<boolean>{
        return bcrypt.compare(password, this.password)
    }
    //새로운 오브젝트를 만들기 전에 호출되는 메서드
    //업데이트 전에 호출되는 메서드
    @BeforeInsert()
    @BeforeUpdate()
    async savePassword() : Promise<void> {
        if(this.password){
            const hashPassword = await this.hashPassword(this.password);
            this.password = hashPassword
        }
    }

    

    private hashPassword(password:string):Promise<string> {
        return bcrypt.hash(password, BYCRYPT_ROUNDS);
    }
    
    
}

export default User;