import type {
  Seller,
  ProductModeration,
  OrderItem,
  Customer,
  AuditLogEntry,
  KPIData,
} from '@/store/admin-store';

// ─── Chart / Summary Data Types ────────────────────────────────────
export interface RevenueChartPoint {
  month: string;
  revenue: number;
  orders: number;
  sellers: number;
}

export interface CategoryDataPoint {
  name: string;
  products: number;
  revenue: number;
  growth: number;
}

export interface TopSellerDataPoint {
  name: string;
  store: string;
  revenue: number;
  orders: number;
  rating: number;
}

export interface StatusDataPoint {
  status: string;
  count: number;
  color: string;
}

export interface RecentActivity {
  action: string;
  user: string;
  time: string;
  type: string;
}

// ─── 1. Dashboard KPIs ─────────────────────────────────────────────
export const dashboardKPIs: KPIData[] = [
  { label: 'Total Revenue', value: '847,500,000', change: 12.5, prefix: '₦', icon: 'DollarSign', color: 'emerald' },
  { label: 'Daily Revenue', value: '12,450,000', change: 8.3, prefix: '₦', icon: 'TrendingUp', color: 'emerald' },
  { label: 'Monthly Revenue', value: '342,000,000', change: 15.2, prefix: '₦', icon: 'Calendar', color: 'emerald' },
  { label: 'Active Sellers', value: '2,847', change: 156, icon: 'Store', color: 'blue' },
  { label: 'Pending Applications', value: '12', change: 3, icon: 'UserPlus', color: 'amber' },
  { label: 'Pending Reviews', value: '47', change: -12, icon: 'Clock', color: 'amber' },
  { label: 'Products Live', value: '45,892', change: 1234, icon: 'Package', color: 'violet' },
  { label: 'Orders Today', value: '1,456', change: 89, icon: 'ShoppingCart', color: 'blue' },
  { label: 'Refund Requests', value: '23', change: 5, icon: 'RotateCcw', color: 'red' },
  { label: 'Customer Complaints', value: '8', change: -3, icon: 'AlertTriangle', color: 'red' },
  { label: 'New Users', value: '3,421', change: 456, icon: 'Users', color: 'blue' },
  { label: 'Site Traffic', value: '89,432', change: 12.3, icon: 'Globe', color: 'violet' },
  { label: 'Conversion Rate', value: '3.8%', change: 0.4, icon: 'Target', color: 'emerald' },
  { label: 'Active Coupons', value: '18', change: 0, icon: 'Ticket', color: 'amber' },
  { label: 'Pending Withdrawals', value: '3', change: 0, icon: 'Wallet', color: 'amber' },
  { label: 'Avg Order Value', value: '8,540', change: 2.1, prefix: '₦', icon: 'Receipt', color: 'emerald' },
];

