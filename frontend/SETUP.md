# Frontend Setup Guide

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── common/          # Reusable UI components
│   │   │   └── index.tsx    # Card, Button, Input, Select, Table, Badge
│   │   └── layout/          # Page layouts
│   │       ├── Sidebar.tsx  # Navigation sidebar
│   │       └── Header.tsx   # Top navigation bar
│   ├── pages/               # Page components
│   │   ├── Dashboard.tsx    # Dashboard
│   │   └── Customers.tsx    # Customer list
│   ├── services/            # API client
│   │   └── apiClient.ts     # Axios instance
│   ├── hooks/               # Custom React hooks
│   ├── context/             # React Context API
│   ├── types/               # TypeScript definitions
│   ├── App.tsx              # Main app component
│   ├── AppLayout.tsx        # Layout wrapper
│   ├── index.tsx            # React root
│   └── index.css            # Global styles
├── package.json
├── tsconfig.json
├── tailwind.config.js
├── postcss.config.js
└── .eslintrc.json
```

## Installation

```bash
cd frontend
npm install
```

## Development

```bash
npm start
# App will open at http://localhost:3000
```

## Key Dependencies

- **react-router-dom** - Client-side routing
- **axios** - HTTP client
- **tailwindcss** - Utility-first CSS
- **zustand** - State management (optional)
- **react-hot-toast** - Notifications
- **react-icons** - Icon library
- **date-fns** - Date utilities

## Tailwind CSS

All styling is done with Tailwind CSS utility classes. The configuration is in `tailwind.config.js`.

### Common Tailwind Classes

```tsx
// Colors
text-blue-600, bg-red-500, border-gray-300

// Spacing
px-4, py-2, mb-4, mt-8

// Layout
flex, grid, grid-cols-3, gap-4

// Responsive
md:grid-cols-2, lg:grid-cols-3

// States
hover:bg-gray-100, focus:ring-2, disabled:opacity-50
```

## Forms

All forms use controlled components with React state:

```tsx
const [email, setEmail] = useState('');

<Input 
  label="Email" 
  value={email} 
  onChange={setEmail}
  required
/>
```

## Building for Production

```bash
npm run build
# Creates optimized production build in build/ folder
```

## Environment Variables

Create `.env` file:

```
REACT_APP_API_URL=http://localhost:5000/api
```

This is used by the axios client to set the base API URL.

## Next Steps

1. Implement Redux or Zustand for state management
2. Add login/authentication pages
3. Create API service functions for each module
4. Build out remaining pages (Leads, Tickets, Projects, etc.)
5. Add form validation
6. Implement error handling and toast notifications
7. Create custom hooks for common operations
8. Add testing with Jest and React Testing Library
