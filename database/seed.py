# import csv
# import json
# import logging
# import os
# import sqlite3
# from pathlib import Path

# ROOT_DIR = Path(__file__).resolve().parent.parent
# DATA_DIR = ROOT_DIR / "data"
# DATABASE_DIR = ROOT_DIR / "database"
# DATABASE_PATH = DATABASE_DIR / "smart_pilgrim.db"
# SCHEMA_PATH = DATABASE_DIR / "schema.sql"

# logging.basicConfig(level=logging.INFO, format="[%(levelname)s] %(message)s")
# logger = logging.getLogger(__name__)


# def get_connection():
#     DATABASE_DIR.mkdir(parents=True, exist_ok=True)
#     connection = sqlite3.connect(DATABASE_PATH)
#     connection.row_factory = sqlite3.Row
#     connection.execute("PRAGMA foreign_keys = ON")
#     return connection


# def execute_schema(connection):
#     logger.info("Applying schema")
#     with open(SCHEMA_PATH, "r", encoding="utf-8") as schema_file:
#         connection.executescript(schema_file.read())
#     connection.commit()


# def reset_tables(connection):
#     cursor = connection.cursor()
#     cursor.execute("DELETE FROM temple_places")
#     cursor.execute("DELETE FROM schedules")
#     cursor.execute("DELETE FROM budgets")
#     cursor.execute("DELETE FROM travel_routes")
#     cursor.execute("DELETE FROM temples")
#     connection.commit()


# def read_csv_rows(filename):
#     file_path = DATA_DIR / filename
#     with open(file_path, "r", encoding="utf-8-sig", newline="") as csv_file:
#         lines = [line for line in csv_file.read().splitlines() if line.strip()]
#     if len(lines) < 2:
#         return []
#     header_candidates = lines[1].split(",")
#     first_data_line = lines[2] if len(lines) > 2 else ""
#     if "temple_id" in lines[0] or "route_id" in lines[0] or "budget_id" in lines[0]:
#         csv_text = "\n".join(lines)
#         reader = csv.DictReader(csv_text.splitlines())
#         return [row for row in reader]
#     reader = csv.DictReader(lines[1:], fieldnames=header_candidates)
#     rows = []
#     for index, row in enumerate(reader):
#         if index == 0:
#             continue
#         rows.append(row)
#     return rows


# def read_json_rows(filename):
#     file_path = DATA_DIR / filename
#     with open(file_path, "r", encoding="utf-8") as json_file:
#         return json.load(json_file)


# def clean_row(row):
#     return {key: (value.strip() if isinstance(value, str) else value) for key, value in row.items()}


# def has_required_values(row, required_fields):
#     for field in required_fields:
#         if field not in row or row[field] in (None, ""):
#             return False
#     return True


# def insert_rows(connection, table_name, rows, required_fields, unique_key, foreign_lookup=None):
#     inserted = 0
#     skipped = 0
#     seen = set()
#     cursor = connection.cursor()
#     for row in rows:
#         row = clean_row(row)
#         if not has_required_values(row, required_fields):
#             skipped += 1
#             continue
#         unique_value = row.get(unique_key)
#         if unique_value in seen:
#             skipped += 1
#             continue
#         if foreign_lookup:
#             foreign_field = foreign_lookup[0]
#             valid_values = foreign_lookup[1]
#             if row.get(foreign_field) not in valid_values:
#                 skipped += 1
#                 continue
#         columns = [key for key, value in row.items() if value not in (None, "")]
#         placeholders = ", ".join(["?"] * len(columns))
#         sql = f"INSERT OR IGNORE INTO {table_name} ({', '.join(columns)}) VALUES ({placeholders})"
#         values = [row[column] for column in columns]
#         cursor.execute(sql, values)
#         if cursor.rowcount > 0:
#             inserted += 1
#             seen.add(unique_value)
#         else:
#             skipped += 1
#     connection.commit()
#     logger.info("%s: inserted=%s skipped=%s", table_name, inserted, skipped)


# def seed_database():
#     connection = get_connection()
#     try:
#         execute_schema(connection)
#         reset_tables(connection)
#         temple_rows = read_csv_rows("temples.csv")
#         route_rows = read_csv_rows("travel_routes.csv")
#         budget_rows = read_csv_rows("budgets.csv")
#         schedule_rows = read_csv_rows("schedules.csv")
#         place_rows = read_csv_rows("temple_places.csv")
#         metadata_rows = read_json_rows("metadata.json")
#         scenario_rows = read_json_rows("user_scenarios.json")