// ─── 2. Sellers ────────────────────────────────────────────────────
export const sellers: Seller[] = [
  { id: 'SEL-001', name: 'Chukwuma Okafor', email: 'chukwuma@techzone.ng', store: 'TechZone Nigeria', status: 'active', products: 342, revenue: 48500000, rating: 4.8, orders: 3240, joined: '2023-01-15', kyc: true, avatar: 'https://picsum.photos/seed/sel1/80/80', phone: '+234 801 234 5678', city: 'Lagos', category: 'Electronics' },
  { id: 'SEL-002', name: 'Aminat Ibrahim', email: 'aminat@fashionspot.ng', store: 'FashionSpot Hub', status: 'active', products: 518, revenue: 36200000, rating: 4.6, orders: 4890, joined: '2023-02-20', kyc: true, avatar: 'https://picsum.photos/seed/sel2/80/80', phone: '+234 802 345 6789', city: 'Lagos', category: 'Fashion' },
  { id: 'SEL-003', name: 'Emeka Nwankwo', email: 'emeka@homeplus.ng', store: 'HomePlus Deals', status: 'active', products: 224, revenue: 29800000, rating: 4.7, orders: 2150, joined: '2023-03-10', kyc: true, avatar: 'https://picsum.photos/seed/sel3/80/80', phone: '+234 803 456 7890', city: 'Abuja', category: 'Home & Garden' },
  { id: 'SEL-004', name: 'Fatima Bello', email: 'fatima@beautycorner.ng', store: 'Beauty Corner NG', status: 'active', products: 387, revenue: 21500000, rating: 4.9, orders: 5620, joined: '2023-04-05', kyc: true, avatar: 'https://picsum.photos/seed/sel4/80/80', phone: '+234 804 567 8901', city: 'Kano', category: 'Beauty' },
  { id: 'SEL-005', name: 'Olusegun Adeyemi', email: 'segun@autozone.ng', store: 'AutoZone Nigeria', status: 'active', products: 156, revenue: 42000000, rating: 4.5, orders: 890, joined: '2023-05-12', kyc: true, avatar: 'https://picsum.photos/seed/sel5/80/80', phone: '+234 805 678 9012', city: 'Lagos', category: 'Automotive' },
  { id: 'SEL-006', name: 'Ngozi Eze', email: 'ngozi@kiddietrends.ng', store: 'Kiddie Trends', status: 'active', products: 445, revenue: 18700000, rating: 4.7, orders: 3780, joined: '2023-06-18', kyc: true, avatar: 'https://picsum.photos/seed/sel6/80/80', phone: '+234 806 789 0123', city: 'Port Harcourt', category: 'Baby & Kids' },
  { id: 'SEL-007', name: 'Abubakar Musa', email: 'abubakar@gadgetworld.ng', store: 'GadgetWorld NG', status: 'suspended', products: 89, revenue: 12400000, rating: 3.8, orders: 670, joined: '2023-07-22', kyc: true, avatar: 'https://picsum.photos/seed/sel7/80/80', phone: '+234 807 890 1234', city: 'Kano', category: 'Electronics' },
  { id: 'SEL-008', name: 'Chioma Obi', email: 'chioma@stylequeenn.ng', store: 'StyleQueen Boutique', status: 'active', products: 612, revenue: 27600000, rating: 4.4, orders: 5230, joined: '2023-08-03', kyc: true, avatar: 'https://picsum.photos/seed/sel8/80/80', phone: '+234 808 901 2345', city: 'Lagos', category: 'Fashion' },
  { id: 'SEL-009', name: 'Ibrahim Danjuma', email: 'ibrahim@phoneshop.ng', store: 'PhoneShop NG', status: 'active', products: 198, revenue: 55200000, rating: 4.6, orders: 1890, joined: '2023-09-14', kyc: true, avatar: 'https://picsum.photos/seed/sel9/80/80', phone: '+234 809 012 3456', city: 'Abuja', category: 'Electronics' },
  { id: 'SEL-010', name: 'Blessing Okonkwo', email: 'blessing@organix.ng', store: 'Organix Store', status: 'active', products: 267, revenue: 9800000, rating: 4.8, orders: 2340, joined: '2023-10-01', kyc: true, avatar: 'https://picsum.photos/seed/sel10/80/80', phone: '+234 810 123 4567', city: 'Ibadan', category: 'Health' },
  { id: 'SEL-011', name: 'Yusuf Garba', email: 'yusuf@sportsgear.ng', store: 'SportsGear Pro', status: 'pending', products: 0, revenue: 0, rating: 0, orders: 0, joined: '2024-12-01', kyc: false, avatar: 'https://picsum.photos/seed/sel11/80/80', phone: '+234 811 234 5678', city: 'Kano', category: 'Sports' },
  { id: 'SEL-012', name: 'Aisha Mohammed', email: 'aisha@kitchenking.ng', store: 'KitchenKing NG', status: 'active', products: 178, revenue: 15400000, rating: 4.5, orders: 1670, joined: '2023-11-20', kyc: true, avatar: 'https://picsum.photos/seed/sel12/80/80', phone: '+234 812 345 6789', city: 'Lagos', category: 'Home & Garden' },
  { id: 'SEL-013', name: 'Tunde Bakare', email: 'tunde@quickbuy.ng', store: 'QuickBuy Deals', status: 'suspended', products: 334, revenue: 8900000, rating: 3.2, orders: 1230, joined: '2023-12-05', kyc: true, avatar: 'https://picsum.photos/seed/sel13/80/80', phone: '+234 813 456 7890', city: 'Ibadan', category: 'General' },
  { id: 'SEL-014', name: 'Hauwa Abdulsalam', email: 'hauwa@fabricworld.ng', store: 'Fabric World', status: 'active', products: 489, revenue: 21300000, rating: 4.7, orders: 3450, joined: '2024-01-10', kyc: true, avatar: 'https://picsum.photos/seed/sel14/80/80', phone: '+234 814 567 8901', city: 'Kano', category: 'Fashion' },
  { id: 'SEL-015', name: 'Obinna Nwosu', email: 'obinna@buildright.ng', store: 'BuildRight Hardware', status: 'active', products: 94, revenue: 37800000, rating: 4.3, orders: 560, joined: '2024-02-15', kyc: true, avatar: 'https://picsum.photos/seed/sel15/80/80', phone: '+234 815 678 9012', city: 'Port Harcourt', category: 'Home & Garden' },
  { id: 'SEL-016', name: 'Halima Usman', email: 'halima@perfumehouse.ng', store: 'Perfume House NG', status: 'active', products: 213, revenue: 16500000, rating: 4.9, orders: 2780, joined: '2024-03-08', kyc: true, avatar: 'https://picsum.photos/seed/sel16/80/80', phone: '+234 816 789 0123', city: 'Abuja', category: 'Beauty' },
  { id: 'SEL-017', name: 'Gbenga Adebanjo', email: 'gbenga@bookshaven.ng', store: 'Books Haven NG', status: 'active', products: 1245, revenue: 7200000, rating: 4.6, orders: 4560, joined: '2024-04-20', kyc: true, avatar: 'https://picsum.photos/seed/sel17/80/80', phone: '+234 817 890 1234', city: 'Lagos', category: 'Education' },
  { id: 'SEL-018', name: 'Zainab Aliyu', email: 'zainab@toyland.ng', store: 'ToyLand Nigeria', status: 'banned', products: 56, revenue: 3200000, rating: 2.1, orders: 340, joined: '2024-05-12', kyc: true, avatar: 'https://picsum.photos/seed/sel18/80/80', phone: '+234 818 901 2345', city: 'Kano', category: 'Baby & Kids' },
  { id: 'SEL-019', name: 'Folake Williams', email: 'folake@fitgear.ng', store: 'FitGear Athletics', status: 'active', products: 178, revenue: 11200000, rating: 4.4, orders: 1890, joined: '2024-06-01', kyc: true, avatar: 'https://picsum.photos/seed/sel19/80/80', phone: '+234 819 012 3456', city: 'Lagos', category: 'Sports' },
  { id: 'SEL-020', name: 'Sadiq Ahmed', email: 'sadiq@electromall.ng', store: 'ElectroMall NG', status: 'pending', products: 0, revenue: 0, rating: 0, orders: 0, joined: '2024-12-05', kyc: false, avatar: 'https://picsum.photos/seed/sel20/80/80', phone: '+234 801 567 2345', city: 'Abuja', category: 'Electronics' },
  { id: 'SEL-021', name: 'Adaeze Nwachukwu', email: 'adaeze@glamshelf.ng', store: 'GlamShelf Cosmetics', status: 'active', products: 302, revenue: 19800000, rating: 4.7, orders: 3120, joined: '2024-07-15', kyc: true, avatar: 'https://picsum.photos/seed/sel21/80/80', phone: '+234 802 678 3456', city: 'Port Harcourt', category: 'Beauty' },
  { id: 'SEL-022', name: 'Kabiru Tukur', email: 'kabiru@agroshop.ng', store: 'AgroShop Nigeria', status: 'active', products: 87, revenue: 6400000, rating: 4.2, orders: 450, joined: '2024-08-20', kyc: true, avatar: 'https://picsum.photos/seed/sel22/80/80', phone: '+234 803 789 4567', city: 'Kano', category: 'Agriculture' },
  { id: 'SEL-023', name: 'Tomiwa Fashola', email: 'tomiwa@devmart.ng', store: 'DevMart Tech', status: 'rejected', products: 0, revenue: 0, rating: 0, orders: 0, joined: '2024-11-28', kyc: false, avatar: 'https://picsum.photos/seed/sel23/80/80', phone: '+234 804 890 5678', city: 'Lagos', category: 'Electronics' },
  { id: 'SEL-024', name: 'Maryam Abubakar', email: 'maryam@jewelbox.ng', store: 'JewelBox NG', status: 'active', products: 423, revenue: 28700000, rating: 4.8, orders: 2340, joined: '2024-09-05', kyc: true, avatar: 'https://picsum.photos/seed/sel24/80/80', phone: '+234 805 901 6789', city: 'Abuja', category: 'Fashion' },
  { id: 'SEL-025', name: 'Emmanuel Ojo', email: 'emmanuel@toolmart.ng', store: 'ToolMart Industrial', status: 'active', products: 145, revenue: 23100000, rating: 4.5, orders: 780, joined: '2024-10-12', kyc: true, avatar: 'https://picsum.photos/seed/sel25/80/80', phone: '+234 806 012 7890', city: 'Ibadan', category: 'Home & Garden' },
];

