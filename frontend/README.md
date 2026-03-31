# vi-notes Frontend

A distraction-free writing interface with keystroke typing analysis. The frontend provides authentication, a minimalist editor, and session history tracking with performance metrics.

## 📋 Project Overview

**vi-notes** is a full-stack typing analytics platform that captures keystroke data while users write. The frontend offers:
- **Minimalist B&W UI**: Clean, distraction-free writing environment
- **Left Sidebar Navigation**: Logo, status, quick actions, and user info
- **Real-time Editor**: Local keystroke tracking with automatic server sync
- **Session History**: View past writing sessions with performance statistics
- **Authentication**: Secure login/register with JWT tokens

## 🛠️ Technologies Stack

### Core Framework
- **React 18+**: Component-based UI with hooks
- **Vite 5.4.21**: Lightning-fast build tool with HMR
- **React Router**: Client-side routing (login → editor)

### Styling & Design
- **CSS3**: Pure CSS with flexbox/grid layouts
- **Fonts**: Inter (UI), Lora (content typography)
- **SVG Icons**: Custom minimalist icon assets
- **Responsive Design**: Desktop and mobile optimized

### State Management & Context
- **React Context API**: `AuthContext` for user authentication state
- **useCallback/useRef**: Optimization for keystroke tracking

### API Client
- **Axios**: HTTP requests to Node.js backend
- **JWT Token Storage**: localStorage-based session management

### Build & Development
- **ESLint**: Code quality linting
- **Hot Module Replacement (HMR)**: Instant feedback during development

## 🔌 API Endpoints

All endpoints connect to the backend at `http://localhost:5000/api/`

### Authentication Routes (`/auth`)

| Method | Endpoint | Description | Body | Response |
|--------|----------|-------------|------|----------|
| POST | `/auth/register` | Create new account | `{ email, password }` | `{ token, user: { id, email } }` |
| POST | `/auth/login` | Login with credentials | `{ email, password }` | `{ token, user: { id, email } }` |

### Keystroke Routes (`/keystrokes`)
*All endpoints require JWT token in `Authorization: Bearer {token}` header*

| Method | Endpoint | Description | Body | Response |
|--------|----------|-------------|------|----------|
| POST | `/keystrokes/session` | Save keystroke batch | `{ sessionId, events: [...] }` | `{ totalKeystrokes, averagePressDuration, averageInterKeyInterval }` |
| GET | `/keystrokes/sessions` | List all sessions | — | `[{ sessionId, totalKeystrokes, ... }]` |
| GET | `/keystrokes/sessions/:sessionId` | Get session details | — | `{ sessionId, events: [...], timestamps, ... }` |

### Event Object Structure
```javascript
{
  pressDuration: number,      // ms key was held down
  interKeyInterval: number    // ms between this and previous key (null if first)
}
```

## 🔄 Application Flow

### 1. Authentication Flow
```
User visits app
  ↓
AuthPage (Login/Register)
  ↓
Submit credentials → POST /auth/login or /auth/register
  ↓
Backend validates & returns JWT token
  ↓
Token stored in localStorage
  ↓
AuthContext updated
  ↓
Redirect to EditorPage
```

### 2. Writing Session Flow
```
User opens EditorPage
  ↓
Session ID generated (UUID v4)
  ↓
User types in textarea
  ↓
Keystroke handlers track timing:
  - onKeyDown: Record key press start time
  - onKeyUp: Calculate duration & inter-key interval
  ↓
Events batched locally (50 events or 5s interval)
  ↓
POST /keystrokes/session with batch
  ↓
Server saves & calculates statistics
  ↓
Sidebar displays save status (Saving → Saved ✓)
  ↓
UI updates with typing metrics (words, characters, keystrokes)
```

### 3. Session History Flow
```
User clicks History button
  ↓
GET /keystrokes/sessions
  ↓
SessionHistory component renders list
  ↓
User clicks session → GET /keystrokes/sessions/:id
  ↓
Display detailed metrics (duration, IKI, statistics)
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── pages/
│   │   ├── AuthPage.jsx          # Login/Register UI
│   │   ├── AuthPage.css           # Auth styling
│   │   ├── EditorPage.jsx         # Main writing interface + sidebar
│   │   └── EditorPage.css         # Editor styling
│   ├── components/
│   │   ├── SessionHistory.jsx     # Session list & details
│   │   └── SessionHistory.css     # History styling
│   ├── context/
│   │   └── AuthContext.jsx        # Authentication state
│   ├── services/
│   │   ├── authService.js         # Auth API calls
│   │   └── keystrokeService.js    # Keystroke batch API calls
│   ├── App.jsx                    # Root component + routing
│   ├── index.css                  # Global styles
│   └── main.jsx                   # React DOM entry
├── public/
│   ├── favicon.svg                # Minimalist icon
│   └── images/                    # SVG assets
├── index.html                     # HTML entry point
├── vite.config.js                 # Vite configuration
└── package.json                   # Dependencies
```

## 🎨 Design System

### Color Palette
| Color | Hex | Usage |
|-------|-----|-------|
| White | #ffffff | Background |
| Black | #000000 | Text, borders |
| Light Gray | #f8f8f8 | Sidebar, cards |
| Medium Gray | #666666 | Secondary text |
| Light Gray | #e0e0e0 | Borders, dividers |

### Typography
- **UI Text**: Inter (400, 500, 600, 700)
- **Editor Content**: Lora (400, 500)
- **Buttons**: Lora (700 weight, bold serif style)

### Responsive Breakpoints
- **Desktop**: ≥769px (full width)
- **Tablet/Mobile**: ≤768px (sidebar collapses, icon-only buttons)

## 🚀 Getting Started

### Prerequisites
- Node.js 16+
- npm or yarn

### Installation

```bash
cd frontend
npm install
```

### Development Server

```bash
npm run dev
```

Starts at `http://localhost:5173` with HMR enabled.

### Production Build

```bash
npm run build
```

Generates optimized files in `dist/` directory.

### Preview Built App

```bash
npm run preview
```

## 📊 Key Components

### AuthPage
- Login/Register tabs
- Email and password validation
- Error message display
- Loading state handling

### EditorPage
- **Sidebar**: Logo, save status, History/Logout buttons, user email
- **Editor**: Textarea with keystroke tracking
- **Stats Strip**: Real-time word/character counts and keystroke metrics
- **Footer**: Session ID and character statistics

### SessionHistory
- List of previous sessions with timestamps
- Click to view detailed metrics
- Empty state with helpful messaging

## 🔐 Security Features

- **JWT Authentication**: 7-day expiring tokens
- **Password Encryption**: bcrypt hashing
- **Protected Routes**: Middleware validates tokens
- **No Key Logging**: Only timing data stored (never character/key identity)
- **CORS Configuration**: Secure backend communication

## 📈 Performance Metrics

Current build output:
- HTML: 0.60 kB (gzip: 0.37 kB)
- CSS: 11.40 kB (gzip: 2.95 kB)
- JS: 227.59 kB (gzip: 76.40 kB)
- Build time: ~800ms

## 🐛 Troubleshooting

### CORS Errors
Ensure backend is running on `http://localhost:5000`

### Token Expired
Clear localStorage and log in again: `localStorage.clear()`

### Keystroke Data Not Saving
Check network tab in DevTools; verify backend `/keystrokes/session` endpoint is responding

## 📝 License

See root LICENSE file
