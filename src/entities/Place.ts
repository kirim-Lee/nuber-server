import {Entity, BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, Column} from 'typeorm';


@Entity()
class Place extends BaseEntity{
    @PrimaryGeneratedColumn() id: number;

    @Column({type: "text"})
    name: string;

    @Column({type: "double precision", default: 0})
    lat: number;

    @Column({type: "double precision", default: 0})
    lng: string;

    @Column({type: "text"})
    address: string;

    @Column({type: "boolean", default: false})
    isFav: string;

    @CreateDateColumn() createdAt:string;
    @CreateDateColumn() upadteAt:string;


}

export default Place;