// ─── 3. Product Moderation ────────────────────────────────────────
export const productModeration: ProductModeration[] = [
  { id: 'MOD-001', name: 'Premium Quality Apple AirPods Pro 2nd Generation Wireless Bluetooth Earbuds with Active Noise Cancelling', seller: 'Chukwuma Okafor', sellerId: 'SEL-001', category: 'Electronics', price: 45000, status: 'pending', images: ['https://picsum.photos/seed/p1/400/400'], submittedAt: '2024-12-10T09:30:00Z', flags: ['counterfeit'] },
  { id: 'MOD-002', name: 'Luxury Designer Handbag Premium Leather Tote Bag for Women – Best Quality Guaranteed', seller: 'Aminat Ibrahim', sellerId: 'SEL-002', category: 'Fashion', price: 28500, status: 'pending', images: ['https://picsum.photos/seed/p2/400/400'], submittedAt: '2024-12-10T08:15:00Z', flags: ['misleading'] },
  { id: 'MOD-003', name: 'Original Samsung Galaxy S24 Ultra 5G 256GB Factory Unlocked – Brand New Sealed Box', seller: 'Ibrahim Danjuma', sellerId: 'SEL-009', category: 'Electronics', price: 890000, status: 'pending', images: ['https://picsum.photos/seed/p3/400/400'], submittedAt: '2024-12-10T10:00:00Z', flags: ['counterfeit', 'misleading'] },
  { id: 'MOD-004', name: 'Organic Moringa Capsules 500mg – 120 Tablets Premium Health Supplement Made in Nigeria', seller: 'Blessing Okonkwo', sellerId: 'SEL-010', category: 'Health', price: 8500, status: 'approved', images: ['https://picsum.photos/seed/p4/400/400'], submittedAt: '2024-12-09T14:20:00Z', reviewedAt: '2024-12-09T16:45:00Z', reviewedBy: 'Admin: Chidi Anya' },
  { id: 'MOD-005', name: 'Men\'s Classic Canvas Sneakers Breathable Casual Shoes – Ultra Comfort Lightweight Running', seller: 'Tunde Bakare', sellerId: 'SEL-013', category: 'Fashion', price: 6200, status: 'rejected', images: ['https://picsum.photos/seed/p5/400/400'], submittedAt: '2024-12-09T11:10:00Z', reviewedAt: '2024-12-09T13:30:00Z', reviewedBy: 'Admin: Chidi Anya', reason: 'Product images do not match description. Possible counterfeit branding.', flags: ['counterfeit', 'duplicate'] },
  { id: 'MOD-006', name: 'Portable Bluetooth Speaker Waterproof IPX7 360° Surround Sound Bass Boost – Outdoor Party', seller: 'Chukwuma Okafor', sellerId: 'SEL-001', category: 'Electronics', price: 12500, status: 'approved', images: ['https://picsum.photos/seed/p6/400/400'], submittedAt: '2024-12-09T09:00:00Z', reviewedAt: '2024-12-09T10:15:00Z', reviewedBy: 'Admin: Funke Ola' },
  { id: 'MOD-007', name: 'Premium Quality Human Hair Lace Front Wig 13x4 – 180% Density Brazilian Body Wave', seller: 'Chioma Obi', sellerId: 'SEL-008', category: 'Fashion', price: 65000, status: 'pending', images: ['https://picsum.photos/seed/p7/400/400'], submittedAt: '2024-12-10T07:45:00Z', flags: ['misleading'] },
  { id: 'MOD-008', name: 'Automatic Soap Dispenser Touchless Sensor – Rechargeable 500ml Capacity for Kitchen Bathroom', seller: 'Aisha Mohammed', sellerId: 'SEL-012', category: 'Home & Garden', price: 7800, status: 'approved', images: ['https://picsum.photos/seed/p8/400/400'], submittedAt: '2024-12-08T15:30:00Z', reviewedAt: '2024-12-08T17:00:00Z', reviewedBy: 'Admin: Chidi Anya' },
  { id: 'MOD-009', name: 'Original Nike Air Jordan 1 Retro High OG – Authentic Brand New with Box and Tag', seller: 'Folake Williams', sellerId: 'SEL-019', category: 'Sports', price: 95000, status: 'pending', images: ['https://picsum.photos/seed/p9/400/400'], submittedAt: '2024-12-10T06:20:00Z', flags: ['counterfeit'] },
  { id: 'MOD-010', name: 'Whitening Face Cream Advanced Formula – Remove Dark Spots in 7 Days Natural Ingredients', seller: 'Halima Usman', sellerId: 'SEL-016', category: 'Beauty', price: 4500, status: 'revision', images: ['https://picsum.photos/seed/p10/400/400'], submittedAt: '2024-12-09T12:00:00Z', reviewedAt: '2024-12-09T14:30:00Z', reviewedBy: 'Admin: Funke Ola', reason: 'Health claims require NAFDAC registration number. Please update product description.', flags: ['misleading'] },
  { id: 'MOD-011', name: 'Solar Power Bank 30000mAh Fast Charging PD 65W – Portable Charger with LED Flashlight', seller: 'Ibrahim Danjuma', sellerId: 'SEL-009', category: 'Electronics', price: 18000, status: 'approved', images: ['https://picsum.photos/seed/p11/400/400'], submittedAt: '2024-12-08T10:45:00Z', reviewedAt: '2024-12-08T12:00:00Z', reviewedBy: 'Admin: Chidi Anya' },
  { id: 'MOD-012', name: 'Kids Educational Tablet 7-inch Android 12 – Pre-loaded with Nigerian Curriculum Learning App', seller: 'Gbenga Adebanjo', sellerId: 'SEL-017', category: 'Education', price: 32000, status: 'pending', images: ['https://picsum.photos/seed/p12/400/400'], submittedAt: '2024-12-10T11:30:00Z', flags: [] },
  { id: 'MOD-013', name: 'Kitchen Stand Mixer 5.5L Large Capacity – 6-Speed Electric Dough Blender Cake Maker', seller: 'Aisha Mohammed', sellerId: 'SEL-012', category: 'Home & Garden', price: 42000, status: 'approved', images: ['https://picsum.photos/seed/p13/400/400'], submittedAt: '2024-12-07T16:00:00Z', reviewedAt: '2024-12-07T18:20:00Z', reviewedBy: 'Admin: Funke Ola' },
  { id: 'MOD-014', name: 'Adidas Originals Yeezy Boost 350 V2 – 100% Authentic Brand New All Sizes Available', seller: 'Abubakar Musa', sellerId: 'SEL-007', category: 'Sports', price: 88000, status: 'hidden', images: ['https://picsum.photos/seed/p14/400/400'], submittedAt: '2024-12-06T09:30:00Z', reviewedAt: '2024-12-06T11:45:00Z', reviewedBy: 'Admin: Chidi Anya', reason: 'Multiple reports of counterfeit products from this seller. Listing hidden pending investigation.', flags: ['counterfeit', 'misleading'] },
  { id: 'MOD-015', name: 'Men\'s Ankara Print Long Sleeve Shirt – Premium Quality African Fabric Dry Clean Only', seller: 'Hauwa Abdulsalam', sellerId: 'SEL-014', category: 'Fashion', price: 9800, status: 'approved', images: ['https://picsum.photos/seed/p15/400/400'], submittedAt: '2024-12-07T13:20:00Z', reviewedAt: '2024-12-07T14:50:00Z', reviewedBy: 'Admin: Funke Ola' },
  { id: 'MOD-016', name: 'Wireless Gaming Mouse RGB 16000 DPI – Ergonomic Vertical Design for PC Laptop Gamers', seller: 'Chukwuma Okafor', sellerId: 'SEL-001', category: 'Electronics', price: 8500, status: 'pending', images: ['https://picsum.photos/seed/p16/400/400'], submittedAt: '2024-12-10T12:00:00Z', flags: ['duplicate'] },
  { id: 'MOD-017', name: '18K Gold Plated Jewelry Set Necklace Earrings Bracelet – Premium Quality Gift Box Included', seller: 'Maryam Abubakar', sellerId: 'SEL-024', category: 'Fashion', price: 15000, status: 'approved', images: ['https://picsum.photos/seed/p17/400/400'], submittedAt: '2024-12-08T08:30:00Z', reviewedAt: '2024-12-08T09:45:00Z', reviewedBy: 'Admin: Chidi Anya' },
  { id: 'MOD-018', name: 'Electric Pressure Cooker 8L Multi-Function – Rice Cooker Slow Cooker Steamer All-in-One', seller: 'Emeka Nwankwo', sellerId: 'SEL-003', category: 'Home & Garden', price: 55000, status: 'pending', images: ['https://picsum.photos/seed/p18/400/400'], submittedAt: '2024-12-10T13:15:00Z', flags: [] },
  { id: 'MOD-019', name: 'Car Phone Holder Magnetic Mount 360° Rotation – Universal Fit for All Smartphones Dashboard', seller: 'Olusegun Adeyemi', sellerId: 'SEL-005', category: 'Automotive', price: 3200, status: 'rejected', images: ['https://picsum.photos/seed/p19/400/400'], submittedAt: '2024-12-09T16:45:00Z', reviewedAt: '2024-12-09T18:00:00Z', reviewedBy: 'Admin: Funke Ola', reason: 'Duplicate listing. Identical product already exists under same seller.', flags: ['duplicate'] },
  { id: 'MOD-020', name: 'Professional Hair Clipper Cordless Rechargeable – LCD Display Titanium Blade Trimmer Kit', seller: 'Adaeze Nwachukwu', sellerId: 'SEL-021', category: 'Beauty', price: 14500, status: 'pending', images: ['https://picsum.photos/seed/p20/400/400'], submittedAt: '2024-12-10T14:00:00Z', flags: ['misleading'] },
];

