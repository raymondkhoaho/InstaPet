insert into "users" ("username", "hashedPassword", "profileImageUrl")
values ('ryleyleho', 'password123', '/images/ryleyleho1.JPG'),
       ('teddibendel', 'password456', '/images/teddibendel1.JPG'),
       ('limbani', 'password234', '/images/limbani1.JPG'),
       ('juniper', 'password789', '/images/juniper1.JPG');

insert into "photos" ("userId", "imageUrl", "caption")
values (1, '/images/ryleyleho1.JPG', 'ryleyleho-1'),
       (1, '/images/ryleyleho2.JPG', 'ryleyleho-2'),
       (1, '/images/ryleyleho3.JPG', 'ryleyleho-3'),
       (1, '/images/ryleyleho4.JPG', 'ryleyleho-4'),
       (1, '/images/ryleyleho5.JPG', 'ryleyleho-5'),
       (2, '/images/teddibendel1.JPG', 'teddibendel-1'),
       (2, '/images/teddibendel2.JPG', 'teddibendel-2'),
       (2, '/images/teddibendel3.JPG', 'teddibendel-3'),
       (2, '/images/teddibendel4.JPG', 'teddibendel-4'),
       (2, '/images/teddibendel5.JPG', 'teddibendel-5'),
       (3, '/images/limbani1.JPG', 'limbani-1'),
       (3, '/images/limbani2.JPG', 'limbani-2'),
       (3, '/images/limbani3.JPG', 'limbani-3'),
       (3, '/images/limbani4.JPG', 'limbani-4'),
       (3, '/images/limbani5.JPG', 'limbani-5'),
       (4, '/images/juniper1.JPG', 'juniper-1'),
       (4, '/images/juniper2.JPG', 'juniper-2'),
       (4, '/images/juniper3.JPG', 'juniper-3'),
       (4, '/images/juniper4.JPG', 'juniper-4'),
       (4, '/images/juniper5.JPG', 'juniper-5');
