-- Raz Stitching — order tracking table
-- Run in Supabase SQL Editor if the table does not exist yet.

create table if not exists public.orders (
  id uuid primary key default gen_random_uuid(),
  order_id text not null unique,
  phone text not null,
  customer_name text not null,
  garment text not null,
  franchise text,
  booked_on date,
  estimated_ready date,
  status text not null default 'confirmed' check (
    status in (
      'confirmed',
      'fabric_received',
      'cutting',
      'stitching',
      'fitting',
      'ready',
      'delivered'
    )
  ),
  status_note text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists orders_order_id_idx on public.orders (order_id);
create index if not exists orders_phone_idx on public.orders (phone);

alter table public.orders enable row level security;

-- Sample row (optional — remove after testing)
-- insert into public.orders (
--   order_id, phone, customer_name, garment, franchise,
--   booked_on, estimated_ready, status, status_note
-- ) values (
--   'RAZ-10482', '923002316659', 'Ahmed K.', 'Special shalwar kameez',
--   'Defence Phase 1', '2026-07-12', '2026-07-28', 'stitching',
--   'Collar finishing in progress — on schedule.'
-- );
