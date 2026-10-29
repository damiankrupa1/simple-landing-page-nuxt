import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "sso_token_uses" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"jti" varchar NOT NULL,
  	"expires_at" timestamp(3) with time zone NOT NULL
  );
  
  CREATE UNIQUE INDEX "sso_token_uses_jti_idx" ON "sso_token_uses" USING btree ("jti");
  CREATE INDEX "sso_token_uses_expires_at_idx" ON "sso_token_uses" USING btree ("expires_at");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   DROP TABLE "sso_token_uses" CASCADE;`)
}
