-- AlterTable
ALTER TABLE "User" ADD COLUMN     "permissions" JSONB NOT NULL DEFAULT '{}';
