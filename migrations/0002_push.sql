create table if not exists push_config (
  id integer primary key,
  public_key text not null,
  private_key text not null
);

create table if not exists push_subscriptions (
  endpoint text primary key,
  p256dh text not null,
  auth text not null,
  tz_offset_min integer not null,
  hour integer not null default 9,
  last_sent text
);
