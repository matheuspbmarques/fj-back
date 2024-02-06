CREATE TABLE IF NOT EXISTS clients(
	id uuid DEFAULT uuid_generate_v4(),
	name VARCHAR NOT NULL,
	email VARCHAR NOT NULL,
	phone VARCHAR NOT NULL
)