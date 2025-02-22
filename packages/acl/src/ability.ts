import { AbilityBuilder, createMongoAbility, type MongoAbility, type InferSubjects } from "@casl/ability";

export enum Action {
  Manage = "manage",
  Create = "create",
  Read   = "read",
  Update = "update",
  Delete = "delete",
}

export class Post {
  id: string;
  authorId: string;

  constructor(id: string, authorId: string) {
    this.id = id;
    this.authorId = authorId;
  }
}

export class Comment {
  id: string;
  authorId: string;
  post: Post;

  constructor(id: string, authorId: string, post: Post) {
    this.id = id;
    this.authorId = authorId;
    this.post = post;
  }
}

export type Subjects = InferSubjects<typeof Post | typeof Comment> | "all";

export type AppAbility = MongoAbility<[Action, Subjects]>;

export const createAbility = (user: User): AppAbility => {
  const { can, build } = new AbilityBuilder<AppAbility>(createMongoAbility);

  if (user.role === "admin") {
    can(Action.Manage, "all");
  } else {
    can(Action.Read, "all");
    can(Action.Create, Post);
    can(Action.Update, Post, { authorId: user.id });
    can(Action.Delete, Post, { authorId: user.id });
    can(Action.Create, Comment);
    can(Action.Update, Comment, { authorId: user.id });
    can(Action.Delete, Comment, { authorId: user.id });
    can(Action.Delete, Comment, { post: { authorId: user.id } });
  }

  return build();
};
