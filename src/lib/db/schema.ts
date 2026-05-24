import {
  pgTable,
  varchar,
  text,
  timestamp,
  boolean,
  index,
  uniqueIndex,
  integer,
  pgEnum,
} from "drizzle-orm/pg-core";
import { InferSelectModel, relations } from "drizzle-orm";
import { nanoid } from "nanoid";

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

  activePlanId: text("active_plan_id").references(() => plansTable.id),
  activePlanValidUntil: timestamp("active_plan_valid_until"),

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
export const pageLayoutEnum = pgEnum("page_layout", [
  "STACK",
  "GRID",
  "CAROUSEL",
  "MINIMAL",
  "IMMERSIVE",
]);

export type PageLayout = (typeof pageLayoutEnum.enumValues)[number];

// Pages table
export const pagesTable = pgTable(
  "pages",
  {
    id: text()
      .primaryKey()
      .$defaultFn(() => nanoid()),
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

    brandingBadge: boolean("branding_badge").default(true).notNull(),
    layout: pageLayoutEnum("layout").default("STACK").notNull(),

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
  id: text()
    .primaryKey()
    .$defaultFn(() => nanoid()),
  pageId: text()
    .notNull()
    .references(() => pagesTable.id, { onDelete: "cascade" }),
  label: varchar({ length: 255 }).notNull(),
  url: varchar({ length: 2048 }).notNull(),
  icon: varchar({ length: 255 }),
  order: integer("order").notNull(),
  image: text("image"),
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

export const feedbacksTable = pgTable("feedbacks", {
  id: text("id").primaryKey(),
  userId: text("user_id").references(() => user.id, { onDelete: "set null" }),
  name: text("name"),
  email: text("email"),
  message: text("message").notNull(),
  context: text("context").default("feedback").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const feedbacksRelations = relations(feedbacksTable, ({ one }) => ({
  user: one(user, {
    fields: [feedbacksTable.userId],
    references: [user.id],
  }),
}));

export const plansTable = pgTable("plans", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => nanoid()),

  name: text("name").notNull(),

  slug: text("slug").notNull().unique(),

  description: text("description"),

  featured: boolean("featured").default(false).notNull(),
  mostPopular: boolean("most_popular").default(false).notNull(),
  shownInPricing: boolean("shown_in_pricing").default(true).notNull(),

  monthlyPrice: integer("monthly_price").notNull(),
  yearlyPrice: integer("yearly_price"),

  maxLinks: integer("max_links").default(200).notNull(),
  maxLinkImages: integer("max_link_images").default(0).notNull(),

  // Array of layouts included
  includedLayouts: text("included_layouts")
    .array()
    .default(["stack"])
    .notNull(),

  branding: boolean("branding").default(true).notNull(),

  analytics: boolean("analytics").default(true).notNull(),
  detailedAnalytics: boolean("detailed_analytics").default(false).notNull(),

  customDomains: boolean("custom_domains").default(false).notNull(),

  prioritySupport: boolean("priority_support").default(false).notNull(),

  active: boolean("active").default(true).notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const transactionStatusEnum = pgEnum("transaction_status", [
  "pending",
  "completed",
  "failed",
  "refunded",
]);
export const transactionsTable = pgTable("transactions", {
  id: text("id").primaryKey().$defaultFn(nanoid),
  userId: text()
    .notNull()
    .references(() => user.id, { onDelete: "cascade" }),
  planId: text()
    .notNull()
    .references(() => plansTable.id, { onDelete: "cascade" }),

  amount: integer("amount").notNull(),
  tenure: text("tenure").notNull(), // monthly or yearly

  // Status with enum
  status: transactionStatusEnum("status").notNull(),

  paymentProvider: text("payment_provider").notNull(), // e.g. stripe
  paymentProviderId: text("payment_provider_id").notNull(), // e.g. stripe charge id
  paymentProviderStatus: text("payment_provider_status").notNull(),

  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export type DbUser = InferSelectModel<typeof user>;
export type DbPage = InferSelectModel<typeof pagesTable>;
export type DbLink = InferSelectModel<typeof linksTable>;
export type DbPageView = InferSelectModel<typeof pageView>;
export type DbSocialLink = InferSelectModel<typeof pageSocials>;
export type DbPlan = InferSelectModel<typeof plansTable>;

export type PageWithLinks = DbPage & {
  links: DbLink[];
};
export type PageWithLinksAndSocials = DbPage & {
  links: DbLink[];
} & {
  socials: DbSocialLink[];
};
export type UserWithPlan = DbUser & {
  activePlan: DbPlan | null;
};