// ─── 4. Orders ─────────────────────────────────────────────────────
export const orders: OrderItem[] = [
  { id: 'ORD-2401', orderId: 'NM-20241210-8472', customer: 'Adebayo Johnson', seller: 'TechZone Nigeria', products: 3, total: 285000, status: 'pending', payment: 'paid', date: '2024-12-10T15:30:00Z' },
  { id: 'ORD-2402', orderId: 'NM-20241210-8471', customer: 'Chidinma Eze', seller: 'FashionSpot Hub', products: 2, total: 32400, status: 'processing', payment: 'paid', date: '2024-12-10T14:20:00Z' },
  { id: 'ORD-2403', orderId: 'NM-20241210-8470', customer: 'Musa Aliyu', seller: 'PhoneShop NG', products: 1, total: 890000, status: 'shipped', payment: 'paid', date: '2024-12-10T13:15:00Z', tracking: 'GIG-2024-7894561' },
  { id: 'ORD-2404', orderId: 'NM-20241210-8469', customer: 'Patricia Ogunleye', seller: 'Beauty Corner NG', products: 5, total: 43200, status: 'delivered', payment: 'paid', date: '2024-12-09T10:00:00Z', tracking: 'GIG-2024-7894102' },
  { id: 'ORD-2405', orderId: 'NM-20241210-8468', customer: 'Yusuf Bello', seller: 'AutoZone Nigeria', products: 1, total: 156000, status: 'processing', payment: 'paid', date: '2024-12-10T11:45:00Z' },
  { id: 'ORD-2406', orderId: 'NM-20241210-8467', customer: 'Obiageli Nnamdi', seller: 'Kiddie Trends', products: 4, total: 28700, status: 'pending', payment: 'pending', date: '2024-12-10T16:00:00Z' },
  { id: 'ORD-2407', orderId: 'NM-20241210-8466', customer: 'Suleiman Garba', seller: 'GadgetWorld NG', products: 2, total: 67500, status: 'cancelled', payment: 'refunded', date: '2024-12-09T14:30:00Z' },
  { id: 'ORD-2408', orderId: 'NM-20241210-8465', customer: 'Florence Adekunle', seller: 'StyleQueen Boutique', products: 3, total: 18900, status: 'shipped', payment: 'paid', date: '2024-12-10T09:20:00Z', tracking: 'GIG-2024-7894305' },
  { id: 'ORD-2409', orderId: 'NM-20241210-8464', customer: 'Ahmed Rufai', seller: 'HomePlus Deals', products: 1, total: 45000, status: 'delivered', payment: 'paid', date: '2024-12-08T12:15:00Z', tracking: 'GIG-2024-7893201' },
  { id: 'ORD-2410', orderId: 'NM-20241210-8463', customer: 'Ngozi Agu', seller: 'Organix Store', products: 6, total: 23400, status: 'processing', payment: 'paid', date: '2024-12-10T10:30:00Z' },
  { id: 'ORD-2411', orderId: 'NM-20241210-8462', customer: 'Ibrahim Tanko', seller: 'TechZone Nigeria', products: 2, total: 320000, status: 'refunded', payment: 'refunded', date: '2024-12-07T16:45:00Z' },
  { id: 'ORD-2412', orderId: 'NM-20241210-8461', customer: 'Blessing Udo', seller: 'KitchenKing NG', products: 2, total: 49800, status: 'shipped', payment: 'paid', date: '2024-12-10T08:00:00Z', tracking: 'GIG-2024-7894450' },
  { id: 'ORD-2413', orderId: 'NM-20241210-8460', customer: 'Kola Adeyinka', seller: 'QuickBuy Deals', products: 1, total: 5500, status: 'delivered', payment: 'paid', date: '2024-12-06T11:00:00Z', tracking: 'GIG-2024-7892100' },
  { id: 'ORD-2414', orderId: 'NM-20241210-8459', customer: 'Hafsat Mohammed', seller: 'Fabric World', products: 8, total: 67200, status: 'pending', payment: 'paid', date: '2024-12-10T17:00:00Z' },
  { id: 'ORD-2415', orderId: 'NM-20241210-8458', customer: 'Chinedu Eze', seller: 'BuildRight Hardware', products: 3, total: 234000, status: 'processing', payment: 'paid', date: '2024-12-10T12:15:00Z' },
  { id: 'ORD-2416', orderId: 'NM-20241210-8457', customer: 'Toke Makinwa', seller: 'Perfume House NG', products: 2, total: 38500, status: 'delivered', payment: 'paid', date: '2024-12-05T09:30:00Z', tracking: 'GIG-2024-7891500' },
  { id: 'ORD-2417', orderId: 'NM-20241210-8456', customer: 'Abdullahi Ibrahim', seller: 'Books Haven NG', products: 12, total: 86400, status: 'shipped', payment: 'paid', date: '2024-12-10T07:45:00Z', tracking: 'GIG-2024-7894520' },
  { id: 'ORD-2418', orderId: 'NM-20241210-8455', customer: 'Chiamaka Obi', seller: 'FitGear Athletics', products: 2, total: 18400, status: 'pending', payment: 'pending', date: '2024-12-10T18:00:00Z' },
  { id: 'ORD-2419', orderId: 'NM-20241210-8454', customer: 'Garba Aminu', seller: 'ElectroMall NG', products: 1, total: 178000, status: 'cancelled', payment: 'failed', date: '2024-12-09T13:00:00Z' },
  { id: 'ORD-2420', orderId: 'NM-20241210-8453', customer: 'Adanna Okoro', seller: 'GlamShelf Cosmetics', products: 4, total: 29800, status: 'processing', payment: 'paid', date: '2024-12-10T14:50:00Z' },
  { id: 'ORD-2421', orderId: 'NM-20241210-8452', customer: 'Tanimu Sule', seller: 'AgroShop Nigeria', products: 3, total: 42300, status: 'delivered', payment: 'paid', date: '2024-12-04T10:20:00Z', tracking: 'GIG-2024-7890800' },
  { id: 'ORD-2422', orderId: 'NM-20241210-8451', customer: 'Amina Jibrin', seller: 'JewelBox NG', products: 2, total: 27500, status: 'shipped', payment: 'paid', date: '2024-12-10T06:30:00Z', tracking: 'GIG-2024-7894580' },
  { id: 'ORD-2423', orderId: 'NM-20241210-8450', customer: 'Emeka Opara', seller: 'ToolMart Industrial', products: 5, total: 167000, status: 'pending', payment: 'paid', date: '2024-12-10T16:30:00Z' },
  { id: 'ORD-2424', orderId: 'NM-20241210-8449', customer: 'Hadiza Bala', seller: 'FashionSpot Hub', products: 3, total: 42100, status: 'refunded', payment: 'refunded', date: '2024-12-08T15:00:00Z' },
  { id: 'ORD-2425', orderId: 'NM-20241210-8448', customer: 'Felix Ogundimu', seller: 'PhoneShop NG', products: 1, total: 245000, status: 'processing', payment: 'paid', date: '2024-12-10T15:00:00Z' },
];

