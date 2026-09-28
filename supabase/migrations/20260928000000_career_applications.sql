-- Careers applications submitted from the website.
create table if not exists public.career_applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null check (char_length(full_name) between 1 and 200),
  email text not null check (char_length(email) between 3 and 320),
  phone text check (phone is null or char_length(phone) <= 30),
  area_of_interest text not null check (char_length(area_of_interest) <= 50),
  message text not null check (char_length(message) between 10 and 5000)
);

create index if not exists career_applications_created_at_idx
  on public.career_applications (created_at desc);

-- Row level security on, with no policies: the public anon/authenticated roles
-- can neither read nor write. Only the website's server (secret key) can.
alter table public.career_applications enable row level security;
revoke all on table public.career_applications from anon, authenticated;
