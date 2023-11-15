/*
  Warnings:

  - You are about to drop the `Cart` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Favorite_Restaurant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Orders` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Products` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Restaurant` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Favorite_Restaurant" DROP CONSTRAINT "Favorite_Restaurant_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Orders" DROP CONSTRAINT "Orders_user_id_fkey";

-- DropForeignKey
ALTER TABLE "Products" DROP CONSTRAINT "Products_restaurant_id_fkey";

-- DropForeignKey
ALTER TABLE "Restaurant" DROP CONSTRAINT "Restaurant_favorite_RestaurantId_fkey";

-- DropForeignKey
ALTER TABLE "Restaurant" DROP CONSTRAINT "Restaurant_user_id_fkey";

-- DropTable
DROP TABLE "Cart";

-- DropTable
DROP TABLE "Favorite_Restaurant";

-- DropTable
DROP TABLE "Orders";

-- DropTable
DROP TABLE "Products";

-- DropTable
DROP TABLE "Restaurant";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "tb_usuarios" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "hasRestaurant" BOOLEAN NOT NULL DEFAULT false,

    CONSTRAINT "tb_usuarios_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_restaurantes" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "logoUrl" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "cep" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "contact_number" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "favorite_RestaurantId" TEXT,

    CONSTRAINT "tb_restaurantes_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_restaurantes_favoritos" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "restaurant_id" TEXT NOT NULL,

    CONSTRAINT "tb_restaurantes_favoritos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_produtos" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "price" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "restaurant_id" TEXT NOT NULL,

    CONSTRAINT "tb_produtos_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_carinnho" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "products" JSONB NOT NULL,
    "user_id" TEXT NOT NULL,

    CONSTRAINT "tb_carinnho_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "tb_pedidos" (
    "id" TEXT NOT NULL,
    "user_id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "products" JSONB NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pendente',

    CONSTRAINT "tb_pedidos_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "tb_usuarios_email_key" ON "tb_usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "tb_restaurantes_name_key" ON "tb_restaurantes"("name");

-- CreateIndex
CREATE UNIQUE INDEX "tb_restaurantes_user_id_key" ON "tb_restaurantes"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "tb_carinnho_user_id_key" ON "tb_carinnho"("user_id");

-- AddForeignKey
ALTER TABLE "tb_restaurantes" ADD CONSTRAINT "tb_restaurantes_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_restaurantes" ADD CONSTRAINT "tb_restaurantes_favorite_RestaurantId_fkey" FOREIGN KEY ("favorite_RestaurantId") REFERENCES "tb_restaurantes_favoritos"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_restaurantes_favoritos" ADD CONSTRAINT "tb_restaurantes_favoritos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_produtos" ADD CONSTRAINT "tb_produtos_restaurant_id_fkey" FOREIGN KEY ("restaurant_id") REFERENCES "tb_restaurantes"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_carinnho" ADD CONSTRAINT "tb_carinnho_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tb_pedidos" ADD CONSTRAINT "tb_pedidos_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "tb_usuarios"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
