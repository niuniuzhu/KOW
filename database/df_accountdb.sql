SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `account_user`
-- ----------------------------
DROP TABLE IF EXISTS `account_user`;
CREATE TABLE `account_user` (
  `id` int (11) unsigned NOT NULL AUTO_INCREMENT,
  `channel` tinyint(4) unsigned NOT NULL,
  `browser` tinyint(4) unsigned NOT NULL,
  `platform` tinyint(4) unsigned NOT NULL,
  `uname` varchar(36) NOT NULL,
  `pwd` varchar(32) NOT NULL,
  `last_login_time` bigint(20) NOT NULL,
  `last_login_ip` varchar(46) NOT NULL,
  `block` int(11) DEFAULT 0 NOT NULL,
  PRIMARY KEY (`id`),
  KEY `uname_check` (`uname`) USING BTREE
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
