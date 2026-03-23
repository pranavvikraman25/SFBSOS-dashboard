You are upgrading the existing SFBSOS Smart Fruit Business Analytics 
dashboard into a full two-sided platform: an Admin Dashboard and a 
Customer-facing Order Website. Keep all existing screens and apply 
every upgrade listed below precisely.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
GLOBAL DESIGN SYSTEM (apply to all screens)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Font: Inter. Primary color: #16A34A. Background: #F9FAFB.
Cards: white, 1px border #E5E7EB, radius 12px, padding 20px.
Buttons: primary = #16A34A bg white text. Secondary = white bg green border.
Sidebar: #111827 dark. Active item: green left border + #14532D tint.
All inputs: 40px height, 8px radius, #F9FAFB bg, 1px #D1D5DB border.
Status badges: small pill, colored bg with dark matching text.
Spacing: 8px base unit throughout.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SCREEN 0A — ADMIN LOGIN PAGE (new)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Full page centered card. No sidebar. Clean minimal.

Left half: Green background #16A34A with white SFBSOS logo text,
tagline "Smart Fruit Business Analytics", and 3 bullet points:
- Real-time billing and GST management
- Inventory ageing alerts and demand forecasting  
- Complete profit and loss analytics

Right half: White login card with:
- "Admin Login" heading (20px bold)
- "Welcome back, shop owner" subtitle (gray)
- Email input field with envelope icon
- Password input with eye toggle icon
- [Remember me] checkbox left + [Forgot password?] link right
- Large green [Login to Dashboard] button full width
- Divider line with "or" text
- [Login with Google] outlined button with Google icon
- Bottom text: "Customer? Shop here →" link in green

Show error state variant: red border on email field + 
"Invalid credentials. Please try again." error message in red box above button.

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SCREEN 0B — CUSTOMER LOGIN / REGISTER PAGE (new)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Full page. Top navbar: SFBSOS logo left, [Browse Fruits] [My Orders] 
[Track Order] nav links center, [Login] [Register] buttons right.

Two tabs at top of card: [Login] [Register]

LOGIN tab:
- Email input
- Password input with eye toggle
- [Login] green button
- "Continue as guest" gray text link below

REGISTER tab:
- Full name input
- Email input  
- Phone number input with +91 prefix
- Password input
- Confirm password input
- [Create Account] green button
- "By registering you agree to our Terms" small gray text

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SCREEN 0C — CUSTOMER WEBSITE (public, no login needed)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Top navbar: SFBSOS Fruits logo left | search bar center | 
[Login] [My Cart (3)] right.

Hero banner: Full-width green gradient banner.
"Fresh Fruits Delivered to Your Door"
"Order online, pick up in store or get home delivery"
[Shop Now] white button + [Track My Order] outlined button.
Delivery badge: "Home delivery available • Extra charges apply"

Fruit catalog grid (3 columns):
Each fruit card has:
- Fruit image placeholder (circle with fruit emoji large)
- Fruit name bold
- Price per unit (Rs. per kg or per piece)
- Availability badge: [In Stock] green or [Limited] amber
- Unit selector: [-] [1 kg] [+]  
- [Add to Cart] green button

Show 8 fruit cards: Apple (Rs.80/kg), Mango (Rs.120/kg), 
Banana (Rs.60/dozen), Orange (Rs.90/kg), Grapes (Rs.150/kg),
Watermelon (Rs.40/kg), Pineapple (Rs.80/piece), Pomegranate (Rs.200/kg)

Below catalog: Delivery Info banner
"Home Delivery: Rs.50 within 5km | Rs.80 within 10km | Free above Rs.500"
"Pick-up from store: No extra charge | Ready in 30 minutes"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SCREEN 0D — CUSTOMER ORDER CHECKOUT (logged in)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Two-column layout.

LEFT (60%): Order Summary card
- Item list table: Fruit | Qty | Unit Price | Total
  Apple | 2 kg | Rs.80 | Rs.160
  Mango | 3 kg | Rs.120 | Rs.360
  Grapes | 1 kg | Rs.150 | Rs.150
- Subtotal: Rs.670
- Delivery charge: Rs.50 (if home delivery selected)
- Grand Total: Rs.720

