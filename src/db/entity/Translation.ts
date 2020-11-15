import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
} from "typeorm";
import { Key } from "./Key";
import { Locale } from "./Locale";

@Entity()
export class Translation {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @ManyToOne((type) => Locale, (locale) => locale.translations)
  locale: Locale;

  @ManyToOne((type) => Key, (key) => key.translations, {
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  })
  key: Key;

  @Column()
  value: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
