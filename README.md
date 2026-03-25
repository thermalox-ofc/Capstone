# PitStop Cloud MVP

This project is a browser-based MVP for the auto repair shop system. It focuses on the workflows called out in the overview:

- customer and loyalty tracking
- vehicle records with mileage, warranty, and diagnostic codes
- work orders and service history
- role-based login for admin, operator, and customer access
- appointment booking from available calendar slots with listed services
- maintenance checklist suggestions with estimated days left for routine service
- inventory and reorder thresholds

## Run it

Because this version is built with plain HTML, CSS, and JavaScript, you can run it without installing dependencies:

1. Open `index.html` in a browser.
2. Use the seeded demo data or add your own records.
3. Data is saved in browser `localStorage`, so refreshes keep your entries.

## Files

- `index.html`: structure for the dashboard and forms
- `styles.css`: responsive visual design
- `script.js`: app state, seeded data, persistence, rendering, and form handling

## Notes

- The app is intentionally self-contained so it works immediately in this workspace.
- The current version is a front-end MVP, not a production SaaS deployment.
- A strong next step would be replacing `localStorage` with a real API and database, then adding authentication and role-based access.
