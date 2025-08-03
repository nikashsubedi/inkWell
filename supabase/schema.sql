-- Supabase SQL Schema for InkWell Blog Platform
-- Run these commands in your Supabase SQL editor

-- Create custom types
CREATE TYPE post_status AS ENUM ('draft', 'published', 'archived');
CREATE TYPE user_role AS ENUM ('user', 'moderator', 'admin');

-- Users table (extends auth.users)
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT UNIQUE NOT NULL,
    username TEXT UNIQUE,
    full_name TEXT,
    bio TEXT,
    avatar_url TEXT,
    website TEXT,
    github_username TEXT,
    twitter_username TEXT,
    linkedin_username TEXT,
    location TEXT,
    role user_role DEFAULT 'user',
    email_verified BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Posts table
CREATE TABLE public.posts (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    title TEXT NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    content TEXT NOT NULL,
    excerpt TEXT,
    cover_image TEXT,
    author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    status post_status DEFAULT 'draft',
    published_at TIMESTAMP WITH TIME ZONE,
    reading_time INTEGER, -- in minutes
    view_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    comment_count INTEGER DEFAULT 0,
    bookmark_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tags table
CREATE TABLE public.tags (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT UNIQUE NOT NULL,
    slug TEXT UNIQUE NOT NULL,
    description TEXT,
    color TEXT DEFAULT '#6366f1',
    post_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Post-Tags junction table
CREATE TABLE public.post_tags (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
    tag_id UUID REFERENCES public.tags(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(post_id, tag_id)
);

-- Comments table
CREATE TABLE public.comments (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    content TEXT NOT NULL,
    author_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE NOT NULL,
    parent_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
    like_count INTEGER DEFAULT 0,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Likes table (for posts and comments)
CREATE TABLE public.likes (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE,
    comment_id UUID REFERENCES public.comments(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, post_id),
    UNIQUE(user_id, comment_id),
    CHECK ((post_id IS NOT NULL) OR (comment_id IS NOT NULL)),
    CHECK (NOT (post_id IS NOT NULL AND comment_id IS NOT NULL))
);

-- Bookmarks table
CREATE TABLE public.bookmarks (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    post_id UUID REFERENCES public.posts(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(user_id, post_id)
);

-- Follows table (user following system)
CREATE TABLE public.follows (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    follower_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    following_id UUID REFERENCES public.profiles(id) ON DELETE CASCADE NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    UNIQUE(follower_id, following_id),
    CHECK (follower_id != following_id)
);

-- Create indexes for better performance
CREATE INDEX idx_posts_author_id ON public.posts(author_id);
CREATE INDEX idx_posts_status ON public.posts(status);
CREATE INDEX idx_posts_published_at ON public.posts(published_at DESC);
CREATE INDEX idx_posts_slug ON public.posts(slug);
CREATE INDEX idx_comments_post_id ON public.comments(post_id);
CREATE INDEX idx_comments_author_id ON public.comments(author_id);
CREATE INDEX idx_post_tags_post_id ON public.post_tags(post_id);
CREATE INDEX idx_post_tags_tag_id ON public.post_tags(tag_id);
CREATE INDEX idx_likes_user_id ON public.likes(user_id);
CREATE INDEX idx_likes_post_id ON public.likes(post_id);
CREATE INDEX idx_bookmarks_user_id ON public.bookmarks(user_id);
CREATE INDEX idx_follows_follower_id ON public.follows(follower_id);
CREATE INDEX idx_follows_following_id ON public.follows(following_id);

-- Create functions for updating timestamps
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = NOW();
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers for updated_at
CREATE TRIGGER update_profiles_updated_at BEFORE UPDATE ON public.profiles
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_posts_updated_at BEFORE UPDATE ON public.posts
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_comments_updated_at BEFORE UPDATE ON public.comments
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to create profile on user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name)
    VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger to create profile on signup
CREATE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Row Level Security Policies

-- Profiles policies
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Public profiles are viewable by everyone"
    ON public.profiles FOR SELECT
    USING (true);

CREATE POLICY "Users can update own profile"
    ON public.profiles FOR UPDATE
    USING (auth.uid() = id);

-- Posts policies
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Published posts are viewable by everyone"
    ON public.posts FOR SELECT
    USING (status = 'published' OR auth.uid() = author_id);

CREATE POLICY "Users can create posts"
    ON public.posts FOR INSERT
    WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update own posts"
    ON public.posts FOR UPDATE
    USING (auth.uid() = author_id);

CREATE POLICY "Users can delete own posts"
    ON public.posts FOR DELETE
    USING (auth.uid() = author_id);

-- Comments policies
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Comments are viewable by everyone"
    ON public.comments FOR SELECT
    USING (true);

CREATE POLICY "Authenticated users can create comments"
    ON public.comments FOR INSERT
    WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Users can update own comments"
    ON public.comments FOR UPDATE
    USING (auth.uid() = author_id);

CREATE POLICY "Users can delete own comments"
    ON public.comments FOR DELETE
    USING (auth.uid() = author_id);

-- Tags policies
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Tags are viewable by everyone"
    ON public.tags FOR SELECT
    USING (true);

-- Post-tags policies
ALTER TABLE public.post_tags ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Post tags are viewable by everyone"
    ON public.post_tags FOR SELECT
    USING (true);

-- Likes policies
ALTER TABLE public.likes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own likes"
    ON public.likes FOR ALL
    USING (auth.uid() = user_id);

-- Bookmarks policies
ALTER TABLE public.bookmarks ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own bookmarks"
    ON public.bookmarks FOR ALL
    USING (auth.uid() = user_id);

-- Follows policies
ALTER TABLE public.follows ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can manage own follows"
    ON public.follows FOR ALL
    USING (auth.uid() = follower_id);

CREATE POLICY "Follow relationships are viewable by everyone"
    ON public.follows FOR SELECT
    USING (true);

-- Storage policies for images
INSERT INTO storage.buckets (id, name, public) VALUES ('avatars', 'avatars', true);
INSERT INTO storage.buckets (id, name, public) VALUES ('post-images', 'post-images', true);

-- Avatar storage policies
CREATE POLICY "Avatar images are publicly accessible"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload their own avatar"
    ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

CREATE POLICY "Users can update their own avatar"
    ON storage.objects FOR UPDATE
    USING (bucket_id = 'avatars' AND auth.uid()::text = (storage.foldername(name))[1]);

-- Post images storage policies
CREATE POLICY "Post images are publicly accessible"
    ON storage.objects FOR SELECT
    USING (bucket_id = 'post-images');

CREATE POLICY "Authenticated users can upload post images"
    ON storage.objects FOR INSERT
    WITH CHECK (bucket_id = 'post-images' AND auth.role() = 'authenticated');
