CREATE DEFINER=`root`@`localhost` TRIGGER `offer_AFTER_INSERT` AFTER INSERT ON `offer` FOR EACH ROW BEGIN
	DECLARE new_min_price DECIMAL(10,2);
    DECLARE new_max_price DECIMAL(10,2);
    
    SELECT MIN(price), MAX(price) 
    INTO new_min_price, new_max_price 
    FROM offer
    WHERE productId = NEW.productId AND status = 'ACTIVE';
    
    UPDATE product 
    SET minPrice = new_min_price, maxPrice = new_max_price 
    WHERE id = NEW.productId;
END

CREATE DEFINER=`root`@`localhost` TRIGGER `offer_AFTER_UPDATE` AFTER UPDATE ON `offer` FOR EACH ROW BEGIN
	DECLARE new_min_price DECIMAL(10,2);
    DECLARE new_max_price DECIMAL(10,2);
	DECLARE old_min_price DECIMAL(10,2);
	DECLARE old_max_price DECIMAL(10,2);
    
    SELECT MIN(price), MAX(price) 
    INTO new_min_price, new_max_price 
    FROM offer
    WHERE productId = NEW.productId AND status = 'ACTIVE';
    
    UPDATE product 
    SET minPrice = new_min_price, maxPrice = new_max_price 
    WHERE id = NEW.productId;
    
	IF NEW.productId <> OLD.productId THEN
		SELECT MIN(price), MAX(price) 
		INTO old_min_price, old_max_price 
		FROM offer
		WHERE productId = OLD.productId AND status = 'ACTIVE';
		
		UPDATE product
		SET minPrice = old_min_price, maxPrice = old_max_price 
		WHERE id = OLD.productId;
    END IF;
END

CREATE DEFINER=`root`@`localhost` TRIGGER `offer_AFTER_DELETE` AFTER DELETE ON `offer` FOR EACH ROW BEGIN
	DECLARE old_min_price DECIMAL(10,2);
	DECLARE old_max_price DECIMAL(10,2);
    
    SELECT MIN(price), MAX(price)
    INTO old_min_price, old_max_price
    FROM offer
    WHERE productId = OLD.productId AND status = 'ACTIVE';
    
    UPDATE product 
    SET minPrice = old_min_price, maxPrice = old_max_price 
    WHERE id = OLD.productId;
END