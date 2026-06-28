CREATE TABLE dbo.UserProfiles (
    user_id NVARCHAR(255) NOT NULL CONSTRAINT PK_UserProfiles PRIMARY KEY,
    payload_json NVARCHAR(MAX) NOT NULL,
    created_at DATETIME2 NOT NULL CONSTRAINT DF_UserProfiles_created_at DEFAULT SYSUTCDATETIME(),
    updated_at DATETIME2 NOT NULL CONSTRAINT DF_UserProfiles_updated_at DEFAULT SYSUTCDATETIME()
);
GO

CREATE TABLE dbo.DailyCheckIns (
    id UNIQUEIDENTIFIER NOT NULL CONSTRAINT PK_DailyCheckIns PRIMARY KEY,
    user_id NVARCHAR(255) NOT NULL,
    check_in_date DATE NOT NULL,
    weight DECIMAL(10, 2) NOT NULL,
    calories INT NOT NULL,
    waist DECIMAL(10, 2) NULL,
    neck DECIMAL(10, 2) NULL,
    hip DECIMAL(10, 2) NULL,
    estimated_body_fat DECIMAL(5, 2) NULL,
    notes NVARCHAR(MAX) NULL,
    created_at DATETIME2 NOT NULL CONSTRAINT DF_DailyCheckIns_created_at DEFAULT SYSUTCDATETIME(),
    updated_at DATETIME2 NOT NULL CONSTRAINT DF_DailyCheckIns_updated_at DEFAULT SYSUTCDATETIME(),
    CONSTRAINT UX_DailyCheckIns_user_date UNIQUE (user_id, check_in_date)
);
GO

CREATE TABLE dbo.WeeklySummaries (
    id UNIQUEIDENTIFIER NOT NULL CONSTRAINT PK_WeeklySummaries PRIMARY KEY DEFAULT NEWID(),
    user_id NVARCHAR(255) NOT NULL,
    week_start_date DATE NOT NULL,
    average_weight DECIMAL(10, 2) NULL,
    average_calories INT NULL,
    weight_change DECIMAL(10, 2) NULL,
    tdee INT NULL,
    maintenance_calories INT NULL,
    target_calories INT NULL,
    protein_grams INT NULL,
    fat_grams INT NULL,
    carbs_grams INT NULL,
    created_at DATETIME2 NOT NULL CONSTRAINT DF_WeeklySummaries_created_at DEFAULT SYSUTCDATETIME(),
    updated_at DATETIME2 NOT NULL CONSTRAINT DF_WeeklySummaries_updated_at DEFAULT SYSUTCDATETIME(),
    CONSTRAINT UX_WeeklySummaries_user_week UNIQUE (user_id, week_start_date)
);
GO

CREATE INDEX IX_DailyCheckIns_user_date ON dbo.DailyCheckIns (user_id, check_in_date DESC);
CREATE INDEX IX_WeeklySummaries_user_week ON dbo.WeeklySummaries (user_id, week_start_date DESC);
GO
