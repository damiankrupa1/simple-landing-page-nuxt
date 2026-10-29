import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "form_submissions" ADD COLUMN "email" varchar;
  ALTER TABLE "form_submissions" ADD COLUMN "consent_text" varchar;
  ALTER TABLE "form_submissions" ADD COLUMN "consent_hash" varchar;
  ALTER TABLE "form_submissions" ADD COLUMN "consent_locale" varchar;
  ALTER TABLE "form_submissions" ADD COLUMN "discount_code" varchar;
  ALTER TABLE "form_submissions" ADD COLUMN "discount_percent" numeric;
  ALTER TABLE "form_submissions" ADD COLUMN "discount_expires_at" timestamp(3) with time zone;
  ALTER TABLE "form_submissions" ADD COLUMN "discount_redeemed_at" timestamp(3) with time zone;
  CREATE UNIQUE INDEX "form_submissions_discount_code_idx" ON "form_submissions" USING btree ("discount_code");
  CREATE UNIQUE INDEX "form_email_idx" ON "form_submissions" USING btree ("form_id","email");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "form_submissions_discount_code_idx";
  DROP INDEX "form_email_idx";
  ALTER TABLE "form_submissions" DROP COLUMN "email";
  ALTER TABLE "form_submissions" DROP COLUMN "consent_text";
  ALTER TABLE "form_submissions" DROP COLUMN "consent_hash";
  ALTER TABLE "form_submissions" DROP COLUMN "consent_locale";
  ALTER TABLE "form_submissions" DROP COLUMN "discount_code";
  ALTER TABLE "form_submissions" DROP COLUMN "discount_percent";
  ALTER TABLE "form_submissions" DROP COLUMN "discount_expires_at";
  ALTER TABLE "form_submissions" DROP COLUMN "discount_redeemed_at";`)
}
