/*
SQLyog v10.2 
MySQL - 5.5.28 : Database - huoye
*********************************************************************
*/

/*!40101 SET NAMES utf8 */;

/*!40101 SET SQL_MODE=''*/;

/*!40014 SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0 */;
/*!40014 SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0 */;
/*!40101 SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='NO_AUTO_VALUE_ON_ZERO' */;
/*!40111 SET @OLD_SQL_NOTES=@@SQL_NOTES, SQL_NOTES=0 */;
/*Table structure for table `_menugroup` */

CREATE TABLE `_menugroup` (
  `tf_menuGroupId` varchar(10) NOT NULL,
  `tf_description` varchar(50) DEFAULT NULL,
  `tf_expand` bit(1) DEFAULT NULL,
  `tf_glyph` bit(1) DEFAULT NULL,
  `tf_iconURL` varchar(50) DEFAULT NULL,
  `tf_remark` varchar(255) DEFAULT NULL,
  `tf_title` varchar(50) NOT NULL,
  `xcode` varchar(50) NOT NULL,
  `orderIndex` int(11) NOT NULL,
  PRIMARY KEY (`tf_menuGroupId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `_menugroup` */

/*Table structure for table `_menumodule` */

CREATE TABLE `_menumodule` (
  `tf_menuModuleId` int(11) NOT NULL,
  `tf_ModuleId` varchar(255) DEFAULT NULL,
  `tf_addSeparator` bit(1) DEFAULT NULL,
  `tf_orderId` int(11) NOT NULL,
  `tf_parentFilter` varchar(255) DEFAULT NULL,
  `tf_parentMenu` varchar(20) DEFAULT NULL,
  `tf_title` varchar(50) DEFAULT NULL,
  `tf_menuGroupId` varchar(10) NOT NULL,
  `xcode` varchar(50) NOT NULL,
  `orderIndex` int(11) NOT NULL,
  PRIMARY KEY (`tf_menuModuleId`),
  KEY `FK_2771o72f01i7j9wxybdlg4k3o` (`tf_menuGroupId`),
  KEY `FK_24ajwcwhslp67guoe8behxbm6` (`tf_ModuleId`),
  CONSTRAINT `FK_24ajwcwhslp67guoe8behxbm6` FOREIGN KEY (`tf_ModuleId`) REFERENCES `_module` (`tf_moduleId`),
  CONSTRAINT `FK_2771o72f01i7j9wxybdlg4k3o` FOREIGN KEY (`tf_menuGroupId`) REFERENCES `_menugroup` (`tf_menuGroupId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `_menumodule` */

/*Table structure for table `_module` */

CREATE TABLE `_module` (
  `tf_moduleId` varchar(10) NOT NULL,
  `tf_allowEditExcel` bit(1) NOT NULL,
  `tf_allowInsertExcel` bit(1) NOT NULL,
  `tf_canLimit` bit(1) NOT NULL,
  `tf_codeField` varchar(50) DEFAULT NULL,
  `tf_codeLevel` varchar(50) DEFAULT NULL,
  `tf_dateField` varchar(50) DEFAULT NULL,
  `tf_defaultOrderField` varchar(255) DEFAULT NULL,
  `tf_description` varchar(50) DEFAULT NULL,
  `tf_englishname` varchar(20) DEFAULT NULL,
  `tf_fileField` varchar(50) DEFAULT NULL,
  `tf_hasAddition` bit(1) NOT NULL,
  `tf_hasApprove` bit(1) NOT NULL,
  `tf_hasAuditing` bit(1) NOT NULL,
  `tf_hasBrowse` bit(1) NOT NULL,
  `tf_hasChart` bit(1) NOT NULL,
  `tf_hasDelete` bit(1) NOT NULL,
  `tf_hasEdit` bit(1) NOT NULL,
  `tf_hasExec` bit(1) NOT NULL,
  `tf_hasInsert` bit(1) NOT NULL,
  `tf_hasPayment` bit(1) NOT NULL,
  `tf_homePageTag` varchar(50) DEFAULT NULL,
  `tf_iconURL` varchar(50) DEFAULT NULL,
  `tf_isEnable` bit(1) NOT NULL,
  `tf_isInlineOper` bit(1) NOT NULL,
  `tf_isSystem` bit(1) NOT NULL,
  `tf_linkedModule` varchar(200) DEFAULT NULL,
  `tf_moduleName` varchar(50) NOT NULL,
  `tf_monthField` varchar(50) DEFAULT NULL,
  `tf_nameFields` varchar(50) NOT NULL,
  `tf_orderField` varchar(50) DEFAULT NULL,
  `tf_primaryKey` varchar(50) NOT NULL,
  `tf_remark` varchar(255) DEFAULT NULL,
  `tf_requestMapping` varchar(50) NOT NULL,
  `tf_searchCondOrder` int(11) DEFAULT NULL,
  `tf_seasonField` varchar(50) DEFAULT NULL,
  `tf_shortname` varchar(20) DEFAULT NULL,
  `tf_tableName` varchar(50) NOT NULL,
  `tf_title` varchar(50) NOT NULL,
  `tf_titleTpl` varchar(200) DEFAULT NULL,
  `tf_yearfield` varchar(50) DEFAULT NULL,
  `tf_moduleGroupId` varchar(10) NOT NULL,
  `xcode` varchar(50) NOT NULL,
  `orderIndex` int(11) NOT NULL,
  PRIMARY KEY (`tf_moduleId`),
  KEY `FK_e5ntke8seo3rd4otrqp5d5pwo` (`tf_moduleGroupId`),
  CONSTRAINT `FK_e5ntke8seo3rd4otrqp5d5pwo` FOREIGN KEY (`tf_moduleGroupId`) REFERENCES `_modulegroup` (`tf_moduleGroupId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `_module` */

/*Table structure for table `_modulefield` */

CREATE TABLE `_modulefield` (
  `tf_fieldId` int(11) NOT NULL,
  `tf_DBfieldName` varchar(50) DEFAULT NULL,
  `tf_DBformula` varchar(255) DEFAULT NULL,
  `tf_allowEdit` bit(1) DEFAULT NULL,
  `tf_allowEditExcel` bit(1) DEFAULT NULL,
  `tf_allowGroup` bit(1) DEFAULT NULL,
  `tf_allowInsertExcel` bit(1) DEFAULT NULL,
  `tf_allowNew` bit(1) DEFAULT NULL,
  `tf_allowSummary` bit(1) DEFAULT NULL,
  `tf_defaultValue` varchar(50) DEFAULT NULL,
  `tf_denominator` varchar(50) DEFAULT NULL,
  `tf_divisor` varchar(50) DEFAULT NULL,
  `tf_fieldGroup` varchar(255) DEFAULT NULL,
  `tf_fieldLen` int(11) DEFAULT NULL,
  `tf_fieldName` varchar(50) NOT NULL,
  `tf_fieldOrder` int(11) DEFAULT NULL,
  `tf_fieldRelation` varchar(20) DEFAULT NULL,
  `tf_fieldType` varchar(50) NOT NULL,
  `tf_haveAttachment` bit(1) DEFAULT NULL,
  `tf_isChartCategory` bit(1) DEFAULT NULL,
  `tf_isChartNumeric` bit(1) DEFAULT NULL,
  `tf_isDisable` bit(1) DEFAULT NULL,
  `tf_isHidden` bit(1) DEFAULT NULL,
  `tf_isRequired` bit(1) DEFAULT NULL,
  `tf_isUserDefine` bit(1) DEFAULT NULL,
  `tf_newNeedSelected` bit(1) DEFAULT NULL,
  `tf_otherSetting` varchar(255) DEFAULT NULL,
  `tf_remark` varchar(255) DEFAULT NULL,
  `tf_showNavigatorTree` bit(1) DEFAULT NULL,
  `tf_title` varchar(50) NOT NULL,
  `tf_moduleId` varchar(10) NOT NULL,
  `xcode` varchar(50) NOT NULL,
  `orderIndex` int(11) NOT NULL,
  PRIMARY KEY (`tf_fieldId`),
  KEY `FK_1bxjh9swcrat5il66eu4bp2h2` (`tf_moduleId`),
  CONSTRAINT `FK_1bxjh9swcrat5il66eu4bp2h2` FOREIGN KEY (`tf_moduleId`) REFERENCES `_module` (`tf_moduleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `_modulefield` */

/*Table structure for table `_moduleformscheme` */

CREATE TABLE `_moduleformscheme` (
  `tf_formSchemeId` int(11) NOT NULL,
  `tf_displayMode` varchar(255) DEFAULT NULL,
  `tf_isSystemScheme` bit(1) DEFAULT NULL,
  `tf_numCols` int(11) DEFAULT NULL,
  `tf_otherSetting` varchar(255) DEFAULT NULL,
  `tf_schemeName` varchar(50) NOT NULL,
  `tf_schemeOrder` int(11) NOT NULL,
  `tf_windowHeight` int(11) DEFAULT NULL,
  `tf_windowWidth` int(11) DEFAULT NULL,
  `tf_moduleId` varchar(10) NOT NULL,
  `xcode` varchar(50) NOT NULL,
  `orderIndex` int(11) NOT NULL,
  PRIMARY KEY (`tf_formSchemeId`),
  KEY `FK_hj95us12ob8w38tok448ebjko` (`tf_moduleId`),
  CONSTRAINT `FK_hj95us12ob8w38tok448ebjko` FOREIGN KEY (`tf_moduleId`) REFERENCES `_module` (`tf_moduleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `_moduleformscheme` */

/*Table structure for table `_moduleformschemegroup` */

CREATE TABLE `_moduleformschemegroup` (
  `tf_formGroupId` int(11) NOT NULL,
  `tf_approveGroup` bit(1) DEFAULT NULL,
  `tf_auditingGroup` bit(1) DEFAULT NULL,
  `tf_collapsed` bit(1) DEFAULT NULL,
  `tf_collapsible` bit(1) DEFAULT NULL,
  `tf_displayMode` varchar(50) DEFAULT NULL,
  `tf_formGroupName` varchar(50) NOT NULL,
  `tf_formGroupOrder` int(11) NOT NULL,
  `tf_numCols` int(11) DEFAULT NULL,
  `tf_otherSetting` varchar(255) DEFAULT NULL,
  `tf_subModuleName` varchar(50) DEFAULT NULL,
  `tf_formSchemeId` int(11) NOT NULL,
  `xcode` varchar(50) NOT NULL,
  `orderIndex` int(11) NOT NULL,
  PRIMARY KEY (`tf_formGroupId`),
  KEY `FK_4pumwj0qqgmx2jsu7akbr6a31` (`tf_formSchemeId`),
  CONSTRAINT `FK_4pumwj0qqgmx2jsu7akbr6a31` FOREIGN KEY (`tf_formSchemeId`) REFERENCES `_moduleformscheme` (`tf_formSchemeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `_moduleformschemegroup` */

/*Table structure for table `_moduleformschemegroupfield` */

CREATE TABLE `_moduleformschemegroupfield` (
  `tf_formFieldId` int(11) NOT NULL,
  `tf_colspan` int(11) DEFAULT NULL,
  `tf_fieldId` int(11) DEFAULT NULL,
  `tf_formFieldOrder` int(11) NOT NULL,
  `tf_isEndRow` bit(1) DEFAULT NULL,
  `tf_otherSetting` varchar(255) DEFAULT NULL,
  `tf_width` int(11) DEFAULT NULL,
  `tf_formGroupId` int(11) NOT NULL,
  `xcode` varchar(50) NOT NULL,
  `orderIndex` int(11) NOT NULL,
  PRIMARY KEY (`tf_formFieldId`),
  KEY `FK_t2mcy8qtfslq83jf24rdql099` (`tf_fieldId`),
  KEY `FK_82fga1n0mw2a6b94fqrme7t10` (`tf_formGroupId`),
  CONSTRAINT `FK_82fga1n0mw2a6b94fqrme7t10` FOREIGN KEY (`tf_formGroupId`) REFERENCES `_moduleformschemegroup` (`tf_formGroupId`),
  CONSTRAINT `FK_t2mcy8qtfslq83jf24rdql099` FOREIGN KEY (`tf_fieldId`) REFERENCES `_modulefield` (`tf_fieldId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `_moduleformschemegroupfield` */

/*Table structure for table `_modulegridscheme` */

CREATE TABLE `_modulegridscheme` (
  `tf_gridSchemeId` int(11) NOT NULL,
  `tf_dblClickAction` varchar(255) DEFAULT NULL,
  `tf_defaultSort` varchar(255) DEFAULT NULL,
  `tf_isAllowEditInGrid` bit(1) DEFAULT NULL,
  `tf_isSystemScheme` bit(1) DEFAULT NULL,
  `tf_otherSetting` varchar(255) DEFAULT NULL,
  `tf_schemeName` varchar(50) NOT NULL,
  `tf_schemeOrder` int(11) NOT NULL,
  `tf_moduleId` varchar(10) NOT NULL,
  `xcode` varchar(50) NOT NULL,
  `orderIndex` int(11) NOT NULL,
  PRIMARY KEY (`tf_gridSchemeId`),
  KEY `FK_6hnvgrh5dw6mk81gy4b04mgm7` (`tf_moduleId`),
  CONSTRAINT `FK_6hnvgrh5dw6mk81gy4b04mgm7` FOREIGN KEY (`tf_moduleId`) REFERENCES `_module` (`tf_moduleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `_modulegridscheme` */

/*Table structure for table `_modulegridschemegroup` */

CREATE TABLE `_modulegridschemegroup` (
  `tf_gridGroupId` int(11) NOT NULL,
  `tf_gridGroupName` varchar(50) NOT NULL,
  `tf_gridGroupOrder` int(11) NOT NULL,
  `tf_isLocked` bit(1) DEFAULT NULL,
  `tf_isShowHeaderSpans` bit(1) DEFAULT NULL,
  `tf_otherSetting` varchar(255) DEFAULT NULL,
  `tf_gridSchemeId` int(11) NOT NULL,
  `xcode` varchar(50) NOT NULL,
  `orderIndex` int(11) NOT NULL,
  PRIMARY KEY (`tf_gridGroupId`),
  KEY `FK_in2bum3rle93p6qi4ay15ekig` (`tf_gridSchemeId`),
  CONSTRAINT `FK_in2bum3rle93p6qi4ay15ekig` FOREIGN KEY (`tf_gridSchemeId`) REFERENCES `_modulegridscheme` (`tf_gridSchemeId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `_modulegridschemegroup` */

/*Table structure for table `_modulegridschemegroupfield` */

CREATE TABLE `_modulegridschemegroupfield` (
  `tf_gridFieldId` int(11) NOT NULL,
  `tf_additionType` varchar(255) DEFAULT NULL,
  `tf_columnWidth` int(11) DEFAULT NULL,
  `tf_fieldId` int(11) DEFAULT NULL,
  `tf_gridFieldOrder` int(11) NOT NULL,
  `tf_isLocked` bit(1) DEFAULT NULL,
  `tf_ishidden` bit(1) DEFAULT NULL,
  `tf_notExportExcel` bit(1) DEFAULT NULL,
  `tf_otherSetting` varchar(255) DEFAULT NULL,
  `tf_gridGroupId` int(11) NOT NULL,
  `xcode` varchar(50) NOT NULL,
  `orderIndex` int(11) NOT NULL,
  PRIMARY KEY (`tf_gridFieldId`),
  KEY `FK_o2t6k2xkiqn77gqnm7lydjbv2` (`tf_fieldId`),
  KEY `FK_la083ewr99d4si0qd4a8btu5u` (`tf_gridGroupId`),
  CONSTRAINT `FK_la083ewr99d4si0qd4a8btu5u` FOREIGN KEY (`tf_gridGroupId`) REFERENCES `_modulegridschemegroup` (`tf_gridGroupId`),
  CONSTRAINT `FK_o2t6k2xkiqn77gqnm7lydjbv2` FOREIGN KEY (`tf_fieldId`) REFERENCES `_modulefield` (`tf_fieldId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `_modulegridschemegroupfield` */

/*Table structure for table `_modulegroup` */

CREATE TABLE `_modulegroup` (
  `tf_moduleGroupId` varchar(10) NOT NULL,
  `tf_description` varchar(255) DEFAULT NULL,
  `tf_iconURL` varchar(255) DEFAULT NULL,
  `tf_remark` varchar(255) DEFAULT NULL,
  `tf_title` varchar(50) NOT NULL,
  `xcode` varchar(50) NOT NULL,
  `orderIndex` int(11) NOT NULL,
  PRIMARY KEY (`tf_moduleGroupId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `_modulegroup` */

/*Table structure for table `advertisement` */

CREATE TABLE `advertisement` (
  `adverid` varchar(50) NOT NULL,
  `orderIndex` int(11) NOT NULL AUTO_INCREMENT,
  `advertype` varchar(255) DEFAULT NULL,
  `ispost` varchar(255) DEFAULT NULL,
  `msg` varchar(3000) DEFAULT NULL,
  `posttime` varchar(255) DEFAULT NULL,
  `title` varchar(500) DEFAULT NULL,
  `userid` varchar(255) DEFAULT NULL,
  `linkUrl` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`adverid`),
  KEY `orderIndex` (`orderIndex`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `advertisement` */

insert  into `advertisement`(`adverid`,`orderIndex`,`advertype`,`ispost`,`msg`,`posttime`,`title`,`userid`,`linkUrl`) values ('402881e6482f9f2201482fa3bb6e0001',1,'211sssssssssss11111ppp','0','到百度首页\n了解新版\n百度首页|设置|登录\n网页新闻贴吧知道音乐图片视频地图文库更多»\n\n热门微端网游推荐\n-推广全部热门网游>>\n大天使之剑9.97 分\n大天使之剑\n37游戏\n黑暗之光9.8 分\n黑暗之光\nyouxi\n奇迹网页版8.97 分\n奇迹网页版\n37游戏\n征途Online9.62 分\n征途Online\n9377\n同类热门游戏推荐\n-推广全部热门网游>>\n武易无双9.55 分\n武易无双\n网页传奇9.7 分\n网页传奇\n远征29.97 分\n远征2\n征途9.8 分\n征途\n展开 相关文学作品\n大主宰\n傲世九重天\n绝世唐门\n剑道独尊\n玄幻书友推荐榜\n排名 	推荐指数\n1大主宰 	161649人同时在看\n2完美世界 	89149人同时在看\n3傲世九重天 	51965人同时在看\n4剑道独尊 	41693人同时在看\n5武极天下 	29936人同时在看\n6龙血战神 	23797人同时在看\n7星河大帝 	22285人同时在看\n8灵域 	19923人同时在看\n9雪中悍刀行 	13356人同时在看\n10斗破苍穹 	12596人同时在看\n读友在搜索\n关注点 	关注热度\n完美世界pem中文定名 	\n完美世界携多款游戏e3现身 	\n完美世界公布全新手游不败战神 	\n完美世界原唱是谁 	\n完美世界手游战略主攻高端玩家 	\n以上内容系根据网友搜索自动排序生成\n给百度提建议\n推广链接\n▶想在此推广您的产品吗？\n咨询热线：400-800-8888 e.baidu.com\n百度为您找到相关结果约57,600,000个\n推广链接\n完美世界国际版《完美国际》-荣耀公测-官方网站\n	\n2014奇幻网游《完美国际》全新变革,新手礼包>>百万经验,百万元宝,见证七载荣耀.\n进入官网 - 历史推进 - 境界成长 - 空中战斗 - 海底场景\nw2i.wanmei.com\n\n完美世界,辰东,连载,最新章节官网第一时间更新,起点中文网官网\n一粒尘可填海，一根草斩尽日月星辰，弹指间天翻地覆。群雄并起，万族林立，诸圣争霸，乱天动地。问苍茫大地，谁主沉浮？！一个少年从大荒中走出，一切从这里开始\n\n更新时间：2014-09-01 00:24 九月爆发，求保底月票！奋起冲第一 最新动态\n\n更新时间：2014-09-01 00:22 第八百零八章魔王发威\nwww.qidian.com 2014-09-01 -\n完美世界小说吧_百度贴吧\n96万资源共享，4000万人在吧内讨论这部小说\n完美世界 第八百零八章 魔王发威【首发】精 	\n更新时间：9-1 14:48\n完美世界 第八百零七章 罪血之怒【手打】精 	\n更新时间：9-1 14:50\n第七百九十九章第七百九十八章第七百九十六章全部章节>>\n【热议】{补天山寨｝完美大结局，三章精 	\n点击：35万 回复：1315\n喜欢本吧的人还在逛：遮天|大主宰|莽荒纪\ntieba.baidu.com/完美世界小说?fr=ala0 2014-09-01\n完美世界_百度百科\n\n完美世界小说为起点文学网白金写手辰东的第五部小说，也是辰东结婚后的第一部作品。与前作《遮天》存在一定的联系（据说为遮天前传）。一粒尘可填海，一根草斩尽...\n其他含义: 完美世界公司出品网络游戏 美国华纳影片公司出品电影\n\n查看“完美世界”全部11个含义>>\n\nbaike.baidu.com/ 2014-08-27\n完美世界客服电话\n\n028-68729517\ncs.wanmei.com -   提交电话（免费）\n完美世界无弹窗_完美世界最新章节列表_笔趣阁\n开始阅读   作者: 辰东   状态: 连载中   类型: 玄幻小说\n简介: 一粒尘可填海，一根草斩尽日月星辰，弹指间天翻地覆。 群雄并起，万族林立，诸圣争霸，乱天动地。问苍茫大地，谁主沉浮？！ 一个少年从大荒中走出，一切从这里...\nwww.biquge.la/book/... 2014-08-23 \n - 百度快照 - 96%好评\n完美世界最新章节,完美世界无弹窗全文阅读 - 八一中文网\n完美世界由八一中文网会员(辰东)连载,该小说情节跌宕起伏、扣人心弦是一本难得的情节与文笔俱佳的好书,www.81zw.com免费提供完美世界vip章节阅读和txt电子书免费...\nwww.81zw.com/book/80... 2014-08-22 \n - 百度快照 - 评价\n《完美世界:赤焰赞歌》官方网站 - 国产最美、最平衡的3D时长版...\n《完美世界》官网,《完美世界》首创飞行系统、形象自定义系统!爽快PK、恢弘城战、拥有私人家园、15大副本。内容丰富,好玩不贵!\nworld2.wanmei.com/ 2014-08-22 \n - 百度快照 - 评价\n完美世界最新章节,完美世界5200\n开始阅读   作者: 辰东   状态: 连载中   类型: 玄幻小说\n简介: 一粒尘可填海，一根草斩尽日月星辰，弹指间天翻地覆。 群雄并起，万族林立，诸圣争霸，乱天动地。问苍茫大地，谁主沉浮？！ 一个少年从大荒中走出，一切从这...\n\n最新章节: 第七百八十九章 至尊一脉/墨坛文学更新时间: 2014-8-23\nwww.22mt.com/wanmeishi... 2014-08-16 \n - 百度快照 - 87%好评\n完美世界(北京)网络技术有限公司[PWRD]_美股实时行情_新浪财经\n21.02+0.22 (+1.06%)\n2014-08-29 16:00:00 (美东时间)\n\n    道琼斯：17098.45 (+0.11%)\n\n    纳斯达克：4580.27 (+0.50%)\n\n    今开：20.88\n\n    昨收：20.80\n\n    最高：21.06\n\n    最低：20.61\n\n    成交量：38.07万\n\n    市盈率：10.67\n\nfinance.sina.com.cn\n完美世界 - 成为全球最大的在线游戏供应商\n完美世界“改变未来”萧泓发布未来战略规划 完美世界精彩亮相“中国巴西友好四十年成果展”大型游戏 网页游戏 主机游戏 完美电竞 完美娱乐...\nwww.wanmei.com/ 2014-07-31 \n - 百度快照 - 评价\n推广链接\n完美世界国际版《完美国际》-荣耀公测-官方网站w2i.wanmei.com\n2014奇幻网游《完美国际》全新变革,新手礼包>>百万经验,百万元宝,见证七载荣耀.\n\n相关搜索\n大主宰		完美世界官网		完美世界5200\n完美世界txt下载		完美国际		完美世界无弹窗\n完美		完美世界国际版		完美世界辰东\n\n12345678910下一页>\n©2014 Baidu 此内容系百度根据您的指令自动搜索的结果，不代表百度赞成被搜索网站的内容或立场帮助反馈意见举报\nqqqqqqqqqqqqqqqqqqqq','2014-09-01 15:02:34','212sssssssss212222222','212','2121'),('402881ed483a9fdd01483aa67cdc0003',2,'211',NULL,NULL,'2014-09-03 16:34:24','121',NULL,'121');

/*Table structure for table `city` */

CREATE TABLE `city` (
  `CityName` varchar(50) DEFAULT NULL,
  `ProID` varchar(50) DEFAULT NULL,
  `CitySort` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `city` */

insert  into `city`(`CityName`,`ProID`,`CitySort`) values ('北京市','1','1'),('天津市','2','2'),('上海市','9','3'),('重庆市','27','4'),('邯郸市','3','5'),('石家庄市','3','6'),('保定市','3','7'),('张家口市','3','8'),('承德市','3','9'),('唐山市','3','10'),('廊坊市','3','11'),('沧州市','3','12'),('衡水市','3','13'),('邢台市','3','14'),('秦皇岛市','3','15'),('朔州市','4','16'),('忻州市','4','17'),('太原市','4','18'),('大同市','4','19'),('阳泉市','4','20'),('晋中市','4','21'),('长治市','4','22'),('晋城市','4','23'),('临汾市','4','24'),('吕梁市','4','25'),('运城市','4','26'),('沈阳市','6','27'),('铁岭市','6','28'),('大连市','6','29'),('鞍山市','6','30'),('抚顺市','6','31'),('本溪市','6','32'),('丹东市','6','33'),('锦州市','6','34'),('营口市','6','35'),('阜新市','6','36'),('辽阳市','6','37'),('朝阳市','6','38'),('盘锦市','6','39'),('葫芦岛市','6','40'),('长春市','7','41'),('吉林市','7','42'),('延边朝鲜族自治州','7','43'),('四平市','7','44'),('通化市','7','45'),('白城市','7','46'),('辽源市','7','47'),('松原市','7','48'),('白山市','7','49'),('哈尔滨市','8','50'),('齐齐哈尔市','8','51'),('鸡西市','8','52'),('牡丹江市','8','53'),('七台河市','8','54'),('佳木斯市','8','55'),('鹤岗市','8','56'),('双鸭山市','8','57'),('绥化市','8','58'),('黑河市','8','59'),('大兴安岭地区','8','60'),('伊春市','8','61'),('大庆市','8','62'),('南京市','10','63'),('无锡市','10','64'),('镇江市','10','65'),('苏州市','10','66'),('南通市','10','67'),('扬州市','10','68'),('盐城市','10','69'),('徐州市','10','70'),('淮安市','10','71'),('连云港市','10','72'),('常州市','10','73'),('泰州市','10','74'),('宿迁市','10','75'),('舟山市','11','76'),('衢州市','11','77'),('杭州市','11','78'),('湖州市','11','79'),('嘉兴市','11','80'),('宁波市','11','81'),('绍兴市','11','82'),('温州市','11','83'),('丽水市','11','84'),('金华市','11','85'),('台州市','11','86'),('合肥市','12','87'),('芜湖市','12','88'),('蚌埠市','12','89'),('淮南市','12','90'),('马鞍山市','12','91'),('淮北市','12','92'),('铜陵市','12','93'),('安庆市','12','94'),('黄山市','12','95'),('滁州市','12','96'),('阜阳市','12','97'),('宿州市','12','98'),('巢湖市','12','99'),('六安市','12','100'),('亳州市','12','101'),('池州市','12','102'),('宣城市','12','103'),('福州市','13','104'),('厦门市','13','105'),('宁德市','13','106'),('莆田市','13','107'),('泉州市','13','108'),('漳州市','13','109'),('龙岩市','13','110'),('三明市','13','111'),('南平市','13','112'),('鹰潭市','14','113'),('新余市','14','114'),('南昌市','14','115'),('九江市','14','116'),('上饶市','14','117'),('抚州市','14','118'),('宜春市','14','119'),('吉安市','14','120'),('赣州市','14','121'),('景德镇市','14','122'),('萍乡市','14','123'),('菏泽市','15','124'),('济南市','15','125'),('青岛市','15','126'),('淄博市','15','127'),('德州市','15','128'),('烟台市','15','129'),('潍坊市','15','130'),('济宁市','15','131'),('泰安市','15','132'),('临沂市','15','133'),('滨州市','15','134'),('东营市','15','135'),('威海市','15','136'),('枣庄市','15','137'),('日照市','15','138'),('莱芜市','15','139'),('聊城市','15','140'),('商丘市','16','141'),('郑州市','16','142'),('安阳市','16','143'),('新乡市','16','144'),('许昌市','16','145'),('平顶山市','16','146'),('信阳市','16','147'),('南阳市','16','148'),('开封市','16','149'),('洛阳市','16','150'),('济源市','16','151'),('焦作市','16','152'),('鹤壁市','16','153'),('濮阳市','16','154'),('周口市','16','155'),('漯河市','16','156'),('驻马店市','16','157'),('三门峡市','16','158'),('武汉市','17','159'),('襄樊市','17','160'),('鄂州市','17','161'),('孝感市','17','162'),('黄冈市','17','163'),('黄石市','17','164'),('咸宁市','17','165'),('荆州市','17','166'),('宜昌市','17','167'),('恩施土家族苗族自治州','17','168'),('神农架林区','17','169'),('十堰市','17','170'),('随州市','17','171'),('荆门市','17','172'),('仙桃市','17','173'),('天门市','17','174'),('潜江市','17','175'),('岳阳市','18','176'),('长沙市','18','177'),('湘潭市','18','178'),('株洲市','18','179'),('衡阳市','18','180'),('郴州市','18','181'),('常德市','18','182'),('益阳市','18','183'),('娄底市','18','184'),('邵阳市','18','185'),('湘西土家族苗族自治州','18','186'),('张家界市','18','187'),('怀化市','18','188'),('永州市','18','189'),('广州市','19','190'),('汕尾市','19','191'),('阳江市','19','192'),('揭阳市','19','193'),('茂名市','19','194'),('惠州市','19','195'),('江门市','19','196'),('韶关市','19','197'),('梅州市','19','198'),('汕头市','19','199'),('深圳市','19','200'),('珠海市','19','201'),('佛山市','19','202'),('肇庆市','19','203'),('湛江市','19','204'),('中山市','19','205'),('河源市','19','206'),('清远市','19','207'),('云浮市','19','208'),('潮州市','19','209'),('东莞市','19','210'),('兰州市','22','211'),('金昌市','22','212'),('白银市','22','213'),('天水市','22','214'),('嘉峪关市','22','215'),('武威市','22','216'),('张掖市','22','217'),('平凉市','22','218'),('酒泉市','22','219'),('庆阳市','22','220'),('定西市','22','221'),('陇南市','22','222'),('临夏回族自治州','22','223'),('甘南藏族自治州','22','224'),('成都市','28','225'),('攀枝花市','28','226'),('自贡市','28','227'),('绵阳市','28','228'),('南充市','28','229'),('达州市','28','230'),('遂宁市','28','231'),('广安市','28','232'),('巴中市','28','233'),('泸州市','28','234'),('宜宾市','28','235'),('资阳市','28','236'),('内江市','28','237'),('乐山市','28','238'),('眉山市','28','239'),('凉山彝族自治州','28','240'),('雅安市','28','241'),('甘孜藏族自治州','28','242'),('阿坝藏族羌族自治州','28','243'),('德阳市','28','244'),('广元市','28','245'),('贵阳市','29','246'),('遵义市','29','247'),('安顺市','29','248'),('黔南布依族苗族自治州','29','249'),('黔东南苗族侗族自治州','29','250'),('铜仁地区','29','251'),('毕节地区','29','252'),('六盘水市','29','253'),('黔西南布依族苗族自治州','29','254'),('海口市','20','255'),('三亚市','20','256'),('五指山市','20','257'),('琼海市','20','258'),('儋州市','20','259'),('文昌市','20','260'),('万宁市','20','261'),('东方市','20','262'),('澄迈县','20','263'),('定安县','20','264'),('屯昌县','20','265'),('临高县','20','266'),('白沙黎族自治县','20','267'),('昌江黎族自治县','20','268'),('乐东黎族自治县','20','269'),('陵水黎族自治县','20','270'),('保亭黎族苗族自治县','20','271'),('琼中黎族苗族自治县','20','272'),('西双版纳傣族自治州','30','273'),('德宏傣族景颇族自治州','30','274'),('昭通市','30','275'),('昆明市','30','276'),('大理白族自治州','30','277'),('红河哈尼族彝族自治州','30','278'),('曲靖市','30','279'),('保山市','30','280'),('文山壮族苗族自治州','30','281'),('玉溪市','30','282'),('楚雄彝族自治州','30','283'),('普洱市','30','284'),('临沧市','30','285'),('怒江傈傈族自治州','30','286'),('迪庆藏族自治州','30','287'),('丽江市','30','288'),('海北藏族自治州','25','289'),('西宁市','25','290'),('海东地区','25','291'),('黄南藏族自治州','25','292'),('海南藏族自治州','25','293'),('果洛藏族自治州','25','294'),('玉树藏族自治州','25','295'),('海西蒙古族藏族自治州','25','296'),('西安市','23','297'),('咸阳市','23','298'),('延安市','23','299'),('榆林市','23','300'),('渭南市','23','301'),('商洛市','23','302'),('安康市','23','303'),('汉中市','23','304'),('宝鸡市','23','305'),('铜川市','23','306'),('防城港市','21','307'),('南宁市','21','308'),('崇左市','21','309'),('来宾市','21','310'),('柳州市','21','311'),('桂林市','21','312'),('梧州市','21','313'),('贺州市','21','314'),('贵港市','21','315'),('玉林市','21','316'),('百色市','21','317'),('钦州市','21','318'),('河池市','21','319'),('北海市','21','320'),('拉萨市','31','321'),('日喀则地区','31','322'),('山南地区','31','323'),('林芝地区','31','324'),('昌都地区','31','325'),('那曲地区','31','326'),('阿里地区','31','327'),('银川市','26','328'),('石嘴山市','26','329'),('吴忠市','26','330'),('固原市','26','331'),('中卫市','26','332'),('塔城地区','24','333'),('哈密地区','24','334'),('和田地区','24','335'),('阿勒泰地区','24','336'),('克孜勒苏柯尔克孜自治州','24','337'),('博尔塔拉蒙古自治州','24','338'),('克拉玛依市','24','339'),('乌鲁木齐市','24','340'),('石河子市','24','341'),('昌吉回族自治州','24','342'),('五家渠市','24','343'),('吐鲁番地区','24','344'),('巴音郭楞蒙古自治州','24','345'),('阿克苏地区','24','346'),('阿拉尔市','24','347'),('喀什地区','24','348'),('图木舒克市','24','349'),('伊犁哈萨克自治州','24','350'),('呼伦贝尔市','5','351'),('呼和浩特市','5','352'),('包头市','5','353'),('乌海市','5','354'),('乌兰察布市','5','355'),('通辽市','5','356'),('赤峰市','5','357'),('鄂尔多斯市','5','358'),('巴彦淖尔市','5','359'),('锡林郭勒盟','5','360'),('兴安盟','5','361'),('阿拉善盟','5','362'),('台北市','32','363'),('高雄市','32','364'),('基隆市','32','365'),('台中市','32','366'),('台南市','32','367'),('新竹市','32','368'),('嘉义市','32','369'),('澳门特别行政区','33','370'),('香港特别行政区','34','371');

/*Table structure for table `department` */

CREATE TABLE `department` (
  `deptId` varchar(50) NOT NULL,
  `orderIndex` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(255) DEFAULT NULL,
  `layer` int(11) DEFAULT NULL,
  `nodeInfo` varchar(255) DEFAULT NULL,
  `nodeInfoType` varchar(255) DEFAULT NULL,
  `nodeType` varchar(255) DEFAULT NULL,
  `deptCode` varchar(255) DEFAULT NULL,
  `deptName` varchar(255) DEFAULT NULL,
  `PARENT` varchar(50) DEFAULT NULL,
  `city` varchar(255) DEFAULT NULL,
  `introduce` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `locationxy` varchar(255) DEFAULT NULL,
  `summary` varchar(255) DEFAULT NULL,
  `xcode` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`deptId`),
  KEY `FK_bnuj8milwq77e0h9y8fexwefo` (`PARENT`),
  KEY `orderIndex` (`orderIndex`),
  CONSTRAINT `FK_bnuj8milwq77e0h9y8fexwefo` FOREIGN KEY (`PARENT`) REFERENCES `department` (`deptId`)
) ENGINE=InnoDB AUTO_INCREMENT=22 DEFAULT CHARSET=utf8;

/*Data for the table `department` */

insert  into `department`(`deptId`,`orderIndex`,`status`,`layer`,`nodeInfo`,`nodeInfoType`,`nodeType`,`deptCode`,`deptName`,`PARENT`,`city`,`introduce`,`location`,`locationxy`,`summary`,`xcode`) values ('402881ea3c0aaaac013c0abac2310001',1,'1',1,'','','GENERAL','YFBA','保利小区','ROOT','广州市','212222222222222222','','23.125702,113.384241','212','402881e43c720e8a013c720f151d0001'),('402881ed499847ff01499851e43f0000',3,NULL,0,NULL,NULL,'GENERAL','asawqaas','号的哦每个信息','ROOT',NULL,NULL,NULL,NULL,NULL,NULL),('402881ed499847ff01499853b0730001',4,NULL,NULL,NULL,NULL,NULL,'阿斯法','神奇的阿萨','ROOT',NULL,NULL,NULL,NULL,NULL,NULL),('402881ed49985e0301499871bab80001',21,NULL,NULL,NULL,NULL,NULL,'案是否撒','添加子不是门','402881ed499847ff01499851e43f0000',NULL,NULL,NULL,NULL,NULL,NULL),('ROOT',2,NULL,0,'ROOT','ROOT','GENERAL','ROOT','保利小区',NULL,NULL,NULL,NULL,NULL,NULL,'402881e43c720e8a013c720f151d0001');

/*Table structure for table `dictionary` */

CREATE TABLE `dictionary` (
  `ddId` varchar(50) NOT NULL,
  `orderIndex` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(255) DEFAULT NULL,
  `ddCode` varchar(255) DEFAULT NULL,
  `ddName` varchar(255) DEFAULT NULL,
  `ddType` varchar(255) DEFAULT NULL,
  `enabled` varchar(255) DEFAULT NULL,
  `modelName` varchar(255) DEFAULT NULL,
  `readOnly` varchar(255) DEFAULT NULL,
  `xcode` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`ddId`),
  UNIQUE KEY `UK_momlqvo3udet120im2jojakg8` (`ddCode`),
  KEY `orderIndex` (`orderIndex`)
) ENGINE=InnoDB AUTO_INCREMENT=21 DEFAULT CHARSET=utf8;

/*Data for the table `dictionary` */

insert  into `dictionary`(`ddId`,`orderIndex`,`status`,`ddCode`,`ddName`,`ddType`,`enabled`,`modelName`,`readOnly`,`xcode`) values ('402881e43c8ba59e013c8ba80c2b0001',1,NULL,'ENABLED','是否启用','LIST','1',NULL,NULL,'402881e43c720e8a013c720f151d0001'),('402881e43c9907ec013c9932470e0001',2,NULL,'MENUTYPE','菜单类型','LIST','1',NULL,NULL,'402881e43c720e8a013c720f151d0001'),('402881e43ca00a18013ca02f2884000a',3,NULL,'XIANGSU','像素','LIST','1',NULL,NULL,'402881e43c720e8a013c720f151d0001'),('402881e4485914ef014859167bc80000',4,NULL,'ISHOTGOODS','是否推荐商品','LIST','1',NULL,'0','402881e43c720e8a013c720f151d0001'),('402881e4485917c001485918df160000',5,NULL,'ISPOST','是否发布','LIST','1',NULL,'0','402881e43c720e8a013c720f151d0001'),('402881e448591e3e0148591e67590000',6,NULL,'ISFREE','是否包邮','LIST','1',NULL,'0','402881e43c720e8a013c720f151d0001'),('402881e4485d538101485d5accaf0000',7,NULL,'ISPAY','支付状态','LIST','1',NULL,'0','402881e43c720e8a013c720f151d0001'),('402881e6482f2e0201482f5a7a900003',8,NULL,'TSTATE','投放状态','LIST','1',NULL,'0','402881e43c720e8a013c720f151d0001'),('402881e8483e51d901483e5bb1d70002',9,NULL,'ISCOME','是否上门','LIST','1',NULL,'0','402881e43c720e8a013c720f151d0001'),('402881e8483e805401483e8388620001',10,NULL,'AUDIT','审核状态','LIST','1',NULL,'0','402881e43c720e8a013c720f151d0001'),('402881ed4825a96a014825b4ace90005',11,NULL,'ISOWNER','是否业主','LIST','1',NULL,'0','402881e43c720e8a013c720f151d0001'),('402881ed4825d8c3014825e8bbb80001',12,NULL,'SEX','性别','LIST','1',NULL,'0','402881e43c720e8a013c720f151d0001'),('402881ed4825ec71014825ed3fbb0000',13,NULL,'READONLY','是否只读','LIST','1',NULL,'0','402881e43c720e8a013c720f151d0001'),('402881ed489c174b01489c18fe7f0000',14,NULL,'ROUNDTYPE','周边服务类型','LIST','1',NULL,'0','402881e43c720e8a013c720f151d0001'),('402881ed48ac24430148ac2532b60000',15,NULL,'ENDUSER','系统用户','LIST','1','org.yingqu.desktop.model.EndUser','0','402881e43c720e8a013c720f151d0001'),('402881ed48ac24430148ac2620600001',16,NULL,'INCATYPE','官方论坛分类','LIST','1',NULL,'0','402881e43c720e8a013c720f151d0001'),('402881ed48ac24430148ac26ed480002',17,NULL,'INCTYPE','用户论坛分类','LIST','1',NULL,'0','402881e43c720e8a013c720f151d0001'),('402881ed48ba0a330148ba0a45460000',18,NULL,'SOURCEF','发布来源','LIST','1',NULL,'0','402881e43c720e8a013c720f151d0001'),('402881ed4917d316014918031f6d0006',19,NULL,'PAYTYPE','支付方式','LIST','1',NULL,'0','402881e43c720e8a013c720f151d0001'),('402881ed4917d31601491806eb210009',20,NULL,'WEEKAN','工作日周末假日均可送货','LIST','1',NULL,'0','402881e43c720e8a013c720f151d0001');

/*Table structure for table `dictionaryitem` */

CREATE TABLE `dictionaryitem` (
  `itemId` varchar(50) NOT NULL,
  `orderIndex` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(255) DEFAULT NULL,
  `layer` int(11) DEFAULT NULL,
  `nodeInfo` varchar(255) DEFAULT NULL,
  `nodeInfoType` varchar(255) DEFAULT NULL,
  `nodeType` varchar(255) DEFAULT NULL,
  `itemCode` varchar(255) DEFAULT NULL,
  `itemName` varchar(255) DEFAULT NULL,
  `DDId` varchar(50) NOT NULL,
  `PARENT` varchar(50) DEFAULT NULL,
  `xcode` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`itemId`),
  KEY `FK_jn78p0t68hunwh38j51jbo6c9` (`DDId`),
  KEY `FK_g8kvsmn8e07m3l1g8f1mej9ao` (`PARENT`),
  KEY `orderIndex` (`orderIndex`),
  CONSTRAINT `FK_g8kvsmn8e07m3l1g8f1mej9ao` FOREIGN KEY (`PARENT`) REFERENCES `dictionaryitem` (`itemId`),
  CONSTRAINT `FK_jn78p0t68hunwh38j51jbo6c9` FOREIGN KEY (`DDId`) REFERENCES `dictionary` (`ddId`)
) ENGINE=InnoDB AUTO_INCREMENT=46 DEFAULT CHARSET=utf8;

/*Data for the table `dictionaryitem` */

insert  into `dictionaryitem`(`itemId`,`orderIndex`,`status`,`layer`,`nodeInfo`,`nodeInfoType`,`nodeType`,`itemCode`,`itemName`,`DDId`,`PARENT`,`xcode`) values ('402881e43c8ba59e013c8ba849e70002',1,NULL,NULL,NULL,NULL,NULL,'1','启用','402881e43c8ba59e013c8ba80c2b0001',NULL,'402881e43c720e8a013c720f151d0001'),('402881e43c8ba59e013c8ba870ff0003',2,NULL,NULL,NULL,NULL,NULL,'0','不启用','402881e43c8ba59e013c8ba80c2b0001',NULL,'402881e43c720e8a013c720f151d0001'),('402881e43c9907ec013c993276d80002',3,NULL,NULL,NULL,NULL,NULL,'MENU','菜单','402881e43c9907ec013c9932470e0001',NULL,'402881e43c720e8a013c720f151d0001'),('402881e43c9907ec013c993296ff0003',1,NULL,NULL,NULL,NULL,NULL,'FUNC','功能','402881e43c9907ec013c9932470e0001',NULL,'402881e43c720e8a013c720f151d0001'),('402881e43ca00a18013ca02f5da0000b',4,NULL,NULL,NULL,NULL,NULL,'16*16','16*16','402881e43ca00a18013ca02f2884000a',NULL,'402881e43c720e8a013c720f151d0001'),('402881e43ca00a18013ca02f8b0f000c',1,NULL,NULL,NULL,NULL,NULL,'32*32','32*32','402881e43ca00a18013ca02f2884000a',NULL,'402881e43c720e8a013c720f151d0001'),('402881e43ca00a18013ca02fbc73000d',2,NULL,NULL,NULL,NULL,NULL,'48*48','48*48','402881e43ca00a18013ca02f2884000a',NULL,'402881e43c720e8a013c720f151d0001'),('402881e4485914ef01485916c7190001',5,NULL,NULL,NULL,NULL,NULL,'1','推荐商品','402881e4485914ef014859167bc80000',NULL,'402881e43c720e8a013c720f151d0001'),('402881e4485914ef01485917150d0002',6,NULL,NULL,NULL,NULL,NULL,'0','普通商品','402881e4485914ef014859167bc80000',NULL,'402881e43c720e8a013c720f151d0001'),('402881e4485917c001485919a78a0001',7,NULL,NULL,NULL,NULL,NULL,'1','确定发布','402881e4485917c001485918df160000',NULL,'402881e43c720e8a013c720f151d0001'),('402881e4485917c00148591a1ee40002',8,NULL,NULL,NULL,NULL,NULL,'0','编辑状态','402881e4485917c001485918df160000',NULL,'402881e43c720e8a013c720f151d0001'),('402881e448591e3e0148591ea8740001',9,NULL,NULL,NULL,NULL,NULL,'1','包邮','402881e448591e3e0148591e67590000',NULL,'402881e43c720e8a013c720f151d0001'),('402881e448591e3e0148591ec90a0002',10,NULL,NULL,NULL,NULL,NULL,'0','布包邮','402881e448591e3e0148591e67590000',NULL,'402881e43c720e8a013c720f151d0001'),('402881e4485d5bb501485d5c1c8e0000',11,NULL,NULL,NULL,NULL,NULL,'1','已支付','402881e4485d538101485d5accaf0000',NULL,'402881e43c720e8a013c720f151d0001'),('402881e4485d5bb501485d5c69870001',12,NULL,NULL,NULL,NULL,NULL,'0','未支付','402881e4485d538101485d5accaf0000',NULL,'402881e43c720e8a013c720f151d0001'),('402881e6482f2e0201482f5bc4410004',13,NULL,NULL,NULL,NULL,NULL,'0','未投放','402881e6482f2e0201482f5a7a900003',NULL,'402881e43c720e8a013c720f151d0001'),('402881e6482f2e0201482f5c25c20005',14,NULL,NULL,NULL,NULL,NULL,'1','已投放','402881e6482f2e0201482f5a7a900003',NULL,'402881e43c720e8a013c720f151d0001'),('402881e8483e51d901483e5c0bea0003',15,NULL,NULL,NULL,NULL,NULL,'1','上门服务','402881e8483e51d901483e5bb1d70002',NULL,'402881e43c720e8a013c720f151d0001'),('402881e8483e51d901483e5c4c840004',16,NULL,NULL,NULL,NULL,NULL,'0','不上门','402881e8483e51d901483e5bb1d70002',NULL,'402881e43c720e8a013c720f151d0001'),('402881e8483e805401483e8435b00002',17,NULL,NULL,NULL,NULL,NULL,'0','未审核','402881e8483e805401483e8388620001',NULL,'402881e43c720e8a013c720f151d0001'),('402881e8483e805401483e8471bb0003',18,NULL,NULL,NULL,NULL,NULL,'1','已审核','402881e8483e805401483e8388620001',NULL,'402881e43c720e8a013c720f151d0001'),('402881ed4825a96a014825b5786e0006',19,NULL,NULL,NULL,NULL,NULL,'1','业主','402881ed4825a96a014825b4ace90005',NULL,'402881e43c720e8a013c720f151d0001'),('402881ed4825a96a014825b5b5440007',20,NULL,NULL,NULL,NULL,NULL,'0','普通用户','402881ed4825a96a014825b4ace90005',NULL,'402881e43c720e8a013c720f151d0001'),('402881ed4825d8c3014825e91e580002',21,NULL,NULL,NULL,NULL,NULL,'1','男','402881ed4825d8c3014825e8bbb80001',NULL,'402881e43c720e8a013c720f151d0001'),('402881ed4825d8c3014825e983240003',22,NULL,NULL,NULL,NULL,NULL,'0','女','402881ed4825d8c3014825e8bbb80001',NULL,'402881e43c720e8a013c720f151d0001'),('402881ed4825ec71014825ee05840001',23,NULL,NULL,NULL,NULL,NULL,'1','只读','402881ed4825ec71014825ed3fbb0000',NULL,'402881e43c720e8a013c720f151d0001'),('402881ed4825ec71014825ee5f1c0002',24,NULL,NULL,NULL,NULL,NULL,'0','可修改','402881ed4825ec71014825ed3fbb0000',NULL,'402881e43c720e8a013c720f151d0001'),('402881ed489c19ea01489c1a73d20000',25,NULL,NULL,NULL,NULL,NULL,'001','本地服务','402881ed489c174b01489c18fe7f0000',NULL,'402881e43c720e8a013c720f151d0001'),('402881ed489c19ea01489c1ab71e0001',26,NULL,NULL,NULL,NULL,NULL,'002','生活家政','402881ed489c174b01489c18fe7f0000',NULL,'402881e43c720e8a013c720f151d0001'),('402881ed48b02e300148b093be2c0001',27,NULL,NULL,NULL,NULL,NULL,'001','官方','402881ed48ac24430148ac2620600001',NULL,'402881e43c720e8a013c720f151d0001'),('402881ed48b02e300148b0941cbf0002',28,NULL,NULL,NULL,NULL,NULL,'002','活动','402881ed48ac24430148ac2620600001',NULL,'402881e43c720e8a013c720f151d0001'),('402881ed48b02e300148b094605b0003',29,NULL,NULL,NULL,NULL,NULL,'003','招聘','402881ed48ac24430148ac2620600001',NULL,'402881e43c720e8a013c720f151d0001'),('402881ed48b02e300148b094b64a0004',30,NULL,NULL,NULL,NULL,NULL,'004','互动','402881ed48ac24430148ac2620600001',NULL,'402881e43c720e8a013c720f151d0001'),('402881ed48b02e300148b09514b00005',31,NULL,NULL,NULL,NULL,NULL,'005','二手','402881ed48ac24430148ac2620600001',NULL,'402881e43c720e8a013c720f151d0001'),('402881ed48b02e300148b095766a0006',32,NULL,NULL,NULL,NULL,NULL,'006','晒图','402881ed48ac24430148ac2620600001',NULL,'402881e43c720e8a013c720f151d0001'),('402881ed48b02e300148b095dda20007',33,NULL,NULL,NULL,NULL,NULL,'007','其他','402881ed48ac24430148ac2620600001',NULL,'402881e43c720e8a013c720f151d0001'),('402881ed48b02e300148b09636c20008',34,NULL,NULL,NULL,NULL,NULL,'001','活动','402881ed48ac24430148ac26ed480002',NULL,'402881e43c720e8a013c720f151d0001'),('402881ed48b02e300148b096a2d40009',35,NULL,NULL,NULL,NULL,NULL,'002','招聘','402881ed48ac24430148ac26ed480002',NULL,'402881e43c720e8a013c720f151d0001'),('402881ed48b02e300148b096cd53000a',36,NULL,NULL,NULL,NULL,NULL,'003','互动','402881ed48ac24430148ac26ed480002',NULL,'402881e43c720e8a013c720f151d0001'),('402881ed48b02e300148b0972278000b',37,NULL,NULL,NULL,NULL,NULL,'004','二手','402881ed48ac24430148ac26ed480002',NULL,'402881e43c720e8a013c720f151d0001'),('402881ed48b02e300148b09753be000c',38,NULL,NULL,NULL,NULL,NULL,'005','晒图','402881ed48ac24430148ac26ed480002',NULL,'402881e43c720e8a013c720f151d0001'),('402881ed48b02e300148b0978d6c000d',39,NULL,NULL,NULL,NULL,NULL,'006','分享','402881ed48ac24430148ac26ed480002',NULL,'402881e43c720e8a013c720f151d0001'),('402881ed48b02e300148b097ce76000e',40,NULL,NULL,NULL,NULL,NULL,'007','其他','402881ed48ac24430148ac26ed480002',NULL,'402881e43c720e8a013c720f151d0001'),('402881ed48ba0a330148ba0b51350001',41,NULL,NULL,NULL,NULL,NULL,'官方','001','402881ed48ba0a330148ba0a45460000',NULL,'402881e43c720e8a013c720f151d0001'),('402881ed4917d3160149180371510007',42,NULL,NULL,NULL,NULL,NULL,'0','支付宝支付','402881ed4917d316014918031f6d0006',NULL,'402881e43c720e8a013c720f151d0001'),('402881ed4917d31601491803cd3b0008',43,NULL,NULL,NULL,NULL,NULL,'1','网银支付','402881ed4917d316014918031f6d0006',NULL,'402881e43c720e8a013c720f151d0001'),('402881ed4917d31601491807a65e000a',44,NULL,NULL,NULL,NULL,NULL,'1','是','402881ed4917d31601491806eb210009',NULL,'402881e43c720e8a013c720f151d0001'),('402881ed4917d31601491807ce36000b',45,NULL,NULL,NULL,NULL,NULL,'0','否','402881ed4917d31601491806eb210009',NULL,'402881e43c720e8a013c720f151d0001');

/*Table structure for table `enduser` */

CREATE TABLE `enduser` (
  `userId` varchar(50) NOT NULL,
  `orderIndex` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(255) DEFAULT NULL,
  `birthday` varchar(255) DEFAULT NULL,
  `enabled` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `sex` varchar(255) DEFAULT NULL,
  `userCode` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `deptId` varchar(50) NOT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `xcode` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`userId`),
  UNIQUE KEY `UK_ds12tsu0y9b4ufpqo9i0slnie` (`userCode`),
  KEY `FK_d01oxdmfhciw82uyb1efr0tbo` (`deptId`),
  KEY `orderIndex` (`orderIndex`),
  CONSTRAINT `FK_d01oxdmfhciw82uyb1efr0tbo` FOREIGN KEY (`deptId`) REFERENCES `department` (`deptId`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

/*Data for the table `enduser` */

insert  into `enduser`(`userId`,`orderIndex`,`status`,`birthday`,`enabled`,`password`,`sex`,`userCode`,`username`,`deptId`,`remark`,`xcode`) values ('402881e43c720e8a013c720f151d0001',1,NULL,'2014-11-10',NULL,'e10adc3949ba59abbe56e057f20f883e','001','admin','超级管理员','402881ea3c0aaaac013c0abac2310001','saas','402881e43c720e8a013c720f151d0001'),('402881ea480b3f6001480ba4a1ff0010',2,'1','2014-08-25',NULL,'e10adc3949ba59abbe56e057f20f883e','001','HouLynn','刘厚玲','402881ea3c0aaaac013c0abac2310001','sssss','402881e43c720e8a013c720f151d0001'),('402881ed48e9b5e20148e9b7a9550000',3,NULL,'2014-10-07',NULL,'e10adc3949ba59abbe56e057f20f883e','001','123','t我ia爱','ROOT',NULL,'402881e43c720e8a013c720f151d0001'),('402881ed49985e03014998667f000000',5,NULL,'2014-11-10',NULL,'e10adc3949ba59abbe56e057f20f883e','0','飞洒','阿斯法','402881ed499847ff01499853b0730001',NULL,NULL),('402881ed49985e0301499872530c0002',6,NULL,'2014-11-10',NULL,'e10adc3949ba59abbe56e057f20f883e','0','212','121','402881ed49985e0301499871bab80001',NULL,NULL),('402881ed49985e03014998733ab50003',7,NULL,NULL,NULL,'e10adc3949ba59abbe56e057f20f883e','0',NULL,'1211','402881ed499847ff01499851e43f0000',NULL,NULL);

/*Table structure for table `loginlog` */

CREATE TABLE `loginlog` (
  `logId` varchar(50) NOT NULL,
  `orderIndex` int(11) NOT NULL AUTO_INCREMENT,
  `backtime` varchar(255) DEFAULT NULL,
  `count` int(11) NOT NULL,
  `deptId` varchar(255) DEFAULT NULL,
  `logIp` varchar(255) DEFAULT NULL,
  `loginId` varchar(255) DEFAULT NULL,
  `loginName` varchar(255) DEFAULT NULL,
  `logintime` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`logId`),
  KEY `orderIndex` (`orderIndex`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `loginlog` */

/*Table structure for table `menu` */

CREATE TABLE `menu` (
  `menuId` varchar(50) NOT NULL,
  `orderIndex` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(255) DEFAULT NULL,
  `layer` int(11) DEFAULT NULL,
  `nodeInfo` varchar(255) DEFAULT NULL,
  `nodeInfoType` varchar(255) DEFAULT NULL,
  `nodeType` varchar(255) DEFAULT NULL,
  `bigIcon` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `menuName` varchar(255) DEFAULT NULL,
  `moduleCode` varchar(255) DEFAULT NULL,
  `PARENT` varchar(50) DEFAULT NULL,
  `xcode` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`menuId`),
  KEY `FK_qdaoyx6vlyumyjjvp41ubehcr` (`PARENT`),
  KEY `orderIndex` (`orderIndex`),
  CONSTRAINT `FK_qdaoyx6vlyumyjjvp41ubehcr` FOREIGN KEY (`PARENT`) REFERENCES `menu` (`menuId`)
) ENGINE=InnoDB AUTO_INCREMENT=82 DEFAULT CHARSET=utf8;

/*Data for the table `menu` */

insert  into `menu`(`menuId`,`orderIndex`,`status`,`layer`,`nodeInfo`,`nodeInfoType`,`nodeType`,`bigIcon`,`icon`,`menuName`,`moduleCode`,`PARENT`,`xcode`) values ('402881e43c777156013c7771b5ef0001',1,'1',1,'','MENU','GENERAL','','','系统功能','SYSMODULE','ROOT','402881e43c720e8a013c720f151d0001'),('402881e43c777156013c77731e1d0002',2,'1',2,'icon.iconlayout,core.sys.icon.controller.IconController','FUNC','GENERAL','','','图标管理','sysicon_main','402881e43c777156013c7771b5ef0001','402881e43c720e8a013c720f151d0001'),('402881e43c81bbaa013c81bcdc550001',1,'1',2,'dd.ddlayout,core.sys.dd.controller.DDController','FUNC','LEAF','','','数子字典','dictionary_main','402881e43c777156013c7771b5ef0001','402881e43c720e8a013c720f151d0001'),('402881ea48022380014802256e970000',3,'1',NULL,'rbac.mainlayout,core.rbac.user.controller.DeptUserController','FUNC',NULL,'','','系统用户管理','DEPTUSER','402881e43c777156013c7771b5ef0001','402881e43c720e8a013c720f151d0001'),('402881ea4802238001480229ac270002',5,'1',NULL,'role.mainlayout,core.rbac.role.controller.RolePermController','FUNC',NULL,'','','菜单授权','ROLEPERM','402881e43c777156013c7771b5ef0001','402881e43c720e8a013c720f151d0001'),('402881ea480223800148022abbdd0003',6,'1',NULL,'menu.mainlayout,core.sys.menu.controller.MenuController','FUNC',NULL,'','','菜单管理','MENU','402881e43c777156013c7771b5ef0001','402881e43c720e8a013c720f151d0001'),('402881ed499926a20149992c8fb60000',81,NULL,NULL,'','',NULL,NULL,NULL,'图书管理紫菜带动','','402881e43c777156013c77731e1d0002',NULL),('ROOT',80,NULL,0,NULL,NULL,'ROOT','','','','ROOT',NULL,'402881e43c720e8a013c720f151d0001');

/*Table structure for table `modulegroup` */

CREATE TABLE `modulegroup` (
  `tf_moduleGroupId` varchar(10) NOT NULL,
  `tf_description` varchar(255) DEFAULT NULL,
  `tf_iconURL` varchar(255) DEFAULT NULL,
  `tf_remark` varchar(255) DEFAULT NULL,
  `tf_title` varchar(50) NOT NULL,
  PRIMARY KEY (`tf_moduleGroupId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `modulegroup` */

/*Table structure for table `operatelog` */

CREATE TABLE `operatelog` (
  `logId` varchar(50) NOT NULL,
  `orderIndex` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(255) DEFAULT NULL,
  `appName` varchar(255) DEFAULT NULL,
  `loginIP` varchar(255) DEFAULT NULL,
  `operatingID` varchar(255) DEFAULT NULL,
  `operatingModel` varchar(255) DEFAULT NULL,
  `operatingTime` varchar(255) DEFAULT NULL,
  `operatingType` varchar(255) DEFAULT NULL,
  `serverIP` varchar(255) DEFAULT NULL,
  `username` varchar(255) DEFAULT NULL,
  `xcode` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`logId`),
  KEY `orderIndex` (`orderIndex`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `operatelog` */

/*Table structure for table `paykey` */

CREATE TABLE `paykey` (
  `pid` varchar(50) NOT NULL,
  `orderIndex` int(11) NOT NULL AUTO_INCREMENT,
  `deptid` varchar(255) DEFAULT NULL,
  `keyword` varchar(255) DEFAULT NULL,
  `payCode` varchar(255) DEFAULT NULL,
  `realname` varchar(255) DEFAULT NULL,
  `remarks` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`pid`),
  KEY `orderIndex` (`orderIndex`)
) ENGINE=InnoDB DEFAULT CHARSET=gbk;

/*Data for the table `paykey` */

/*Table structure for table `permission` */

CREATE TABLE `permission` (
  `perId` varchar(50) NOT NULL,
  `orderIndex` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(255) DEFAULT NULL,
  `updateTime` varchar(255) DEFAULT NULL,
  `perCode` varchar(255) DEFAULT NULL,
  `perPath` varchar(255) DEFAULT NULL,
  `perType` varchar(255) DEFAULT NULL,
  `xcode` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`perId`),
  KEY `orderIndex` (`orderIndex`)
) ENGINE=InnoDB AUTO_INCREMENT=51 DEFAULT CHARSET=utf8;

/*Data for the table `permission` */

insert  into `permission`(`perId`,`orderIndex`,`status`,`updateTime`,`perCode`,`perPath`,`perType`,`xcode`) values ('402881e43c676362013c676b28b40004',1,NULL,NULL,'402881e53c38f4f7013c3927454f0004',NULL,'MENU','402881e43c720e8a013c720f151d0001'),('402881e43c676e4b013c6786d8750001',2,NULL,NULL,'402881e53c38f4f7013c3927f2540005',NULL,'MENU','402881e43c720e8a013c720f151d0001'),('402881e43c676e4b013c6786d89c0002',3,NULL,NULL,'402881e53c38f4f7013c392834960006',NULL,'MENU','402881e43c720e8a013c720f151d0001'),('402881e43c676e4b013c6786d8ab0003',4,NULL,NULL,'402881e53c38f4f7013c39287eaf0007',NULL,'MENU','402881e43c720e8a013c720f151d0001'),('402881e43c676e4b013c6786f8eb0004',5,NULL,NULL,'402881e53c392da4013c3943c7f20002',NULL,'MENU','402881e43c720e8a013c720f151d0001'),('402881e43c676e4b013c678db2fa0005',6,NULL,NULL,'402881e53c38f4f7013c3928cfcb0008',NULL,'MENU','402881e43c720e8a013c720f151d0001'),('402881e43c676e4b013c678e5373000a',7,NULL,NULL,'402881e73c3e34b0013c3e3babc90002',NULL,'MENU','402881e43c720e8a013c720f151d0001'),('402881e43ca00a18013ca02c5c3c0009',8,NULL,NULL,'402881e43ca00a18013ca02badf80008',NULL,'MENU','402881e43c720e8a013c720f151d0001'),('402881e4485920210148592653cf0008',9,NULL,NULL,'402881e448592021014859234d580000',NULL,'MENU','402881e43c720e8a013c720f151d0001'),('402881e4485920210148592653e50009',10,NULL,NULL,'402881e448592021014859242d270007',NULL,'MENU','402881e43c720e8a013c720f151d0001'),('402881e4485e4c4a01485e9ea3920019',11,NULL,NULL,'402881e4485e4c4a01485e776d5b0016',NULL,'MENU','402881e43c720e8a013c720f151d0001'),('402881e4485e4c4a01485e9ea3ac001a',12,NULL,NULL,'402881e4485e4c4a01485e9acbdf0018',NULL,'MENU','402881e43c720e8a013c720f151d0001'),('402881e6482f10b801482f16233a0002',13,NULL,NULL,'402881e6482f10b801482f11638a0000',NULL,'MENU','402881e43c720e8a013c720f151d0001'),('402881e6482f10b801482f1623530003',14,NULL,NULL,'402881e6482f10b801482f1375950001',NULL,'MENU','402881e43c720e8a013c720f151d0001'),('402881e6482f2e0201482f5632570001',15,NULL,NULL,'402881e6482f10b801482f1bf3870006',NULL,'MENU','402881e43c720e8a013c720f151d0001'),('402881e6482f2e0201482f5632750002',16,NULL,NULL,'402881e6482f2e0201482f53e51d0000',NULL,'MENU','402881e43c720e8a013c720f151d0001'),('402881e648301cc6014830205ba80000',17,NULL,NULL,'402881e6483002df0148300979a30004',NULL,'MENU','402881e43c720e8a013c720f151d0001'),('402881e648301cc6014830205bcd0001',18,NULL,NULL,'402881e6483002df0148300aedc30005',NULL,'MENU','402881e43c720e8a013c720f151d0001'),('402881e648301cc6014830205bdd0002',19,NULL,NULL,'402881e6483002df0148300e79d00006',NULL,'MENU','402881e43c720e8a013c720f151d0001'),('402881e648301cc6014830205bec0003',20,NULL,NULL,'402881e6483002df0148300edfb90007',NULL,'MENU','402881e43c720e8a013c720f151d0001'),('402881e748638347014863b23c9e0003',21,NULL,NULL,'402881e748638347014863ab23d90001',NULL,'MENU','402881e43c720e8a013c720f151d0001'),('402881e748638347014863b23cb90004',22,NULL,NULL,'402881e748638347014863abb5b70002',NULL,'MENU','402881e43c720e8a013c720f151d0001'),('402881e8483e6b5201483e7838330002',23,NULL,NULL,'402881e8483e6b5201483e6bbe7f0000',NULL,'MENU','402881e43c720e8a013c720f151d0001'),('402881e8483e6b5201483e78384a0003',24,NULL,NULL,'402881e8483e6b5201483e6caf9c0001',NULL,'MENU','402881e43c720e8a013c720f151d0001'),('402881ea4816511801481655e7ff0002',25,NULL,NULL,'402881ea4816511801481652f1120000',NULL,'MENU','402881e43c720e8a013c720f151d0001'),('402881ea4816511801481655e81e0003',26,NULL,NULL,'402881ea48165118014816541cb90001',NULL,'MENU','402881e43c720e8a013c720f151d0001'),('402881ed4825a96a014825ad22920002',27,NULL,NULL,'402881ed4825a96a014825a9fb110000',NULL,'MENU','402881e43c720e8a013c720f151d0001'),('402881ed4825a96a014825ad22aa0003',28,NULL,NULL,'402881ed4825a96a014825aaff400001',NULL,'MENU','402881e43c720e8a013c720f151d0001'),('402881ed483a082701483a129ce20002',29,NULL,NULL,'402881ed483a082701483a0b17900000',NULL,'MENU','402881e43c720e8a013c720f151d0001'),('402881ed483a082701483a129cfa0003',30,NULL,NULL,'402881ed483a082701483a0be68a0001',NULL,'MENU','402881e43c720e8a013c720f151d0001'),('402881ed48a6a9370148a6b92ecd0006',31,NULL,NULL,'402881ed48a6a9370148a6b778710005',NULL,'MENU','402881e43c720e8a013c720f151d0001'),('402881ed48a6a9370148a6b92efd0007',32,NULL,NULL,'402881ed48a6a9370148a6ad64620000',NULL,'MENU','402881e43c720e8a013c720f151d0001'),('402881ed48a6a9370148a6b92f110008',33,NULL,NULL,'402881ed48a6a9370148a6af75ac0001',NULL,'MENU','402881e43c720e8a013c720f151d0001'),('402881ed48a6a9370148a6b92f2c0009',34,NULL,NULL,'402881ed48a6a9370148a6b0f6d40002',NULL,'MENU','402881e43c720e8a013c720f151d0001'),('402881ed48a6a9370148a6b92f3f000a',35,NULL,NULL,'402881ed48a6a9370148a6b68f760004',NULL,'MENU','402881e43c720e8a013c720f151d0001'),('402881ed48a6a9370148a6b92f4e000b',36,NULL,NULL,'402881ed48a6a9370148a6b3a5560003',NULL,'MENU','402881e43c720e8a013c720f151d0001'),('402881ed48a6a9370148a6bf06be0018',37,NULL,NULL,'402881ed48a6a9370148a6baac6c000c',NULL,'MENU','402881e43c720e8a013c720f151d0001'),('402881ed48a6a9370148a6bf06d60019',38,NULL,NULL,'402881ed48a6a9370148a6bae0f2000d',NULL,'MENU','402881e43c720e8a013c720f151d0001'),('402881ed48a6a9370148a6bf06f1001a',39,NULL,NULL,'402881ed48a6a9370148a6bb422d000e',NULL,'MENU','402881e43c720e8a013c720f151d0001'),('402881ed48a6a9370148a6bf0702001b',40,NULL,NULL,'402881ed48a6a9370148a6be560f0016',NULL,'MENU','402881e43c720e8a013c720f151d0001'),('402881ed48a6a9370148a6bf0714001c',41,NULL,NULL,'402881ed48a6a9370148a6be9f290017',NULL,'MENU','402881e43c720e8a013c720f151d0001'),('402881ed48b00ede0148b01a56310002',42,NULL,NULL,'402881ed48b00ede0148b01888770001',NULL,'MENU','402881e43c720e8a013c720f151d0001'),('402881ed48e9d8940148e9db166e0000',43,NULL,NULL,'402881e43c777156013c7771b5ef0001',NULL,'MENU','402881e43c720e8a013c720f151d0001'),('402881ed48e9d8940148e9db16960001',44,NULL,NULL,'402881e43c777156013c77731e1d0002',NULL,'MENU','402881e43c720e8a013c720f151d0001'),('402881ed48e9d8940148e9db16b30002',45,NULL,NULL,'402881e43c81bbaa013c81bcdc550001',NULL,'MENU','402881e43c720e8a013c720f151d0001'),('402881ed48e9d8940148e9db16cf0003',46,NULL,NULL,'402881ea48022380014802256e970000',NULL,'MENU','402881e43c720e8a013c720f151d0001'),('402881ed48e9d8940148e9db16ee0004',47,NULL,NULL,'402881ea4802238001480229ac270002',NULL,'MENU','402881e43c720e8a013c720f151d0001'),('402881ed48e9d8940148e9db17080005',48,NULL,NULL,'402881ea480223800148022abbdd0003',NULL,'MENU','402881e43c720e8a013c720f151d0001'),('402881f148680e670148681347170003',49,NULL,NULL,'402881f148680e67014868115cc90001',NULL,'MENU','402881e43c720e8a013c720f151d0001'),('402881f148680e670148681347740004',50,NULL,NULL,'402881f148680e6701486811ea700002',NULL,'MENU','402881e43c720e8a013c720f151d0001');

/*Table structure for table `province` */

CREATE TABLE `province` (
  `ProName` varchar(50) DEFAULT NULL,
  `ProSort` varchar(50) DEFAULT NULL,
  `ProRemark` varchar(50) DEFAULT NULL,
  `autonomy` varbinary(5) DEFAULT 'false'
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `province` */

insert  into `province`(`ProName`,`ProSort`,`ProRemark`,`autonomy`) values ('天津市','2','直辖市','true'),('河北省','3','省份','false'),('山西省','4','省份','false'),('内蒙古自治区','5','自治区','false'),('辽宁省','6','省份','false'),('吉林省','7','省份','false'),('黑龙江省','8','省份','false'),('上海市','9','直辖市','true'),('江苏省','10','省份','false'),('浙江省','11','省份','false'),('安徽省','12','省份','false'),('福建省','13','省份','false'),('江西省','14','省份','false'),('山东省','15','省份','false'),('河南省','16','省份','false'),('湖北省','17','省份','false'),('湖南省','18','省份','false'),('广东省','19','省份','false'),('海南省','20','省份','false'),('广西壮族自治区','21','自治区','false'),('甘肃省','22','省份','false'),('陕西省','23','省份','false'),('新 疆维吾尔自治区','24','自治区','false'),('青海省','25','省份','false'),('宁夏回族自治区','26','自治区','false'),('重庆市','27','直辖市','true'),('四川省','28','省份','false'),('贵州省','29','省份','false'),('云南省','30','省份','false'),('西藏自治区','31','自治区','false'),('台湾省','32','省份','false'),('澳门特别行政区','33','特别行政区','false'),('香港特别行政区','34','特别行政区','false'),('北京市','1','直辖市','true'),('天津市','2','直辖市','true'),('河北省','3','省份','false'),('山西省','4','省份','false'),('内蒙古自治区','5','自治区','false'),('辽宁省','6','省份','false'),('吉林省','7','省份','false'),('黑龙江省','8','省份','false'),('上海市','9','直辖市','true'),('江苏省','10','省份','false'),('浙江省','11','省份','false'),('安徽省','12','省份','false'),('福建省','13','省份','false'),('江西省','14','省份','false'),('山东省','15','省份','false'),('河南省','16','省份','false'),('湖北省','17','省份','false'),('湖南省','18','省份','false'),('广东省','19','省份','false'),('海南省','20','省份','false'),('广西壮族自治区','21','自治区','false'),('甘肃省','22','省份','false'),('陕西省','23','省份','false'),('新 疆维吾尔自治区','24','自治区','false'),('青海省','25','省份','false'),('宁夏回族自治区','26','自治区','false'),('重庆市','27','直辖市','true'),('四川省','28','省份','false'),('贵州省','29','省份','false'),('云南省','30','省份','false'),('西藏自治区','31','自治区','false'),('台湾省','32','省份','false'),('澳门特别行政区','33','特别行政区','false'),('香港特别行政区','34','特别行政区','false');

/*Table structure for table `role` */

CREATE TABLE `role` (
  `roleId` varchar(50) NOT NULL,
  `orderIndex` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(255) DEFAULT NULL,
  `updateTime` varchar(255) DEFAULT NULL,
  `roleCode` varchar(255) DEFAULT NULL,
  `roleName` varchar(255) DEFAULT NULL,
  `xcode` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`roleId`),
  KEY `orderIndex` (`orderIndex`)
) ENGINE=InnoDB AUTO_INCREMENT=2 DEFAULT CHARSET=utf8;

/*Data for the table `role` */

insert  into `role`(`roleId`,`orderIndex`,`status`,`updateTime`,`roleCode`,`roleName`,`xcode`) values ('402881e43c720e8a013c720f717c0002',1,NULL,NULL,'GLY','超级管理员','402881e43c720e8a013c720f151d0001');

/*Table structure for table `role_perm` */

CREATE TABLE `role_perm` (
  `roleId` varchar(50) NOT NULL,
  `perId` varchar(50) NOT NULL,
  PRIMARY KEY (`perId`,`roleId`),
  KEY `FK_lu3yh7fvks2nw3c8flww5j0rq` (`roleId`),
  CONSTRAINT `FK_c7i5vct7eh8hvde8natoy0b0o` FOREIGN KEY (`perId`) REFERENCES `permission` (`perId`),
  CONSTRAINT `FK_lu3yh7fvks2nw3c8flww5j0rq` FOREIGN KEY (`roleId`) REFERENCES `role` (`roleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `role_perm` */

insert  into `role_perm`(`roleId`,`perId`) values ('402881e43c720e8a013c720f717c0002','402881e43c676362013c676b28b40004'),('402881e43c720e8a013c720f717c0002','402881e43c676e4b013c6786d8750001'),('402881e43c720e8a013c720f717c0002','402881e43c676e4b013c6786d89c0002'),('402881e43c720e8a013c720f717c0002','402881e43c676e4b013c6786d8ab0003'),('402881e43c720e8a013c720f717c0002','402881e43c676e4b013c6786f8eb0004'),('402881e43c720e8a013c720f717c0002','402881e43c676e4b013c678db2fa0005'),('402881e43c720e8a013c720f717c0002','402881e43ca00a18013ca02c5c3c0009'),('402881e43c720e8a013c720f717c0002','402881e4485920210148592653cf0008'),('402881e43c720e8a013c720f717c0002','402881e4485920210148592653e50009'),('402881e43c720e8a013c720f717c0002','402881e4485e4c4a01485e9ea3920019'),('402881e43c720e8a013c720f717c0002','402881e4485e4c4a01485e9ea3ac001a'),('402881e43c720e8a013c720f717c0002','402881e6482f10b801482f16233a0002'),('402881e43c720e8a013c720f717c0002','402881e6482f10b801482f1623530003'),('402881e43c720e8a013c720f717c0002','402881e6482f2e0201482f5632570001'),('402881e43c720e8a013c720f717c0002','402881e6482f2e0201482f5632750002'),('402881e43c720e8a013c720f717c0002','402881e648301cc6014830205ba80000'),('402881e43c720e8a013c720f717c0002','402881e648301cc6014830205bcd0001'),('402881e43c720e8a013c720f717c0002','402881e648301cc6014830205bdd0002'),('402881e43c720e8a013c720f717c0002','402881e648301cc6014830205bec0003'),('402881e43c720e8a013c720f717c0002','402881e748638347014863b23c9e0003'),('402881e43c720e8a013c720f717c0002','402881e748638347014863b23cb90004'),('402881e43c720e8a013c720f717c0002','402881e8483e6b5201483e7838330002'),('402881e43c720e8a013c720f717c0002','402881e8483e6b5201483e78384a0003'),('402881e43c720e8a013c720f717c0002','402881ea4816511801481655e7ff0002'),('402881e43c720e8a013c720f717c0002','402881ea4816511801481655e81e0003'),('402881e43c720e8a013c720f717c0002','402881ed4825a96a014825ad22920002'),('402881e43c720e8a013c720f717c0002','402881ed4825a96a014825ad22aa0003'),('402881e43c720e8a013c720f717c0002','402881ed483a082701483a129ce20002'),('402881e43c720e8a013c720f717c0002','402881ed483a082701483a129cfa0003'),('402881e43c720e8a013c720f717c0002','402881ed48a6a9370148a6b92ecd0006'),('402881e43c720e8a013c720f717c0002','402881ed48a6a9370148a6b92efd0007'),('402881e43c720e8a013c720f717c0002','402881ed48a6a9370148a6b92f110008'),('402881e43c720e8a013c720f717c0002','402881ed48a6a9370148a6b92f2c0009'),('402881e43c720e8a013c720f717c0002','402881ed48a6a9370148a6b92f3f000a'),('402881e43c720e8a013c720f717c0002','402881ed48a6a9370148a6b92f4e000b'),('402881e43c720e8a013c720f717c0002','402881ed48a6a9370148a6bf06be0018'),('402881e43c720e8a013c720f717c0002','402881ed48a6a9370148a6bf06d60019'),('402881e43c720e8a013c720f717c0002','402881ed48a6a9370148a6bf06f1001a'),('402881e43c720e8a013c720f717c0002','402881ed48a6a9370148a6bf0702001b'),('402881e43c720e8a013c720f717c0002','402881ed48a6a9370148a6bf0714001c'),('402881e43c720e8a013c720f717c0002','402881ed48b00ede0148b01a56310002'),('402881e43c720e8a013c720f717c0002','402881ed48e9d8940148e9db166e0000'),('402881e43c720e8a013c720f717c0002','402881ed48e9d8940148e9db16960001'),('402881e43c720e8a013c720f717c0002','402881ed48e9d8940148e9db16b30002'),('402881e43c720e8a013c720f717c0002','402881ed48e9d8940148e9db16cf0003'),('402881e43c720e8a013c720f717c0002','402881ed48e9d8940148e9db16ee0004'),('402881e43c720e8a013c720f717c0002','402881ed48e9d8940148e9db17080005'),('402881e43c720e8a013c720f717c0002','402881f148680e670148681347170003'),('402881e43c720e8a013c720f717c0002','402881f148680e670148681347740004');

/*Table structure for table `role_user` */

CREATE TABLE `role_user` (
  `roleId` varchar(50) NOT NULL,
  `userId` varchar(50) NOT NULL,
  PRIMARY KEY (`userId`,`roleId`),
  KEY `FK_mb8h4scg5hernjhvd9wuu2748` (`roleId`),
  CONSTRAINT `FK_lt4go7dpqnmb2bbtr04a056k3` FOREIGN KEY (`userId`) REFERENCES `enduser` (`userId`),
  CONSTRAINT `FK_mb8h4scg5hernjhvd9wuu2748` FOREIGN KEY (`roleId`) REFERENCES `role` (`roleId`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

/*Data for the table `role_user` */

insert  into `role_user`(`roleId`,`userId`) values ('402881e43c720e8a013c720f717c0002','402881e43c720e8a013c720f151d0001'),('402881e43c720e8a013c720f717c0002','402881ea480b3f6001480ba4a1ff0010'),('402881e43c720e8a013c720f717c0002','402881ed48e9b5e20148e9b7a9550000');

/*Table structure for table `sysicon` */

CREATE TABLE `sysicon` (
  `id` varchar(50) NOT NULL,
  `orderIndex` int(11) NOT NULL AUTO_INCREMENT,
  `status` varchar(255) DEFAULT NULL,
  `updateTime` varchar(255) DEFAULT NULL,
  `icon` varchar(255) DEFAULT NULL,
  `iconCls` varchar(255) DEFAULT NULL,
  `iconName` varchar(255) DEFAULT NULL,
  `pixel` varchar(255) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  `xcode` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `orderIndex` (`orderIndex`)
) ENGINE=InnoDB AUTO_INCREMENT=10 DEFAULT CHARSET=utf8;

/*Data for the table `sysicon` */

insert  into `sysicon`(`id`,`orderIndex`,`status`,`updateTime`,`icon`,`iconCls`,`iconName`,`pixel`,`remark`,`xcode`) values ('402881e43c777d52013c7782cf2d0001',8,'1',NULL,'/resource/cls//2014-07-24/b72cf924-0373-458c-85c8-401f39b96cb3.d18db08d-8034-4875-9738-0e77781cd635.png','dataadd','添加','16*16',NULL,'402881e43c720e8a013c720f151d0001'),('402881e43c777d52013c77843d4e0002',8,'1',NULL,'/resource/cls//2014-07-24/54de1d8e-2935-4803-8156-df50af21185e.c4fd7e8f-412a-4061-a114-57d2eeff1f49.png','datadelete','删除','16*16',NULL,'402881e43c720e8a013c720f151d0001'),('402881e43c77aa7f013c77aeb2810001',8,'1',NULL,'/resource/cls//2014-07-24/02f8b4db-df26-4782-adc0-2784a743330e.4f7a3cdc-7ff7-46c2-8217-264db8dd6f89.png','bigicon','大图标测试','16*16',NULL,'402881e43c720e8a013c720f151d0001'),('402881e43c993eb2013c994591740001',8,'1',NULL,'/resource/cls//2014-07-24/fecc79ba-35a9-4fbf-bb49-ee51201e802d.085f0436-7a58-461e-ad0f-ac01c65db7c7.png','clear_cache','清除缓存','16*16',NULL,'402881e43c720e8a013c720f151d0001'),('402881e43c993eb2013c994622630002',8,'1',NULL,'/resource/cls//2014-07-24/f7e9c120-ce69-4e96-a75e-d470897c78c6.5293649d-cd91-499a-8494-5fc789b4f16d.png','tree_set_perm','权限授权','16*16',NULL,'402881e43c720e8a013c720f151d0001'),('402881e43c993eb2013c994686e80003',8,'1',NULL,'/resource/cls//2014-07-24/a258d370-8f44-4cf5-aef9-80d51971e024.656cf615-2200-41b6-a6b1-f6be0476e424.png','tree_see_perm','权限查看','16*16',NULL,'402881e43c720e8a013c720f151d0001'),('402881e647660d25014766231b940003',9,'1',NULL,'/resource/cls//2014-08-26/f679bab1-bcbf-4db0-bc90-979183f578c5.edit.png','table_edit','编辑按钮','16*16',NULL,'402881e43c720e8a013c720f151d0001');

/*Table structure for table `village` */

CREATE TABLE `village` (
  `viid` varchar(50) NOT NULL,
  `city` varchar(255) DEFAULT NULL,
  `introduce` varchar(255) DEFAULT NULL,
  `location` varchar(255) DEFAULT NULL,
  `locationxy` varchar(255) DEFAULT NULL,
  `name` varchar(255) DEFAULT NULL,
  `province` varchar(255) DEFAULT NULL,
  `summary` varchar(255) DEFAULT NULL,
  `orderIndex` int(11) NOT NULL AUTO_INCREMENT,
  PRIMARY KEY (`viid`),
  KEY `orderIndex` (`orderIndex`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

/*Data for the table `village` */

insert  into `village`(`viid`,`city`,`introduce`,`location`,`locationxy`,`name`,`province`,`summary`,`orderIndex`) values ('402881ed48e3801f0148e38567740003',NULL,NULL,NULL,NULL,'天盈建博汇',NULL,NULL,1),('asssssssssssqwq121',NULL,NULL,NULL,NULL,'呵呵呵花园',NULL,NULL,2);

/*Table structure for table `vdeptuser` */

DROP TABLE IF EXISTS `vdeptuser`;

/*!50001 CREATE TABLE  `vdeptuser`(
 `id` varchar(50) ,
 `text` varchar(255) ,
 `code` varchar(255) ,
 `nodeType` varchar(255) ,
 `nodeInfo` varchar(10) ,
 `nodeInfoType` varchar(255) ,
 `parent` varchar(50) ,
 `orderIndex` bigint(20) ,
 `disabled` varchar(5) ,
 `icon` varchar(33) 
)*/;

/*View structure for view vdeptuser */

/*!50001 DROP TABLE IF EXISTS `vdeptuser` */;
/*!50001 CREATE ALGORITHM=UNDEFINED DEFINER=`root`@`localhost` SQL SECURITY DEFINER VIEW `vdeptuser` AS select `d`.`deptId` AS `id`,`d`.`deptName` AS `text`,`d`.`deptCode` AS `code`,`d`.`nodeType` AS `nodeType`,'Department' AS `nodeInfo`,`d`.`nodeInfoType` AS `nodeInfoType`,`d`.`PARENT` AS `parent`,`d`.`orderIndex` AS `orderIndex`,'TRUE' AS `disabled`,'' AS `icon` from `department` `d` union select `u`.`userId` AS `id`,`u`.`username` AS `text`,`u`.`userCode` AS `code`,'LEAF' AS `nodeType`,'User' AS `nodeInfo`,'' AS `nodeInfoType`,`u`.`deptId` AS `parent`,0 AS `orderIndex`,'FALSE' AS `disabled`,'core/css/image/tree/tree_user.png' AS `icon` from `enduser` `u` */;

/*!40101 SET SQL_MODE=@OLD_SQL_MODE */;
/*!40014 SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS */;
/*!40014 SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS */;
/*!40111 SET SQL_NOTES=@OLD_SQL_NOTES */;
