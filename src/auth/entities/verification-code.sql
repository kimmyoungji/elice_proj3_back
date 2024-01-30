CREATE TABLE verification_code (
    verification_code_id uuid PRIMARY KEY,
    email varchar(50),
    code integer,
    created_date timestamp with time zone DEFAULT CURRENT_TIMESTAMP
);