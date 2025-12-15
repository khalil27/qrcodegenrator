/*
  # QR Custom Generator - Database Schema

  1. New Tables
    - `qr_codes`
      - `id` (uuid, primary key) - Unique identifier for each QR code
      - `user_id` (uuid, nullable) - Reference to auth.users if user is authenticated
      - `content_type` (text) - Type of content (url, text, email, phone, wifi, location)
      - `content` (text) - The actual content/data encoded in the QR code
      - `qr_color` (text) - Foreground color of the QR code (hex)
      - `bg_color` (text) - Background color of the QR code (hex)
      - `size` (integer) - Size of the QR code in pixels
      - `logo_url` (text, nullable) - URL to uploaded logo if any
      - `error_correction` (text) - Error correction level (L, M, Q, H)
      - `corner_style` (text) - Style of corners (square, rounded, dots)
      - `template_name` (text, nullable) - Name of template used if any
      - `qr_data_url` (text) - Base64 data URL of generated QR code
      - `created_at` (timestamptz) - Timestamp of creation
      
  2. Security
    - Enable RLS on `qr_codes` table
    - Add policy for users to read their own QR codes
    - Add policy for users to insert their own QR codes
    - Add policy for users to delete their own QR codes
    - Add policy for anonymous users to insert QR codes (stored with null user_id)
*/

CREATE TABLE IF NOT EXISTS qr_codes (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
  content_type text NOT NULL DEFAULT 'url',
  content text NOT NULL,
  qr_color text NOT NULL DEFAULT '#000000',
  bg_color text NOT NULL DEFAULT '#FFFFFF',
  size integer NOT NULL DEFAULT 300,
  logo_url text,
  error_correction text NOT NULL DEFAULT 'M',
  corner_style text NOT NULL DEFAULT 'square',
  template_name text,
  qr_data_url text NOT NULL,
  created_at timestamptz DEFAULT now()
);

ALTER TABLE qr_codes ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Users can view their own QR codes"
  ON qr_codes
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can insert their own QR codes"
  ON qr_codes
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can delete their own QR codes"
  ON qr_codes
  FOR DELETE
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Anonymous users can insert QR codes"
  ON qr_codes
  FOR INSERT
  TO anon
  WITH CHECK (user_id IS NULL);

CREATE POLICY "Anonymous users can view their session QR codes"
  ON qr_codes
  FOR SELECT
  TO anon
  USING (user_id IS NULL);

CREATE INDEX idx_qr_codes_user_id ON qr_codes(user_id);
CREATE INDEX idx_qr_codes_created_at ON qr_codes(created_at DESC);