PRAGMA foreign_keys = ON;

create table if not exists users (
	user_id text primary key not null,
	username varchar(35) not null,
	email text not null,
	status text,
	country text,
	password_hash text not null,
	registered integer not null,
	valid_tokens text,
	verified_email boolean not null,
	type text not null,
	preferences text not null,
	avatar text,
	presence text
);

create table if not exists games (
	game_id text primary key not null,
	parent_game text,
	moves text,
	player_1_id text not null,
	player_2_id text,
	outcome text,
	created integer,
	started integer,
	last_activity integer,
	duration integer,
	rating_delta_player_1 integer,
	rating_delta_player_2 integer,
	status text not null,
	ruleset text not null,
	private boolean not null,
	debug boolean not null,
	foreign key(player_1_id) references users(user_id),
	foreign key(player_2_id) references users(user_id)
);

create table if not exists social (
	user_id text not null,
	friends text,
	blocked text,
	pending text,
	foreign key(user_id) references users(user_id)
);

