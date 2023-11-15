/*
  Warnings:

  - You are about to drop the column `products` on the `tb_pedidos` table. All the data in the column will be lost.
  - Added the required column `price` to the `tb_pedidos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `product_name` to the `tb_pedidos` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `tb_pedidos` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "tb_pedidos" DROP COLUMN "products",
ADD COLUMN     "price" TEXT NOT NULL,
ADD COLUMN     "product_name" TEXT NOT NULL,
ADD COLUMN     "quantity" TEXT NOT NULL;
