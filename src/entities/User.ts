import bcrypt from 'bcrypt';
import {IsEmail} from "class-validator"
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BeforeInsert, BeforeUpdate, OneToMany } from "typeorm";

import Chat from './Chat';
import Message from './Message';
import Ride from './Ride';
import Place from './Place';

const BYCRYPT_ROUNDS = 10;
//Type ORM 
//decorator
//함수안에 뭘 넣는걸 의미
@Entity()
class User extends BaseEntity{
    @PrimaryGeneratedColumn() id : number;
    @Column({type:"text", nullable: true})
    @IsEmail()
    email : string | null;

    @Column({type:"boolean", default:false})
    verifiedEmail:boolean;

    @Column({type:"text"})
    firstName:string;

    @Column({type:"text"})
    lastName:string;

    @Column({type:"int", nullable: true})
    age:number;

    @Column({type:"text", nullable:true})
    password:string;

    @Column({type:"text", nullable:true})
    phoneNumber:string;

    @Column({type:"boolean", default:false})
    verifiedPhoneNumber:boolean;

    @Column({type:"text", nullable:true})
    fbId: string;
    
    @Column({type:"text"})
    profilePhoto:string;

    @CreateDateColumn()    
    createdAt:string;

    @UpdateDateColumn()    
    updatedAt:string;

    @Column({type:"boolean", default:false})
    isDriving:boolean;
    
    @Column({type:"boolean", default:false})
    isRiding:boolean;
    
    @Column({type:"boolean", default:false})
    isTaken:boolean;
    
    @Column({type:"double precision", nullable:true})
    lastLng:number;
    
    @Column({type:"double precision", nullable:true})
    lastLat:number;
    
    @Column({type:"double precision", nullable:true})
    lastOrientation:number;

    @OneToMany(type => Chat, chat => chat.passenger)
    chatsAsPassenger: Chat[];

    @OneToMany(type => Chat, chat => chat.driver)
    chatsAsDriver: Chat[];
    
    @OneToMany(type => Message, message => message.user)
    messages: Message[];

    @OneToMany(type => Ride, ride => ride.passenger)
    rideAsPassenger: Ride[];

    @OneToMany(type => Ride, ride => ride.driver)
    rideAsDriver: Ride[];

    @OneToMany(type => Place, place => place.user)
    places: Place[];
    
    get fullName():string{
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