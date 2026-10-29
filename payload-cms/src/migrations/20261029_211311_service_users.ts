import { MigrateUpArgs, MigrateDownArgs, sql } from '@payloadcms/db-postgres'

export async function up({ db, payload, req }: MigrateUpArgs): Promise<void> {
  await db.execute(sql`
   CREATE TABLE "service_users" (
  	"id" serial PRIMARY KEY NOT NULL,
  	"name" varchar NOT NULL,
  	"updated_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"created_at" timestamp(3) with time zone DEFAULT now() NOT NULL,
  	"enable_a_p_i_key" boolean,
  	"api_key" varchar,
  	"api_key_index" varchar
  );
  
  ALTER TABLE "payload_locked_documents_rels" ADD COLUMN "service_users_id" integer;
  ALTER TABLE "payload_preferences_rels" ADD COLUMN "service_users_id" integer;
  CREATE INDEX "service_users_updated_at_idx" ON "service_users" USING btree ("updated_at");
  CREATE INDEX "service_users_created_at_idx" ON "service_users" USING btree ("created_at");
  ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_service_users_fk" FOREIGN KEY ("service_users_id") REFERENCES "public"."service_users"("id") ON DELETE cascade ON UPDATE no action;
  ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_service_users_fk" FOREIGN KEY ("service_users_id") REFERENCES "public"."service_users"("id") ON DELETE cascade ON UPDATE no action;
  CREATE INDEX "payload_locked_documents_rels_service_users_id_idx" ON "payload_locked_documents_rels" USING btree ("service_users_id");
  CREATE INDEX "payload_preferences_rels_service_users_id_idx" ON "payload_preferences_rels" USING btree ("service_users_id");`)
}

export async function down({ db, payload, req }: MigrateDownArgs): Promise<void> {
  await db.execute(sql`
   ALTER TABLE "service_users" DISABLE ROW LEVEL SECURITY;
  DROP TABLE "service_users" CASCADE;
  ALTER TABLE "payload_locked_documents_rels" DROP CONSTRAINT "payload_locked_documents_rels_service_users_fk";
  
  ALTER TABLE "payload_preferences_rels" DROP CONSTRAINT "payload_preferences_rels_service_users_fk";
  
  DROP INDEX "payload_locked_documents_rels_service_users_id_idx";
  DROP INDEX "payload_preferences_rels_service_users_id_idx";
  ALTER TABLE "payload_locked_documents_rels" DROP COLUMN "service_users_id";
  ALTER TABLE "payload_preferences_rels" DROP COLUMN "service_users_id";`)
}
