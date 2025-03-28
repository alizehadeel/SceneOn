use SceneOn
GO
SELECT * FROM Users;
SELECT * FROM Cities;
SELECT * FROM Categories;
SELECT * FROM Events;
SELECT * FROM UserPreferences;
SELECT * FROM EventOrganizers;
SELECT * FROM EventOrganizerMapping;
SELECT * FROM Admins;
																			
																		--INSERTIONS
-- Inserting 3 users into the Users table
INSERT INTO Users (Name, Email, PasswordHash)
VALUES 
    ('Ali Khan', 'ali.khan@example.com', 'hashedpassword1'), -- User 1
    ('Sara Ahmed', 'sara.ahmed@example.com', 'hashedpassword2'), -- User 2
    ('Bilal Shah', 'bilal.shah@example.com', 'hashedpassword3'); -- User 3

	-- Inserting 3 cities into the Cities table
INSERT INTO Cities (CityName, Province)
VALUES 
    ('Lahore', 'Punjab'), -- City 1
    ('Karachi', 'Sindh'), -- City 2
    ('Islamabad', 'Federal Capital'); -- City 3

	-- Inserting 4 categories into the Categories table
INSERT INTO Categories (CategoryName)
VALUES 
    ('Music'), -- Category 1
    ('Sports'), -- Category 2
    ('Theater'), -- Category 3
    ('Comedy'); -- Category 4

	-- Inserting 4 events into the Events table
INSERT INTO Events (Title, Description, CategoryID, CityID, Location, StartTime, EndTime, Budget, TicketLink)
VALUES 
    ('Rock Concert', 'A night of rock music with top bands.', 1, 1, 'Alhamra Arts Council', '2023-12-15 19:00:00', '2023-12-15 23:00:00', 1500.00, 'https://ticketwala.pk/rock-concert'), -- Event 1 (Music in Lahore)
    ('Cricket Match', 'Pakistan vs Australia T20 match.', 2, 2, 'National Stadium', '2023-12-20 14:00:00', '2023-12-20 18:00:00', 2000.00, 'https://ticketwala.pk/cricket-match'), -- Event 2 (Sports in Karachi)
    ('Comedy Show', 'Stand-up comedy by famous comedians.', 4, 3, 'PNCA Auditorium', '2023-12-10 20:00:00', '2023-12-10 22:00:00', 1000.00, 'https://ticketwala.pk/comedy-show'), -- Event 3 (Comedy in Islamabad)
    ('Theater Play', 'A classic play by local artists.', 3, 1, 'Lok Virsa', '2023-12-25 18:00:00', '2023-12-25 21:00:00', 1200.00, 'https://ticketwala.pk/theater-play'); -- Event 4 (Theater in Lahore)

	-- Inserting 3 user preferences into the UserPreferences table
INSERT INTO UserPreferences (UserID, PreferredTime, BudgetRange, CategoryID)
VALUES 
    (1, '18:00:00', 2000.00, 1), -- Ali prefers Music events in the evening with a budget of 2000
    (2, '14:00:00', 1500.00, 2), -- Sara prefers Sports events in the afternoon with a budget of 1500
    (3, '20:00:00', 1000.00, 4); -- Bilal prefers Comedy events at night with a budget of 1000
	-- Inserting 4 event organizers into the EventOrganizers table
INSERT INTO EventOrganizers (Name, ContactInfo)
VALUES 
    ('Rock Nation', 'rocknation@example.com'), -- Organizer 1 (Rock Concert)
    ('Sports Pakistan', 'sportspk@example.com'), -- Organizer 2 (Cricket Match)
    ('Laugh Factory', 'laughfactory@example.com'), -- Organizer 3 (Comedy Show)
    ('Theater Arts', 'theaterarts@example.com'); -- Organizer 4 (Theater Play)
	-- Mapping events to their respective organizers in the EventOrganizerMapping table
