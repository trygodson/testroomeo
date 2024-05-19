import { MigrationInterface, QueryRunner } from "typeorm";

export class Migrations1716125066984 implements MigrationInterface {
    name = 'Migrations1716125066984'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "country" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "is_deleted" boolean NOT NULL DEFAULT false, "country_name" character varying(64), CONSTRAINT "PK_bf6e37c231c4f4ea56dcd887269" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "state" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "is_deleted" boolean NOT NULL DEFAULT false, "state_name" character varying(64), "countryId" integer, CONSTRAINT "PK_549ffd046ebab1336c3a8030a12" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "property_image" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "is_deleted" boolean NOT NULL DEFAULT false, "image_path" character varying(64), "propertyId" integer, CONSTRAINT "PK_7bc43b89d4104149dddea18cdf8" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."property_returns_rate_enum" AS ENUM('1', '2')`);
        await queryRunner.query(`CREATE TABLE "property" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "is_deleted" boolean NOT NULL DEFAULT false, "name" character varying(64), "address" character varying(64) NOT NULL, "currency" character varying(15) NOT NULL, "description" character varying(15) NOT NULL, "total_fraction" character varying(15) NOT NULL, "sold_fraction" character varying(15) NOT NULL, "price_per_fraction" character varying(15) NOT NULL, "returns_rate" "public"."property_returns_rate_enum" NOT NULL DEFAULT '1', "cityId" integer, CONSTRAINT "PK_d80743e6191258a5003d5843b4f" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "city" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "is_deleted" boolean NOT NULL DEFAULT false, "city_name" character varying(64), "stateId" integer, CONSTRAINT "PK_b222f51ce26f7e5ca86944a6739" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "refreshToken" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "is_deleted" boolean NOT NULL DEFAULT false, "token" character varying(32), "expiresAt" TIMESTAMP NOT NULL, "revoked" boolean NOT NULL DEFAULT false, "userId" integer, CONSTRAINT "PK_be91607b0697b092c2bdff83b45" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_gender_enum" AS ENUM('male', 'female')`);
        await queryRunner.query(`CREATE TYPE "public"."user_profile_level_enum" AS ENUM('1', '2')`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('1', '2')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "is_deleted" boolean NOT NULL DEFAULT false, "first_name" character varying(64), "last_name" character varying(64), "email" character varying(32), "phone" character varying(32), "password" character varying(64) NOT NULL, "gender" "public"."user_gender_enum", "profile_level" "public"."user_profile_level_enum" DEFAULT '1', "otp_code" character varying(8), "otp_verified" boolean DEFAULT false, "dob" date, "otp_expiry" date, "role" "public"."user_role_enum" DEFAULT '1', CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "wallet" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "is_deleted" boolean NOT NULL DEFAULT false, "balance" integer NOT NULL DEFAULT '0', "userId" integer, CONSTRAINT "PK_bec464dd8d54c39c54fd32e2334" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "waitlist" ("id" SERIAL NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP DEFAULT now(), "is_deleted" boolean NOT NULL DEFAULT false, "full_name" character varying(64), "email" character varying(64) NOT NULL, "phone" character varying(15) NOT NULL, CONSTRAINT "PK_973cfbedc6381485681d6a6916c" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "state" ADD CONSTRAINT "FK_e81c86ceadca8731f5fca8e06f5" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "property_image" ADD CONSTRAINT "FK_1f5f43978d27121a7ddd0c2e900" FOREIGN KEY ("propertyId") REFERENCES "property"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "property" ADD CONSTRAINT "FK_2c9571019f7b873765cf1ad4dcd" FOREIGN KEY ("cityId") REFERENCES "city"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "city" ADD CONSTRAINT "FK_e99de556ee56afe72154f3ed04a" FOREIGN KEY ("stateId") REFERENCES "state"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "refreshToken" ADD CONSTRAINT "FK_7008a2b0fb083127f60b5f4448e" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "wallet" ADD CONSTRAINT "FK_35472b1fe48b6330cd349709564" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "wallet" DROP CONSTRAINT "FK_35472b1fe48b6330cd349709564"`);
        await queryRunner.query(`ALTER TABLE "refreshToken" DROP CONSTRAINT "FK_7008a2b0fb083127f60b5f4448e"`);
        await queryRunner.query(`ALTER TABLE "city" DROP CONSTRAINT "FK_e99de556ee56afe72154f3ed04a"`);
        await queryRunner.query(`ALTER TABLE "property" DROP CONSTRAINT "FK_2c9571019f7b873765cf1ad4dcd"`);
        await queryRunner.query(`ALTER TABLE "property_image" DROP CONSTRAINT "FK_1f5f43978d27121a7ddd0c2e900"`);
        await queryRunner.query(`ALTER TABLE "state" DROP CONSTRAINT "FK_e81c86ceadca8731f5fca8e06f5"`);
        await queryRunner.query(`DROP TABLE "waitlist"`);
        await queryRunner.query(`DROP TABLE "wallet"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_profile_level_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_gender_enum"`);
        await queryRunner.query(`DROP TABLE "refreshToken"`);
        await queryRunner.query(`DROP TABLE "city"`);
        await queryRunner.query(`DROP TABLE "property"`);
        await queryRunner.query(`DROP TYPE "public"."property_returns_rate_enum"`);
        await queryRunner.query(`DROP TABLE "property_image"`);
        await queryRunner.query(`DROP TABLE "state"`);
        await queryRunner.query(`DROP TABLE "country"`);
    }

}
