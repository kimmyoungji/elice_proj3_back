CREATE TYPE "diet_goal" AS ENUM ('LoseWeight', 'GainWeight', 'MaintainWeight');
CREATE TYPE "activity_amount" AS ENUM ('Sedentary', 'LightlyActive', 'ModeratelyActive', 'VeryActive');

CREATE TABLE "health_info" (
    "health_info_id" uuid NOT NULL,
    "weight" int NOT NULL,
    "height" int NOT NULL,
    "target_weight" int NOT NULL,
    "goal" diet_goal NOT NULL,
    "activity_amount" activity_amount NOT NULL,
    "target_calories" int NOT NULL,
    "recommend_intake" int[] NOT NULL,
    "updated_date" timestamp with time zone DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY ("health_info_id")
);