#         temple_ids = {row["temple_id"].strip() for row in temple_rows if row.get("temple_id")}

#         insert_rows(connection, "temples", temple_rows, ["temple_id", "temple_name", "state", "district", "location", "description"], "temple_id")
#         insert_rows(connection, "travel_routes", route_rows, ["route_id", "source", "destination", "travel_mode", "duration"], "route_id")
#         insert_rows(connection, "budgets", budget_rows, ["budget_id", "temple_id", "budget_type", "min_cost", "max_cost", "persons", "days"], "budget_id", ("temple_id", temple_ids))
#         insert_rows(connection, "schedules", schedule_rows, ["schedule_id", "temple_id", "activity", "start_time", "end_time"], "schedule_id", ("temple_id", temple_ids))
#         insert_rows(connection, "temple_places", place_rows, ["place_id", "temple_id", "place_name", "place_type"], "place_id", ("temple_id", temple_ids))

#         logger.info("metadata.json entries=%s", len(metadata_rows))
#         logger.info("user_scenarios.json entries=%s", len(scenario_rows))
#     finally:
#         connection.close()


# if __name__ == "__main__":
#     seed_database()

import csv
import json
import logging
import os
from pathlib import Path
from dotenv import load_dotenv
import pymysql

# Resolve paths to read backend variables
ROOT_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = ROOT_DIR / "data"
DATABASE_DIR = ROOT_DIR / "database"
SCHEMA_PATH = DATABASE_DIR / "schema.sql"

logging.basicConfig(level=logging.INFO, format="[%(levelname)s] %(message)s")
logger = logging.getLogger(__name__)

# Force environment to load parameters out of backend/.env
backend_env = ROOT_DIR / "backend" / ".env"
load_dotenv(backend_env)

def get_connection():
    # Parse production configurations safely from the cloud deployment parameters ledger
    db_url = os.getenv("DATABASE_URL", "")
    
    # Target values matching your AWS parameters
    DB_HOST = "smart-pilgrim-db.cuwm6svxqixi.us-east-1.rds.amazonaws.com"
    DB_USER = "admin"
    DB_PASS = "PilgrimSecure2026!"
    DB_NAME = "smart_pilgrim"
    
    logger.info("📡 Connecting to live AWS RDS MySQL cluster...")
    
    # First, connect without a specific DB selected to ensure the container exists
    init_conn = pymysql.connect(host=DB_HOST, user=DB_USER, password=DB_PASS, autocommit=True)
    with init_conn.cursor() as cursor:
        cursor.execute(f"CREATE DATABASE IF NOT EXISTS {DB_NAME};")
    init_conn.close()

    # Now return the clean channel targeting your tables
    connection = pymysql.connect(
        host=DB_HOST,
        user=DB_USER,
        password=DB_PASS,
        database=DB_NAME,
        cursorclass=pymysql.cursors.DictCursor,
        autocommit=True
    )
    return connection

def execute_schema(connection):
    logger.info("Applying schema layouts to cloud context database...")
    with open(SCHEMA_PATH, "r", encoding="utf-8") as schema_file:
        schema_sql = schema_file.read()

    # ✅ DYNAMIC TRANSLATION: Safely convert SQLite types to indexed MySQL definitions
    schema_sql = schema_sql.replace("temple_id TEXT PRIMARY KEY", "temple_id VARCHAR(50) PRIMARY KEY")
    schema_sql = schema_sql.replace("route_id TEXT PRIMARY KEY", "route_id VARCHAR(50) PRIMARY KEY")
    schema_sql = schema_sql.replace("budget_id TEXT PRIMARY KEY", "budget_id VARCHAR(50) PRIMARY KEY")
    schema_sql = schema_sql.replace("schedule_id TEXT PRIMARY KEY", "schedule_id VARCHAR(50) PRIMARY KEY")
    schema_sql = schema_sql.replace("place_id TEXT PRIMARY KEY", "place_id VARCHAR(50) PRIMARY KEY")
    schema_sql = schema_sql.replace("temple_id TEXT", "temple_id VARCHAR(50)")
    
    with connection.cursor() as cursor:
        # Split tokens dynamically to bypass packet length drops on cloud endpoints

        for statement in schema_sql.split(";"):
            clean_stmt = statement.strip()

            if clean_stmt and not clean_stmt.upper().startswith("PRAGMA"):
                cursor.execute(clean_stmt)

