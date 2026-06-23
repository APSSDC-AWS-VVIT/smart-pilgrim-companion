# Smart Pilgrim Companion – Data Dictionary

## Project Overview

**Project:** Smart Pilgrim Companion

**Description:**
Cloud-Based Spiritual Travel & Temple Assistance Platform that assists pilgrims with temple information, travel planning, schedules, budgets, nearby attractions, and pilgrimage guidance.

**Temples Covered:**

* Tirumala
* Srisailam
* Srikalahasti

---

# temples.csv

## Purpose

Stores master information about temples.

## Source

Extracted from temple reference PDFs and supporting information sources.

## Columns

| Column          | Type | Required | Example                               | Description              |
| --------------- | ---- | -------- | ------------------------------------- | ------------------------ |
| temple_id       | TEXT | Yes      | T001                                  | Unique temple identifier |
| temple_name     | TEXT | Yes      | Tirumala                              | Temple name              |
| state           | TEXT | Yes      | Andhra Pradesh                        | State                    |
| district        | TEXT | Yes      | Tirupati                              | District                 |
| location        | TEXT | Yes      | Tirumala Hills                        | Temple location          |
| description     | TEXT | Yes      | Major Hindu pilgrimage destination    | Brief description        |
| history         | TEXT | No       | Ancient Vaishnavite pilgrimage center | Historical information   |
| opening_time    | TIME | No       | 2:30 AM                               | Temple opening time      |
| closing_time    | TIME | No       | 1:00 AM                               | Temple closing time      |
| best_visit_time | TEXT | No       | Early Morning                         | Recommended visit period |
| speciality      | TEXT | No       | Lord Venkateswara Temple              | Temple highlights        |
| contact_info    | TEXT | No       | 155257                                | Contact information      |
| website         | TEXT | No       | https://www.tirumala.org              | Official website         |
| notes           | TEXT | No       | Temple details from PDF               | Additional remarks       |

## Relationships

* temple_id → schedules.csv
* temple_id → budgets.csv
* temple_id → temple_places.csv

## Validation Rules

* temple_id must be unique
* temple_name required
* opening_time and closing_time should be valid times
* website should be a valid URL when present

---

# budgets.csv

## Purpose

Stores estimated pilgrimage budgets.

## Columns

| Column      | Type    | Required | Example             | Description              |
| ----------- | ------- | -------- | ------------------- | ------------------------ |
| budget_id   | TEXT    | Yes      | B001                | Unique budget identifier |
| temple_id   | TEXT    | Yes      | T001                | Related temple           |
| budget_type | TEXT    | Yes      | low                 | Budget category          |
| min_cost    | INTEGER | Yes      | 3400                | Minimum estimated cost   |
| max_cost    | INTEGER | Yes      | 4500                | Maximum estimated cost   |
| persons     | INTEGER | Yes      | 1                   | Number of travelers      |
| days        | INTEGER | Yes      | 3                   | Trip duration            |
| includes    | TEXT    | No       | Complete pilgrimage | Included services        |

## Relationships

* temple_id → temples.csv

## Validation Rules

* budget_id unique
* min_cost ≤ max_cost
* costs numeric
* persons > 0
* days > 0

---

# travel_routes.csv

## Purpose

Stores transportation options to pilgrimage destinations.

## Columns

| Column         | Type | Required | Example         | Description             |
| -------------- | ---- | -------- | --------------- | ----------------------- |
| route_id       | TEXT | Yes      | R001            | Unique route identifier |
| source         | TEXT | Yes      | Hyderabad       | Starting city           |
| destination    | TEXT | Yes      | Tirupati        | Destination city        |
| travel_mode    | TEXT | Yes      | Flight          | Transportation mode     |
| duration       | TEXT | Yes      | 1 Hour          | Estimated duration      |
| estimated_cost | TEXT | No       | ₹3500-₹5500     | Cost estimate           |
| notes          | TEXT | No       | 4 daily flights | Additional details      |

## Validation Rules

* route_id unique
* source required
* destination required
* duration standardized
* estimated_cost format consistent

---

# schedules.csv

## Purpose

