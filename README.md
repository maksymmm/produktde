# ProduktDE

Online marketplace for products Made in Germany, targeting German and international markets.

## Structure
- `database/`: MySQL schema (`schema.sql`).
- `backend/`: Node.js API (`index.js`, `package.json`).
- `public/`: Frontend (`index.html`, `style.css`, `scripts.js`).

## Setup
1. **Database**:
   ```bash
   mysql -u root -p < database/schema.sql