// ─── 5. Customers ──────────────────────────────────────────────────
export const customers: Customer[] = [
  { id: 'CUS-001', name: 'Adebayo Johnson', email: 'adebayo.j@gmail.com', phone: '+234 801 111 2222', orders: 34, spent: 2450000, joined: '2023-03-15', status: 'active', city: 'Lagos', complaints: 1 },
  { id: 'CUS-002', name: 'Chidinma Eze', email: 'chidinma.e@yahoo.com', phone: '+234 802 222 3333', orders: 56, spent: 1890000, joined: '2023-04-20', status: 'active', city: 'Abuja', complaints: 0 },
  { id: 'CUS-003', name: 'Musa Aliyu', email: 'musa.aliyu@outlook.com', phone: '+234 803 333 4444', orders: 12, spent: 3200000, joined: '2023-05-10', status: 'active', city: 'Kano', complaints: 2 },
  { id: 'CUS-004', name: 'Patricia Ogunleye', email: 'pat.o@gmail.com', phone: '+234 804 444 5555', orders: 89, spent: 4560000, joined: '2023-01-05', status: 'active', city: 'Lagos', complaints: 0 },
  { id: 'CUS-005', name: 'Yusuf Bello', email: 'yusuf.b@hotmail.com', phone: '+234 805 555 6666', orders: 7, spent: 890000, joined: '2024-02-18', status: 'active', city: 'Abuja', complaints: 0 },
  { id: 'CUS-006', name: 'Obiageli Nnamdi', email: 'obi.nnamdi@gmail.com', phone: '+234 806 666 7777', orders: 45, spent: 1230000, joined: '2023-06-22', status: 'active', city: 'Port Harcourt', complaints: 1 },
  { id: 'CUS-007', name: 'Suleiman Garba', email: 'suleiman.g@gmail.com', phone: '+234 807 777 8888', orders: 3, spent: 150000, joined: '2024-08-11', status: 'active', city: 'Kano', complaints: 3 },
  { id: 'CUS-008', name: 'Florence Adekunle', email: 'florence.a@yahoo.com', phone: '+234 808 888 9999', orders: 67, spent: 2340000, joined: '2023-02-28', status: 'active', city: 'Ibadan', complaints: 0 },
  { id: 'CUS-009', name: 'Ahmed Rufai', email: 'ahmed.r@outlook.com', phone: '+234 809 999 0000', orders: 28, spent: 5670000, joined: '2023-03-10', status: 'active', city: 'Lagos', complaints: 1 },
  { id: 'CUS-010', name: 'Ngozi Agu', email: 'ngozi.agu@gmail.com', phone: '+234 810 000 1111', orders: 41, spent: 780000, joined: '2023-07-15', status: 'active', city: 'Enugu', complaints: 0 },
  { id: 'CUS-011', name: 'Ibrahim Tanko', email: 'ibrahim.t@gmail.com', phone: '+234 811 111 2222', orders: 15, spent: 2100000, joined: '2024-01-05', status: 'active', city: 'Kaduna', complaints: 2 },
  { id: 'CUS-012', name: 'Blessing Udo', email: 'blessing.udo@yahoo.com', phone: '+234 812 222 3333', orders: 92, spent: 3890000, joined: '2023-01-20', status: 'active', city: 'Uyo', complaints: 0 },
  { id: 'CUS-013', name: 'Kola Adeyinka', email: 'kola.a@gmail.com', phone: '+234 813 333 4444', orders: 5, spent: 340000, joined: '2024-09-03', status: 'suspended', city: 'Lagos', complaints: 5 },
  { id: 'CUS-014', name: 'Hafsat Mohammed', email: 'hafsat.m@outlook.com', phone: '+234 814 444 5555', orders: 33, spent: 1560000, joined: '2023-08-12', status: 'active', city: 'Kano', complaints: 0 },
  { id: 'CUS-015', name: 'Chinedu Eze', email: 'chinedu.e@gmail.com', phone: '+234 815 555 6666', orders: 21, spent: 980000, joined: '2024-04-25', status: 'active', city: 'Port Harcourt', complaints: 1 },
  { id: 'CUS-016', name: 'Toke Makinwa', email: 'toke.m@gmail.com', phone: '+234 816 666 7777', orders: 78, spent: 5670000, joined: '2023-02-14', status: 'active', city: 'Lagos', complaints: 0 },
  { id: 'CUS-017', name: 'Abdullahi Ibrahim', email: 'abdullahi.i@yahoo.com', phone: '+234 817 777 8888', orders: 54, spent: 4320000, joined: '2023-05-30', status: 'active', city: 'Abuja', complaints: 1 },
  { id: 'CUS-018', name: 'Chiamaka Obi', email: 'chiamaka.o@gmail.com', phone: '+234 818 888 9999', orders: 19, spent: 670000, joined: '2024-06-18', status: 'active', city: 'Owerri', complaints: 0 },
  { id: 'CUS-019', name: 'Garba Aminu', email: 'garba.a@outlook.com', phone: '+234 819 999 0000', orders: 8, spent: 450000, joined: '2024-10-01', status: 'blacklisted', city: 'Kano', complaints: 8 },
  { id: 'CUS-020', name: 'Adanna Okoro', email: 'adanna.o@gmail.com', phone: '+234 801 000 1111', orders: 44, spent: 2890000, joined: '2023-04-08', status: 'active', city: 'Lagos', complaints: 0 },
];

