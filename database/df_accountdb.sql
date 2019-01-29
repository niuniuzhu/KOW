SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `account_user`
-- ----------------------------
DROP TABLE IF EXISTS `account_user`;
CREATE TABLE `account_user` (
  `id` int unsigned NOT NULL AUTO_INCREMENT,
  `uname` varchar(36) NOT NULL,
  `channel` tinyint unsigned DEFAULT 0 NOT NULL,
  `browser` tinyint unsigned DEFAULT 0 NOT NULL,
  `platform` tinyint unsigned DEFAULT 0 NOT NULL,
  `unionID` varchar(32) DEFAULT '' NOT NULL,
  `nickname` varchar(36) DEFAULT '' NOT NULL,
  `avatar` varchar(128) DEFAULT '' NOT NULL,
  `gender` tinyint unsigned DEFAULT 0 NOT NULL,
  `last_login_time` bigint(20) DEFAULT 0 NOT NULL,
  `last_login_ip` varchar(46) DEFAULT '' NOT NULL,
  `block` tinyint unsigned DEFAULT 0 NOT NULL,
  `money` int DEFAULT 0 NOT NULL,
  `diamoned` int DEFAULT 0 NOT NULL,
  `honor` int DEFAULT 0 NOT NULL,
  PRIMARY KEY (`id`),
  KEY `nickname_check` (`nickname`) USING BTREE
) ENGINE=InnoDB AUTO_INCREMENT=10000 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Procedure structure for `query_id`
-- ----------------------------
DROP PROCEDURE IF EXISTS `query_id`;
DELIMITER ;;
CREATE DEFINER=`ron`@`localhost` PROCEDURE `query_id`(IN _uname VARCHAR(32), IN _pwd VARCHAR(32), OUT xid INTEGER )
BEGIN   
	declare v_id  INT;
		
	SELECT id INTO v_id from account_user WHERE uname=_uname and pwd=_pwd;  
		 
	SET xid = v_id;
end
;;
DELIMITER ;
