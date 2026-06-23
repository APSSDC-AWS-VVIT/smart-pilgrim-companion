PRAGMA foreign_keys = ON;

CREATE TABLE IF NOT EXISTS temples (
    temple_id TEXT PRIMARY KEY,
    temple_name TEXT NOT NULL,
    state TEXT NOT NULL,
    district TEXT NOT NULL,
    location TEXT NOT NULL,
    description TEXT NOT NULL,
    history TEXT,
    opening_time TEXT,
    closing_time TEXT,
    best_visit_time TEXT,
    speciality TEXT,
    contact_info TEXT,
    website TEXT,
    notes TEXT
);

CREATE TABLE IF NOT EXISTS travel_routes (
    route_id TEXT PRIMARY KEY,
    source TEXT NOT NULL,
    destination TEXT NOT NULL,
    travel_mode TEXT NOT NULL,
    duration TEXT NOT NULL,
    estimated_cost TEXT,
    notes TEXT
);

CREATE TABLE IF NOT EXISTS budgets (
    budget_id TEXT PRIMARY KEY,
    temple_id TEXT NOT NULL,
    budget_type TEXT NOT NULL,
    min_cost INTEGER NOT NULL,
    max_cost INTEGER NOT NULL,
    persons INTEGER NOT NULL,
    days INTEGER NOT NULL,
    includes TEXT,
    FOREIGN KEY (temple_id) REFERENCES temples (temple_id)
);

CREATE TABLE IF NOT EXISTS schedules (
    schedule_id TEXT PRIMARY KEY,
    temple_id TEXT NOT NULL,
    activity TEXT NOT NULL,
    start_time TEXT NOT NULL,
    end_time TEXT NOT NULL,
    notes TEXT,
    FOREIGN KEY (temple_id) REFERENCES temples (temple_id)
);

CREATE TABLE IF NOT EXISTS temple_places (
    place_id TEXT PRIMARY KEY,
    temple_id TEXT NOT NULL,
    place_name TEXT NOT NULL,
    place_type TEXT NOT NULL,
    distance_from_temple TEXT,
    description TEXT,
    FOREIGN KEY (temple_id) REFERENCES temples (temple_id)
);
