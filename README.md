# Example sql creation table:

```sql
-- Asegurarse de estar en el esquema público
create schema if not exists public;

-- Crear la tabla profiles
create table public.profiles (
    id uuid primary key references auth.users(id) on delete cascade, -- Relación con auth.users
    role text check (role in ('superadmin', 'admin', 'teacher', 'student')) not null, -- Rol con validación
    created_at timestamp with time zone default now() -- Marca de tiempo de creación
);

-- Permitir que los usuarios solo puedan ver su propio perfil
alter table public.profiles enable row level security;

-- Política para permitir que los usuarios actualicen su propio perfil
create policy "Users can update their own profile"
on public.profiles
for update
using (auth.uid() = id);

-- Política para permitir que los usuarios lean sus propios perfiles
create policy "Users can read their own profile"
on public.profiles
for select
using (auth.uid() = id);

-- Permitir que el sistema inserte registros (por ejemplo, en un trigger)
create policy "Enable inserts for authenticated users"
on public.profiles
for insert
with check (auth.uid() = id);

```

## Como insertar un perfil manualmente

```sql
insert into public.profiles (id, role)
values ('USER_ID_DE_SUPABASE', 'admin');
```
