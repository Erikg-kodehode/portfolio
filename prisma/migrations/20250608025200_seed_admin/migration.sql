-- Seed initial admin user
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
  'ErikG',
  '$2a$10$YfpfZMQ1QxhZ.X2VGqBWieeF0UHYvbNu7QTKUKpZxQKh/W6TW.6jq',
  'admin',
  'erik.gulliksen@gmail.com',
  CURRENT_TIMESTAMP,
  CURRENT_TIMESTAMP
) ON CONFLICT ("username") DO NOTHING;

