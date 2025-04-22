-- CreateEnum
CREATE TYPE "DocumentType" AS ENUM ('CPF', 'CNPJ', 'RG');

-- CreateEnum
CREATE TYPE "AddressType" AS ENUM ('RESIDENTIAL', 'COMMERCIAL', 'OTHER');

-- CreateEnum
CREATE TYPE "PhoneType" AS ENUM ('FIXED', 'MOBILE', 'MESSAGE', 'OTHER');

-- CreateTable
CREATE TABLE "people" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "document" TEXT NOT NULL,
    "documentType" "DocumentType" NOT NULL,
    "email" TEXT,
    "accountId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "people_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "people_addresses" (
    "id" TEXT NOT NULL,
    "personId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "type" "AddressType" NOT NULL,
    "street" TEXT NOT NULL,
    "number" TEXT NOT NULL,
    "complement" TEXT,
    "neighborhood" TEXT NOT NULL,
    "city" TEXT NOT NULL,
    "state" TEXT NOT NULL,
    "postalCode" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "people_addresses_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "people_phones" (
    "id" TEXT NOT NULL,
    "personId" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "type" "PhoneType" NOT NULL,
    "number" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "people_phones_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "people_email_key" ON "people"("email");

-- CreateIndex
CREATE INDEX "people_accountId_idx" ON "people"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "people_accountId_document_key" ON "people"("accountId", "document");

-- CreateIndex
CREATE UNIQUE INDEX "people_id_accountId_key" ON "people"("id", "accountId");

-- CreateIndex
CREATE INDEX "people_addresses_accountId_idx" ON "people_addresses"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "people_addresses_id_accountId_key" ON "people_addresses"("id", "accountId");

-- CreateIndex
CREATE INDEX "people_phones_accountId_idx" ON "people_phones"("accountId");

-- CreateIndex
CREATE UNIQUE INDEX "people_phones_id_accountId_key" ON "people_phones"("id", "accountId");

-- AddForeignKey
ALTER TABLE "people_addresses" ADD CONSTRAINT "people_addresses_personId_fkey" FOREIGN KEY ("personId") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "people_phones" ADD CONSTRAINT "people_phones_personId_fkey" FOREIGN KEY ("personId") REFERENCES "people"("id") ON DELETE CASCADE ON UPDATE CASCADE;
