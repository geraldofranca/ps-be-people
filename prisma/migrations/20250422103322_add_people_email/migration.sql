-- CreateEnum
CREATE TYPE "EmailType" AS ENUM ('RESIDENTIAL', 'COMMERCIAL', 'OTHER');

-- AlterTable
ALTER TABLE "people" ALTER COLUMN "updatedAt" SET DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "people_addresses" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "people_phones" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- CreateTable
CREATE TABLE "people_emails" (
    "id" TEXT NOT NULL,
    "personId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "type" "EmailType" NOT NULL,
    "email" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "people_emails_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "people_emails_accountId_idx" ON "people_emails"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "people_emails_id_accountId_key" ON "people_emails"("id", "accountId");

-- AddForeignKey
ALTER TABLE "people_emails" ADD CONSTRAINT "people_emails_personId_fkey" FOREIGN KEY ("personId") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE;
