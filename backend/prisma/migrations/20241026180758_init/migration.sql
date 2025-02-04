-- AlterTable
ALTER TABLE "Education" ADD COLUMN     "degree" TEXT,
ADD COLUMN     "department" TEXT,
ADD COLUMN     "endDate" TEXT,
ADD COLUMN     "grade" TEXT,
ADD COLUMN     "schoolName" TEXT,
ADD COLUMN     "startDate" TEXT;

-- AlterTable
ALTER TABLE "Memberships" ADD COLUMN     "membershipId" TEXT,
ADD COLUMN     "position" TEXT,
ADD COLUMN     "relatedDepartment" TEXT,
ADD COLUMN     "societyname" TEXT;

-- AlterTable
ALTER TABLE "ProfessionalExperience" ADD COLUMN     "endDate" TEXT,
ADD COLUMN     "location" TEXT,
ADD COLUMN     "organisation" TEXT,
ADD COLUMN     "startDate" TEXT,
ADD COLUMN     "title" TEXT;
