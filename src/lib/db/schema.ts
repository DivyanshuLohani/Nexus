import {
  pgTable,
  varchar,
  text,
  timestamp,
  boolean,
  index,
  uniqueIndex,
  integer,
} from "drizzle-orm/pg-core";
import { InferSelectModel, relations } from "drizzle-orm";

export type IconStyle =
  | "colored" // original brand colors
  | "filled" // white icon on bg
  | "mono"; // single color (artistic)

export const user = pgTable("users", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const userRelations = relations(user, ({ many }) => ({
  sessions: many(session),
  accounts: many(account),
}));

export const sessionRelations = relations(session, ({ one }) => ({
  user: one(user, {
    fields: [session.userId],
    references: [user.id],
  }),
}));

export const accountRelations = relations(account, ({ one }) => ({
  user: one(user, {
    fields: [account.userId],
    references: [user.id],
  }),
}));

// Pages table
export const pagesTable = pgTable(
  "pages",
  {
    id: text().primaryKey(),
    userId: text()
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    title: varchar({ length: 255 }).notNull(),
    subtitle: varchar({ length: 1024 }).default(""),
    slug: varchar({ length: 255 }).notNull(),
    image: text("image"),
    background: text("background").default("#0a0a0a"),
    textColor: text("text_color").default("#ffffff"),

    iconsOff: boolean("icons_off").default(false).notNull(),
    iconStyle: text("icon_style")
      .$type<IconStyle>()
      .default("colored")
      .notNull(),

    isDefault: boolean("is_default").default(false).notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => ({
    userSlugIdx: uniqueIndex("user_slug_idx").on(table.userId, table.slug),
  }),
);

export const pagesRelations = relations(pagesTable, ({ many }) => ({
  links: many(linksTable),
}));

// Links table
export const linksTable = pgTable("links", {
  id: text().primaryKey(),
  pageId: text()
    .notNull()
    .references(() => pagesTable.id, { onDelete: "cascade" }),
  label: varchar({ length: 255 }).notNull(),
  url: varchar({ length: 2048 }).notNull(),
  icon: varchar({ length: 255 }),
  order: integer("order").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const linksRelations = relations(linksTable, ({ one }) => ({
  page: one(pagesTable, {
    fields: [linksTable.pageId],
    references: [pagesTable.id],
  }),
}));

export const pageSocials = pgTable("page_socials", {
  id: text().primaryKey(),

  pageId: text()
    .notNull()
    .references(() => pagesTable.id, { onDelete: "cascade" }),

  platform: text("platform").notNull(), // instagram, twitter
  url: text("url").notNull(),

  order: integer("order").default(0).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const pageView = pgTable("page_views", {
  id: text().primaryKey(),
  pageId: text()
    .notNull()
    .references(() => pagesTable.id, { onDelete: "cascade" }),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  referer: text("referer"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const pageAnalytics = pgTable("page_analytics", {
  id: text().primaryKey(),
  pageId: text()
    .notNull()
    .references(() => pagesTable.id, { onDelete: "cascade" }),
  views: integer("views").default(0).notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => new Date())
    .notNull(),
});

export const pageViewRelations = relations(pageView, ({ one }) => ({
  page: one(pagesTable, {
    fields: [pageView.pageId],
    references: [pagesTable.id],
  }),
}));

export const pageAnalyticsRelations = relations(pageAnalytics, ({ one }) => ({
  page: one(pagesTable, {
    fields: [pageAnalytics.pageId],
    references: [pagesTable.id],
  }),
}));

export type DbUser = InferSelectModel<typeof user>;
export type DbPage = InferSelectModel<typeof pagesTable>;
export type DbLink = InferSelectModel<typeof linksTable>;
export type DbPageView = InferSelectModel<typeof pageView>;

export type PageWithLinks = DbPage & {
  links: DbLink[];
};
