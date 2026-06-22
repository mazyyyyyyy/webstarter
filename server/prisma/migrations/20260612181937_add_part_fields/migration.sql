-- AlterTable
ALTER TABLE "Part" ADD COLUMN     "article" TEXT NOT NULL DEFAULT '',
ADD COLUMN     "benefits" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "compatibility" JSONB NOT NULL DEFAULT '[]',
ADD COLUMN     "delivery" TEXT NOT NULL DEFAULT 'по всей России',
ADD COLUMN     "guarantee" TEXT NOT NULL DEFAULT '6 месяцев',
ADD COLUMN     "returns" TEXT NOT NULL DEFAULT '14 дней',
ADD COLUMN     "specs" JSONB NOT NULL DEFAULT '[]';
