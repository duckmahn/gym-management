use gym
INSERT INTO Users (Id, Email, Username, Firstname, Lastname, Avatar, Phone, Password, IsAdmin, MembershipId, CourseId)
VALUES 
(NEWID(), 'john.doe@example.com', 'john_doe', 'John', 'Doe', 'avatar1.png', '1234567890', 'password1', 0, NULL, NULL),
(NEWID(), 'jane.smith@example.com', 'jane_smith', 'Jane', 'Smith', 'avatar2.png', '0987654321', 'password2', 1, NULL, NULL),
(NEWID(), 'mike.jones@example.com', 'mike_j', 'Mike', 'Jones', 'avatar3.png', '5551234567', 'password3', 0, NULL, NULL),
(NEWID(), 'lisa.brown@example.com', 'lisa_b', 'Lisa', 'Brown', 'avatar4.png', '5557654321', 'password4', 0, NULL, NULL),
(NEWID(), 'tom.wilson@example.com', 'tom_w', 'Tom', 'Wilson', 'avatar5.png', '5552345678', 'password5', 0, NULL, NULL),
(NEWID(), 'lucy.lee@example.com', 'lucy_lee', 'Lucy', 'Lee', 'avatar6.png', '5558765432', 'password6', 1, NULL, NULL),
(NEWID(), 'david.kim@example.com', 'david_k', 'David', 'Kim', 'avatar7.png', '5559876543', 'password7', 0, NULL, NULL),
(NEWID(), 'emma.green@example.com', 'emma_g', 'Emma', 'Green', 'avatar8.png', '5553456789', 'password8', 0, NULL, NULL),
(NEWID(), 'alex.white@example.com', 'alex_w', 'Alex', 'White', 'avatar9.png', '5554567890', 'password9', 1, NULL, NULL),
(NEWID(), 'olivia.thomas@example.com', 'olivia_t', 'Olivia', 'Thomas', 'avatar10.png', '5555678901', 'password10', 0, NULL, NULL);