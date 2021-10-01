-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Article" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "guid" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "author" TEXT,
    "commentsLink" TEXT,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "publishedAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "feedId" TEXT NOT NULL,
    CONSTRAINT "Article_feedId_fkey" FOREIGN KEY ("feedId") REFERENCES "Feed" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Article" ("author", "commentsLink", "content", "createdAt", "feedId", "guid", "id", "isRead", "link", "publishedAt", "title", "updatedAt") SELECT "author", "commentsLink", "content", "createdAt", "feedId", "guid", "id", "isRead", "link", "publishedAt", "title", "updatedAt" FROM "Article";
DROP TABLE "Article";
ALTER TABLE "new_Article" RENAME TO "Article";
CREATE UNIQUE INDEX "Article_guid_feedId_key" ON "Article"("guid", "feedId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;

-- RedefineIndex
DROP INDEX "Feed.url_unique";
CREATE UNIQUE INDEX "Feed_url_key" ON "Feed"("url");
