CREATE TYPE "gender" AS ENUM ('Male', 'Female', 'Other');

CREATE TABLE "user" (
    "user_id" uuid NOT NULL,
    "email" varchar(50) NOT NULL UNIQUE,
    "provider_id" varchar(50) UNIQUE,
    "password" varchar(200),
    "username" varchar(50) NOT NULL UNIQUE,
    "birth_day" date,
    "gender" gender,
    "profile_image" varchar(50),
    "membership" boolean DEFAULT false,
    "created_date" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "updated_date" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    "deleted_date" timestamp with time zone,
    "health_info_id" uuid,
    PRIMARY KEY ("user_id"),
    FOREIGN KEY ("health_info_id") REFERENCES "health_info"("health_info_id")
);