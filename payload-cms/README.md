# Simple Landing Page with Payload CMS

A modern, component-based landing page built with Next.js and Payload CMS. This project demonstrates the implementation of a flexible, block-based content management system that allows for dynamic page construction.

## VIDEO
- https://youtu.be/qSkSKlw_fW8

## Features

- **Component-Based Architecture**: Modular design using React components
- **Dynamic Block System**: Support for multiple content block types:
  - Hero sections with images and CTAs
  - Rich text content blocks
  - Newsletter subscription forms
- **Form Builder Integration**: Built-in form handling with Payload's form builder plugin
- **TypeScript Support**: Full type safety across the application
- **Modern Styling**: Clean, responsive design with modern CSS

## Technical Stack

### Frontend

- Next.js 14 (App Router)
- React
- TypeScript
- CSS Modules

### Backend

- Payload CMS
- PostgreSQL Database
- Form Builder Plugin
- Rich Text Editor (Lexical)

### Development Tools

- ESLint
- Prettier
- TypeScript

## Project Structure

```
src/
├── app/
│   └── (frontend)/
│       ├── components/
│       │   ├── HeroBlock.tsx
│       │   ├── ContentBlock.tsx
│       │   └── NewsletterBlock.tsx
│       └── page.tsx
├── blocks/
│   ├── HeroBlock.ts
│   ├── ContentBlock.ts
│   └── NewsletterFormBlock.ts
├── collections/
│   ├── Pages.tsx
│   ├── Media.ts
│   └── Users.ts
└── payload.config.ts
```

## Block Types

### Hero Block

- Main heading
- Rich text subheading
- Featured image
- Call-to-action button

### Content Block

- Heading
- Rich text content area

### Newsletter Form Block

- Form title
- Dynamic form fields
- Success/error handling
- Submission confirmation

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up environment variables:
   ```env
   PAYLOAD_SECRET=your-secret-key
   DATABASE_URL=postgresql://postgres:postgres@localhost:5432/payload
   ```
4. Run the development server:
   ```bash
   npm run dev
   ```

## Configuration

### Database

- Using PostgreSQL (`@payloadcms/db-postgres`), connection string in `DATABASE_URL`
- Configured in `payload.config.ts`

### CMS Configuration

- Admin panel customization
- Collection definitions
- Block type configurations
- Form builder setup

### Medusa admin embedding, roles and sessions

The admin can run inside the Medusa admin (`/app/cms`) with one shared session. See
`.claude/skills/payload-medusa-integration/SKILL.md` for the full contract.

- `PAYLOAD_EMBEDDED=true` turns on embed mode: inside an iframe the user icon and logout buttons are hidden and the
  session refreshes in the background; opened directly, `/admin` behaves as usual (the UI is hidden only when the flag is on
  **and** the page is framed). The flag is read at runtime and passed to the browser as props, so changing it needs a
  restart but **no rebuild** (it is deliberately not a `NEXT_PUBLIC_*` variable, which would be baked in at build time).
  To roll back a bad deploy set it to `false` and redeploy; the iframe keeps working.
- `MEDUSA_ADMIN_URLS` (comma separated, falls back to `MEDUSA_ADMIN_URL`) lists the origins allowed to embed the admin
  (`frame-ancestors`) and to talk to it over `postMessage`.
- Roles (`none|viewer|editor|publisher|admin`) come from Medusa in the SSO token and default to `none` (no access). Content
  needs `editor` to change and `admin` to delete; public reads are unchanged. In an empty database the first user becomes admin.
- Medusa ends the Payload session with `POST /api/users/sso/revoke` (server to server); SSO tokens are single use.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

MIT License - feel free to use this project for your own purposes.
