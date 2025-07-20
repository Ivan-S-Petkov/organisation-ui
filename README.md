# Organisation UI

React application for managing users and organizational plans built with TypeScript, Material-UI, and React Query.

## Features

- **User Management**: View, create, and manage users with role-based permissions
- **License Management**: Assign/unassign licenses to users 
- **Plan Management**: View current organizational plan details
- **Authentication**: Role-based access control (Admin/User roles)
- **Real-time Updates**: Optimistic updates with React Query
- **Search & Filtering**: Advanced user filtering and search capabilities
- **Pagination**: Efficient data loading with pagination support

## Tech Stack

- **Frontend Framework**: React 18 with TypeScript
- **Styling**: Material-UI (MUI) + Styled Components
- **State Management**: React Query (TanStack Query) for server state
- **Routing**: React Router v6
- **HTTP Client**: Axios
- **Form Handling**: React Hook Form
- **Notifications**: React Hot Toast

## Key Features

### User Management
- View all users with pagination
- Create new users (Admin only)
- Role-based permissions (Admin/User)
- Search users by name or email
- Filter by role and license status

### License Management
- Assign/revoke licenses with one-click
- Real-time license status updates
- License limit enforcement

### Advanced Search & Filtering
- Debounced search
- Multiple filter combinations

## Authentication & Authorization

The application supports role-based access control:

- **Public Routes**: Login, User listing
- **User Routes**: Plan page (requires authentication)
- **Admin Routes**: User creation, License management

## TODO
- Improve responsive design
- Implement ErrorBoundary for global or hierarchical in order to catch runtime React errors in rendering and bubble up visual fallback components instead of crashing the app.
- Implement Unit Tests

