-- Seed admin user with bcrypt hash of 'admin123'
INSERT INTO "Admin" (
  "id",
  "username",
  "passwordHash",
  "role",
  "email",
  "createdAt",
  "updatedAt"
) VALUES (
  'clst0000000000001',
  'admin',
  '$2a$10$vxF3RNqWZKoL7k9HoD2q.eNPtxmXeJsWfuJ0lDjxJ8QQgY0YzLvwe',
  'admin',
  'erik.gulliksen@gmail.com',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
) ON CONFLICT ("username") DO NOTHING;

