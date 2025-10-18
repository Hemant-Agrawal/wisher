-- Create the wishes table
CREATE TABLE wishes (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  message TEXT NOT NULL,
  headline TEXT,
  theme TEXT NOT NULL,
  image_url TEXT,
  sender_name TEXT,
  sender_number TEXT,
  sender_image_url TEXT,
  signature TEXT,
  signature_number TEXT,
  message_type TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE wishes ENABLE ROW LEVEL SECURITY;

-- Create policy to allow public read access
CREATE POLICY "Allow public read access" ON wishes
  FOR SELECT USING (true);

-- Create policy to allow public insert access
CREATE POLICY "Allow public insert access" ON wishes
  FOR INSERT WITH CHECK (true);

-- Create storage bucket for images
INSERT INTO storage.buckets (id, name, public) VALUES ('wish-images', 'wish-images', true);

-- Create policy for storage bucket
CREATE POLICY "Allow public uploads" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'wish-images');

CREATE POLICY "Allow public downloads" ON storage.objects
  FOR SELECT USING (bucket_id = 'wish-images');
