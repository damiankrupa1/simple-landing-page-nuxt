import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_info_terms_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__info_terms_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__info_terms_v_published_locale" AS ENUM('en', 'pl');
  CREATE TYPE "public"."enum_info_privacy_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__info_privacy_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__info_privacy_v_published_locale" AS ENUM('en', 'pl');
  CREATE TYPE "public"."enum_info_cookies_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__info_cookies_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__info_cookies_v_published_locale" AS ENUM('en', 'pl');
  CREATE TYPE "public"."enum_info_accessibility_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__info_accessibility_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__info_accessibility_v_published_locale" AS ENUM('en', 'pl');
  CREATE TABLE "info_terms_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_terms_blocks_text_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_terms_blocks_placeholder" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_terms_blocks_placeholder_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_terms_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "info_terms_blocks_list_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_terms_blocks_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ordered" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_terms_blocks_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"to" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_terms_blocks_link_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_terms_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "info_terms_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_terms_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_terms_blocks_size_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_terms_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_terms_blocks_journal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_terms_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar
  );
  
  CREATE TABLE "info_terms_sections_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_terms" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_status" "enum_info_terms_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "info_terms_locales" (
  	"title" varchar,
  	"description" varchar,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"lead" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_terms_v_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_terms_v_blocks_text_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_terms_v_blocks_placeholder" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_terms_v_blocks_placeholder_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_terms_v_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_info_terms_v_blocks_list_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_terms_v_blocks_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"ordered" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_terms_v_blocks_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"to" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_terms_v_blocks_link_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_terms_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_info_terms_v_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_terms_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_terms_v_blocks_size_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_terms_v_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_terms_v_blocks_journal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_terms_v_version_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_info_terms_v_version_sections_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_terms_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version__status" "enum__info_terms_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__info_terms_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_info_terms_v_locales" (
  	"version_title" varchar,
  	"version_description" varchar,
  	"version_eyebrow" varchar,
  	"version_heading" varchar,
  	"version_lead" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "info_privacy_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_privacy_blocks_text_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_privacy_blocks_placeholder" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_privacy_blocks_placeholder_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_privacy_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "info_privacy_blocks_list_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_privacy_blocks_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ordered" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_privacy_blocks_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"to" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_privacy_blocks_link_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_privacy_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "info_privacy_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_privacy_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_privacy_blocks_size_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_privacy_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_privacy_blocks_journal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_privacy_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar
  );
  
  CREATE TABLE "info_privacy_sections_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_privacy" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_status" "enum_info_privacy_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "info_privacy_locales" (
  	"title" varchar,
  	"description" varchar,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"lead" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_privacy_v_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_privacy_v_blocks_text_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_privacy_v_blocks_placeholder" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_privacy_v_blocks_placeholder_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_privacy_v_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_info_privacy_v_blocks_list_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_privacy_v_blocks_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"ordered" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_privacy_v_blocks_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"to" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_privacy_v_blocks_link_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_privacy_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_info_privacy_v_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_privacy_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_privacy_v_blocks_size_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_privacy_v_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_privacy_v_blocks_journal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_privacy_v_version_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_info_privacy_v_version_sections_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_privacy_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version__status" "enum__info_privacy_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__info_privacy_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_info_privacy_v_locales" (
  	"version_title" varchar,
  	"version_description" varchar,
  	"version_eyebrow" varchar,
  	"version_heading" varchar,
  	"version_lead" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "info_cookies_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_cookies_blocks_text_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_cookies_blocks_placeholder" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_cookies_blocks_placeholder_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_cookies_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "info_cookies_blocks_list_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_cookies_blocks_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ordered" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_cookies_blocks_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"to" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_cookies_blocks_link_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_cookies_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "info_cookies_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_cookies_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_cookies_blocks_size_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_cookies_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_cookies_blocks_journal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_cookies_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar
  );
  
  CREATE TABLE "info_cookies_sections_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_cookies" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_status" "enum_info_cookies_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "info_cookies_locales" (
  	"title" varchar,
  	"description" varchar,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"lead" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_cookies_v_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_cookies_v_blocks_text_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_cookies_v_blocks_placeholder" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_cookies_v_blocks_placeholder_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_cookies_v_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_info_cookies_v_blocks_list_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_cookies_v_blocks_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"ordered" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_cookies_v_blocks_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"to" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_cookies_v_blocks_link_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_cookies_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_info_cookies_v_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_cookies_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_cookies_v_blocks_size_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_cookies_v_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_cookies_v_blocks_journal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_cookies_v_version_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_info_cookies_v_version_sections_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_cookies_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version__status" "enum__info_cookies_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__info_cookies_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_info_cookies_v_locales" (
  	"version_title" varchar,
  	"version_description" varchar,
  	"version_eyebrow" varchar,
  	"version_heading" varchar,
  	"version_lead" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "info_accessibility_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_accessibility_blocks_text_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_accessibility_blocks_placeholder" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_accessibility_blocks_placeholder_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_accessibility_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "info_accessibility_blocks_list_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_accessibility_blocks_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ordered" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_accessibility_blocks_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"to" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_accessibility_blocks_link_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_accessibility_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "info_accessibility_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_accessibility_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_accessibility_blocks_size_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_accessibility_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_accessibility_blocks_journal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_accessibility_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar
  );
  
  CREATE TABLE "info_accessibility_sections_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_accessibility" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_status" "enum_info_accessibility_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "info_accessibility_locales" (
  	"title" varchar,
  	"description" varchar,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"lead" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_accessibility_v_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_accessibility_v_blocks_text_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_accessibility_v_blocks_placeholder" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_accessibility_v_blocks_placeholder_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_accessibility_v_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_info_accessibility_v_blocks_list_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_accessibility_v_blocks_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"ordered" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_accessibility_v_blocks_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"to" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_accessibility_v_blocks_link_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_accessibility_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_info_accessibility_v_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_accessibility_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_accessibility_v_blocks_size_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_accessibility_v_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_accessibility_v_blocks_journal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_accessibility_v_version_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_info_accessibility_v_version_sections_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_accessibility_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version__status" "enum__info_accessibility_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__info_accessibility_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_info_accessibility_v_locales" (
  	"version_title" varchar,
  	"version_description" varchar,
  	"version_eyebrow" varchar,
  	"version_heading" varchar,
  	"version_lead" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "info_terms_blocks_text" ADD CONSTRAINT "info_terms_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_terms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_terms_blocks_text_locales" ADD CONSTRAINT "info_terms_blocks_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_terms_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_terms_blocks_placeholder" ADD CONSTRAINT "info_terms_blocks_placeholder_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_terms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_terms_blocks_placeholder_locales" ADD CONSTRAINT "info_terms_blocks_placeholder_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_terms_blocks_placeholder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_terms_blocks_list_items" ADD CONSTRAINT "info_terms_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_terms_blocks_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_terms_blocks_list_items_locales" ADD CONSTRAINT "info_terms_blocks_list_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_terms_blocks_list_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_terms_blocks_list" ADD CONSTRAINT "info_terms_blocks_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_terms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_terms_blocks_link" ADD CONSTRAINT "info_terms_blocks_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_terms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_terms_blocks_link_locales" ADD CONSTRAINT "info_terms_blocks_link_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_terms_blocks_link"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_terms_blocks_faq_items" ADD CONSTRAINT "info_terms_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_terms_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_terms_blocks_faq_items_locales" ADD CONSTRAINT "info_terms_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_terms_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_terms_blocks_faq" ADD CONSTRAINT "info_terms_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_terms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_terms_blocks_size_table" ADD CONSTRAINT "info_terms_blocks_size_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_terms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_terms_blocks_contact" ADD CONSTRAINT "info_terms_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_terms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_terms_blocks_journal" ADD CONSTRAINT "info_terms_blocks_journal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_terms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_terms_sections" ADD CONSTRAINT "info_terms_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_terms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_terms_sections_locales" ADD CONSTRAINT "info_terms_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_terms_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_terms_locales" ADD CONSTRAINT "info_terms_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_terms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_terms_v_blocks_text" ADD CONSTRAINT "_info_terms_v_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_terms_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_terms_v_blocks_text_locales" ADD CONSTRAINT "_info_terms_v_blocks_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_terms_v_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_terms_v_blocks_placeholder" ADD CONSTRAINT "_info_terms_v_blocks_placeholder_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_terms_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_terms_v_blocks_placeholder_locales" ADD CONSTRAINT "_info_terms_v_blocks_placeholder_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_terms_v_blocks_placeholder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_terms_v_blocks_list_items" ADD CONSTRAINT "_info_terms_v_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_terms_v_blocks_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_terms_v_blocks_list_items_locales" ADD CONSTRAINT "_info_terms_v_blocks_list_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_terms_v_blocks_list_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_terms_v_blocks_list" ADD CONSTRAINT "_info_terms_v_blocks_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_terms_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_terms_v_blocks_link" ADD CONSTRAINT "_info_terms_v_blocks_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_terms_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_terms_v_blocks_link_locales" ADD CONSTRAINT "_info_terms_v_blocks_link_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_terms_v_blocks_link"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_terms_v_blocks_faq_items" ADD CONSTRAINT "_info_terms_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_terms_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_terms_v_blocks_faq_items_locales" ADD CONSTRAINT "_info_terms_v_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_terms_v_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_terms_v_blocks_faq" ADD CONSTRAINT "_info_terms_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_terms_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_terms_v_blocks_size_table" ADD CONSTRAINT "_info_terms_v_blocks_size_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_terms_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_terms_v_blocks_contact" ADD CONSTRAINT "_info_terms_v_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_terms_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_terms_v_blocks_journal" ADD CONSTRAINT "_info_terms_v_blocks_journal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_terms_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_terms_v_version_sections" ADD CONSTRAINT "_info_terms_v_version_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_terms_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_terms_v_version_sections_locales" ADD CONSTRAINT "_info_terms_v_version_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_terms_v_version_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_terms_v_locales" ADD CONSTRAINT "_info_terms_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_terms_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_privacy_blocks_text" ADD CONSTRAINT "info_privacy_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_privacy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_privacy_blocks_text_locales" ADD CONSTRAINT "info_privacy_blocks_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_privacy_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_privacy_blocks_placeholder" ADD CONSTRAINT "info_privacy_blocks_placeholder_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_privacy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_privacy_blocks_placeholder_locales" ADD CONSTRAINT "info_privacy_blocks_placeholder_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_privacy_blocks_placeholder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_privacy_blocks_list_items" ADD CONSTRAINT "info_privacy_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_privacy_blocks_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_privacy_blocks_list_items_locales" ADD CONSTRAINT "info_privacy_blocks_list_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_privacy_blocks_list_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_privacy_blocks_list" ADD CONSTRAINT "info_privacy_blocks_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_privacy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_privacy_blocks_link" ADD CONSTRAINT "info_privacy_blocks_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_privacy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_privacy_blocks_link_locales" ADD CONSTRAINT "info_privacy_blocks_link_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_privacy_blocks_link"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_privacy_blocks_faq_items" ADD CONSTRAINT "info_privacy_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_privacy_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_privacy_blocks_faq_items_locales" ADD CONSTRAINT "info_privacy_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_privacy_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_privacy_blocks_faq" ADD CONSTRAINT "info_privacy_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_privacy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_privacy_blocks_size_table" ADD CONSTRAINT "info_privacy_blocks_size_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_privacy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_privacy_blocks_contact" ADD CONSTRAINT "info_privacy_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_privacy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_privacy_blocks_journal" ADD CONSTRAINT "info_privacy_blocks_journal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_privacy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_privacy_sections" ADD CONSTRAINT "info_privacy_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_privacy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_privacy_sections_locales" ADD CONSTRAINT "info_privacy_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_privacy_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_privacy_locales" ADD CONSTRAINT "info_privacy_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_privacy"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_privacy_v_blocks_text" ADD CONSTRAINT "_info_privacy_v_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_privacy_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_privacy_v_blocks_text_locales" ADD CONSTRAINT "_info_privacy_v_blocks_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_privacy_v_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_privacy_v_blocks_placeholder" ADD CONSTRAINT "_info_privacy_v_blocks_placeholder_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_privacy_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_privacy_v_blocks_placeholder_locales" ADD CONSTRAINT "_info_privacy_v_blocks_placeholder_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_privacy_v_blocks_placeholder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_privacy_v_blocks_list_items" ADD CONSTRAINT "_info_privacy_v_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_privacy_v_blocks_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_privacy_v_blocks_list_items_locales" ADD CONSTRAINT "_info_privacy_v_blocks_list_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_privacy_v_blocks_list_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_privacy_v_blocks_list" ADD CONSTRAINT "_info_privacy_v_blocks_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_privacy_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_privacy_v_blocks_link" ADD CONSTRAINT "_info_privacy_v_blocks_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_privacy_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_privacy_v_blocks_link_locales" ADD CONSTRAINT "_info_privacy_v_blocks_link_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_privacy_v_blocks_link"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_privacy_v_blocks_faq_items" ADD CONSTRAINT "_info_privacy_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_privacy_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_privacy_v_blocks_faq_items_locales" ADD CONSTRAINT "_info_privacy_v_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_privacy_v_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_privacy_v_blocks_faq" ADD CONSTRAINT "_info_privacy_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_privacy_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_privacy_v_blocks_size_table" ADD CONSTRAINT "_info_privacy_v_blocks_size_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_privacy_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_privacy_v_blocks_contact" ADD CONSTRAINT "_info_privacy_v_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_privacy_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_privacy_v_blocks_journal" ADD CONSTRAINT "_info_privacy_v_blocks_journal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_privacy_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_privacy_v_version_sections" ADD CONSTRAINT "_info_privacy_v_version_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_privacy_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_privacy_v_version_sections_locales" ADD CONSTRAINT "_info_privacy_v_version_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_privacy_v_version_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_privacy_v_locales" ADD CONSTRAINT "_info_privacy_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_privacy_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_cookies_blocks_text" ADD CONSTRAINT "info_cookies_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_cookies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_cookies_blocks_text_locales" ADD CONSTRAINT "info_cookies_blocks_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_cookies_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_cookies_blocks_placeholder" ADD CONSTRAINT "info_cookies_blocks_placeholder_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_cookies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_cookies_blocks_placeholder_locales" ADD CONSTRAINT "info_cookies_blocks_placeholder_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_cookies_blocks_placeholder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_cookies_blocks_list_items" ADD CONSTRAINT "info_cookies_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_cookies_blocks_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_cookies_blocks_list_items_locales" ADD CONSTRAINT "info_cookies_blocks_list_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_cookies_blocks_list_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_cookies_blocks_list" ADD CONSTRAINT "info_cookies_blocks_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_cookies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_cookies_blocks_link" ADD CONSTRAINT "info_cookies_blocks_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_cookies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_cookies_blocks_link_locales" ADD CONSTRAINT "info_cookies_blocks_link_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_cookies_blocks_link"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_cookies_blocks_faq_items" ADD CONSTRAINT "info_cookies_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_cookies_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_cookies_blocks_faq_items_locales" ADD CONSTRAINT "info_cookies_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_cookies_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_cookies_blocks_faq" ADD CONSTRAINT "info_cookies_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_cookies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_cookies_blocks_size_table" ADD CONSTRAINT "info_cookies_blocks_size_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_cookies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_cookies_blocks_contact" ADD CONSTRAINT "info_cookies_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_cookies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_cookies_blocks_journal" ADD CONSTRAINT "info_cookies_blocks_journal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_cookies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_cookies_sections" ADD CONSTRAINT "info_cookies_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_cookies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_cookies_sections_locales" ADD CONSTRAINT "info_cookies_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_cookies_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_cookies_locales" ADD CONSTRAINT "info_cookies_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_cookies"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_cookies_v_blocks_text" ADD CONSTRAINT "_info_cookies_v_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_cookies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_cookies_v_blocks_text_locales" ADD CONSTRAINT "_info_cookies_v_blocks_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_cookies_v_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_cookies_v_blocks_placeholder" ADD CONSTRAINT "_info_cookies_v_blocks_placeholder_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_cookies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_cookies_v_blocks_placeholder_locales" ADD CONSTRAINT "_info_cookies_v_blocks_placeholder_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_cookies_v_blocks_placeholder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_cookies_v_blocks_list_items" ADD CONSTRAINT "_info_cookies_v_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_cookies_v_blocks_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_cookies_v_blocks_list_items_locales" ADD CONSTRAINT "_info_cookies_v_blocks_list_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_cookies_v_blocks_list_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_cookies_v_blocks_list" ADD CONSTRAINT "_info_cookies_v_blocks_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_cookies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_cookies_v_blocks_link" ADD CONSTRAINT "_info_cookies_v_blocks_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_cookies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_cookies_v_blocks_link_locales" ADD CONSTRAINT "_info_cookies_v_blocks_link_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_cookies_v_blocks_link"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_cookies_v_blocks_faq_items" ADD CONSTRAINT "_info_cookies_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_cookies_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_cookies_v_blocks_faq_items_locales" ADD CONSTRAINT "_info_cookies_v_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_cookies_v_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_cookies_v_blocks_faq" ADD CONSTRAINT "_info_cookies_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_cookies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_cookies_v_blocks_size_table" ADD CONSTRAINT "_info_cookies_v_blocks_size_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_cookies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_cookies_v_blocks_contact" ADD CONSTRAINT "_info_cookies_v_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_cookies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_cookies_v_blocks_journal" ADD CONSTRAINT "_info_cookies_v_blocks_journal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_cookies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_cookies_v_version_sections" ADD CONSTRAINT "_info_cookies_v_version_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_cookies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_cookies_v_version_sections_locales" ADD CONSTRAINT "_info_cookies_v_version_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_cookies_v_version_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_cookies_v_locales" ADD CONSTRAINT "_info_cookies_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_cookies_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_accessibility_blocks_text" ADD CONSTRAINT "info_accessibility_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_accessibility"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_accessibility_blocks_text_locales" ADD CONSTRAINT "info_accessibility_blocks_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_accessibility_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_accessibility_blocks_placeholder" ADD CONSTRAINT "info_accessibility_blocks_placeholder_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_accessibility"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_accessibility_blocks_placeholder_locales" ADD CONSTRAINT "info_accessibility_blocks_placeholder_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_accessibility_blocks_placeholder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_accessibility_blocks_list_items" ADD CONSTRAINT "info_accessibility_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_accessibility_blocks_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_accessibility_blocks_list_items_locales" ADD CONSTRAINT "info_accessibility_blocks_list_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_accessibility_blocks_list_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_accessibility_blocks_list" ADD CONSTRAINT "info_accessibility_blocks_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_accessibility"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_accessibility_blocks_link" ADD CONSTRAINT "info_accessibility_blocks_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_accessibility"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_accessibility_blocks_link_locales" ADD CONSTRAINT "info_accessibility_blocks_link_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_accessibility_blocks_link"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_accessibility_blocks_faq_items" ADD CONSTRAINT "info_accessibility_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_accessibility_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_accessibility_blocks_faq_items_locales" ADD CONSTRAINT "info_accessibility_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_accessibility_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_accessibility_blocks_faq" ADD CONSTRAINT "info_accessibility_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_accessibility"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_accessibility_blocks_size_table" ADD CONSTRAINT "info_accessibility_blocks_size_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_accessibility"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_accessibility_blocks_contact" ADD CONSTRAINT "info_accessibility_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_accessibility"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_accessibility_blocks_journal" ADD CONSTRAINT "info_accessibility_blocks_journal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_accessibility"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_accessibility_sections" ADD CONSTRAINT "info_accessibility_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_accessibility"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_accessibility_sections_locales" ADD CONSTRAINT "info_accessibility_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_accessibility_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_accessibility_locales" ADD CONSTRAINT "info_accessibility_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_accessibility"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_accessibility_v_blocks_text" ADD CONSTRAINT "_info_accessibility_v_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_accessibility_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_accessibility_v_blocks_text_locales" ADD CONSTRAINT "_info_accessibility_v_blocks_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_accessibility_v_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_accessibility_v_blocks_placeholder" ADD CONSTRAINT "_info_accessibility_v_blocks_placeholder_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_accessibility_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_accessibility_v_blocks_placeholder_locales" ADD CONSTRAINT "_info_accessibility_v_blocks_placeholder_locales_parent_i_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_accessibility_v_blocks_placeholder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_accessibility_v_blocks_list_items" ADD CONSTRAINT "_info_accessibility_v_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_accessibility_v_blocks_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_accessibility_v_blocks_list_items_locales" ADD CONSTRAINT "_info_accessibility_v_blocks_list_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_accessibility_v_blocks_list_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_accessibility_v_blocks_list" ADD CONSTRAINT "_info_accessibility_v_blocks_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_accessibility_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_accessibility_v_blocks_link" ADD CONSTRAINT "_info_accessibility_v_blocks_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_accessibility_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_accessibility_v_blocks_link_locales" ADD CONSTRAINT "_info_accessibility_v_blocks_link_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_accessibility_v_blocks_link"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_accessibility_v_blocks_faq_items" ADD CONSTRAINT "_info_accessibility_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_accessibility_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_accessibility_v_blocks_faq_items_locales" ADD CONSTRAINT "_info_accessibility_v_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_accessibility_v_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_accessibility_v_blocks_faq" ADD CONSTRAINT "_info_accessibility_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_accessibility_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_accessibility_v_blocks_size_table" ADD CONSTRAINT "_info_accessibility_v_blocks_size_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_accessibility_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_accessibility_v_blocks_contact" ADD CONSTRAINT "_info_accessibility_v_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_accessibility_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_accessibility_v_blocks_journal" ADD CONSTRAINT "_info_accessibility_v_blocks_journal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_accessibility_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_accessibility_v_version_sections" ADD CONSTRAINT "_info_accessibility_v_version_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_accessibility_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_accessibility_v_version_sections_locales" ADD CONSTRAINT "_info_accessibility_v_version_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_accessibility_v_version_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_accessibility_v_locales" ADD CONSTRAINT "_info_accessibility_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_accessibility_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "info_terms_blocks_text_order_idx" ON "info_terms_blocks_text" USING btree ("_order");
  CREATE INDEX "info_terms_blocks_text_parent_id_idx" ON "info_terms_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "info_terms_blocks_text_path_idx" ON "info_terms_blocks_text" USING btree ("_path");
  CREATE UNIQUE INDEX "info_terms_blocks_text_locales_locale_parent_id_unique" ON "info_terms_blocks_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_terms_blocks_text_locales_parent_id_idx" ON "info_terms_blocks_text_locales" USING btree ("_parent_id");
  CREATE INDEX "info_terms_blocks_placeholder_order_idx" ON "info_terms_blocks_placeholder" USING btree ("_order");
  CREATE INDEX "info_terms_blocks_placeholder_parent_id_idx" ON "info_terms_blocks_placeholder" USING btree ("_parent_id");
  CREATE INDEX "info_terms_blocks_placeholder_path_idx" ON "info_terms_blocks_placeholder" USING btree ("_path");
  CREATE UNIQUE INDEX "info_terms_blocks_placeholder_locales_locale_parent_id_uniqu" ON "info_terms_blocks_placeholder_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_terms_blocks_placeholder_locales_parent_id_idx" ON "info_terms_blocks_placeholder_locales" USING btree ("_parent_id");
  CREATE INDEX "info_terms_blocks_list_items_order_idx" ON "info_terms_blocks_list_items" USING btree ("_order");
  CREATE INDEX "info_terms_blocks_list_items_parent_id_idx" ON "info_terms_blocks_list_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "info_terms_blocks_list_items_locales_locale_parent_id_unique" ON "info_terms_blocks_list_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_terms_blocks_list_items_locales_parent_id_idx" ON "info_terms_blocks_list_items_locales" USING btree ("_parent_id");
  CREATE INDEX "info_terms_blocks_list_order_idx" ON "info_terms_blocks_list" USING btree ("_order");
  CREATE INDEX "info_terms_blocks_list_parent_id_idx" ON "info_terms_blocks_list" USING btree ("_parent_id");
  CREATE INDEX "info_terms_blocks_list_path_idx" ON "info_terms_blocks_list" USING btree ("_path");
  CREATE INDEX "info_terms_blocks_link_order_idx" ON "info_terms_blocks_link" USING btree ("_order");
  CREATE INDEX "info_terms_blocks_link_parent_id_idx" ON "info_terms_blocks_link" USING btree ("_parent_id");
  CREATE INDEX "info_terms_blocks_link_path_idx" ON "info_terms_blocks_link" USING btree ("_path");
  CREATE UNIQUE INDEX "info_terms_blocks_link_locales_locale_parent_id_unique" ON "info_terms_blocks_link_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_terms_blocks_link_locales_parent_id_idx" ON "info_terms_blocks_link_locales" USING btree ("_parent_id");
  CREATE INDEX "info_terms_blocks_faq_items_order_idx" ON "info_terms_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "info_terms_blocks_faq_items_parent_id_idx" ON "info_terms_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "info_terms_blocks_faq_items_locales_locale_parent_id_unique" ON "info_terms_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_terms_blocks_faq_items_locales_parent_id_idx" ON "info_terms_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "info_terms_blocks_faq_order_idx" ON "info_terms_blocks_faq" USING btree ("_order");
  CREATE INDEX "info_terms_blocks_faq_parent_id_idx" ON "info_terms_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "info_terms_blocks_faq_path_idx" ON "info_terms_blocks_faq" USING btree ("_path");
  CREATE INDEX "info_terms_blocks_size_table_order_idx" ON "info_terms_blocks_size_table" USING btree ("_order");
  CREATE INDEX "info_terms_blocks_size_table_parent_id_idx" ON "info_terms_blocks_size_table" USING btree ("_parent_id");
  CREATE INDEX "info_terms_blocks_size_table_path_idx" ON "info_terms_blocks_size_table" USING btree ("_path");
  CREATE INDEX "info_terms_blocks_contact_order_idx" ON "info_terms_blocks_contact" USING btree ("_order");
  CREATE INDEX "info_terms_blocks_contact_parent_id_idx" ON "info_terms_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "info_terms_blocks_contact_path_idx" ON "info_terms_blocks_contact" USING btree ("_path");
  CREATE INDEX "info_terms_blocks_journal_order_idx" ON "info_terms_blocks_journal" USING btree ("_order");
  CREATE INDEX "info_terms_blocks_journal_parent_id_idx" ON "info_terms_blocks_journal" USING btree ("_parent_id");
  CREATE INDEX "info_terms_blocks_journal_path_idx" ON "info_terms_blocks_journal" USING btree ("_path");
  CREATE INDEX "info_terms_sections_order_idx" ON "info_terms_sections" USING btree ("_order");
  CREATE INDEX "info_terms_sections_parent_id_idx" ON "info_terms_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "info_terms_sections_locales_locale_parent_id_unique" ON "info_terms_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_terms_sections_locales_parent_id_idx" ON "info_terms_sections_locales" USING btree ("_parent_id");
  CREATE INDEX "info_terms__status_idx" ON "info_terms" USING btree ("_status");
  CREATE UNIQUE INDEX "info_terms_locales_locale_parent_id_unique" ON "info_terms_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_terms_locales_parent_id_idx" ON "info_terms_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_terms_v_blocks_text_order_idx" ON "_info_terms_v_blocks_text" USING btree ("_order");
  CREATE INDEX "_info_terms_v_blocks_text_parent_id_idx" ON "_info_terms_v_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "_info_terms_v_blocks_text_path_idx" ON "_info_terms_v_blocks_text" USING btree ("_path");
  CREATE UNIQUE INDEX "_info_terms_v_blocks_text_locales_locale_parent_id_unique" ON "_info_terms_v_blocks_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_terms_v_blocks_text_locales_parent_id_idx" ON "_info_terms_v_blocks_text_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_terms_v_blocks_placeholder_order_idx" ON "_info_terms_v_blocks_placeholder" USING btree ("_order");
  CREATE INDEX "_info_terms_v_blocks_placeholder_parent_id_idx" ON "_info_terms_v_blocks_placeholder" USING btree ("_parent_id");
  CREATE INDEX "_info_terms_v_blocks_placeholder_path_idx" ON "_info_terms_v_blocks_placeholder" USING btree ("_path");
  CREATE UNIQUE INDEX "_info_terms_v_blocks_placeholder_locales_locale_parent_id_un" ON "_info_terms_v_blocks_placeholder_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_terms_v_blocks_placeholder_locales_parent_id_idx" ON "_info_terms_v_blocks_placeholder_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_terms_v_blocks_list_items_order_idx" ON "_info_terms_v_blocks_list_items" USING btree ("_order");
  CREATE INDEX "_info_terms_v_blocks_list_items_parent_id_idx" ON "_info_terms_v_blocks_list_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_info_terms_v_blocks_list_items_locales_locale_parent_id_uni" ON "_info_terms_v_blocks_list_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_terms_v_blocks_list_items_locales_parent_id_idx" ON "_info_terms_v_blocks_list_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_terms_v_blocks_list_order_idx" ON "_info_terms_v_blocks_list" USING btree ("_order");
  CREATE INDEX "_info_terms_v_blocks_list_parent_id_idx" ON "_info_terms_v_blocks_list" USING btree ("_parent_id");
  CREATE INDEX "_info_terms_v_blocks_list_path_idx" ON "_info_terms_v_blocks_list" USING btree ("_path");
  CREATE INDEX "_info_terms_v_blocks_link_order_idx" ON "_info_terms_v_blocks_link" USING btree ("_order");
  CREATE INDEX "_info_terms_v_blocks_link_parent_id_idx" ON "_info_terms_v_blocks_link" USING btree ("_parent_id");
  CREATE INDEX "_info_terms_v_blocks_link_path_idx" ON "_info_terms_v_blocks_link" USING btree ("_path");
  CREATE UNIQUE INDEX "_info_terms_v_blocks_link_locales_locale_parent_id_unique" ON "_info_terms_v_blocks_link_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_terms_v_blocks_link_locales_parent_id_idx" ON "_info_terms_v_blocks_link_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_terms_v_blocks_faq_items_order_idx" ON "_info_terms_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_info_terms_v_blocks_faq_items_parent_id_idx" ON "_info_terms_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_info_terms_v_blocks_faq_items_locales_locale_parent_id_uniq" ON "_info_terms_v_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_terms_v_blocks_faq_items_locales_parent_id_idx" ON "_info_terms_v_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_terms_v_blocks_faq_order_idx" ON "_info_terms_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_info_terms_v_blocks_faq_parent_id_idx" ON "_info_terms_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_info_terms_v_blocks_faq_path_idx" ON "_info_terms_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_info_terms_v_blocks_size_table_order_idx" ON "_info_terms_v_blocks_size_table" USING btree ("_order");
  CREATE INDEX "_info_terms_v_blocks_size_table_parent_id_idx" ON "_info_terms_v_blocks_size_table" USING btree ("_parent_id");
  CREATE INDEX "_info_terms_v_blocks_size_table_path_idx" ON "_info_terms_v_blocks_size_table" USING btree ("_path");
  CREATE INDEX "_info_terms_v_blocks_contact_order_idx" ON "_info_terms_v_blocks_contact" USING btree ("_order");
  CREATE INDEX "_info_terms_v_blocks_contact_parent_id_idx" ON "_info_terms_v_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "_info_terms_v_blocks_contact_path_idx" ON "_info_terms_v_blocks_contact" USING btree ("_path");
  CREATE INDEX "_info_terms_v_blocks_journal_order_idx" ON "_info_terms_v_blocks_journal" USING btree ("_order");
  CREATE INDEX "_info_terms_v_blocks_journal_parent_id_idx" ON "_info_terms_v_blocks_journal" USING btree ("_parent_id");
  CREATE INDEX "_info_terms_v_blocks_journal_path_idx" ON "_info_terms_v_blocks_journal" USING btree ("_path");
  CREATE INDEX "_info_terms_v_version_sections_order_idx" ON "_info_terms_v_version_sections" USING btree ("_order");
  CREATE INDEX "_info_terms_v_version_sections_parent_id_idx" ON "_info_terms_v_version_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_info_terms_v_version_sections_locales_locale_parent_id_uniq" ON "_info_terms_v_version_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_terms_v_version_sections_locales_parent_id_idx" ON "_info_terms_v_version_sections_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_terms_v_version_version__status_idx" ON "_info_terms_v" USING btree ("version__status");
  CREATE INDEX "_info_terms_v_created_at_idx" ON "_info_terms_v" USING btree ("created_at");
  CREATE INDEX "_info_terms_v_updated_at_idx" ON "_info_terms_v" USING btree ("updated_at");
  CREATE INDEX "_info_terms_v_snapshot_idx" ON "_info_terms_v" USING btree ("snapshot");
  CREATE INDEX "_info_terms_v_published_locale_idx" ON "_info_terms_v" USING btree ("published_locale");
  CREATE INDEX "_info_terms_v_latest_idx" ON "_info_terms_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_info_terms_v_locales_locale_parent_id_unique" ON "_info_terms_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_terms_v_locales_parent_id_idx" ON "_info_terms_v_locales" USING btree ("_parent_id");
  CREATE INDEX "info_privacy_blocks_text_order_idx" ON "info_privacy_blocks_text" USING btree ("_order");
  CREATE INDEX "info_privacy_blocks_text_parent_id_idx" ON "info_privacy_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "info_privacy_blocks_text_path_idx" ON "info_privacy_blocks_text" USING btree ("_path");
  CREATE UNIQUE INDEX "info_privacy_blocks_text_locales_locale_parent_id_unique" ON "info_privacy_blocks_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_privacy_blocks_text_locales_parent_id_idx" ON "info_privacy_blocks_text_locales" USING btree ("_parent_id");
  CREATE INDEX "info_privacy_blocks_placeholder_order_idx" ON "info_privacy_blocks_placeholder" USING btree ("_order");
  CREATE INDEX "info_privacy_blocks_placeholder_parent_id_idx" ON "info_privacy_blocks_placeholder" USING btree ("_parent_id");
  CREATE INDEX "info_privacy_blocks_placeholder_path_idx" ON "info_privacy_blocks_placeholder" USING btree ("_path");
  CREATE UNIQUE INDEX "info_privacy_blocks_placeholder_locales_locale_parent_id_uni" ON "info_privacy_blocks_placeholder_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_privacy_blocks_placeholder_locales_parent_id_idx" ON "info_privacy_blocks_placeholder_locales" USING btree ("_parent_id");
  CREATE INDEX "info_privacy_blocks_list_items_order_idx" ON "info_privacy_blocks_list_items" USING btree ("_order");
  CREATE INDEX "info_privacy_blocks_list_items_parent_id_idx" ON "info_privacy_blocks_list_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "info_privacy_blocks_list_items_locales_locale_parent_id_uniq" ON "info_privacy_blocks_list_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_privacy_blocks_list_items_locales_parent_id_idx" ON "info_privacy_blocks_list_items_locales" USING btree ("_parent_id");
  CREATE INDEX "info_privacy_blocks_list_order_idx" ON "info_privacy_blocks_list" USING btree ("_order");
  CREATE INDEX "info_privacy_blocks_list_parent_id_idx" ON "info_privacy_blocks_list" USING btree ("_parent_id");
  CREATE INDEX "info_privacy_blocks_list_path_idx" ON "info_privacy_blocks_list" USING btree ("_path");
  CREATE INDEX "info_privacy_blocks_link_order_idx" ON "info_privacy_blocks_link" USING btree ("_order");
  CREATE INDEX "info_privacy_blocks_link_parent_id_idx" ON "info_privacy_blocks_link" USING btree ("_parent_id");
  CREATE INDEX "info_privacy_blocks_link_path_idx" ON "info_privacy_blocks_link" USING btree ("_path");
  CREATE UNIQUE INDEX "info_privacy_blocks_link_locales_locale_parent_id_unique" ON "info_privacy_blocks_link_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_privacy_blocks_link_locales_parent_id_idx" ON "info_privacy_blocks_link_locales" USING btree ("_parent_id");
  CREATE INDEX "info_privacy_blocks_faq_items_order_idx" ON "info_privacy_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "info_privacy_blocks_faq_items_parent_id_idx" ON "info_privacy_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "info_privacy_blocks_faq_items_locales_locale_parent_id_uniqu" ON "info_privacy_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_privacy_blocks_faq_items_locales_parent_id_idx" ON "info_privacy_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "info_privacy_blocks_faq_order_idx" ON "info_privacy_blocks_faq" USING btree ("_order");
  CREATE INDEX "info_privacy_blocks_faq_parent_id_idx" ON "info_privacy_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "info_privacy_blocks_faq_path_idx" ON "info_privacy_blocks_faq" USING btree ("_path");
  CREATE INDEX "info_privacy_blocks_size_table_order_idx" ON "info_privacy_blocks_size_table" USING btree ("_order");
  CREATE INDEX "info_privacy_blocks_size_table_parent_id_idx" ON "info_privacy_blocks_size_table" USING btree ("_parent_id");
  CREATE INDEX "info_privacy_blocks_size_table_path_idx" ON "info_privacy_blocks_size_table" USING btree ("_path");
  CREATE INDEX "info_privacy_blocks_contact_order_idx" ON "info_privacy_blocks_contact" USING btree ("_order");
  CREATE INDEX "info_privacy_blocks_contact_parent_id_idx" ON "info_privacy_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "info_privacy_blocks_contact_path_idx" ON "info_privacy_blocks_contact" USING btree ("_path");
  CREATE INDEX "info_privacy_blocks_journal_order_idx" ON "info_privacy_blocks_journal" USING btree ("_order");
  CREATE INDEX "info_privacy_blocks_journal_parent_id_idx" ON "info_privacy_blocks_journal" USING btree ("_parent_id");
  CREATE INDEX "info_privacy_blocks_journal_path_idx" ON "info_privacy_blocks_journal" USING btree ("_path");
  CREATE INDEX "info_privacy_sections_order_idx" ON "info_privacy_sections" USING btree ("_order");
  CREATE INDEX "info_privacy_sections_parent_id_idx" ON "info_privacy_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "info_privacy_sections_locales_locale_parent_id_unique" ON "info_privacy_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_privacy_sections_locales_parent_id_idx" ON "info_privacy_sections_locales" USING btree ("_parent_id");
  CREATE INDEX "info_privacy__status_idx" ON "info_privacy" USING btree ("_status");
  CREATE UNIQUE INDEX "info_privacy_locales_locale_parent_id_unique" ON "info_privacy_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_privacy_locales_parent_id_idx" ON "info_privacy_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_privacy_v_blocks_text_order_idx" ON "_info_privacy_v_blocks_text" USING btree ("_order");
  CREATE INDEX "_info_privacy_v_blocks_text_parent_id_idx" ON "_info_privacy_v_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "_info_privacy_v_blocks_text_path_idx" ON "_info_privacy_v_blocks_text" USING btree ("_path");
  CREATE UNIQUE INDEX "_info_privacy_v_blocks_text_locales_locale_parent_id_unique" ON "_info_privacy_v_blocks_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_privacy_v_blocks_text_locales_parent_id_idx" ON "_info_privacy_v_blocks_text_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_privacy_v_blocks_placeholder_order_idx" ON "_info_privacy_v_blocks_placeholder" USING btree ("_order");
  CREATE INDEX "_info_privacy_v_blocks_placeholder_parent_id_idx" ON "_info_privacy_v_blocks_placeholder" USING btree ("_parent_id");
  CREATE INDEX "_info_privacy_v_blocks_placeholder_path_idx" ON "_info_privacy_v_blocks_placeholder" USING btree ("_path");
  CREATE UNIQUE INDEX "_info_privacy_v_blocks_placeholder_locales_locale_parent_id_" ON "_info_privacy_v_blocks_placeholder_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_privacy_v_blocks_placeholder_locales_parent_id_idx" ON "_info_privacy_v_blocks_placeholder_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_privacy_v_blocks_list_items_order_idx" ON "_info_privacy_v_blocks_list_items" USING btree ("_order");
  CREATE INDEX "_info_privacy_v_blocks_list_items_parent_id_idx" ON "_info_privacy_v_blocks_list_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_info_privacy_v_blocks_list_items_locales_locale_parent_id_u" ON "_info_privacy_v_blocks_list_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_privacy_v_blocks_list_items_locales_parent_id_idx" ON "_info_privacy_v_blocks_list_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_privacy_v_blocks_list_order_idx" ON "_info_privacy_v_blocks_list" USING btree ("_order");
  CREATE INDEX "_info_privacy_v_blocks_list_parent_id_idx" ON "_info_privacy_v_blocks_list" USING btree ("_parent_id");
  CREATE INDEX "_info_privacy_v_blocks_list_path_idx" ON "_info_privacy_v_blocks_list" USING btree ("_path");
  CREATE INDEX "_info_privacy_v_blocks_link_order_idx" ON "_info_privacy_v_blocks_link" USING btree ("_order");
  CREATE INDEX "_info_privacy_v_blocks_link_parent_id_idx" ON "_info_privacy_v_blocks_link" USING btree ("_parent_id");
  CREATE INDEX "_info_privacy_v_blocks_link_path_idx" ON "_info_privacy_v_blocks_link" USING btree ("_path");
  CREATE UNIQUE INDEX "_info_privacy_v_blocks_link_locales_locale_parent_id_unique" ON "_info_privacy_v_blocks_link_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_privacy_v_blocks_link_locales_parent_id_idx" ON "_info_privacy_v_blocks_link_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_privacy_v_blocks_faq_items_order_idx" ON "_info_privacy_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_info_privacy_v_blocks_faq_items_parent_id_idx" ON "_info_privacy_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_info_privacy_v_blocks_faq_items_locales_locale_parent_id_un" ON "_info_privacy_v_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_privacy_v_blocks_faq_items_locales_parent_id_idx" ON "_info_privacy_v_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_privacy_v_blocks_faq_order_idx" ON "_info_privacy_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_info_privacy_v_blocks_faq_parent_id_idx" ON "_info_privacy_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_info_privacy_v_blocks_faq_path_idx" ON "_info_privacy_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_info_privacy_v_blocks_size_table_order_idx" ON "_info_privacy_v_blocks_size_table" USING btree ("_order");
  CREATE INDEX "_info_privacy_v_blocks_size_table_parent_id_idx" ON "_info_privacy_v_blocks_size_table" USING btree ("_parent_id");
  CREATE INDEX "_info_privacy_v_blocks_size_table_path_idx" ON "_info_privacy_v_blocks_size_table" USING btree ("_path");
  CREATE INDEX "_info_privacy_v_blocks_contact_order_idx" ON "_info_privacy_v_blocks_contact" USING btree ("_order");
  CREATE INDEX "_info_privacy_v_blocks_contact_parent_id_idx" ON "_info_privacy_v_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "_info_privacy_v_blocks_contact_path_idx" ON "_info_privacy_v_blocks_contact" USING btree ("_path");
  CREATE INDEX "_info_privacy_v_blocks_journal_order_idx" ON "_info_privacy_v_blocks_journal" USING btree ("_order");
  CREATE INDEX "_info_privacy_v_blocks_journal_parent_id_idx" ON "_info_privacy_v_blocks_journal" USING btree ("_parent_id");
  CREATE INDEX "_info_privacy_v_blocks_journal_path_idx" ON "_info_privacy_v_blocks_journal" USING btree ("_path");
  CREATE INDEX "_info_privacy_v_version_sections_order_idx" ON "_info_privacy_v_version_sections" USING btree ("_order");
  CREATE INDEX "_info_privacy_v_version_sections_parent_id_idx" ON "_info_privacy_v_version_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_info_privacy_v_version_sections_locales_locale_parent_id_un" ON "_info_privacy_v_version_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_privacy_v_version_sections_locales_parent_id_idx" ON "_info_privacy_v_version_sections_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_privacy_v_version_version__status_idx" ON "_info_privacy_v" USING btree ("version__status");
  CREATE INDEX "_info_privacy_v_created_at_idx" ON "_info_privacy_v" USING btree ("created_at");
  CREATE INDEX "_info_privacy_v_updated_at_idx" ON "_info_privacy_v" USING btree ("updated_at");
  CREATE INDEX "_info_privacy_v_snapshot_idx" ON "_info_privacy_v" USING btree ("snapshot");
  CREATE INDEX "_info_privacy_v_published_locale_idx" ON "_info_privacy_v" USING btree ("published_locale");
  CREATE INDEX "_info_privacy_v_latest_idx" ON "_info_privacy_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_info_privacy_v_locales_locale_parent_id_unique" ON "_info_privacy_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_privacy_v_locales_parent_id_idx" ON "_info_privacy_v_locales" USING btree ("_parent_id");
  CREATE INDEX "info_cookies_blocks_text_order_idx" ON "info_cookies_blocks_text" USING btree ("_order");
  CREATE INDEX "info_cookies_blocks_text_parent_id_idx" ON "info_cookies_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "info_cookies_blocks_text_path_idx" ON "info_cookies_blocks_text" USING btree ("_path");
  CREATE UNIQUE INDEX "info_cookies_blocks_text_locales_locale_parent_id_unique" ON "info_cookies_blocks_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_cookies_blocks_text_locales_parent_id_idx" ON "info_cookies_blocks_text_locales" USING btree ("_parent_id");
  CREATE INDEX "info_cookies_blocks_placeholder_order_idx" ON "info_cookies_blocks_placeholder" USING btree ("_order");
  CREATE INDEX "info_cookies_blocks_placeholder_parent_id_idx" ON "info_cookies_blocks_placeholder" USING btree ("_parent_id");
  CREATE INDEX "info_cookies_blocks_placeholder_path_idx" ON "info_cookies_blocks_placeholder" USING btree ("_path");
  CREATE UNIQUE INDEX "info_cookies_blocks_placeholder_locales_locale_parent_id_uni" ON "info_cookies_blocks_placeholder_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_cookies_blocks_placeholder_locales_parent_id_idx" ON "info_cookies_blocks_placeholder_locales" USING btree ("_parent_id");
  CREATE INDEX "info_cookies_blocks_list_items_order_idx" ON "info_cookies_blocks_list_items" USING btree ("_order");
  CREATE INDEX "info_cookies_blocks_list_items_parent_id_idx" ON "info_cookies_blocks_list_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "info_cookies_blocks_list_items_locales_locale_parent_id_uniq" ON "info_cookies_blocks_list_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_cookies_blocks_list_items_locales_parent_id_idx" ON "info_cookies_blocks_list_items_locales" USING btree ("_parent_id");
  CREATE INDEX "info_cookies_blocks_list_order_idx" ON "info_cookies_blocks_list" USING btree ("_order");
  CREATE INDEX "info_cookies_blocks_list_parent_id_idx" ON "info_cookies_blocks_list" USING btree ("_parent_id");
  CREATE INDEX "info_cookies_blocks_list_path_idx" ON "info_cookies_blocks_list" USING btree ("_path");
  CREATE INDEX "info_cookies_blocks_link_order_idx" ON "info_cookies_blocks_link" USING btree ("_order");
  CREATE INDEX "info_cookies_blocks_link_parent_id_idx" ON "info_cookies_blocks_link" USING btree ("_parent_id");
  CREATE INDEX "info_cookies_blocks_link_path_idx" ON "info_cookies_blocks_link" USING btree ("_path");
  CREATE UNIQUE INDEX "info_cookies_blocks_link_locales_locale_parent_id_unique" ON "info_cookies_blocks_link_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_cookies_blocks_link_locales_parent_id_idx" ON "info_cookies_blocks_link_locales" USING btree ("_parent_id");
  CREATE INDEX "info_cookies_blocks_faq_items_order_idx" ON "info_cookies_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "info_cookies_blocks_faq_items_parent_id_idx" ON "info_cookies_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "info_cookies_blocks_faq_items_locales_locale_parent_id_uniqu" ON "info_cookies_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_cookies_blocks_faq_items_locales_parent_id_idx" ON "info_cookies_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "info_cookies_blocks_faq_order_idx" ON "info_cookies_blocks_faq" USING btree ("_order");
  CREATE INDEX "info_cookies_blocks_faq_parent_id_idx" ON "info_cookies_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "info_cookies_blocks_faq_path_idx" ON "info_cookies_blocks_faq" USING btree ("_path");
  CREATE INDEX "info_cookies_blocks_size_table_order_idx" ON "info_cookies_blocks_size_table" USING btree ("_order");
  CREATE INDEX "info_cookies_blocks_size_table_parent_id_idx" ON "info_cookies_blocks_size_table" USING btree ("_parent_id");
  CREATE INDEX "info_cookies_blocks_size_table_path_idx" ON "info_cookies_blocks_size_table" USING btree ("_path");
  CREATE INDEX "info_cookies_blocks_contact_order_idx" ON "info_cookies_blocks_contact" USING btree ("_order");
  CREATE INDEX "info_cookies_blocks_contact_parent_id_idx" ON "info_cookies_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "info_cookies_blocks_contact_path_idx" ON "info_cookies_blocks_contact" USING btree ("_path");
  CREATE INDEX "info_cookies_blocks_journal_order_idx" ON "info_cookies_blocks_journal" USING btree ("_order");
  CREATE INDEX "info_cookies_blocks_journal_parent_id_idx" ON "info_cookies_blocks_journal" USING btree ("_parent_id");
  CREATE INDEX "info_cookies_blocks_journal_path_idx" ON "info_cookies_blocks_journal" USING btree ("_path");
  CREATE INDEX "info_cookies_sections_order_idx" ON "info_cookies_sections" USING btree ("_order");
  CREATE INDEX "info_cookies_sections_parent_id_idx" ON "info_cookies_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "info_cookies_sections_locales_locale_parent_id_unique" ON "info_cookies_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_cookies_sections_locales_parent_id_idx" ON "info_cookies_sections_locales" USING btree ("_parent_id");
  CREATE INDEX "info_cookies__status_idx" ON "info_cookies" USING btree ("_status");
  CREATE UNIQUE INDEX "info_cookies_locales_locale_parent_id_unique" ON "info_cookies_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_cookies_locales_parent_id_idx" ON "info_cookies_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_cookies_v_blocks_text_order_idx" ON "_info_cookies_v_blocks_text" USING btree ("_order");
  CREATE INDEX "_info_cookies_v_blocks_text_parent_id_idx" ON "_info_cookies_v_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "_info_cookies_v_blocks_text_path_idx" ON "_info_cookies_v_blocks_text" USING btree ("_path");
  CREATE UNIQUE INDEX "_info_cookies_v_blocks_text_locales_locale_parent_id_unique" ON "_info_cookies_v_blocks_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_cookies_v_blocks_text_locales_parent_id_idx" ON "_info_cookies_v_blocks_text_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_cookies_v_blocks_placeholder_order_idx" ON "_info_cookies_v_blocks_placeholder" USING btree ("_order");
  CREATE INDEX "_info_cookies_v_blocks_placeholder_parent_id_idx" ON "_info_cookies_v_blocks_placeholder" USING btree ("_parent_id");
  CREATE INDEX "_info_cookies_v_blocks_placeholder_path_idx" ON "_info_cookies_v_blocks_placeholder" USING btree ("_path");
  CREATE UNIQUE INDEX "_info_cookies_v_blocks_placeholder_locales_locale_parent_id_" ON "_info_cookies_v_blocks_placeholder_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_cookies_v_blocks_placeholder_locales_parent_id_idx" ON "_info_cookies_v_blocks_placeholder_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_cookies_v_blocks_list_items_order_idx" ON "_info_cookies_v_blocks_list_items" USING btree ("_order");
  CREATE INDEX "_info_cookies_v_blocks_list_items_parent_id_idx" ON "_info_cookies_v_blocks_list_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_info_cookies_v_blocks_list_items_locales_locale_parent_id_u" ON "_info_cookies_v_blocks_list_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_cookies_v_blocks_list_items_locales_parent_id_idx" ON "_info_cookies_v_blocks_list_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_cookies_v_blocks_list_order_idx" ON "_info_cookies_v_blocks_list" USING btree ("_order");
  CREATE INDEX "_info_cookies_v_blocks_list_parent_id_idx" ON "_info_cookies_v_blocks_list" USING btree ("_parent_id");
  CREATE INDEX "_info_cookies_v_blocks_list_path_idx" ON "_info_cookies_v_blocks_list" USING btree ("_path");
  CREATE INDEX "_info_cookies_v_blocks_link_order_idx" ON "_info_cookies_v_blocks_link" USING btree ("_order");
  CREATE INDEX "_info_cookies_v_blocks_link_parent_id_idx" ON "_info_cookies_v_blocks_link" USING btree ("_parent_id");
  CREATE INDEX "_info_cookies_v_blocks_link_path_idx" ON "_info_cookies_v_blocks_link" USING btree ("_path");
  CREATE UNIQUE INDEX "_info_cookies_v_blocks_link_locales_locale_parent_id_unique" ON "_info_cookies_v_blocks_link_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_cookies_v_blocks_link_locales_parent_id_idx" ON "_info_cookies_v_blocks_link_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_cookies_v_blocks_faq_items_order_idx" ON "_info_cookies_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_info_cookies_v_blocks_faq_items_parent_id_idx" ON "_info_cookies_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_info_cookies_v_blocks_faq_items_locales_locale_parent_id_un" ON "_info_cookies_v_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_cookies_v_blocks_faq_items_locales_parent_id_idx" ON "_info_cookies_v_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_cookies_v_blocks_faq_order_idx" ON "_info_cookies_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_info_cookies_v_blocks_faq_parent_id_idx" ON "_info_cookies_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_info_cookies_v_blocks_faq_path_idx" ON "_info_cookies_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_info_cookies_v_blocks_size_table_order_idx" ON "_info_cookies_v_blocks_size_table" USING btree ("_order");
  CREATE INDEX "_info_cookies_v_blocks_size_table_parent_id_idx" ON "_info_cookies_v_blocks_size_table" USING btree ("_parent_id");
  CREATE INDEX "_info_cookies_v_blocks_size_table_path_idx" ON "_info_cookies_v_blocks_size_table" USING btree ("_path");
  CREATE INDEX "_info_cookies_v_blocks_contact_order_idx" ON "_info_cookies_v_blocks_contact" USING btree ("_order");
  CREATE INDEX "_info_cookies_v_blocks_contact_parent_id_idx" ON "_info_cookies_v_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "_info_cookies_v_blocks_contact_path_idx" ON "_info_cookies_v_blocks_contact" USING btree ("_path");
  CREATE INDEX "_info_cookies_v_blocks_journal_order_idx" ON "_info_cookies_v_blocks_journal" USING btree ("_order");
  CREATE INDEX "_info_cookies_v_blocks_journal_parent_id_idx" ON "_info_cookies_v_blocks_journal" USING btree ("_parent_id");
  CREATE INDEX "_info_cookies_v_blocks_journal_path_idx" ON "_info_cookies_v_blocks_journal" USING btree ("_path");
  CREATE INDEX "_info_cookies_v_version_sections_order_idx" ON "_info_cookies_v_version_sections" USING btree ("_order");
  CREATE INDEX "_info_cookies_v_version_sections_parent_id_idx" ON "_info_cookies_v_version_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_info_cookies_v_version_sections_locales_locale_parent_id_un" ON "_info_cookies_v_version_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_cookies_v_version_sections_locales_parent_id_idx" ON "_info_cookies_v_version_sections_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_cookies_v_version_version__status_idx" ON "_info_cookies_v" USING btree ("version__status");
  CREATE INDEX "_info_cookies_v_created_at_idx" ON "_info_cookies_v" USING btree ("created_at");
  CREATE INDEX "_info_cookies_v_updated_at_idx" ON "_info_cookies_v" USING btree ("updated_at");
  CREATE INDEX "_info_cookies_v_snapshot_idx" ON "_info_cookies_v" USING btree ("snapshot");
  CREATE INDEX "_info_cookies_v_published_locale_idx" ON "_info_cookies_v" USING btree ("published_locale");
  CREATE INDEX "_info_cookies_v_latest_idx" ON "_info_cookies_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_info_cookies_v_locales_locale_parent_id_unique" ON "_info_cookies_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_cookies_v_locales_parent_id_idx" ON "_info_cookies_v_locales" USING btree ("_parent_id");
  CREATE INDEX "info_accessibility_blocks_text_order_idx" ON "info_accessibility_blocks_text" USING btree ("_order");
  CREATE INDEX "info_accessibility_blocks_text_parent_id_idx" ON "info_accessibility_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "info_accessibility_blocks_text_path_idx" ON "info_accessibility_blocks_text" USING btree ("_path");
  CREATE UNIQUE INDEX "info_accessibility_blocks_text_locales_locale_parent_id_uniq" ON "info_accessibility_blocks_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_accessibility_blocks_text_locales_parent_id_idx" ON "info_accessibility_blocks_text_locales" USING btree ("_parent_id");
  CREATE INDEX "info_accessibility_blocks_placeholder_order_idx" ON "info_accessibility_blocks_placeholder" USING btree ("_order");
  CREATE INDEX "info_accessibility_blocks_placeholder_parent_id_idx" ON "info_accessibility_blocks_placeholder" USING btree ("_parent_id");
  CREATE INDEX "info_accessibility_blocks_placeholder_path_idx" ON "info_accessibility_blocks_placeholder" USING btree ("_path");
  CREATE UNIQUE INDEX "info_accessibility_blocks_placeholder_locales_locale_parent_" ON "info_accessibility_blocks_placeholder_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_accessibility_blocks_placeholder_locales_parent_id_idx" ON "info_accessibility_blocks_placeholder_locales" USING btree ("_parent_id");
  CREATE INDEX "info_accessibility_blocks_list_items_order_idx" ON "info_accessibility_blocks_list_items" USING btree ("_order");
  CREATE INDEX "info_accessibility_blocks_list_items_parent_id_idx" ON "info_accessibility_blocks_list_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "info_accessibility_blocks_list_items_locales_locale_parent_i" ON "info_accessibility_blocks_list_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_accessibility_blocks_list_items_locales_parent_id_idx" ON "info_accessibility_blocks_list_items_locales" USING btree ("_parent_id");
  CREATE INDEX "info_accessibility_blocks_list_order_idx" ON "info_accessibility_blocks_list" USING btree ("_order");
  CREATE INDEX "info_accessibility_blocks_list_parent_id_idx" ON "info_accessibility_blocks_list" USING btree ("_parent_id");
  CREATE INDEX "info_accessibility_blocks_list_path_idx" ON "info_accessibility_blocks_list" USING btree ("_path");
  CREATE INDEX "info_accessibility_blocks_link_order_idx" ON "info_accessibility_blocks_link" USING btree ("_order");
  CREATE INDEX "info_accessibility_blocks_link_parent_id_idx" ON "info_accessibility_blocks_link" USING btree ("_parent_id");
  CREATE INDEX "info_accessibility_blocks_link_path_idx" ON "info_accessibility_blocks_link" USING btree ("_path");
  CREATE UNIQUE INDEX "info_accessibility_blocks_link_locales_locale_parent_id_uniq" ON "info_accessibility_blocks_link_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_accessibility_blocks_link_locales_parent_id_idx" ON "info_accessibility_blocks_link_locales" USING btree ("_parent_id");
  CREATE INDEX "info_accessibility_blocks_faq_items_order_idx" ON "info_accessibility_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "info_accessibility_blocks_faq_items_parent_id_idx" ON "info_accessibility_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "info_accessibility_blocks_faq_items_locales_locale_parent_id" ON "info_accessibility_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_accessibility_blocks_faq_items_locales_parent_id_idx" ON "info_accessibility_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "info_accessibility_blocks_faq_order_idx" ON "info_accessibility_blocks_faq" USING btree ("_order");
  CREATE INDEX "info_accessibility_blocks_faq_parent_id_idx" ON "info_accessibility_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "info_accessibility_blocks_faq_path_idx" ON "info_accessibility_blocks_faq" USING btree ("_path");
  CREATE INDEX "info_accessibility_blocks_size_table_order_idx" ON "info_accessibility_blocks_size_table" USING btree ("_order");
  CREATE INDEX "info_accessibility_blocks_size_table_parent_id_idx" ON "info_accessibility_blocks_size_table" USING btree ("_parent_id");
  CREATE INDEX "info_accessibility_blocks_size_table_path_idx" ON "info_accessibility_blocks_size_table" USING btree ("_path");
  CREATE INDEX "info_accessibility_blocks_contact_order_idx" ON "info_accessibility_blocks_contact" USING btree ("_order");
  CREATE INDEX "info_accessibility_blocks_contact_parent_id_idx" ON "info_accessibility_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "info_accessibility_blocks_contact_path_idx" ON "info_accessibility_blocks_contact" USING btree ("_path");
  CREATE INDEX "info_accessibility_blocks_journal_order_idx" ON "info_accessibility_blocks_journal" USING btree ("_order");
  CREATE INDEX "info_accessibility_blocks_journal_parent_id_idx" ON "info_accessibility_blocks_journal" USING btree ("_parent_id");
  CREATE INDEX "info_accessibility_blocks_journal_path_idx" ON "info_accessibility_blocks_journal" USING btree ("_path");
  CREATE INDEX "info_accessibility_sections_order_idx" ON "info_accessibility_sections" USING btree ("_order");
  CREATE INDEX "info_accessibility_sections_parent_id_idx" ON "info_accessibility_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "info_accessibility_sections_locales_locale_parent_id_unique" ON "info_accessibility_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_accessibility_sections_locales_parent_id_idx" ON "info_accessibility_sections_locales" USING btree ("_parent_id");
  CREATE INDEX "info_accessibility__status_idx" ON "info_accessibility" USING btree ("_status");
  CREATE UNIQUE INDEX "info_accessibility_locales_locale_parent_id_unique" ON "info_accessibility_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_accessibility_locales_parent_id_idx" ON "info_accessibility_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_accessibility_v_blocks_text_order_idx" ON "_info_accessibility_v_blocks_text" USING btree ("_order");
  CREATE INDEX "_info_accessibility_v_blocks_text_parent_id_idx" ON "_info_accessibility_v_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "_info_accessibility_v_blocks_text_path_idx" ON "_info_accessibility_v_blocks_text" USING btree ("_path");
  CREATE UNIQUE INDEX "_info_accessibility_v_blocks_text_locales_locale_parent_id_u" ON "_info_accessibility_v_blocks_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_accessibility_v_blocks_text_locales_parent_id_idx" ON "_info_accessibility_v_blocks_text_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_accessibility_v_blocks_placeholder_order_idx" ON "_info_accessibility_v_blocks_placeholder" USING btree ("_order");
  CREATE INDEX "_info_accessibility_v_blocks_placeholder_parent_id_idx" ON "_info_accessibility_v_blocks_placeholder" USING btree ("_parent_id");
  CREATE INDEX "_info_accessibility_v_blocks_placeholder_path_idx" ON "_info_accessibility_v_blocks_placeholder" USING btree ("_path");
  CREATE UNIQUE INDEX "_info_accessibility_v_blocks_placeholder_locales_locale_pare" ON "_info_accessibility_v_blocks_placeholder_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_accessibility_v_blocks_placeholder_locales_parent__idx" ON "_info_accessibility_v_blocks_placeholder_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_accessibility_v_blocks_list_items_order_idx" ON "_info_accessibility_v_blocks_list_items" USING btree ("_order");
  CREATE INDEX "_info_accessibility_v_blocks_list_items_parent_id_idx" ON "_info_accessibility_v_blocks_list_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_info_accessibility_v_blocks_list_items_locales_locale_paren" ON "_info_accessibility_v_blocks_list_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_accessibility_v_blocks_list_items_locales_parent_i_idx" ON "_info_accessibility_v_blocks_list_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_accessibility_v_blocks_list_order_idx" ON "_info_accessibility_v_blocks_list" USING btree ("_order");
  CREATE INDEX "_info_accessibility_v_blocks_list_parent_id_idx" ON "_info_accessibility_v_blocks_list" USING btree ("_parent_id");
  CREATE INDEX "_info_accessibility_v_blocks_list_path_idx" ON "_info_accessibility_v_blocks_list" USING btree ("_path");
  CREATE INDEX "_info_accessibility_v_blocks_link_order_idx" ON "_info_accessibility_v_blocks_link" USING btree ("_order");
  CREATE INDEX "_info_accessibility_v_blocks_link_parent_id_idx" ON "_info_accessibility_v_blocks_link" USING btree ("_parent_id");
  CREATE INDEX "_info_accessibility_v_blocks_link_path_idx" ON "_info_accessibility_v_blocks_link" USING btree ("_path");
  CREATE UNIQUE INDEX "_info_accessibility_v_blocks_link_locales_locale_parent_id_u" ON "_info_accessibility_v_blocks_link_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_accessibility_v_blocks_link_locales_parent_id_idx" ON "_info_accessibility_v_blocks_link_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_accessibility_v_blocks_faq_items_order_idx" ON "_info_accessibility_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_info_accessibility_v_blocks_faq_items_parent_id_idx" ON "_info_accessibility_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_info_accessibility_v_blocks_faq_items_locales_locale_parent" ON "_info_accessibility_v_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_accessibility_v_blocks_faq_items_locales_parent_id_idx" ON "_info_accessibility_v_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_accessibility_v_blocks_faq_order_idx" ON "_info_accessibility_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_info_accessibility_v_blocks_faq_parent_id_idx" ON "_info_accessibility_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_info_accessibility_v_blocks_faq_path_idx" ON "_info_accessibility_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_info_accessibility_v_blocks_size_table_order_idx" ON "_info_accessibility_v_blocks_size_table" USING btree ("_order");
  CREATE INDEX "_info_accessibility_v_blocks_size_table_parent_id_idx" ON "_info_accessibility_v_blocks_size_table" USING btree ("_parent_id");
  CREATE INDEX "_info_accessibility_v_blocks_size_table_path_idx" ON "_info_accessibility_v_blocks_size_table" USING btree ("_path");
  CREATE INDEX "_info_accessibility_v_blocks_contact_order_idx" ON "_info_accessibility_v_blocks_contact" USING btree ("_order");
  CREATE INDEX "_info_accessibility_v_blocks_contact_parent_id_idx" ON "_info_accessibility_v_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "_info_accessibility_v_blocks_contact_path_idx" ON "_info_accessibility_v_blocks_contact" USING btree ("_path");
  CREATE INDEX "_info_accessibility_v_blocks_journal_order_idx" ON "_info_accessibility_v_blocks_journal" USING btree ("_order");
  CREATE INDEX "_info_accessibility_v_blocks_journal_parent_id_idx" ON "_info_accessibility_v_blocks_journal" USING btree ("_parent_id");
  CREATE INDEX "_info_accessibility_v_blocks_journal_path_idx" ON "_info_accessibility_v_blocks_journal" USING btree ("_path");
  CREATE INDEX "_info_accessibility_v_version_sections_order_idx" ON "_info_accessibility_v_version_sections" USING btree ("_order");
  CREATE INDEX "_info_accessibility_v_version_sections_parent_id_idx" ON "_info_accessibility_v_version_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_info_accessibility_v_version_sections_locales_locale_parent" ON "_info_accessibility_v_version_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_accessibility_v_version_sections_locales_parent_id_idx" ON "_info_accessibility_v_version_sections_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_accessibility_v_version_version__status_idx" ON "_info_accessibility_v" USING btree ("version__status");
  CREATE INDEX "_info_accessibility_v_created_at_idx" ON "_info_accessibility_v" USING btree ("created_at");
  CREATE INDEX "_info_accessibility_v_updated_at_idx" ON "_info_accessibility_v" USING btree ("updated_at");
  CREATE INDEX "_info_accessibility_v_snapshot_idx" ON "_info_accessibility_v" USING btree ("snapshot");
  CREATE INDEX "_info_accessibility_v_published_locale_idx" ON "_info_accessibility_v" USING btree ("published_locale");
  CREATE INDEX "_info_accessibility_v_latest_idx" ON "_info_accessibility_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_info_accessibility_v_locales_locale_parent_id_unique" ON "_info_accessibility_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_accessibility_v_locales_parent_id_idx" ON "_info_accessibility_v_locales" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "info_terms_blocks_text" CASCADE;
  DROP TABLE "info_terms_blocks_text_locales" CASCADE;
  DROP TABLE "info_terms_blocks_placeholder" CASCADE;
  DROP TABLE "info_terms_blocks_placeholder_locales" CASCADE;
  DROP TABLE "info_terms_blocks_list_items" CASCADE;
  DROP TABLE "info_terms_blocks_list_items_locales" CASCADE;
  DROP TABLE "info_terms_blocks_list" CASCADE;
  DROP TABLE "info_terms_blocks_link" CASCADE;
  DROP TABLE "info_terms_blocks_link_locales" CASCADE;
  DROP TABLE "info_terms_blocks_faq_items" CASCADE;
  DROP TABLE "info_terms_blocks_faq_items_locales" CASCADE;
  DROP TABLE "info_terms_blocks_faq" CASCADE;
  DROP TABLE "info_terms_blocks_size_table" CASCADE;
  DROP TABLE "info_terms_blocks_contact" CASCADE;
  DROP TABLE "info_terms_blocks_journal" CASCADE;
  DROP TABLE "info_terms_sections" CASCADE;
  DROP TABLE "info_terms_sections_locales" CASCADE;
  DROP TABLE "info_terms" CASCADE;
  DROP TABLE "info_terms_locales" CASCADE;
  DROP TABLE "_info_terms_v_blocks_text" CASCADE;
  DROP TABLE "_info_terms_v_blocks_text_locales" CASCADE;
  DROP TABLE "_info_terms_v_blocks_placeholder" CASCADE;
  DROP TABLE "_info_terms_v_blocks_placeholder_locales" CASCADE;
  DROP TABLE "_info_terms_v_blocks_list_items" CASCADE;
  DROP TABLE "_info_terms_v_blocks_list_items_locales" CASCADE;
  DROP TABLE "_info_terms_v_blocks_list" CASCADE;
  DROP TABLE "_info_terms_v_blocks_link" CASCADE;
  DROP TABLE "_info_terms_v_blocks_link_locales" CASCADE;
  DROP TABLE "_info_terms_v_blocks_faq_items" CASCADE;
  DROP TABLE "_info_terms_v_blocks_faq_items_locales" CASCADE;
  DROP TABLE "_info_terms_v_blocks_faq" CASCADE;
  DROP TABLE "_info_terms_v_blocks_size_table" CASCADE;
  DROP TABLE "_info_terms_v_blocks_contact" CASCADE;
  DROP TABLE "_info_terms_v_blocks_journal" CASCADE;
  DROP TABLE "_info_terms_v_version_sections" CASCADE;
  DROP TABLE "_info_terms_v_version_sections_locales" CASCADE;
  DROP TABLE "_info_terms_v" CASCADE;
  DROP TABLE "_info_terms_v_locales" CASCADE;
  DROP TABLE "info_privacy_blocks_text" CASCADE;
  DROP TABLE "info_privacy_blocks_text_locales" CASCADE;
  DROP TABLE "info_privacy_blocks_placeholder" CASCADE;
  DROP TABLE "info_privacy_blocks_placeholder_locales" CASCADE;
  DROP TABLE "info_privacy_blocks_list_items" CASCADE;
  DROP TABLE "info_privacy_blocks_list_items_locales" CASCADE;
  DROP TABLE "info_privacy_blocks_list" CASCADE;
  DROP TABLE "info_privacy_blocks_link" CASCADE;
  DROP TABLE "info_privacy_blocks_link_locales" CASCADE;
  DROP TABLE "info_privacy_blocks_faq_items" CASCADE;
  DROP TABLE "info_privacy_blocks_faq_items_locales" CASCADE;
  DROP TABLE "info_privacy_blocks_faq" CASCADE;
  DROP TABLE "info_privacy_blocks_size_table" CASCADE;
  DROP TABLE "info_privacy_blocks_contact" CASCADE;
  DROP TABLE "info_privacy_blocks_journal" CASCADE;
  DROP TABLE "info_privacy_sections" CASCADE;
  DROP TABLE "info_privacy_sections_locales" CASCADE;
  DROP TABLE "info_privacy" CASCADE;
  DROP TABLE "info_privacy_locales" CASCADE;
  DROP TABLE "_info_privacy_v_blocks_text" CASCADE;
  DROP TABLE "_info_privacy_v_blocks_text_locales" CASCADE;
  DROP TABLE "_info_privacy_v_blocks_placeholder" CASCADE;
  DROP TABLE "_info_privacy_v_blocks_placeholder_locales" CASCADE;
  DROP TABLE "_info_privacy_v_blocks_list_items" CASCADE;
  DROP TABLE "_info_privacy_v_blocks_list_items_locales" CASCADE;
  DROP TABLE "_info_privacy_v_blocks_list" CASCADE;
  DROP TABLE "_info_privacy_v_blocks_link" CASCADE;
  DROP TABLE "_info_privacy_v_blocks_link_locales" CASCADE;
  DROP TABLE "_info_privacy_v_blocks_faq_items" CASCADE;
  DROP TABLE "_info_privacy_v_blocks_faq_items_locales" CASCADE;
  DROP TABLE "_info_privacy_v_blocks_faq" CASCADE;
  DROP TABLE "_info_privacy_v_blocks_size_table" CASCADE;
  DROP TABLE "_info_privacy_v_blocks_contact" CASCADE;
  DROP TABLE "_info_privacy_v_blocks_journal" CASCADE;
  DROP TABLE "_info_privacy_v_version_sections" CASCADE;
  DROP TABLE "_info_privacy_v_version_sections_locales" CASCADE;
  DROP TABLE "_info_privacy_v" CASCADE;
  DROP TABLE "_info_privacy_v_locales" CASCADE;
  DROP TABLE "info_cookies_blocks_text" CASCADE;
  DROP TABLE "info_cookies_blocks_text_locales" CASCADE;
  DROP TABLE "info_cookies_blocks_placeholder" CASCADE;
  DROP TABLE "info_cookies_blocks_placeholder_locales" CASCADE;
  DROP TABLE "info_cookies_blocks_list_items" CASCADE;
  DROP TABLE "info_cookies_blocks_list_items_locales" CASCADE;
  DROP TABLE "info_cookies_blocks_list" CASCADE;
  DROP TABLE "info_cookies_blocks_link" CASCADE;
  DROP TABLE "info_cookies_blocks_link_locales" CASCADE;
  DROP TABLE "info_cookies_blocks_faq_items" CASCADE;
  DROP TABLE "info_cookies_blocks_faq_items_locales" CASCADE;
  DROP TABLE "info_cookies_blocks_faq" CASCADE;
  DROP TABLE "info_cookies_blocks_size_table" CASCADE;
  DROP TABLE "info_cookies_blocks_contact" CASCADE;
  DROP TABLE "info_cookies_blocks_journal" CASCADE;
  DROP TABLE "info_cookies_sections" CASCADE;
  DROP TABLE "info_cookies_sections_locales" CASCADE;
  DROP TABLE "info_cookies" CASCADE;
  DROP TABLE "info_cookies_locales" CASCADE;
  DROP TABLE "_info_cookies_v_blocks_text" CASCADE;
  DROP TABLE "_info_cookies_v_blocks_text_locales" CASCADE;
  DROP TABLE "_info_cookies_v_blocks_placeholder" CASCADE;
  DROP TABLE "_info_cookies_v_blocks_placeholder_locales" CASCADE;
  DROP TABLE "_info_cookies_v_blocks_list_items" CASCADE;
  DROP TABLE "_info_cookies_v_blocks_list_items_locales" CASCADE;
  DROP TABLE "_info_cookies_v_blocks_list" CASCADE;
  DROP TABLE "_info_cookies_v_blocks_link" CASCADE;
  DROP TABLE "_info_cookies_v_blocks_link_locales" CASCADE;
  DROP TABLE "_info_cookies_v_blocks_faq_items" CASCADE;
  DROP TABLE "_info_cookies_v_blocks_faq_items_locales" CASCADE;
  DROP TABLE "_info_cookies_v_blocks_faq" CASCADE;
  DROP TABLE "_info_cookies_v_blocks_size_table" CASCADE;
  DROP TABLE "_info_cookies_v_blocks_contact" CASCADE;
  DROP TABLE "_info_cookies_v_blocks_journal" CASCADE;
  DROP TABLE "_info_cookies_v_version_sections" CASCADE;
  DROP TABLE "_info_cookies_v_version_sections_locales" CASCADE;
  DROP TABLE "_info_cookies_v" CASCADE;
  DROP TABLE "_info_cookies_v_locales" CASCADE;
  DROP TABLE "info_accessibility_blocks_text" CASCADE;
  DROP TABLE "info_accessibility_blocks_text_locales" CASCADE;
  DROP TABLE "info_accessibility_blocks_placeholder" CASCADE;
  DROP TABLE "info_accessibility_blocks_placeholder_locales" CASCADE;
  DROP TABLE "info_accessibility_blocks_list_items" CASCADE;
  DROP TABLE "info_accessibility_blocks_list_items_locales" CASCADE;
  DROP TABLE "info_accessibility_blocks_list" CASCADE;
  DROP TABLE "info_accessibility_blocks_link" CASCADE;
  DROP TABLE "info_accessibility_blocks_link_locales" CASCADE;
  DROP TABLE "info_accessibility_blocks_faq_items" CASCADE;
  DROP TABLE "info_accessibility_blocks_faq_items_locales" CASCADE;
  DROP TABLE "info_accessibility_blocks_faq" CASCADE;
  DROP TABLE "info_accessibility_blocks_size_table" CASCADE;
  DROP TABLE "info_accessibility_blocks_contact" CASCADE;
  DROP TABLE "info_accessibility_blocks_journal" CASCADE;
  DROP TABLE "info_accessibility_sections" CASCADE;
  DROP TABLE "info_accessibility_sections_locales" CASCADE;
  DROP TABLE "info_accessibility" CASCADE;
  DROP TABLE "info_accessibility_locales" CASCADE;
  DROP TABLE "_info_accessibility_v_blocks_text" CASCADE;
  DROP TABLE "_info_accessibility_v_blocks_text_locales" CASCADE;
  DROP TABLE "_info_accessibility_v_blocks_placeholder" CASCADE;
  DROP TABLE "_info_accessibility_v_blocks_placeholder_locales" CASCADE;
  DROP TABLE "_info_accessibility_v_blocks_list_items" CASCADE;
  DROP TABLE "_info_accessibility_v_blocks_list_items_locales" CASCADE;
  DROP TABLE "_info_accessibility_v_blocks_list" CASCADE;
  DROP TABLE "_info_accessibility_v_blocks_link" CASCADE;
  DROP TABLE "_info_accessibility_v_blocks_link_locales" CASCADE;
  DROP TABLE "_info_accessibility_v_blocks_faq_items" CASCADE;
  DROP TABLE "_info_accessibility_v_blocks_faq_items_locales" CASCADE;
  DROP TABLE "_info_accessibility_v_blocks_faq" CASCADE;
  DROP TABLE "_info_accessibility_v_blocks_size_table" CASCADE;
  DROP TABLE "_info_accessibility_v_blocks_contact" CASCADE;
  DROP TABLE "_info_accessibility_v_blocks_journal" CASCADE;
  DROP TABLE "_info_accessibility_v_version_sections" CASCADE;
  DROP TABLE "_info_accessibility_v_version_sections_locales" CASCADE;
  DROP TABLE "_info_accessibility_v" CASCADE;
  DROP TABLE "_info_accessibility_v_locales" CASCADE;
  DROP TYPE "public"."enum_info_terms_status";
  DROP TYPE "public"."enum__info_terms_v_version_status";
  DROP TYPE "public"."enum__info_terms_v_published_locale";
  DROP TYPE "public"."enum_info_privacy_status";
  DROP TYPE "public"."enum__info_privacy_v_version_status";
  DROP TYPE "public"."enum__info_privacy_v_published_locale";
  DROP TYPE "public"."enum_info_cookies_status";
  DROP TYPE "public"."enum__info_cookies_v_version_status";
  DROP TYPE "public"."enum__info_cookies_v_published_locale";
  DROP TYPE "public"."enum_info_accessibility_status";
  DROP TYPE "public"."enum__info_accessibility_v_version_status";
  DROP TYPE "public"."enum__info_accessibility_v_published_locale";`)
}
