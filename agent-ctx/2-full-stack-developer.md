# Task 2 – full-stack-developer

## What was built
`/home/z/my-project/src/components/admin/super-admin/Dashboard.tsx` — the main Super Admin Dashboard component.

## Key decisions
- **Icon mapping**: Created a `iconMap` record mapping string icon names from data to Lucide icon components (19 icons covered).
- **Color mapping**: `colorMap` maps color name strings (emerald, blue, amber, red, violet) to Tailwind bg/text utility pairs for KPI icon circles.
- **Plain HTML table**: Used for Top Sellers instead of shadcn Table per requirements, with custom rank badge styling.
- **Staggered animations**: KPI cards use `animationDelay` based on index (50ms increments) for a cascading fade-in effect.
- **Custom Tooltip**: Built a dedicated `RevenueTooltip` component for the AreaChart with dark-themed styling and Naira formatting.
- **Activity colors**: `activityColorMap` maps activity types to specific dot colors for visual differentiation.

## Data consumed
- `dashboardKPIs` (16 items)
- `revenueChartData` (12 months)
- `categoryData` (top 8 of 11)
- `topSellersData` (5 sellers)
- `orderStatusData` (6 statuses)
- `sellerStatusData` (5 statuses)
- `recentActivities` (10 activities)

## Lint result
- Dashboard.tsx: **0 errors, 0 warnings**
- Pre-existing error in Sidebar.tsx (unrelated, `react-hooks/set-state-in-effect`)
