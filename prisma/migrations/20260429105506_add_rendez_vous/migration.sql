-- CreateEnum
CREATE TYPE "RdvStatus" AS ENUM ('PENDING', 'CONFIRMED', 'CANCELLED');

-- CreateTable
CREATE TABLE "RendezVous" (
    "id" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "company" TEXT,
    "email" TEXT NOT NULL,
    "phone" TEXT,
    "projectType" TEXT NOT NULL,
    "preferredDate" TEXT,
    "preferredTime" TEXT,
    "message" TEXT,
    "status" "RdvStatus" NOT NULL DEFAULT 'PENDING',
    "read" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "RendezVous_pkey" PRIMARY KEY ("id")
);
