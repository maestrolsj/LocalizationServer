import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  Unique,
  OneToMany,
} from "typeorm";
import { Screen } from "./Screen";
import { Translation } from "./Translation";

@Entity()
@Unique("UQ_NAME_SCREEN_PLURAL", ["name", "screen", "plural"])
export class Key {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column()
  name: string;

  @ManyToOne((type) => Screen, (screen) => screen.keys)
  screen: Screen;

  @OneToMany((type) => Translation, (translation) => translation.key, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  translations: Translation[];

  @Column({ default: false })
  plural: Boolean;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
