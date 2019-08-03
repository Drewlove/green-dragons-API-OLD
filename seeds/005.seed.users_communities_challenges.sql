TRUNCATE TABLE users_communities_challenges RESTART IDENTITY CASCADE; 

INSERT INTO users_communities_challenges(
    users_id, communities_challenges_id, entry_date, record, stars, dragon_bucks, notes)
VALUES
(1, 6, '2019-07-01', 190, 0, 0, 'mike, public half mile'),
(1, 6, '2019-07-08', 180, 1, 1, 'mike, public half mile'),
(1, 6, '2019-07-15', 145, 2, 2, 'mike, public half mile'),
(1, 1, '2019-07-10', 92, 3, 3, 'mike, green dragons jump rope 92 jumps, july 10th'),
(1, 1, '2019-07-03', 47, 1, 1, 'mike, green dragons jump rope 47 jumps, july 3rd'),
(1, 1, '2019-07-17', 63, 2, 2, 'mike, green dragons jump rope 63 jumps, july 17th'),
(1, 2, '2019-07-20', 0, 0, 1, 'mike, green dragons smoothie'),
(2, 6, '2019-07-01', 155, 2, 2, 'ale, public half mile'),
(2, 6, '2019-07-08', 145, 2, 2, 'ale, public half mile'),
(2, 6, '2019-07-015', 120, 3, 3, 'ale, public half mile'),
(2, 1, '2019-07-03', 49, 1, 1, 'ale, green dragons jump rope 49 jumps, july 3rd'),
(2, 1, '2019-07-10', 72, 2, 2, 'ale, green dragons jump rope 72 jumps, july 10th'),
(2, 1, '2019-07-17', 95, 3, 3, 'ale, green dragons jump rope 95 jumps, july 17th'),
(2, 1, '2019-07-10', 78, 2, 2, 'ale, green dragons jump rope 78, july 10th'),
(2, 4, '2019-07-23', 126, 3, 3, 'ale, dragon root boxing'),
(3, 6, '2019-07-01', 150, 2, 2, 'drew, public half mile'),
(3, 6, '2019-07-08', 164, 1, 1, 'drew, public half mile'),
(3, 6, '2019-07-15', 125, 2, 2, 'drew, public half mile'),
(3, 1, '2019-07-03', 62, 2, 2, 'drew, green dragons jump rope 62 jumps, july 3rd'),
(3, 1, '2019-07-10', 39, 1, 1, 'drew, green dragons jump rope 39 jumps, july 10th'),
(3, 1, '2019-07-17', 78, 2, 2, 'drew, green dragons jump rope 78 jumps, july 17th'),
(3, 5, '2019-07-25', 12, 2, 2, 'drew, urban arrows archery accuracy'); 




--put in entries for all three of us for the public 1/2 mile run




    -- users_communities_challenges_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY, 
    -- users_id INTEGER REFERENCES users(users_id) ON DELETE CASCADE NOT NULL,  
    -- communities_challenges_id INTEGER REFERENCES communities_challenges(communities_challenges_id) ON DELETE CASCADE NOT NULL,
    -- entry_date DATE NOT NULL, 
    -- record INTEGER,
    -- stars INTEGER, 
    -- dragon_bucks NUMERIC (7, 2), 
    -- notes TEXT 
