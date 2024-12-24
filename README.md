# Calendar Backend

This backend allows IP-restricted blocking of dates for a calendar.

## Endpoints
- **POST /block-date**: Blocks a specific date. Requires `date` in the request body.
- **GET /blocked-dates**: Returns the list of blocked dates.

## Deployment
- Make sure to set up allowed IPs in `server.js`.
- Deploy using Render, Vercel, or another hosting service.
