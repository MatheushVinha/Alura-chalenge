/*
  Warnings:

  - A unique constraint covering the columns `[titulo]` on the table `Categorias` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `Categorias_titulo_key` ON `Categorias`(`titulo`);
