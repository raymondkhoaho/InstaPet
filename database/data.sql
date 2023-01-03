insert into "users" ("username", "hashedPassword", "profileImageUrl", "headerImageUrl")
values ('ryleyleho', 'password123', '/images/ryleyleho1.JPG', '/images/header.jpeg');

insert into "photos" ("userId", "imageUrl", "caption", "createdAt" )
values (1, '/images/ryleyleho1.JPG', 'ryleyleho-1', now()),
       (1, '/images/ryleyleho2.JPG', 'ryleyleho-2', now());
