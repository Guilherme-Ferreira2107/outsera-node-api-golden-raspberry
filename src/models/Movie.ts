import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity("movies")
export class Movie {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  year!: number;

  @Column()
  title!: string;

  @Column()
  studios!: string;

  @Column("simple-array")
  producers!: string[];

  @Column()
  winner!: boolean;
}
