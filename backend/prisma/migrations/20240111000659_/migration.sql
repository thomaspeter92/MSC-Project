-- AlterTable
ALTER TABLE "Profile" ADD COLUMN     "bio" TEXT,
ADD COLUMN     "dislikes" TEXT[] DEFAULT ARRAY[]::TEXT[],
ADD COLUMN     "likes" TEXT[] DEFAULT ARRAY[]::TEXT[];
