import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_info_shipping_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__info_shipping_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__info_shipping_v_published_locale" AS ENUM('en', 'pl');
  CREATE TYPE "public"."enum_info_returns_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__info_returns_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__info_returns_v_published_locale" AS ENUM('en', 'pl');
  CREATE TYPE "public"."enum_info_size_guide_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__info_size_guide_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__info_size_guide_v_published_locale" AS ENUM('en', 'pl');
  CREATE TYPE "public"."enum_info_track_order_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__info_track_order_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__info_track_order_v_published_locale" AS ENUM('en', 'pl');
  CREATE TYPE "public"."enum_info_faq_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__info_faq_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__info_faq_v_published_locale" AS ENUM('en', 'pl');
  CREATE TYPE "public"."enum_info_about_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__info_about_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__info_about_v_published_locale" AS ENUM('en', 'pl');
  CREATE TYPE "public"."enum_info_studio_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__info_studio_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__info_studio_v_published_locale" AS ENUM('en', 'pl');
  CREATE TYPE "public"."enum_info_journal_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__info_journal_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__info_journal_v_published_locale" AS ENUM('en', 'pl');
  CREATE TYPE "public"."enum_info_materials_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__info_materials_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__info_materials_v_published_locale" AS ENUM('en', 'pl');
  CREATE TYPE "public"."enum_info_careers_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__info_careers_v_version_status" AS ENUM('draft', 'published');
  CREATE TYPE "public"."enum__info_careers_v_published_locale" AS ENUM('en', 'pl');
  CREATE TABLE "info_shipping_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_shipping_blocks_text_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_shipping_blocks_placeholder" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_shipping_blocks_placeholder_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_shipping_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "info_shipping_blocks_list_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_shipping_blocks_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ordered" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_shipping_blocks_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"to" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_shipping_blocks_link_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_shipping_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "info_shipping_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_shipping_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_shipping_blocks_size_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_shipping_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_shipping_blocks_journal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_shipping_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar
  );
  
  CREATE TABLE "info_shipping_sections_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_shipping" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_status" "enum_info_shipping_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "info_shipping_locales" (
  	"title" varchar,
  	"description" varchar,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"lead" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_shipping_v_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_shipping_v_blocks_text_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_shipping_v_blocks_placeholder" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_shipping_v_blocks_placeholder_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_shipping_v_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_info_shipping_v_blocks_list_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_shipping_v_blocks_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"ordered" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_shipping_v_blocks_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"to" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_shipping_v_blocks_link_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_shipping_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_info_shipping_v_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_shipping_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_shipping_v_blocks_size_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_shipping_v_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_shipping_v_blocks_journal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_shipping_v_version_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_info_shipping_v_version_sections_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_shipping_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version__status" "enum__info_shipping_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__info_shipping_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_info_shipping_v_locales" (
  	"version_title" varchar,
  	"version_description" varchar,
  	"version_eyebrow" varchar,
  	"version_heading" varchar,
  	"version_lead" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "info_returns_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_returns_blocks_text_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_returns_blocks_placeholder" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_returns_blocks_placeholder_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_returns_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "info_returns_blocks_list_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_returns_blocks_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ordered" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_returns_blocks_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"to" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_returns_blocks_link_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_returns_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "info_returns_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_returns_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_returns_blocks_size_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_returns_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_returns_blocks_journal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_returns_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar
  );
  
  CREATE TABLE "info_returns_sections_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_returns" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_status" "enum_info_returns_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "info_returns_locales" (
  	"title" varchar,
  	"description" varchar,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"lead" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_returns_v_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_returns_v_blocks_text_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_returns_v_blocks_placeholder" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_returns_v_blocks_placeholder_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_returns_v_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_info_returns_v_blocks_list_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_returns_v_blocks_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"ordered" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_returns_v_blocks_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"to" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_returns_v_blocks_link_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_returns_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_info_returns_v_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_returns_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_returns_v_blocks_size_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_returns_v_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_returns_v_blocks_journal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_returns_v_version_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_info_returns_v_version_sections_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_returns_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version__status" "enum__info_returns_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__info_returns_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_info_returns_v_locales" (
  	"version_title" varchar,
  	"version_description" varchar,
  	"version_eyebrow" varchar,
  	"version_heading" varchar,
  	"version_lead" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "info_size_guide_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_size_guide_blocks_text_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_size_guide_blocks_placeholder" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_size_guide_blocks_placeholder_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_size_guide_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "info_size_guide_blocks_list_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_size_guide_blocks_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ordered" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_size_guide_blocks_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"to" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_size_guide_blocks_link_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_size_guide_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "info_size_guide_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_size_guide_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_size_guide_blocks_size_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_size_guide_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_size_guide_blocks_journal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_size_guide_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar
  );
  
  CREATE TABLE "info_size_guide_sections_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_size_guide" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_status" "enum_info_size_guide_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "info_size_guide_locales" (
  	"title" varchar,
  	"description" varchar,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"lead" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_size_guide_v_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_size_guide_v_blocks_text_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_size_guide_v_blocks_placeholder" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_size_guide_v_blocks_placeholder_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_size_guide_v_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_info_size_guide_v_blocks_list_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_size_guide_v_blocks_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"ordered" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_size_guide_v_blocks_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"to" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_size_guide_v_blocks_link_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_size_guide_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_info_size_guide_v_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_size_guide_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_size_guide_v_blocks_size_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_size_guide_v_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_size_guide_v_blocks_journal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_size_guide_v_version_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_info_size_guide_v_version_sections_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_size_guide_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version__status" "enum__info_size_guide_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__info_size_guide_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_info_size_guide_v_locales" (
  	"version_title" varchar,
  	"version_description" varchar,
  	"version_eyebrow" varchar,
  	"version_heading" varchar,
  	"version_lead" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "info_track_order_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_track_order_blocks_text_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_track_order_blocks_placeholder" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_track_order_blocks_placeholder_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_track_order_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "info_track_order_blocks_list_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_track_order_blocks_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ordered" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_track_order_blocks_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"to" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_track_order_blocks_link_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_track_order_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "info_track_order_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_track_order_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_track_order_blocks_size_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_track_order_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_track_order_blocks_journal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_track_order_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar
  );
  
  CREATE TABLE "info_track_order_sections_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_track_order" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_status" "enum_info_track_order_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "info_track_order_locales" (
  	"title" varchar,
  	"description" varchar,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"lead" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_track_order_v_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_track_order_v_blocks_text_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_track_order_v_blocks_placeholder" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_track_order_v_blocks_placeholder_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_track_order_v_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_info_track_order_v_blocks_list_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_track_order_v_blocks_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"ordered" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_track_order_v_blocks_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"to" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_track_order_v_blocks_link_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_track_order_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_info_track_order_v_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_track_order_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_track_order_v_blocks_size_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_track_order_v_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_track_order_v_blocks_journal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_track_order_v_version_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_info_track_order_v_version_sections_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_track_order_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version__status" "enum__info_track_order_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__info_track_order_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_info_track_order_v_locales" (
  	"version_title" varchar,
  	"version_description" varchar,
  	"version_eyebrow" varchar,
  	"version_heading" varchar,
  	"version_lead" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "info_faq_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_faq_blocks_text_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_faq_blocks_placeholder" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_faq_blocks_placeholder_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_faq_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "info_faq_blocks_list_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_faq_blocks_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ordered" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_faq_blocks_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"to" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_faq_blocks_link_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_faq_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "info_faq_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_faq_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_faq_blocks_size_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_faq_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_faq_blocks_journal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_faq_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar
  );
  
  CREATE TABLE "info_faq_sections_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_faq" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_status" "enum_info_faq_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "info_faq_locales" (
  	"title" varchar,
  	"description" varchar,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"lead" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_faq_v_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_faq_v_blocks_text_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_faq_v_blocks_placeholder" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_faq_v_blocks_placeholder_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_faq_v_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_info_faq_v_blocks_list_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_faq_v_blocks_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"ordered" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_faq_v_blocks_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"to" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_faq_v_blocks_link_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_faq_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_info_faq_v_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_faq_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_faq_v_blocks_size_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_faq_v_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_faq_v_blocks_journal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_faq_v_version_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_info_faq_v_version_sections_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_faq_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version__status" "enum__info_faq_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__info_faq_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_info_faq_v_locales" (
  	"version_title" varchar,
  	"version_description" varchar,
  	"version_eyebrow" varchar,
  	"version_heading" varchar,
  	"version_lead" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "info_about_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_about_blocks_text_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_about_blocks_placeholder" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_about_blocks_placeholder_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_about_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "info_about_blocks_list_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_about_blocks_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ordered" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_about_blocks_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"to" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_about_blocks_link_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_about_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "info_about_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_about_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_about_blocks_size_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_about_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_about_blocks_journal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_about_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar
  );
  
  CREATE TABLE "info_about_sections_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_about" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_status" "enum_info_about_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "info_about_locales" (
  	"title" varchar,
  	"description" varchar,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"lead" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_about_v_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_about_v_blocks_text_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_about_v_blocks_placeholder" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_about_v_blocks_placeholder_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_about_v_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_info_about_v_blocks_list_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_about_v_blocks_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"ordered" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_about_v_blocks_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"to" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_about_v_blocks_link_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_about_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_info_about_v_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_about_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_about_v_blocks_size_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_about_v_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_about_v_blocks_journal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_about_v_version_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_info_about_v_version_sections_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_about_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version__status" "enum__info_about_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__info_about_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_info_about_v_locales" (
  	"version_title" varchar,
  	"version_description" varchar,
  	"version_eyebrow" varchar,
  	"version_heading" varchar,
  	"version_lead" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "info_studio_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_studio_blocks_text_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_studio_blocks_placeholder" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_studio_blocks_placeholder_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_studio_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "info_studio_blocks_list_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_studio_blocks_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ordered" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_studio_blocks_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"to" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_studio_blocks_link_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_studio_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "info_studio_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_studio_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_studio_blocks_size_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_studio_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_studio_blocks_journal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_studio_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar
  );
  
  CREATE TABLE "info_studio_sections_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_studio" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_status" "enum_info_studio_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "info_studio_locales" (
  	"title" varchar,
  	"description" varchar,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"lead" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_studio_v_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_studio_v_blocks_text_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_studio_v_blocks_placeholder" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_studio_v_blocks_placeholder_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_studio_v_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_info_studio_v_blocks_list_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_studio_v_blocks_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"ordered" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_studio_v_blocks_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"to" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_studio_v_blocks_link_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_studio_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_info_studio_v_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_studio_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_studio_v_blocks_size_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_studio_v_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_studio_v_blocks_journal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_studio_v_version_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_info_studio_v_version_sections_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_studio_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version__status" "enum__info_studio_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__info_studio_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_info_studio_v_locales" (
  	"version_title" varchar,
  	"version_description" varchar,
  	"version_eyebrow" varchar,
  	"version_heading" varchar,
  	"version_lead" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "info_journal_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_journal_blocks_text_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_journal_blocks_placeholder" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_journal_blocks_placeholder_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_journal_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "info_journal_blocks_list_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_journal_blocks_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ordered" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_journal_blocks_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"to" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_journal_blocks_link_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_journal_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "info_journal_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_journal_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_journal_blocks_size_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_journal_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_journal_blocks_journal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_journal_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar
  );
  
  CREATE TABLE "info_journal_sections_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_journal" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_status" "enum_info_journal_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "info_journal_locales" (
  	"title" varchar,
  	"description" varchar,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"lead" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_journal_v_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_journal_v_blocks_text_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_journal_v_blocks_placeholder" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_journal_v_blocks_placeholder_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_journal_v_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_info_journal_v_blocks_list_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_journal_v_blocks_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"ordered" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_journal_v_blocks_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"to" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_journal_v_blocks_link_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_journal_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_info_journal_v_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_journal_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_journal_v_blocks_size_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_journal_v_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_journal_v_blocks_journal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_journal_v_version_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_info_journal_v_version_sections_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_journal_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version__status" "enum__info_journal_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__info_journal_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_info_journal_v_locales" (
  	"version_title" varchar,
  	"version_description" varchar,
  	"version_eyebrow" varchar,
  	"version_heading" varchar,
  	"version_lead" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "info_materials_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_materials_blocks_text_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_materials_blocks_placeholder" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_materials_blocks_placeholder_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_materials_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "info_materials_blocks_list_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_materials_blocks_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ordered" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_materials_blocks_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"to" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_materials_blocks_link_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_materials_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "info_materials_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_materials_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_materials_blocks_size_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_materials_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_materials_blocks_journal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_materials_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar
  );
  
  CREATE TABLE "info_materials_sections_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_materials" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_status" "enum_info_materials_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "info_materials_locales" (
  	"title" varchar,
  	"description" varchar,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"lead" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_materials_v_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_materials_v_blocks_text_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_materials_v_blocks_placeholder" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_materials_v_blocks_placeholder_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_materials_v_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_info_materials_v_blocks_list_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_materials_v_blocks_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"ordered" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_materials_v_blocks_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"to" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_materials_v_blocks_link_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_materials_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_info_materials_v_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_materials_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_materials_v_blocks_size_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_materials_v_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_materials_v_blocks_journal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_materials_v_version_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_info_materials_v_version_sections_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_materials_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version__status" "enum__info_materials_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__info_materials_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_info_materials_v_locales" (
  	"version_title" varchar,
  	"version_description" varchar,
  	"version_eyebrow" varchar,
  	"version_heading" varchar,
  	"version_lead" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "info_careers_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_careers_blocks_text_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_careers_blocks_placeholder" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_careers_blocks_placeholder_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_careers_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "info_careers_blocks_list_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_careers_blocks_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"ordered" boolean DEFAULT false,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_careers_blocks_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"to" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_careers_blocks_link_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_careers_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" varchar NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL
  );
  
  CREATE TABLE "info_careers_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_careers_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_careers_blocks_size_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_careers_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_careers_blocks_journal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"block_name" varchar
  );
  
  CREATE TABLE "info_careers_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"anchor" varchar
  );
  
  CREATE TABLE "info_careers_sections_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "info_careers" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"_status" "enum_info_careers_status" DEFAULT 'draft',
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "info_careers_locales" (
  	"title" varchar,
  	"description" varchar,
  	"eyebrow" varchar,
  	"heading" varchar,
  	"lead" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_careers_v_blocks_text" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_careers_v_blocks_text_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_careers_v_blocks_placeholder" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_careers_v_blocks_placeholder_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_careers_v_blocks_list_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_info_careers_v_blocks_list_items_locales" (
  	"text" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_careers_v_blocks_list" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"ordered" boolean DEFAULT false,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_careers_v_blocks_link" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"to" varchar,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_careers_v_blocks_link_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_careers_v_blocks_faq_items" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_info_careers_v_blocks_faq_items_locales" (
  	"question" varchar,
  	"answer" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_careers_v_blocks_faq" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_careers_v_blocks_size_table" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_careers_v_blocks_contact" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_careers_v_blocks_journal" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"_path" text NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_uuid" varchar,
  	"block_name" varchar
  );
  
  CREATE TABLE "_info_careers_v_version_sections" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"anchor" varchar,
  	"_uuid" varchar
  );
  
  CREATE TABLE "_info_careers_v_version_sections_locales" (
  	"heading" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "_info_careers_v" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"version__status" "enum__info_careers_v_version_status" DEFAULT 'draft',
  	"version_updated_at" timestamp(3) with time zone,
  	"version_created_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"snapshot" boolean,
  	"published_locale" "enum__info_careers_v_published_locale",
  	"latest" boolean
  );
  
  CREATE TABLE "_info_careers_v_locales" (
  	"version_title" varchar,
  	"version_description" varchar,
  	"version_eyebrow" varchar,
  	"version_heading" varchar,
  	"version_lead" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "info_shipping_blocks_text" ADD CONSTRAINT "info_shipping_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_shipping"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_shipping_blocks_text_locales" ADD CONSTRAINT "info_shipping_blocks_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_shipping_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_shipping_blocks_placeholder" ADD CONSTRAINT "info_shipping_blocks_placeholder_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_shipping"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_shipping_blocks_placeholder_locales" ADD CONSTRAINT "info_shipping_blocks_placeholder_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_shipping_blocks_placeholder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_shipping_blocks_list_items" ADD CONSTRAINT "info_shipping_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_shipping_blocks_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_shipping_blocks_list_items_locales" ADD CONSTRAINT "info_shipping_blocks_list_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_shipping_blocks_list_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_shipping_blocks_list" ADD CONSTRAINT "info_shipping_blocks_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_shipping"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_shipping_blocks_link" ADD CONSTRAINT "info_shipping_blocks_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_shipping"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_shipping_blocks_link_locales" ADD CONSTRAINT "info_shipping_blocks_link_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_shipping_blocks_link"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_shipping_blocks_faq_items" ADD CONSTRAINT "info_shipping_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_shipping_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_shipping_blocks_faq_items_locales" ADD CONSTRAINT "info_shipping_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_shipping_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_shipping_blocks_faq" ADD CONSTRAINT "info_shipping_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_shipping"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_shipping_blocks_size_table" ADD CONSTRAINT "info_shipping_blocks_size_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_shipping"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_shipping_blocks_contact" ADD CONSTRAINT "info_shipping_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_shipping"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_shipping_blocks_journal" ADD CONSTRAINT "info_shipping_blocks_journal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_shipping"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_shipping_sections" ADD CONSTRAINT "info_shipping_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_shipping"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_shipping_sections_locales" ADD CONSTRAINT "info_shipping_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_shipping_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_shipping_locales" ADD CONSTRAINT "info_shipping_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_shipping"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_shipping_v_blocks_text" ADD CONSTRAINT "_info_shipping_v_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_shipping_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_shipping_v_blocks_text_locales" ADD CONSTRAINT "_info_shipping_v_blocks_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_shipping_v_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_shipping_v_blocks_placeholder" ADD CONSTRAINT "_info_shipping_v_blocks_placeholder_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_shipping_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_shipping_v_blocks_placeholder_locales" ADD CONSTRAINT "_info_shipping_v_blocks_placeholder_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_shipping_v_blocks_placeholder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_shipping_v_blocks_list_items" ADD CONSTRAINT "_info_shipping_v_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_shipping_v_blocks_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_shipping_v_blocks_list_items_locales" ADD CONSTRAINT "_info_shipping_v_blocks_list_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_shipping_v_blocks_list_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_shipping_v_blocks_list" ADD CONSTRAINT "_info_shipping_v_blocks_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_shipping_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_shipping_v_blocks_link" ADD CONSTRAINT "_info_shipping_v_blocks_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_shipping_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_shipping_v_blocks_link_locales" ADD CONSTRAINT "_info_shipping_v_blocks_link_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_shipping_v_blocks_link"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_shipping_v_blocks_faq_items" ADD CONSTRAINT "_info_shipping_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_shipping_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_shipping_v_blocks_faq_items_locales" ADD CONSTRAINT "_info_shipping_v_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_shipping_v_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_shipping_v_blocks_faq" ADD CONSTRAINT "_info_shipping_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_shipping_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_shipping_v_blocks_size_table" ADD CONSTRAINT "_info_shipping_v_blocks_size_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_shipping_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_shipping_v_blocks_contact" ADD CONSTRAINT "_info_shipping_v_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_shipping_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_shipping_v_blocks_journal" ADD CONSTRAINT "_info_shipping_v_blocks_journal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_shipping_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_shipping_v_version_sections" ADD CONSTRAINT "_info_shipping_v_version_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_shipping_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_shipping_v_version_sections_locales" ADD CONSTRAINT "_info_shipping_v_version_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_shipping_v_version_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_shipping_v_locales" ADD CONSTRAINT "_info_shipping_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_shipping_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_returns_blocks_text" ADD CONSTRAINT "info_returns_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_returns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_returns_blocks_text_locales" ADD CONSTRAINT "info_returns_blocks_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_returns_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_returns_blocks_placeholder" ADD CONSTRAINT "info_returns_blocks_placeholder_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_returns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_returns_blocks_placeholder_locales" ADD CONSTRAINT "info_returns_blocks_placeholder_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_returns_blocks_placeholder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_returns_blocks_list_items" ADD CONSTRAINT "info_returns_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_returns_blocks_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_returns_blocks_list_items_locales" ADD CONSTRAINT "info_returns_blocks_list_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_returns_blocks_list_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_returns_blocks_list" ADD CONSTRAINT "info_returns_blocks_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_returns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_returns_blocks_link" ADD CONSTRAINT "info_returns_blocks_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_returns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_returns_blocks_link_locales" ADD CONSTRAINT "info_returns_blocks_link_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_returns_blocks_link"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_returns_blocks_faq_items" ADD CONSTRAINT "info_returns_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_returns_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_returns_blocks_faq_items_locales" ADD CONSTRAINT "info_returns_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_returns_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_returns_blocks_faq" ADD CONSTRAINT "info_returns_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_returns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_returns_blocks_size_table" ADD CONSTRAINT "info_returns_blocks_size_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_returns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_returns_blocks_contact" ADD CONSTRAINT "info_returns_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_returns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_returns_blocks_journal" ADD CONSTRAINT "info_returns_blocks_journal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_returns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_returns_sections" ADD CONSTRAINT "info_returns_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_returns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_returns_sections_locales" ADD CONSTRAINT "info_returns_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_returns_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_returns_locales" ADD CONSTRAINT "info_returns_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_returns"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_returns_v_blocks_text" ADD CONSTRAINT "_info_returns_v_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_returns_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_returns_v_blocks_text_locales" ADD CONSTRAINT "_info_returns_v_blocks_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_returns_v_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_returns_v_blocks_placeholder" ADD CONSTRAINT "_info_returns_v_blocks_placeholder_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_returns_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_returns_v_blocks_placeholder_locales" ADD CONSTRAINT "_info_returns_v_blocks_placeholder_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_returns_v_blocks_placeholder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_returns_v_blocks_list_items" ADD CONSTRAINT "_info_returns_v_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_returns_v_blocks_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_returns_v_blocks_list_items_locales" ADD CONSTRAINT "_info_returns_v_blocks_list_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_returns_v_blocks_list_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_returns_v_blocks_list" ADD CONSTRAINT "_info_returns_v_blocks_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_returns_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_returns_v_blocks_link" ADD CONSTRAINT "_info_returns_v_blocks_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_returns_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_returns_v_blocks_link_locales" ADD CONSTRAINT "_info_returns_v_blocks_link_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_returns_v_blocks_link"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_returns_v_blocks_faq_items" ADD CONSTRAINT "_info_returns_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_returns_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_returns_v_blocks_faq_items_locales" ADD CONSTRAINT "_info_returns_v_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_returns_v_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_returns_v_blocks_faq" ADD CONSTRAINT "_info_returns_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_returns_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_returns_v_blocks_size_table" ADD CONSTRAINT "_info_returns_v_blocks_size_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_returns_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_returns_v_blocks_contact" ADD CONSTRAINT "_info_returns_v_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_returns_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_returns_v_blocks_journal" ADD CONSTRAINT "_info_returns_v_blocks_journal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_returns_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_returns_v_version_sections" ADD CONSTRAINT "_info_returns_v_version_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_returns_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_returns_v_version_sections_locales" ADD CONSTRAINT "_info_returns_v_version_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_returns_v_version_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_returns_v_locales" ADD CONSTRAINT "_info_returns_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_returns_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_size_guide_blocks_text" ADD CONSTRAINT "info_size_guide_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_size_guide"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_size_guide_blocks_text_locales" ADD CONSTRAINT "info_size_guide_blocks_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_size_guide_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_size_guide_blocks_placeholder" ADD CONSTRAINT "info_size_guide_blocks_placeholder_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_size_guide"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_size_guide_blocks_placeholder_locales" ADD CONSTRAINT "info_size_guide_blocks_placeholder_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_size_guide_blocks_placeholder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_size_guide_blocks_list_items" ADD CONSTRAINT "info_size_guide_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_size_guide_blocks_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_size_guide_blocks_list_items_locales" ADD CONSTRAINT "info_size_guide_blocks_list_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_size_guide_blocks_list_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_size_guide_blocks_list" ADD CONSTRAINT "info_size_guide_blocks_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_size_guide"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_size_guide_blocks_link" ADD CONSTRAINT "info_size_guide_blocks_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_size_guide"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_size_guide_blocks_link_locales" ADD CONSTRAINT "info_size_guide_blocks_link_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_size_guide_blocks_link"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_size_guide_blocks_faq_items" ADD CONSTRAINT "info_size_guide_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_size_guide_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_size_guide_blocks_faq_items_locales" ADD CONSTRAINT "info_size_guide_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_size_guide_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_size_guide_blocks_faq" ADD CONSTRAINT "info_size_guide_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_size_guide"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_size_guide_blocks_size_table" ADD CONSTRAINT "info_size_guide_blocks_size_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_size_guide"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_size_guide_blocks_contact" ADD CONSTRAINT "info_size_guide_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_size_guide"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_size_guide_blocks_journal" ADD CONSTRAINT "info_size_guide_blocks_journal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_size_guide"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_size_guide_sections" ADD CONSTRAINT "info_size_guide_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_size_guide"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_size_guide_sections_locales" ADD CONSTRAINT "info_size_guide_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_size_guide_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_size_guide_locales" ADD CONSTRAINT "info_size_guide_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_size_guide"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_size_guide_v_blocks_text" ADD CONSTRAINT "_info_size_guide_v_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_size_guide_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_size_guide_v_blocks_text_locales" ADD CONSTRAINT "_info_size_guide_v_blocks_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_size_guide_v_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_size_guide_v_blocks_placeholder" ADD CONSTRAINT "_info_size_guide_v_blocks_placeholder_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_size_guide_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_size_guide_v_blocks_placeholder_locales" ADD CONSTRAINT "_info_size_guide_v_blocks_placeholder_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_size_guide_v_blocks_placeholder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_size_guide_v_blocks_list_items" ADD CONSTRAINT "_info_size_guide_v_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_size_guide_v_blocks_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_size_guide_v_blocks_list_items_locales" ADD CONSTRAINT "_info_size_guide_v_blocks_list_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_size_guide_v_blocks_list_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_size_guide_v_blocks_list" ADD CONSTRAINT "_info_size_guide_v_blocks_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_size_guide_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_size_guide_v_blocks_link" ADD CONSTRAINT "_info_size_guide_v_blocks_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_size_guide_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_size_guide_v_blocks_link_locales" ADD CONSTRAINT "_info_size_guide_v_blocks_link_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_size_guide_v_blocks_link"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_size_guide_v_blocks_faq_items" ADD CONSTRAINT "_info_size_guide_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_size_guide_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_size_guide_v_blocks_faq_items_locales" ADD CONSTRAINT "_info_size_guide_v_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_size_guide_v_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_size_guide_v_blocks_faq" ADD CONSTRAINT "_info_size_guide_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_size_guide_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_size_guide_v_blocks_size_table" ADD CONSTRAINT "_info_size_guide_v_blocks_size_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_size_guide_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_size_guide_v_blocks_contact" ADD CONSTRAINT "_info_size_guide_v_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_size_guide_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_size_guide_v_blocks_journal" ADD CONSTRAINT "_info_size_guide_v_blocks_journal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_size_guide_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_size_guide_v_version_sections" ADD CONSTRAINT "_info_size_guide_v_version_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_size_guide_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_size_guide_v_version_sections_locales" ADD CONSTRAINT "_info_size_guide_v_version_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_size_guide_v_version_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_size_guide_v_locales" ADD CONSTRAINT "_info_size_guide_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_size_guide_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_track_order_blocks_text" ADD CONSTRAINT "info_track_order_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_track_order"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_track_order_blocks_text_locales" ADD CONSTRAINT "info_track_order_blocks_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_track_order_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_track_order_blocks_placeholder" ADD CONSTRAINT "info_track_order_blocks_placeholder_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_track_order"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_track_order_blocks_placeholder_locales" ADD CONSTRAINT "info_track_order_blocks_placeholder_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_track_order_blocks_placeholder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_track_order_blocks_list_items" ADD CONSTRAINT "info_track_order_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_track_order_blocks_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_track_order_blocks_list_items_locales" ADD CONSTRAINT "info_track_order_blocks_list_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_track_order_blocks_list_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_track_order_blocks_list" ADD CONSTRAINT "info_track_order_blocks_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_track_order"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_track_order_blocks_link" ADD CONSTRAINT "info_track_order_blocks_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_track_order"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_track_order_blocks_link_locales" ADD CONSTRAINT "info_track_order_blocks_link_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_track_order_blocks_link"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_track_order_blocks_faq_items" ADD CONSTRAINT "info_track_order_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_track_order_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_track_order_blocks_faq_items_locales" ADD CONSTRAINT "info_track_order_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_track_order_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_track_order_blocks_faq" ADD CONSTRAINT "info_track_order_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_track_order"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_track_order_blocks_size_table" ADD CONSTRAINT "info_track_order_blocks_size_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_track_order"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_track_order_blocks_contact" ADD CONSTRAINT "info_track_order_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_track_order"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_track_order_blocks_journal" ADD CONSTRAINT "info_track_order_blocks_journal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_track_order"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_track_order_sections" ADD CONSTRAINT "info_track_order_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_track_order"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_track_order_sections_locales" ADD CONSTRAINT "info_track_order_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_track_order_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_track_order_locales" ADD CONSTRAINT "info_track_order_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_track_order"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_track_order_v_blocks_text" ADD CONSTRAINT "_info_track_order_v_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_track_order_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_track_order_v_blocks_text_locales" ADD CONSTRAINT "_info_track_order_v_blocks_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_track_order_v_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_track_order_v_blocks_placeholder" ADD CONSTRAINT "_info_track_order_v_blocks_placeholder_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_track_order_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_track_order_v_blocks_placeholder_locales" ADD CONSTRAINT "_info_track_order_v_blocks_placeholder_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_track_order_v_blocks_placeholder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_track_order_v_blocks_list_items" ADD CONSTRAINT "_info_track_order_v_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_track_order_v_blocks_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_track_order_v_blocks_list_items_locales" ADD CONSTRAINT "_info_track_order_v_blocks_list_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_track_order_v_blocks_list_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_track_order_v_blocks_list" ADD CONSTRAINT "_info_track_order_v_blocks_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_track_order_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_track_order_v_blocks_link" ADD CONSTRAINT "_info_track_order_v_blocks_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_track_order_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_track_order_v_blocks_link_locales" ADD CONSTRAINT "_info_track_order_v_blocks_link_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_track_order_v_blocks_link"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_track_order_v_blocks_faq_items" ADD CONSTRAINT "_info_track_order_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_track_order_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_track_order_v_blocks_faq_items_locales" ADD CONSTRAINT "_info_track_order_v_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_track_order_v_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_track_order_v_blocks_faq" ADD CONSTRAINT "_info_track_order_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_track_order_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_track_order_v_blocks_size_table" ADD CONSTRAINT "_info_track_order_v_blocks_size_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_track_order_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_track_order_v_blocks_contact" ADD CONSTRAINT "_info_track_order_v_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_track_order_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_track_order_v_blocks_journal" ADD CONSTRAINT "_info_track_order_v_blocks_journal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_track_order_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_track_order_v_version_sections" ADD CONSTRAINT "_info_track_order_v_version_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_track_order_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_track_order_v_version_sections_locales" ADD CONSTRAINT "_info_track_order_v_version_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_track_order_v_version_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_track_order_v_locales" ADD CONSTRAINT "_info_track_order_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_track_order_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_faq_blocks_text" ADD CONSTRAINT "info_faq_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_faq_blocks_text_locales" ADD CONSTRAINT "info_faq_blocks_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_faq_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_faq_blocks_placeholder" ADD CONSTRAINT "info_faq_blocks_placeholder_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_faq_blocks_placeholder_locales" ADD CONSTRAINT "info_faq_blocks_placeholder_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_faq_blocks_placeholder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_faq_blocks_list_items" ADD CONSTRAINT "info_faq_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_faq_blocks_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_faq_blocks_list_items_locales" ADD CONSTRAINT "info_faq_blocks_list_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_faq_blocks_list_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_faq_blocks_list" ADD CONSTRAINT "info_faq_blocks_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_faq_blocks_link" ADD CONSTRAINT "info_faq_blocks_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_faq_blocks_link_locales" ADD CONSTRAINT "info_faq_blocks_link_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_faq_blocks_link"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_faq_blocks_faq_items" ADD CONSTRAINT "info_faq_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_faq_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_faq_blocks_faq_items_locales" ADD CONSTRAINT "info_faq_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_faq_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_faq_blocks_faq" ADD CONSTRAINT "info_faq_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_faq_blocks_size_table" ADD CONSTRAINT "info_faq_blocks_size_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_faq_blocks_contact" ADD CONSTRAINT "info_faq_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_faq_blocks_journal" ADD CONSTRAINT "info_faq_blocks_journal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_faq_sections" ADD CONSTRAINT "info_faq_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_faq_sections_locales" ADD CONSTRAINT "info_faq_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_faq_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_faq_locales" ADD CONSTRAINT "info_faq_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_faq_v_blocks_text" ADD CONSTRAINT "_info_faq_v_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_faq_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_faq_v_blocks_text_locales" ADD CONSTRAINT "_info_faq_v_blocks_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_faq_v_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_faq_v_blocks_placeholder" ADD CONSTRAINT "_info_faq_v_blocks_placeholder_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_faq_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_faq_v_blocks_placeholder_locales" ADD CONSTRAINT "_info_faq_v_blocks_placeholder_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_faq_v_blocks_placeholder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_faq_v_blocks_list_items" ADD CONSTRAINT "_info_faq_v_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_faq_v_blocks_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_faq_v_blocks_list_items_locales" ADD CONSTRAINT "_info_faq_v_blocks_list_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_faq_v_blocks_list_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_faq_v_blocks_list" ADD CONSTRAINT "_info_faq_v_blocks_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_faq_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_faq_v_blocks_link" ADD CONSTRAINT "_info_faq_v_blocks_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_faq_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_faq_v_blocks_link_locales" ADD CONSTRAINT "_info_faq_v_blocks_link_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_faq_v_blocks_link"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_faq_v_blocks_faq_items" ADD CONSTRAINT "_info_faq_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_faq_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_faq_v_blocks_faq_items_locales" ADD CONSTRAINT "_info_faq_v_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_faq_v_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_faq_v_blocks_faq" ADD CONSTRAINT "_info_faq_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_faq_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_faq_v_blocks_size_table" ADD CONSTRAINT "_info_faq_v_blocks_size_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_faq_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_faq_v_blocks_contact" ADD CONSTRAINT "_info_faq_v_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_faq_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_faq_v_blocks_journal" ADD CONSTRAINT "_info_faq_v_blocks_journal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_faq_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_faq_v_version_sections" ADD CONSTRAINT "_info_faq_v_version_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_faq_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_faq_v_version_sections_locales" ADD CONSTRAINT "_info_faq_v_version_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_faq_v_version_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_faq_v_locales" ADD CONSTRAINT "_info_faq_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_faq_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_about_blocks_text" ADD CONSTRAINT "info_about_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_about_blocks_text_locales" ADD CONSTRAINT "info_about_blocks_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_about_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_about_blocks_placeholder" ADD CONSTRAINT "info_about_blocks_placeholder_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_about_blocks_placeholder_locales" ADD CONSTRAINT "info_about_blocks_placeholder_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_about_blocks_placeholder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_about_blocks_list_items" ADD CONSTRAINT "info_about_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_about_blocks_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_about_blocks_list_items_locales" ADD CONSTRAINT "info_about_blocks_list_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_about_blocks_list_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_about_blocks_list" ADD CONSTRAINT "info_about_blocks_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_about_blocks_link" ADD CONSTRAINT "info_about_blocks_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_about_blocks_link_locales" ADD CONSTRAINT "info_about_blocks_link_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_about_blocks_link"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_about_blocks_faq_items" ADD CONSTRAINT "info_about_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_about_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_about_blocks_faq_items_locales" ADD CONSTRAINT "info_about_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_about_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_about_blocks_faq" ADD CONSTRAINT "info_about_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_about_blocks_size_table" ADD CONSTRAINT "info_about_blocks_size_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_about_blocks_contact" ADD CONSTRAINT "info_about_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_about_blocks_journal" ADD CONSTRAINT "info_about_blocks_journal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_about_sections" ADD CONSTRAINT "info_about_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_about_sections_locales" ADD CONSTRAINT "info_about_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_about_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_about_locales" ADD CONSTRAINT "info_about_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_about"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_about_v_blocks_text" ADD CONSTRAINT "_info_about_v_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_about_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_about_v_blocks_text_locales" ADD CONSTRAINT "_info_about_v_blocks_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_about_v_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_about_v_blocks_placeholder" ADD CONSTRAINT "_info_about_v_blocks_placeholder_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_about_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_about_v_blocks_placeholder_locales" ADD CONSTRAINT "_info_about_v_blocks_placeholder_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_about_v_blocks_placeholder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_about_v_blocks_list_items" ADD CONSTRAINT "_info_about_v_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_about_v_blocks_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_about_v_blocks_list_items_locales" ADD CONSTRAINT "_info_about_v_blocks_list_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_about_v_blocks_list_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_about_v_blocks_list" ADD CONSTRAINT "_info_about_v_blocks_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_about_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_about_v_blocks_link" ADD CONSTRAINT "_info_about_v_blocks_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_about_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_about_v_blocks_link_locales" ADD CONSTRAINT "_info_about_v_blocks_link_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_about_v_blocks_link"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_about_v_blocks_faq_items" ADD CONSTRAINT "_info_about_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_about_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_about_v_blocks_faq_items_locales" ADD CONSTRAINT "_info_about_v_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_about_v_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_about_v_blocks_faq" ADD CONSTRAINT "_info_about_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_about_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_about_v_blocks_size_table" ADD CONSTRAINT "_info_about_v_blocks_size_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_about_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_about_v_blocks_contact" ADD CONSTRAINT "_info_about_v_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_about_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_about_v_blocks_journal" ADD CONSTRAINT "_info_about_v_blocks_journal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_about_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_about_v_version_sections" ADD CONSTRAINT "_info_about_v_version_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_about_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_about_v_version_sections_locales" ADD CONSTRAINT "_info_about_v_version_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_about_v_version_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_about_v_locales" ADD CONSTRAINT "_info_about_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_about_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_studio_blocks_text" ADD CONSTRAINT "info_studio_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_studio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_studio_blocks_text_locales" ADD CONSTRAINT "info_studio_blocks_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_studio_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_studio_blocks_placeholder" ADD CONSTRAINT "info_studio_blocks_placeholder_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_studio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_studio_blocks_placeholder_locales" ADD CONSTRAINT "info_studio_blocks_placeholder_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_studio_blocks_placeholder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_studio_blocks_list_items" ADD CONSTRAINT "info_studio_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_studio_blocks_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_studio_blocks_list_items_locales" ADD CONSTRAINT "info_studio_blocks_list_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_studio_blocks_list_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_studio_blocks_list" ADD CONSTRAINT "info_studio_blocks_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_studio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_studio_blocks_link" ADD CONSTRAINT "info_studio_blocks_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_studio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_studio_blocks_link_locales" ADD CONSTRAINT "info_studio_blocks_link_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_studio_blocks_link"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_studio_blocks_faq_items" ADD CONSTRAINT "info_studio_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_studio_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_studio_blocks_faq_items_locales" ADD CONSTRAINT "info_studio_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_studio_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_studio_blocks_faq" ADD CONSTRAINT "info_studio_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_studio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_studio_blocks_size_table" ADD CONSTRAINT "info_studio_blocks_size_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_studio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_studio_blocks_contact" ADD CONSTRAINT "info_studio_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_studio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_studio_blocks_journal" ADD CONSTRAINT "info_studio_blocks_journal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_studio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_studio_sections" ADD CONSTRAINT "info_studio_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_studio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_studio_sections_locales" ADD CONSTRAINT "info_studio_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_studio_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_studio_locales" ADD CONSTRAINT "info_studio_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_studio"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_studio_v_blocks_text" ADD CONSTRAINT "_info_studio_v_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_studio_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_studio_v_blocks_text_locales" ADD CONSTRAINT "_info_studio_v_blocks_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_studio_v_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_studio_v_blocks_placeholder" ADD CONSTRAINT "_info_studio_v_blocks_placeholder_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_studio_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_studio_v_blocks_placeholder_locales" ADD CONSTRAINT "_info_studio_v_blocks_placeholder_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_studio_v_blocks_placeholder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_studio_v_blocks_list_items" ADD CONSTRAINT "_info_studio_v_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_studio_v_blocks_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_studio_v_blocks_list_items_locales" ADD CONSTRAINT "_info_studio_v_blocks_list_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_studio_v_blocks_list_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_studio_v_blocks_list" ADD CONSTRAINT "_info_studio_v_blocks_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_studio_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_studio_v_blocks_link" ADD CONSTRAINT "_info_studio_v_blocks_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_studio_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_studio_v_blocks_link_locales" ADD CONSTRAINT "_info_studio_v_blocks_link_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_studio_v_blocks_link"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_studio_v_blocks_faq_items" ADD CONSTRAINT "_info_studio_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_studio_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_studio_v_blocks_faq_items_locales" ADD CONSTRAINT "_info_studio_v_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_studio_v_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_studio_v_blocks_faq" ADD CONSTRAINT "_info_studio_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_studio_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_studio_v_blocks_size_table" ADD CONSTRAINT "_info_studio_v_blocks_size_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_studio_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_studio_v_blocks_contact" ADD CONSTRAINT "_info_studio_v_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_studio_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_studio_v_blocks_journal" ADD CONSTRAINT "_info_studio_v_blocks_journal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_studio_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_studio_v_version_sections" ADD CONSTRAINT "_info_studio_v_version_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_studio_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_studio_v_version_sections_locales" ADD CONSTRAINT "_info_studio_v_version_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_studio_v_version_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_studio_v_locales" ADD CONSTRAINT "_info_studio_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_studio_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_journal_blocks_text" ADD CONSTRAINT "info_journal_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_journal"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_journal_blocks_text_locales" ADD CONSTRAINT "info_journal_blocks_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_journal_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_journal_blocks_placeholder" ADD CONSTRAINT "info_journal_blocks_placeholder_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_journal"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_journal_blocks_placeholder_locales" ADD CONSTRAINT "info_journal_blocks_placeholder_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_journal_blocks_placeholder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_journal_blocks_list_items" ADD CONSTRAINT "info_journal_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_journal_blocks_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_journal_blocks_list_items_locales" ADD CONSTRAINT "info_journal_blocks_list_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_journal_blocks_list_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_journal_blocks_list" ADD CONSTRAINT "info_journal_blocks_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_journal"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_journal_blocks_link" ADD CONSTRAINT "info_journal_blocks_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_journal"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_journal_blocks_link_locales" ADD CONSTRAINT "info_journal_blocks_link_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_journal_blocks_link"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_journal_blocks_faq_items" ADD CONSTRAINT "info_journal_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_journal_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_journal_blocks_faq_items_locales" ADD CONSTRAINT "info_journal_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_journal_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_journal_blocks_faq" ADD CONSTRAINT "info_journal_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_journal"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_journal_blocks_size_table" ADD CONSTRAINT "info_journal_blocks_size_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_journal"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_journal_blocks_contact" ADD CONSTRAINT "info_journal_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_journal"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_journal_blocks_journal" ADD CONSTRAINT "info_journal_blocks_journal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_journal"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_journal_sections" ADD CONSTRAINT "info_journal_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_journal"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_journal_sections_locales" ADD CONSTRAINT "info_journal_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_journal_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_journal_locales" ADD CONSTRAINT "info_journal_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_journal"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_journal_v_blocks_text" ADD CONSTRAINT "_info_journal_v_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_journal_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_journal_v_blocks_text_locales" ADD CONSTRAINT "_info_journal_v_blocks_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_journal_v_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_journal_v_blocks_placeholder" ADD CONSTRAINT "_info_journal_v_blocks_placeholder_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_journal_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_journal_v_blocks_placeholder_locales" ADD CONSTRAINT "_info_journal_v_blocks_placeholder_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_journal_v_blocks_placeholder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_journal_v_blocks_list_items" ADD CONSTRAINT "_info_journal_v_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_journal_v_blocks_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_journal_v_blocks_list_items_locales" ADD CONSTRAINT "_info_journal_v_blocks_list_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_journal_v_blocks_list_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_journal_v_blocks_list" ADD CONSTRAINT "_info_journal_v_blocks_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_journal_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_journal_v_blocks_link" ADD CONSTRAINT "_info_journal_v_blocks_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_journal_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_journal_v_blocks_link_locales" ADD CONSTRAINT "_info_journal_v_blocks_link_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_journal_v_blocks_link"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_journal_v_blocks_faq_items" ADD CONSTRAINT "_info_journal_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_journal_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_journal_v_blocks_faq_items_locales" ADD CONSTRAINT "_info_journal_v_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_journal_v_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_journal_v_blocks_faq" ADD CONSTRAINT "_info_journal_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_journal_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_journal_v_blocks_size_table" ADD CONSTRAINT "_info_journal_v_blocks_size_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_journal_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_journal_v_blocks_contact" ADD CONSTRAINT "_info_journal_v_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_journal_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_journal_v_blocks_journal" ADD CONSTRAINT "_info_journal_v_blocks_journal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_journal_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_journal_v_version_sections" ADD CONSTRAINT "_info_journal_v_version_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_journal_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_journal_v_version_sections_locales" ADD CONSTRAINT "_info_journal_v_version_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_journal_v_version_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_journal_v_locales" ADD CONSTRAINT "_info_journal_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_journal_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_materials_blocks_text" ADD CONSTRAINT "info_materials_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_materials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_materials_blocks_text_locales" ADD CONSTRAINT "info_materials_blocks_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_materials_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_materials_blocks_placeholder" ADD CONSTRAINT "info_materials_blocks_placeholder_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_materials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_materials_blocks_placeholder_locales" ADD CONSTRAINT "info_materials_blocks_placeholder_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_materials_blocks_placeholder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_materials_blocks_list_items" ADD CONSTRAINT "info_materials_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_materials_blocks_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_materials_blocks_list_items_locales" ADD CONSTRAINT "info_materials_blocks_list_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_materials_blocks_list_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_materials_blocks_list" ADD CONSTRAINT "info_materials_blocks_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_materials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_materials_blocks_link" ADD CONSTRAINT "info_materials_blocks_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_materials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_materials_blocks_link_locales" ADD CONSTRAINT "info_materials_blocks_link_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_materials_blocks_link"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_materials_blocks_faq_items" ADD CONSTRAINT "info_materials_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_materials_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_materials_blocks_faq_items_locales" ADD CONSTRAINT "info_materials_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_materials_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_materials_blocks_faq" ADD CONSTRAINT "info_materials_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_materials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_materials_blocks_size_table" ADD CONSTRAINT "info_materials_blocks_size_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_materials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_materials_blocks_contact" ADD CONSTRAINT "info_materials_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_materials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_materials_blocks_journal" ADD CONSTRAINT "info_materials_blocks_journal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_materials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_materials_sections" ADD CONSTRAINT "info_materials_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_materials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_materials_sections_locales" ADD CONSTRAINT "info_materials_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_materials_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_materials_locales" ADD CONSTRAINT "info_materials_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_materials"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_materials_v_blocks_text" ADD CONSTRAINT "_info_materials_v_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_materials_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_materials_v_blocks_text_locales" ADD CONSTRAINT "_info_materials_v_blocks_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_materials_v_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_materials_v_blocks_placeholder" ADD CONSTRAINT "_info_materials_v_blocks_placeholder_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_materials_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_materials_v_blocks_placeholder_locales" ADD CONSTRAINT "_info_materials_v_blocks_placeholder_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_materials_v_blocks_placeholder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_materials_v_blocks_list_items" ADD CONSTRAINT "_info_materials_v_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_materials_v_blocks_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_materials_v_blocks_list_items_locales" ADD CONSTRAINT "_info_materials_v_blocks_list_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_materials_v_blocks_list_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_materials_v_blocks_list" ADD CONSTRAINT "_info_materials_v_blocks_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_materials_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_materials_v_blocks_link" ADD CONSTRAINT "_info_materials_v_blocks_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_materials_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_materials_v_blocks_link_locales" ADD CONSTRAINT "_info_materials_v_blocks_link_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_materials_v_blocks_link"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_materials_v_blocks_faq_items" ADD CONSTRAINT "_info_materials_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_materials_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_materials_v_blocks_faq_items_locales" ADD CONSTRAINT "_info_materials_v_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_materials_v_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_materials_v_blocks_faq" ADD CONSTRAINT "_info_materials_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_materials_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_materials_v_blocks_size_table" ADD CONSTRAINT "_info_materials_v_blocks_size_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_materials_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_materials_v_blocks_contact" ADD CONSTRAINT "_info_materials_v_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_materials_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_materials_v_blocks_journal" ADD CONSTRAINT "_info_materials_v_blocks_journal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_materials_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_materials_v_version_sections" ADD CONSTRAINT "_info_materials_v_version_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_materials_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_materials_v_version_sections_locales" ADD CONSTRAINT "_info_materials_v_version_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_materials_v_version_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_materials_v_locales" ADD CONSTRAINT "_info_materials_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_materials_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_careers_blocks_text" ADD CONSTRAINT "info_careers_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_careers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_careers_blocks_text_locales" ADD CONSTRAINT "info_careers_blocks_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_careers_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_careers_blocks_placeholder" ADD CONSTRAINT "info_careers_blocks_placeholder_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_careers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_careers_blocks_placeholder_locales" ADD CONSTRAINT "info_careers_blocks_placeholder_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_careers_blocks_placeholder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_careers_blocks_list_items" ADD CONSTRAINT "info_careers_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_careers_blocks_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_careers_blocks_list_items_locales" ADD CONSTRAINT "info_careers_blocks_list_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_careers_blocks_list_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_careers_blocks_list" ADD CONSTRAINT "info_careers_blocks_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_careers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_careers_blocks_link" ADD CONSTRAINT "info_careers_blocks_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_careers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_careers_blocks_link_locales" ADD CONSTRAINT "info_careers_blocks_link_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_careers_blocks_link"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_careers_blocks_faq_items" ADD CONSTRAINT "info_careers_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_careers_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_careers_blocks_faq_items_locales" ADD CONSTRAINT "info_careers_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_careers_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_careers_blocks_faq" ADD CONSTRAINT "info_careers_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_careers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_careers_blocks_size_table" ADD CONSTRAINT "info_careers_blocks_size_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_careers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_careers_blocks_contact" ADD CONSTRAINT "info_careers_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_careers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_careers_blocks_journal" ADD CONSTRAINT "info_careers_blocks_journal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_careers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_careers_sections" ADD CONSTRAINT "info_careers_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_careers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_careers_sections_locales" ADD CONSTRAINT "info_careers_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_careers_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "info_careers_locales" ADD CONSTRAINT "info_careers_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."info_careers"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_careers_v_blocks_text" ADD CONSTRAINT "_info_careers_v_blocks_text_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_careers_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_careers_v_blocks_text_locales" ADD CONSTRAINT "_info_careers_v_blocks_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_careers_v_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_careers_v_blocks_placeholder" ADD CONSTRAINT "_info_careers_v_blocks_placeholder_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_careers_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_careers_v_blocks_placeholder_locales" ADD CONSTRAINT "_info_careers_v_blocks_placeholder_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_careers_v_blocks_placeholder"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_careers_v_blocks_list_items" ADD CONSTRAINT "_info_careers_v_blocks_list_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_careers_v_blocks_list"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_careers_v_blocks_list_items_locales" ADD CONSTRAINT "_info_careers_v_blocks_list_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_careers_v_blocks_list_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_careers_v_blocks_list" ADD CONSTRAINT "_info_careers_v_blocks_list_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_careers_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_careers_v_blocks_link" ADD CONSTRAINT "_info_careers_v_blocks_link_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_careers_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_careers_v_blocks_link_locales" ADD CONSTRAINT "_info_careers_v_blocks_link_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_careers_v_blocks_link"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_careers_v_blocks_faq_items" ADD CONSTRAINT "_info_careers_v_blocks_faq_items_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_careers_v_blocks_faq"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_careers_v_blocks_faq_items_locales" ADD CONSTRAINT "_info_careers_v_blocks_faq_items_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_careers_v_blocks_faq_items"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_careers_v_blocks_faq" ADD CONSTRAINT "_info_careers_v_blocks_faq_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_careers_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_careers_v_blocks_size_table" ADD CONSTRAINT "_info_careers_v_blocks_size_table_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_careers_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_careers_v_blocks_contact" ADD CONSTRAINT "_info_careers_v_blocks_contact_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_careers_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_careers_v_blocks_journal" ADD CONSTRAINT "_info_careers_v_blocks_journal_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_careers_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_careers_v_version_sections" ADD CONSTRAINT "_info_careers_v_version_sections_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_careers_v"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_careers_v_version_sections_locales" ADD CONSTRAINT "_info_careers_v_version_sections_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_careers_v_version_sections"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "_info_careers_v_locales" ADD CONSTRAINT "_info_careers_v_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."_info_careers_v"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "info_shipping_blocks_text_order_idx" ON "info_shipping_blocks_text" USING btree ("_order");
  CREATE INDEX "info_shipping_blocks_text_parent_id_idx" ON "info_shipping_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "info_shipping_blocks_text_path_idx" ON "info_shipping_blocks_text" USING btree ("_path");
  CREATE UNIQUE INDEX "info_shipping_blocks_text_locales_locale_parent_id_unique" ON "info_shipping_blocks_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_shipping_blocks_text_locales_parent_id_idx" ON "info_shipping_blocks_text_locales" USING btree ("_parent_id");
  CREATE INDEX "info_shipping_blocks_placeholder_order_idx" ON "info_shipping_blocks_placeholder" USING btree ("_order");
  CREATE INDEX "info_shipping_blocks_placeholder_parent_id_idx" ON "info_shipping_blocks_placeholder" USING btree ("_parent_id");
  CREATE INDEX "info_shipping_blocks_placeholder_path_idx" ON "info_shipping_blocks_placeholder" USING btree ("_path");
  CREATE UNIQUE INDEX "info_shipping_blocks_placeholder_locales_locale_parent_id_un" ON "info_shipping_blocks_placeholder_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_shipping_blocks_placeholder_locales_parent_id_idx" ON "info_shipping_blocks_placeholder_locales" USING btree ("_parent_id");
  CREATE INDEX "info_shipping_blocks_list_items_order_idx" ON "info_shipping_blocks_list_items" USING btree ("_order");
  CREATE INDEX "info_shipping_blocks_list_items_parent_id_idx" ON "info_shipping_blocks_list_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "info_shipping_blocks_list_items_locales_locale_parent_id_uni" ON "info_shipping_blocks_list_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_shipping_blocks_list_items_locales_parent_id_idx" ON "info_shipping_blocks_list_items_locales" USING btree ("_parent_id");
  CREATE INDEX "info_shipping_blocks_list_order_idx" ON "info_shipping_blocks_list" USING btree ("_order");
  CREATE INDEX "info_shipping_blocks_list_parent_id_idx" ON "info_shipping_blocks_list" USING btree ("_parent_id");
  CREATE INDEX "info_shipping_blocks_list_path_idx" ON "info_shipping_blocks_list" USING btree ("_path");
  CREATE INDEX "info_shipping_blocks_link_order_idx" ON "info_shipping_blocks_link" USING btree ("_order");
  CREATE INDEX "info_shipping_blocks_link_parent_id_idx" ON "info_shipping_blocks_link" USING btree ("_parent_id");
  CREATE INDEX "info_shipping_blocks_link_path_idx" ON "info_shipping_blocks_link" USING btree ("_path");
  CREATE UNIQUE INDEX "info_shipping_blocks_link_locales_locale_parent_id_unique" ON "info_shipping_blocks_link_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_shipping_blocks_link_locales_parent_id_idx" ON "info_shipping_blocks_link_locales" USING btree ("_parent_id");
  CREATE INDEX "info_shipping_blocks_faq_items_order_idx" ON "info_shipping_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "info_shipping_blocks_faq_items_parent_id_idx" ON "info_shipping_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "info_shipping_blocks_faq_items_locales_locale_parent_id_uniq" ON "info_shipping_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_shipping_blocks_faq_items_locales_parent_id_idx" ON "info_shipping_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "info_shipping_blocks_faq_order_idx" ON "info_shipping_blocks_faq" USING btree ("_order");
  CREATE INDEX "info_shipping_blocks_faq_parent_id_idx" ON "info_shipping_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "info_shipping_blocks_faq_path_idx" ON "info_shipping_blocks_faq" USING btree ("_path");
  CREATE INDEX "info_shipping_blocks_size_table_order_idx" ON "info_shipping_blocks_size_table" USING btree ("_order");
  CREATE INDEX "info_shipping_blocks_size_table_parent_id_idx" ON "info_shipping_blocks_size_table" USING btree ("_parent_id");
  CREATE INDEX "info_shipping_blocks_size_table_path_idx" ON "info_shipping_blocks_size_table" USING btree ("_path");
  CREATE INDEX "info_shipping_blocks_contact_order_idx" ON "info_shipping_blocks_contact" USING btree ("_order");
  CREATE INDEX "info_shipping_blocks_contact_parent_id_idx" ON "info_shipping_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "info_shipping_blocks_contact_path_idx" ON "info_shipping_blocks_contact" USING btree ("_path");
  CREATE INDEX "info_shipping_blocks_journal_order_idx" ON "info_shipping_blocks_journal" USING btree ("_order");
  CREATE INDEX "info_shipping_blocks_journal_parent_id_idx" ON "info_shipping_blocks_journal" USING btree ("_parent_id");
  CREATE INDEX "info_shipping_blocks_journal_path_idx" ON "info_shipping_blocks_journal" USING btree ("_path");
  CREATE INDEX "info_shipping_sections_order_idx" ON "info_shipping_sections" USING btree ("_order");
  CREATE INDEX "info_shipping_sections_parent_id_idx" ON "info_shipping_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "info_shipping_sections_locales_locale_parent_id_unique" ON "info_shipping_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_shipping_sections_locales_parent_id_idx" ON "info_shipping_sections_locales" USING btree ("_parent_id");
  CREATE INDEX "info_shipping__status_idx" ON "info_shipping" USING btree ("_status");
  CREATE UNIQUE INDEX "info_shipping_locales_locale_parent_id_unique" ON "info_shipping_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_shipping_locales_parent_id_idx" ON "info_shipping_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_shipping_v_blocks_text_order_idx" ON "_info_shipping_v_blocks_text" USING btree ("_order");
  CREATE INDEX "_info_shipping_v_blocks_text_parent_id_idx" ON "_info_shipping_v_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "_info_shipping_v_blocks_text_path_idx" ON "_info_shipping_v_blocks_text" USING btree ("_path");
  CREATE UNIQUE INDEX "_info_shipping_v_blocks_text_locales_locale_parent_id_unique" ON "_info_shipping_v_blocks_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_shipping_v_blocks_text_locales_parent_id_idx" ON "_info_shipping_v_blocks_text_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_shipping_v_blocks_placeholder_order_idx" ON "_info_shipping_v_blocks_placeholder" USING btree ("_order");
  CREATE INDEX "_info_shipping_v_blocks_placeholder_parent_id_idx" ON "_info_shipping_v_blocks_placeholder" USING btree ("_parent_id");
  CREATE INDEX "_info_shipping_v_blocks_placeholder_path_idx" ON "_info_shipping_v_blocks_placeholder" USING btree ("_path");
  CREATE UNIQUE INDEX "_info_shipping_v_blocks_placeholder_locales_locale_parent_id" ON "_info_shipping_v_blocks_placeholder_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_shipping_v_blocks_placeholder_locales_parent_id_idx" ON "_info_shipping_v_blocks_placeholder_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_shipping_v_blocks_list_items_order_idx" ON "_info_shipping_v_blocks_list_items" USING btree ("_order");
  CREATE INDEX "_info_shipping_v_blocks_list_items_parent_id_idx" ON "_info_shipping_v_blocks_list_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_info_shipping_v_blocks_list_items_locales_locale_parent_id_" ON "_info_shipping_v_blocks_list_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_shipping_v_blocks_list_items_locales_parent_id_idx" ON "_info_shipping_v_blocks_list_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_shipping_v_blocks_list_order_idx" ON "_info_shipping_v_blocks_list" USING btree ("_order");
  CREATE INDEX "_info_shipping_v_blocks_list_parent_id_idx" ON "_info_shipping_v_blocks_list" USING btree ("_parent_id");
  CREATE INDEX "_info_shipping_v_blocks_list_path_idx" ON "_info_shipping_v_blocks_list" USING btree ("_path");
  CREATE INDEX "_info_shipping_v_blocks_link_order_idx" ON "_info_shipping_v_blocks_link" USING btree ("_order");
  CREATE INDEX "_info_shipping_v_blocks_link_parent_id_idx" ON "_info_shipping_v_blocks_link" USING btree ("_parent_id");
  CREATE INDEX "_info_shipping_v_blocks_link_path_idx" ON "_info_shipping_v_blocks_link" USING btree ("_path");
  CREATE UNIQUE INDEX "_info_shipping_v_blocks_link_locales_locale_parent_id_unique" ON "_info_shipping_v_blocks_link_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_shipping_v_blocks_link_locales_parent_id_idx" ON "_info_shipping_v_blocks_link_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_shipping_v_blocks_faq_items_order_idx" ON "_info_shipping_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_info_shipping_v_blocks_faq_items_parent_id_idx" ON "_info_shipping_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_info_shipping_v_blocks_faq_items_locales_locale_parent_id_u" ON "_info_shipping_v_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_shipping_v_blocks_faq_items_locales_parent_id_idx" ON "_info_shipping_v_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_shipping_v_blocks_faq_order_idx" ON "_info_shipping_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_info_shipping_v_blocks_faq_parent_id_idx" ON "_info_shipping_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_info_shipping_v_blocks_faq_path_idx" ON "_info_shipping_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_info_shipping_v_blocks_size_table_order_idx" ON "_info_shipping_v_blocks_size_table" USING btree ("_order");
  CREATE INDEX "_info_shipping_v_blocks_size_table_parent_id_idx" ON "_info_shipping_v_blocks_size_table" USING btree ("_parent_id");
  CREATE INDEX "_info_shipping_v_blocks_size_table_path_idx" ON "_info_shipping_v_blocks_size_table" USING btree ("_path");
  CREATE INDEX "_info_shipping_v_blocks_contact_order_idx" ON "_info_shipping_v_blocks_contact" USING btree ("_order");
  CREATE INDEX "_info_shipping_v_blocks_contact_parent_id_idx" ON "_info_shipping_v_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "_info_shipping_v_blocks_contact_path_idx" ON "_info_shipping_v_blocks_contact" USING btree ("_path");
  CREATE INDEX "_info_shipping_v_blocks_journal_order_idx" ON "_info_shipping_v_blocks_journal" USING btree ("_order");
  CREATE INDEX "_info_shipping_v_blocks_journal_parent_id_idx" ON "_info_shipping_v_blocks_journal" USING btree ("_parent_id");
  CREATE INDEX "_info_shipping_v_blocks_journal_path_idx" ON "_info_shipping_v_blocks_journal" USING btree ("_path");
  CREATE INDEX "_info_shipping_v_version_sections_order_idx" ON "_info_shipping_v_version_sections" USING btree ("_order");
  CREATE INDEX "_info_shipping_v_version_sections_parent_id_idx" ON "_info_shipping_v_version_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_info_shipping_v_version_sections_locales_locale_parent_id_u" ON "_info_shipping_v_version_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_shipping_v_version_sections_locales_parent_id_idx" ON "_info_shipping_v_version_sections_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_shipping_v_version_version__status_idx" ON "_info_shipping_v" USING btree ("version__status");
  CREATE INDEX "_info_shipping_v_created_at_idx" ON "_info_shipping_v" USING btree ("created_at");
  CREATE INDEX "_info_shipping_v_updated_at_idx" ON "_info_shipping_v" USING btree ("updated_at");
  CREATE INDEX "_info_shipping_v_snapshot_idx" ON "_info_shipping_v" USING btree ("snapshot");
  CREATE INDEX "_info_shipping_v_published_locale_idx" ON "_info_shipping_v" USING btree ("published_locale");
  CREATE INDEX "_info_shipping_v_latest_idx" ON "_info_shipping_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_info_shipping_v_locales_locale_parent_id_unique" ON "_info_shipping_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_shipping_v_locales_parent_id_idx" ON "_info_shipping_v_locales" USING btree ("_parent_id");
  CREATE INDEX "info_returns_blocks_text_order_idx" ON "info_returns_blocks_text" USING btree ("_order");
  CREATE INDEX "info_returns_blocks_text_parent_id_idx" ON "info_returns_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "info_returns_blocks_text_path_idx" ON "info_returns_blocks_text" USING btree ("_path");
  CREATE UNIQUE INDEX "info_returns_blocks_text_locales_locale_parent_id_unique" ON "info_returns_blocks_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_returns_blocks_text_locales_parent_id_idx" ON "info_returns_blocks_text_locales" USING btree ("_parent_id");
  CREATE INDEX "info_returns_blocks_placeholder_order_idx" ON "info_returns_blocks_placeholder" USING btree ("_order");
  CREATE INDEX "info_returns_blocks_placeholder_parent_id_idx" ON "info_returns_blocks_placeholder" USING btree ("_parent_id");
  CREATE INDEX "info_returns_blocks_placeholder_path_idx" ON "info_returns_blocks_placeholder" USING btree ("_path");
  CREATE UNIQUE INDEX "info_returns_blocks_placeholder_locales_locale_parent_id_uni" ON "info_returns_blocks_placeholder_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_returns_blocks_placeholder_locales_parent_id_idx" ON "info_returns_blocks_placeholder_locales" USING btree ("_parent_id");
  CREATE INDEX "info_returns_blocks_list_items_order_idx" ON "info_returns_blocks_list_items" USING btree ("_order");
  CREATE INDEX "info_returns_blocks_list_items_parent_id_idx" ON "info_returns_blocks_list_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "info_returns_blocks_list_items_locales_locale_parent_id_uniq" ON "info_returns_blocks_list_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_returns_blocks_list_items_locales_parent_id_idx" ON "info_returns_blocks_list_items_locales" USING btree ("_parent_id");
  CREATE INDEX "info_returns_blocks_list_order_idx" ON "info_returns_blocks_list" USING btree ("_order");
  CREATE INDEX "info_returns_blocks_list_parent_id_idx" ON "info_returns_blocks_list" USING btree ("_parent_id");
  CREATE INDEX "info_returns_blocks_list_path_idx" ON "info_returns_blocks_list" USING btree ("_path");
  CREATE INDEX "info_returns_blocks_link_order_idx" ON "info_returns_blocks_link" USING btree ("_order");
  CREATE INDEX "info_returns_blocks_link_parent_id_idx" ON "info_returns_blocks_link" USING btree ("_parent_id");
  CREATE INDEX "info_returns_blocks_link_path_idx" ON "info_returns_blocks_link" USING btree ("_path");
  CREATE UNIQUE INDEX "info_returns_blocks_link_locales_locale_parent_id_unique" ON "info_returns_blocks_link_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_returns_blocks_link_locales_parent_id_idx" ON "info_returns_blocks_link_locales" USING btree ("_parent_id");
  CREATE INDEX "info_returns_blocks_faq_items_order_idx" ON "info_returns_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "info_returns_blocks_faq_items_parent_id_idx" ON "info_returns_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "info_returns_blocks_faq_items_locales_locale_parent_id_uniqu" ON "info_returns_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_returns_blocks_faq_items_locales_parent_id_idx" ON "info_returns_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "info_returns_blocks_faq_order_idx" ON "info_returns_blocks_faq" USING btree ("_order");
  CREATE INDEX "info_returns_blocks_faq_parent_id_idx" ON "info_returns_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "info_returns_blocks_faq_path_idx" ON "info_returns_blocks_faq" USING btree ("_path");
  CREATE INDEX "info_returns_blocks_size_table_order_idx" ON "info_returns_blocks_size_table" USING btree ("_order");
  CREATE INDEX "info_returns_blocks_size_table_parent_id_idx" ON "info_returns_blocks_size_table" USING btree ("_parent_id");
  CREATE INDEX "info_returns_blocks_size_table_path_idx" ON "info_returns_blocks_size_table" USING btree ("_path");
  CREATE INDEX "info_returns_blocks_contact_order_idx" ON "info_returns_blocks_contact" USING btree ("_order");
  CREATE INDEX "info_returns_blocks_contact_parent_id_idx" ON "info_returns_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "info_returns_blocks_contact_path_idx" ON "info_returns_blocks_contact" USING btree ("_path");
  CREATE INDEX "info_returns_blocks_journal_order_idx" ON "info_returns_blocks_journal" USING btree ("_order");
  CREATE INDEX "info_returns_blocks_journal_parent_id_idx" ON "info_returns_blocks_journal" USING btree ("_parent_id");
  CREATE INDEX "info_returns_blocks_journal_path_idx" ON "info_returns_blocks_journal" USING btree ("_path");
  CREATE INDEX "info_returns_sections_order_idx" ON "info_returns_sections" USING btree ("_order");
  CREATE INDEX "info_returns_sections_parent_id_idx" ON "info_returns_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "info_returns_sections_locales_locale_parent_id_unique" ON "info_returns_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_returns_sections_locales_parent_id_idx" ON "info_returns_sections_locales" USING btree ("_parent_id");
  CREATE INDEX "info_returns__status_idx" ON "info_returns" USING btree ("_status");
  CREATE UNIQUE INDEX "info_returns_locales_locale_parent_id_unique" ON "info_returns_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_returns_locales_parent_id_idx" ON "info_returns_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_returns_v_blocks_text_order_idx" ON "_info_returns_v_blocks_text" USING btree ("_order");
  CREATE INDEX "_info_returns_v_blocks_text_parent_id_idx" ON "_info_returns_v_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "_info_returns_v_blocks_text_path_idx" ON "_info_returns_v_blocks_text" USING btree ("_path");
  CREATE UNIQUE INDEX "_info_returns_v_blocks_text_locales_locale_parent_id_unique" ON "_info_returns_v_blocks_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_returns_v_blocks_text_locales_parent_id_idx" ON "_info_returns_v_blocks_text_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_returns_v_blocks_placeholder_order_idx" ON "_info_returns_v_blocks_placeholder" USING btree ("_order");
  CREATE INDEX "_info_returns_v_blocks_placeholder_parent_id_idx" ON "_info_returns_v_blocks_placeholder" USING btree ("_parent_id");
  CREATE INDEX "_info_returns_v_blocks_placeholder_path_idx" ON "_info_returns_v_blocks_placeholder" USING btree ("_path");
  CREATE UNIQUE INDEX "_info_returns_v_blocks_placeholder_locales_locale_parent_id_" ON "_info_returns_v_blocks_placeholder_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_returns_v_blocks_placeholder_locales_parent_id_idx" ON "_info_returns_v_blocks_placeholder_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_returns_v_blocks_list_items_order_idx" ON "_info_returns_v_blocks_list_items" USING btree ("_order");
  CREATE INDEX "_info_returns_v_blocks_list_items_parent_id_idx" ON "_info_returns_v_blocks_list_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_info_returns_v_blocks_list_items_locales_locale_parent_id_u" ON "_info_returns_v_blocks_list_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_returns_v_blocks_list_items_locales_parent_id_idx" ON "_info_returns_v_blocks_list_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_returns_v_blocks_list_order_idx" ON "_info_returns_v_blocks_list" USING btree ("_order");
  CREATE INDEX "_info_returns_v_blocks_list_parent_id_idx" ON "_info_returns_v_blocks_list" USING btree ("_parent_id");
  CREATE INDEX "_info_returns_v_blocks_list_path_idx" ON "_info_returns_v_blocks_list" USING btree ("_path");
  CREATE INDEX "_info_returns_v_blocks_link_order_idx" ON "_info_returns_v_blocks_link" USING btree ("_order");
  CREATE INDEX "_info_returns_v_blocks_link_parent_id_idx" ON "_info_returns_v_blocks_link" USING btree ("_parent_id");
  CREATE INDEX "_info_returns_v_blocks_link_path_idx" ON "_info_returns_v_blocks_link" USING btree ("_path");
  CREATE UNIQUE INDEX "_info_returns_v_blocks_link_locales_locale_parent_id_unique" ON "_info_returns_v_blocks_link_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_returns_v_blocks_link_locales_parent_id_idx" ON "_info_returns_v_blocks_link_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_returns_v_blocks_faq_items_order_idx" ON "_info_returns_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_info_returns_v_blocks_faq_items_parent_id_idx" ON "_info_returns_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_info_returns_v_blocks_faq_items_locales_locale_parent_id_un" ON "_info_returns_v_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_returns_v_blocks_faq_items_locales_parent_id_idx" ON "_info_returns_v_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_returns_v_blocks_faq_order_idx" ON "_info_returns_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_info_returns_v_blocks_faq_parent_id_idx" ON "_info_returns_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_info_returns_v_blocks_faq_path_idx" ON "_info_returns_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_info_returns_v_blocks_size_table_order_idx" ON "_info_returns_v_blocks_size_table" USING btree ("_order");
  CREATE INDEX "_info_returns_v_blocks_size_table_parent_id_idx" ON "_info_returns_v_blocks_size_table" USING btree ("_parent_id");
  CREATE INDEX "_info_returns_v_blocks_size_table_path_idx" ON "_info_returns_v_blocks_size_table" USING btree ("_path");
  CREATE INDEX "_info_returns_v_blocks_contact_order_idx" ON "_info_returns_v_blocks_contact" USING btree ("_order");
  CREATE INDEX "_info_returns_v_blocks_contact_parent_id_idx" ON "_info_returns_v_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "_info_returns_v_blocks_contact_path_idx" ON "_info_returns_v_blocks_contact" USING btree ("_path");
  CREATE INDEX "_info_returns_v_blocks_journal_order_idx" ON "_info_returns_v_blocks_journal" USING btree ("_order");
  CREATE INDEX "_info_returns_v_blocks_journal_parent_id_idx" ON "_info_returns_v_blocks_journal" USING btree ("_parent_id");
  CREATE INDEX "_info_returns_v_blocks_journal_path_idx" ON "_info_returns_v_blocks_journal" USING btree ("_path");
  CREATE INDEX "_info_returns_v_version_sections_order_idx" ON "_info_returns_v_version_sections" USING btree ("_order");
  CREATE INDEX "_info_returns_v_version_sections_parent_id_idx" ON "_info_returns_v_version_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_info_returns_v_version_sections_locales_locale_parent_id_un" ON "_info_returns_v_version_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_returns_v_version_sections_locales_parent_id_idx" ON "_info_returns_v_version_sections_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_returns_v_version_version__status_idx" ON "_info_returns_v" USING btree ("version__status");
  CREATE INDEX "_info_returns_v_created_at_idx" ON "_info_returns_v" USING btree ("created_at");
  CREATE INDEX "_info_returns_v_updated_at_idx" ON "_info_returns_v" USING btree ("updated_at");
  CREATE INDEX "_info_returns_v_snapshot_idx" ON "_info_returns_v" USING btree ("snapshot");
  CREATE INDEX "_info_returns_v_published_locale_idx" ON "_info_returns_v" USING btree ("published_locale");
  CREATE INDEX "_info_returns_v_latest_idx" ON "_info_returns_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_info_returns_v_locales_locale_parent_id_unique" ON "_info_returns_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_returns_v_locales_parent_id_idx" ON "_info_returns_v_locales" USING btree ("_parent_id");
  CREATE INDEX "info_size_guide_blocks_text_order_idx" ON "info_size_guide_blocks_text" USING btree ("_order");
  CREATE INDEX "info_size_guide_blocks_text_parent_id_idx" ON "info_size_guide_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "info_size_guide_blocks_text_path_idx" ON "info_size_guide_blocks_text" USING btree ("_path");
  CREATE UNIQUE INDEX "info_size_guide_blocks_text_locales_locale_parent_id_unique" ON "info_size_guide_blocks_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_size_guide_blocks_text_locales_parent_id_idx" ON "info_size_guide_blocks_text_locales" USING btree ("_parent_id");
  CREATE INDEX "info_size_guide_blocks_placeholder_order_idx" ON "info_size_guide_blocks_placeholder" USING btree ("_order");
  CREATE INDEX "info_size_guide_blocks_placeholder_parent_id_idx" ON "info_size_guide_blocks_placeholder" USING btree ("_parent_id");
  CREATE INDEX "info_size_guide_blocks_placeholder_path_idx" ON "info_size_guide_blocks_placeholder" USING btree ("_path");
  CREATE UNIQUE INDEX "info_size_guide_blocks_placeholder_locales_locale_parent_id_" ON "info_size_guide_blocks_placeholder_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_size_guide_blocks_placeholder_locales_parent_id_idx" ON "info_size_guide_blocks_placeholder_locales" USING btree ("_parent_id");
  CREATE INDEX "info_size_guide_blocks_list_items_order_idx" ON "info_size_guide_blocks_list_items" USING btree ("_order");
  CREATE INDEX "info_size_guide_blocks_list_items_parent_id_idx" ON "info_size_guide_blocks_list_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "info_size_guide_blocks_list_items_locales_locale_parent_id_u" ON "info_size_guide_blocks_list_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_size_guide_blocks_list_items_locales_parent_id_idx" ON "info_size_guide_blocks_list_items_locales" USING btree ("_parent_id");
  CREATE INDEX "info_size_guide_blocks_list_order_idx" ON "info_size_guide_blocks_list" USING btree ("_order");
  CREATE INDEX "info_size_guide_blocks_list_parent_id_idx" ON "info_size_guide_blocks_list" USING btree ("_parent_id");
  CREATE INDEX "info_size_guide_blocks_list_path_idx" ON "info_size_guide_blocks_list" USING btree ("_path");
  CREATE INDEX "info_size_guide_blocks_link_order_idx" ON "info_size_guide_blocks_link" USING btree ("_order");
  CREATE INDEX "info_size_guide_blocks_link_parent_id_idx" ON "info_size_guide_blocks_link" USING btree ("_parent_id");
  CREATE INDEX "info_size_guide_blocks_link_path_idx" ON "info_size_guide_blocks_link" USING btree ("_path");
  CREATE UNIQUE INDEX "info_size_guide_blocks_link_locales_locale_parent_id_unique" ON "info_size_guide_blocks_link_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_size_guide_blocks_link_locales_parent_id_idx" ON "info_size_guide_blocks_link_locales" USING btree ("_parent_id");
  CREATE INDEX "info_size_guide_blocks_faq_items_order_idx" ON "info_size_guide_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "info_size_guide_blocks_faq_items_parent_id_idx" ON "info_size_guide_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "info_size_guide_blocks_faq_items_locales_locale_parent_id_un" ON "info_size_guide_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_size_guide_blocks_faq_items_locales_parent_id_idx" ON "info_size_guide_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "info_size_guide_blocks_faq_order_idx" ON "info_size_guide_blocks_faq" USING btree ("_order");
  CREATE INDEX "info_size_guide_blocks_faq_parent_id_idx" ON "info_size_guide_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "info_size_guide_blocks_faq_path_idx" ON "info_size_guide_blocks_faq" USING btree ("_path");
  CREATE INDEX "info_size_guide_blocks_size_table_order_idx" ON "info_size_guide_blocks_size_table" USING btree ("_order");
  CREATE INDEX "info_size_guide_blocks_size_table_parent_id_idx" ON "info_size_guide_blocks_size_table" USING btree ("_parent_id");
  CREATE INDEX "info_size_guide_blocks_size_table_path_idx" ON "info_size_guide_blocks_size_table" USING btree ("_path");
  CREATE INDEX "info_size_guide_blocks_contact_order_idx" ON "info_size_guide_blocks_contact" USING btree ("_order");
  CREATE INDEX "info_size_guide_blocks_contact_parent_id_idx" ON "info_size_guide_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "info_size_guide_blocks_contact_path_idx" ON "info_size_guide_blocks_contact" USING btree ("_path");
  CREATE INDEX "info_size_guide_blocks_journal_order_idx" ON "info_size_guide_blocks_journal" USING btree ("_order");
  CREATE INDEX "info_size_guide_blocks_journal_parent_id_idx" ON "info_size_guide_blocks_journal" USING btree ("_parent_id");
  CREATE INDEX "info_size_guide_blocks_journal_path_idx" ON "info_size_guide_blocks_journal" USING btree ("_path");
  CREATE INDEX "info_size_guide_sections_order_idx" ON "info_size_guide_sections" USING btree ("_order");
  CREATE INDEX "info_size_guide_sections_parent_id_idx" ON "info_size_guide_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "info_size_guide_sections_locales_locale_parent_id_unique" ON "info_size_guide_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_size_guide_sections_locales_parent_id_idx" ON "info_size_guide_sections_locales" USING btree ("_parent_id");
  CREATE INDEX "info_size_guide__status_idx" ON "info_size_guide" USING btree ("_status");
  CREATE UNIQUE INDEX "info_size_guide_locales_locale_parent_id_unique" ON "info_size_guide_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_size_guide_locales_parent_id_idx" ON "info_size_guide_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_size_guide_v_blocks_text_order_idx" ON "_info_size_guide_v_blocks_text" USING btree ("_order");
  CREATE INDEX "_info_size_guide_v_blocks_text_parent_id_idx" ON "_info_size_guide_v_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "_info_size_guide_v_blocks_text_path_idx" ON "_info_size_guide_v_blocks_text" USING btree ("_path");
  CREATE UNIQUE INDEX "_info_size_guide_v_blocks_text_locales_locale_parent_id_uniq" ON "_info_size_guide_v_blocks_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_size_guide_v_blocks_text_locales_parent_id_idx" ON "_info_size_guide_v_blocks_text_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_size_guide_v_blocks_placeholder_order_idx" ON "_info_size_guide_v_blocks_placeholder" USING btree ("_order");
  CREATE INDEX "_info_size_guide_v_blocks_placeholder_parent_id_idx" ON "_info_size_guide_v_blocks_placeholder" USING btree ("_parent_id");
  CREATE INDEX "_info_size_guide_v_blocks_placeholder_path_idx" ON "_info_size_guide_v_blocks_placeholder" USING btree ("_path");
  CREATE UNIQUE INDEX "_info_size_guide_v_blocks_placeholder_locales_locale_parent_" ON "_info_size_guide_v_blocks_placeholder_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_size_guide_v_blocks_placeholder_locales_parent_id_idx" ON "_info_size_guide_v_blocks_placeholder_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_size_guide_v_blocks_list_items_order_idx" ON "_info_size_guide_v_blocks_list_items" USING btree ("_order");
  CREATE INDEX "_info_size_guide_v_blocks_list_items_parent_id_idx" ON "_info_size_guide_v_blocks_list_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_info_size_guide_v_blocks_list_items_locales_locale_parent_i" ON "_info_size_guide_v_blocks_list_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_size_guide_v_blocks_list_items_locales_parent_id_idx" ON "_info_size_guide_v_blocks_list_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_size_guide_v_blocks_list_order_idx" ON "_info_size_guide_v_blocks_list" USING btree ("_order");
  CREATE INDEX "_info_size_guide_v_blocks_list_parent_id_idx" ON "_info_size_guide_v_blocks_list" USING btree ("_parent_id");
  CREATE INDEX "_info_size_guide_v_blocks_list_path_idx" ON "_info_size_guide_v_blocks_list" USING btree ("_path");
  CREATE INDEX "_info_size_guide_v_blocks_link_order_idx" ON "_info_size_guide_v_blocks_link" USING btree ("_order");
  CREATE INDEX "_info_size_guide_v_blocks_link_parent_id_idx" ON "_info_size_guide_v_blocks_link" USING btree ("_parent_id");
  CREATE INDEX "_info_size_guide_v_blocks_link_path_idx" ON "_info_size_guide_v_blocks_link" USING btree ("_path");
  CREATE UNIQUE INDEX "_info_size_guide_v_blocks_link_locales_locale_parent_id_uniq" ON "_info_size_guide_v_blocks_link_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_size_guide_v_blocks_link_locales_parent_id_idx" ON "_info_size_guide_v_blocks_link_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_size_guide_v_blocks_faq_items_order_idx" ON "_info_size_guide_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_info_size_guide_v_blocks_faq_items_parent_id_idx" ON "_info_size_guide_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_info_size_guide_v_blocks_faq_items_locales_locale_parent_id" ON "_info_size_guide_v_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_size_guide_v_blocks_faq_items_locales_parent_id_idx" ON "_info_size_guide_v_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_size_guide_v_blocks_faq_order_idx" ON "_info_size_guide_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_info_size_guide_v_blocks_faq_parent_id_idx" ON "_info_size_guide_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_info_size_guide_v_blocks_faq_path_idx" ON "_info_size_guide_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_info_size_guide_v_blocks_size_table_order_idx" ON "_info_size_guide_v_blocks_size_table" USING btree ("_order");
  CREATE INDEX "_info_size_guide_v_blocks_size_table_parent_id_idx" ON "_info_size_guide_v_blocks_size_table" USING btree ("_parent_id");
  CREATE INDEX "_info_size_guide_v_blocks_size_table_path_idx" ON "_info_size_guide_v_blocks_size_table" USING btree ("_path");
  CREATE INDEX "_info_size_guide_v_blocks_contact_order_idx" ON "_info_size_guide_v_blocks_contact" USING btree ("_order");
  CREATE INDEX "_info_size_guide_v_blocks_contact_parent_id_idx" ON "_info_size_guide_v_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "_info_size_guide_v_blocks_contact_path_idx" ON "_info_size_guide_v_blocks_contact" USING btree ("_path");
  CREATE INDEX "_info_size_guide_v_blocks_journal_order_idx" ON "_info_size_guide_v_blocks_journal" USING btree ("_order");
  CREATE INDEX "_info_size_guide_v_blocks_journal_parent_id_idx" ON "_info_size_guide_v_blocks_journal" USING btree ("_parent_id");
  CREATE INDEX "_info_size_guide_v_blocks_journal_path_idx" ON "_info_size_guide_v_blocks_journal" USING btree ("_path");
  CREATE INDEX "_info_size_guide_v_version_sections_order_idx" ON "_info_size_guide_v_version_sections" USING btree ("_order");
  CREATE INDEX "_info_size_guide_v_version_sections_parent_id_idx" ON "_info_size_guide_v_version_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_info_size_guide_v_version_sections_locales_locale_parent_id" ON "_info_size_guide_v_version_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_size_guide_v_version_sections_locales_parent_id_idx" ON "_info_size_guide_v_version_sections_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_size_guide_v_version_version__status_idx" ON "_info_size_guide_v" USING btree ("version__status");
  CREATE INDEX "_info_size_guide_v_created_at_idx" ON "_info_size_guide_v" USING btree ("created_at");
  CREATE INDEX "_info_size_guide_v_updated_at_idx" ON "_info_size_guide_v" USING btree ("updated_at");
  CREATE INDEX "_info_size_guide_v_snapshot_idx" ON "_info_size_guide_v" USING btree ("snapshot");
  CREATE INDEX "_info_size_guide_v_published_locale_idx" ON "_info_size_guide_v" USING btree ("published_locale");
  CREATE INDEX "_info_size_guide_v_latest_idx" ON "_info_size_guide_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_info_size_guide_v_locales_locale_parent_id_unique" ON "_info_size_guide_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_size_guide_v_locales_parent_id_idx" ON "_info_size_guide_v_locales" USING btree ("_parent_id");
  CREATE INDEX "info_track_order_blocks_text_order_idx" ON "info_track_order_blocks_text" USING btree ("_order");
  CREATE INDEX "info_track_order_blocks_text_parent_id_idx" ON "info_track_order_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "info_track_order_blocks_text_path_idx" ON "info_track_order_blocks_text" USING btree ("_path");
  CREATE UNIQUE INDEX "info_track_order_blocks_text_locales_locale_parent_id_unique" ON "info_track_order_blocks_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_track_order_blocks_text_locales_parent_id_idx" ON "info_track_order_blocks_text_locales" USING btree ("_parent_id");
  CREATE INDEX "info_track_order_blocks_placeholder_order_idx" ON "info_track_order_blocks_placeholder" USING btree ("_order");
  CREATE INDEX "info_track_order_blocks_placeholder_parent_id_idx" ON "info_track_order_blocks_placeholder" USING btree ("_parent_id");
  CREATE INDEX "info_track_order_blocks_placeholder_path_idx" ON "info_track_order_blocks_placeholder" USING btree ("_path");
  CREATE UNIQUE INDEX "info_track_order_blocks_placeholder_locales_locale_parent_id" ON "info_track_order_blocks_placeholder_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_track_order_blocks_placeholder_locales_parent_id_idx" ON "info_track_order_blocks_placeholder_locales" USING btree ("_parent_id");
  CREATE INDEX "info_track_order_blocks_list_items_order_idx" ON "info_track_order_blocks_list_items" USING btree ("_order");
  CREATE INDEX "info_track_order_blocks_list_items_parent_id_idx" ON "info_track_order_blocks_list_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "info_track_order_blocks_list_items_locales_locale_parent_id_" ON "info_track_order_blocks_list_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_track_order_blocks_list_items_locales_parent_id_idx" ON "info_track_order_blocks_list_items_locales" USING btree ("_parent_id");
  CREATE INDEX "info_track_order_blocks_list_order_idx" ON "info_track_order_blocks_list" USING btree ("_order");
  CREATE INDEX "info_track_order_blocks_list_parent_id_idx" ON "info_track_order_blocks_list" USING btree ("_parent_id");
  CREATE INDEX "info_track_order_blocks_list_path_idx" ON "info_track_order_blocks_list" USING btree ("_path");
  CREATE INDEX "info_track_order_blocks_link_order_idx" ON "info_track_order_blocks_link" USING btree ("_order");
  CREATE INDEX "info_track_order_blocks_link_parent_id_idx" ON "info_track_order_blocks_link" USING btree ("_parent_id");
  CREATE INDEX "info_track_order_blocks_link_path_idx" ON "info_track_order_blocks_link" USING btree ("_path");
  CREATE UNIQUE INDEX "info_track_order_blocks_link_locales_locale_parent_id_unique" ON "info_track_order_blocks_link_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_track_order_blocks_link_locales_parent_id_idx" ON "info_track_order_blocks_link_locales" USING btree ("_parent_id");
  CREATE INDEX "info_track_order_blocks_faq_items_order_idx" ON "info_track_order_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "info_track_order_blocks_faq_items_parent_id_idx" ON "info_track_order_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "info_track_order_blocks_faq_items_locales_locale_parent_id_u" ON "info_track_order_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_track_order_blocks_faq_items_locales_parent_id_idx" ON "info_track_order_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "info_track_order_blocks_faq_order_idx" ON "info_track_order_blocks_faq" USING btree ("_order");
  CREATE INDEX "info_track_order_blocks_faq_parent_id_idx" ON "info_track_order_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "info_track_order_blocks_faq_path_idx" ON "info_track_order_blocks_faq" USING btree ("_path");
  CREATE INDEX "info_track_order_blocks_size_table_order_idx" ON "info_track_order_blocks_size_table" USING btree ("_order");
  CREATE INDEX "info_track_order_blocks_size_table_parent_id_idx" ON "info_track_order_blocks_size_table" USING btree ("_parent_id");
  CREATE INDEX "info_track_order_blocks_size_table_path_idx" ON "info_track_order_blocks_size_table" USING btree ("_path");
  CREATE INDEX "info_track_order_blocks_contact_order_idx" ON "info_track_order_blocks_contact" USING btree ("_order");
  CREATE INDEX "info_track_order_blocks_contact_parent_id_idx" ON "info_track_order_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "info_track_order_blocks_contact_path_idx" ON "info_track_order_blocks_contact" USING btree ("_path");
  CREATE INDEX "info_track_order_blocks_journal_order_idx" ON "info_track_order_blocks_journal" USING btree ("_order");
  CREATE INDEX "info_track_order_blocks_journal_parent_id_idx" ON "info_track_order_blocks_journal" USING btree ("_parent_id");
  CREATE INDEX "info_track_order_blocks_journal_path_idx" ON "info_track_order_blocks_journal" USING btree ("_path");
  CREATE INDEX "info_track_order_sections_order_idx" ON "info_track_order_sections" USING btree ("_order");
  CREATE INDEX "info_track_order_sections_parent_id_idx" ON "info_track_order_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "info_track_order_sections_locales_locale_parent_id_unique" ON "info_track_order_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_track_order_sections_locales_parent_id_idx" ON "info_track_order_sections_locales" USING btree ("_parent_id");
  CREATE INDEX "info_track_order__status_idx" ON "info_track_order" USING btree ("_status");
  CREATE UNIQUE INDEX "info_track_order_locales_locale_parent_id_unique" ON "info_track_order_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_track_order_locales_parent_id_idx" ON "info_track_order_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_track_order_v_blocks_text_order_idx" ON "_info_track_order_v_blocks_text" USING btree ("_order");
  CREATE INDEX "_info_track_order_v_blocks_text_parent_id_idx" ON "_info_track_order_v_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "_info_track_order_v_blocks_text_path_idx" ON "_info_track_order_v_blocks_text" USING btree ("_path");
  CREATE UNIQUE INDEX "_info_track_order_v_blocks_text_locales_locale_parent_id_uni" ON "_info_track_order_v_blocks_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_track_order_v_blocks_text_locales_parent_id_idx" ON "_info_track_order_v_blocks_text_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_track_order_v_blocks_placeholder_order_idx" ON "_info_track_order_v_blocks_placeholder" USING btree ("_order");
  CREATE INDEX "_info_track_order_v_blocks_placeholder_parent_id_idx" ON "_info_track_order_v_blocks_placeholder" USING btree ("_parent_id");
  CREATE INDEX "_info_track_order_v_blocks_placeholder_path_idx" ON "_info_track_order_v_blocks_placeholder" USING btree ("_path");
  CREATE UNIQUE INDEX "_info_track_order_v_blocks_placeholder_locales_locale_parent" ON "_info_track_order_v_blocks_placeholder_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_track_order_v_blocks_placeholder_locales_parent_id_idx" ON "_info_track_order_v_blocks_placeholder_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_track_order_v_blocks_list_items_order_idx" ON "_info_track_order_v_blocks_list_items" USING btree ("_order");
  CREATE INDEX "_info_track_order_v_blocks_list_items_parent_id_idx" ON "_info_track_order_v_blocks_list_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_info_track_order_v_blocks_list_items_locales_locale_parent_" ON "_info_track_order_v_blocks_list_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_track_order_v_blocks_list_items_locales_parent_id_idx" ON "_info_track_order_v_blocks_list_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_track_order_v_blocks_list_order_idx" ON "_info_track_order_v_blocks_list" USING btree ("_order");
  CREATE INDEX "_info_track_order_v_blocks_list_parent_id_idx" ON "_info_track_order_v_blocks_list" USING btree ("_parent_id");
  CREATE INDEX "_info_track_order_v_blocks_list_path_idx" ON "_info_track_order_v_blocks_list" USING btree ("_path");
  CREATE INDEX "_info_track_order_v_blocks_link_order_idx" ON "_info_track_order_v_blocks_link" USING btree ("_order");
  CREATE INDEX "_info_track_order_v_blocks_link_parent_id_idx" ON "_info_track_order_v_blocks_link" USING btree ("_parent_id");
  CREATE INDEX "_info_track_order_v_blocks_link_path_idx" ON "_info_track_order_v_blocks_link" USING btree ("_path");
  CREATE UNIQUE INDEX "_info_track_order_v_blocks_link_locales_locale_parent_id_uni" ON "_info_track_order_v_blocks_link_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_track_order_v_blocks_link_locales_parent_id_idx" ON "_info_track_order_v_blocks_link_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_track_order_v_blocks_faq_items_order_idx" ON "_info_track_order_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_info_track_order_v_blocks_faq_items_parent_id_idx" ON "_info_track_order_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_info_track_order_v_blocks_faq_items_locales_locale_parent_i" ON "_info_track_order_v_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_track_order_v_blocks_faq_items_locales_parent_id_idx" ON "_info_track_order_v_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_track_order_v_blocks_faq_order_idx" ON "_info_track_order_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_info_track_order_v_blocks_faq_parent_id_idx" ON "_info_track_order_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_info_track_order_v_blocks_faq_path_idx" ON "_info_track_order_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_info_track_order_v_blocks_size_table_order_idx" ON "_info_track_order_v_blocks_size_table" USING btree ("_order");
  CREATE INDEX "_info_track_order_v_blocks_size_table_parent_id_idx" ON "_info_track_order_v_blocks_size_table" USING btree ("_parent_id");
  CREATE INDEX "_info_track_order_v_blocks_size_table_path_idx" ON "_info_track_order_v_blocks_size_table" USING btree ("_path");
  CREATE INDEX "_info_track_order_v_blocks_contact_order_idx" ON "_info_track_order_v_blocks_contact" USING btree ("_order");
  CREATE INDEX "_info_track_order_v_blocks_contact_parent_id_idx" ON "_info_track_order_v_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "_info_track_order_v_blocks_contact_path_idx" ON "_info_track_order_v_blocks_contact" USING btree ("_path");
  CREATE INDEX "_info_track_order_v_blocks_journal_order_idx" ON "_info_track_order_v_blocks_journal" USING btree ("_order");
  CREATE INDEX "_info_track_order_v_blocks_journal_parent_id_idx" ON "_info_track_order_v_blocks_journal" USING btree ("_parent_id");
  CREATE INDEX "_info_track_order_v_blocks_journal_path_idx" ON "_info_track_order_v_blocks_journal" USING btree ("_path");
  CREATE INDEX "_info_track_order_v_version_sections_order_idx" ON "_info_track_order_v_version_sections" USING btree ("_order");
  CREATE INDEX "_info_track_order_v_version_sections_parent_id_idx" ON "_info_track_order_v_version_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_info_track_order_v_version_sections_locales_locale_parent_i" ON "_info_track_order_v_version_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_track_order_v_version_sections_locales_parent_id_idx" ON "_info_track_order_v_version_sections_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_track_order_v_version_version__status_idx" ON "_info_track_order_v" USING btree ("version__status");
  CREATE INDEX "_info_track_order_v_created_at_idx" ON "_info_track_order_v" USING btree ("created_at");
  CREATE INDEX "_info_track_order_v_updated_at_idx" ON "_info_track_order_v" USING btree ("updated_at");
  CREATE INDEX "_info_track_order_v_snapshot_idx" ON "_info_track_order_v" USING btree ("snapshot");
  CREATE INDEX "_info_track_order_v_published_locale_idx" ON "_info_track_order_v" USING btree ("published_locale");
  CREATE INDEX "_info_track_order_v_latest_idx" ON "_info_track_order_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_info_track_order_v_locales_locale_parent_id_unique" ON "_info_track_order_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_track_order_v_locales_parent_id_idx" ON "_info_track_order_v_locales" USING btree ("_parent_id");
  CREATE INDEX "info_faq_blocks_text_order_idx" ON "info_faq_blocks_text" USING btree ("_order");
  CREATE INDEX "info_faq_blocks_text_parent_id_idx" ON "info_faq_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "info_faq_blocks_text_path_idx" ON "info_faq_blocks_text" USING btree ("_path");
  CREATE UNIQUE INDEX "info_faq_blocks_text_locales_locale_parent_id_unique" ON "info_faq_blocks_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_faq_blocks_text_locales_parent_id_idx" ON "info_faq_blocks_text_locales" USING btree ("_parent_id");
  CREATE INDEX "info_faq_blocks_placeholder_order_idx" ON "info_faq_blocks_placeholder" USING btree ("_order");
  CREATE INDEX "info_faq_blocks_placeholder_parent_id_idx" ON "info_faq_blocks_placeholder" USING btree ("_parent_id");
  CREATE INDEX "info_faq_blocks_placeholder_path_idx" ON "info_faq_blocks_placeholder" USING btree ("_path");
  CREATE UNIQUE INDEX "info_faq_blocks_placeholder_locales_locale_parent_id_unique" ON "info_faq_blocks_placeholder_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_faq_blocks_placeholder_locales_parent_id_idx" ON "info_faq_blocks_placeholder_locales" USING btree ("_parent_id");
  CREATE INDEX "info_faq_blocks_list_items_order_idx" ON "info_faq_blocks_list_items" USING btree ("_order");
  CREATE INDEX "info_faq_blocks_list_items_parent_id_idx" ON "info_faq_blocks_list_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "info_faq_blocks_list_items_locales_locale_parent_id_unique" ON "info_faq_blocks_list_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_faq_blocks_list_items_locales_parent_id_idx" ON "info_faq_blocks_list_items_locales" USING btree ("_parent_id");
  CREATE INDEX "info_faq_blocks_list_order_idx" ON "info_faq_blocks_list" USING btree ("_order");
  CREATE INDEX "info_faq_blocks_list_parent_id_idx" ON "info_faq_blocks_list" USING btree ("_parent_id");
  CREATE INDEX "info_faq_blocks_list_path_idx" ON "info_faq_blocks_list" USING btree ("_path");
  CREATE INDEX "info_faq_blocks_link_order_idx" ON "info_faq_blocks_link" USING btree ("_order");
  CREATE INDEX "info_faq_blocks_link_parent_id_idx" ON "info_faq_blocks_link" USING btree ("_parent_id");
  CREATE INDEX "info_faq_blocks_link_path_idx" ON "info_faq_blocks_link" USING btree ("_path");
  CREATE UNIQUE INDEX "info_faq_blocks_link_locales_locale_parent_id_unique" ON "info_faq_blocks_link_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_faq_blocks_link_locales_parent_id_idx" ON "info_faq_blocks_link_locales" USING btree ("_parent_id");
  CREATE INDEX "info_faq_blocks_faq_items_order_idx" ON "info_faq_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "info_faq_blocks_faq_items_parent_id_idx" ON "info_faq_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "info_faq_blocks_faq_items_locales_locale_parent_id_unique" ON "info_faq_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_faq_blocks_faq_items_locales_parent_id_idx" ON "info_faq_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "info_faq_blocks_faq_order_idx" ON "info_faq_blocks_faq" USING btree ("_order");
  CREATE INDEX "info_faq_blocks_faq_parent_id_idx" ON "info_faq_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "info_faq_blocks_faq_path_idx" ON "info_faq_blocks_faq" USING btree ("_path");
  CREATE INDEX "info_faq_blocks_size_table_order_idx" ON "info_faq_blocks_size_table" USING btree ("_order");
  CREATE INDEX "info_faq_blocks_size_table_parent_id_idx" ON "info_faq_blocks_size_table" USING btree ("_parent_id");
  CREATE INDEX "info_faq_blocks_size_table_path_idx" ON "info_faq_blocks_size_table" USING btree ("_path");
  CREATE INDEX "info_faq_blocks_contact_order_idx" ON "info_faq_blocks_contact" USING btree ("_order");
  CREATE INDEX "info_faq_blocks_contact_parent_id_idx" ON "info_faq_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "info_faq_blocks_contact_path_idx" ON "info_faq_blocks_contact" USING btree ("_path");
  CREATE INDEX "info_faq_blocks_journal_order_idx" ON "info_faq_blocks_journal" USING btree ("_order");
  CREATE INDEX "info_faq_blocks_journal_parent_id_idx" ON "info_faq_blocks_journal" USING btree ("_parent_id");
  CREATE INDEX "info_faq_blocks_journal_path_idx" ON "info_faq_blocks_journal" USING btree ("_path");
  CREATE INDEX "info_faq_sections_order_idx" ON "info_faq_sections" USING btree ("_order");
  CREATE INDEX "info_faq_sections_parent_id_idx" ON "info_faq_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "info_faq_sections_locales_locale_parent_id_unique" ON "info_faq_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_faq_sections_locales_parent_id_idx" ON "info_faq_sections_locales" USING btree ("_parent_id");
  CREATE INDEX "info_faq__status_idx" ON "info_faq" USING btree ("_status");
  CREATE UNIQUE INDEX "info_faq_locales_locale_parent_id_unique" ON "info_faq_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_faq_locales_parent_id_idx" ON "info_faq_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_faq_v_blocks_text_order_idx" ON "_info_faq_v_blocks_text" USING btree ("_order");
  CREATE INDEX "_info_faq_v_blocks_text_parent_id_idx" ON "_info_faq_v_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "_info_faq_v_blocks_text_path_idx" ON "_info_faq_v_blocks_text" USING btree ("_path");
  CREATE UNIQUE INDEX "_info_faq_v_blocks_text_locales_locale_parent_id_unique" ON "_info_faq_v_blocks_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_faq_v_blocks_text_locales_parent_id_idx" ON "_info_faq_v_blocks_text_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_faq_v_blocks_placeholder_order_idx" ON "_info_faq_v_blocks_placeholder" USING btree ("_order");
  CREATE INDEX "_info_faq_v_blocks_placeholder_parent_id_idx" ON "_info_faq_v_blocks_placeholder" USING btree ("_parent_id");
  CREATE INDEX "_info_faq_v_blocks_placeholder_path_idx" ON "_info_faq_v_blocks_placeholder" USING btree ("_path");
  CREATE UNIQUE INDEX "_info_faq_v_blocks_placeholder_locales_locale_parent_id_uniq" ON "_info_faq_v_blocks_placeholder_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_faq_v_blocks_placeholder_locales_parent_id_idx" ON "_info_faq_v_blocks_placeholder_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_faq_v_blocks_list_items_order_idx" ON "_info_faq_v_blocks_list_items" USING btree ("_order");
  CREATE INDEX "_info_faq_v_blocks_list_items_parent_id_idx" ON "_info_faq_v_blocks_list_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_info_faq_v_blocks_list_items_locales_locale_parent_id_uniqu" ON "_info_faq_v_blocks_list_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_faq_v_blocks_list_items_locales_parent_id_idx" ON "_info_faq_v_blocks_list_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_faq_v_blocks_list_order_idx" ON "_info_faq_v_blocks_list" USING btree ("_order");
  CREATE INDEX "_info_faq_v_blocks_list_parent_id_idx" ON "_info_faq_v_blocks_list" USING btree ("_parent_id");
  CREATE INDEX "_info_faq_v_blocks_list_path_idx" ON "_info_faq_v_blocks_list" USING btree ("_path");
  CREATE INDEX "_info_faq_v_blocks_link_order_idx" ON "_info_faq_v_blocks_link" USING btree ("_order");
  CREATE INDEX "_info_faq_v_blocks_link_parent_id_idx" ON "_info_faq_v_blocks_link" USING btree ("_parent_id");
  CREATE INDEX "_info_faq_v_blocks_link_path_idx" ON "_info_faq_v_blocks_link" USING btree ("_path");
  CREATE UNIQUE INDEX "_info_faq_v_blocks_link_locales_locale_parent_id_unique" ON "_info_faq_v_blocks_link_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_faq_v_blocks_link_locales_parent_id_idx" ON "_info_faq_v_blocks_link_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_faq_v_blocks_faq_items_order_idx" ON "_info_faq_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_info_faq_v_blocks_faq_items_parent_id_idx" ON "_info_faq_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_info_faq_v_blocks_faq_items_locales_locale_parent_id_unique" ON "_info_faq_v_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_faq_v_blocks_faq_items_locales_parent_id_idx" ON "_info_faq_v_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_faq_v_blocks_faq_order_idx" ON "_info_faq_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_info_faq_v_blocks_faq_parent_id_idx" ON "_info_faq_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_info_faq_v_blocks_faq_path_idx" ON "_info_faq_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_info_faq_v_blocks_size_table_order_idx" ON "_info_faq_v_blocks_size_table" USING btree ("_order");
  CREATE INDEX "_info_faq_v_blocks_size_table_parent_id_idx" ON "_info_faq_v_blocks_size_table" USING btree ("_parent_id");
  CREATE INDEX "_info_faq_v_blocks_size_table_path_idx" ON "_info_faq_v_blocks_size_table" USING btree ("_path");
  CREATE INDEX "_info_faq_v_blocks_contact_order_idx" ON "_info_faq_v_blocks_contact" USING btree ("_order");
  CREATE INDEX "_info_faq_v_blocks_contact_parent_id_idx" ON "_info_faq_v_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "_info_faq_v_blocks_contact_path_idx" ON "_info_faq_v_blocks_contact" USING btree ("_path");
  CREATE INDEX "_info_faq_v_blocks_journal_order_idx" ON "_info_faq_v_blocks_journal" USING btree ("_order");
  CREATE INDEX "_info_faq_v_blocks_journal_parent_id_idx" ON "_info_faq_v_blocks_journal" USING btree ("_parent_id");
  CREATE INDEX "_info_faq_v_blocks_journal_path_idx" ON "_info_faq_v_blocks_journal" USING btree ("_path");
  CREATE INDEX "_info_faq_v_version_sections_order_idx" ON "_info_faq_v_version_sections" USING btree ("_order");
  CREATE INDEX "_info_faq_v_version_sections_parent_id_idx" ON "_info_faq_v_version_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_info_faq_v_version_sections_locales_locale_parent_id_unique" ON "_info_faq_v_version_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_faq_v_version_sections_locales_parent_id_idx" ON "_info_faq_v_version_sections_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_faq_v_version_version__status_idx" ON "_info_faq_v" USING btree ("version__status");
  CREATE INDEX "_info_faq_v_created_at_idx" ON "_info_faq_v" USING btree ("created_at");
  CREATE INDEX "_info_faq_v_updated_at_idx" ON "_info_faq_v" USING btree ("updated_at");
  CREATE INDEX "_info_faq_v_snapshot_idx" ON "_info_faq_v" USING btree ("snapshot");
  CREATE INDEX "_info_faq_v_published_locale_idx" ON "_info_faq_v" USING btree ("published_locale");
  CREATE INDEX "_info_faq_v_latest_idx" ON "_info_faq_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_info_faq_v_locales_locale_parent_id_unique" ON "_info_faq_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_faq_v_locales_parent_id_idx" ON "_info_faq_v_locales" USING btree ("_parent_id");
  CREATE INDEX "info_about_blocks_text_order_idx" ON "info_about_blocks_text" USING btree ("_order");
  CREATE INDEX "info_about_blocks_text_parent_id_idx" ON "info_about_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "info_about_blocks_text_path_idx" ON "info_about_blocks_text" USING btree ("_path");
  CREATE UNIQUE INDEX "info_about_blocks_text_locales_locale_parent_id_unique" ON "info_about_blocks_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_about_blocks_text_locales_parent_id_idx" ON "info_about_blocks_text_locales" USING btree ("_parent_id");
  CREATE INDEX "info_about_blocks_placeholder_order_idx" ON "info_about_blocks_placeholder" USING btree ("_order");
  CREATE INDEX "info_about_blocks_placeholder_parent_id_idx" ON "info_about_blocks_placeholder" USING btree ("_parent_id");
  CREATE INDEX "info_about_blocks_placeholder_path_idx" ON "info_about_blocks_placeholder" USING btree ("_path");
  CREATE UNIQUE INDEX "info_about_blocks_placeholder_locales_locale_parent_id_uniqu" ON "info_about_blocks_placeholder_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_about_blocks_placeholder_locales_parent_id_idx" ON "info_about_blocks_placeholder_locales" USING btree ("_parent_id");
  CREATE INDEX "info_about_blocks_list_items_order_idx" ON "info_about_blocks_list_items" USING btree ("_order");
  CREATE INDEX "info_about_blocks_list_items_parent_id_idx" ON "info_about_blocks_list_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "info_about_blocks_list_items_locales_locale_parent_id_unique" ON "info_about_blocks_list_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_about_blocks_list_items_locales_parent_id_idx" ON "info_about_blocks_list_items_locales" USING btree ("_parent_id");
  CREATE INDEX "info_about_blocks_list_order_idx" ON "info_about_blocks_list" USING btree ("_order");
  CREATE INDEX "info_about_blocks_list_parent_id_idx" ON "info_about_blocks_list" USING btree ("_parent_id");
  CREATE INDEX "info_about_blocks_list_path_idx" ON "info_about_blocks_list" USING btree ("_path");
  CREATE INDEX "info_about_blocks_link_order_idx" ON "info_about_blocks_link" USING btree ("_order");
  CREATE INDEX "info_about_blocks_link_parent_id_idx" ON "info_about_blocks_link" USING btree ("_parent_id");
  CREATE INDEX "info_about_blocks_link_path_idx" ON "info_about_blocks_link" USING btree ("_path");
  CREATE UNIQUE INDEX "info_about_blocks_link_locales_locale_parent_id_unique" ON "info_about_blocks_link_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_about_blocks_link_locales_parent_id_idx" ON "info_about_blocks_link_locales" USING btree ("_parent_id");
  CREATE INDEX "info_about_blocks_faq_items_order_idx" ON "info_about_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "info_about_blocks_faq_items_parent_id_idx" ON "info_about_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "info_about_blocks_faq_items_locales_locale_parent_id_unique" ON "info_about_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_about_blocks_faq_items_locales_parent_id_idx" ON "info_about_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "info_about_blocks_faq_order_idx" ON "info_about_blocks_faq" USING btree ("_order");
  CREATE INDEX "info_about_blocks_faq_parent_id_idx" ON "info_about_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "info_about_blocks_faq_path_idx" ON "info_about_blocks_faq" USING btree ("_path");
  CREATE INDEX "info_about_blocks_size_table_order_idx" ON "info_about_blocks_size_table" USING btree ("_order");
  CREATE INDEX "info_about_blocks_size_table_parent_id_idx" ON "info_about_blocks_size_table" USING btree ("_parent_id");
  CREATE INDEX "info_about_blocks_size_table_path_idx" ON "info_about_blocks_size_table" USING btree ("_path");
  CREATE INDEX "info_about_blocks_contact_order_idx" ON "info_about_blocks_contact" USING btree ("_order");
  CREATE INDEX "info_about_blocks_contact_parent_id_idx" ON "info_about_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "info_about_blocks_contact_path_idx" ON "info_about_blocks_contact" USING btree ("_path");
  CREATE INDEX "info_about_blocks_journal_order_idx" ON "info_about_blocks_journal" USING btree ("_order");
  CREATE INDEX "info_about_blocks_journal_parent_id_idx" ON "info_about_blocks_journal" USING btree ("_parent_id");
  CREATE INDEX "info_about_blocks_journal_path_idx" ON "info_about_blocks_journal" USING btree ("_path");
  CREATE INDEX "info_about_sections_order_idx" ON "info_about_sections" USING btree ("_order");
  CREATE INDEX "info_about_sections_parent_id_idx" ON "info_about_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "info_about_sections_locales_locale_parent_id_unique" ON "info_about_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_about_sections_locales_parent_id_idx" ON "info_about_sections_locales" USING btree ("_parent_id");
  CREATE INDEX "info_about__status_idx" ON "info_about" USING btree ("_status");
  CREATE UNIQUE INDEX "info_about_locales_locale_parent_id_unique" ON "info_about_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_about_locales_parent_id_idx" ON "info_about_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_about_v_blocks_text_order_idx" ON "_info_about_v_blocks_text" USING btree ("_order");
  CREATE INDEX "_info_about_v_blocks_text_parent_id_idx" ON "_info_about_v_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "_info_about_v_blocks_text_path_idx" ON "_info_about_v_blocks_text" USING btree ("_path");
  CREATE UNIQUE INDEX "_info_about_v_blocks_text_locales_locale_parent_id_unique" ON "_info_about_v_blocks_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_about_v_blocks_text_locales_parent_id_idx" ON "_info_about_v_blocks_text_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_about_v_blocks_placeholder_order_idx" ON "_info_about_v_blocks_placeholder" USING btree ("_order");
  CREATE INDEX "_info_about_v_blocks_placeholder_parent_id_idx" ON "_info_about_v_blocks_placeholder" USING btree ("_parent_id");
  CREATE INDEX "_info_about_v_blocks_placeholder_path_idx" ON "_info_about_v_blocks_placeholder" USING btree ("_path");
  CREATE UNIQUE INDEX "_info_about_v_blocks_placeholder_locales_locale_parent_id_un" ON "_info_about_v_blocks_placeholder_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_about_v_blocks_placeholder_locales_parent_id_idx" ON "_info_about_v_blocks_placeholder_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_about_v_blocks_list_items_order_idx" ON "_info_about_v_blocks_list_items" USING btree ("_order");
  CREATE INDEX "_info_about_v_blocks_list_items_parent_id_idx" ON "_info_about_v_blocks_list_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_info_about_v_blocks_list_items_locales_locale_parent_id_uni" ON "_info_about_v_blocks_list_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_about_v_blocks_list_items_locales_parent_id_idx" ON "_info_about_v_blocks_list_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_about_v_blocks_list_order_idx" ON "_info_about_v_blocks_list" USING btree ("_order");
  CREATE INDEX "_info_about_v_blocks_list_parent_id_idx" ON "_info_about_v_blocks_list" USING btree ("_parent_id");
  CREATE INDEX "_info_about_v_blocks_list_path_idx" ON "_info_about_v_blocks_list" USING btree ("_path");
  CREATE INDEX "_info_about_v_blocks_link_order_idx" ON "_info_about_v_blocks_link" USING btree ("_order");
  CREATE INDEX "_info_about_v_blocks_link_parent_id_idx" ON "_info_about_v_blocks_link" USING btree ("_parent_id");
  CREATE INDEX "_info_about_v_blocks_link_path_idx" ON "_info_about_v_blocks_link" USING btree ("_path");
  CREATE UNIQUE INDEX "_info_about_v_blocks_link_locales_locale_parent_id_unique" ON "_info_about_v_blocks_link_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_about_v_blocks_link_locales_parent_id_idx" ON "_info_about_v_blocks_link_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_about_v_blocks_faq_items_order_idx" ON "_info_about_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_info_about_v_blocks_faq_items_parent_id_idx" ON "_info_about_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_info_about_v_blocks_faq_items_locales_locale_parent_id_uniq" ON "_info_about_v_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_about_v_blocks_faq_items_locales_parent_id_idx" ON "_info_about_v_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_about_v_blocks_faq_order_idx" ON "_info_about_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_info_about_v_blocks_faq_parent_id_idx" ON "_info_about_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_info_about_v_blocks_faq_path_idx" ON "_info_about_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_info_about_v_blocks_size_table_order_idx" ON "_info_about_v_blocks_size_table" USING btree ("_order");
  CREATE INDEX "_info_about_v_blocks_size_table_parent_id_idx" ON "_info_about_v_blocks_size_table" USING btree ("_parent_id");
  CREATE INDEX "_info_about_v_blocks_size_table_path_idx" ON "_info_about_v_blocks_size_table" USING btree ("_path");
  CREATE INDEX "_info_about_v_blocks_contact_order_idx" ON "_info_about_v_blocks_contact" USING btree ("_order");
  CREATE INDEX "_info_about_v_blocks_contact_parent_id_idx" ON "_info_about_v_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "_info_about_v_blocks_contact_path_idx" ON "_info_about_v_blocks_contact" USING btree ("_path");
  CREATE INDEX "_info_about_v_blocks_journal_order_idx" ON "_info_about_v_blocks_journal" USING btree ("_order");
  CREATE INDEX "_info_about_v_blocks_journal_parent_id_idx" ON "_info_about_v_blocks_journal" USING btree ("_parent_id");
  CREATE INDEX "_info_about_v_blocks_journal_path_idx" ON "_info_about_v_blocks_journal" USING btree ("_path");
  CREATE INDEX "_info_about_v_version_sections_order_idx" ON "_info_about_v_version_sections" USING btree ("_order");
  CREATE INDEX "_info_about_v_version_sections_parent_id_idx" ON "_info_about_v_version_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_info_about_v_version_sections_locales_locale_parent_id_uniq" ON "_info_about_v_version_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_about_v_version_sections_locales_parent_id_idx" ON "_info_about_v_version_sections_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_about_v_version_version__status_idx" ON "_info_about_v" USING btree ("version__status");
  CREATE INDEX "_info_about_v_created_at_idx" ON "_info_about_v" USING btree ("created_at");
  CREATE INDEX "_info_about_v_updated_at_idx" ON "_info_about_v" USING btree ("updated_at");
  CREATE INDEX "_info_about_v_snapshot_idx" ON "_info_about_v" USING btree ("snapshot");
  CREATE INDEX "_info_about_v_published_locale_idx" ON "_info_about_v" USING btree ("published_locale");
  CREATE INDEX "_info_about_v_latest_idx" ON "_info_about_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_info_about_v_locales_locale_parent_id_unique" ON "_info_about_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_about_v_locales_parent_id_idx" ON "_info_about_v_locales" USING btree ("_parent_id");
  CREATE INDEX "info_studio_blocks_text_order_idx" ON "info_studio_blocks_text" USING btree ("_order");
  CREATE INDEX "info_studio_blocks_text_parent_id_idx" ON "info_studio_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "info_studio_blocks_text_path_idx" ON "info_studio_blocks_text" USING btree ("_path");
  CREATE UNIQUE INDEX "info_studio_blocks_text_locales_locale_parent_id_unique" ON "info_studio_blocks_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_studio_blocks_text_locales_parent_id_idx" ON "info_studio_blocks_text_locales" USING btree ("_parent_id");
  CREATE INDEX "info_studio_blocks_placeholder_order_idx" ON "info_studio_blocks_placeholder" USING btree ("_order");
  CREATE INDEX "info_studio_blocks_placeholder_parent_id_idx" ON "info_studio_blocks_placeholder" USING btree ("_parent_id");
  CREATE INDEX "info_studio_blocks_placeholder_path_idx" ON "info_studio_blocks_placeholder" USING btree ("_path");
  CREATE UNIQUE INDEX "info_studio_blocks_placeholder_locales_locale_parent_id_uniq" ON "info_studio_blocks_placeholder_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_studio_blocks_placeholder_locales_parent_id_idx" ON "info_studio_blocks_placeholder_locales" USING btree ("_parent_id");
  CREATE INDEX "info_studio_blocks_list_items_order_idx" ON "info_studio_blocks_list_items" USING btree ("_order");
  CREATE INDEX "info_studio_blocks_list_items_parent_id_idx" ON "info_studio_blocks_list_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "info_studio_blocks_list_items_locales_locale_parent_id_uniqu" ON "info_studio_blocks_list_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_studio_blocks_list_items_locales_parent_id_idx" ON "info_studio_blocks_list_items_locales" USING btree ("_parent_id");
  CREATE INDEX "info_studio_blocks_list_order_idx" ON "info_studio_blocks_list" USING btree ("_order");
  CREATE INDEX "info_studio_blocks_list_parent_id_idx" ON "info_studio_blocks_list" USING btree ("_parent_id");
  CREATE INDEX "info_studio_blocks_list_path_idx" ON "info_studio_blocks_list" USING btree ("_path");
  CREATE INDEX "info_studio_blocks_link_order_idx" ON "info_studio_blocks_link" USING btree ("_order");
  CREATE INDEX "info_studio_blocks_link_parent_id_idx" ON "info_studio_blocks_link" USING btree ("_parent_id");
  CREATE INDEX "info_studio_blocks_link_path_idx" ON "info_studio_blocks_link" USING btree ("_path");
  CREATE UNIQUE INDEX "info_studio_blocks_link_locales_locale_parent_id_unique" ON "info_studio_blocks_link_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_studio_blocks_link_locales_parent_id_idx" ON "info_studio_blocks_link_locales" USING btree ("_parent_id");
  CREATE INDEX "info_studio_blocks_faq_items_order_idx" ON "info_studio_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "info_studio_blocks_faq_items_parent_id_idx" ON "info_studio_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "info_studio_blocks_faq_items_locales_locale_parent_id_unique" ON "info_studio_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_studio_blocks_faq_items_locales_parent_id_idx" ON "info_studio_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "info_studio_blocks_faq_order_idx" ON "info_studio_blocks_faq" USING btree ("_order");
  CREATE INDEX "info_studio_blocks_faq_parent_id_idx" ON "info_studio_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "info_studio_blocks_faq_path_idx" ON "info_studio_blocks_faq" USING btree ("_path");
  CREATE INDEX "info_studio_blocks_size_table_order_idx" ON "info_studio_blocks_size_table" USING btree ("_order");
  CREATE INDEX "info_studio_blocks_size_table_parent_id_idx" ON "info_studio_blocks_size_table" USING btree ("_parent_id");
  CREATE INDEX "info_studio_blocks_size_table_path_idx" ON "info_studio_blocks_size_table" USING btree ("_path");
  CREATE INDEX "info_studio_blocks_contact_order_idx" ON "info_studio_blocks_contact" USING btree ("_order");
  CREATE INDEX "info_studio_blocks_contact_parent_id_idx" ON "info_studio_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "info_studio_blocks_contact_path_idx" ON "info_studio_blocks_contact" USING btree ("_path");
  CREATE INDEX "info_studio_blocks_journal_order_idx" ON "info_studio_blocks_journal" USING btree ("_order");
  CREATE INDEX "info_studio_blocks_journal_parent_id_idx" ON "info_studio_blocks_journal" USING btree ("_parent_id");
  CREATE INDEX "info_studio_blocks_journal_path_idx" ON "info_studio_blocks_journal" USING btree ("_path");
  CREATE INDEX "info_studio_sections_order_idx" ON "info_studio_sections" USING btree ("_order");
  CREATE INDEX "info_studio_sections_parent_id_idx" ON "info_studio_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "info_studio_sections_locales_locale_parent_id_unique" ON "info_studio_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_studio_sections_locales_parent_id_idx" ON "info_studio_sections_locales" USING btree ("_parent_id");
  CREATE INDEX "info_studio__status_idx" ON "info_studio" USING btree ("_status");
  CREATE UNIQUE INDEX "info_studio_locales_locale_parent_id_unique" ON "info_studio_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_studio_locales_parent_id_idx" ON "info_studio_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_studio_v_blocks_text_order_idx" ON "_info_studio_v_blocks_text" USING btree ("_order");
  CREATE INDEX "_info_studio_v_blocks_text_parent_id_idx" ON "_info_studio_v_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "_info_studio_v_blocks_text_path_idx" ON "_info_studio_v_blocks_text" USING btree ("_path");
  CREATE UNIQUE INDEX "_info_studio_v_blocks_text_locales_locale_parent_id_unique" ON "_info_studio_v_blocks_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_studio_v_blocks_text_locales_parent_id_idx" ON "_info_studio_v_blocks_text_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_studio_v_blocks_placeholder_order_idx" ON "_info_studio_v_blocks_placeholder" USING btree ("_order");
  CREATE INDEX "_info_studio_v_blocks_placeholder_parent_id_idx" ON "_info_studio_v_blocks_placeholder" USING btree ("_parent_id");
  CREATE INDEX "_info_studio_v_blocks_placeholder_path_idx" ON "_info_studio_v_blocks_placeholder" USING btree ("_path");
  CREATE UNIQUE INDEX "_info_studio_v_blocks_placeholder_locales_locale_parent_id_u" ON "_info_studio_v_blocks_placeholder_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_studio_v_blocks_placeholder_locales_parent_id_idx" ON "_info_studio_v_blocks_placeholder_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_studio_v_blocks_list_items_order_idx" ON "_info_studio_v_blocks_list_items" USING btree ("_order");
  CREATE INDEX "_info_studio_v_blocks_list_items_parent_id_idx" ON "_info_studio_v_blocks_list_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_info_studio_v_blocks_list_items_locales_locale_parent_id_un" ON "_info_studio_v_blocks_list_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_studio_v_blocks_list_items_locales_parent_id_idx" ON "_info_studio_v_blocks_list_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_studio_v_blocks_list_order_idx" ON "_info_studio_v_blocks_list" USING btree ("_order");
  CREATE INDEX "_info_studio_v_blocks_list_parent_id_idx" ON "_info_studio_v_blocks_list" USING btree ("_parent_id");
  CREATE INDEX "_info_studio_v_blocks_list_path_idx" ON "_info_studio_v_blocks_list" USING btree ("_path");
  CREATE INDEX "_info_studio_v_blocks_link_order_idx" ON "_info_studio_v_blocks_link" USING btree ("_order");
  CREATE INDEX "_info_studio_v_blocks_link_parent_id_idx" ON "_info_studio_v_blocks_link" USING btree ("_parent_id");
  CREATE INDEX "_info_studio_v_blocks_link_path_idx" ON "_info_studio_v_blocks_link" USING btree ("_path");
  CREATE UNIQUE INDEX "_info_studio_v_blocks_link_locales_locale_parent_id_unique" ON "_info_studio_v_blocks_link_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_studio_v_blocks_link_locales_parent_id_idx" ON "_info_studio_v_blocks_link_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_studio_v_blocks_faq_items_order_idx" ON "_info_studio_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_info_studio_v_blocks_faq_items_parent_id_idx" ON "_info_studio_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_info_studio_v_blocks_faq_items_locales_locale_parent_id_uni" ON "_info_studio_v_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_studio_v_blocks_faq_items_locales_parent_id_idx" ON "_info_studio_v_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_studio_v_blocks_faq_order_idx" ON "_info_studio_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_info_studio_v_blocks_faq_parent_id_idx" ON "_info_studio_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_info_studio_v_blocks_faq_path_idx" ON "_info_studio_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_info_studio_v_blocks_size_table_order_idx" ON "_info_studio_v_blocks_size_table" USING btree ("_order");
  CREATE INDEX "_info_studio_v_blocks_size_table_parent_id_idx" ON "_info_studio_v_blocks_size_table" USING btree ("_parent_id");
  CREATE INDEX "_info_studio_v_blocks_size_table_path_idx" ON "_info_studio_v_blocks_size_table" USING btree ("_path");
  CREATE INDEX "_info_studio_v_blocks_contact_order_idx" ON "_info_studio_v_blocks_contact" USING btree ("_order");
  CREATE INDEX "_info_studio_v_blocks_contact_parent_id_idx" ON "_info_studio_v_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "_info_studio_v_blocks_contact_path_idx" ON "_info_studio_v_blocks_contact" USING btree ("_path");
  CREATE INDEX "_info_studio_v_blocks_journal_order_idx" ON "_info_studio_v_blocks_journal" USING btree ("_order");
  CREATE INDEX "_info_studio_v_blocks_journal_parent_id_idx" ON "_info_studio_v_blocks_journal" USING btree ("_parent_id");
  CREATE INDEX "_info_studio_v_blocks_journal_path_idx" ON "_info_studio_v_blocks_journal" USING btree ("_path");
  CREATE INDEX "_info_studio_v_version_sections_order_idx" ON "_info_studio_v_version_sections" USING btree ("_order");
  CREATE INDEX "_info_studio_v_version_sections_parent_id_idx" ON "_info_studio_v_version_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_info_studio_v_version_sections_locales_locale_parent_id_uni" ON "_info_studio_v_version_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_studio_v_version_sections_locales_parent_id_idx" ON "_info_studio_v_version_sections_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_studio_v_version_version__status_idx" ON "_info_studio_v" USING btree ("version__status");
  CREATE INDEX "_info_studio_v_created_at_idx" ON "_info_studio_v" USING btree ("created_at");
  CREATE INDEX "_info_studio_v_updated_at_idx" ON "_info_studio_v" USING btree ("updated_at");
  CREATE INDEX "_info_studio_v_snapshot_idx" ON "_info_studio_v" USING btree ("snapshot");
  CREATE INDEX "_info_studio_v_published_locale_idx" ON "_info_studio_v" USING btree ("published_locale");
  CREATE INDEX "_info_studio_v_latest_idx" ON "_info_studio_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_info_studio_v_locales_locale_parent_id_unique" ON "_info_studio_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_studio_v_locales_parent_id_idx" ON "_info_studio_v_locales" USING btree ("_parent_id");
  CREATE INDEX "info_journal_blocks_text_order_idx" ON "info_journal_blocks_text" USING btree ("_order");
  CREATE INDEX "info_journal_blocks_text_parent_id_idx" ON "info_journal_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "info_journal_blocks_text_path_idx" ON "info_journal_blocks_text" USING btree ("_path");
  CREATE UNIQUE INDEX "info_journal_blocks_text_locales_locale_parent_id_unique" ON "info_journal_blocks_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_journal_blocks_text_locales_parent_id_idx" ON "info_journal_blocks_text_locales" USING btree ("_parent_id");
  CREATE INDEX "info_journal_blocks_placeholder_order_idx" ON "info_journal_blocks_placeholder" USING btree ("_order");
  CREATE INDEX "info_journal_blocks_placeholder_parent_id_idx" ON "info_journal_blocks_placeholder" USING btree ("_parent_id");
  CREATE INDEX "info_journal_blocks_placeholder_path_idx" ON "info_journal_blocks_placeholder" USING btree ("_path");
  CREATE UNIQUE INDEX "info_journal_blocks_placeholder_locales_locale_parent_id_uni" ON "info_journal_blocks_placeholder_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_journal_blocks_placeholder_locales_parent_id_idx" ON "info_journal_blocks_placeholder_locales" USING btree ("_parent_id");
  CREATE INDEX "info_journal_blocks_list_items_order_idx" ON "info_journal_blocks_list_items" USING btree ("_order");
  CREATE INDEX "info_journal_blocks_list_items_parent_id_idx" ON "info_journal_blocks_list_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "info_journal_blocks_list_items_locales_locale_parent_id_uniq" ON "info_journal_blocks_list_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_journal_blocks_list_items_locales_parent_id_idx" ON "info_journal_blocks_list_items_locales" USING btree ("_parent_id");
  CREATE INDEX "info_journal_blocks_list_order_idx" ON "info_journal_blocks_list" USING btree ("_order");
  CREATE INDEX "info_journal_blocks_list_parent_id_idx" ON "info_journal_blocks_list" USING btree ("_parent_id");
  CREATE INDEX "info_journal_blocks_list_path_idx" ON "info_journal_blocks_list" USING btree ("_path");
  CREATE INDEX "info_journal_blocks_link_order_idx" ON "info_journal_blocks_link" USING btree ("_order");
  CREATE INDEX "info_journal_blocks_link_parent_id_idx" ON "info_journal_blocks_link" USING btree ("_parent_id");
  CREATE INDEX "info_journal_blocks_link_path_idx" ON "info_journal_blocks_link" USING btree ("_path");
  CREATE UNIQUE INDEX "info_journal_blocks_link_locales_locale_parent_id_unique" ON "info_journal_blocks_link_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_journal_blocks_link_locales_parent_id_idx" ON "info_journal_blocks_link_locales" USING btree ("_parent_id");
  CREATE INDEX "info_journal_blocks_faq_items_order_idx" ON "info_journal_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "info_journal_blocks_faq_items_parent_id_idx" ON "info_journal_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "info_journal_blocks_faq_items_locales_locale_parent_id_uniqu" ON "info_journal_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_journal_blocks_faq_items_locales_parent_id_idx" ON "info_journal_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "info_journal_blocks_faq_order_idx" ON "info_journal_blocks_faq" USING btree ("_order");
  CREATE INDEX "info_journal_blocks_faq_parent_id_idx" ON "info_journal_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "info_journal_blocks_faq_path_idx" ON "info_journal_blocks_faq" USING btree ("_path");
  CREATE INDEX "info_journal_blocks_size_table_order_idx" ON "info_journal_blocks_size_table" USING btree ("_order");
  CREATE INDEX "info_journal_blocks_size_table_parent_id_idx" ON "info_journal_blocks_size_table" USING btree ("_parent_id");
  CREATE INDEX "info_journal_blocks_size_table_path_idx" ON "info_journal_blocks_size_table" USING btree ("_path");
  CREATE INDEX "info_journal_blocks_contact_order_idx" ON "info_journal_blocks_contact" USING btree ("_order");
  CREATE INDEX "info_journal_blocks_contact_parent_id_idx" ON "info_journal_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "info_journal_blocks_contact_path_idx" ON "info_journal_blocks_contact" USING btree ("_path");
  CREATE INDEX "info_journal_blocks_journal_order_idx" ON "info_journal_blocks_journal" USING btree ("_order");
  CREATE INDEX "info_journal_blocks_journal_parent_id_idx" ON "info_journal_blocks_journal" USING btree ("_parent_id");
  CREATE INDEX "info_journal_blocks_journal_path_idx" ON "info_journal_blocks_journal" USING btree ("_path");
  CREATE INDEX "info_journal_sections_order_idx" ON "info_journal_sections" USING btree ("_order");
  CREATE INDEX "info_journal_sections_parent_id_idx" ON "info_journal_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "info_journal_sections_locales_locale_parent_id_unique" ON "info_journal_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_journal_sections_locales_parent_id_idx" ON "info_journal_sections_locales" USING btree ("_parent_id");
  CREATE INDEX "info_journal__status_idx" ON "info_journal" USING btree ("_status");
  CREATE UNIQUE INDEX "info_journal_locales_locale_parent_id_unique" ON "info_journal_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_journal_locales_parent_id_idx" ON "info_journal_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_journal_v_blocks_text_order_idx" ON "_info_journal_v_blocks_text" USING btree ("_order");
  CREATE INDEX "_info_journal_v_blocks_text_parent_id_idx" ON "_info_journal_v_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "_info_journal_v_blocks_text_path_idx" ON "_info_journal_v_blocks_text" USING btree ("_path");
  CREATE UNIQUE INDEX "_info_journal_v_blocks_text_locales_locale_parent_id_unique" ON "_info_journal_v_blocks_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_journal_v_blocks_text_locales_parent_id_idx" ON "_info_journal_v_blocks_text_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_journal_v_blocks_placeholder_order_idx" ON "_info_journal_v_blocks_placeholder" USING btree ("_order");
  CREATE INDEX "_info_journal_v_blocks_placeholder_parent_id_idx" ON "_info_journal_v_blocks_placeholder" USING btree ("_parent_id");
  CREATE INDEX "_info_journal_v_blocks_placeholder_path_idx" ON "_info_journal_v_blocks_placeholder" USING btree ("_path");
  CREATE UNIQUE INDEX "_info_journal_v_blocks_placeholder_locales_locale_parent_id_" ON "_info_journal_v_blocks_placeholder_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_journal_v_blocks_placeholder_locales_parent_id_idx" ON "_info_journal_v_blocks_placeholder_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_journal_v_blocks_list_items_order_idx" ON "_info_journal_v_blocks_list_items" USING btree ("_order");
  CREATE INDEX "_info_journal_v_blocks_list_items_parent_id_idx" ON "_info_journal_v_blocks_list_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_info_journal_v_blocks_list_items_locales_locale_parent_id_u" ON "_info_journal_v_blocks_list_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_journal_v_blocks_list_items_locales_parent_id_idx" ON "_info_journal_v_blocks_list_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_journal_v_blocks_list_order_idx" ON "_info_journal_v_blocks_list" USING btree ("_order");
  CREATE INDEX "_info_journal_v_blocks_list_parent_id_idx" ON "_info_journal_v_blocks_list" USING btree ("_parent_id");
  CREATE INDEX "_info_journal_v_blocks_list_path_idx" ON "_info_journal_v_blocks_list" USING btree ("_path");
  CREATE INDEX "_info_journal_v_blocks_link_order_idx" ON "_info_journal_v_blocks_link" USING btree ("_order");
  CREATE INDEX "_info_journal_v_blocks_link_parent_id_idx" ON "_info_journal_v_blocks_link" USING btree ("_parent_id");
  CREATE INDEX "_info_journal_v_blocks_link_path_idx" ON "_info_journal_v_blocks_link" USING btree ("_path");
  CREATE UNIQUE INDEX "_info_journal_v_blocks_link_locales_locale_parent_id_unique" ON "_info_journal_v_blocks_link_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_journal_v_blocks_link_locales_parent_id_idx" ON "_info_journal_v_blocks_link_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_journal_v_blocks_faq_items_order_idx" ON "_info_journal_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_info_journal_v_blocks_faq_items_parent_id_idx" ON "_info_journal_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_info_journal_v_blocks_faq_items_locales_locale_parent_id_un" ON "_info_journal_v_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_journal_v_blocks_faq_items_locales_parent_id_idx" ON "_info_journal_v_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_journal_v_blocks_faq_order_idx" ON "_info_journal_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_info_journal_v_blocks_faq_parent_id_idx" ON "_info_journal_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_info_journal_v_blocks_faq_path_idx" ON "_info_journal_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_info_journal_v_blocks_size_table_order_idx" ON "_info_journal_v_blocks_size_table" USING btree ("_order");
  CREATE INDEX "_info_journal_v_blocks_size_table_parent_id_idx" ON "_info_journal_v_blocks_size_table" USING btree ("_parent_id");
  CREATE INDEX "_info_journal_v_blocks_size_table_path_idx" ON "_info_journal_v_blocks_size_table" USING btree ("_path");
  CREATE INDEX "_info_journal_v_blocks_contact_order_idx" ON "_info_journal_v_blocks_contact" USING btree ("_order");
  CREATE INDEX "_info_journal_v_blocks_contact_parent_id_idx" ON "_info_journal_v_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "_info_journal_v_blocks_contact_path_idx" ON "_info_journal_v_blocks_contact" USING btree ("_path");
  CREATE INDEX "_info_journal_v_blocks_journal_order_idx" ON "_info_journal_v_blocks_journal" USING btree ("_order");
  CREATE INDEX "_info_journal_v_blocks_journal_parent_id_idx" ON "_info_journal_v_blocks_journal" USING btree ("_parent_id");
  CREATE INDEX "_info_journal_v_blocks_journal_path_idx" ON "_info_journal_v_blocks_journal" USING btree ("_path");
  CREATE INDEX "_info_journal_v_version_sections_order_idx" ON "_info_journal_v_version_sections" USING btree ("_order");
  CREATE INDEX "_info_journal_v_version_sections_parent_id_idx" ON "_info_journal_v_version_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_info_journal_v_version_sections_locales_locale_parent_id_un" ON "_info_journal_v_version_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_journal_v_version_sections_locales_parent_id_idx" ON "_info_journal_v_version_sections_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_journal_v_version_version__status_idx" ON "_info_journal_v" USING btree ("version__status");
  CREATE INDEX "_info_journal_v_created_at_idx" ON "_info_journal_v" USING btree ("created_at");
  CREATE INDEX "_info_journal_v_updated_at_idx" ON "_info_journal_v" USING btree ("updated_at");
  CREATE INDEX "_info_journal_v_snapshot_idx" ON "_info_journal_v" USING btree ("snapshot");
  CREATE INDEX "_info_journal_v_published_locale_idx" ON "_info_journal_v" USING btree ("published_locale");
  CREATE INDEX "_info_journal_v_latest_idx" ON "_info_journal_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_info_journal_v_locales_locale_parent_id_unique" ON "_info_journal_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_journal_v_locales_parent_id_idx" ON "_info_journal_v_locales" USING btree ("_parent_id");
  CREATE INDEX "info_materials_blocks_text_order_idx" ON "info_materials_blocks_text" USING btree ("_order");
  CREATE INDEX "info_materials_blocks_text_parent_id_idx" ON "info_materials_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "info_materials_blocks_text_path_idx" ON "info_materials_blocks_text" USING btree ("_path");
  CREATE UNIQUE INDEX "info_materials_blocks_text_locales_locale_parent_id_unique" ON "info_materials_blocks_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_materials_blocks_text_locales_parent_id_idx" ON "info_materials_blocks_text_locales" USING btree ("_parent_id");
  CREATE INDEX "info_materials_blocks_placeholder_order_idx" ON "info_materials_blocks_placeholder" USING btree ("_order");
  CREATE INDEX "info_materials_blocks_placeholder_parent_id_idx" ON "info_materials_blocks_placeholder" USING btree ("_parent_id");
  CREATE INDEX "info_materials_blocks_placeholder_path_idx" ON "info_materials_blocks_placeholder" USING btree ("_path");
  CREATE UNIQUE INDEX "info_materials_blocks_placeholder_locales_locale_parent_id_u" ON "info_materials_blocks_placeholder_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_materials_blocks_placeholder_locales_parent_id_idx" ON "info_materials_blocks_placeholder_locales" USING btree ("_parent_id");
  CREATE INDEX "info_materials_blocks_list_items_order_idx" ON "info_materials_blocks_list_items" USING btree ("_order");
  CREATE INDEX "info_materials_blocks_list_items_parent_id_idx" ON "info_materials_blocks_list_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "info_materials_blocks_list_items_locales_locale_parent_id_un" ON "info_materials_blocks_list_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_materials_blocks_list_items_locales_parent_id_idx" ON "info_materials_blocks_list_items_locales" USING btree ("_parent_id");
  CREATE INDEX "info_materials_blocks_list_order_idx" ON "info_materials_blocks_list" USING btree ("_order");
  CREATE INDEX "info_materials_blocks_list_parent_id_idx" ON "info_materials_blocks_list" USING btree ("_parent_id");
  CREATE INDEX "info_materials_blocks_list_path_idx" ON "info_materials_blocks_list" USING btree ("_path");
  CREATE INDEX "info_materials_blocks_link_order_idx" ON "info_materials_blocks_link" USING btree ("_order");
  CREATE INDEX "info_materials_blocks_link_parent_id_idx" ON "info_materials_blocks_link" USING btree ("_parent_id");
  CREATE INDEX "info_materials_blocks_link_path_idx" ON "info_materials_blocks_link" USING btree ("_path");
  CREATE UNIQUE INDEX "info_materials_blocks_link_locales_locale_parent_id_unique" ON "info_materials_blocks_link_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_materials_blocks_link_locales_parent_id_idx" ON "info_materials_blocks_link_locales" USING btree ("_parent_id");
  CREATE INDEX "info_materials_blocks_faq_items_order_idx" ON "info_materials_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "info_materials_blocks_faq_items_parent_id_idx" ON "info_materials_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "info_materials_blocks_faq_items_locales_locale_parent_id_uni" ON "info_materials_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_materials_blocks_faq_items_locales_parent_id_idx" ON "info_materials_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "info_materials_blocks_faq_order_idx" ON "info_materials_blocks_faq" USING btree ("_order");
  CREATE INDEX "info_materials_blocks_faq_parent_id_idx" ON "info_materials_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "info_materials_blocks_faq_path_idx" ON "info_materials_blocks_faq" USING btree ("_path");
  CREATE INDEX "info_materials_blocks_size_table_order_idx" ON "info_materials_blocks_size_table" USING btree ("_order");
  CREATE INDEX "info_materials_blocks_size_table_parent_id_idx" ON "info_materials_blocks_size_table" USING btree ("_parent_id");
  CREATE INDEX "info_materials_blocks_size_table_path_idx" ON "info_materials_blocks_size_table" USING btree ("_path");
  CREATE INDEX "info_materials_blocks_contact_order_idx" ON "info_materials_blocks_contact" USING btree ("_order");
  CREATE INDEX "info_materials_blocks_contact_parent_id_idx" ON "info_materials_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "info_materials_blocks_contact_path_idx" ON "info_materials_blocks_contact" USING btree ("_path");
  CREATE INDEX "info_materials_blocks_journal_order_idx" ON "info_materials_blocks_journal" USING btree ("_order");
  CREATE INDEX "info_materials_blocks_journal_parent_id_idx" ON "info_materials_blocks_journal" USING btree ("_parent_id");
  CREATE INDEX "info_materials_blocks_journal_path_idx" ON "info_materials_blocks_journal" USING btree ("_path");
  CREATE INDEX "info_materials_sections_order_idx" ON "info_materials_sections" USING btree ("_order");
  CREATE INDEX "info_materials_sections_parent_id_idx" ON "info_materials_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "info_materials_sections_locales_locale_parent_id_unique" ON "info_materials_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_materials_sections_locales_parent_id_idx" ON "info_materials_sections_locales" USING btree ("_parent_id");
  CREATE INDEX "info_materials__status_idx" ON "info_materials" USING btree ("_status");
  CREATE UNIQUE INDEX "info_materials_locales_locale_parent_id_unique" ON "info_materials_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_materials_locales_parent_id_idx" ON "info_materials_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_materials_v_blocks_text_order_idx" ON "_info_materials_v_blocks_text" USING btree ("_order");
  CREATE INDEX "_info_materials_v_blocks_text_parent_id_idx" ON "_info_materials_v_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "_info_materials_v_blocks_text_path_idx" ON "_info_materials_v_blocks_text" USING btree ("_path");
  CREATE UNIQUE INDEX "_info_materials_v_blocks_text_locales_locale_parent_id_uniqu" ON "_info_materials_v_blocks_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_materials_v_blocks_text_locales_parent_id_idx" ON "_info_materials_v_blocks_text_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_materials_v_blocks_placeholder_order_idx" ON "_info_materials_v_blocks_placeholder" USING btree ("_order");
  CREATE INDEX "_info_materials_v_blocks_placeholder_parent_id_idx" ON "_info_materials_v_blocks_placeholder" USING btree ("_parent_id");
  CREATE INDEX "_info_materials_v_blocks_placeholder_path_idx" ON "_info_materials_v_blocks_placeholder" USING btree ("_path");
  CREATE UNIQUE INDEX "_info_materials_v_blocks_placeholder_locales_locale_parent_i" ON "_info_materials_v_blocks_placeholder_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_materials_v_blocks_placeholder_locales_parent_id_idx" ON "_info_materials_v_blocks_placeholder_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_materials_v_blocks_list_items_order_idx" ON "_info_materials_v_blocks_list_items" USING btree ("_order");
  CREATE INDEX "_info_materials_v_blocks_list_items_parent_id_idx" ON "_info_materials_v_blocks_list_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_info_materials_v_blocks_list_items_locales_locale_parent_id" ON "_info_materials_v_blocks_list_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_materials_v_blocks_list_items_locales_parent_id_idx" ON "_info_materials_v_blocks_list_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_materials_v_blocks_list_order_idx" ON "_info_materials_v_blocks_list" USING btree ("_order");
  CREATE INDEX "_info_materials_v_blocks_list_parent_id_idx" ON "_info_materials_v_blocks_list" USING btree ("_parent_id");
  CREATE INDEX "_info_materials_v_blocks_list_path_idx" ON "_info_materials_v_blocks_list" USING btree ("_path");
  CREATE INDEX "_info_materials_v_blocks_link_order_idx" ON "_info_materials_v_blocks_link" USING btree ("_order");
  CREATE INDEX "_info_materials_v_blocks_link_parent_id_idx" ON "_info_materials_v_blocks_link" USING btree ("_parent_id");
  CREATE INDEX "_info_materials_v_blocks_link_path_idx" ON "_info_materials_v_blocks_link" USING btree ("_path");
  CREATE UNIQUE INDEX "_info_materials_v_blocks_link_locales_locale_parent_id_uniqu" ON "_info_materials_v_blocks_link_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_materials_v_blocks_link_locales_parent_id_idx" ON "_info_materials_v_blocks_link_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_materials_v_blocks_faq_items_order_idx" ON "_info_materials_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_info_materials_v_blocks_faq_items_parent_id_idx" ON "_info_materials_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_info_materials_v_blocks_faq_items_locales_locale_parent_id_" ON "_info_materials_v_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_materials_v_blocks_faq_items_locales_parent_id_idx" ON "_info_materials_v_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_materials_v_blocks_faq_order_idx" ON "_info_materials_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_info_materials_v_blocks_faq_parent_id_idx" ON "_info_materials_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_info_materials_v_blocks_faq_path_idx" ON "_info_materials_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_info_materials_v_blocks_size_table_order_idx" ON "_info_materials_v_blocks_size_table" USING btree ("_order");
  CREATE INDEX "_info_materials_v_blocks_size_table_parent_id_idx" ON "_info_materials_v_blocks_size_table" USING btree ("_parent_id");
  CREATE INDEX "_info_materials_v_blocks_size_table_path_idx" ON "_info_materials_v_blocks_size_table" USING btree ("_path");
  CREATE INDEX "_info_materials_v_blocks_contact_order_idx" ON "_info_materials_v_blocks_contact" USING btree ("_order");
  CREATE INDEX "_info_materials_v_blocks_contact_parent_id_idx" ON "_info_materials_v_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "_info_materials_v_blocks_contact_path_idx" ON "_info_materials_v_blocks_contact" USING btree ("_path");
  CREATE INDEX "_info_materials_v_blocks_journal_order_idx" ON "_info_materials_v_blocks_journal" USING btree ("_order");
  CREATE INDEX "_info_materials_v_blocks_journal_parent_id_idx" ON "_info_materials_v_blocks_journal" USING btree ("_parent_id");
  CREATE INDEX "_info_materials_v_blocks_journal_path_idx" ON "_info_materials_v_blocks_journal" USING btree ("_path");
  CREATE INDEX "_info_materials_v_version_sections_order_idx" ON "_info_materials_v_version_sections" USING btree ("_order");
  CREATE INDEX "_info_materials_v_version_sections_parent_id_idx" ON "_info_materials_v_version_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_info_materials_v_version_sections_locales_locale_parent_id_" ON "_info_materials_v_version_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_materials_v_version_sections_locales_parent_id_idx" ON "_info_materials_v_version_sections_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_materials_v_version_version__status_idx" ON "_info_materials_v" USING btree ("version__status");
  CREATE INDEX "_info_materials_v_created_at_idx" ON "_info_materials_v" USING btree ("created_at");
  CREATE INDEX "_info_materials_v_updated_at_idx" ON "_info_materials_v" USING btree ("updated_at");
  CREATE INDEX "_info_materials_v_snapshot_idx" ON "_info_materials_v" USING btree ("snapshot");
  CREATE INDEX "_info_materials_v_published_locale_idx" ON "_info_materials_v" USING btree ("published_locale");
  CREATE INDEX "_info_materials_v_latest_idx" ON "_info_materials_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_info_materials_v_locales_locale_parent_id_unique" ON "_info_materials_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_materials_v_locales_parent_id_idx" ON "_info_materials_v_locales" USING btree ("_parent_id");
  CREATE INDEX "info_careers_blocks_text_order_idx" ON "info_careers_blocks_text" USING btree ("_order");
  CREATE INDEX "info_careers_blocks_text_parent_id_idx" ON "info_careers_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "info_careers_blocks_text_path_idx" ON "info_careers_blocks_text" USING btree ("_path");
  CREATE UNIQUE INDEX "info_careers_blocks_text_locales_locale_parent_id_unique" ON "info_careers_blocks_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_careers_blocks_text_locales_parent_id_idx" ON "info_careers_blocks_text_locales" USING btree ("_parent_id");
  CREATE INDEX "info_careers_blocks_placeholder_order_idx" ON "info_careers_blocks_placeholder" USING btree ("_order");
  CREATE INDEX "info_careers_blocks_placeholder_parent_id_idx" ON "info_careers_blocks_placeholder" USING btree ("_parent_id");
  CREATE INDEX "info_careers_blocks_placeholder_path_idx" ON "info_careers_blocks_placeholder" USING btree ("_path");
  CREATE UNIQUE INDEX "info_careers_blocks_placeholder_locales_locale_parent_id_uni" ON "info_careers_blocks_placeholder_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_careers_blocks_placeholder_locales_parent_id_idx" ON "info_careers_blocks_placeholder_locales" USING btree ("_parent_id");
  CREATE INDEX "info_careers_blocks_list_items_order_idx" ON "info_careers_blocks_list_items" USING btree ("_order");
  CREATE INDEX "info_careers_blocks_list_items_parent_id_idx" ON "info_careers_blocks_list_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "info_careers_blocks_list_items_locales_locale_parent_id_uniq" ON "info_careers_blocks_list_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_careers_blocks_list_items_locales_parent_id_idx" ON "info_careers_blocks_list_items_locales" USING btree ("_parent_id");
  CREATE INDEX "info_careers_blocks_list_order_idx" ON "info_careers_blocks_list" USING btree ("_order");
  CREATE INDEX "info_careers_blocks_list_parent_id_idx" ON "info_careers_blocks_list" USING btree ("_parent_id");
  CREATE INDEX "info_careers_blocks_list_path_idx" ON "info_careers_blocks_list" USING btree ("_path");
  CREATE INDEX "info_careers_blocks_link_order_idx" ON "info_careers_blocks_link" USING btree ("_order");
  CREATE INDEX "info_careers_blocks_link_parent_id_idx" ON "info_careers_blocks_link" USING btree ("_parent_id");
  CREATE INDEX "info_careers_blocks_link_path_idx" ON "info_careers_blocks_link" USING btree ("_path");
  CREATE UNIQUE INDEX "info_careers_blocks_link_locales_locale_parent_id_unique" ON "info_careers_blocks_link_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_careers_blocks_link_locales_parent_id_idx" ON "info_careers_blocks_link_locales" USING btree ("_parent_id");
  CREATE INDEX "info_careers_blocks_faq_items_order_idx" ON "info_careers_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "info_careers_blocks_faq_items_parent_id_idx" ON "info_careers_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "info_careers_blocks_faq_items_locales_locale_parent_id_uniqu" ON "info_careers_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_careers_blocks_faq_items_locales_parent_id_idx" ON "info_careers_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "info_careers_blocks_faq_order_idx" ON "info_careers_blocks_faq" USING btree ("_order");
  CREATE INDEX "info_careers_blocks_faq_parent_id_idx" ON "info_careers_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "info_careers_blocks_faq_path_idx" ON "info_careers_blocks_faq" USING btree ("_path");
  CREATE INDEX "info_careers_blocks_size_table_order_idx" ON "info_careers_blocks_size_table" USING btree ("_order");
  CREATE INDEX "info_careers_blocks_size_table_parent_id_idx" ON "info_careers_blocks_size_table" USING btree ("_parent_id");
  CREATE INDEX "info_careers_blocks_size_table_path_idx" ON "info_careers_blocks_size_table" USING btree ("_path");
  CREATE INDEX "info_careers_blocks_contact_order_idx" ON "info_careers_blocks_contact" USING btree ("_order");
  CREATE INDEX "info_careers_blocks_contact_parent_id_idx" ON "info_careers_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "info_careers_blocks_contact_path_idx" ON "info_careers_blocks_contact" USING btree ("_path");
  CREATE INDEX "info_careers_blocks_journal_order_idx" ON "info_careers_blocks_journal" USING btree ("_order");
  CREATE INDEX "info_careers_blocks_journal_parent_id_idx" ON "info_careers_blocks_journal" USING btree ("_parent_id");
  CREATE INDEX "info_careers_blocks_journal_path_idx" ON "info_careers_blocks_journal" USING btree ("_path");
  CREATE INDEX "info_careers_sections_order_idx" ON "info_careers_sections" USING btree ("_order");
  CREATE INDEX "info_careers_sections_parent_id_idx" ON "info_careers_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "info_careers_sections_locales_locale_parent_id_unique" ON "info_careers_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_careers_sections_locales_parent_id_idx" ON "info_careers_sections_locales" USING btree ("_parent_id");
  CREATE INDEX "info_careers__status_idx" ON "info_careers" USING btree ("_status");
  CREATE UNIQUE INDEX "info_careers_locales_locale_parent_id_unique" ON "info_careers_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "info_careers_locales_parent_id_idx" ON "info_careers_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_careers_v_blocks_text_order_idx" ON "_info_careers_v_blocks_text" USING btree ("_order");
  CREATE INDEX "_info_careers_v_blocks_text_parent_id_idx" ON "_info_careers_v_blocks_text" USING btree ("_parent_id");
  CREATE INDEX "_info_careers_v_blocks_text_path_idx" ON "_info_careers_v_blocks_text" USING btree ("_path");
  CREATE UNIQUE INDEX "_info_careers_v_blocks_text_locales_locale_parent_id_unique" ON "_info_careers_v_blocks_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_careers_v_blocks_text_locales_parent_id_idx" ON "_info_careers_v_blocks_text_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_careers_v_blocks_placeholder_order_idx" ON "_info_careers_v_blocks_placeholder" USING btree ("_order");
  CREATE INDEX "_info_careers_v_blocks_placeholder_parent_id_idx" ON "_info_careers_v_blocks_placeholder" USING btree ("_parent_id");
  CREATE INDEX "_info_careers_v_blocks_placeholder_path_idx" ON "_info_careers_v_blocks_placeholder" USING btree ("_path");
  CREATE UNIQUE INDEX "_info_careers_v_blocks_placeholder_locales_locale_parent_id_" ON "_info_careers_v_blocks_placeholder_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_careers_v_blocks_placeholder_locales_parent_id_idx" ON "_info_careers_v_blocks_placeholder_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_careers_v_blocks_list_items_order_idx" ON "_info_careers_v_blocks_list_items" USING btree ("_order");
  CREATE INDEX "_info_careers_v_blocks_list_items_parent_id_idx" ON "_info_careers_v_blocks_list_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_info_careers_v_blocks_list_items_locales_locale_parent_id_u" ON "_info_careers_v_blocks_list_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_careers_v_blocks_list_items_locales_parent_id_idx" ON "_info_careers_v_blocks_list_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_careers_v_blocks_list_order_idx" ON "_info_careers_v_blocks_list" USING btree ("_order");
  CREATE INDEX "_info_careers_v_blocks_list_parent_id_idx" ON "_info_careers_v_blocks_list" USING btree ("_parent_id");
  CREATE INDEX "_info_careers_v_blocks_list_path_idx" ON "_info_careers_v_blocks_list" USING btree ("_path");
  CREATE INDEX "_info_careers_v_blocks_link_order_idx" ON "_info_careers_v_blocks_link" USING btree ("_order");
  CREATE INDEX "_info_careers_v_blocks_link_parent_id_idx" ON "_info_careers_v_blocks_link" USING btree ("_parent_id");
  CREATE INDEX "_info_careers_v_blocks_link_path_idx" ON "_info_careers_v_blocks_link" USING btree ("_path");
  CREATE UNIQUE INDEX "_info_careers_v_blocks_link_locales_locale_parent_id_unique" ON "_info_careers_v_blocks_link_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_careers_v_blocks_link_locales_parent_id_idx" ON "_info_careers_v_blocks_link_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_careers_v_blocks_faq_items_order_idx" ON "_info_careers_v_blocks_faq_items" USING btree ("_order");
  CREATE INDEX "_info_careers_v_blocks_faq_items_parent_id_idx" ON "_info_careers_v_blocks_faq_items" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_info_careers_v_blocks_faq_items_locales_locale_parent_id_un" ON "_info_careers_v_blocks_faq_items_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_careers_v_blocks_faq_items_locales_parent_id_idx" ON "_info_careers_v_blocks_faq_items_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_careers_v_blocks_faq_order_idx" ON "_info_careers_v_blocks_faq" USING btree ("_order");
  CREATE INDEX "_info_careers_v_blocks_faq_parent_id_idx" ON "_info_careers_v_blocks_faq" USING btree ("_parent_id");
  CREATE INDEX "_info_careers_v_blocks_faq_path_idx" ON "_info_careers_v_blocks_faq" USING btree ("_path");
  CREATE INDEX "_info_careers_v_blocks_size_table_order_idx" ON "_info_careers_v_blocks_size_table" USING btree ("_order");
  CREATE INDEX "_info_careers_v_blocks_size_table_parent_id_idx" ON "_info_careers_v_blocks_size_table" USING btree ("_parent_id");
  CREATE INDEX "_info_careers_v_blocks_size_table_path_idx" ON "_info_careers_v_blocks_size_table" USING btree ("_path");
  CREATE INDEX "_info_careers_v_blocks_contact_order_idx" ON "_info_careers_v_blocks_contact" USING btree ("_order");
  CREATE INDEX "_info_careers_v_blocks_contact_parent_id_idx" ON "_info_careers_v_blocks_contact" USING btree ("_parent_id");
  CREATE INDEX "_info_careers_v_blocks_contact_path_idx" ON "_info_careers_v_blocks_contact" USING btree ("_path");
  CREATE INDEX "_info_careers_v_blocks_journal_order_idx" ON "_info_careers_v_blocks_journal" USING btree ("_order");
  CREATE INDEX "_info_careers_v_blocks_journal_parent_id_idx" ON "_info_careers_v_blocks_journal" USING btree ("_parent_id");
  CREATE INDEX "_info_careers_v_blocks_journal_path_idx" ON "_info_careers_v_blocks_journal" USING btree ("_path");
  CREATE INDEX "_info_careers_v_version_sections_order_idx" ON "_info_careers_v_version_sections" USING btree ("_order");
  CREATE INDEX "_info_careers_v_version_sections_parent_id_idx" ON "_info_careers_v_version_sections" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "_info_careers_v_version_sections_locales_locale_parent_id_un" ON "_info_careers_v_version_sections_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_careers_v_version_sections_locales_parent_id_idx" ON "_info_careers_v_version_sections_locales" USING btree ("_parent_id");
  CREATE INDEX "_info_careers_v_version_version__status_idx" ON "_info_careers_v" USING btree ("version__status");
  CREATE INDEX "_info_careers_v_created_at_idx" ON "_info_careers_v" USING btree ("created_at");
  CREATE INDEX "_info_careers_v_updated_at_idx" ON "_info_careers_v" USING btree ("updated_at");
  CREATE INDEX "_info_careers_v_snapshot_idx" ON "_info_careers_v" USING btree ("snapshot");
  CREATE INDEX "_info_careers_v_published_locale_idx" ON "_info_careers_v" USING btree ("published_locale");
  CREATE INDEX "_info_careers_v_latest_idx" ON "_info_careers_v" USING btree ("latest");
  CREATE UNIQUE INDEX "_info_careers_v_locales_locale_parent_id_unique" ON "_info_careers_v_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "_info_careers_v_locales_parent_id_idx" ON "_info_careers_v_locales" USING btree ("_parent_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "info_shipping_blocks_text" CASCADE;
  DROP TABLE "info_shipping_blocks_text_locales" CASCADE;
  DROP TABLE "info_shipping_blocks_placeholder" CASCADE;
  DROP TABLE "info_shipping_blocks_placeholder_locales" CASCADE;
  DROP TABLE "info_shipping_blocks_list_items" CASCADE;
  DROP TABLE "info_shipping_blocks_list_items_locales" CASCADE;
  DROP TABLE "info_shipping_blocks_list" CASCADE;
  DROP TABLE "info_shipping_blocks_link" CASCADE;
  DROP TABLE "info_shipping_blocks_link_locales" CASCADE;
  DROP TABLE "info_shipping_blocks_faq_items" CASCADE;
  DROP TABLE "info_shipping_blocks_faq_items_locales" CASCADE;
  DROP TABLE "info_shipping_blocks_faq" CASCADE;
  DROP TABLE "info_shipping_blocks_size_table" CASCADE;
  DROP TABLE "info_shipping_blocks_contact" CASCADE;
  DROP TABLE "info_shipping_blocks_journal" CASCADE;
  DROP TABLE "info_shipping_sections" CASCADE;
  DROP TABLE "info_shipping_sections_locales" CASCADE;
  DROP TABLE "info_shipping" CASCADE;
  DROP TABLE "info_shipping_locales" CASCADE;
  DROP TABLE "_info_shipping_v_blocks_text" CASCADE;
  DROP TABLE "_info_shipping_v_blocks_text_locales" CASCADE;
  DROP TABLE "_info_shipping_v_blocks_placeholder" CASCADE;
  DROP TABLE "_info_shipping_v_blocks_placeholder_locales" CASCADE;
  DROP TABLE "_info_shipping_v_blocks_list_items" CASCADE;
  DROP TABLE "_info_shipping_v_blocks_list_items_locales" CASCADE;
  DROP TABLE "_info_shipping_v_blocks_list" CASCADE;
  DROP TABLE "_info_shipping_v_blocks_link" CASCADE;
  DROP TABLE "_info_shipping_v_blocks_link_locales" CASCADE;
  DROP TABLE "_info_shipping_v_blocks_faq_items" CASCADE;
  DROP TABLE "_info_shipping_v_blocks_faq_items_locales" CASCADE;
  DROP TABLE "_info_shipping_v_blocks_faq" CASCADE;
  DROP TABLE "_info_shipping_v_blocks_size_table" CASCADE;
  DROP TABLE "_info_shipping_v_blocks_contact" CASCADE;
  DROP TABLE "_info_shipping_v_blocks_journal" CASCADE;
  DROP TABLE "_info_shipping_v_version_sections" CASCADE;
  DROP TABLE "_info_shipping_v_version_sections_locales" CASCADE;
  DROP TABLE "_info_shipping_v" CASCADE;
  DROP TABLE "_info_shipping_v_locales" CASCADE;
  DROP TABLE "info_returns_blocks_text" CASCADE;
  DROP TABLE "info_returns_blocks_text_locales" CASCADE;
  DROP TABLE "info_returns_blocks_placeholder" CASCADE;
  DROP TABLE "info_returns_blocks_placeholder_locales" CASCADE;
  DROP TABLE "info_returns_blocks_list_items" CASCADE;
  DROP TABLE "info_returns_blocks_list_items_locales" CASCADE;
  DROP TABLE "info_returns_blocks_list" CASCADE;
  DROP TABLE "info_returns_blocks_link" CASCADE;
  DROP TABLE "info_returns_blocks_link_locales" CASCADE;
  DROP TABLE "info_returns_blocks_faq_items" CASCADE;
  DROP TABLE "info_returns_blocks_faq_items_locales" CASCADE;
  DROP TABLE "info_returns_blocks_faq" CASCADE;
  DROP TABLE "info_returns_blocks_size_table" CASCADE;
  DROP TABLE "info_returns_blocks_contact" CASCADE;
  DROP TABLE "info_returns_blocks_journal" CASCADE;
  DROP TABLE "info_returns_sections" CASCADE;
  DROP TABLE "info_returns_sections_locales" CASCADE;
  DROP TABLE "info_returns" CASCADE;
  DROP TABLE "info_returns_locales" CASCADE;
  DROP TABLE "_info_returns_v_blocks_text" CASCADE;
  DROP TABLE "_info_returns_v_blocks_text_locales" CASCADE;
  DROP TABLE "_info_returns_v_blocks_placeholder" CASCADE;
  DROP TABLE "_info_returns_v_blocks_placeholder_locales" CASCADE;
  DROP TABLE "_info_returns_v_blocks_list_items" CASCADE;
  DROP TABLE "_info_returns_v_blocks_list_items_locales" CASCADE;
  DROP TABLE "_info_returns_v_blocks_list" CASCADE;
  DROP TABLE "_info_returns_v_blocks_link" CASCADE;
  DROP TABLE "_info_returns_v_blocks_link_locales" CASCADE;
  DROP TABLE "_info_returns_v_blocks_faq_items" CASCADE;
  DROP TABLE "_info_returns_v_blocks_faq_items_locales" CASCADE;
  DROP TABLE "_info_returns_v_blocks_faq" CASCADE;
  DROP TABLE "_info_returns_v_blocks_size_table" CASCADE;
  DROP TABLE "_info_returns_v_blocks_contact" CASCADE;
  DROP TABLE "_info_returns_v_blocks_journal" CASCADE;
  DROP TABLE "_info_returns_v_version_sections" CASCADE;
  DROP TABLE "_info_returns_v_version_sections_locales" CASCADE;
  DROP TABLE "_info_returns_v" CASCADE;
  DROP TABLE "_info_returns_v_locales" CASCADE;
  DROP TABLE "info_size_guide_blocks_text" CASCADE;
  DROP TABLE "info_size_guide_blocks_text_locales" CASCADE;
  DROP TABLE "info_size_guide_blocks_placeholder" CASCADE;
  DROP TABLE "info_size_guide_blocks_placeholder_locales" CASCADE;
  DROP TABLE "info_size_guide_blocks_list_items" CASCADE;
  DROP TABLE "info_size_guide_blocks_list_items_locales" CASCADE;
  DROP TABLE "info_size_guide_blocks_list" CASCADE;
  DROP TABLE "info_size_guide_blocks_link" CASCADE;
  DROP TABLE "info_size_guide_blocks_link_locales" CASCADE;
  DROP TABLE "info_size_guide_blocks_faq_items" CASCADE;
  DROP TABLE "info_size_guide_blocks_faq_items_locales" CASCADE;
  DROP TABLE "info_size_guide_blocks_faq" CASCADE;
  DROP TABLE "info_size_guide_blocks_size_table" CASCADE;
  DROP TABLE "info_size_guide_blocks_contact" CASCADE;
  DROP TABLE "info_size_guide_blocks_journal" CASCADE;
  DROP TABLE "info_size_guide_sections" CASCADE;
  DROP TABLE "info_size_guide_sections_locales" CASCADE;
  DROP TABLE "info_size_guide" CASCADE;
  DROP TABLE "info_size_guide_locales" CASCADE;
  DROP TABLE "_info_size_guide_v_blocks_text" CASCADE;
  DROP TABLE "_info_size_guide_v_blocks_text_locales" CASCADE;
  DROP TABLE "_info_size_guide_v_blocks_placeholder" CASCADE;
  DROP TABLE "_info_size_guide_v_blocks_placeholder_locales" CASCADE;
  DROP TABLE "_info_size_guide_v_blocks_list_items" CASCADE;
  DROP TABLE "_info_size_guide_v_blocks_list_items_locales" CASCADE;
  DROP TABLE "_info_size_guide_v_blocks_list" CASCADE;
  DROP TABLE "_info_size_guide_v_blocks_link" CASCADE;
  DROP TABLE "_info_size_guide_v_blocks_link_locales" CASCADE;
  DROP TABLE "_info_size_guide_v_blocks_faq_items" CASCADE;
  DROP TABLE "_info_size_guide_v_blocks_faq_items_locales" CASCADE;
  DROP TABLE "_info_size_guide_v_blocks_faq" CASCADE;
  DROP TABLE "_info_size_guide_v_blocks_size_table" CASCADE;
  DROP TABLE "_info_size_guide_v_blocks_contact" CASCADE;
  DROP TABLE "_info_size_guide_v_blocks_journal" CASCADE;
  DROP TABLE "_info_size_guide_v_version_sections" CASCADE;
  DROP TABLE "_info_size_guide_v_version_sections_locales" CASCADE;
  DROP TABLE "_info_size_guide_v" CASCADE;
  DROP TABLE "_info_size_guide_v_locales" CASCADE;
  DROP TABLE "info_track_order_blocks_text" CASCADE;
  DROP TABLE "info_track_order_blocks_text_locales" CASCADE;
  DROP TABLE "info_track_order_blocks_placeholder" CASCADE;
  DROP TABLE "info_track_order_blocks_placeholder_locales" CASCADE;
  DROP TABLE "info_track_order_blocks_list_items" CASCADE;
  DROP TABLE "info_track_order_blocks_list_items_locales" CASCADE;
  DROP TABLE "info_track_order_blocks_list" CASCADE;
  DROP TABLE "info_track_order_blocks_link" CASCADE;
  DROP TABLE "info_track_order_blocks_link_locales" CASCADE;
  DROP TABLE "info_track_order_blocks_faq_items" CASCADE;
  DROP TABLE "info_track_order_blocks_faq_items_locales" CASCADE;
  DROP TABLE "info_track_order_blocks_faq" CASCADE;
  DROP TABLE "info_track_order_blocks_size_table" CASCADE;
  DROP TABLE "info_track_order_blocks_contact" CASCADE;
  DROP TABLE "info_track_order_blocks_journal" CASCADE;
  DROP TABLE "info_track_order_sections" CASCADE;
  DROP TABLE "info_track_order_sections_locales" CASCADE;
  DROP TABLE "info_track_order" CASCADE;
  DROP TABLE "info_track_order_locales" CASCADE;
  DROP TABLE "_info_track_order_v_blocks_text" CASCADE;
  DROP TABLE "_info_track_order_v_blocks_text_locales" CASCADE;
  DROP TABLE "_info_track_order_v_blocks_placeholder" CASCADE;
  DROP TABLE "_info_track_order_v_blocks_placeholder_locales" CASCADE;
  DROP TABLE "_info_track_order_v_blocks_list_items" CASCADE;
  DROP TABLE "_info_track_order_v_blocks_list_items_locales" CASCADE;
  DROP TABLE "_info_track_order_v_blocks_list" CASCADE;
  DROP TABLE "_info_track_order_v_blocks_link" CASCADE;
  DROP TABLE "_info_track_order_v_blocks_link_locales" CASCADE;
  DROP TABLE "_info_track_order_v_blocks_faq_items" CASCADE;
  DROP TABLE "_info_track_order_v_blocks_faq_items_locales" CASCADE;
  DROP TABLE "_info_track_order_v_blocks_faq" CASCADE;
  DROP TABLE "_info_track_order_v_blocks_size_table" CASCADE;
  DROP TABLE "_info_track_order_v_blocks_contact" CASCADE;
  DROP TABLE "_info_track_order_v_blocks_journal" CASCADE;
  DROP TABLE "_info_track_order_v_version_sections" CASCADE;
  DROP TABLE "_info_track_order_v_version_sections_locales" CASCADE;
  DROP TABLE "_info_track_order_v" CASCADE;
  DROP TABLE "_info_track_order_v_locales" CASCADE;
  DROP TABLE "info_faq_blocks_text" CASCADE;
  DROP TABLE "info_faq_blocks_text_locales" CASCADE;
  DROP TABLE "info_faq_blocks_placeholder" CASCADE;
  DROP TABLE "info_faq_blocks_placeholder_locales" CASCADE;
  DROP TABLE "info_faq_blocks_list_items" CASCADE;
  DROP TABLE "info_faq_blocks_list_items_locales" CASCADE;
  DROP TABLE "info_faq_blocks_list" CASCADE;
  DROP TABLE "info_faq_blocks_link" CASCADE;
  DROP TABLE "info_faq_blocks_link_locales" CASCADE;
  DROP TABLE "info_faq_blocks_faq_items" CASCADE;
  DROP TABLE "info_faq_blocks_faq_items_locales" CASCADE;
  DROP TABLE "info_faq_blocks_faq" CASCADE;
  DROP TABLE "info_faq_blocks_size_table" CASCADE;
  DROP TABLE "info_faq_blocks_contact" CASCADE;
  DROP TABLE "info_faq_blocks_journal" CASCADE;
  DROP TABLE "info_faq_sections" CASCADE;
  DROP TABLE "info_faq_sections_locales" CASCADE;
  DROP TABLE "info_faq" CASCADE;
  DROP TABLE "info_faq_locales" CASCADE;
  DROP TABLE "_info_faq_v_blocks_text" CASCADE;
  DROP TABLE "_info_faq_v_blocks_text_locales" CASCADE;
  DROP TABLE "_info_faq_v_blocks_placeholder" CASCADE;
  DROP TABLE "_info_faq_v_blocks_placeholder_locales" CASCADE;
  DROP TABLE "_info_faq_v_blocks_list_items" CASCADE;
  DROP TABLE "_info_faq_v_blocks_list_items_locales" CASCADE;
  DROP TABLE "_info_faq_v_blocks_list" CASCADE;
  DROP TABLE "_info_faq_v_blocks_link" CASCADE;
  DROP TABLE "_info_faq_v_blocks_link_locales" CASCADE;
  DROP TABLE "_info_faq_v_blocks_faq_items" CASCADE;
  DROP TABLE "_info_faq_v_blocks_faq_items_locales" CASCADE;
  DROP TABLE "_info_faq_v_blocks_faq" CASCADE;
  DROP TABLE "_info_faq_v_blocks_size_table" CASCADE;
  DROP TABLE "_info_faq_v_blocks_contact" CASCADE;
  DROP TABLE "_info_faq_v_blocks_journal" CASCADE;
  DROP TABLE "_info_faq_v_version_sections" CASCADE;
  DROP TABLE "_info_faq_v_version_sections_locales" CASCADE;
  DROP TABLE "_info_faq_v" CASCADE;
  DROP TABLE "_info_faq_v_locales" CASCADE;
  DROP TABLE "info_about_blocks_text" CASCADE;
  DROP TABLE "info_about_blocks_text_locales" CASCADE;
  DROP TABLE "info_about_blocks_placeholder" CASCADE;
  DROP TABLE "info_about_blocks_placeholder_locales" CASCADE;
  DROP TABLE "info_about_blocks_list_items" CASCADE;
  DROP TABLE "info_about_blocks_list_items_locales" CASCADE;
  DROP TABLE "info_about_blocks_list" CASCADE;
  DROP TABLE "info_about_blocks_link" CASCADE;
  DROP TABLE "info_about_blocks_link_locales" CASCADE;
  DROP TABLE "info_about_blocks_faq_items" CASCADE;
  DROP TABLE "info_about_blocks_faq_items_locales" CASCADE;
  DROP TABLE "info_about_blocks_faq" CASCADE;
  DROP TABLE "info_about_blocks_size_table" CASCADE;
  DROP TABLE "info_about_blocks_contact" CASCADE;
  DROP TABLE "info_about_blocks_journal" CASCADE;
  DROP TABLE "info_about_sections" CASCADE;
  DROP TABLE "info_about_sections_locales" CASCADE;
  DROP TABLE "info_about" CASCADE;
  DROP TABLE "info_about_locales" CASCADE;
  DROP TABLE "_info_about_v_blocks_text" CASCADE;
  DROP TABLE "_info_about_v_blocks_text_locales" CASCADE;
  DROP TABLE "_info_about_v_blocks_placeholder" CASCADE;
  DROP TABLE "_info_about_v_blocks_placeholder_locales" CASCADE;
  DROP TABLE "_info_about_v_blocks_list_items" CASCADE;
  DROP TABLE "_info_about_v_blocks_list_items_locales" CASCADE;
  DROP TABLE "_info_about_v_blocks_list" CASCADE;
  DROP TABLE "_info_about_v_blocks_link" CASCADE;
  DROP TABLE "_info_about_v_blocks_link_locales" CASCADE;
  DROP TABLE "_info_about_v_blocks_faq_items" CASCADE;
  DROP TABLE "_info_about_v_blocks_faq_items_locales" CASCADE;
  DROP TABLE "_info_about_v_blocks_faq" CASCADE;
  DROP TABLE "_info_about_v_blocks_size_table" CASCADE;
  DROP TABLE "_info_about_v_blocks_contact" CASCADE;
  DROP TABLE "_info_about_v_blocks_journal" CASCADE;
  DROP TABLE "_info_about_v_version_sections" CASCADE;
  DROP TABLE "_info_about_v_version_sections_locales" CASCADE;
  DROP TABLE "_info_about_v" CASCADE;
  DROP TABLE "_info_about_v_locales" CASCADE;
  DROP TABLE "info_studio_blocks_text" CASCADE;
  DROP TABLE "info_studio_blocks_text_locales" CASCADE;
  DROP TABLE "info_studio_blocks_placeholder" CASCADE;
  DROP TABLE "info_studio_blocks_placeholder_locales" CASCADE;
  DROP TABLE "info_studio_blocks_list_items" CASCADE;
  DROP TABLE "info_studio_blocks_list_items_locales" CASCADE;
  DROP TABLE "info_studio_blocks_list" CASCADE;
  DROP TABLE "info_studio_blocks_link" CASCADE;
  DROP TABLE "info_studio_blocks_link_locales" CASCADE;
  DROP TABLE "info_studio_blocks_faq_items" CASCADE;
  DROP TABLE "info_studio_blocks_faq_items_locales" CASCADE;
  DROP TABLE "info_studio_blocks_faq" CASCADE;
  DROP TABLE "info_studio_blocks_size_table" CASCADE;
  DROP TABLE "info_studio_blocks_contact" CASCADE;
  DROP TABLE "info_studio_blocks_journal" CASCADE;
  DROP TABLE "info_studio_sections" CASCADE;
  DROP TABLE "info_studio_sections_locales" CASCADE;
  DROP TABLE "info_studio" CASCADE;
  DROP TABLE "info_studio_locales" CASCADE;
  DROP TABLE "_info_studio_v_blocks_text" CASCADE;
  DROP TABLE "_info_studio_v_blocks_text_locales" CASCADE;
  DROP TABLE "_info_studio_v_blocks_placeholder" CASCADE;
  DROP TABLE "_info_studio_v_blocks_placeholder_locales" CASCADE;
  DROP TABLE "_info_studio_v_blocks_list_items" CASCADE;
  DROP TABLE "_info_studio_v_blocks_list_items_locales" CASCADE;
  DROP TABLE "_info_studio_v_blocks_list" CASCADE;
  DROP TABLE "_info_studio_v_blocks_link" CASCADE;
  DROP TABLE "_info_studio_v_blocks_link_locales" CASCADE;
  DROP TABLE "_info_studio_v_blocks_faq_items" CASCADE;
  DROP TABLE "_info_studio_v_blocks_faq_items_locales" CASCADE;
  DROP TABLE "_info_studio_v_blocks_faq" CASCADE;
  DROP TABLE "_info_studio_v_blocks_size_table" CASCADE;
  DROP TABLE "_info_studio_v_blocks_contact" CASCADE;
  DROP TABLE "_info_studio_v_blocks_journal" CASCADE;
  DROP TABLE "_info_studio_v_version_sections" CASCADE;
  DROP TABLE "_info_studio_v_version_sections_locales" CASCADE;
  DROP TABLE "_info_studio_v" CASCADE;
  DROP TABLE "_info_studio_v_locales" CASCADE;
  DROP TABLE "info_journal_blocks_text" CASCADE;
  DROP TABLE "info_journal_blocks_text_locales" CASCADE;
  DROP TABLE "info_journal_blocks_placeholder" CASCADE;
  DROP TABLE "info_journal_blocks_placeholder_locales" CASCADE;
  DROP TABLE "info_journal_blocks_list_items" CASCADE;
  DROP TABLE "info_journal_blocks_list_items_locales" CASCADE;
  DROP TABLE "info_journal_blocks_list" CASCADE;
  DROP TABLE "info_journal_blocks_link" CASCADE;
  DROP TABLE "info_journal_blocks_link_locales" CASCADE;
  DROP TABLE "info_journal_blocks_faq_items" CASCADE;
  DROP TABLE "info_journal_blocks_faq_items_locales" CASCADE;
  DROP TABLE "info_journal_blocks_faq" CASCADE;
  DROP TABLE "info_journal_blocks_size_table" CASCADE;
  DROP TABLE "info_journal_blocks_contact" CASCADE;
  DROP TABLE "info_journal_blocks_journal" CASCADE;
  DROP TABLE "info_journal_sections" CASCADE;
  DROP TABLE "info_journal_sections_locales" CASCADE;
  DROP TABLE "info_journal" CASCADE;
  DROP TABLE "info_journal_locales" CASCADE;
  DROP TABLE "_info_journal_v_blocks_text" CASCADE;
  DROP TABLE "_info_journal_v_blocks_text_locales" CASCADE;
  DROP TABLE "_info_journal_v_blocks_placeholder" CASCADE;
  DROP TABLE "_info_journal_v_blocks_placeholder_locales" CASCADE;
  DROP TABLE "_info_journal_v_blocks_list_items" CASCADE;
  DROP TABLE "_info_journal_v_blocks_list_items_locales" CASCADE;
  DROP TABLE "_info_journal_v_blocks_list" CASCADE;
  DROP TABLE "_info_journal_v_blocks_link" CASCADE;
  DROP TABLE "_info_journal_v_blocks_link_locales" CASCADE;
  DROP TABLE "_info_journal_v_blocks_faq_items" CASCADE;
  DROP TABLE "_info_journal_v_blocks_faq_items_locales" CASCADE;
  DROP TABLE "_info_journal_v_blocks_faq" CASCADE;
  DROP TABLE "_info_journal_v_blocks_size_table" CASCADE;
  DROP TABLE "_info_journal_v_blocks_contact" CASCADE;
  DROP TABLE "_info_journal_v_blocks_journal" CASCADE;
  DROP TABLE "_info_journal_v_version_sections" CASCADE;
  DROP TABLE "_info_journal_v_version_sections_locales" CASCADE;
  DROP TABLE "_info_journal_v" CASCADE;
  DROP TABLE "_info_journal_v_locales" CASCADE;
  DROP TABLE "info_materials_blocks_text" CASCADE;
  DROP TABLE "info_materials_blocks_text_locales" CASCADE;
  DROP TABLE "info_materials_blocks_placeholder" CASCADE;
  DROP TABLE "info_materials_blocks_placeholder_locales" CASCADE;
  DROP TABLE "info_materials_blocks_list_items" CASCADE;
  DROP TABLE "info_materials_blocks_list_items_locales" CASCADE;
  DROP TABLE "info_materials_blocks_list" CASCADE;
  DROP TABLE "info_materials_blocks_link" CASCADE;
  DROP TABLE "info_materials_blocks_link_locales" CASCADE;
  DROP TABLE "info_materials_blocks_faq_items" CASCADE;
  DROP TABLE "info_materials_blocks_faq_items_locales" CASCADE;
  DROP TABLE "info_materials_blocks_faq" CASCADE;
  DROP TABLE "info_materials_blocks_size_table" CASCADE;
  DROP TABLE "info_materials_blocks_contact" CASCADE;
  DROP TABLE "info_materials_blocks_journal" CASCADE;
  DROP TABLE "info_materials_sections" CASCADE;
  DROP TABLE "info_materials_sections_locales" CASCADE;
  DROP TABLE "info_materials" CASCADE;
  DROP TABLE "info_materials_locales" CASCADE;
  DROP TABLE "_info_materials_v_blocks_text" CASCADE;
  DROP TABLE "_info_materials_v_blocks_text_locales" CASCADE;
  DROP TABLE "_info_materials_v_blocks_placeholder" CASCADE;
  DROP TABLE "_info_materials_v_blocks_placeholder_locales" CASCADE;
  DROP TABLE "_info_materials_v_blocks_list_items" CASCADE;
  DROP TABLE "_info_materials_v_blocks_list_items_locales" CASCADE;
  DROP TABLE "_info_materials_v_blocks_list" CASCADE;
  DROP TABLE "_info_materials_v_blocks_link" CASCADE;
  DROP TABLE "_info_materials_v_blocks_link_locales" CASCADE;
  DROP TABLE "_info_materials_v_blocks_faq_items" CASCADE;
  DROP TABLE "_info_materials_v_blocks_faq_items_locales" CASCADE;
  DROP TABLE "_info_materials_v_blocks_faq" CASCADE;
  DROP TABLE "_info_materials_v_blocks_size_table" CASCADE;
  DROP TABLE "_info_materials_v_blocks_contact" CASCADE;
  DROP TABLE "_info_materials_v_blocks_journal" CASCADE;
  DROP TABLE "_info_materials_v_version_sections" CASCADE;
  DROP TABLE "_info_materials_v_version_sections_locales" CASCADE;
  DROP TABLE "_info_materials_v" CASCADE;
  DROP TABLE "_info_materials_v_locales" CASCADE;
  DROP TABLE "info_careers_blocks_text" CASCADE;
  DROP TABLE "info_careers_blocks_text_locales" CASCADE;
  DROP TABLE "info_careers_blocks_placeholder" CASCADE;
  DROP TABLE "info_careers_blocks_placeholder_locales" CASCADE;
  DROP TABLE "info_careers_blocks_list_items" CASCADE;
  DROP TABLE "info_careers_blocks_list_items_locales" CASCADE;
  DROP TABLE "info_careers_blocks_list" CASCADE;
  DROP TABLE "info_careers_blocks_link" CASCADE;
  DROP TABLE "info_careers_blocks_link_locales" CASCADE;
  DROP TABLE "info_careers_blocks_faq_items" CASCADE;
  DROP TABLE "info_careers_blocks_faq_items_locales" CASCADE;
  DROP TABLE "info_careers_blocks_faq" CASCADE;
  DROP TABLE "info_careers_blocks_size_table" CASCADE;
  DROP TABLE "info_careers_blocks_contact" CASCADE;
  DROP TABLE "info_careers_blocks_journal" CASCADE;
  DROP TABLE "info_careers_sections" CASCADE;
  DROP TABLE "info_careers_sections_locales" CASCADE;
  DROP TABLE "info_careers" CASCADE;
  DROP TABLE "info_careers_locales" CASCADE;
  DROP TABLE "_info_careers_v_blocks_text" CASCADE;
  DROP TABLE "_info_careers_v_blocks_text_locales" CASCADE;
  DROP TABLE "_info_careers_v_blocks_placeholder" CASCADE;
  DROP TABLE "_info_careers_v_blocks_placeholder_locales" CASCADE;
  DROP TABLE "_info_careers_v_blocks_list_items" CASCADE;
  DROP TABLE "_info_careers_v_blocks_list_items_locales" CASCADE;
  DROP TABLE "_info_careers_v_blocks_list" CASCADE;
  DROP TABLE "_info_careers_v_blocks_link" CASCADE;
  DROP TABLE "_info_careers_v_blocks_link_locales" CASCADE;
  DROP TABLE "_info_careers_v_blocks_faq_items" CASCADE;
  DROP TABLE "_info_careers_v_blocks_faq_items_locales" CASCADE;
  DROP TABLE "_info_careers_v_blocks_faq" CASCADE;
  DROP TABLE "_info_careers_v_blocks_size_table" CASCADE;
  DROP TABLE "_info_careers_v_blocks_contact" CASCADE;
  DROP TABLE "_info_careers_v_blocks_journal" CASCADE;
  DROP TABLE "_info_careers_v_version_sections" CASCADE;
  DROP TABLE "_info_careers_v_version_sections_locales" CASCADE;
  DROP TABLE "_info_careers_v" CASCADE;
  DROP TABLE "_info_careers_v_locales" CASCADE;
  DROP TYPE "public"."enum_info_shipping_status";
  DROP TYPE "public"."enum__info_shipping_v_version_status";
  DROP TYPE "public"."enum__info_shipping_v_published_locale";
  DROP TYPE "public"."enum_info_returns_status";
  DROP TYPE "public"."enum__info_returns_v_version_status";
  DROP TYPE "public"."enum__info_returns_v_published_locale";
  DROP TYPE "public"."enum_info_size_guide_status";
  DROP TYPE "public"."enum__info_size_guide_v_version_status";
  DROP TYPE "public"."enum__info_size_guide_v_published_locale";
  DROP TYPE "public"."enum_info_track_order_status";
  DROP TYPE "public"."enum__info_track_order_v_version_status";
  DROP TYPE "public"."enum__info_track_order_v_published_locale";
  DROP TYPE "public"."enum_info_faq_status";
  DROP TYPE "public"."enum__info_faq_v_version_status";
  DROP TYPE "public"."enum__info_faq_v_published_locale";
  DROP TYPE "public"."enum_info_about_status";
  DROP TYPE "public"."enum__info_about_v_version_status";
  DROP TYPE "public"."enum__info_about_v_published_locale";
  DROP TYPE "public"."enum_info_studio_status";
  DROP TYPE "public"."enum__info_studio_v_version_status";
  DROP TYPE "public"."enum__info_studio_v_published_locale";
  DROP TYPE "public"."enum_info_journal_status";
  DROP TYPE "public"."enum__info_journal_v_version_status";
  DROP TYPE "public"."enum__info_journal_v_published_locale";
  DROP TYPE "public"."enum_info_materials_status";
  DROP TYPE "public"."enum__info_materials_v_version_status";
  DROP TYPE "public"."enum__info_materials_v_published_locale";
  DROP TYPE "public"."enum_info_careers_status";
  DROP TYPE "public"."enum__info_careers_v_version_status";
  DROP TYPE "public"."enum__info_careers_v_published_locale";`)
}
