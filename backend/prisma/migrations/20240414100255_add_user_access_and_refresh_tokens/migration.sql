/*
  Warnings:

  - You are about to drop the column `passwordResetAt` on the `User` table. All the data in the column will be lost.
  - You are about to drop the column `passwordResetToken` on the `User` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[email,verificationCode,access_token]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "User_email_verificationCode_passwordResetToken_idx";

-- DropIndex
DROP INDEX "User_email_verificationCode_passwordResetToken_key";

-- AlterTable
ALTER TABLE "User" DROP COLUMN "passwordResetAt",
DROP COLUMN "passwordResetToken",
ADD COLUMN     "access_token" TEXT,
ADD COLUMN     "expires_at" INTEGER,
ADD COLUMN     "refresh_token" TEXT;

-- CreateIndex
CREATE INDEX "User_email_verificationCode_access_token_idx" ON "User"("email", "verificationCode", "access_token");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_verificationCode_access_token_key" ON "User"("email", "verificationCode", "access_token");
