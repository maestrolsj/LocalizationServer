import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  OneToMany,
  ManyToOne,
  Unique,
} from "typeorm";
import { Translation } from "./Translation";
import { Project } from "./Project";

@Entity()
@Unique("UQ_PROJECT_CODE", ["project.id", "code"])
export class Locale {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @Column()
  nativeName: string;

  @Column()
  code: string;

  @OneToMany((type) => Translation, (translation) => translation.locale)
  translations: Translation[];

  @ManyToOne((type) => Project, (project) => project.locales)
  project: Project;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
