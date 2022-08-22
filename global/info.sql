SELECT * FROM lots;
SELECT * FROM users;
SELECT * FROM products;


DROP TABLE lots;
DROP TABLE users;
DROP TABLE products;

INSERT INTO products (code, "name", link, "userId", "createdAt", "updatedAt")
VALUES ('7201219', 'AMP-4x25W', 'http://www.mowin-tech.com/ver-producto/134/amp-4x25w', 1, '2020-09-15T23:03:51.817Z','2020-09-15T23:03:51.817Z');

INSERT INTO lots (code, "date", quantity, "createdAt", "updatedAt", "userId", "productId")
VALUES ('789987', '2020-09-15T23:03:51.817Z', 20, '2020-09-15T23:03:51.817Z','2020-09-15T23:03:51.817Z', 1, 2);

UPDATE lots
SET "userId" = 1
WHERE id = 1;

UPDATE lots
SET "date" = '2020-09-15T05:00:00.000Z'
WHERE id = 1;
