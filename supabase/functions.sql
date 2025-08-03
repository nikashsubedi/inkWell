-- Additional SQL functions for InkWell
-- Add these to your Supabase SQL editor

-- Function to increment view count
CREATE OR REPLACE FUNCTION increment_view_count(post_id UUID)
RETURNS void AS $$
BEGIN
    UPDATE public.posts 
    SET view_count = view_count + 1 
    WHERE id = post_id;
END;
$$ LANGUAGE plpgsql;

-- Function to update like count
CREATE OR REPLACE FUNCTION update_like_count(post_id UUID, increment_by INTEGER)
RETURNS void AS $$
BEGIN
    UPDATE public.posts 
    SET like_count = like_count + increment_by 
    WHERE id = post_id;
END;
$$ LANGUAGE plpgsql;

-- Function to update comment count
CREATE OR REPLACE FUNCTION update_comment_count(post_id UUID, increment_by INTEGER)
RETURNS void AS $$
BEGIN
    UPDATE public.posts 
    SET comment_count = comment_count + increment_by 
    WHERE id = post_id;
END;
$$ LANGUAGE plpgsql;

-- Function to update bookmark count
CREATE OR REPLACE FUNCTION update_bookmark_count(post_id UUID, increment_by INTEGER)
RETURNS void AS $$
BEGIN
    UPDATE public.posts 
    SET bookmark_count = bookmark_count + increment_by 
    WHERE id = post_id;
END;
$$ LANGUAGE plpgsql;

-- Function to update tag post count
CREATE OR REPLACE FUNCTION update_tag_post_count()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'INSERT' THEN
        UPDATE public.tags 
        SET post_count = post_count + 1 
        WHERE id = NEW.tag_id;
        RETURN NEW;
    ELSIF TG_OP = 'DELETE' THEN
        UPDATE public.tags 
        SET post_count = post_count - 1 
        WHERE id = OLD.tag_id;
        RETURN OLD;
    END IF;
    RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Trigger to update tag post count
CREATE TRIGGER trigger_update_tag_post_count
    AFTER INSERT OR DELETE ON public.post_tags
    FOR EACH ROW
    EXECUTE FUNCTION update_tag_post_count();

-- Function to get popular tags
CREATE OR REPLACE FUNCTION get_popular_tags(limit_count INTEGER DEFAULT 10)
RETURNS TABLE (
    id UUID,
    name TEXT,
    slug TEXT,
    color TEXT,
    post_count INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT t.id, t.name, t.slug, t.color, t.post_count
    FROM public.tags t
    WHERE t.post_count > 0
    ORDER BY t.post_count DESC, t.name ASC
    LIMIT limit_count;
END;
$$ LANGUAGE plpgsql;

-- Function to search posts
CREATE OR REPLACE FUNCTION search_posts(
    search_query TEXT,
    limit_count INTEGER DEFAULT 10,
    offset_count INTEGER DEFAULT 0
)
RETURNS TABLE (
    id UUID,
    title TEXT,
    slug TEXT,
    excerpt TEXT,
    author_name TEXT,
    author_username TEXT,
    created_at TIMESTAMP WITH TIME ZONE,
    like_count INTEGER,
    view_count INTEGER,
    comment_count INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.id,
        p.title,
        p.slug,
        p.excerpt,
        pr.full_name as author_name,
        pr.username as author_username,
        p.created_at,
        p.like_count,
        p.view_count,
        p.comment_count
    FROM public.posts p
    JOIN public.profiles pr ON p.author_id = pr.id
    WHERE 
        p.status = 'published' AND
        (
            p.title ILIKE '%' || search_query || '%' OR
            p.content ILIKE '%' || search_query || '%' OR
            p.excerpt ILIKE '%' || search_query || '%' OR
            pr.full_name ILIKE '%' || search_query || '%' OR
            pr.username ILIKE '%' || search_query || '%'
        )
    ORDER BY p.created_at DESC
    LIMIT limit_count
    OFFSET offset_count;
END;
$$ LANGUAGE plpgsql;

-- Function to get user feed (posts from followed users)
CREATE OR REPLACE FUNCTION get_user_feed(
    user_id UUID,
    limit_count INTEGER DEFAULT 10,
    offset_count INTEGER DEFAULT 0
)
RETURNS TABLE (
    id UUID,
    title TEXT,
    slug TEXT,
    excerpt TEXT,
    cover_image TEXT,
    author_id UUID,
    author_name TEXT,
    author_username TEXT,
    author_avatar TEXT,
    created_at TIMESTAMP WITH TIME ZONE,
    like_count INTEGER,
    view_count INTEGER,
    comment_count INTEGER,
    reading_time INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        p.id,
        p.title,
        p.slug,
        p.excerpt,
        p.cover_image,
        p.author_id,
        pr.full_name as author_name,
        pr.username as author_username,
        pr.avatar_url as author_avatar,
        p.created_at,
        p.like_count,
        p.view_count,
        p.comment_count,
        p.reading_time
    FROM public.posts p
    JOIN public.profiles pr ON p.author_id = pr.id
    JOIN public.follows f ON f.following_id = p.author_id
    WHERE 
        p.status = 'published' AND
        f.follower_id = user_id
    ORDER BY p.created_at DESC
    LIMIT limit_count
    OFFSET offset_count;
END;
$$ LANGUAGE plpgsql;

-- Function to get post statistics for dashboard
CREATE OR REPLACE FUNCTION get_user_post_stats(user_id UUID)
RETURNS TABLE (
    total_posts INTEGER,
    total_views INTEGER,
    total_likes INTEGER,
    total_comments INTEGER,
    published_posts INTEGER,
    draft_posts INTEGER
) AS $$
BEGIN
    RETURN QUERY
    SELECT 
        COUNT(*)::INTEGER as total_posts,
        COALESCE(SUM(view_count), 0)::INTEGER as total_views,
        COALESCE(SUM(like_count), 0)::INTEGER as total_likes,
        COALESCE(SUM(comment_count), 0)::INTEGER as total_comments,
        COUNT(CASE WHEN status = 'published' THEN 1 END)::INTEGER as published_posts,
        COUNT(CASE WHEN status = 'draft' THEN 1 END)::INTEGER as draft_posts
    FROM public.posts
    WHERE author_id = user_id;
END;
$$ LANGUAGE plpgsql;