def reset_tables(connection):
    with connection.cursor() as cursor:
        logger.info("🧹 Performing fresh cascade reset on AWS RDS tables...")
        cursor.execute("SET FOREIGN_KEY_CHECKS = 0;")
        cursor.execute("TRUNCATE TABLE temple_places;")
        cursor.execute("TRUNCATE TABLE schedules;")
        cursor.execute("TRUNCATE TABLE budgets;")
        cursor.execute("TRUNCATE TABLE travel_routes;")
        cursor.execute("TRUNCATE TABLE temples;")
        cursor.execute("SET FOREIGN_KEY_CHECKS = 1;")

def read_csv_rows(filename):
    file_path = DATA_DIR / filename
    with open(file_path, "r", encoding="utf-8-sig", newline="") as csv_file:
        lines = [line for line in csv_file.read().splitlines() if line.strip()]
    if len(lines) < 2:
        return []
    
    csv_text = "\n".join(lines)
    reader = csv.DictReader(csv_text.splitlines())
    return [row for row in reader]

def read_json_rows(filename):
    file_path = DATA_DIR / filename
    with open(file_path, "r", encoding="utf-8") as json_file:
        return json.load(json_file)

def clean_row(row):
    return {key: (value.strip() if isinstance(value, str) else value) for key, value in row.items()}

def has_required_values(row, required_fields):
    for field in required_fields:
        if field not in row or row[field] in (None, ""):
            return False
    return True

def insert_rows(connection, table_name, rows, required_fields, unique_key, foreign_lookup=None):
    inserted = 0
    skipped = 0
    seen = set()
    
    with connection.cursor() as cursor:
        for row in rows:
            row = clean_row(row)
            if not has_required_values(row, required_fields):
                skipped += 1
                continue
            
            unique_value = row.get(unique_key)
            if unique_value in seen:
                skipped += 1
                continue
                
            if foreign_lookup:
                foreign_field = foreign_lookup[0]
                valid_values = foreign_lookup[1]
                if row.get(foreign_field) not in valid_values:
                    skipped += 1
                    continue
            
            # Clean up keys matching missing records
            columns = [key for key, value in row.items() if value not in (None, "")]
            # ✅ MySQL uses %s as parameter markers, not ?
            placeholders = ", ".join(["%s"] * len(columns))
            
            sql = f"INSERT IGNORE INTO {table_name} ({', '.join(columns)}) VALUES ({placeholders})"
            values = [row[column] for column in columns]
            
            cursor.execute(sql, values)
            if cursor.rowcount > 0:
                inserted += 1
                seen.add(unique_value)
            else:
                skipped += 1
                
    logger.info("%s: inserted=%s skipped=%s", table_name, inserted, skipped)

def seed_database():
    connection = get_connection()
    try:
        # ✅ FIX: Wipe the old structure clean BEFORE applying the fresh schemas
        reset_tables(connection)
        execute_schema(connection)
        
        temple_rows = read_csv_rows("temples.csv")
        route_rows = read_csv_rows("travel_routes.csv")
        budget_rows = read_csv_rows("budgets.csv")
        schedule_rows = read_csv_rows("schedules.csv")
        place_rows = read_csv_rows("temple_places.csv")
        metadata_rows = read_json_rows("metadata.json")
        scenario_rows = read_json_rows("user_scenarios.json")

        temple_ids = {row["temple_id"].strip() for row in temple_rows if row.get("temple_id")}

        insert_rows(connection, "temples", temple_rows, ["temple_id", "temple_name", "state", "district", "location", "description"], "temple_id")
        insert_rows(connection, "travel_routes", route_rows, ["route_id", "source", "destination", "travel_mode", "duration"], "route_id")
        insert_rows(connection, "budgets", budget_rows, ["budget_id", "temple_id", "budget_type", "min_cost", "max_cost", "persons", "days"], "budget_id", ("temple_id", temple_ids))
        insert_rows(connection, "schedules", schedule_rows, ["schedule_id", "temple_id", "activity", "start_time", "end_time"], "schedule_id", ("temple_id", temple_ids))
        insert_rows(connection, "temple_places", place_rows, ["place_id", "temple_id", "place_name", "place_type"], "place_id", ("temple_id", temple_ids))

        logger.info("metadata.json entries=%s", len(metadata_rows))
        logger.info("user_scenarios.json entries=%s", len(scenario_rows))
    finally:
        connection.close()

if __name__ == "__main__":
    seed_database()