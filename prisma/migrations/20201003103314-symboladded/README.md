# Migration `20201003103314-symboladded`

This migration has been generated by immentiadev at 10/3/2020, 3:33:15 PM.
You can check out the [state of the schema](./schema.prisma) after the migration.

## Database Steps

```sql
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_WatchSymbols" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "symbol" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "postedById" INTEGER,

    FOREIGN KEY ("postedById") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_WatchSymbols" ("id", "createdAt", "postedById") SELECT "id", "createdAt", "postedById" FROM "WatchSymbols";
DROP TABLE "WatchSymbols";
ALTER TABLE "new_WatchSymbols" RENAME TO "WatchSymbols";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON
```

## Changes

```diff
diff --git schema.prisma schema.prisma
migration 20201003101222-watchlistadded..20201003103314-symboladded
--- datamodel.dml
+++ datamodel.dml
@@ -1,7 +1,7 @@
 datasource db {
     provider = "sqlite"
-    url = "***"
+    url = "***"
 }
 generator client {
     provider = "prisma-client-js"
@@ -36,8 +36,9 @@
 }
 model WatchSymbols {
     id          Int          @id @default(autoincrement())
+    symbol      String
     createdAt   DateTime     @default(now())
     postedById  Int?
     postedBy    User?        @relation(fields: [postedById], references: [id])
```

