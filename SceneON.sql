Create database SceneOn
Use SceneOn
Go

CREATE TABLE Users (
    UserID INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(255) NOT NULL,
    Email NVARCHAR(255) UNIQUE NOT NULL,
    PasswordHash NVARCHAR(255) NOT NULL
);

CREATE TABLE Cities (
    CityID INT PRIMARY KEY IDENTITY(1,1),
    CityName NVARCHAR(255) NOT NULL,
    Province NVARCHAR(255) NOT NULL
);

CREATE TABLE Categories (
    CategoryID INT PRIMARY KEY IDENTITY(1,1),
    CategoryName NVARCHAR(255) NOT NULL
);

CREATE TABLE Events (
    EventID INT PRIMARY KEY IDENTITY(1,1),
    Title NVARCHAR(255) NOT NULL,
    Description NVARCHAR(MAX) NOT NULL,
    CategoryID INT NOT NULL,
    CityID INT NOT NULL,
    Location NVARCHAR(255) NOT NULL,
    StartTime DATETIME NOT NULL,
    EndTime DATETIME NOT NULL,
    Budget DECIMAL(10, 2) NOT NULL,
    TicketLink NVARCHAR(255) NOT NULL,
    CONSTRAINT FK_Events_Categories FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID),
    CONSTRAINT FK_Events_Cities FOREIGN KEY (CityID) REFERENCES Cities(CityID)
);

CREATE TABLE UserPreferences (
    PreferenceID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    PreferredTime TIME NOT NULL,
    BudgetRange DECIMAL(10, 2) NOT NULL,
    CategoryID INT NOT NULL,
    CONSTRAINT FK_UserPreferences_Users FOREIGN KEY (UserID) REFERENCES Users(UserID),
    CONSTRAINT FK_UserPreferences_Categories FOREIGN KEY (CategoryID) REFERENCES Categories(CategoryID)
);

CREATE TABLE EventOrganizers (
    OrganizerID INT PRIMARY KEY IDENTITY(1,1),
    Name NVARCHAR(255) NOT NULL,
    ContactInfo NVARCHAR(255) NOT NULL
);

CREATE TABLE EventOrganizerMapping (
    MappingID INT PRIMARY KEY IDENTITY(1,1),
    EventID INT NOT NULL,
    OrganizerID INT NOT NULL,
    CONSTRAINT FK_EventOrganizerMapping_Events FOREIGN KEY (EventID) REFERENCES Events(EventID),
    CONSTRAINT FK_EventOrganizerMapping_EventOrganizers FOREIGN KEY (OrganizerID) REFERENCES EventOrganizers(OrganizerID)
);

CREATE TABLE Admins (
    AdminID INT PRIMARY KEY IDENTITY(1,1),
    UserID INT NOT NULL,
    Role NVARCHAR(255) NOT NULL,
    CONSTRAINT FK_Admins_Users FOREIGN KEY (UserID) REFERENCES Users(UserID)
);
use database SceneOn
SELECT * FROM Users;
SELECT * FROM Cities;
SELECT * FROM Categories;
SELECT * FROM Events;
SELECT * FROM UserPreferences;
SELECT * FROM EventOrganizers;
SELECT * FROM EventOrganizerMapping;
SELECT * FROM Admins;

drop database SceneOn