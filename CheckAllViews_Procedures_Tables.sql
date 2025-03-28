use sceneon
SELECT name AS 'Procedure Name'
FROM sys.procedures
WHERE type = 'P'  -- P = SQL Stored Procedure
ORDER BY name;

use SceneOn
SELECT name AS 'View Name'
FROM sys.views
ORDER BY name;


use SceneOn
SELECT name AS 'Table Name'
FROM sys.tables
ORDER BY name;


