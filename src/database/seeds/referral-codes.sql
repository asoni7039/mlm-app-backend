INSERT INTO referral_codes 
(code, is_active, description, created_at, updated_at, deleted_at, created_by, updated_by, deleted_by) 
VALUES
('WELCOME2024', 1, 'Welcome offer for 2024', NOW(), NOW(), NULL, 1, 1, NULL),
('NEWUSER50', 1, 'New user discount code', NOW(), NOW(), NULL, 1, 1, NULL),
('SPECIAL25', 1, 'Special discount code', NOW(), NOW(), NULL, 1, 1, NULL),
('FRIEND100', 1, 'Friend referral bonus', NOW(), NOW(), NULL, 1, 1, NULL),
('VIP2024', 1, 'VIP member code', NOW(), NOW(), NULL, 1, 1, NULL); 