// ─── 6. Audit Logs ─────────────────────────────────────────────────
export const auditLogs: AuditLogEntry[] = [
  { id: 'LOG-001', user: 'Chidi Anya', role: 'super-admin', action: 'Approved seller', module: 'sellers', target: 'Yusuf Garba (SEL-011)', previousValue: 'pending', newValue: 'active', ip: '102.89.23.41', device: 'Chrome / macOS', timestamp: '2024-12-10T15:45:00Z' },
  { id: 'LOG-002', user: 'Funke Ola', role: 'super-admin', action: 'Rejected product', module: 'products', target: 'MOD-005 – Men\'s Classic Canvas Sneakers', previousValue: 'pending', newValue: 'rejected', ip: '41.58.12.89', device: 'Chrome / Windows', timestamp: '2024-12-10T14:30:00Z' },
  { id: 'LOG-003', user: 'Chidi Anya', role: 'super-admin', action: 'Updated commission', module: 'commission', target: 'Electronics category', previousValue: '5%', newValue: '6%', ip: '102.89.23.41', device: 'Chrome / macOS', timestamp: '2024-12-10T13:15:00Z' },
  { id: 'LOG-004', user: 'Funke Ola', role: 'super-admin', action: 'Issued refund', module: 'finance', target: 'ORD-2411 – Ibrahim Tanko', previousValue: 'paid', newValue: 'refunded', ip: '41.58.12.89', device: 'Chrome / Windows', timestamp: '2024-12-10T12:00:00Z' },
  { id: 'LOG-005', user: 'Chidi Anya', role: 'super-admin', action: 'Suspended seller', module: 'sellers', target: 'Abubakar Musa (SEL-007)', previousValue: 'active', newValue: 'suspended', ip: '102.89.23.41', device: 'Chrome / macOS', timestamp: '2024-12-10T10:45:00Z' },
  { id: 'LOG-006', user: 'Blessing Uko', role: 'support-staff', action: 'Resolved complaint', module: 'customers', target: 'CUS-007 – Suleiman Garba', newValue: 'Resolved – replacement shipped', ip: '102.89.45.78', device: 'Firefox / Windows', timestamp: '2024-12-10T10:20:00Z' },
  { id: 'LOG-007', user: 'Funke Ola', role: 'super-admin', action: 'Approved product', module: 'products', target: 'MOD-006 – Portable Bluetooth Speaker', previousValue: 'pending', newValue: 'approved', ip: '41.58.12.89', device: 'Chrome / Windows', timestamp: '2024-12-10T09:15:00Z' },
  { id: 'LOG-008', user: 'Chidi Anya', role: 'super-admin', action: 'Created coupon', module: 'coupons', target: 'FLASHDEC12 – 15% off Electronics', newValue: 'Active', ip: '102.89.23.41', device: 'Chrome / macOS', timestamp: '2024-12-10T08:30:00Z' },
  { id: 'LOG-009', user: 'Amina Datti', role: 'finance-staff', action: 'Approved withdrawal', module: 'finance', target: 'TechZone Nigeria – ₦2,450,000', previousValue: 'pending', newValue: 'approved', ip: '102.89.67.12', device: 'Safari / macOS', timestamp: '2024-12-10T08:00:00Z' },
  { id: 'LOG-010', user: 'Blessing Uko', role: 'support-staff', action: 'Updated order status', module: 'orders', target: 'ORD-2403 – Musa Aliyu', previousValue: 'processing', newValue: 'shipped', ip: '102.89.45.78', device: 'Firefox / Windows', timestamp: '2024-12-09T17:30:00Z' },
  { id: 'LOG-011', user: 'Funke Ola', role: 'super-admin', action: 'Banned seller', module: 'sellers', target: 'Zainab Aliyu (SEL-018)', previousValue: 'suspended', newValue: 'banned', ip: '41.58.12.89', device: 'Chrome / Windows', timestamp: '2024-12-09T16:00:00Z' },
  { id: 'LOG-012', user: 'Chidi Anya', role: 'super-admin', action: 'Updated CMS banner', module: 'cms', target: 'Homepage Hero Banner – December Deals', newValue: 'Published', ip: '102.89.23.41', device: 'Chrome / macOS', timestamp: '2024-12-09T15:15:00Z' },
  { id: 'LOG-013', user: 'Amina Datti', role: 'finance-staff', action: 'Exported report', module: 'reports', target: 'Monthly Revenue Report – November 2024', newValue: 'PDF exported', ip: '102.89.67.12', device: 'Safari / macOS', timestamp: '2024-12-09T14:00:00Z' },
  { id: 'LOG-014', user: 'Blessing Uko', role: 'support-staff', action: 'Flagged review', module: 'reviews', target: 'Review #4521 – Product MOD-005', newValue: 'hidden', ip: '102.89.45.78', device: 'Firefox / Windows', timestamp: '2024-12-09T12:30:00Z' },
  { id: 'LOG-015', user: 'Chidi Anya', role: 'super-admin', action: 'Approved seller', module: 'sellers', target: 'Sadiq Ahmed (SEL-020)', previousValue: 'pending', newValue: 'active', ip: '102.89.23.41', device: 'Chrome / macOS', timestamp: '2024-12-09T11:00:00Z' },
  { id: 'LOG-016', user: 'Funke Ola', role: 'super-admin', action: 'Rejected seller', module: 'sellers', target: 'Tomiwa Fashola (SEL-023)', previousValue: 'pending', newValue: 'rejected', ip: '41.58.12.89', device: 'Chrome / Windows', timestamp: '2024-12-09T10:15:00Z' },
  { id: 'LOG-017', user: 'Amina Datti', role: 'finance-staff', action: 'Processed withdrawal', module: 'finance', target: 'FashionSpot Hub – ₦3,200,000', previousValue: 'approved', newValue: 'completed', ip: '102.89.67.12', device: 'Safari / macOS', timestamp: '2024-12-09T09:00:00Z' },
  { id: 'LOG-018', user: 'Chidi Anya', role: 'super-admin', action: 'Updated role permissions', module: 'roles', target: 'Content Moderator', previousValue: 'view, edit, approve', newValue: 'view, edit, delete, approve', ip: '102.89.23.41', device: 'Chrome / macOS', timestamp: '2024-12-08T16:45:00Z' },
  { id: 'LOG-019', user: 'Blessing Uko', role: 'support-staff', action: 'Sent notification', module: 'notifications', target: 'All active sellers – Holiday shipping deadline', newValue: 'Broadcast sent', ip: '102.89.45.78', device: 'Firefox / Windows', timestamp: '2024-12-08T15:30:00Z' },
  { id: 'LOG-020', user: 'Funke Ola', role: 'super-admin', action: 'Approved product', module: 'products', target: 'MOD-004 – Organic Moringa Capsules', previousValue: 'pending', newValue: 'approved', ip: '41.58.12.89', device: 'Chrome / Windows', timestamp: '2024-12-08T14:15:00Z' },
  { id: 'LOG-021', user: 'Chidi Anya', role: 'super-admin', action: 'Created category', module: 'categories', target: 'Agriculture', newValue: 'Active', ip: '102.89.23.41', device: 'Chrome / macOS', timestamp: '2024-12-08T13:00:00Z' },
  { id: 'LOG-022', user: 'Amina Datti', role: 'finance-staff', action: 'Updated commission', module: 'commission', target: 'Fashion category', previousValue: '8%', newValue: '7%', ip: '102.89.67.12', device: 'Safari / macOS', timestamp: '2024-12-08T11:30:00Z' },
  { id: 'LOG-023', user: 'Funke Ola', role: 'super-admin', action: 'Hidden product', module: 'products', target: 'MOD-014 – Adidas Yeezy Boost 350 V2', previousValue: 'approved', newValue: 'hidden', ip: '41.58.12.89', device: 'Chrome / Windows', timestamp: '2024-12-07T15:45:00Z' },
  { id: 'LOG-024', user: 'Blessing Uko', role: 'support-staff', action: 'Blacklisted customer', module: 'customers', target: 'Garba Aminu (CUS-019)', previousValue: 'suspended', newValue: 'blacklisted', ip: '102.89.45.78', device: 'Firefox / Windows', timestamp: '2024-12-07T14:20:00Z' },
  { id: 'LOG-025', user: 'Chidi Anya', role: 'super-admin', action: 'Updated site settings', module: 'cms', target: 'Platform commission structure', previousValue: 'Flat 5%', newValue: 'Category-based (5-10%)', ip: '102.89.23.41', device: 'Chrome / macOS', timestamp: '2024-12-07T12:00:00Z' },
  { id: 'LOG-026', user: 'Amina Datti', role: 'finance-staff', action: 'Approved withdrawal', module: 'finance', target: 'StyleQueen Boutique – ₦1,800,000', previousValue: 'pending', newValue: 'approved', ip: '102.89.67.12', device: 'Safari / macOS', timestamp: '2024-12-07T10:30:00Z' },
  { id: 'LOG-027', user: 'Funke Ola', role: 'super-admin', action: 'Approved product', module: 'products', target: 'MOD-013 – Kitchen Stand Mixer 5.5L', previousValue: 'pending', newValue: 'approved', ip: '41.58.12.89', device: 'Chrome / Windows', timestamp: '2024-12-06T16:15:00Z' },
  { id: 'LOG-028', user: 'Chidi Anya', role: 'super-admin', action: 'Created coupon', module: 'coupons', target: 'WELCOME10 – 10% off first order', newValue: 'Active', ip: '102.89.23.41', device: 'Chrome / macOS', timestamp: '2024-12-06T14:00:00Z' },
  { id: 'LOG-029', user: 'Blessing Uko', role: 'support-staff', action: 'Updated order status', module: 'orders', target: 'ORD-2404 – Patricia Ogunleye', previousValue: 'shipped', newValue: 'delivered', ip: '102.89.45.78', device: 'Firefox / Windows', timestamp: '2024-12-06T11:45:00Z' },
  { id: 'LOG-030', user: 'Funke Ola', role: 'super-admin', action: 'Requested revision', module: 'products', target: 'MOD-010 – Whitening Face Cream', previousValue: 'pending', newValue: 'revision', ip: '41.58.12.89', device: 'Chrome / Windows', timestamp: '2024-12-06T10:00:00Z' },
];

