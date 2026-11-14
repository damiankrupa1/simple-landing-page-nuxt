import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_size_guide_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__size_guide_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__size_guide_v_published_locale" AS ENUM('en', 'pl');
  CREATE TYPE "public"."enum_product_page_info_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__product_page_info_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__product_page_info_v_published_locale" AS ENUM('en', 'pl');
  CREATE TABLE "size_guide_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "size_guide_columns_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "size_guide_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"size" varchar,
  	"values" jsonb DEFAULT '[]'::jsonb
  );
  
  CREATE TABLE "size_guide" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_status" "enum_size_guide_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "size_guide_locales" (
  	"title" varchar,
  	"intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_size_guide_v_version_columns" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_size_guide_v_version_columns_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_size_guide_v_version_rows" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"size" varchar,
  	"values" jsonb DEFAULT '[]'::jsonb,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_size_guide_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version__status" "enum__size_guide_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__size_guide_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_size_guide_v_locales" (
  	"version_title" varchar,
  	"version_intro" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "product_page_info" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_status" "enum_product_page_info_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "product_page_info_locales" (
  	"free_shipping" varchar,
  	"carriers" varchar,
  	"returns" varchar,
  	"price_note" varchar,
  	"shipping_time" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_product_page_info_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version__status" "enum__product_page_info_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__product_page_info_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_product_page_info_v_locales" (
  	"version_free_shipping" varchar,
  	"version_carriers" varchar,
  	"version_returns" varchar,
  	"version_price_note" varchar,
  	"version_shipping_time" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "size_guide_columns" ADD CONSTRAINT "size_guide_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."size_guide"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "size_guide_columns_locales" ADD CONSTRAINT "size_guide_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."size_guide_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "size_guide_rows" ADD CONSTRAINT "size_guide_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."size_guide"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "size_guide_locales" ADD CONSTRAINT "size_guide_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."size_guide"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_size_guide_v_version_columns" ADD CONSTRAINT "_size_guide_v_version_columns_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_size_guide_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_size_guide_v_version_columns_locales" ADD CONSTRAINT "_size_guide_v_version_columns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_size_guide_v_version_columns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_size_guide_v_version_rows" ADD CONSTRAINT "_size_guide_v_version_rows_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_size_guide_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_size_guide_v_locales" ADD CONSTRAINT "_size_guide_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_size_guide_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "product_page_info_locales" ADD CONSTRAINT "product_page_info_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."product_page_info"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_product_page_info_v_locales" ADD CONSTRAINT "_product_page_info_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_product_page_info_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "size_guide_columns_order_idx" ON "size_guide_columns" USING btree ("_order");
  CREATE INDEX "size_guide_columns_parent_id_idx" ON "size_guide_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "size_guide_columns_locales_locale_parent_id_unique" ON "size_guide_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "size_guide_columns_locales_parent_id_idx" ON "size_guide_columns_locales" USING btree ("_parent_id");
  CREATE INDEX "size_guide_rows_order_idx" ON "size_guide_rows" USING btree ("_order");
  CREATE INDEX "size_guide_rows_parent_id_idx" ON "size_guide_rows" USING btree ("_parent_id");
  CREATE INDEX "size_guide__status_idx" ON "size_guide" USING btree ("_status");
  CREATE UNIQUE INDEX "size_guide_locales_locale_parent_id_unique" ON "size_guide_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "size_guide_locales_parent_id_idx" ON "size_guide_locales" USING btree ("_parent_id");
  CREATE INDEX "_size_guide_v_version_columns_order_idx" ON "_size_guide_v_version_columns" USING btree ("_order");
  CREATE INDEX "_size_guide_v_version_columns_parent_id_idx" ON "_size_guide_v_version_columns" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_size_guide_v_version_columns_locales_locale_parent_id_uniqu" ON "_size_guide_v_version_columns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_size_guide_v_version_columns_locales_parent_id_idx" ON "_size_guide_v_version_columns_locales" USING btree ("_parent_id");
  CREATE INDEX "_size_guide_v_version_rows_order_idx" ON "_size_guide_v_version_rows" USING btree ("_order");
  CREATE INDEX "_size_guide_v_version_rows_parent_id_idx" ON "_size_guide_v_version_rows" USING btree ("_parent_id");
  CREATE INDEX "_size_guide_v_version_version__status_idx" ON "_size_guide_v" USING btree ("version__status");
  CREATE INDEX "_size_guide_v_created_at_idx" ON "_size_guide_v" USING btree ("created_at");
  CREATE INDEX "_size_guide_v_updated_at_idx" ON "_size_guide_v" USING btree ("updated_at");
  CREATE INDEX "_size_guide_v_snapshot_idx" ON "_size_guide_v" USING btree ("snapshot");
  CREATE INDEX "_size_guide_v_published_locale_idx" ON "_size_guide_v" USING btree ("published_locale");
  CREATE INDEX "_size_guide_v_latest_idx" ON "_size_guide_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_size_guide_v_locales_locale_parent_id_unique" ON "_size_guide_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_size_guide_v_locales_parent_id_idx" ON "_size_guide_v_locales" USING btree ("_parent_id");
  CREATE INDEX "product_page_info__status_idx" ON "product_page_info" USING btree ("_status");
  CREATE UNIQUE INDEX "product_page_info_locales_locale_parent_id_unique" ON "product_page_info_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "product_page_info_locales_parent_id_idx" ON "product_page_info_locales" USING btree ("_parent_id");
  CREATE INDEX "_product_page_info_v_version_version__status_idx" ON "_product_page_info_v" USING btree ("version__status");
  CREATE INDEX "_product_page_info_v_created_at_idx" ON "_product_page_info_v" USING btree ("created_at");
  CREATE INDEX "_product_page_info_v_updated_at_idx" ON "_product_page_info_v" USING btree ("updated_at");
  CREATE INDEX "_product_page_info_v_snapshot_idx" ON "_product_page_info_v" USING btree ("snapshot");
  CREATE INDEX "_product_page_info_v_published_locale_idx" ON "_product_page_info_v" USING btree ("published_locale");
  CREATE INDEX "_product_page_info_v_latest_idx" ON "_product_page_info_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_product_page_info_v_locales_locale_parent_id_unique" ON "_product_page_info_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_product_page_info_v_locales_parent_id_idx" ON "_product_page_info_v_locales" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "size_guide_columns" CASCADE;
  DROP TABLE "size_guide_columns_locales" CASCADE;
  DROP TABLE "size_guide_rows" CASCADE;
  DROP TABLE "size_guide" CASCADE;
  DROP TABLE "size_guide_locales" CASCADE;
  DROP TABLE "_size_guide_v_version_columns" CASCADE;
  DROP TABLE "_size_guide_v_version_columns_locales" CASCADE;
  DROP TABLE "_size_guide_v_version_rows" CASCADE;
  DROP TABLE "_size_guide_v" CASCADE;
  DROP TABLE "_size_guide_v_locales" CASCADE;
  DROP TABLE "product_page_info" CASCADE;
  DROP TABLE "product_page_info_locales" CASCADE;
  DROP TABLE "_product_page_info_v" CASCADE;
  DROP TABLE "_product_page_info_v_locales" CASCADE;
  DROP TYPE "public"."enum_size_guide_status";
  DROP TYPE "public"."enum__size_guide_v_version_status";
  DROP TYPE "public"."enum__size_guide_v_published_locale";
  DROP TYPE "public"."enum_product_page_info_status";
  DROP TYPE "public"."enum__product_page_info_v_version_status";
  DROP TYPE "public"."enum__product_page_info_v_published_locale";`)
}
