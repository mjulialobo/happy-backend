import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn} from 'typeorm';
import Shelter from './Shelter';

@Entity('images')
export default class Image{
    @PrimaryGeneratedColumn('increment')
    id: number;

    @Column()
    path:string;

    @ManyToOne(() => Shelter, shelter => shelter.images)
    @JoinColumn({name: 'shelter_id'})
    shelter: Shelter;
}