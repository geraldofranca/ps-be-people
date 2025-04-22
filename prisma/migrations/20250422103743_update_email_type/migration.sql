/*
  Warnings:

  - The values [RESIDENTIAL] on the enum `EmailType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "EmailType_new" AS ENUM ('PERSONAL', 'COMMERCIAL', 'OTHER');
ALTER TABLE "people_emails" ALTER COLUMN "type" TYPE "EmailType_new" USING ("type"::text::"EmailType_new");
ALTER TYPE "EmailType" RENAME TO "EmailType_old";
ALTER TYPE "EmailType_new" RENAME TO "EmailType";
DROP TYPE "EmailType_old";
COMMIT;