INSERT INTO EventOrganizerMapping (EventID, OrganizerID)
VALUES 
    (1, 1), -- Rock Concert (Event 1) is organized by Rock Nation (Organizer 1)
    (2, 2), -- Cricket Match (Event 2) is organized by Sports Pakistan (Organizer 2)
    (3, 3), -- Comedy Show (Event 3) is organized by Laugh Factory (Organizer 3)
    (4, 4); -- Theater Play (Event 4) is organized by Theater Arts (Organizer 4)

	-- Inserting 2 admins into the Admins table
INSERT INTO Admins (UserID, Role)
VALUES 
    (1, 'Super Admin'), -- Ali Khan (User 1) is a Super Admin
    (2, 'Event Manager'); -- Sara Ahmed (User 2) is an Event Manager










	--																FUNCTIONALITIES    (PROCEDURES)

	CREATE PROCEDURE GetEventsByCityAndCategory
    @CityName NVARCHAR(255),
    @CategoryName NVARCHAR(255)
AS
BEGIN
    SELECT 
        E.EventID, 
        E.Title, 
        E.Description, 
        E.Location, 
        E.StartTime, 
        E.EndTime, 
        E.Budget, 
        E.TicketLink,
        C.CategoryName,
        Ci.CityName
    FROM 
        Events E
    JOIN 
        Categories C ON E.CategoryID = C.CategoryID
    JOIN 
        Cities Ci ON E.CityID = Ci.CityID
    WHERE 
        Ci.CityName = @CityName
        AND C.CategoryName = @CategoryName;
END;

select * from events
select * from Categories
select * from Cities
EXEC GetEventsByCityAndCategory @CityName = 'Karachi', @CategoryName = 'Sports';












CREATE PROCEDURE GetRecommendedEvents
    @UserID INT
AS
BEGIN
    SELECT 
        E.EventID, 
        E.Title, 
        E.Description, 
        E.Location, 
        E.StartTime, 
        E.EndTime, 
        E.Budget, 
        E.TicketLink,
        C.CategoryName,
        Ci.CityName
    FROM 
        Events E
    JOIN 
        Categories C ON E.CategoryID = C.CategoryID
    JOIN 
        Cities Ci ON E.CityID = Ci.CityID
    JOIN 
        UserPreferences UP ON E.CategoryID = UP.CategoryID
    WHERE 
        UP.UserID = @UserID
        AND E.Budget <= UP.BudgetRange
        AND CAST(E.StartTime AS TIME) >= UP.PreferredTime;
END;

EXEC GetRecommendedEvents @UserID = 1;
Select * from Users
select * from UserPreferences
















CREATE PROCEDURE GetEventsByOrganizer
    @OrganizerID INT
AS
BEGIN
    SELECT 
        E.EventID, 
        E.Title, 
        E.Description, 
        E.Location, 
        E.StartTime, 
        E.EndTime, 
        E.Budget, 
        E.TicketLink,
        C.CategoryName,
        Ci.CityName
    FROM 
        Events E
    JOIN 
        EventOrganizerMapping EOM ON E.EventID = EOM.EventID
    JOIN 
        EventOrganizers EO ON EOM.OrganizerID = EO.OrganizerID
    JOIN 
        Categories C ON E.CategoryID = C.CategoryID
    JOIN 
        Cities Ci ON E.CityID = Ci.CityID
    WHERE 
        EO.OrganizerID = @OrganizerID;
END;

EXEC GetEventsByOrganizer @OrganizerID = 1;













CREATE PROCEDURE GetAdminDashboard
AS
BEGIN
    SELECT 
        U.UserID,
        U.Name AS UserName,
        U.Email AS UserEmail,
        E.EventID,
        E.Title AS EventTitle,
        E.StartTime,
        E.EndTime,
        EO.OrganizerID,
        EO.Name AS OrganizerName,
        EO.ContactInfo AS OrganizerContact
    FROM 
        Users U
    LEFT JOIN 
        Admins A ON U.UserID = A.UserID
    LEFT JOIN 
        Events E ON 1=1
    LEFT JOIN 
        EventOrganizerMapping EOM ON E.EventID = EOM.EventID
    LEFT JOIN 
        EventOrganizers EO ON EOM.OrganizerID = EO.OrganizerID;
