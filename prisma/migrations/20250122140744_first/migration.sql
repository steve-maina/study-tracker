-- CreateTable
CREATE TABLE "Session" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "topic" TEXT NOT NULL,
    "duration" INTEGER NOT NULL,
    "date" DATETIME NOT NULL,
    "month" INTEGER NOT NULL,
    "year" INTEGER NOT NULL,
    "day" INTEGER NOT NULL
);
