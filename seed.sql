INSERT INTO nodes(name, domain, level, description, estimated_hours) VALUES
('Perception', 'Foundations', 'beginner', 'Awareness of senses', 5),
('Logic', 'Foundations', 'beginner', 'Basic reasoning', 10),
('Mathematics', 'Computation', 'intermediate', 'Numbers and algebra', 40),
('Programming', 'Computation', 'intermediate', 'Writing code', 60)
ON CONFLICT (name) DO NOTHING;

INSERT INTO edges(from_id, to_id)
SELECT (SELECT id FROM nodes WHERE name='Logic'),
       (SELECT id FROM nodes WHERE name='Mathematics')
ON CONFLICT DO NOTHING;
