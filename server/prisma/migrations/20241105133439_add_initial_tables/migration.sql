/*
  Warnings:

  - Added the required column `first_name` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_login` to the `Users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `last_name` to the `Users` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "REDEMPTION_STATUS" AS ENUM ('REDEEMED', 'ACTIVE', 'EXPIRED');

-- AlterTable
ALTER TABLE "Users" ADD COLUMN     "created_date" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "email_verified_date" TIMESTAMPTZ(0) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "first_name" TEXT NOT NULL,
ADD COLUMN     "last_login" TIMESTAMPTZ(0) NOT NULL,
ADD COLUMN     "last_name" TEXT NOT NULL,
ADD COLUMN     "marketing_opt_in" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "Temp_Users" (
    "id" SERIAL NOT NULL,
    "email" TEXT NOT NULL,
    "terms_agreed_date" TIMESTAMPTZ(0) NOT NULL,
    "expires_at" TIMESTAMPTZ(0) NOT NULL,
    "verification_code" TEXT NOT NULL,

    CONSTRAINT "Temp_Users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "User_Sessions" (
    "id" SERIAL NOT NULL,
    "expires_at" TIMESTAMPTZ(0) NOT NULL,
    "token" TEXT NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "User_Sessions_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Google_Refresh_Tokens" (
    "id" SERIAL NOT NULL,
    "refresh_token" INTEGER NOT NULL,
    "user_email" TEXT NOT NULL,

    CONSTRAINT "Google_Refresh_Tokens_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Email_Verification_Codes" (
    "id" SERIAL NOT NULL,
    "code" INTEGER NOT NULL,
    "expires_at" TIMESTAMPTZ(0) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Email_Verification_Codes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Deal_Vouchers" (
    "id" SERIAL NOT NULL,
    "created_date" TIMESTAMPTZ(0) NOT NULL,
    "redemption_code" INTEGER NOT NULL,
    "deal_id" TEXT NOT NULL,
    "status" "REDEMPTION_STATUS" NOT NULL DEFAULT 'ACTIVE',
    "redeemed_at" TIMESTAMPTZ(0),
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Deal_Vouchers_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Temp_Users_email_key" ON "Temp_Users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Temp_Users_verification_code_key" ON "Temp_Users"("verification_code");

-- CreateIndex
CREATE UNIQUE INDEX "User_Sessions_token_key" ON "User_Sessions"("token");

-- CreateIndex
CREATE UNIQUE INDEX "User_Sessions_user_id_key" ON "User_Sessions"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Google_Refresh_Tokens_refresh_token_key" ON "Google_Refresh_Tokens"("refresh_token");

-- CreateIndex
CREATE UNIQUE INDEX "Google_Refresh_Tokens_user_email_key" ON "Google_Refresh_Tokens"("user_email");

-- CreateIndex
CREATE UNIQUE INDEX "Email_Verification_Codes_code_key" ON "Email_Verification_Codes"("code");

-- CreateIndex
CREATE UNIQUE INDEX "Email_Verification_Codes_user_id_key" ON "Email_Verification_Codes"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Deal_Vouchers_redemption_code_key" ON "Deal_Vouchers"("redemption_code");

-- CreateIndex
CREATE UNIQUE INDEX "Deal_Vouchers_user_id_key" ON "Deal_Vouchers"("user_id");

-- AddForeignKey
ALTER TABLE "User_Sessions" ADD CONSTRAINT "User_Sessions_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Google_Refresh_Tokens" ADD CONSTRAINT "Google_Refresh_Tokens_user_email_fkey" FOREIGN KEY ("user_email") REFERENCES "Users"("email") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Email_Verification_Codes" ADD CONSTRAINT "Email_Verification_Codes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Deal_Vouchers" ADD CONSTRAINT "Deal_Vouchers_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "Users"("id") ON DELETE CASCADE ON UPDATE CASCADE;
