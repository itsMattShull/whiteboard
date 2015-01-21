CREATE TABLE `projects` (
  `ID` int(255) NOT NULL AUTO_INCREMENT,
  `name` varchar(50) NOT NULL,
  `producer` varchar(50) NOT NULL,
  `active` int(1) NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=13 ;

CREATE TABLE `tasks` (
  `ID` int(255) NOT NULL AUTO_INCREMENT,
  `title` varchar(150) NOT NULL,
  `description` longtext NOT NULL,
  `userID` int(255) NOT NULL,
  `projectID` int(255) NOT NULL,
  `list` varchar(150) NOT NULL,
  `itemOrder` int(255) NOT NULL,
  `color` varchar(10) NOT NULL,
  `datetime` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `subOrder` int(255) NOT NULL DEFAULT '1',
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=41 ;

CREATE TABLE `whiteboard_users` (
  `ID` int(255) NOT NULL AUTO_INCREMENT,
  `projectID` int(255) NOT NULL,
  `name` varchar(100) NOT NULL,
  `color` varchar(10) NOT NULL,
  PRIMARY KEY (`ID`)
) ENGINE=MyISAM  DEFAULT CHARSET=latin1 AUTO_INCREMENT=24 ;