END;

EXEC GetAdminDashboard;


















CREATE PROCEDURE GetEventDetails
    @EventID INT
AS
BEGIN
    SELECT 
        E.EventID, 
        E.Title, 
        E.Description, 
        E.Location, 
        E.StartTime, 
        E.EndTime, 
        E.Budget, 
        E.TicketLink,
        C.CategoryName,
        Ci.CityName
    FROM 
        Events E
    JOIN 
        Categories C ON E.CategoryID = C.CategoryID
    JOIN 
        Cities Ci ON E.CityID = Ci.CityID
    WHERE 
        E.EventID = @EventID;
END;
EXEC GetEventDetails @EventID = 1;




















CREATE PROCEDURE GetLowBudgetEvents
    @MaxBudget DECIMAL(10, 2)
AS
BEGIN
    SELECT 
        E.EventID, 
        E.Title, 
        E.Description, 
        E.Location, 
        E.StartTime, 
        E.EndTime, 
        E.Budget, 
        E.TicketLink,
        C.CategoryName,
        Ci.CityName
    FROM 
        Events E
    JOIN 
        Categories C ON E.CategoryID = C.CategoryID
    JOIN 
        Cities Ci ON E.CityID = Ci.CityID
    WHERE 
        E.Budget <= @MaxBudget;
END;


EXEC GetLowBudgetEvents @MaxBudget = 1000;











CREATE PROCEDURE GetEventsByDateRangeAndFilters
    @StartDate DATE,
    @EndDate DATE,
    @CityName NVARCHAR(255) = NULL,  -- Optional: Filter by city
    @CategoryName NVARCHAR(255) = NULL  -- Optional: Filter by category
AS
BEGIN
    SELECT 
        E.EventID, 
        E.Title, 
        E.Description, 
        E.Location, 
        E.StartTime, 
        E.EndTime, 
        E.Budget, 
        E.TicketLink,
        C.CategoryName,
        Ci.CityName
    FROM 
        Events E
    JOIN 
        Categories C ON E.CategoryID = C.CategoryID
    JOIN 
        Cities Ci ON E.CityID = Ci.CityID
    WHERE 
        CAST(E.StartTime AS DATE) BETWEEN @StartDate AND @EndDate
        AND (@CityName IS NULL OR Ci.CityName = @CityName)
        AND (@CategoryName IS NULL OR C.CategoryName = @CategoryName)
    ORDER BY 
        E.StartTime;
END;

EXEC GetEventsByDateRangeAndFilters 
    @StartDate = '2024-03-04', 
    @EndDate = '2024-03-10',
    @CityName = 'Karachi',
    @CategoryName = 'Comedy';









																								--VIEWS--
CREATE VIEW EventDetails AS
SELECT 
    E.EventID, 
    E.Title, 
    E.Description, 
    E.Location, 
    E.StartTime, 
    E.EndTime, 
    E.Budget, 
    E.TicketLink,
    C.CategoryName,
    Ci.CityName
FROM 
    Events E
JOIN 
    Categories C ON E.CategoryID = C.CategoryID
JOIN 
    Cities Ci ON E.CityID = Ci.CityID;

SELECT * FROM EventDetails;













CREATE VIEW UserEventRecommendations AS
SELECT 
    UP.UserID,
    E.EventID, 
    E.Title, 
    E.Description, 
    E.Location, 
    E.StartTime, 
    E.EndTime, 
    E.Budget, 
    E.TicketLink,
    C.CategoryName,
    Ci.CityName
FROM 
    Events E
