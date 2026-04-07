-- Insert sample books for testing
INSERT INTO books (title, author, isbn, description, genre, tags, page_count, publication_date) VALUES
('The Midnight Library', 'Matt Haig', '978-0525559474', 'Between life and death there is a library, and within that library, the shelves go on forever. Every book provides a chance to try another life you could have lived.', ARRAY['Fiction', 'Fantasy', 'Philosophy'], ARRAY['choice', 'regret', 'possibility'], 288, '2020-08-13'),
('Project Hail Mary', 'Andy Weir', '978-0593135204', 'A lone astronaut must save humanity from an extinction-level threat in this propulsive sci-fi thriller.', ARRAY['Science Fiction', 'Adventure'], ARRAY['space', 'science', 'survival'], 476, '2021-05-04'),
('Klara and the Sun', 'Kazuo Ishiguro', '978-0593318171', 'A look at our changing world through the eyes of an artificial friend.', ARRAY['Literary Fiction', 'Science Fiction'], ARRAY['AI', 'friendship', 'future'], 303, '2021-03-02'),
('The Seven Husbands of Evelyn Hugo', 'Taylor Jenkins Reid', '978-1501161933', 'Aging and reclusive Hollywood movie icon Evelyn Hugo is finally ready to tell the truth about her glamorous and scandalous life.', ARRAY['Romance', 'Historical Fiction'], ARRAY['Hollywood', 'LGBTQ+', 'love'], 400, '2017-06-13'),
('Atomic Habits', 'James Clear', '978-0735211292', 'No matter your goals, Atomic Habits offers a proven framework for improving every day.', ARRAY['Self-Help', 'Psychology'], ARRAY['habits', 'productivity', 'self-improvement'], 320, '2018-10-16'),
('Where the Crawdads Sing', 'Delia Owens', '978-0735219090', 'A coming-of-age murder mystery set in the marshes of North Carolina.', ARRAY['Mystery', 'Literary Fiction'], ARRAY['nature', 'coming-of-age', 'mystery'], 368, '2018-08-14'),
('The Silent Patient', 'Alex Michaelides', '978-1250301697', 'A woman shoots her husband and then never speaks another word. A psychotherapist becomes obsessed with treating her.', ARRAY['Psychological Thriller', 'Mystery'], ARRAY['psychology', 'suspense', 'mystery'], 336, '2019-02-05'),
('Educated', 'Tara Westover', '978-0399590504', 'A memoir about a young woman who leaves her survivalist family to pursue education.', ARRAY['Memoir', 'Biography'], ARRAY['education', 'family', 'resilience'], 334, '2018-02-20'),
('The Alchemist', 'Paulo Coelho', '978-0062315007', 'A mystical story about Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure.', ARRAY['Fiction', 'Philosophy', 'Adventure'], ARRAY['journey', 'destiny', 'wisdom'], 208, '1993-05-01'),
('Dune', 'Frank Herbert', '978-0441013593', 'Set on the desert planet Arrakis, Dune is the story of the boy Paul Atreides and his journey to fulfill his destiny.', ARRAY['Science Fiction', 'Adventure'], ARRAY['desert', 'politics', 'prophecy'], 688, '1965-08-01');

-- Associate books with moods for recommendations
INSERT INTO book_moods (book_id, mood_id, confidence_score) 
SELECT b.id, m.id, 0.8
FROM books b, moods m 
WHERE b.title = 'The Midnight Library' AND m.name IN ('Thoughtful', 'Mysterious');

INSERT INTO book_moods (book_id, mood_id, confidence_score) 
SELECT b.id, m.id, 0.9
FROM books b, moods m 
WHERE b.title = 'Project Hail Mary' AND m.name IN ('Adventurous', 'Inspired');

INSERT INTO book_moods (book_id, mood_id, confidence_score) 
SELECT b.id, m.id, 0.7
FROM books b, moods m 
WHERE b.title = 'Klara and the Sun' AND m.name IN ('Thoughtful', 'Cozy');

INSERT INTO book_moods (book_id, mood_id, confidence_score) 
SELECT b.id, m.id, 0.8
FROM books b, moods m 
WHERE b.title = 'The Seven Husbands of Evelyn Hugo' AND m.name IN ('Romantic', 'Nostalgic');

INSERT INTO book_moods (book_id, mood_id, confidence_score) 
SELECT b.id, m.id, 0.9
FROM books b, moods m 
WHERE b.title = 'Atomic Habits' AND m.name IN ('Inspired', 'Educational');

INSERT INTO book_moods (book_id, mood_id, confidence_score) 
SELECT b.id, m.id, 0.7
FROM books b, moods m 
WHERE b.title = 'Where the Crawdads Sing' AND m.name IN ('Cozy', 'Mysterious');

INSERT INTO book_moods (book_id, mood_id, confidence_score) 
SELECT b.id, m.id, 0.8
FROM books b, moods m 
WHERE b.title = 'The Silent Patient' AND m.name IN ('Mysterious', 'Thoughtful');

INSERT INTO book_moods (book_id, mood_id, confidence_score) 
SELECT b.id, m.id, 0.8
FROM books b, moods m 
WHERE b.title = 'Educated' AND m.name IN ('Inspired', 'Educational');

INSERT INTO book_moods (book_id, mood_id, confidence_score) 
SELECT b.id, m.id, 0.9
FROM books b, moods m 
WHERE b.title = 'The Alchemist' AND m.name IN ('Inspired', 'Adventurous');

INSERT INTO book_moods (book_id, mood_id, confidence_score) 
SELECT b.id, m.id, 0.8
FROM books b, moods m 
WHERE b.title = 'Dune' AND m.name IN ('Adventurous', 'Mysterious');
