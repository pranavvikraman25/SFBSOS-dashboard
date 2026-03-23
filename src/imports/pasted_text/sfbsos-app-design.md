Design a complete professional web application called "SFBSOS — Smart Fruit Business" for Indian fruit shop owners (retail + wholesale). Use a dark sidebar navigation with a clean white main content area. Primary color: #16A34A (green). Font: Inter. Border radius: 12px cards. No gradients.

━━━━━━━━━━━━━━━━━━━━━━━━
LAYOUT — ALL SCREENS
━━━━━━━━━━━━━━━━━━━━━━━━
Left sidebar (220px, dark #111827 bg):
- Top: Shop logo + "SFBSOS" name + shop name below in muted text
- Nav items with icons: [🧾 Billing (default, highlighted), 📦 Stock Intake, 📊 Dashboard, 📈 Analytics, ⚠️ Alerts, 👥 Customers, ⚙️ Settings]
- Bottom: User avatar circle + "Owner" label + logout icon
- Active item: green left border + green text + subtle green bg highlight

Top bar (all screens): Breadcrumb left | Search bar center | Date/time right | Notification bell with red badge

━━━━━━━━━━━━━━━━━━━━━━━━
SCREEN 1 — BILLING (Default / Home screen)
━━━━━━━━━━━━━━━━━━━━━━━━
This is what the owner sees when they open the app. Split layout:

LEFT PANEL (55% width) — "New Bill":
- Bill number (auto: #B-2024-0187) + Date + Time — top right of panel
- Toggle switch at top: [RETAIL BILL] ←→ [WHOLESALE / GST BILL] — when Wholesale is ON, a field appears: "Customer GSTIN" (text input)
- Customer section: Name (text input) + Phone (optional) — collapsible row
- Fruit search bar (large, prominent): type fruit name or scan barcode icon on right
- Cart table below search:
  Columns: Fruit | Unit type pill (BOX/KG/PC) | Qty | Rate (INR) | Amount | ✕ remove
  Show 4 example rows: Apple (2 BOX × ₹480 = ₹960), Mango (5 KG × ₹120 = ₹600), Banana (3 BUNCH × ₹60 = ₹180), Orange (1 BOX × ₹720 = ₹720)
- Subtotal section at bottom of cart:
  Subtotal: ₹2,460
  [If Wholesale ON]: CGST 2.5%: ₹61.50 | SGST 2.5%: ₹61.50 (green rows)
  [If Wholesale ON]: GST Total: ₹123
  Discount: -₹0 (editable field)
  ━━━━━━━━━━━━━━━
  GRAND TOTAL: ₹2,583 (large, bold, green)

- Payment method row: [💵 Cash] [📱 UPI] [📋 Credit] — pill toggle buttons
- Two action buttons: [🖨️ Print Bill] (outlined) and [✅ Save & New] (filled green, large)

RIGHT PANEL (45% width) — "Today's Summary":
- 4 mini stat cards in 2×2 grid:
  Bills Today: 24 | Today's Revenue: ₹18,420 | GST Collected: ₹890 | Pending Credit: ₹3,200
- Section: "Quick Stock Check" — small table: Fruit | In Stock | Unit | Status badge (green OK / yellow low / red critical)
  Show 6 fruits. Mango row has red "Critical" badge. Grapes has yellow "Low" badge.
- Section: "Recent Bills" — 5 rows: Bill# | Customer | Amount | Type badge (RETAIL green / GST amber) | Time
- Small "View All Bills" link at bottom

━━━━━━━━━━━━━━━━━━━━━━━━
SCREEN 2 — STOCK INTAKE
━━━━━━━━━━━━━━━━━━━━━━━━
Two-column layout:

LEFT: "Record New Stock Arrival" card:
- Fruit selector: large dropdown with fruit icons + name + current stock shown below each option
- Unit type: 3 pill buttons side by side: [KG] [BOX] [PIECE] — selected one turns green
- If BOX selected: show "Pieces per box" field below (pre-filled from catalogue, editable)
- Live preview line: "16 boxes × 45 pieces = 720 pieces total" (green italic text, updates as you type)
- Quantity entered: large number input
- Purchase price per unit: INR input
- Supplier name: text input (optional, autocomplete from history)
- Entry date: date picker (defaults today)
- Total cost preview: "₹7,680 total purchase cost" (auto-computed)
- [Save Stock] green button

RIGHT: Two cards stacked:
Card 1 "Current Stock on Hand":
Table: Fruit | In Stock | Unit | Batch Date | Days Old | Status
Show 8 rows. Color-code Days Old: green <3, amber 3-5, red >5
Card 2 "Recent Arrivals (Last 7 Days)":
Simple list: date + fruit + qty + cost

━━━━━━━━━━━━━━━━━━━━━━━━
SCREEN 3 — DASHBOARD
━━━━━━━━━━━━━━━━━━━━━━━━
Full-width content area:

Row 1 — 5 stat cards:
Today's Revenue (₹18,420, +12% vs yesterday), Bills Today (24), Net Profit Today (₹4,820), Stock Value on Hand (₹42,300), Active Alerts (3, red badge)

Row 2 — Two charts side by side:
Left: Line chart "Revenue vs Cost vs Profit — Last 8 Weeks" — 3 lines (blue revenue, red cost, green profit), x-axis = week labels
Right: Horizontal bar chart "Top 5 Fruits by Revenue This Week" — Mango leads, each bar has fruit name left + INR value right

Row 3 — Three panels:
Left: "Payment Mode Breakdown" — donut chart: Cash 62%, UPI 28%, Credit 10%
Center: "Stock Health Overview" — 8 fruit rows each with a small progress bar showing % of shelf life consumed. Color: green <60%, amber 60-85%, red >85%
Right: "Demand Forecast — Next Week" — table: Fruit | Last Week Sold | Forecast | Recommended Buy | Unit

━━━━━━━━━━━━━━━━━━━━━━━━
SCREEN 4 — ANALYTICS
━━━━━━━━━━━━━━━━━━━━━━━━
Top bar: Period toggle [Daily] [Weekly] [Monthly] [Yearly] | Date range picker | [⬇ Export PDF] [⬇ Export Excel] buttons

Section 1: Large area chart "Revenue / Cost / Profit Trend" — full width, shows selected period, tooltip on hover

Section 2: Two-column grid
Left: "Per Fruit Performance Table"
  Columns: Fruit | Units Sold | Revenue | Purchase Cost | Gross Profit | Margin % | Waste Cost
  Last row: bold Total row. Sort arrows on headers.
Right: "GST Summary" (when wholesale bills exist)
  CGST collected: ₹3,420 | SGST: ₹3,420 | IGST: ₹0 | Total GST: ₹6,840
  "This data is ready for GSTR-1 filing" info banner (blue)
  [Download GST Report] button

Section 3: "Purchase vs Wastage Analysis" — grouped bar chart per fruit, two bars per fruit (purchased qty vs wasted qty)

━━━━━━━━━━━━━━━━━━━━━━━━
SCREEN 5 — ALERT CENTRE
━━━━━━━━━━━━━━━━━━━━━━━━
Filter tabs at top: [All] [Expiry] [Low Stock] [Payment Overdue]

Alert list — each alert is a card row:
- Left colored border: red = expires <12h, amber = expires <24h, green = stock low, blue = payment overdue
- Alert icon (large, matches color)
- Alert title (bold): e.g. "Mango — Batch #12 expiring in 6 hours"
- Subtitle: "42 kg remaining — consider price reduction to clear stock"
- Right side: timestamp + two buttons [Acknowledge] [Snooze 2h]
- For low stock: [Order Now] button instead

Show 7 example alerts across all 4 types

━━━━━━━━━━━━━━━━━━━━━━━━
SCREEN 6 — CUSTOMERS
━━━━━━━━━━━━━━━━━━━━━━━━
Two panels:
Left: Customer list with search. Each row: avatar circle with initials + name + phone + total outstanding (red if >0) + last purchase date
Right (when customer selected): Full customer card:
  - Name, phone, GSTIN (wholesale), credit limit
  - Outstanding balance (large red number if pending)
  - [Record Payment] green button + [Send Statement WhatsApp] button
  - Bill history table: Bill# | Date | Amount | GST | Status badge (Paid green / Partial amber / Pending red)

━━━━━━━━━━━━━━━━━━━━━━━━
SCREEN 7 — SETTINGS
━━━━━━━━━━━━━━━━━━━━━━━━
Left: settings category list (like iOS settings sidebar):
Shop Profile | Fruit Catalogue | GST Configuration | Bill Format | User Accounts | Notifications | Backup & Export | Language

Main area (right) shows selected category content:

Show "Fruit Catalogue" as active:
Table: Fruit name | Base unit | Conv factor | Shelf life (days) | Waste cost % | GST rate | Actions (edit/delete)
[+ Add New Fruit] button at top right of table

Show "Bill Format" panel below:
Radio options: Thermal 58mm / Thermal 80mm / A4 full page
Preview thumbnail of selected format
Toggle: Show GST breakdown on retail bills (off by default)
Toggle: Show shop logo on bill

━━━━━━━━━━━━━━━━━━━━━━━━
STYLE GUIDELINES
━━━━━━━━━━━━━━━━━━━━━━━━
- All cards: white bg, 0.5px border #E5E7EB, 12px radius, padding 16px-20px
- Table rows: alternate #F9FAFB
- Status badges: small pill, colored bg + matching dark text
- Input fields: 40px height, 8px radius, #F9FAFB bg, 1px border
- Primary button: #16A34A bg, white text, 10px radius
- Secondary button: white bg, green border, green text
- Font sizes: 24px headings, 16px body, 13px labels, 11px metadata
- Spacing system: 8px base unit
- Sidebar: #111827 dark, active item #16A34A left border + #14532D bg tint
- Make it responsive: sidebar collapses to icons-only at tablet width