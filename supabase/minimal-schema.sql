-- Minimal working schema for InkWell - Run this if the main schema has issues
-- This creates just the essential tables to get started

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
    role user_role DEFAULT 'user',
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
    view_count INTEGER DEFAULT 0,
    like_count INTEGER DEFAULT 0,
    comment_count INTEGER DEFAULT 0,
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

-- Basic Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.comments ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.post_tags ENABLE ROW LEVEL SECURITY;

-- Basic policies
CREATE POLICY "Public profiles are viewable by everyone"
    ON public.profiles FOR SELECT
    USING (true);

CREATE POLICY "Published posts are viewable by everyone"
    ON public.posts FOR SELECT
    USING (status = 'published' OR auth.uid() = author_id);

CREATE POLICY "Users can create posts"
    ON public.posts FOR INSERT
    WITH CHECK (auth.uid() = author_id);

CREATE POLICY "Comments are viewable by everyone"
    ON public.comments FOR SELECT
    USING (true);

CREATE POLICY "Tags are viewable by everyone"
    ON public.tags FOR SELECT
    USING (true);

CREATE POLICY "Post tags are viewable by everyone"
    ON public.post_tags FOR SELECT
    USING (true);
