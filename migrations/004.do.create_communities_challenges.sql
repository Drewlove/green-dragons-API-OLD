DROP TABLE IF EXISTS communities_challenges; 

CREATE TABLE communities_challenges(
    communities_challenges_id INTEGER PRIMARY KEY GENERATED BY DEFAULT AS IDENTITY,
    communities_id INTEGER REFERENCES communities(communities_id) ON DELETE CASCADE NOT NULL, 
    challenges_id INTEGER REFERENCES challenges(challenges_id) ON DELETE CASCADE NOT NULL, 
    open_date DATE NOT NULL DEFAULT CURRENT_DATE, 
    close_date DATE NOT NULL, 
    stars_one INTEGER,
    stars_two INTEGER,
    stars_three INTEGER, 
    stars_one_bucks NUMERIC(7, 2),
    stars_two_bucks NUMERIC(7, 2),
    stars_three_bucks NUMERIC(7, 2)
);