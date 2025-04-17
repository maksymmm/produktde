-- database/schema.sql
CREATE DATABASE produktde;
USE produktde;

CREATE TABLE products (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(255),
  price DECIMAL(10,2),
  image_url VARCHAR(255),
  purchase_url VARCHAR(255),
  manufacturer VARCHAR(100),
  made_in_germany BOOLEAN,
  category VARCHAR(100),
  description TEXT,
  de_name VARCHAR(255),
  en_name VARCHAR(255),
  de_description TEXT,
  en_description TEXT
);

-- Приклад даних
INSERT INTO products (name, price, image_url, purchase_url, manufacturer, made_in_germany, category, description, de_name, en_name, de_description, en_description)
VALUES (
  'Bosch Serie 6 Waschmaschine', 649.00, 'https://m.media-amazon.com/images/I/71xQ1t3vW4L._AC_SL1500_.jpg',
  'https://www.amazon.de/Bosch-WAU28T40-Serie-Waschmaschine-Frontlader/dp/B08J8C7V5P', 'Bosch', TRUE, 'Haushaltsgeräte',
  'Hochwertige Waschmaschine, Made in Germany', 'Bosch Serie 6 Waschmaschine', 'Bosch Serie 6 Washing Machine',
  'Hochwertige Waschmaschine, Made in Germany', 'High-quality washing machine, Made in Germany'
),
(
  'WMF Provence Plus Topfset', 199.99, 'https://m.media-amazon.com/images/I/71vL8zB5J7L._AC_SL1500_.jpg',
  'https://www.amazon.de/WMF-Provence-Topfset-5-teilig-Edelstahl/dp/B00008WWT2', 'WMF', TRUE, 'Küchenbedarf',
  '5-teiliges Topfset, Made in Germany', 'WMF Provence Plus Topfset', 'WMF Provence Plus Cookware Set',
  '5-teiliges Topfset, Made in Germany', '5-piece cookware set, Made in Germany'
);