JOIN 
    Categories C ON E.CategoryID = C.CategoryID
JOIN 
    Cities Ci ON E.CityID = Ci.CityID
JOIN 
    UserPreferences UP ON E.CategoryID = UP.CategoryID
WHERE 
    E.Budget <= UP.BudgetRange
    AND CAST(E.StartTime AS TIME) >= UP.PreferredTime;

SELECT * FROM UserEventRecommendations WHERE UserID = 1;












CREATE VIEW OrganizerEvents AS
SELECT 
    EO.OrganizerID,
    E.EventID, 
    E.Title, 
    E.Description, 
    E.Location, 
    E.StartTime, 
    E.EndTime, 
    E.Budget, 
    E.TicketLink,
    C.CategoryName,
    Ci.CityName
FROM 
    Events E
JOIN 
    EventOrganizerMapping EOM ON E.EventID = EOM.EventID
JOIN 
    EventOrganizers EO ON EOM.OrganizerID = EO.OrganizerID
JOIN 
    Categories C ON E.CategoryID = C.CategoryID
JOIN 
    Cities Ci ON E.CityID = Ci.CityID;


SELECT * FROM OrganizerEvents WHERE OrganizerID = 1;












CREATE VIEW AdminDashboard AS
SELECT 
    U.UserID,
    U.Name AS UserName,
    U.Email AS UserEmail,
    E.EventID,
    E.Title AS EventTitle,
    E.StartTime,
    E.EndTime,
    EO.OrganizerID,
    EO.Name AS OrganizerName,
    EO.ContactInfo AS OrganizerContact
FROM 
    Users U
LEFT JOIN 
    Admins A ON U.UserID = A.UserID
LEFT JOIN 
    Events E ON 1=1
LEFT JOIN 
    EventOrganizerMapping EOM ON E.EventID = EOM.EventID
LEFT JOIN 
    EventOrganizers EO ON EOM.OrganizerID = EO.OrganizerID;

	SELECT * FROM AdminDashboard;














	CREATE VIEW LowBudgetEvents AS
SELECT 
    E.EventID, 
    E.Title, 
    E.Description, 
    E.Location, 
    E.StartTime, 
    E.EndTime, 
    E.Budget, 
    E.TicketLink,
    C.CategoryName,
    Ci.CityName
FROM 
    Events E
JOIN 
    Categories C ON E.CategoryID = C.CategoryID
JOIN 
    Cities Ci ON E.CityID = Ci.CityID
WHERE 
    E.Budget <= 1000; -- Adjust the budget threshold as needed


	SELECT * FROM LowBudgetEvents;

























	CREATE VIEW UserPreferencesWithDetails AS
SELECT 
    UP.PreferenceID,
    U.UserID,
    U.Name AS UserName,
    UP.PreferredTime,
    UP.BudgetRange,
    C.CategoryName
FROM 
    UserPreferences UP
JOIN 
    Users U ON UP.UserID = U.UserID
JOIN 
    Categories C ON UP.CategoryID = C.CategoryID;


SELECT * FROM UserPreferencesWithDetails;



CREATE VIEW EventOrganizerDetails AS
SELECT 
    E.EventID, 
    E.Title, 
    E.Description, 
    E.Location, 
    E.StartTime, 
    E.EndTime, 
    E.Budget, 
    E.TicketLink,
    C.CategoryName,
    Ci.CityName,
    EO.OrganizerID,
    EO.Name AS OrganizerName,
    EO.ContactInfo AS OrganizerContact
FROM 
    Events E
JOIN 
    EventOrganizerMapping EOM ON E.EventID = EOM.EventID
JOIN 
    EventOrganizers EO ON EOM.OrganizerID = EO.OrganizerID
JOIN 
    Categories C ON E.CategoryID = C.CategoryID
JOIN 
    Cities Ci ON E.CityID = Ci.CityID;

	SELECT * FROM EventOrganizerDetails;