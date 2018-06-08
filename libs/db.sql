
CREATE TABLE IF NOT EXISTS Url  (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT,
    url  TEXT,
    type TEXT NOT NULL DEFAULT "douban",
    prehabit INTEGER DEFAULT 0,
    is_scan INTEGER DEFAULT 0
);

-- INSERT INTO Url (url) VALUES("https://www.douban.com/group/shanghaizufang/");

-- INSERT INTO Url (url) VALUES("https://www.douban.com/group/shzf/");


 CREATE TABLE IF NOT EXISTS renthouse(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    uid INTEGER NOT NULL,
    title TEXT NOT NULL,
    username TEXT,
    create_time TimeStamp,
    update_time TimeStamp,
    url TEXT,
    content TEXT
);