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

INSERT INTO Courses (Id, Name, Description, StartDate, EndDate, Price)
VALUES 
(NEWID(), 'Yoga Basics', 'Khóa học Yoga cơ bản cho người mới bắt đầu.', '2024-11-01', '2025-01-01', 500000),
(NEWID(), 'Advanced Yoga', 'Khóa học Yoga nâng cao.', '2024-11-15', '2025-02-15', 800000),
(NEWID(), 'Kickboxing', 'Khóa học Kickboxing tăng cường thể lực.', '2024-12-01', '2025-03-01', 700000),
(NEWID(), 'Pilates', 'Khóa học Pilates giúp săn chắc cơ.', '2024-12-15', '2025-03-15', 600000),
(NEWID(), 'Zumba Fitness', 'Khóa học Zumba giúp đốt cháy calo.', '2025-01-01', '2025-04-01', 550000),
(NEWID(), 'Functional Training', 'Khóa học tập trung vào rèn luyện thể lực tổng hợp.', '2025-01-15', '2025-04-15', 750000),
(NEWID(), 'CrossFit', 'Khóa học CrossFit với các bài tập cường độ cao.', '2025-02-01', '2025-05-01', 850000),
(NEWID(), 'Strength Training', 'Khóa học nâng cao sức mạnh cơ bắp.', '2025-02-15', '2025-05-15', 900000),
(NEWID(), 'Martial Arts Basics', 'Khóa học võ thuật cơ bản.', '2025-03-01', '2025-06-01', 650000),
(NEWID(), 'Dance Aerobics', 'Khóa học Aerobics kết hợp nhảy múa.', '2025-03-15', '2025-06-15', 600000);


INSERT INTO Facilities (Id, Name, Description, Status, LastMaintenanceDate)
VALUES 
(NEWID(), 'Treadmill', 'Máy chạy bộ giúp cải thiện sức bền.', 'Available', '2024-10-01'),
(NEWID(), 'Stationary Bike', 'Xe đạp tập cố định để tập luyện tim mạch.', 'Under Maintenance', '2024-09-20'),
(NEWID(), 'Elliptical Trainer', 'Máy tập toàn thân, giảm áp lực lên khớp.', 'Available', '2024-10-15'),
(NEWID(), 'Rowing Machine', 'Máy chèo thuyền giúp phát triển cơ lưng.', 'Available', '2024-10-05'),
(NEWID(), 'Dumbbell Set', 'Bộ tạ tay dùng để tập luyện sức mạnh.', 'Under Maintenance', '2024-10-10'),
(NEWID(), 'Bench Press', 'Ghế đẩy tạ ngực hỗ trợ tập thể lực.', 'Available', '2024-09-30'),
(NEWID(), 'Squat Rack', 'Khung tập Squat an toàn cho người tập.', 'Available', '2024-10-12'),
(NEWID(), 'Pull-up Bar', 'Thanh tập kéo xà giúp tăng cường sức mạnh.', 'Available', '2024-10-08'),
(NEWID(), 'Cable Machine', 'Máy tập cáp đa chức năng.', 'Under Maintenance', '2024-10-18'),
(NEWID(), 'Lat Pulldown', 'Máy kéo lưng rộng hỗ trợ phát triển cơ xô.', 'Available', '2024-09-25');


INSERT INTO Rooms (Id, Name, Description, MaxParticipants, RoomType)
VALUES 
(NEWID(), 'Phòng Yoga', 'Phòng tập Yoga rộng rãi và yên tĩnh.', 20, 'Yoga'),
(NEWID(), 'Phòng Gym', 'Phòng gym với trang thiết bị hiện đại.', 30, 'Gym'),
(NEWID(), 'Phòng Boxing', 'Phòng tập Boxing có găng tay và bao cát.', 15, 'Boxing'),
(NEWID(), 'Phòng Aerobics', 'Phòng Aerobics với sàn gỗ và gương lớn.', 25, 'Aerobics'),
(NEWID(), 'Phòng Zumba', 'Phòng tập Zumba với hệ thống âm thanh tốt.', 20, 'Zumba'),
(NEWID(), 'Phòng Kickboxing', 'Phòng tập Kickboxing rộng rãi, có thảm tập.', 15, 'Kickboxing'),
(NEWID(), 'Phòng Pilates', 'Phòng tập Pilates trang bị dụng cụ tập.', 10, 'Pilates'),
(NEWID(), 'Phòng Xoạc Cơ', 'Phòng xoạc cơ với không gian mở, thoải mái.', 10, 'Stretching'),
(NEWID(), 'Phòng Võ Thuật', 'Phòng tập võ thuật với trang bị cơ bản.', 20, 'Martial Arts'),
(NEWID(), 'Phòng Huấn Luyện Cá Nhân', 'Phòng tập riêng cho huấn luyện cá nhân.', 5, 'Personal Training');


INSERT INTO Trainers (Id, Name, Email, Phone, Specialty, Experience, Avatar, Type)
VALUES 
(NEWID(), 'Nguyễn Văn An', 'nguyen.van.an@example.com', 123456789, 'Yoga', '5 năm kinh nghiệm', 'avatar_an.png', 'Full-time'),
(NEWID(), 'Trần Thị Bích', 'tran.thi.bich@example.com', 987654321, 'Kickboxing', '3 năm kinh nghiệm', 'avatar_bich.png', 'Part-time'),
(NEWID(), 'Lê Minh Tuấn', 'le.minh.tuan@example.com', 234567890, 'Gym', '7 năm kinh nghiệm', 'avatar_tuan.png', 'Full-time'),
(NEWID(), 'Phạm Thu Hằng', 'pham.thu.hang@example.com', 345678901, 'Aerobics', '4 năm kinh nghiệm', 'avatar_hang.png', 'Contract'),
(NEWID(), 'Võ Văn Khôi', 'vo.van.khoi@example.com', 456789012, 'Zumba', '6 năm kinh nghiệm', 'avatar_khoi.png', 'Full-time'),
(NEWID(), 'Đặng Hữu Phước', 'dang.huu.phuoc@example.com', 567890123, 'Pilates', '5 năm kinh nghiệm', 'avatar_phuoc.png', 'Part-time'),
(NEWID(), 'Bùi Lan Hương', 'bui.lan.huong@example.com', 678901234, 'Stretching', '2 năm kinh nghiệm', 'avatar_huong.png', 'Full-time'),
(NEWID(), 'Nguyễn Thị Cẩm Tú', 'nguyen.thi.cam.tu@example.com', 789012345, 'Martial Arts', '8 năm kinh nghiệm', 'avatar_tu.png', 'Contract'),
(NEWID(), 'Hoàng Anh Dũng', 'hoang.anh.dung@example.com', 890123456, 'Personal Training', '10 năm kinh nghiệm', 'avatar_dung.png', 'Full-time'),
(NEWID(), 'Trịnh Hoài Nam', 'trinh.hoai.nam@example.com', 901234567, 'CrossFit', '6 năm kinh nghiệm', 'avatar_nam.png', 'Part-time');
