import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_navigation_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__navigation_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__navigation_v_published_locale" AS ENUM('en', 'pl');
  CREATE TYPE "public"."enum_footer_content_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__footer_content_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__footer_content_v_published_locale" AS ENUM('en', 'pl');
  CREATE TYPE "public"."enum_studio_story_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__studio_story_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__studio_story_v_published_locale" AS ENUM('en', 'pl');
  CREATE TYPE "public"."enum_brands_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__brands_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__brands_v_published_locale" AS ENUM('en', 'pl');
  CREATE TYPE "public"."enum_journal_section_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__journal_section_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__journal_section_v_published_locale" AS ENUM('en', 'pl');
  CREATE TYPE "public"."enum_campaign_slides_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__campaign_slides_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__campaign_slides_v_published_locale" AS ENUM('en', 'pl');
  CREATE TYPE "public"."enum_category_tiles_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__category_tiles_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__category_tiles_v_published_locale" AS ENUM('en', 'pl');
  CREATE TYPE "public"."enum_shop_the_look_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__shop_the_look_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__shop_the_look_v_published_locale" AS ENUM('en', 'pl');
  CREATE TABLE "_navigation_v_version_primary_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_navigation_v_version_primary_nav_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_navigation_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version__status" "enum__navigation_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__navigation_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_footer_content_v_version_help_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_footer_content_v_version_help_links_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_footer_content_v_version_world_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_footer_content_v_version_world_links_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_footer_content_v_version_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_footer_content_v_version_legal_links_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_footer_content_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_contact_email" varchar,
  	"version_contact_phone" varchar,
  	"version_social_handle" varchar,
  	"version__status" "enum__footer_content_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__footer_content_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_footer_content_v_locales" (
  	"version_contact_hours" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_studio_story_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_collection_url" varchar,
  	"version_image_id" integer,
  	"version__status" "enum__studio_story_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__studio_story_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_studio_story_v_locales" (
  	"version_eyebrow" varchar,
  	"version_headline_line1" varchar,
  	"version_headline_line2" varchar,
  	"version_paragraph1" varchar,
  	"version_paragraph2" varchar,
  	"version_values" jsonb DEFAULT '[]'::jsonb,
  	"version_signature_label" varchar,
  	"version_signature_tagline" varchar,
  	"version_collection_link_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_brands_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_view_all_url" varchar,
  	"version_other_brands" jsonb DEFAULT '[]'::jsonb,
  	"version__status" "enum__brands_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__brands_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_brands_v_locales" (
  	"version_eyebrow" varchar,
  	"version_view_all_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_journal_section_v_version_articles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"url" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_journal_section_v_version_articles_locales" (
  	"category" varchar,
  	"reading_time" varchar,
  	"title" varchar,
  	"summary" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_journal_section_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_view_all_url" varchar,
  	"version__status" "enum__journal_section_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__journal_section_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_journal_section_v_locales" (
  	"version_eyebrow" varchar,
  	"version_heading" varchar,
  	"version_view_all_label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_campaign_slides_v_version_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_campaign_slides_v_version_slides_locales" (
  	"season_label" varchar,
  	"edition_label" varchar,
  	"headline_line1" varchar,
  	"headline_line2" varchar,
  	"description" varchar,
  	"shop_cta_label" varchar,
  	"secondary_cta_label" varchar,
  	"tagline" varchar,
  	"caption_eyebrow" varchar,
  	"caption_headline" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_campaign_slides_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version__status" "enum__campaign_slides_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__campaign_slides_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_category_tiles_v_version_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"category_handle" varchar,
  	"image_id" integer,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_category_tiles_v_version_cards_locales" (
  	"title" varchar,
  	"subtitle" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_category_tiles_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version__status" "enum__category_tiles_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__category_tiles_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_category_tiles_v_locales" (
  	"version_eyebrow" varchar,
  	"version_heading" varchar,
  	"version_description" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_shop_the_look_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version_product_handles" jsonb DEFAULT '[]'::jsonb,
  	"version_image_id" integer,
  	"version__status" "enum__shop_the_look_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__shop_the_look_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_shop_the_look_v_locales" (
  	"version_eyebrow" varchar,
  	"version_headline_line1" varchar,
  	"version_headline_line2" varchar,
  	"version_description" varchar,
  	"version_caption_label" varchar,
  	"version_bottom_tagline" varchar,
  	"version_shop_set_cta_label" varchar,
  	"version_total_label" varchar,
  	"version_size_hint" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "navigation_primary_nav" ALTER COLUMN "url" DROP NOT NULL;
  ALTER TABLE "navigation_primary_nav_locales" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "footer_content_help_links" ALTER COLUMN "url" DROP NOT NULL;
  ALTER TABLE "footer_content_help_links_locales" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "footer_content_world_links" ALTER COLUMN "url" DROP NOT NULL;
  ALTER TABLE "footer_content_world_links_locales" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "footer_content_legal_links" ALTER COLUMN "url" DROP NOT NULL;
  ALTER TABLE "footer_content_legal_links_locales" ALTER COLUMN "label" DROP NOT NULL;
  ALTER TABLE "studio_story" ALTER COLUMN "collection_url" DROP NOT NULL;
  ALTER TABLE "studio_story" ALTER COLUMN "image_id" DROP NOT NULL;
  ALTER TABLE "studio_story_locales" ALTER COLUMN "eyebrow" DROP NOT NULL;
  ALTER TABLE "studio_story_locales" ALTER COLUMN "headline_line1" DROP NOT NULL;
  ALTER TABLE "studio_story_locales" ALTER COLUMN "headline_line2" DROP NOT NULL;
  ALTER TABLE "studio_story_locales" ALTER COLUMN "paragraph1" DROP NOT NULL;
  ALTER TABLE "studio_story_locales" ALTER COLUMN "paragraph2" DROP NOT NULL;
  ALTER TABLE "studio_story_locales" ALTER COLUMN "values" DROP NOT NULL;
  ALTER TABLE "studio_story_locales" ALTER COLUMN "signature_label" DROP NOT NULL;
  ALTER TABLE "studio_story_locales" ALTER COLUMN "signature_tagline" DROP NOT NULL;
  ALTER TABLE "studio_story_locales" ALTER COLUMN "collection_link_label" DROP NOT NULL;
  ALTER TABLE "brands" ALTER COLUMN "view_all_url" DROP NOT NULL;
  ALTER TABLE "brands" ALTER COLUMN "other_brands" DROP NOT NULL;
  ALTER TABLE "brands_locales" ALTER COLUMN "eyebrow" DROP NOT NULL;
  ALTER TABLE "brands_locales" ALTER COLUMN "view_all_label" DROP NOT NULL;
  ALTER TABLE "journal_section_articles" ALTER COLUMN "image_id" DROP NOT NULL;
  ALTER TABLE "journal_section_articles" ALTER COLUMN "url" DROP NOT NULL;
  ALTER TABLE "journal_section_articles_locales" ALTER COLUMN "category" DROP NOT NULL;
  ALTER TABLE "journal_section_articles_locales" ALTER COLUMN "reading_time" DROP NOT NULL;
  ALTER TABLE "journal_section_articles_locales" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "journal_section_articles_locales" ALTER COLUMN "summary" DROP NOT NULL;
  ALTER TABLE "journal_section" ALTER COLUMN "view_all_url" DROP NOT NULL;
  ALTER TABLE "journal_section_locales" ALTER COLUMN "eyebrow" DROP NOT NULL;
  ALTER TABLE "journal_section_locales" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "journal_section_locales" ALTER COLUMN "view_all_label" DROP NOT NULL;
  ALTER TABLE "campaign_slides_slides" ALTER COLUMN "image_id" DROP NOT NULL;
  ALTER TABLE "campaign_slides_slides_locales" ALTER COLUMN "season_label" DROP NOT NULL;
  ALTER TABLE "campaign_slides_slides_locales" ALTER COLUMN "edition_label" DROP NOT NULL;
  ALTER TABLE "campaign_slides_slides_locales" ALTER COLUMN "headline_line1" DROP NOT NULL;
  ALTER TABLE "campaign_slides_slides_locales" ALTER COLUMN "headline_line2" DROP NOT NULL;
  ALTER TABLE "campaign_slides_slides_locales" ALTER COLUMN "description" DROP NOT NULL;
  ALTER TABLE "campaign_slides_slides_locales" ALTER COLUMN "shop_cta_label" DROP NOT NULL;
  ALTER TABLE "campaign_slides_slides_locales" ALTER COLUMN "secondary_cta_label" DROP NOT NULL;
  ALTER TABLE "campaign_slides_slides_locales" ALTER COLUMN "tagline" DROP NOT NULL;
  ALTER TABLE "campaign_slides_slides_locales" ALTER COLUMN "caption_eyebrow" DROP NOT NULL;
  ALTER TABLE "campaign_slides_slides_locales" ALTER COLUMN "caption_headline" DROP NOT NULL;
  ALTER TABLE "category_tiles_cards" ALTER COLUMN "category_handle" DROP NOT NULL;
  ALTER TABLE "category_tiles_cards" ALTER COLUMN "image_id" DROP NOT NULL;
  ALTER TABLE "category_tiles_cards_locales" ALTER COLUMN "title" DROP NOT NULL;
  ALTER TABLE "category_tiles_cards_locales" ALTER COLUMN "subtitle" DROP NOT NULL;
  ALTER TABLE "category_tiles_locales" ALTER COLUMN "eyebrow" DROP NOT NULL;
  ALTER TABLE "category_tiles_locales" ALTER COLUMN "heading" DROP NOT NULL;
  ALTER TABLE "category_tiles_locales" ALTER COLUMN "description" DROP NOT NULL;
  ALTER TABLE "shop_the_look" ALTER COLUMN "product_handles" DROP NOT NULL;
  ALTER TABLE "shop_the_look" ALTER COLUMN "image_id" DROP NOT NULL;
  ALTER TABLE "shop_the_look_locales" ALTER COLUMN "eyebrow" DROP NOT NULL;
  ALTER TABLE "shop_the_look_locales" ALTER COLUMN "headline_line1" DROP NOT NULL;
  ALTER TABLE "shop_the_look_locales" ALTER COLUMN "headline_line2" DROP NOT NULL;
  ALTER TABLE "shop_the_look_locales" ALTER COLUMN "description" DROP NOT NULL;
  ALTER TABLE "shop_the_look_locales" ALTER COLUMN "caption_label" DROP NOT NULL;
  ALTER TABLE "shop_the_look_locales" ALTER COLUMN "bottom_tagline" DROP NOT NULL;
  ALTER TABLE "shop_the_look_locales" ALTER COLUMN "shop_set_cta_label" DROP NOT NULL;
  ALTER TABLE "shop_the_look_locales" ALTER COLUMN "total_label" DROP NOT NULL;
  ALTER TABLE "shop_the_look_locales" ALTER COLUMN "size_hint" DROP NOT NULL;
  ALTER TABLE "navigation" ADD COLUMN "_status" "enum_navigation_status" DEFAULT 'draft';
  ALTER TABLE "footer_content" ADD COLUMN "_status" "enum_footer_content_status" DEFAULT 'draft';
  ALTER TABLE "studio_story" ADD COLUMN "_status" "enum_studio_story_status" DEFAULT 'draft';
  ALTER TABLE "brands" ADD COLUMN "_status" "enum_brands_status" DEFAULT 'draft';
  ALTER TABLE "journal_section" ADD COLUMN "_status" "enum_journal_section_status" DEFAULT 'draft';
  ALTER TABLE "campaign_slides" ADD COLUMN "_status" "enum_campaign_slides_status" DEFAULT 'draft';
  ALTER TABLE "category_tiles" ADD COLUMN "_status" "enum_category_tiles_status" DEFAULT 'draft';
  ALTER TABLE "shop_the_look" ADD COLUMN "_status" "enum_shop_the_look_status" DEFAULT 'draft';
  -- Backfill: the column defaults to 'draft', but the content that exists today is already live. Public reads only
  -- match _status = 'published', so without this the storefront would lose all of its CMS content.
  UPDATE "navigation" SET "_status" = 'published';
  UPDATE "footer_content" SET "_status" = 'published';
  UPDATE "studio_story" SET "_status" = 'published';
  UPDATE "brands" SET "_status" = 'published';
  UPDATE "journal_section" SET "_status" = 'published';
  UPDATE "campaign_slides" SET "_status" = 'published';
  UPDATE "category_tiles" SET "_status" = 'published';
  UPDATE "shop_the_look" SET "_status" = 'published';
  ALTER TABLE "_navigation_v_version_primary_nav" ADD CONSTRAINT "_navigation_v_version_primary_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_navigation_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_navigation_v_version_primary_nav_locales" ADD CONSTRAINT "_navigation_v_version_primary_nav_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_navigation_v_version_primary_nav"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_content_v_version_help_links" ADD CONSTRAINT "_footer_content_v_version_help_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_content_v_version_help_links_locales" ADD CONSTRAINT "_footer_content_v_version_help_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_content_v_version_help_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_content_v_version_world_links" ADD CONSTRAINT "_footer_content_v_version_world_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_content_v_version_world_links_locales" ADD CONSTRAINT "_footer_content_v_version_world_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_content_v_version_world_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_content_v_version_legal_links" ADD CONSTRAINT "_footer_content_v_version_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_content_v_version_legal_links_locales" ADD CONSTRAINT "_footer_content_v_version_legal_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_content_v_version_legal_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_footer_content_v_locales" ADD CONSTRAINT "_footer_content_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_footer_content_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_studio_story_v" ADD CONSTRAINT "_studio_story_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_studio_story_v_locales" ADD CONSTRAINT "_studio_story_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_studio_story_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_brands_v_locales" ADD CONSTRAINT "_brands_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_brands_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_journal_section_v_version_articles" ADD CONSTRAINT "_journal_section_v_version_articles_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_journal_section_v_version_articles" ADD CONSTRAINT "_journal_section_v_version_articles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_journal_section_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_journal_section_v_version_articles_locales" ADD CONSTRAINT "_journal_section_v_version_articles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_journal_section_v_version_articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_journal_section_v_locales" ADD CONSTRAINT "_journal_section_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_journal_section_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_campaign_slides_v_version_slides" ADD CONSTRAINT "_campaign_slides_v_version_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_campaign_slides_v_version_slides" ADD CONSTRAINT "_campaign_slides_v_version_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_campaign_slides_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_campaign_slides_v_version_slides_locales" ADD CONSTRAINT "_campaign_slides_v_version_slides_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_campaign_slides_v_version_slides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_category_tiles_v_version_cards" ADD CONSTRAINT "_category_tiles_v_version_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_category_tiles_v_version_cards" ADD CONSTRAINT "_category_tiles_v_version_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_category_tiles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_category_tiles_v_version_cards_locales" ADD CONSTRAINT "_category_tiles_v_version_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_category_tiles_v_version_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_category_tiles_v_locales" ADD CONSTRAINT "_category_tiles_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_category_tiles_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_shop_the_look_v" ADD CONSTRAINT "_shop_the_look_v_version_image_id_media_id_fk" FOREIGN KEY ("version_image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "_shop_the_look_v_locales" ADD CONSTRAINT "_shop_the_look_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_shop_the_look_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "_navigation_v_version_primary_nav_order_idx" ON "_navigation_v_version_primary_nav" USING btree ("_order");
  CREATE INDEX "_navigation_v_version_primary_nav_parent_id_idx" ON "_navigation_v_version_primary_nav" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_navigation_v_version_primary_nav_locales_locale_parent_id_u" ON "_navigation_v_version_primary_nav_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_navigation_v_version_primary_nav_locales_parent_id_idx" ON "_navigation_v_version_primary_nav_locales" USING btree ("_parent_id");
  CREATE INDEX "_navigation_v_version_version__status_idx" ON "_navigation_v" USING btree ("version__status");
  CREATE INDEX "_navigation_v_created_at_idx" ON "_navigation_v" USING btree ("created_at");
  CREATE INDEX "_navigation_v_updated_at_idx" ON "_navigation_v" USING btree ("updated_at");
  CREATE INDEX "_navigation_v_snapshot_idx" ON "_navigation_v" USING btree ("snapshot");
  CREATE INDEX "_navigation_v_published_locale_idx" ON "_navigation_v" USING btree ("published_locale");
  CREATE INDEX "_navigation_v_latest_idx" ON "_navigation_v" USING btree ("latest");
  CREATE INDEX "_footer_content_v_version_help_links_order_idx" ON "_footer_content_v_version_help_links" USING btree ("_order");
  CREATE INDEX "_footer_content_v_version_help_links_parent_id_idx" ON "_footer_content_v_version_help_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_footer_content_v_version_help_links_locales_locale_parent_i" ON "_footer_content_v_version_help_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_footer_content_v_version_help_links_locales_parent_id_idx" ON "_footer_content_v_version_help_links_locales" USING btree ("_parent_id");
  CREATE INDEX "_footer_content_v_version_world_links_order_idx" ON "_footer_content_v_version_world_links" USING btree ("_order");
  CREATE INDEX "_footer_content_v_version_world_links_parent_id_idx" ON "_footer_content_v_version_world_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_footer_content_v_version_world_links_locales_locale_parent_" ON "_footer_content_v_version_world_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_footer_content_v_version_world_links_locales_parent_id_idx" ON "_footer_content_v_version_world_links_locales" USING btree ("_parent_id");
  CREATE INDEX "_footer_content_v_version_legal_links_order_idx" ON "_footer_content_v_version_legal_links" USING btree ("_order");
  CREATE INDEX "_footer_content_v_version_legal_links_parent_id_idx" ON "_footer_content_v_version_legal_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_footer_content_v_version_legal_links_locales_locale_parent_" ON "_footer_content_v_version_legal_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_footer_content_v_version_legal_links_locales_parent_id_idx" ON "_footer_content_v_version_legal_links_locales" USING btree ("_parent_id");
  CREATE INDEX "_footer_content_v_version_version__status_idx" ON "_footer_content_v" USING btree ("version__status");
  CREATE INDEX "_footer_content_v_created_at_idx" ON "_footer_content_v" USING btree ("created_at");
  CREATE INDEX "_footer_content_v_updated_at_idx" ON "_footer_content_v" USING btree ("updated_at");
  CREATE INDEX "_footer_content_v_snapshot_idx" ON "_footer_content_v" USING btree ("snapshot");
  CREATE INDEX "_footer_content_v_published_locale_idx" ON "_footer_content_v" USING btree ("published_locale");
  CREATE INDEX "_footer_content_v_latest_idx" ON "_footer_content_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_footer_content_v_locales_locale_parent_id_unique" ON "_footer_content_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_footer_content_v_locales_parent_id_idx" ON "_footer_content_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_studio_story_v_version_version_image_idx" ON "_studio_story_v" USING btree ("version_image_id");
  CREATE INDEX "_studio_story_v_version_version__status_idx" ON "_studio_story_v" USING btree ("version__status");
  CREATE INDEX "_studio_story_v_created_at_idx" ON "_studio_story_v" USING btree ("created_at");
  CREATE INDEX "_studio_story_v_updated_at_idx" ON "_studio_story_v" USING btree ("updated_at");
  CREATE INDEX "_studio_story_v_snapshot_idx" ON "_studio_story_v" USING btree ("snapshot");
  CREATE INDEX "_studio_story_v_published_locale_idx" ON "_studio_story_v" USING btree ("published_locale");
  CREATE INDEX "_studio_story_v_latest_idx" ON "_studio_story_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_studio_story_v_locales_locale_parent_id_unique" ON "_studio_story_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_studio_story_v_locales_parent_id_idx" ON "_studio_story_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_brands_v_version_version__status_idx" ON "_brands_v" USING btree ("version__status");
  CREATE INDEX "_brands_v_created_at_idx" ON "_brands_v" USING btree ("created_at");
  CREATE INDEX "_brands_v_updated_at_idx" ON "_brands_v" USING btree ("updated_at");
  CREATE INDEX "_brands_v_snapshot_idx" ON "_brands_v" USING btree ("snapshot");
  CREATE INDEX "_brands_v_published_locale_idx" ON "_brands_v" USING btree ("published_locale");
  CREATE INDEX "_brands_v_latest_idx" ON "_brands_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_brands_v_locales_locale_parent_id_unique" ON "_brands_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_brands_v_locales_parent_id_idx" ON "_brands_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_journal_section_v_version_articles_order_idx" ON "_journal_section_v_version_articles" USING btree ("_order");
  CREATE INDEX "_journal_section_v_version_articles_parent_id_idx" ON "_journal_section_v_version_articles" USING btree ("_parent_id");
  CREATE INDEX "_journal_section_v_version_articles_image_idx" ON "_journal_section_v_version_articles" USING btree ("image_id");
  CREATE UNIQUE INDEX "_journal_section_v_version_articles_locales_locale_parent_id" ON "_journal_section_v_version_articles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_journal_section_v_version_articles_locales_parent_id_idx" ON "_journal_section_v_version_articles_locales" USING btree ("_parent_id");
  CREATE INDEX "_journal_section_v_version_version__status_idx" ON "_journal_section_v" USING btree ("version__status");
  CREATE INDEX "_journal_section_v_created_at_idx" ON "_journal_section_v" USING btree ("created_at");
  CREATE INDEX "_journal_section_v_updated_at_idx" ON "_journal_section_v" USING btree ("updated_at");
  CREATE INDEX "_journal_section_v_snapshot_idx" ON "_journal_section_v" USING btree ("snapshot");
  CREATE INDEX "_journal_section_v_published_locale_idx" ON "_journal_section_v" USING btree ("published_locale");
  CREATE INDEX "_journal_section_v_latest_idx" ON "_journal_section_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_journal_section_v_locales_locale_parent_id_unique" ON "_journal_section_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_journal_section_v_locales_parent_id_idx" ON "_journal_section_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_campaign_slides_v_version_slides_order_idx" ON "_campaign_slides_v_version_slides" USING btree ("_order");
  CREATE INDEX "_campaign_slides_v_version_slides_parent_id_idx" ON "_campaign_slides_v_version_slides" USING btree ("_parent_id");
  CREATE INDEX "_campaign_slides_v_version_slides_image_idx" ON "_campaign_slides_v_version_slides" USING btree ("image_id");
  CREATE UNIQUE INDEX "_campaign_slides_v_version_slides_locales_locale_parent_id_u" ON "_campaign_slides_v_version_slides_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_campaign_slides_v_version_slides_locales_parent_id_idx" ON "_campaign_slides_v_version_slides_locales" USING btree ("_parent_id");
  CREATE INDEX "_campaign_slides_v_version_version__status_idx" ON "_campaign_slides_v" USING btree ("version__status");
  CREATE INDEX "_campaign_slides_v_created_at_idx" ON "_campaign_slides_v" USING btree ("created_at");
  CREATE INDEX "_campaign_slides_v_updated_at_idx" ON "_campaign_slides_v" USING btree ("updated_at");
  CREATE INDEX "_campaign_slides_v_snapshot_idx" ON "_campaign_slides_v" USING btree ("snapshot");
  CREATE INDEX "_campaign_slides_v_published_locale_idx" ON "_campaign_slides_v" USING btree ("published_locale");
  CREATE INDEX "_campaign_slides_v_latest_idx" ON "_campaign_slides_v" USING btree ("latest");
  CREATE INDEX "_category_tiles_v_version_cards_order_idx" ON "_category_tiles_v_version_cards" USING btree ("_order");
  CREATE INDEX "_category_tiles_v_version_cards_parent_id_idx" ON "_category_tiles_v_version_cards" USING btree ("_parent_id");
  CREATE INDEX "_category_tiles_v_version_cards_image_idx" ON "_category_tiles_v_version_cards" USING btree ("image_id");
  CREATE UNIQUE INDEX "_category_tiles_v_version_cards_locales_locale_parent_id_uni" ON "_category_tiles_v_version_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_category_tiles_v_version_cards_locales_parent_id_idx" ON "_category_tiles_v_version_cards_locales" USING btree ("_parent_id");
  CREATE INDEX "_category_tiles_v_version_version__status_idx" ON "_category_tiles_v" USING btree ("version__status");
  CREATE INDEX "_category_tiles_v_created_at_idx" ON "_category_tiles_v" USING btree ("created_at");
  CREATE INDEX "_category_tiles_v_updated_at_idx" ON "_category_tiles_v" USING btree ("updated_at");
  CREATE INDEX "_category_tiles_v_snapshot_idx" ON "_category_tiles_v" USING btree ("snapshot");
  CREATE INDEX "_category_tiles_v_published_locale_idx" ON "_category_tiles_v" USING btree ("published_locale");
  CREATE INDEX "_category_tiles_v_latest_idx" ON "_category_tiles_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_category_tiles_v_locales_locale_parent_id_unique" ON "_category_tiles_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_category_tiles_v_locales_parent_id_idx" ON "_category_tiles_v_locales" USING btree ("_parent_id");
  CREATE INDEX "_shop_the_look_v_version_version_image_idx" ON "_shop_the_look_v" USING btree ("version_image_id");
  CREATE INDEX "_shop_the_look_v_version_version__status_idx" ON "_shop_the_look_v" USING btree ("version__status");
  CREATE INDEX "_shop_the_look_v_created_at_idx" ON "_shop_the_look_v" USING btree ("created_at");
  CREATE INDEX "_shop_the_look_v_updated_at_idx" ON "_shop_the_look_v" USING btree ("updated_at");
  CREATE INDEX "_shop_the_look_v_snapshot_idx" ON "_shop_the_look_v" USING btree ("snapshot");
  CREATE INDEX "_shop_the_look_v_published_locale_idx" ON "_shop_the_look_v" USING btree ("published_locale");
  CREATE INDEX "_shop_the_look_v_latest_idx" ON "_shop_the_look_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_shop_the_look_v_locales_locale_parent_id_unique" ON "_shop_the_look_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_shop_the_look_v_locales_parent_id_idx" ON "_shop_the_look_v_locales" USING btree ("_parent_id");
  CREATE INDEX "navigation__status_idx" ON "navigation" USING btree ("_status");
  CREATE INDEX "footer_content__status_idx" ON "footer_content" USING btree ("_status");
  CREATE INDEX "studio_story__status_idx" ON "studio_story" USING btree ("_status");
  CREATE INDEX "brands__status_idx" ON "brands" USING btree ("_status");
  CREATE INDEX "journal_section__status_idx" ON "journal_section" USING btree ("_status");
  CREATE INDEX "campaign_slides__status_idx" ON "campaign_slides" USING btree ("_status");
  CREATE INDEX "category_tiles__status_idx" ON "category_tiles" USING btree ("_status");
  CREATE INDEX "shop_the_look__status_idx" ON "shop_the_look" USING btree ("_status");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "_navigation_v_version_primary_nav" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_navigation_v_version_primary_nav_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_navigation_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_footer_content_v_version_help_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_footer_content_v_version_help_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_footer_content_v_version_world_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_footer_content_v_version_world_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_footer_content_v_version_legal_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_footer_content_v_version_legal_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_footer_content_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_footer_content_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_studio_story_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_studio_story_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_brands_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_brands_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_journal_section_v_version_articles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_journal_section_v_version_articles_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_journal_section_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_journal_section_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_campaign_slides_v_version_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_campaign_slides_v_version_slides_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_campaign_slides_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_category_tiles_v_version_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_category_tiles_v_version_cards_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_category_tiles_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_category_tiles_v_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_shop_the_look_v" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "_shop_the_look_v_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "_navigation_v_version_primary_nav" CASCADE;
  DROP TABLE "_navigation_v_version_primary_nav_locales" CASCADE;
  DROP TABLE "_navigation_v" CASCADE;
  DROP TABLE "_footer_content_v_version_help_links" CASCADE;
  DROP TABLE "_footer_content_v_version_help_links_locales" CASCADE;
  DROP TABLE "_footer_content_v_version_world_links" CASCADE;
  DROP TABLE "_footer_content_v_version_world_links_locales" CASCADE;
  DROP TABLE "_footer_content_v_version_legal_links" CASCADE;
  DROP TABLE "_footer_content_v_version_legal_links_locales" CASCADE;
  DROP TABLE "_footer_content_v" CASCADE;
  DROP TABLE "_footer_content_v_locales" CASCADE;
  DROP TABLE "_studio_story_v" CASCADE;
  DROP TABLE "_studio_story_v_locales" CASCADE;
  DROP TABLE "_brands_v" CASCADE;
  DROP TABLE "_brands_v_locales" CASCADE;
  DROP TABLE "_journal_section_v_version_articles" CASCADE;
  DROP TABLE "_journal_section_v_version_articles_locales" CASCADE;
  DROP TABLE "_journal_section_v" CASCADE;
  DROP TABLE "_journal_section_v_locales" CASCADE;
  DROP TABLE "_campaign_slides_v_version_slides" CASCADE;
  DROP TABLE "_campaign_slides_v_version_slides_locales" CASCADE;
  DROP TABLE "_campaign_slides_v" CASCADE;
  DROP TABLE "_category_tiles_v_version_cards" CASCADE;
  DROP TABLE "_category_tiles_v_version_cards_locales" CASCADE;
  DROP TABLE "_category_tiles_v" CASCADE;
  DROP TABLE "_category_tiles_v_locales" CASCADE;
  DROP TABLE "_shop_the_look_v" CASCADE;
  DROP TABLE "_shop_the_look_v_locales" CASCADE;
  DROP INDEX "navigation__status_idx";
  DROP INDEX "footer_content__status_idx";
  DROP INDEX "studio_story__status_idx";
  DROP INDEX "brands__status_idx";
  DROP INDEX "journal_section__status_idx";
  DROP INDEX "campaign_slides__status_idx";
  DROP INDEX "category_tiles__status_idx";
  DROP INDEX "shop_the_look__status_idx";
  ALTER TABLE "navigation_primary_nav" ALTER COLUMN "url" SET NOT NULL;
  ALTER TABLE "navigation_primary_nav_locales" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "footer_content_help_links" ALTER COLUMN "url" SET NOT NULL;
  ALTER TABLE "footer_content_help_links_locales" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "footer_content_world_links" ALTER COLUMN "url" SET NOT NULL;
  ALTER TABLE "footer_content_world_links_locales" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "footer_content_legal_links" ALTER COLUMN "url" SET NOT NULL;
  ALTER TABLE "footer_content_legal_links_locales" ALTER COLUMN "label" SET NOT NULL;
  ALTER TABLE "studio_story" ALTER COLUMN "collection_url" SET NOT NULL;
  ALTER TABLE "studio_story" ALTER COLUMN "image_id" SET NOT NULL;
  ALTER TABLE "studio_story_locales" ALTER COLUMN "eyebrow" SET NOT NULL;
  ALTER TABLE "studio_story_locales" ALTER COLUMN "headline_line1" SET NOT NULL;
  ALTER TABLE "studio_story_locales" ALTER COLUMN "headline_line2" SET NOT NULL;
  ALTER TABLE "studio_story_locales" ALTER COLUMN "paragraph1" SET NOT NULL;
  ALTER TABLE "studio_story_locales" ALTER COLUMN "paragraph2" SET NOT NULL;
  ALTER TABLE "studio_story_locales" ALTER COLUMN "values" SET NOT NULL;
  ALTER TABLE "studio_story_locales" ALTER COLUMN "signature_label" SET NOT NULL;
  ALTER TABLE "studio_story_locales" ALTER COLUMN "signature_tagline" SET NOT NULL;
  ALTER TABLE "studio_story_locales" ALTER COLUMN "collection_link_label" SET NOT NULL;
  ALTER TABLE "brands" ALTER COLUMN "view_all_url" SET NOT NULL;
  ALTER TABLE "brands" ALTER COLUMN "other_brands" SET NOT NULL;
  ALTER TABLE "brands_locales" ALTER COLUMN "eyebrow" SET NOT NULL;
  ALTER TABLE "brands_locales" ALTER COLUMN "view_all_label" SET NOT NULL;
  ALTER TABLE "journal_section_articles" ALTER COLUMN "image_id" SET NOT NULL;
  ALTER TABLE "journal_section_articles" ALTER COLUMN "url" SET NOT NULL;
  ALTER TABLE "journal_section_articles_locales" ALTER COLUMN "category" SET NOT NULL;
  ALTER TABLE "journal_section_articles_locales" ALTER COLUMN "reading_time" SET NOT NULL;
  ALTER TABLE "journal_section_articles_locales" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "journal_section_articles_locales" ALTER COLUMN "summary" SET NOT NULL;
  ALTER TABLE "journal_section" ALTER COLUMN "view_all_url" SET NOT NULL;
  ALTER TABLE "journal_section_locales" ALTER COLUMN "eyebrow" SET NOT NULL;
  ALTER TABLE "journal_section_locales" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "journal_section_locales" ALTER COLUMN "view_all_label" SET NOT NULL;
  ALTER TABLE "campaign_slides_slides" ALTER COLUMN "image_id" SET NOT NULL;
  ALTER TABLE "campaign_slides_slides_locales" ALTER COLUMN "season_label" SET NOT NULL;
  ALTER TABLE "campaign_slides_slides_locales" ALTER COLUMN "edition_label" SET NOT NULL;
  ALTER TABLE "campaign_slides_slides_locales" ALTER COLUMN "headline_line1" SET NOT NULL;
  ALTER TABLE "campaign_slides_slides_locales" ALTER COLUMN "headline_line2" SET NOT NULL;
  ALTER TABLE "campaign_slides_slides_locales" ALTER COLUMN "description" SET NOT NULL;
  ALTER TABLE "campaign_slides_slides_locales" ALTER COLUMN "shop_cta_label" SET NOT NULL;
  ALTER TABLE "campaign_slides_slides_locales" ALTER COLUMN "secondary_cta_label" SET NOT NULL;
  ALTER TABLE "campaign_slides_slides_locales" ALTER COLUMN "tagline" SET NOT NULL;
  ALTER TABLE "campaign_slides_slides_locales" ALTER COLUMN "caption_eyebrow" SET NOT NULL;
  ALTER TABLE "campaign_slides_slides_locales" ALTER COLUMN "caption_headline" SET NOT NULL;
  ALTER TABLE "category_tiles_cards" ALTER COLUMN "category_handle" SET NOT NULL;
  ALTER TABLE "category_tiles_cards" ALTER COLUMN "image_id" SET NOT NULL;
  ALTER TABLE "category_tiles_cards_locales" ALTER COLUMN "title" SET NOT NULL;
  ALTER TABLE "category_tiles_cards_locales" ALTER COLUMN "subtitle" SET NOT NULL;
  ALTER TABLE "category_tiles_locales" ALTER COLUMN "eyebrow" SET NOT NULL;
  ALTER TABLE "category_tiles_locales" ALTER COLUMN "heading" SET NOT NULL;
  ALTER TABLE "category_tiles_locales" ALTER COLUMN "description" SET NOT NULL;
  ALTER TABLE "shop_the_look" ALTER COLUMN "product_handles" SET NOT NULL;
  ALTER TABLE "shop_the_look" ALTER COLUMN "image_id" SET NOT NULL;
  ALTER TABLE "shop_the_look_locales" ALTER COLUMN "eyebrow" SET NOT NULL;
  ALTER TABLE "shop_the_look_locales" ALTER COLUMN "headline_line1" SET NOT NULL;
  ALTER TABLE "shop_the_look_locales" ALTER COLUMN "headline_line2" SET NOT NULL;
  ALTER TABLE "shop_the_look_locales" ALTER COLUMN "description" SET NOT NULL;
  ALTER TABLE "shop_the_look_locales" ALTER COLUMN "caption_label" SET NOT NULL;
  ALTER TABLE "shop_the_look_locales" ALTER COLUMN "bottom_tagline" SET NOT NULL;
  ALTER TABLE "shop_the_look_locales" ALTER COLUMN "shop_set_cta_label" SET NOT NULL;
  ALTER TABLE "shop_the_look_locales" ALTER COLUMN "total_label" SET NOT NULL;
  ALTER TABLE "shop_the_look_locales" ALTER COLUMN "size_hint" SET NOT NULL;
  ALTER TABLE "navigation" DROP COLUMN "_status";
  ALTER TABLE "footer_content" DROP COLUMN "_status";
  ALTER TABLE "studio_story" DROP COLUMN "_status";
  ALTER TABLE "brands" DROP COLUMN "_status";
  ALTER TABLE "journal_section" DROP COLUMN "_status";
  ALTER TABLE "campaign_slides" DROP COLUMN "_status";
  ALTER TABLE "category_tiles" DROP COLUMN "_status";
  ALTER TABLE "shop_the_look" DROP COLUMN "_status";
  DROP TYPE "public"."enum_navigation_status";
  DROP TYPE "public"."enum__navigation_v_version_status";
  DROP TYPE "public"."enum__navigation_v_published_locale";
  DROP TYPE "public"."enum_footer_content_status";
  DROP TYPE "public"."enum__footer_content_v_version_status";
  DROP TYPE "public"."enum__footer_content_v_published_locale";
  DROP TYPE "public"."enum_studio_story_status";
  DROP TYPE "public"."enum__studio_story_v_version_status";
  DROP TYPE "public"."enum__studio_story_v_published_locale";
  DROP TYPE "public"."enum_brands_status";
  DROP TYPE "public"."enum__brands_v_version_status";
  DROP TYPE "public"."enum__brands_v_published_locale";
  DROP TYPE "public"."enum_journal_section_status";
  DROP TYPE "public"."enum__journal_section_v_version_status";
  DROP TYPE "public"."enum__journal_section_v_published_locale";
  DROP TYPE "public"."enum_campaign_slides_status";
  DROP TYPE "public"."enum__campaign_slides_v_version_status";
  DROP TYPE "public"."enum__campaign_slides_v_published_locale";
  DROP TYPE "public"."enum_category_tiles_status";
  DROP TYPE "public"."enum__category_tiles_v_version_status";
  DROP TYPE "public"."enum__category_tiles_v_published_locale";
  DROP TYPE "public"."enum_shop_the_look_status";
  DROP TYPE "public"."enum__shop_the_look_v_version_status";
  DROP TYPE "public"."enum__shop_the_look_v_published_locale";`)
}