// ─── 7. Revenue Chart Data ─────────────────────────────────────────
export const revenueChartData: RevenueChartPoint[] = [
  { month: 'Jan', revenue: 198000000, orders: 32400, sellers: 2100 },
  { month: 'Feb', revenue: 215000000, orders: 34800, sellers: 2180 },
  { month: 'Mar', revenue: 232000000, orders: 37200, sellers: 2260 },
  { month: 'Apr', revenue: 248000000, orders: 38900, sellers: 2340 },
  { month: 'May', revenue: 261000000, orders: 40100, sellers: 2420 },
  { month: 'Jun', revenue: 278000000, orders: 42500, sellers: 2490 },
  { month: 'Jul', revenue: 295000000, orders: 44800, sellers: 2560 },
  { month: 'Aug', revenue: 312000000, orders: 46200, sellers: 2630 },
  { month: 'Sep', revenue: 298000000, orders: 43500, sellers: 2700 },
  { month: 'Oct', revenue: 325000000, orders: 47800, sellers: 2760 },
  { month: 'Nov', revenue: 356000000, orders: 51200, sellers: 2810 },
  { month: 'Dec', revenue: 342000000, orders: 48600, sellers: 2847 },
];

// ─── 8. Category Data ──────────────────────────────────────────────
export const categoryData: CategoryDataPoint[] = [
  { name: 'Electronics', products: 12450, revenue: 285000000, growth: 18.5 },
  { name: 'Fashion', products: 9820, revenue: 178000000, growth: 12.3 },
  { name: 'Home & Garden', products: 6340, revenue: 112000000, growth: 8.7 },
  { name: 'Beauty', products: 5890, revenue: 89000000, growth: 22.1 },
  { name: 'Sports', products: 3210, revenue: 45000000, growth: 15.4 },
  { name: 'Baby & Kids', products: 2870, revenue: 38000000, growth: 9.8 },
  { name: 'Automotive', products: 1540, revenue: 52000000, growth: 6.2 },
  { name: 'Health', products: 1120, revenue: 21000000, growth: 25.6 },
  { name: 'Education', products: 1680, revenue: 12000000, growth: 14.3 },
  { name: 'Agriculture', products: 450, revenue: 8500000, growth: 32.1 },
  { name: 'General', products: 1522, revenue: 6500000, growth: 4.5 },
];

