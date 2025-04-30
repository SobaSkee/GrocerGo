-- AlterTable
ALTER TABLE "user" ALTER COLUMN "username" DROP NOT NULL,
ALTER COLUMN "hashedPassword" DROP NOT NULL;
