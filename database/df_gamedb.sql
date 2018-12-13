SET FOREIGN_KEY_CHECKS=0;

DROP TABLE IF EXISTS `gameuser`;
CREATE TABLE `gameuser` (
  `id` int(20) NOT NULL AUTO_INCREMENT,
  `obj_id` bigint(20) unsigned NOT NULL,
  `obj_name` varchar(64) COLLATE utf8_unicode_ci DEFAULT NULL,
  `obj_sex` int(4) NOT NULL DEFAULT '0',
  `obj_lv` int(8) NOT NULL DEFAULT '0',
  `obj_diamond` bigint(16) NOT NULL DEFAULT '0',
  `obj_gold` bigint(20) NOT NULL DEFAULT '0',
  `obj_register_time` bigint(20) NOT NULL DEFAULT '0',
  `obj_last_login_time` bigint(20) NOT NULL DEFAULT '0',
  `obj_cur_lv_exp` int(11) NOT NULL DEFAULT '0',
  `obj_vip_lv` int(8) NOT NULL DEFAULT '0',
  `obj_vip_score` int(16) NOT NULL DEFAULT '0',
  PRIMARY KEY (`id`,`obj_id`),
  KEY `szNickName` (`obj_name`)
) ENGINE=InnoDB AUTO_INCREMENT=1000 DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci ROW_FORMAT=COMPACT;