Stores pilgrimage activities and visit schedules.

## Columns

| Column      | Type | Required | Example                      | Description                |
| ----------- | ---- | -------- | ---------------------------- | -------------------------- |
| schedule_id | TEXT | Yes      | S001                         | Unique schedule identifier |
| temple_id   | TEXT | Yes      | T001                         | Related temple             |
| activity    | TEXT | Yes      | Sri Govindaraja Swamy Temple | Planned activity           |
| start_time  | TIME | Yes      | 8:00 AM                      | Activity start time        |
| end_time    | TIME | Yes      | 9:30 AM                      | Activity end time          |
| notes       | TEXT | No       | Day 1 Tirupati tour          | Additional details         |

## Relationships

* temple_id → temples.csv

## Validation Rules

* schedule_id unique
* start_time before end_time
* no overlapping activities for same itinerary

---

# temple_places.csv

## Purpose

Stores nearby attractions and places of interest.

## Columns

| Column               | Type | Required | Example                                | Description             |
| -------------------- | ---- | -------- | -------------------------------------- | ----------------------- |
| place_id             | TEXT | Yes      | P001                                   | Unique place identifier |
| temple_id            | TEXT | Yes      | T001                                   | Related temple          |
| place_name           | TEXT | Yes      | Papavinasam Waterfalls & Dam Reservoir | Place name              |
| place_type           | TEXT | Yes      | Waterfall                              | Category                |
| distance_from_temple | TEXT | No       | 5 km                                   | Distance from temple    |
| description          | TEXT | No       | Sacred waterfall and reservoir         | Description             |

## Relationships

* temple_id → temples.csv

## Validation Rules

* place_id unique
* temple_id must exist
* distance should use a standard format (km)

---

# user_scenarios.json

## Purpose

Stores complete pilgrim journey scenarios.

## Structure

* user_type
* goal
* steps
* pain_points
* recommendations

## Fields

| Field           | Type  | Required | Example                               | Description           |
| --------------- | ----- | -------- | ------------------------------------- | --------------------- |
| user_type       | TEXT  | Yes      | Tirumala Pilgrim                      | User category         |
| goal            | TEXT  | Yes      | Complete Tirumala pilgrimage          | User objective        |
| steps           | ARRAY | Yes      | ["Reach Tirupati","Complete Darshan"] | Ordered journey steps |
| pain_points     | ARRAY | No       | ["Long travel duration"]              | Common challenges     |
| recommendations | ARRAY | No       | ["Book travel tickets in advance"]    | Suggested actions     |

## Validation Rules

* Steps must preserve sequence
* Arrays should not contain null values
* Goal required

---

# metadata.json

## Purpose

Stores dataset metadata.

## Fields

| Field           | Type    | Required | Example          | Description            |
| --------------- | ------- | -------- | ---------------- | ---------------------- |
| source_files    | ARRAY   | Yes      | ["Tirumala.pdf"] | Source documents       |
| temples_found   | ARRAY   | Yes      | ["Tirumala"]     | Temples identified     |
| total_routes    | INTEGER | Yes      | 22               | Total route records    |
| total_schedules | INTEGER | Yes      | 10               | Total schedule records |

---

# Data Relationships

Temple
↓
Schedules

Temple
↓
Budgets

Temple
↓
Places

Temple
↓
User Scenarios

---

# Notes for Backend Development

## Primary Keys

* temple_id
* budget_id
* route_id
* schedule_id
* place_id

## Foreign Keys

* budgets.temple_id → temples.temple_id
* schedules.temple_id → temples.temple_id
* temple_places.temple_id → temples.temple_id

## Searchable Fields

* temple_name
* district
* location
* place_name
* source
* destination
* travel_mode
* activity
* budget_type

## Recommended Index Fields

* temple_id
* temple_name
* route_id
* schedule_id
* budget_id
* place_id
* source
* destination

## Fields Requiring Validation

* temple_id
* budget_id
* route_id
* schedule_id
* place_id
* opening_time
* closing_time
* start_time
* end_time
* min_cost
* max_cost
* distance_from_temple
* website

---

**End of Data Dictionary**

