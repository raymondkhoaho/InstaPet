set client_min_messages to warning;

-- DANGER: this is NOT how to do it in the real world.
-- `drop schema` INSTANTLY ERASES EVERYTHING.
drop schema "public" cascade;

create schema "public";

CREATE TABLE "public"."users" (
	"userId" serial NOT NULL,
	"username" TEXT NOT NULL UNIQUE,
	"hashedPassword" TEXT NOT NULL,
	"profileImageUrl" TEXT NOT NULL,
	"headerImageUrl" TEXT NOT NULL,
	"createdAt" TIMESTAMP NOT NULL,
	CONSTRAINT "users_pk" PRIMARY KEY ("userId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."photos" (
	"photoId" serial NOT NULL,
	"imageUrl" TEXT NOT NULL,
	"caption" TEXT NOT NULL,
	"createdAt" TIMESTAMP NOT NULL,
	"userId" integer NOT NULL,
	CONSTRAINT "photos_pk" PRIMARY KEY ("photoId")
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."likes" (
	"photoId" integer NOT NULL,
	"userId" integer NOT NULL,
	"liked" BOOLEAN NOT NULL
) WITH (
  OIDS=FALSE
);



CREATE TABLE "public"."comments" (
	"commentId" serial NOT NULL,
	"photoId" integer NOT NULL,
	"comment" TEXT NOT NULL,
	"userId" integer NOT NULL,
	"createdAt" TIMESTAMP NOT NULL,
	CONSTRAINT "comments_pk" PRIMARY KEY ("commentId")
) WITH (
  OIDS=FALSE
);




ALTER TABLE "photos" ADD CONSTRAINT "photos_fk0" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "likes" ADD CONSTRAINT "likes_fk0" FOREIGN KEY ("photoId") REFERENCES "photos"("photoId");
ALTER TABLE "likes" ADD CONSTRAINT "likes_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");

ALTER TABLE "comments" ADD CONSTRAINT "comments_fk0" FOREIGN KEY ("photoId") REFERENCES "photos"("photoId");
ALTER TABLE "comments" ADD CONSTRAINT "comments_fk1" FOREIGN KEY ("userId") REFERENCES "users"("userId");
