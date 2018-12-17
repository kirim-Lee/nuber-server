import {Entity, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, ManyToOne, Column} from 'typeorm';

import Chat from './Chat';
import User from './User';

@Entity()
class Message extends BaseEntity{
    @PrimaryGeneratedColumn() id: number;

    @Column({type: "text"})
    text: string;

    @Column({nullable: true})
    chatId: number;

    @ManyToOne(type => Chat, chat => chat.messages)
    chat: Chat;

    @ManyToOne(type => User, user => user.messages)
    user: User;

    @CreateDateColumn() 
    createdAt:string;

    @CreateDateColumn() 
    updatedAt:string;


}

export default Message;