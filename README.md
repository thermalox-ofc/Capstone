# Torque Garage

**Auto Shop Service Management System — Phase I MVP**

University of Maryland Global Campus · CMSC 495 Capstone
Team: Beo, Cipriano II · Asmerom, Birkti · Hwang, Ryan

---

## Overview

Torque Garage is a browser-based service management tool for small independent auto repair shops. It centralizes customer records, vehicle information, work orders, appointment scheduling, parts inventory, and a loyalty rewards program into a single, self-contained web application.

This Phase I deliverable implements the Customer Records and Vehicle Records modules in full, with the Dashboard, Work Orders, Schedule, and Inventory panels functional and connected through shared localStorage state.

---

## Prerequisites

No installation is required. The application runs entirely in the browser using vanilla HTML, CSS, and JavaScript. There are no build tools, package managers, or server processes involved.

**Required:**
- Any modern web browser (Chrome, Firefox, Edge, or Safari — current release recommended)
- A text editor or IDE if you intend to modify the source (VS Code recommended)

**Not required:**
- Node.js
- npm or any package manager
- A local or remote server

---

## Getting Started

### Clone the repository

```bash
git clone https://github.com/thermalox-ofc/Capstone.git
cd Capstone
```

### Open the application

Open `index.html` directly in your browser. No build step or server is needed:

- **Windows:** Right-click `index.html` → Open with → your browser
- **macOS:** Double-click `index.html`, or right-click → Open With
- **VS Code:** Install the [Live Server](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer) extension, then right-click `index.html` → Open with Live Server

The application loads immediately with seeded demo data.

---

## Demo Accounts

Use these credentials on the login screen to explore each role:

| Role     | Email                          | Password      |
|----------|--------------------------------|---------------|
| Admin    | admin@picloud.com         | admin123      |
| Operator | operator@picloud.com      | operator123   |
| Customer | Any seeded customer email      | customer123   |

Seeded customer emails: `jordan@carterlogistics.com`, `maya.thompson@email.com`, `andre.lewis@email.com`

---

## Testing

No test runner installation is required. All test cases run directly in the browser.

### Manual verification steps

Open `index.html` in your browser and sign in as Admin, then verify the following:

| # | Area | What to verify |
|---|------|----------------|
| 1 | VIN validation | In the Vehicles form, submit a VIN shorter than 17 characters — expect an inline error message |
| 2 | VIN validation | Submit a VIN containing the letter `O` or `I` — expect rejection |
| 3 | VIN validation | Submit `1HGCM82633A004352` (valid check digit) — expect the record to save |
| 4 | VIN validation | Submit `1HGCM82633A004353` (check digit off by one) — expect an error identifying the expected check digit |
| 5 | Customer CRUD | Add a customer, then use the **Edit** button to change the name — verify the list updates |
| 6 | Customer CRUD | Delete a customer who has a linked vehicle — verify both the customer and vehicle are removed |
| 7 | Vehicle CRUD | Add a vehicle, then **Edit** it to update mileage — verify the card reflects the new value |
| 8 | Vehicle CRUD | Delete a vehicle — verify it is removed without affecting other customers or vehicles |
| 9 | localStorage | Add a customer, refresh the page, sign back in — verify the record persists |
| 10 | Role access | Sign in as a Customer — verify the admin-only panels (Customers, Vehicles, Work Orders, etc.) are hidden |

### Console-based unit tests

Core functions are exposed in the global scope. Open the browser developer console (`F12`) after loading the page and run assertions directly:

```js
// VIN validation — valid VIN should pass
console.assert(validateVIN("1HGCM82633A004352").valid === true, "FAIL: valid VIN rejected");

// VIN validation — wrong check digit should fail
console.assert(validateVIN("1HGCM82633A004353").valid === false, "FAIL: invalid VIN accepted");

// VIN validation — contains I should fail
console.assert(validateVIN("1HGCM82633I004352").valid === false, "FAIL: VIN with I accepted");

// VIN validation — wrong length should fail
console.assert(validateVIN("1HGCM826").valid === false, "FAIL: short VIN accepted");
```

All passing assertions produce no output. A `FAIL:` message in the console indicates a regression.

---

## Project Directory Structure

```
Capstone/
├── index.html      # Application shell: all views, forms, and layout panels
├── styles.css      # Responsive design system using CSS custom properties
├── script.js       # All application logic:
│                   #   - localStorage service module (read, write, normalize)
│                   #   - Demo state and seeding
│                   #   - VIN validation algorithm (NHTSA check-digit standard)
│                   #   - Customer and vehicle CRUD operations
│                   #   - Work order, appointment, and inventory management
│                   #   - Role-based auth and session persistence
│                   #   - Dashboard metrics and rendering
└── README.md       # This file
```

---

## Key Features (Phase I)

- **Customer CRUD:** Add, edit, and delete customer profiles with name, phone, email, and loyalty tier
- **Vehicle CRUD:** Add, edit, and delete vehicles linked to customers; includes VIN, mileage, warranty, and diagnostic codes
- **VIN Validation:** Full NHTSA check-digit algorithm — validates character set (excludes I, O, Q), length (17 characters), and positional weighted-sum check digit at position 9
- **Work Orders:** Create and track service jobs with status pipeline (Scheduled → In Progress → Waiting on Parts → Ready for Pickup → Completed)
- **Scheduling:** Admin and customer appointment booking with double-booking prevention
- **Inventory:** Parts tracking with reorder threshold alerts surfaced on the dashboard
- **Role-Based Access:** Admin and Operator see the full dashboard; Customer accounts see a scoped portal with their own vehicles, appointments, and maintenance checklist
- **Data Persistence:** All state is stored in browser `localStorage` as structured JSON, abstracted through a central service layer designed for future migration to a server-backed database

---

## Architecture

The application follows the two-tier architecture defined in the project design:

- **Presentation and Logic Tier:** All UI, routing, input validation, and business logic run inside `script.js` as a vanilla JavaScript single-page application
- **Data Tier:** The browser's `localStorage` API stores all entities (customers, vehicles, work orders, appointments, inventory) as JSON arrays under dedicated keys

The storage layer is intentionally abstracted so that `localStorage` calls can be replaced with API requests to a Node.js / MySQL backend in a future phase without modifying any UI or form logic.

---

## Team

| Name | Role |
|------|------|
| Beo, Cipriano II | Member 1 — UI layout, work order and scheduling modules |
| Asmerom, Birkti | Member 2 — localStorage service module, data model design |
| Hwang, Ryan | Member 3 — VIN validation algorithm, customer and vehicle CRUD |

---

## Notes

- Refreshing the page preserves all data. Use **Reload Demo Data** on the dashboard to reset to the seeded state, or **Clear Saved Data** to start from scratch.
- The application is intentionally dependency-free so any reviewer can open it from a fresh clone with no additional setup.
