/*
  Warnings:

  - You are about to drop the column `teacherDisciplineId` on the `tests` table. All the data in the column will be lost.
  - You are about to drop the `teachersDisciplines` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `disciplineId` to the `tests` table without a default value. This is not possible if the table is not empty.
  - Added the required column `teacherId` to the `tests` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "teachersDisciplines" DROP CONSTRAINT "teachersDisciplines_disciplineId_fkey";

-- DropForeignKey
ALTER TABLE "teachersDisciplines" DROP CONSTRAINT "teachersDisciplines_teacherId_fkey";

-- DropForeignKey
ALTER TABLE "tests" DROP CONSTRAINT "tests_teacherDisciplineId_fkey";

-- AlterTable
ALTER TABLE "tests" DROP COLUMN "teacherDisciplineId",
ADD COLUMN     "disciplineId" INTEGER NOT NULL,
ADD COLUMN     "teacherId" INTEGER NOT NULL;

-- DropTable
DROP TABLE "teachersDisciplines";

-- CreateTable
CREATE TABLE "_DisciplineToTeacher" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_DisciplineToTeacher_AB_unique" ON "_DisciplineToTeacher"("A", "B");

-- CreateIndex
CREATE INDEX "_DisciplineToTeacher_B_index" ON "_DisciplineToTeacher"("B");

-- AddForeignKey
ALTER TABLE "tests" ADD CONSTRAINT "tests_teacherId_fkey" FOREIGN KEY ("teacherId") REFERENCES "teachers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tests" ADD CONSTRAINT "tests_disciplineId_fkey" FOREIGN KEY ("disciplineId") REFERENCES "disciplines"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DisciplineToTeacher" ADD CONSTRAINT "_DisciplineToTeacher_A_fkey" FOREIGN KEY ("A") REFERENCES "disciplines"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_DisciplineToTeacher" ADD CONSTRAINT "_DisciplineToTeacher_B_fkey" FOREIGN KEY ("B") REFERENCES "teachers"("id") ON DELETE CASCADE ON UPDATE CASCADE;
