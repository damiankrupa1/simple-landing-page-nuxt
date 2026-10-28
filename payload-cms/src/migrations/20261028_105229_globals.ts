import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."_locales" AS ENUM('en', 'pl');
  CREATE TABLE "media_locales" (
  	"alt" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "pages_locales" (
  	"title" varchar NOT NULL,
  	"slug" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "forms_blocks_checkbox_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_country_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_email_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_message_locales" (
  	"message" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_number_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_select_options_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_select_locales" (
  	"label" varchar,
  	"default_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_state_locales" (
  	"label" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_text_locales" (
  	"label" varchar,
  	"default_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_blocks_textarea_locales" (
  	"label" varchar,
  	"default_value" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_emails_locales" (
  	"subject" varchar DEFAULT 'You''ve received a new message.' NOT NULL,
  	"message" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "forms_locales" (
  	"submit_button_label" varchar,
  	"confirmation_message" jsonb,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "navigation_primary_nav" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "navigation_primary_nav_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "navigation" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_content_help_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "footer_content_help_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_content_world_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "footer_content_world_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_content_legal_links" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "footer_content_legal_links_locales" (
  	"label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "footer_content" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"contact_email" varchar,
  	"contact_phone" varchar,
  	"social_handle" varchar,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "footer_content_locales" (
  	"contact_hours" varchar,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "studio_story" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"collection_url" varchar NOT NULL,
  	"image_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "studio_story_locales" (
  	"eyebrow" varchar NOT NULL,
  	"headline_line1" varchar NOT NULL,
  	"headline_line2" varchar NOT NULL,
  	"paragraph1" varchar NOT NULL,
  	"paragraph2" varchar NOT NULL,
  	"values" jsonb DEFAULT '[]'::jsonb NOT NULL,
  	"signature_label" varchar NOT NULL,
  	"signature_tagline" varchar NOT NULL,
  	"collection_link_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "brands" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"view_all_url" varchar NOT NULL,
  	"other_brands" jsonb DEFAULT '[]'::jsonb NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "brands_locales" (
  	"eyebrow" varchar NOT NULL,
  	"view_all_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "journal_section_articles" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL,
  	"url" varchar NOT NULL
  );
  
  CREATE TABLE "journal_section_articles_locales" (
  	"category" varchar NOT NULL,
  	"reading_time" varchar NOT NULL,
  	"title" varchar NOT NULL,
  	"summary" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "journal_section" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"view_all_url" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "journal_section_locales" (
  	"eyebrow" varchar NOT NULL,
  	"heading" varchar NOT NULL,
  	"view_all_label" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "campaign_slides_slides" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "campaign_slides_slides_locales" (
  	"season_label" varchar NOT NULL,
  	"edition_label" varchar NOT NULL,
  	"headline_line1" varchar NOT NULL,
  	"headline_line2" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"shop_cta_label" varchar NOT NULL,
  	"secondary_cta_label" varchar NOT NULL,
  	"tagline" varchar NOT NULL,
  	"caption_eyebrow" varchar NOT NULL,
  	"caption_headline" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "campaign_slides" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "category_tiles_cards" (
  	"_order" integer NOT NULL,
  	"_parent_id" integer NOT NULL,
  	"id" varchar PRIMARY KEY NOT NULL,
  	"category_handle" varchar NOT NULL,
  	"image_id" integer NOT NULL
  );
  
  CREATE TABLE "category_tiles_cards_locales" (
  	"title" varchar NOT NULL,
  	"subtitle" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" varchar NOT NULL
  );
  
  CREATE TABLE "category_tiles" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "category_tiles_locales" (
  	"eyebrow" varchar NOT NULL,
  	"heading" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  CREATE TABLE "shop_the_look" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"product_handles" jsonb DEFAULT '[]'::jsonb NOT NULL,
  	"image_id" integer NOT NULL,
  	"updated_at" timestamp(3) with time zone,
  	"created_at" timestamp(3) with time zone
  );
  
  CREATE TABLE "shop_the_look_locales" (
  	"eyebrow" varchar NOT NULL,
  	"headline_line1" varchar NOT NULL,
  	"headline_line2" varchar NOT NULL,
  	"description" varchar NOT NULL,
  	"caption_label" varchar NOT NULL,
  	"bottom_tagline" varchar NOT NULL,
  	"shop_set_cta_label" varchar NOT NULL,
  	"total_label" varchar NOT NULL,
  	"size_hint" varchar NOT NULL,
  	"id" serial PRIMARY KEY NOT NULL,
  	"_locale" "_locales" NOT NULL,
  	"_parent_id" integer NOT NULL
  );
  
  ALTER TABLE "pages_blocks_hero" ADD COLUMN "_locale" "_locales" DEFAULT 'en' NOT NULL;
  ALTER TABLE "pages_blocks_hero" ALTER COLUMN "_locale" DROP DEFAULT;
  ALTER TABLE "pages_blocks_content" ADD COLUMN "_locale" "_locales" DEFAULT 'en' NOT NULL;
  ALTER TABLE "pages_blocks_content" ALTER COLUMN "_locale" DROP DEFAULT;
  ALTER TABLE "pages_blocks_newsletter_form" ADD COLUMN "_locale" "_locales" DEFAULT 'en' NOT NULL;
  ALTER TABLE "pages_blocks_newsletter_form" ALTER COLUMN "_locale" DROP DEFAULT;
  ALTER TABLE "media_locales" ADD CONSTRAINT "media_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."media"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "pages_locales" ADD CONSTRAINT "pages_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."pages"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_checkbox_locales" ADD CONSTRAINT "forms_blocks_checkbox_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_checkbox"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_country_locales" ADD CONSTRAINT "forms_blocks_country_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_country"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_email_locales" ADD CONSTRAINT "forms_blocks_email_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_email"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_message_locales" ADD CONSTRAINT "forms_blocks_message_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_message"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_number_locales" ADD CONSTRAINT "forms_blocks_number_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_number"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select_options_locales" ADD CONSTRAINT "forms_blocks_select_options_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select_options"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_select_locales" ADD CONSTRAINT "forms_blocks_select_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_select"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_state_locales" ADD CONSTRAINT "forms_blocks_state_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_state"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_text_locales" ADD CONSTRAINT "forms_blocks_text_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_text"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_blocks_textarea_locales" ADD CONSTRAINT "forms_blocks_textarea_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_blocks_textarea"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_emails_locales" ADD CONSTRAINT "forms_emails_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms_emails"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "forms_locales" ADD CONSTRAINT "forms_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."forms"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_primary_nav" ADD CONSTRAINT "navigation_primary_nav_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "navigation_primary_nav_locales" ADD CONSTRAINT "navigation_primary_nav_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."navigation_primary_nav"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_content_help_links" ADD CONSTRAINT "footer_content_help_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_content_help_links_locales" ADD CONSTRAINT "footer_content_help_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_content_help_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_content_world_links" ADD CONSTRAINT "footer_content_world_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_content_world_links_locales" ADD CONSTRAINT "footer_content_world_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_content_world_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_content_legal_links" ADD CONSTRAINT "footer_content_legal_links_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_content_legal_links_locales" ADD CONSTRAINT "footer_content_legal_links_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_content_legal_links"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "footer_content_locales" ADD CONSTRAINT "footer_content_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."footer_content"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "studio_story" ADD CONSTRAINT "studio_story_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "studio_story_locales" ADD CONSTRAINT "studio_story_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."studio_story"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "brands_locales" ADD CONSTRAINT "brands_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."brands"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journal_section_articles" ADD CONSTRAINT "journal_section_articles_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "journal_section_articles" ADD CONSTRAINT "journal_section_articles_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journal_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journal_section_articles_locales" ADD CONSTRAINT "journal_section_articles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journal_section_articles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "journal_section_locales" ADD CONSTRAINT "journal_section_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."journal_section"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "campaign_slides_slides" ADD CONSTRAINT "campaign_slides_slides_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "campaign_slides_slides" ADD CONSTRAINT "campaign_slides_slides_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."campaign_slides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "campaign_slides_slides_locales" ADD CONSTRAINT "campaign_slides_slides_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."campaign_slides_slides"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "category_tiles_cards" ADD CONSTRAINT "category_tiles_cards_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "category_tiles_cards" ADD CONSTRAINT "category_tiles_cards_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."category_tiles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "category_tiles_cards_locales" ADD CONSTRAINT "category_tiles_cards_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."category_tiles_cards"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "category_tiles_locales" ADD CONSTRAINT "category_tiles_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."category_tiles"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "shop_the_look" ADD CONSTRAINT "shop_the_look_image_id_media_id_fk" FOREIGN KEY ("image_id") REFERENCES "public"."media"("id") ON DELETE set null ON UPDATE no action;
  ALTER TABLE "shop_the_look_locales" ADD CONSTRAINT "shop_the_look_locales_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "public"."shop_the_look"("id") ON DELETE cascade ON UPDATE no action;
  CREATE UNIQUE INDEX "media_locales_locale_parent_id_unique" ON "media_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "media_locales_parent_id_idx" ON "media_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "pages_locales_locale_parent_id_unique" ON "pages_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "pages_locales_parent_id_idx" ON "pages_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_checkbox_locales_locale_parent_id_unique" ON "forms_blocks_checkbox_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_checkbox_locales_parent_id_idx" ON "forms_blocks_checkbox_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_country_locales_locale_parent_id_unique" ON "forms_blocks_country_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_country_locales_parent_id_idx" ON "forms_blocks_country_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_email_locales_locale_parent_id_unique" ON "forms_blocks_email_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_email_locales_parent_id_idx" ON "forms_blocks_email_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_message_locales_locale_parent_id_unique" ON "forms_blocks_message_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_message_locales_parent_id_idx" ON "forms_blocks_message_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_number_locales_locale_parent_id_unique" ON "forms_blocks_number_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_number_locales_parent_id_idx" ON "forms_blocks_number_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_select_options_locales_locale_parent_id_unique" ON "forms_blocks_select_options_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_select_options_locales_parent_id_idx" ON "forms_blocks_select_options_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_select_locales_locale_parent_id_unique" ON "forms_blocks_select_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_select_locales_parent_id_idx" ON "forms_blocks_select_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_state_locales_locale_parent_id_unique" ON "forms_blocks_state_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_state_locales_parent_id_idx" ON "forms_blocks_state_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_text_locales_locale_parent_id_unique" ON "forms_blocks_text_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_text_locales_parent_id_idx" ON "forms_blocks_text_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_blocks_textarea_locales_locale_parent_id_unique" ON "forms_blocks_textarea_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_blocks_textarea_locales_parent_id_idx" ON "forms_blocks_textarea_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_emails_locales_locale_parent_id_unique" ON "forms_emails_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_emails_locales_parent_id_idx" ON "forms_emails_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "forms_locales_locale_parent_id_unique" ON "forms_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "forms_locales_parent_id_idx" ON "forms_locales" USING btree ("_parent_id");
  CREATE INDEX "navigation_primary_nav_order_idx" ON "navigation_primary_nav" USING btree ("_order");
  CREATE INDEX "navigation_primary_nav_parent_id_idx" ON "navigation_primary_nav" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "navigation_primary_nav_locales_locale_parent_id_unique" ON "navigation_primary_nav_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "navigation_primary_nav_locales_parent_id_idx" ON "navigation_primary_nav_locales" USING btree ("_parent_id");
  CREATE INDEX "footer_content_help_links_order_idx" ON "footer_content_help_links" USING btree ("_order");
  CREATE INDEX "footer_content_help_links_parent_id_idx" ON "footer_content_help_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_content_help_links_locales_locale_parent_id_unique" ON "footer_content_help_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_content_help_links_locales_parent_id_idx" ON "footer_content_help_links_locales" USING btree ("_parent_id");
  CREATE INDEX "footer_content_world_links_order_idx" ON "footer_content_world_links" USING btree ("_order");
  CREATE INDEX "footer_content_world_links_parent_id_idx" ON "footer_content_world_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_content_world_links_locales_locale_parent_id_unique" ON "footer_content_world_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_content_world_links_locales_parent_id_idx" ON "footer_content_world_links_locales" USING btree ("_parent_id");
  CREATE INDEX "footer_content_legal_links_order_idx" ON "footer_content_legal_links" USING btree ("_order");
  CREATE INDEX "footer_content_legal_links_parent_id_idx" ON "footer_content_legal_links" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_content_legal_links_locales_locale_parent_id_unique" ON "footer_content_legal_links_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_content_legal_links_locales_parent_id_idx" ON "footer_content_legal_links_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "footer_content_locales_locale_parent_id_unique" ON "footer_content_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "footer_content_locales_parent_id_idx" ON "footer_content_locales" USING btree ("_parent_id");
  CREATE INDEX "studio_story_image_idx" ON "studio_story" USING btree ("image_id");
  CREATE UNIQUE INDEX "studio_story_locales_locale_parent_id_unique" ON "studio_story_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "studio_story_locales_parent_id_idx" ON "studio_story_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "brands_locales_locale_parent_id_unique" ON "brands_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "brands_locales_parent_id_idx" ON "brands_locales" USING btree ("_parent_id");
  CREATE INDEX "journal_section_articles_order_idx" ON "journal_section_articles" USING btree ("_order");
  CREATE INDEX "journal_section_articles_parent_id_idx" ON "journal_section_articles" USING btree ("_parent_id");
  CREATE INDEX "journal_section_articles_image_idx" ON "journal_section_articles" USING btree ("image_id");
  CREATE UNIQUE INDEX "journal_section_articles_locales_locale_parent_id_unique" ON "journal_section_articles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "journal_section_articles_locales_parent_id_idx" ON "journal_section_articles_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "journal_section_locales_locale_parent_id_unique" ON "journal_section_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "journal_section_locales_parent_id_idx" ON "journal_section_locales" USING btree ("_parent_id");
  CREATE INDEX "campaign_slides_slides_order_idx" ON "campaign_slides_slides" USING btree ("_order");
  CREATE INDEX "campaign_slides_slides_parent_id_idx" ON "campaign_slides_slides" USING btree ("_parent_id");
  CREATE INDEX "campaign_slides_slides_image_idx" ON "campaign_slides_slides" USING btree ("image_id");
  CREATE UNIQUE INDEX "campaign_slides_slides_locales_locale_parent_id_unique" ON "campaign_slides_slides_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "campaign_slides_slides_locales_parent_id_idx" ON "campaign_slides_slides_locales" USING btree ("_parent_id");
  CREATE INDEX "category_tiles_cards_order_idx" ON "category_tiles_cards" USING btree ("_order");
  CREATE INDEX "category_tiles_cards_parent_id_idx" ON "category_tiles_cards" USING btree ("_parent_id");
  CREATE INDEX "category_tiles_cards_image_idx" ON "category_tiles_cards" USING btree ("image_id");
  CREATE UNIQUE INDEX "category_tiles_cards_locales_locale_parent_id_unique" ON "category_tiles_cards_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "category_tiles_cards_locales_parent_id_idx" ON "category_tiles_cards_locales" USING btree ("_parent_id");
  CREATE UNIQUE INDEX "category_tiles_locales_locale_parent_id_unique" ON "category_tiles_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "category_tiles_locales_parent_id_idx" ON "category_tiles_locales" USING btree ("_parent_id");
  CREATE INDEX "shop_the_look_image_idx" ON "shop_the_look" USING btree ("image_id");
  CREATE UNIQUE INDEX "shop_the_look_locales_locale_parent_id_unique" ON "shop_the_look_locales" USING btree ("_locale","_parent_id");
  CREATE INDEX "shop_the_look_locales_parent_id_idx" ON "shop_the_look_locales" USING btree ("_parent_id");
  CREATE INDEX "pages_blocks_hero_locale_idx" ON "pages_blocks_hero" USING btree ("_locale");
  CREATE INDEX "pages_blocks_content_locale_idx" ON "pages_blocks_content" USING btree ("_locale");
  CREATE INDEX "pages_blocks_newsletter_form_locale_idx" ON "pages_blocks_newsletter_form" USING btree ("_locale");
  -- Data-preserving step (hand-written): localized fields move to *_locales tables;
  -- copy the existing values as the default locale ('en') before the old columns are dropped.
  INSERT INTO "media_locales" ("alt", "_locale", "_parent_id") SELECT "alt", 'en', "id" FROM "media";
  INSERT INTO "pages_locales" ("title", "slug", "_locale", "_parent_id") SELECT "title", "slug", 'en', "id" FROM "pages";
  INSERT INTO "forms_blocks_checkbox_locales" ("label", "_locale", "_parent_id") SELECT "label", 'en', "id" FROM "forms_blocks_checkbox";
  INSERT INTO "forms_blocks_country_locales" ("label", "_locale", "_parent_id") SELECT "label", 'en', "id" FROM "forms_blocks_country";
  INSERT INTO "forms_blocks_email_locales" ("label", "_locale", "_parent_id") SELECT "label", 'en', "id" FROM "forms_blocks_email";
  INSERT INTO "forms_blocks_message_locales" ("message", "_locale", "_parent_id") SELECT "message", 'en', "id" FROM "forms_blocks_message";
  INSERT INTO "forms_blocks_number_locales" ("label", "_locale", "_parent_id") SELECT "label", 'en', "id" FROM "forms_blocks_number";
  INSERT INTO "forms_blocks_select_options_locales" ("label", "_locale", "_parent_id") SELECT "label", 'en', "id" FROM "forms_blocks_select_options";
  INSERT INTO "forms_blocks_select_locales" ("label", "default_value", "_locale", "_parent_id") SELECT "label", "default_value", 'en', "id" FROM "forms_blocks_select";
  INSERT INTO "forms_blocks_state_locales" ("label", "_locale", "_parent_id") SELECT "label", 'en', "id" FROM "forms_blocks_state";
  INSERT INTO "forms_blocks_text_locales" ("label", "default_value", "_locale", "_parent_id") SELECT "label", "default_value", 'en', "id" FROM "forms_blocks_text";
  INSERT INTO "forms_blocks_textarea_locales" ("label", "default_value", "_locale", "_parent_id") SELECT "label", "default_value", 'en', "id" FROM "forms_blocks_textarea";
  INSERT INTO "forms_emails_locales" ("subject", "message", "_locale", "_parent_id") SELECT "subject", "message", 'en', "id" FROM "forms_emails";
  INSERT INTO "forms_locales" ("submit_button_label", "confirmation_message", "_locale", "_parent_id") SELECT "submit_button_label", "confirmation_message", 'en', "id" FROM "forms";
  ALTER TABLE "media" DROP COLUMN "alt";
  ALTER TABLE "pages" DROP COLUMN "title";
  ALTER TABLE "pages" DROP COLUMN "slug";
  ALTER TABLE "forms_blocks_checkbox" DROP COLUMN "label";
  ALTER TABLE "forms_blocks_country" DROP COLUMN "label";
  ALTER TABLE "forms_blocks_email" DROP COLUMN "label";
  ALTER TABLE "forms_blocks_message" DROP COLUMN "message";
  ALTER TABLE "forms_blocks_number" DROP COLUMN "label";
  ALTER TABLE "forms_blocks_select_options" DROP COLUMN "label";
  ALTER TABLE "forms_blocks_select" DROP COLUMN "label";
  ALTER TABLE "forms_blocks_select" DROP COLUMN "default_value";
  ALTER TABLE "forms_blocks_state" DROP COLUMN "label";
  ALTER TABLE "forms_blocks_text" DROP COLUMN "label";
  ALTER TABLE "forms_blocks_text" DROP COLUMN "default_value";
  ALTER TABLE "forms_blocks_textarea" DROP COLUMN "label";
  ALTER TABLE "forms_blocks_textarea" DROP COLUMN "default_value";
  ALTER TABLE "forms_emails" DROP COLUMN "subject";
  ALTER TABLE "forms_emails" DROP COLUMN "message";
  ALTER TABLE "forms" DROP COLUMN "submit_button_label";
  ALTER TABLE "forms" DROP COLUMN "confirmation_message";`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "media_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "pages_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_checkbox_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_country_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_email_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_message_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_number_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_select_options_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_select_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_state_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_text_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_blocks_textarea_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_emails_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "forms_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "navigation_primary_nav" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "navigation_primary_nav_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "navigation" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_content_help_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_content_help_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_content_world_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_content_world_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_content_legal_links" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_content_legal_links_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_content" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "footer_content_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "studio_story" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "studio_story_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "brands" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "brands_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "journal_section_articles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "journal_section_articles_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "journal_section" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "journal_section_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "campaign_slides_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "campaign_slides_slides_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "campaign_slides" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "category_tiles_cards" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "category_tiles_cards_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "category_tiles" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "category_tiles_locales" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "shop_the_look" DISABLE ROW LEVEL SECURITY;
  ALTER TABLE "shop_the_look_locales" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "media_locales" CASCADE;
  DROP TABLE "pages_locales" CASCADE;
  DROP TABLE "forms_blocks_checkbox_locales" CASCADE;
  DROP TABLE "forms_blocks_country_locales" CASCADE;
  DROP TABLE "forms_blocks_email_locales" CASCADE;
  DROP TABLE "forms_blocks_message_locales" CASCADE;
  DROP TABLE "forms_blocks_number_locales" CASCADE;
  DROP TABLE "forms_blocks_select_options_locales" CASCADE;
  DROP TABLE "forms_blocks_select_locales" CASCADE;
  DROP TABLE "forms_blocks_state_locales" CASCADE;
  DROP TABLE "forms_blocks_text_locales" CASCADE;
  DROP TABLE "forms_blocks_textarea_locales" CASCADE;
  DROP TABLE "forms_emails_locales" CASCADE;
  DROP TABLE "forms_locales" CASCADE;
  DROP TABLE "navigation_primary_nav" CASCADE;
  DROP TABLE "navigation_primary_nav_locales" CASCADE;
  DROP TABLE "navigation" CASCADE;
  DROP TABLE "footer_content_help_links" CASCADE;
  DROP TABLE "footer_content_help_links_locales" CASCADE;
  DROP TABLE "footer_content_world_links" CASCADE;
  DROP TABLE "footer_content_world_links_locales" CASCADE;
  DROP TABLE "footer_content_legal_links" CASCADE;
  DROP TABLE "footer_content_legal_links_locales" CASCADE;
  DROP TABLE "footer_content" CASCADE;
  DROP TABLE "footer_content_locales" CASCADE;
  DROP TABLE "studio_story" CASCADE;
  DROP TABLE "studio_story_locales" CASCADE;
  DROP TABLE "brands" CASCADE;
  DROP TABLE "brands_locales" CASCADE;
  DROP TABLE "journal_section_articles" CASCADE;
  DROP TABLE "journal_section_articles_locales" CASCADE;
  DROP TABLE "journal_section" CASCADE;
  DROP TABLE "journal_section_locales" CASCADE;
  DROP TABLE "campaign_slides_slides" CASCADE;
  DROP TABLE "campaign_slides_slides_locales" CASCADE;
  DROP TABLE "campaign_slides" CASCADE;
  DROP TABLE "category_tiles_cards" CASCADE;
  DROP TABLE "category_tiles_cards_locales" CASCADE;
  DROP TABLE "category_tiles" CASCADE;
  DROP TABLE "category_tiles_locales" CASCADE;
  DROP TABLE "shop_the_look" CASCADE;
  DROP TABLE "shop_the_look_locales" CASCADE;
  DROP INDEX "pages_blocks_hero_locale_idx";
  DROP INDEX "pages_blocks_content_locale_idx";
  DROP INDEX "pages_blocks_newsletter_form_locale_idx";
  ALTER TABLE "media" ADD COLUMN "alt" varchar NOT NULL;
  ALTER TABLE "pages" ADD COLUMN "title" varchar NOT NULL;
  ALTER TABLE "pages" ADD COLUMN "slug" varchar NOT NULL;
  ALTER TABLE "forms_blocks_checkbox" ADD COLUMN "label" varchar;
  ALTER TABLE "forms_blocks_country" ADD COLUMN "label" varchar;
  ALTER TABLE "forms_blocks_email" ADD COLUMN "label" varchar;
  ALTER TABLE "forms_blocks_message" ADD COLUMN "message" jsonb;
  ALTER TABLE "forms_blocks_number" ADD COLUMN "label" varchar;
  ALTER TABLE "forms_blocks_select_options" ADD COLUMN "label" varchar NOT NULL;
  ALTER TABLE "forms_blocks_select" ADD COLUMN "label" varchar;
  ALTER TABLE "forms_blocks_select" ADD COLUMN "default_value" varchar;
  ALTER TABLE "forms_blocks_state" ADD COLUMN "label" varchar;
  ALTER TABLE "forms_blocks_text" ADD COLUMN "label" varchar;
  ALTER TABLE "forms_blocks_text" ADD COLUMN "default_value" varchar;
  ALTER TABLE "forms_blocks_textarea" ADD COLUMN "label" varchar;
  ALTER TABLE "forms_blocks_textarea" ADD COLUMN "default_value" varchar;
  ALTER TABLE "forms_emails" ADD COLUMN "subject" varchar DEFAULT 'You''ve received a new message.' NOT NULL;
  ALTER TABLE "forms_emails" ADD COLUMN "message" jsonb;
  ALTER TABLE "forms" ADD COLUMN "submit_button_label" varchar;
  ALTER TABLE "forms" ADD COLUMN "confirmation_message" jsonb;
  ALTER TABLE "pages_blocks_hero" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_content" DROP COLUMN "_locale";
  ALTER TABLE "pages_blocks_newsletter_form" DROP COLUMN "_locale";
  DROP TYPE "public"."_locales";`)
}
