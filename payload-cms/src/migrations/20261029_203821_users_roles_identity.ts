import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TYPE "public"."enum_users_role" AS ENUM('none', 'viewer', 'editor', 'publisher', 'admin');
  ALTER TABLE "users" ADD COLUMN "name" varchar;
  ALTER TABLE "users" ADD COLUMN "medusa_user_id" varchar;
  ALTER TABLE "users" ADD COLUMN "role" "enum_users_role" DEFAULT 'none' NOT NULL;
  CREATE UNIQUE INDEX "users_medusa_user_id_idx" ON "users" USING btree ("medusa_user_id");`)

  // Backfill (hand-added): accounts that were not created by Medusa SSO (for example the first admin made
  // by hand) are the only way in without Medusa, so they keep full access. SSO accounts stay at the
  // default 'none' and get their real role from Medusa at the next SSO sign-in (default deny).
  await db.execute(sql`
   UPDATE "users" SET "role" = 'admin' WHERE "sso_managed" IS NOT TRUE;`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP INDEX "users_medusa_user_id_idx";
  ALTER TABLE "users" DROP COLUMN "name";
  ALTER TABLE "users" DROP COLUMN "medusa_user_id";
  ALTER TABLE "users" DROP COLUMN "role";
  DROP TYPE "public"."enum_users_role";`)
}
