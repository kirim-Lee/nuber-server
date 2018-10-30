import {IsEmail} from "class-validator"
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from "typeorm";

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
    
    get fulName():string{
        return `${this.firstName} ${this.lastName}`;
    }

}

export default User;