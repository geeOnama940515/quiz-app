-- Initialize database for quiz results storage
-- This is optional and can be used if you want to store quiz results in a database

CREATE TABLE IF NOT EXISTS quiz_results (
    id SERIAL PRIMARY KEY,
    user_name VARCHAR(255) NOT NULL,
    score INTEGER NOT NULL,
    correct_answers INTEGER NOT NULL,
    total_questions INTEGER NOT NULL,
    time_spent INTEGER NOT NULL,
    answers JSONB NOT NULL,
    topic_stats JSONB NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    ip_address INET,
    user_agent TEXT
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_quiz_results_user_name ON quiz_results(user_name);
CREATE INDEX IF NOT EXISTS idx_quiz_results_score ON quiz_results(score);
CREATE INDEX IF NOT EXISTS idx_quiz_results_created_at ON quiz_results(created_at);

-- Create a view for analytics
CREATE OR REPLACE VIEW quiz_analytics AS
SELECT 
    DATE(created_at) as quiz_date,
    COUNT(*) as total_attempts,
    AVG(score) as average_score,
    MIN(score) as min_score,
    MAX(score) as max_score,
    AVG(time_spent) as average_time_minutes
FROM quiz_results 
GROUP BY DATE(created_at)
ORDER BY quiz_date DESC;

-- Sample query to get topic performance across all users
-- SELECT 
--     topic_stats->>'HTML' as html_performance,
--     topic_stats->>'C#' as csharp_performance,
--     topic_stats->>'Algorithm' as algorithm_performance
-- FROM quiz_results;