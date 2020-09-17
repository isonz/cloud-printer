import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Index("auther", ["author"], {})
@Index("title", ["title"], {})
@Entity("news", { schema: "jiji_app_main" })
export class News {
  @PrimaryGeneratedColumn({ type: "int", name: "id", unsigned: true })
  id: number;

  @Column("varchar", {
    name: "author",
    nullable: true,
    comment: "作者",
    length: 30,
  })
  author: string | null;

  @Column("varchar", {
    name: "title",
    nullable: true,
    comment: "新闻标题",
    length: 100,
  })
  title: string | null;

  @Column("text", { name: "content", nullable: true, comment: "新闻内容" })
  content: string | null;

  @Column("datetime", {
    name: "create_at",
    nullable: true,
    comment: "创建时间",
  })
  createAt: Date | null;

  @Column("datetime", {
    name: "update_at",
    nullable: true,
    comment: "更新时间",
  })
  updateAt: Date | null;
}
