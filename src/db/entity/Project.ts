import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
} from "typeorm";
import { Screen } from "./Screen";
import { Locale } from "./Locale";

@Entity()
export class Project {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ unique: true })
  key: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @OneToMany((type) => Locale, (locale) => locale.project, {
    onDelete: "CASCADE",
  })
  locales: Locale[];

  @OneToMany((type) => Screen, (screen) => screen.project, {
    onDelete: "CASCADE",
  })
  screens: Screen[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