Delivery type toggle: [Store Pickup — Free] [Home Delivery — Rs.50]
When Home Delivery selected: address fields appear:
- Full address textarea
- City input | Pincode input  
- Delivery time slot: [Morning 9-12] [Afternoon 12-5] [Evening 5-8]

Payment section:
[Cash on Delivery] [UPI Payment] [Pay at Counter]
UPI option shows: UPI ID input field

[Place Order] large green button

RIGHT (40%): Your Details card
- Name, phone pre-filled from account
- Order notes textarea: "Special instructions..."
- Promo code input + [Apply] button
- Estimated delivery: "Today by 6:00 PM"
- Order tracking note: "You will receive SMS updates"

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
SCREEN 0E — CUSTOMER MY ORDERS PAGE (logged in)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Header: "My Orders — Rajan Kumar" with total spend badge.

Filter tabs: [All] [Pending] [Ready] [Delivered] [Cancelled]

Order cards list, each card shows:
- Order #ORD-2024-0042 | 21 Mar 2025 | Rs.720
- Items: Apple 2kg, Mango 3kg, Grapes 1kg
- Status pill: [DELIVERED] green / [READY FOR PICKUP] amber / [PENDING] gray
- Delivery type badge: [Home Delivery] or [Store Pickup]
- [View Details] outlined button | [Reorder] green button

Show 5 order cards with different statuses.

Order detail expanded view (show as right panel slide-in):
- Order timeline: Placed → Confirmed → Packed → Out for Delivery → Delivered
  Each step has timestamp and checkmark icon
- Full bill breakdown with GST if applicable
- Delivery address shown
- [Download Bill] button | [Rate this Order] star rating

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ADMIN DASHBOARD — TOP BAR UPGRADE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Top bar (present on all admin screens):
Left: Breadcrumb showing current section
Center: Global search bar with placeholder "Search bills, fruits, customers..."
Right side icons row (left to right):
1. Language globe icon — clicking opens language dropdown (see Settings upgrade)
2. Notification bell icon with red badge showing count (e.g. 3)
   Clicking opens notification dropdown panel:
   Panel width 320px, shows 5 recent notifications:
   • "Mango batch expiring in 6 hours" — red dot — 2 mins ago
   • "New order #ORD-0089 received" — green dot — 8 mins ago  
   • "Grapes stock below reorder level" — amber dot — 1 hr ago
   • "GST report ready for March" — blue dot — 3 hrs ago
   • "Customer Rajan payment received" — green dot — Yesterday
   [Mark all read] link at bottom of panel
3. Admin avatar circle with initials "JB" — clicking opens dropdown:
   [My Profile] [Change Password] [Switch to Customer View] [Logout]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
ADMIN SIDEBAR — ADD NEW ITEM
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Add to existing sidebar below Alerts:
🛒 Orders (with live count badge showing pending orders e.g. "5")

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
NEW ADMIN SCREEN — ORDERS MANAGEMENT
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Header: "Incoming Orders" | Live badge "5 pending"
Filter tabs: [All Orders] [Pending (5)] [Packing] [Ready] [Out for Delivery] [Delivered]

Orders table:
Columns: Order# | Customer | Items | Amount | Type | Time | Status | Actions

Show 7 rows of sample orders:
ORD-0089 | Rajan Kumar | Apple 2kg, Mango 3kg | Rs.720 | Home Delivery | 2 mins ago | [PENDING] | [Accept] [Reject]
ORD-0088 | Priya S | Banana 3 dozen | Rs.180 | Store Pickup | 15 mins ago | [PACKING] | [Mark Ready]
ORD-0087 | Karthik M | Grapes 2kg, Orange 3kg | Rs.570 | Home Delivery | 45 mins ago | [READY] | [Dispatch]
ORD-0086 | Divya R | Watermelon 5kg | Rs.200 | Store Pickup | 1 hr ago | [DELIVERED] | [View]
ORD-0085 | Senthil P | Pomegranate 1kg, Apple 1kg | Rs.280 | Home Delivery | 2 hrs ago | [DELIVERED] | [View]
ORD-0084 | Meena V | Mango 4kg | Rs.480 | Store Pickup | 3 hrs ago | [DELIVERED] | [View]
ORD-0083 | Arjun T | Pineapple 2pcs, Grapes 1kg | Rs.310 | Home Delivery | Yesterday | [DELIVERED] | [View]

