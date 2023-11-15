/*
  Warnings:

  - You are about to drop the column `favorite_RestaurantId` on the `tb_restaurantes` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "tb_restaurantes" DROP CONSTRAINT "tb_restaurantes_favorite_RestaurantId_fkey";

-- AlterTable
ALTER TABLE "tb_restaurantes" DROP COLUMN "favorite_RestaurantId";
