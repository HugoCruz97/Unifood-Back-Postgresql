/*
  Warnings:

  - You are about to drop the column `products` on the `tb_carinnho` table. All the data in the column will be lost.
  - Added the required column `price` to the `tb_carinnho` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_name` to the `tb_carinnho` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `tb_carinnho` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_carinnho" DROP COLUMN "products",
ADD COLUMN     "price" TEXT NOT NULL,
ADD COLUMN     "product_name" TEXT NOT NULL,
ADD COLUMN     "quantity" TEXT NOT NULL,
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'Aguardando Pagamento';
