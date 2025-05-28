# Restaurant Billing System

A modern, feature-rich restaurant billing system built with Next.js, React, and TypeScript. This application helps restaurant staff manage orders, calculate bills, and process payments efficiently.

## Features

### Multi-Tab Interface
- **Buffet Tab**: Manage buffet orders with dynamic pricing
  - Adult and kid buffet pricing
  - Time-based automatic price adjustments
  - Manual price override capability
  - Drink orders (Soda, Iced Tea, Beer)

- **Menu Tab**: À la carte menu ordering system
  - Categorized menu items
  - Search functionality
  - Spice level customization
  - Item quantity management

- **Combined Tab**: Unified ordering system
  - Combine buffet and menu items
  - Shared drink ordering
  - Consolidated bill calculation

- **To-Go Tab**: Takeout order management
  - Weight-based pricing
  - Menu item addition
  - Separate billing calculation

### Smart Pricing System
- Dynamic pricing based on time of day
- Weekday/Weekend differentiation
- Lunch/Dinner price adjustments
- Manual price override option
- Kid's special pricing

### Order Management
- Real-time quantity adjustment
- Spice level customization
- Drink options management
- Search functionality across menu items

### Bill Calculation
- Automatic tax calculation
- Cash discount support
- Cash payment calculator
- Itemized bill summary
- Multiple pricing modes

## Technology Stack

- **Framework**: Next.js 15.2
- **Language**: TypeScript
- **UI Components**: Custom components with Radix UI
- **Styling**: Tailwind CSS
- **State Management**: React Hooks
- **Build Tool**: Turbopack

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm run dev
   ```

4. Open [http://localhost:3000](http://localhost:3000) with your browser

## Project Structure

- `/app`: Next.js app router files
- `/components`: React components
  - `/ui`: Reusable UI components
  - Specialized business components
- `/constants`: Configuration and data
- `/hooks`: Custom React hooks
- `/types`: TypeScript type definitions
- `/utils`: Utility functions

## Key Components

- `BuffetTab`: Manages buffet orders and pricing
- `MenuTab`: Handles à la carte menu items
- `CombinedTab`: Unifies buffet and menu ordering
- `ToGoTab`: Handles takeout orders
- `BillSummary`: Displays order totals and calculations
- `TimeDisplay`: Shows current time and suggested prices
- `SearchResults`: Displays menu search results

## Development

The project uses Next.js's latest features and best practices:
- App Router for enhanced routing
- Server and Client Components
- Enhanced type safety with TypeScript
- Modern React patterns and hooks
- Responsive design with Tailwind CSS

## Scripts

- `npm run dev`: Start development server with Turbopack
- `npm run build`: Build for production
- `npm run start`: Start production server
- `npm run lint`: Run ESLint
