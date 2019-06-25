TRUNCATE users RESTART IDENTITY CASCADE; 

INSERT INTO users(first_name, last_name, pic_url, dragon_bucks, age)
VALUES
('Mike', 'Cermak', 'http://bit.ly/2IfpyW9', 100, 38),
('Ale', 'Cabrera-Mondragon', 'http://bit.ly/2QFZhUJ', 500, 27),
('Drew', 'Love', 'http://bit.ly/2QFUUJa', 300, 34); 


-- SEED SCRIPT
-- psql -f ~/Projects/A1-Review/green-dragons-server/seeds/001.users/seed.users.sql green_dragons; 