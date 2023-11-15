/*
  Warnings:

  - You are about to drop the `tb_carinnho` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `restaurant_id` to the `tb_pedidos` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `quantity` on the `tb_pedidos` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "tb_carinnho" DROP CONSTRAINT "tb_carinnho_user_id_fkey";

-- AlterTable
ALTER TABLE "tb_pedidos" ADD COLUMN     "restaurant_id" TEXT NOT NULL,
DROP COLUMN "quantity",
ADD COLUMN     "quantity" INTEGER NOT NULL;

-- DropTable
DROP TABLE "tb_carinnho";

-- AddForeignKey
ALTER TABLE "tb_pedidos" ADD CONSTRAINT "tb_pedidos_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "tb_restaurantes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
