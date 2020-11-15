import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  OneToMany,
  Unique,
} from "typeorm";
import { Key } from "./Key";
import { Project } from "./Project";

@Entity()
@Unique("UQ_PROJECT_SCREEN", ["project.id", "key"])
export class Screen {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  key: string;

  @Column()
  name: string;

  @Column({ nullable: true })
  description: string;

  @ManyToOne((type) => Project, (project) => project.screens)
  project: Project;

  @OneToMany((type) => Key, (key) => key.screen)
  keys: Key[];

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