Order detail side panel (shown when any row clicked):
- Customer info: Name, Phone, Address (if delivery)
- Item breakdown with quantities and prices
- Delivery charge line if home delivery
- Status update buttons: [Confirm Packing] → [Mark Ready] → [Dispatch] → [Delivered]
- Order notes from customer
- [Print Bill] button → downloads .txt receipt file
- [Call Customer] button with phone number shown

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
UPGRADE 2 — ANALYTICS: DAILY VIEW (7-DAY ROLLING)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
When [Daily] tab is selected in Analytics:
Date range label changes to: "15 Mar – 21 Mar 2025 (Last 7 days)"

Replace current single-day view with:

GROUPED BAR CHART — full width, height 280px:
Title: "Daily Revenue vs Cost vs Profit — Last 7 Days"
X-axis: 7 date labels — "Sat 15", "Sun 16", "Mon 17", "Tue 18", 
        "Wed 19", "Thu 20", "Fri 21"
Y-axis: Rs. amount
3 grouped bars per day:
- Bar 1 (darkest #111827): Revenue
- Bar 2 (medium #6B7280): Cost  
- Bar 3 (lightest #D1D5DB): Profit
Legend: Revenue | Cost | Profit (3 colored squares)

Hover tooltip on each bar shows:
"Wednesday 19 Mar
Revenue: Rs.3,240
Cost: Rs.2,100
Profit: Rs.1,140
Bills: 8"

BELOW CHART — Daily Summary Table:
Headers: Date | Day | Bills Raised | Revenue | Cost | Profit | Margin %
Row 1: 15 Mar | Saturday | 12 | Rs.4,200 | Rs.2,800 | Rs.1,400 | 33%
Row 2: 16 Mar | Sunday | 18 | Rs.6,100 | Rs.3,900 | Rs.2,200 | 36%
Row 3: 17 Mar | Monday | 8 | Rs.2,800 | Rs.1,900 | Rs.900 | 32%
Row 4: 18 Mar | Tuesday | 10 | Rs.3,500 | Rs.2,300 | Rs.1,200 | 34%
Row 5: 19 Mar | Wednesday | 8 | Rs.3,240 | Rs.2,100 | Rs.1,140 | 35%
Row 6: 20 Mar | Thursday | 14 | Rs.5,100 | Rs.3,300 | Rs.1,800 | 35%
Row 7: 21 Mar | Friday (Today) | 6 | Rs.1,800 | Rs.1,200 | Rs.600 | 33%
TOTAL row (bold): — | — | 76 | Rs.26,740 | Rs.17,500 | Rs.9,240 | 35%

Right side mini panel (same as other tabs):
GST collected this week: Rs.1,240
Best day: Sunday 16 Mar (Rs.6,100)
Worst day: Monday 17 Mar (Rs.2,800)
Daily average: Rs.3,820

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
UPGRADE 3 — BILLING: CUSTOMER AUTO-FILL
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
In the billing screen Customer Name field:
When admin starts typing in the Customer Name field, show a 
dropdown autocomplete list of saved customers.

Each dropdown item shows:
[Avatar initials circle] Customer Name
                         Shop Name | Phone | GSTIN (if GST customer)

Sample 7 customers pre-loaded (show in dropdown):
1. Rajan Kumar | Rajan Fruit Mart | +91 98421 34567 | GSTIN: 33AABCR1234A1Z5
   Address: 42, Anna Nagar, Chennai – 600040
2. Priya Dharshini | Sri Lakshmi Stores | +91 94433 21890 | GSTIN: 33AADCP9876B2Z1
   Address: 15, T Nagar, Chennai – 600017
3. Karthik M | Karthik Wholesale | +91 87654 32109 | GSTIN: 33AACKM5432C3Z8
   Address: 8, Koyambedu Market, Chennai – 600092
4. Senthil Pandi | Senthil Fresh | +91 99887 76543 | GSTIN: 33AACSP2345D4Z2
   Address: 3, Tambaram, Chennai – 600045
5. Meena V | Meena Super Market | +91 93345 67890 | No GSTIN (retail)
   Address: 27, Velachery, Chennai – 600042
6. Divya R | Divya Organic | +91 88123 45678 | GSTIN: 33AACDR6789E5Z9
   Address: 11, Adyar, Chennai – 600020
7. Arjun T | Arjun Traders | +91 77654 32198 | GSTIN: 33AACAT4321F6Z3
   Address: 56, Perambur, Chennai – 600011

When admin clicks a customer from dropdown:
ALL fields fill automatically:
- Customer Name: pre-filled
- Phone: pre-filled  
- GSTIN field: pre-filled (if exists, auto-switches to GST mode)
- Shop address auto-saved for records
- Bill mode auto-switches to WHOLESALE if GSTIN exists, stays RETAIL if no GSTIN

Show "Frequent Customer" green star badge next to names with 5+ past orders.
Rajan Kumar, Karthik M, and Senthil Pandi get this star badge.

After auto-fill, show past order summary strip below customer fields:
"Last order: 3 days ago | Total spent this month: Rs.12,400 | 
Outstanding: Rs.0 | Orders this year: 28" 

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
UPGRADE 4 — BILLING: PRINT BILL AS TEXT FILE
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
When [Print Bill] button is clicked, show a modal dialog:

Modal title: "Download Bill"
Modal body shows a preview of the bill in plain text format
inside a gray monospace box:

================================================
         SFBSOS FRUIT SHOP
         42, Main Street, Kavaraipettai
         Phone: +91 98421 00000
         GSTIN: 33AABCS1234A1Z5
================================================
INVOICE #SFBSOS-2024-0187
Date: 21 Mar 2025    Time: 10:45 AM
------------------------------------------------
Bill To:
  Rajan Kumar | Rajan Fruit Mart
  +91 98421 34567
  GSTIN: 33AABCR1234A1Z5
  42, Anna Nagar, Chennai – 600040
------------------------------------------------
ITEM            QTY    RATE    AMOUNT
Apple           2 BOX  Rs.480  Rs.960
Mango           5 KG   Rs.120  Rs.600
Banana          3 BUNC Rs.60   Rs.180
Orange          1 BOX  Rs.720  Rs.720
------------------------------------------------
Subtotal:               Rs.2,460
CGST (2.5%):            Rs.61.50
SGST (2.5%):            Rs.61.50
Discount:               Rs.0
------------------------------------------------
GRAND TOTAL:            Rs.2,583
Payment Mode: UPI
------------------------------------------------
Thank you for your business!
Visit us again at SFBSOS Fruit Shop
================================================

Below preview: two buttons side by side:
[Download as .txt] green filled button
[Close] outlined button

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
UPGRADE 5 — SETTINGS SCREEN (full rebuild)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Settings screen uses LEFT SIDEBAR + RIGHT CONTENT layout.
Left sidebar width 220px with category list.
Active category has green left border highlight.

Categories and their content:

─────────────────────────────────────────────
CATEGORY 1: SHOP PROFILE
─────────────────────────────────────────────
Section header: "Shop Profile" with [Save Changes] button top right.

Form fields in two-column grid:
Col 1:
- Shop Name: [Jagan Fruit Mart          ]
- Owner Name: [J. Jagan Babu            ]
- Email: [jagan@fruitmart.com           ]
- Phone: [+91 98421 00000               ]

Col 2:
- Shop Address (textarea, 3 rows):
  [42, Main Street, Kavaraipettai       ]
- City: [Chennai] | Pincode: [601206   ]
- State: [Tamil Nadu ▼]

Full width below:
- Shop Logo: dashed upload box "Click to upload logo" with image icon
- Business Type: [Retail ○] [Wholesale ○] [Both ●]
- Opening hours: [08:00 AM ▼] to [09:00 PM ▼]
- Holiday: [Sunday ▼]

[Save Changes] green button full width at bottom.

─────────────────────────────────────────────
CATEGORY 2: GST CONFIGURATION
─────────────────────────────────────────────
Section header: "GST Configuration"

Fields:
- GSTIN Number: [33AABCS1234A1Z5        ]
- Legal Business Name: [Jagan Fruit Mart ]
- Registration Type: [Regular ▼]
- State: [Tamil Nadu ▼] | State Code: [33]

Toggle switches:
[●] Enable GST billing on wholesale orders
[○] Show GST breakdown on retail bills
[●] Auto-detect intra/inter-state from GSTIN
[○] Include GST in printed price tags

GST Rate table (editable):
Headers: Fruit Category | HSN Code | GST Rate | Action
Fresh Fruits       | 0804 | 0%  | [Edit]
Processed/Dried    | 2008 | 12% | [Edit]
Fruit Juices       | 2009 | 12% | [Edit]
Coconut            | 0801 | 0%  | [Edit]

[+ Add Category] outlined button below table.

GSTR Filing section:
"Last GSTR-1 filed: February 2025"
[Download GSTR-1 Report] green button
[Download GSTR-3B Summary] outlined button

─────────────────────────────────────────────
CATEGORY 3: USER ACCOUNTS
─────────────────────────────────────────────
Section header: "User Accounts" with [+ Add User] button top right.

Current users table:
Headers: Name | Role | Email | Phone | Last Login | Status | Actions

Row 1: J. Jagan Babu | Owner | jagan@... | +91 984.. | Today 09:15 | [Active] | [Edit]
Row 2: Thamaraiselvan | Manager | thamarai@... | +91 944.. | Yesterday | [Active] | [Edit] [Remove]
Row 3: Pranav Vikraman | Cashier | pranav@... | +91 876.. | 2 days ago | [Active] | [Edit] [Remove]
Row 4: Vishal SA | Cashier | vishal@... | +91 775.. | 3 days ago | [Active] | [Edit] [Remove]

Role permissions info cards (3 cards in a row below table):
Card 1 — Owner: Full access to all modules including settings and reports
Card 2 — Manager: Access to billing, stock, analytics. No settings.
Card 3 — Cashier: Billing only. No analytics, no settings.

[+ Add New User] modal (show as overlay):
Name input | Email input | Role dropdown [Owner/Manager/Cashier] | 
Phone input | [Send Invite] button
"An invitation email will be sent to the new user"

─────────────────────────────────────────────
CATEGORY 4: NOTIFICATIONS
─────────────────────────────────────────────
Section header: "Notification Settings"
Subtitle: "Control what alerts you receive and how"

Notification channels (toggle row):
[●] Browser Notifications   [●] SMS Alerts   [○] WhatsApp   [○] Email

Notification triggers table:
Each row: trigger name | description | Browser | SMS | toggle per channel

Stock Expiry Alert | When fruit batch exceeds 65% shelf life | [●] | [●]
Critical Expiry | When batch exceeds 85% shelf life | [●] | [●]
Low Stock Warning | When stock falls below reorder level | [●] | [○]
New Order Received | When customer places online order | [●] | [●]
Payment Received | When customer payment recorded | [○] | [○]
GST Report Ready | Monthly GST report generated | [●] | [○]
Daily Summary | End of day sales summary | [●] | [●]
Weekly Forecast | Monday morning procurement recommendations | [●] | [○]

Alert timing section:
"Quiet hours — no alerts between:"
From: [10:00 PM ▼] To: [07:00 AM ▼]
[●] Override quiet hours for CRITICAL expiry alerts

Phone number for SMS: [+91 98421 00000]
[Send Test SMS] outlined button

─────────────────────────────────────────────
CATEGORY 5: BACKUP AND EXPORT
─────────────────────────────────────────────
Section header: "Backup & Export"

Auto Backup section (card):
[●] Enable automatic daily backup
Backup time: [02:00 AM ▼]
Backup destination: [Google Drive ▼]
Last backup: "Today at 02:00 AM — Success" with green checkmark
Storage used: Progress bar 2.3 GB of 15 GB used
[Backup Now] green button | [View Backup History] outlined button

Manual Export section (card):
Title: "Export Your Data"
Four export option cards in 2x2 grid:
Card 1: Bills & Invoices | All bills with GST breakdown | [Excel] [PDF]
Card 2: Stock & Inventory | All batches, purchases, wastage | [Excel] [CSV]
Card 3: Customer Records | All customer details and history | [Excel] [CSV]
Card 4: Analytics Report | P&L, forecasts, period summaries | [Excel] [PDF]

Date range filter above grid:
From: [date picker] To: [date picker] [Apply Range]

─────────────────────────────────────────────
CATEGORY 6: LANGUAGE
─────────────────────────────────────────────
Section header: "Language & Regional Settings"
Subtitle: "Changing language updates all labels, menus, bills, and reports"

Language selection — show as large card grid (2 columns, 4 rows):

Each language card has:
- Language name in THAT language (large, 18px bold)
- Language name in English below (12px gray)
- Country flag emoji (24px)
- If selected: green border + green checkmark badge top right
- If not selected: gray border

8 language cards:

Card 1: ENGLISH (Default) 🇮🇳 — [ACTIVE green badge]
Card 2: தமிழ் 🇮🇳
        Tamil
Card 3: हिंदी 🇮🇳
        Hindi
Card 4: मराठी 🇮🇳
        Marathi
Card 5: മലയാളം 🇮🇳
        Malayalam
Card 6: ภาษาไทย 🇹🇭
        Thai
Card 7: नेपाली 🇳🇵
        Nepali
Card 8: [+ Add Language] dashed outlined card
        "Request a new language"

When a language card is clicked:
- Card gets green border and checkmark
- Toast notification appears top right: 
  "Language changed to Tamil. Page will reload."
- After 2 seconds show the same Settings page but all 
  category labels changed to Tamil:
  "கடை விவரங்கள்" (Shop Profile)
  "GST அமைப்பு" (GST Configuration)
  "பயனர் கணக்குகள்" (User Accounts)
  "அறிவிப்புகள்" (Notifications)
  "காப்புப்பிரதி" (Backup & Export)
  "மொழி" (Language)
  
  And the top sidebar nav also changes:
  "வருகை பணம்" (Billing)
  "பங்கு உள்ளீடு" (Stock Intake)
  "டாஷ்போர்டு" (Dashboard)
  "பகுப்பாய்வு" (Analytics)
  "எச்சரிக்கைகள்" (Alerts)
  "ஆர்டர்கள்" (Orders)
  "வாடிக்கையாளர்" (Customers)
  "அமைப்புகள்" (Settings)

Show the Tamil language state as a second frame to demonstrate 
the language switch working.

Date format preference:
[DD/MM/YYYY ●] [MM/DD/YYYY ○] [YYYY-MM-DD ○]

Currency symbol: [Rs. ●] [₹ ○]
Number format: [1,00,000 ●] (Indian) [100,000 ○] (International)

[Save Regional Settings] green button

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
OVERALL PROTOTYPE FLOW (connect all screens)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Connect screens with click interactions:

Admin flow:
Admin Login page → [Login] → Admin Billing Screen (default)
Admin Billing Screen → type customer name → autocomplete dropdown appears
Admin Billing Screen → [Print Bill] → Download Bill modal
Admin sidebar → [Orders] → Orders Management screen
Admin sidebar → [Analytics] → Analytics screen → [Daily] tab → 
  7-day grouped bar chart + daily table
Admin sidebar → [Settings] → Settings screen → 
  [Shop Profile / GST / Users / Notifications / Backup / Language]
Top bar bell icon → Notification dropdown panel
Top bar globe icon → Language dropdown (same 7 languages as settings)
Top bar avatar → Profile dropdown

Customer flow:
Customer Website (public) → [Login] → Customer Login page → 
  → Customer My Orders page
Customer Website → [Add to Cart] fruits → [View Cart] → 
  Order Checkout page → [Place Order] → Order confirmation → 
  My Orders page showing new order as [PENDING]

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
MOBILE RESPONSIVE RULES (apply to all screens)
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
At 768px and below:
- Admin sidebar collapses to bottom tab bar with icons only
- Two-column layouts stack to single column
- Tables become scrollable horizontally
- Billing screen panels stack vertically (cart on top, summary below)
- Customer catalog goes to 2 columns then 1 column on phone
- All modals take full screen on mobile
- Font sizes reduce by 2px across all elements