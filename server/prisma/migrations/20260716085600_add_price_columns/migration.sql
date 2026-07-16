-- CreateTable
CREATE TABLE "PriceColumn" (
    "id" SERIAL NOT NULL,
    "service" TEXT NOT NULL,
    "colKey" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "sortOrder" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "PriceColumn_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PriceColumn_service_colKey_key" ON "PriceColumn"("service", "colKey");