// ─── 9. Top Sellers Data ───────────────────────────────────────────
export const topSellersData: TopSellerDataPoint[] = [
  { name: 'Ibrahim Danjuma', store: 'PhoneShop NG', revenue: 55200000, orders: 1890, rating: 4.6 },
  { name: 'Chukwuma Okafor', store: 'TechZone Nigeria', revenue: 48500000, orders: 3240, rating: 4.8 },
  { name: 'Olusegun Adeyemi', store: 'AutoZone Nigeria', revenue: 42000000, orders: 890, rating: 4.5 },
  { name: 'Emeka Nwankwo', store: 'HomePlus Deals', revenue: 29800000, orders: 2150, rating: 4.7 },
  { name: 'Chioma Obi', store: 'StyleQueen Boutique', revenue: 27600000, orders: 5230, rating: 4.4 },
];

// ─── 10. Order Status Data ─────────────────────────────────────────
export const orderStatusData: StatusDataPoint[] = [
  { status: 'Pending', count: 412, color: '#f59e0b' },
  { status: 'Processing', count: 289, color: '#3b82f6' },
  { status: 'Shipped', count: 534, color: '#8b5cf6' },
  { status: 'Delivered', count: 8745, color: '#10b981' },
  { status: 'Cancelled', count: 312, color: '#ef4444' },
  { status: 'Refunded', count: 178, color: '#f97316' },
];

// ─── 11. Seller Status Data ────────────────────────────────────────
export const sellerStatusData: StatusDataPoint[] = [
  { status: 'Active', count: 2456, color: '#10b981' },
  { status: 'Suspended', count: 87, color: '#f59e0b' },
  { status: 'Banned', count: 23, color: '#ef4444' },
  { status: 'Pending', count: 184, color: '#3b82f6' },
  { status: 'Rejected', count: 97, color: '#6b7280' },
];

// ─── 12. Recent Activities ─────────────────────────────────────────
export const recentActivities: RecentActivity[] = [
  { action: 'Approved seller application', user: 'Chidi Anya', time: '2 min ago', type: 'seller' },
  { action: 'Rejected counterfeit product listing', user: 'Funke Ola', time: '15 min ago', type: 'product' },
  { action: 'Processed ₦2.45M withdrawal request', user: 'Amina Datti', time: '32 min ago', type: 'finance' },
  { action: 'Updated Electronics commission to 6%', user: 'Chidi Anya', time: '1 hour ago', type: 'commission' },
  { action: 'Resolved customer complaint #4821', user: 'Blessing Uko', time: '1 hour ago', type: 'support' },
  { action: 'Published December Deals banner', user: 'Chidi Anya', time: '2 hours ago', type: 'cms' },
  { action: 'Created FLASHDEC12 coupon campaign', user: 'Chidi Anya', time: '3 hours ago', type: 'coupon' },
  { action: 'Banned seller for repeated violations', user: 'Funke Ola', time: '4 hours ago', type: 'seller' },
  { action: 'Exported November revenue report', user: 'Amina Datti', time: '5 hours ago', type: 'report' },
  { action: 'Hidden 3 flagged review entries', user: 'Blessing Uko', time: '6 hours ago', type: 'review' },
];