# COMPLETE REQUIREMENTS — POS + HRMS + ERP + FINTECH SYSTEM
# Indus Nexus: Full Product Requirements, Integration Plan & Legal Framework
# Date: May 2026

---

## SECTION 1: CURRENT SYSTEM STATUS

### What Is Built (Frontend Only — Static Demo)
| Module | Screen | Status |
|--------|--------|--------|
| POS | Dashboard, Terminal, Inventory, Sales, Reports, Users, Settings | DONE (Static) |
| HRMS | Overview, Employees, Attendance, Payroll, Departments, Locations, Roles | DONE (Static) |
| ERP | Overview, Revenue, Expenses, FBR/Taxpayers, POSPay, Cards, Cash Ledger, Banks | DONE (Static) |

### Current Tech Stack
```
Frontend:    React 19 + TypeScript 6
UI:          Ant Design 6.4.2
Charts:      Recharts 3.8
Router:      React Router DOM 7
State:       React Context API
Bundler:     Vite 8
Data:        100% Static JSON (fake data)
Backend:     NONE
Database:    NONE
Auth:        NONE (demo role switcher only)
```

### What Resets on Refresh (Everything)
- All products added
- All sales created
- All employees added
- All payroll runs
- All FBR filings

---

## SECTION 2: PHASE 1 — MAKE DEMO PRODUCTION-READY (Month 1-2)

### 2A. Install These Packages Now
```bash
# Data export (fix broken export buttons)
npm install xlsx jspdf jspdf-autotable

# State persistence (fix data loss on refresh)
npm install zustand

# Date handling
npm install dayjs

# Print receipts
npm install react-to-print

# Form validation
npm install zod react-hook-form @hookform/resolvers

# Notifications
npm install react-hot-toast
```

### 2B. Fix These 5 Things Before Demo

#### Fix 1: Export Reports (currently broken buttons)
- Install `xlsx` library
- Wire "Export Excel" button in Reports.tsx to download real Excel file
- Wire "Export PDF" button to download real PDF via jsPDF

#### Fix 2: Print Receipt (currently broken)
- Install `react-to-print`
- Create `ReceiptTemplate.tsx` component
- Wire print button in POSTerminal.tsx

#### Fix 3: State Persistence (data resets on refresh)
- Replace React Context with Zustand + localStorage middleware
- Products, employees, sales orders, payroll will survive refresh

#### Fix 4: Real Form Validation
- Add Zod schemas to all forms (Add Product, Add Employee, Payroll)
- Show proper error messages instead of silent failures

#### Fix 5: Demo Reset Button
- Add "Reset Demo Data" button in Settings
- Cleanly restores all static seed data for demo presentations

---

## SECTION 3: PHASE 2 — BACKEND & DATABASE (Month 2-4)

### 3A. Backend Technology Stack
```
Runtime:         Node.js 20 LTS
Framework:       Express.js OR Fastify
Language:        TypeScript (matching frontend)
ORM:             Prisma
Database:        PostgreSQL 16
Cache:           Redis 7
Auth:            JWT (access token 15min) + Refresh token (7 days)
Password:        bcrypt (salt rounds: 12)
Validation:      Zod
API Style:       REST with OpenAPI/Swagger docs
File Storage:    Cloudflare R2 (S3-compatible, cheaper than AWS)
Email:           Resend.com API
SMS:             Twilio or Jazz SMS API (Pakistan)
```

### 3B. Database Schema (PostgreSQL Tables)

#### Core Tables
```sql
-- Users & Auth
users (id, name, email, password_hash, role, store_id, status, created_at)
sessions (id, user_id, refresh_token, expires_at, ip, user_agent)
audit_logs (id, user_id, action, table_name, record_id, old_val, new_val, ip, created_at)

-- Store & Locations
stores (id, name, address, phone, ntn, currency, tax_rate)
locations (id, store_id, code, name, city, manager_id, status)

-- Products & Inventory
products (id, store_id, sku, name, category, price, cost, unit, image_url, status)
inventory (id, product_id, location_id, stock, min_stock, updated_at)
inventory_movements (id, product_id, location_id, type, quantity, reason, by_user_id, created_at)

-- POS & Sales
sale_orders (id, location_id, cashier_id, total, tax, discount, payment_method, status, created_at)
sale_items (id, order_id, product_id, qty, unit_price, total)
payment_transactions (id, order_id, method, amount, reference, gateway_ref, status, created_at)

-- HRMS
employees (id, store_id, location_id, emp_code, name, email, phone, cnic, role, dept_id, basic_salary, allowances, deductions, join_date, status)
departments (id, store_id, name, head_id, location_id)
attendance (id, employee_id, date, check_in, check_out, hours, status)
payroll_runs (id, store_id, location_id, month, status, run_by, run_date, total_gross, total_net)
payroll_lines (id, run_id, employee_id, basic, allowances, deductions, tax, net)

-- ERP Finance
revenue_entries (id, store_id, location_id, date, source, amount, tax, net, reference)
expense_entries (id, store_id, location_id, date, category, vendor, amount, status, paid_at)
bank_accounts (id, store_id, bank_name, account_no, branch, balance, currency, updated_at)
cash_ledger (id, location_id, date, type, description, amount, balance, by_user_id)

-- FBR Tax
taxpayers (id, store_id, ntn, name, type, period, taxable, tax_due, paid, status, fbr_ref, filed_at)

-- Fintech (Phase 3+)
wallets (id, user_id, currency, balance, type, status)
stablecoin_txns (id, wallet_id, txn_hash, network, from_address, to_address, amount, usd_value, status, created_at)
remittances (id, sender_id, receiver_id, amount_usd, amount_pkr, fee, exchange_rate, status, created_at)
```

### 3C. API Endpoints Required
```
POST   /api/auth/login
POST   /api/auth/logout
POST   /api/auth/refresh
POST   /api/auth/signup

GET    /api/products
POST   /api/products
PUT    /api/products/:id
DELETE /api/products/:id

GET    /api/inventory/:locationCode
POST   /api/inventory/adjust

POST   /api/orders
GET    /api/orders
GET    /api/orders/:id
POST   /api/orders/:id/refund

GET    /api/employees
POST   /api/employees
PUT    /api/employees/:id
DELETE /api/employees/:id

GET    /api/attendance
POST   /api/attendance/checkin
POST   /api/attendance/checkout

POST   /api/payroll/run
GET    /api/payroll/runs
POST   /api/payroll/runs/:id/mark-paid

GET    /api/reports/sales
GET    /api/reports/revenue
GET    /api/reports/expenses

POST   /api/fbr/file
GET    /api/fbr/taxpayers

GET    /api/wallets/balance
POST   /api/wallets/deposit
POST   /api/wallets/withdraw
POST   /api/remittance/send
GET    /api/remittance/history
```

### 3D. Hosting & DevOps
```
Frontend:        Vercel (free tier to start)
Backend:         Railway.app OR Render.com (free tier)
Database:        Supabase (PostgreSQL, free 500MB)
Cache:           Upstash Redis (free 10k requests/day)
Files:           Cloudflare R2 (free 10GB/month)
Domain:          Namecheap or Cloudflare ($10-15/year)
SSL:             Cloudflare (free)
CI/CD:           GitHub Actions (free)
Monitoring:      Better Stack (free tier)

Estimated Monthly Cost (MVP): $0-20/month
Estimated Monthly Cost (Scale): $50-200/month
```

---

## SECTION 4: PHASE 3 — PAKISTAN PAYMENT INTEGRATIONS

### 4A. JazzCash Integration
```
Provider:     Jazz/Warid (Mobilink)
API Type:     REST
Auth:         Merchant ID + Password + Integrity Salt (HMAC-SHA256)
Sandbox URL:  sandbox.jazzcash.com.pk
Live URL:     payments.jazzcash.com.pk

How It Works:
1. User selects JazzCash at checkout
2. Your backend sends payment request to JazzCash API
3. User gets OTP on their JazzCash mobile number
4. User enters OTP in your app
5. JazzCash confirms payment, sends webhook to your backend
6. Your backend marks order as Paid

Requirements to Get API:
- Business registration (SECP)
- NTN number (FBR)
- Bank account (HBL/UBL/Meezan)
- JazzCash merchant portal signup: merchants.jazzcash.com.pk
- 3-7 business days approval

Test Credentials (Sandbox):
- Merchant ID: (provided after registration)
- Mobile: 03001234567
- OTP: 123456 (sandbox)

Code Integration:
npm install axios crypto (already available in Node.js)

Webhook:
POST /api/webhooks/jazzcash
Verifies HMAC signature, updates payment status
```

### 4B. EasyPaisa Integration
```
Provider:     Telenor Pakistan
API Type:     REST
Auth:         Store ID + Account Number + Hash (MD5)
Sandbox:      easypay-sandbox.easypaisa.com.pk
Live:         easypay.easypaisa.com.pk

How It Works:
1. User enters EasyPaisa mobile number
2. Your backend initiates transaction
3. User gets push notification on EasyPaisa app
4. User confirms payment in app
5. EasyPaisa sends webhook confirmation
6. Order marked as Paid

Requirements:
- EasyPaisa Business Account
- CNIC + NTN verification
- Signup: easypaisa.com.pk/business
- 3-5 business days approval

Code Integration:
const hash = md5(storeId + accountNum + amount + orderRef + password)
```

### 4C. Raast P2M Integration (SBP — Real-time QR Payments)
```
Provider:     State Bank of Pakistan via 1Link
API Standard: ISO 20022
API Provider: 1Link 1GO API
             OR any SBP-approved bank's API
             (HBL, MCB, Meezan all provide Raast APIs)

How It Works:
1. Merchant app generates Dynamic QR code per transaction
2. Customer scans QR with any banking app (HBL, JazzCash, etc.)
3. Customer confirms payment
4. Raast settles in real-time (< 10 seconds)
5. Merchant gets webhook confirmation

QR Code Format:
- EMVCo standard QR
- Contains: Merchant ID, Amount, Reference
- Generated server-side, displayed as image

Requirements:
- SBP-approved payment service provider OR
- Bank partnership (HBL/MCB/Meezan have Raast P2M merchant APIs)
- Merchant bank account
- Business registration

MDR (Merchant Discount Rate):
- Currently subsidized: PKR 3.5 billion government fund
- Rate: 0.0% to 0.25% depending on volume
- Subsidy valid until December 2026
```

### 4D. HBL PayConnect (Cards — Visa/Mastercard)
```
Provider:     HBL (Habib Bank Limited)
Supports:     Visa, Mastercard, UnionPay, American Express
API Type:     REST + Redirect (3DS)
PCI DSS:      Required (Level 4 for <20k txns/year, Level 1 for large)

How It Works:
1. User selects Card payment
2. Your frontend loads HBL payment iframe (never handle card data directly)
3. HBL handles 3DS verification with the user's bank
4. HBL returns success/fail to your webhook
5. Order marked as Paid

Requirements:
- HBL Corporate Account
- HBL PayConnect merchant registration
- PCI DSS compliance (minimum SAQ-A for redirect flow)
- Business registration + NTN

Monthly Fee:  PKR 2,500-5,000
Per Txn Fee:  1.5%-3.0% + PKR 5-10 fixed

Alternative Providers:
- Safepay (safepay.pk) — startup friendly, quick onboarding
- Stripe (Pakistan not officially supported, workaround via LLC)
- Nift (nift.com.pk) — HBL backed
```

### 4E. Pakistan Mobile Wallets Summary
```
| Provider  | Market Share | API Available | Approval Time | MDR    |
|-----------|-------------|---------------|---------------|--------|
| JazzCash  | 45%         | YES           | 3-7 days      | 1.5%   |
| EasyPaisa | 35%         | YES           | 3-5 days      | 1.5%   |
| NayaPay   | 8%          | YES (EMI)     | 7-14 days     | 1.0%   |
| SadaPay   | 5%          | YES (EMI)     | 7-14 days     | 1.0%   |
| Raast     | Growing     | Via Banks     | 14-30 days    | 0-0.25%|
```

---

## SECTION 5: PHASE 4 — STABLECOIN & CROSS-BORDER SYSTEM

### 5A. What Is a Stablecoin (Technical Explanation)

```
A stablecoin = Cryptocurrency + Fixed Value

How USD1 / USDC works:
1. You deposit $100 real USD to the issuer's bank
2. Smart contract on blockchain MINTS 100 USDC tokens to your wallet
3. These 100 tokens always equal $100 (1:1 peg)
4. You can send those tokens globally in seconds at near-zero cost
5. Recipient BURNS tokens to get real USD back from issuer's bank

Why it's better than SWIFT wire transfer:
- SWIFT: 2-5 days, $25-45 fee, closes weekends
- USDC on Solana: 400ms, $0.001 fee, 24/7/365

Types of Stablecoins:
- USDC (Circle): Most regulated, US-based, audit reports monthly
- USDT (Tether): Largest volume, offshore reserves
- USD1 (World Liberty): Pakistan MoU signed Jan 2026, Trump-linked
- PYUSD (PayPal): Growing, PayPal-backed
```

### 5B. Blockchain Networks Comparison
```
| Network   | Speed       | Fee per Txn | Best For           | Status   |
|-----------|------------|-------------|-------------------|---------|
| Solana    | 400ms      | $0.0001     | Payments, Speed   | PRIMARY  |
| Ethereum  | 12 seconds | $0.50-$5    | Trust, DeFi       | BACKUP   |
| BNB Chain | 3 seconds  | $0.01       | Low cost alt      | OPTIONAL |
| Polygon   | 2 seconds  | $0.001      | Eth compatibility | OPTIONAL |
| Tron      | 3 seconds  | ~$0          | USDT dominance    | OPTIONAL |

Recommended: Solana (primary) + Ethereum (for large institutional flows)
```

### 5C. Complete Cross-Border Transaction Flow

#### UAE (Dubai) → Pakistan (Karachi) — Full Technical Flow

```
SENDER SIDE (UAE):
├── Step 1: User opens Nexus app in Dubai
├── Step 2: Enters recipient (phone or CNIC) + PKR amount
├── Step 3: App calculates: PKR 50,000 = ~$179 USD + $1 flat fee = $180
├── Step 4: User pays $180 AED equivalent via:
│           - UAE bank debit card (Visa/MC)
│           - Local UAE wallet (Apple Pay, Careem Pay)
│           - Cash at partner exchange (Al Ansari, Al Rostamani)
│
CONVERSION (VASP Ramp):
├── Step 5: Licensed UAE VASP (DIFC-registered) receives $180
├── Step 6: VASP mints 179 USDC/USD1 tokens on Solana blockchain
├── Step 7: Transaction recorded on-chain (public, auditable)
│           Confirmation: 400 milliseconds
│
BLOCKCHAIN TRANSIT:
├── Step 8: 179 USDC moves from UAE VASP wallet to Pakistan VASP wallet
│           - No banks involved
│           - No SWIFT network
│           - No cut-off times
│           - Cost: $0.0001
│
PAKISTAN SIDE SETTLEMENT:
├── Step 9: Pakistan VASP (Nexus) receives 179 USDC
├── Step 10: USDC burns → PKR credited to Client Money Account (CMA)
│            CMA at: DIB Pakistan or Meezan Bank
│            Regulated by: BPRD Circular No. 10 of 2026
├── Step 11: PKR transferred via Raast P2P to recipient's bank/wallet
│            Settlement: Real-time (< 10 seconds via Raast)
│
RECIPIENT OPTIONS:
├── Option A: Instant PKR to bank account (HBL, UBL, MCB, etc.)
├── Option B: Instant PKR to JazzCash/EasyPaisa wallet
├── Option C: Hold as USDC in Nexus wallet (inflation hedge)
├── Option D: Spend with Nexus Visa debit card immediately
│
COMPLIANCE LAYER (Every Step):
├── AML Check: Real-time OFAC + UN sanctions screening
├── FATF Travel Rule: Sender + receiver identity tagged to every txn
├── SBP Reporting: All inflows reported to State Bank
├── PVARA Reporting: VASP transaction logs submitted
└── Receipt: Both sender and receiver get WhatsApp/SMS confirmation
```

### 5D. All Country Corridors — Requirements Per Region

#### GCC Countries (UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, Oman)
```
Volume:          Pakistan receives ~$18B/year from GCC
Sending Method:  Exchange houses + Mobile apps
Key Partners:    Al Ansari Exchange (UAE), STC Pay (Saudi), OmanNet
Regulations:     DIFC (Dubai) or FSRA (Abu Dhabi) VASP license required
Settlement:      USD1/USDC → Raast PKR
Fee Model:       $1 flat (vs $15-30 traditional)
Timeline to Launch: 6-9 months after PVARA license
Status:          MoU with World Liberty Financial SIGNED (Jan 2026)
```

#### United Kingdom
```
Volume:          ~$2.5B/year Pakistan remittances
Sending Method:  Wise, WorldRemit, bank transfer
Regulations:     FCA (Financial Conduct Authority) registration required
License Type:    Electronic Money Institution (EMI) or Payment Institution (PI)
Capital Req:     €350,000 minimum (EMI)
Timeline:        12-18 months (FCA is slow)
Alternative:     Partner with existing FCA-licensed firm (Wise API, Railsr)
Stablecoin:      USDC → GBP → PKR or USDC → USD → PKR
Fee Model:       £0.99 flat fee
```

#### United States
```
Volume:          ~$4B/year Pakistan remittances
Sending Method:  Remitly, Xoom (PayPal), Western Union
Regulations:     FinCEN MSB registration + State Money Transmitter Licenses
MSB License:     ~$300 registration, must file SARs and CTRs
State Licenses:  Need licenses in each state (49 states have different rules)
                 OR use a licensed middleware (Prime Trust, Stripe Treasury)
Stablecoin:      USDC (Circle is US-based, fully regulated)
Partnership:     Circle API for USDC issuance
Fee Model:       $1 flat fee
Timeline:        18-24 months (complex state-by-state)
Shortcut:        Partner with Remitly or Xoom as white-label
```

#### Europe (Germany, Italy, Spain, Netherlands)
```
Volume:          ~$1.5B/year Pakistan remittances
Regulations:     EU PSD2 + MiCA (Markets in Crypto-Assets) 2024
License:         VASP registration in any EU member state (then passporting)
Best Country:    Lithuania (fast, startup friendly) or Malta
Stablecoin:      Under MiCA: USDC approved, USDT under review
Timeline:        12-18 months
Shortcut:        Partner with licensed EU VASP (Bitpanda, Bitstamp)
```

#### Canada
```
Volume:          ~$1B/year Pakistan remittances
Regulations:     FINTRAC MSB registration ($300 fee, 3-6 months)
License:         Money Services Business (MSB)
Stablecoin:      USDC widely accepted
Timeline:        6-9 months
```

#### Australia
```
Volume:          ~$500M/year Pakistan remittances
Regulations:     AUSTRAC registration (Digital Currency Exchange license)
Fee:             AUD 5,500 application
Timeline:        6-9 months
Stablecoin:      USDC
```

#### Summary: Country Launch Priority
```
| Priority | Country | Reason | Timeline |
|----------|---------|--------|---------|
| 1 | UAE | Largest corridor, easiest regulation, MoU signed | 6 months |
| 2 | Saudi Arabia | 2nd largest, Saudi CENTRAL sandbox open | 8 months |
| 3 | UK | Large diaspora, FCA challenging but credible | 18 months |
| 4 | USA | Massive volume, complex licensing | 24 months |
| 5 | Canada | Easy FINTRAC, good diaspora | 9 months |
| 6 | Qatar/Kuwait | Small but high value senders | 10 months |
| 7 | EU | MiCA clarity helps, use Lithuania | 18 months |
| 8 | Australia | Manageable AUSTRAC process | 12 months |
```

### 5E. Tech Stack for Stablecoin Integration
```
Blockchain SDK:     @solana/web3.js (Solana)
                    ethers.js (Ethereum)
USDC SDK:           @circle-fin/circle-sdk (Circle API)
USD1 SDK:           World Liberty Financial API (coming 2026)
Wallet Custody:     Fireblocks (institutional MPC wallets)
                    OR Privy.io (simpler, good for startups)
Exchange Rate:      Chainlink Price Oracle (USDC/PKR)
                    OR OpenExchangeRates API
On/Off Ramp:        Transak (global)
                    MoonPay (global)
                    Local Koshi (Pakistan local)
Blockchain Explorer: Solscan (Solana), Etherscan (Ethereum)
Transaction Monitor: Moralis Streams (webhook on any wallet event)
AML Screening:      Chainalysis (blockchain AML) — $500/month
                    Elliptic (alternative)
Sanctions Check:    OFAC API (free, US Treasury)
                    Comply Advantage ($200/month)
```

---

## SECTION 6: PHASE 5 — KYC/AML & LEGAL INTEGRATIONS

### 6A. KYC Stack (Pakistan)
```
Provider:          NADRA (National Database Registration Authority)
Portal:            Nishaan Pakistan (nishaan.nadra.gov.pk)
API:               NADRA Biometric Verification API
What it verifies:  CNIC number + Fingerprint OR facial recognition
Cost:              PKR 15-30 per verification
Response Time:     2-3 seconds
Integration:       HTTPS REST API with SOAP wrapper
Access:            Apply via NADRA E-Services portal
Approval:          1-2 months

Steps to Access NADRA API:
1. Register entity at nadra.gov.pk/biometric-verification
2. Submit: SECP registration, NTN, authorized signatory CNIC
3. Pay setup fee: PKR 50,000
4. Sign Data Sharing Agreement
5. Receive sandbox credentials (2-4 weeks)
6. Test in sandbox → apply for production access
```

### 6B. Business KYB (Know Your Business)
```
Provider:          SECP (Securities & Exchange Commission Pakistan)
Portal:            eZfile (secp.gov.pk/ezfile)
API:               SECP Company Verification API
What it verifies:  Company registration, directors, shareholding
Cost:              Free for basic lookup
Integration:       REST API with API key
Use Case:          Verify merchants onboarding to Merchant OS
```

### 6C. AML/CFT Compliance Stack
```
Transaction Monitoring:
- Flagging rules: large cash (>PKR 2.5M), rapid small txns (structuring), unusual countries
- File: Suspicious Transaction Reports (STRs) with FIU (Financial Intelligence Unit Pakistan)
- Software: NICE Actimize (enterprise) OR FinScan (startup-friendly)

Sanctions Screening:
- UN Consolidated List
- OFAC SDN List (US)
- EU Consolidated List
- Pakistan's own ECO list (Ministry of Finance)
- Tool: Comply Advantage API ($200/month for startups)

FATF Travel Rule:
- For all crypto transfers: tag sender + receiver identity
- Use: Notabene.id OR Sygna Bridge (travel rule compliance)
- Required for: all VASP-to-VASP transfers

Customer Risk Scoring:
- Low risk: salaried employee, domestic txns < PKR 50k/month
- Medium risk: business owner, international txns
- High risk: cash-heavy, politically exposed persons (PEPs)
- Use ML model trained on transaction patterns
```

### 6D. FBR Integration (Tax Filing)
```
Portal:            Iris (iris.fbr.gov.pk)
API:               FBR REST API (available to registered integrators)
What it does:      File Sales Tax Return, Income Tax, Withholding Tax
Access:            Apply via FBR PRAL (Pakistan Revenue Automation Ltd.)
Requirements:      NTN, STRN (Sales Tax Registration Number)
Cost:              Free for filing, 0.3%-1% withholding on some txns
Integration Steps:
1. Register on Iris portal
2. Apply for API integration partner status
3. Receive API credentials from PRAL
4. Sandbox testing (30 days)
5. Go live

Auto-filing Features to Build:
- Monthly Sales Tax Return (STR) — 15th of each month
- Quarterly Advance Income Tax
- Annual Income Tax Return
- Withholding Tax (on salaries, vendor payments)
```

---

## SECTION 7: PHASE 6 — PVARA & VASP LICENSE (Virtual Assets)

### 7A. PVARA License Requirements
```
Authority:    PVARA (Pakistan Virtual Assets Regulatory Authority)
Law:          Virtual Assets Act 2026
Website:      pvara.gov.pk

License Categories You Need:
- Category 3: Custody Services (safekeeping private keys/assets)
- Category 4: Exchange Services (fiat-to-crypto ramps)
- Category 5: Lending & Borrowing (VA-collateralized loans)
- Category 8: VA Transfer (sending on behalf of customers)
- Category 9: VA Issuance (if issuing tokens later)

Documents Required:
1. Company incorporation certificate (SECP)
2. Memorandum & Articles of Association
3. Business plan (detailed, 3-year projections)
4. IT/Cybersecurity infrastructure plan
5. AML/CFT policy manual
6. MLRO (Money Laundering Reporting Officer) CV + appointment letter
7. Audited financial statements (or auditor engagement letter)
8. Proof of professional indemnity insurance
9. Fit & Proper declarations for all directors/shareholders
10. Key personnel CVs and background checks
11. Source of funds declaration for initial capital

Capital Requirements:
- Sandbox phase: PKR 10-50 million (estimated, confirm with PVARA)
- Full license: PKR 100-500 million (estimated)

Sandbox Parameters:
- Max users: 500
- Max daily transaction: $1,000 per user
- Duration: 18 months
- Must file monthly reports to PVARA

Timeline:
- NOC application: Submit → 30-60 days review
- Sandbox approval: 60-90 days
- Full license: 12-18 months after sandbox

MLRO Requirement:
- Full-time employee (cannot be director)
- Certified in AML (CAMS certification preferred)
- Responsible for filing STRs with FIU Pakistan
- Direct line to PVARA if suspicious activity found
```

### 7B. SBP Digital Bank License
```
Authority:     State Bank of Pakistan
Framework:     Digital Bank Regulatory Framework (2022, updated 2025)

Two Tiers:
- Tier 1: Digital Retail Bank (full banking license) — PKR 4B capital
- Tier 2: Digital Bank with restrictions — PKR 1.5B capital (pilot)

Requirements:
1. Minimum paid-up capital: PKR 1.5B (pilot), PKR 4B (full)
2. No physical branches required
3. Must partner with at least 1 established bank during pilot
4. SBP inspection rights
5. Cloud infrastructure must be in Pakistan data centers (data residency)
6. CISA-certified IT auditor

Sharia Compliance (CRITICAL):
- Pakistan is Islamic Republic — all financial products must be Sharia-compliant
- Interest (Riba) is prohibited — cannot offer interest-bearing accounts
- Must have Sharia Supervisory Board (minimum 3 Islamic scholars)
- Scholars must approve: wallet mechanics, lending structure, stablecoin model
- Suggested scholars: contact Institute of Islamic Banking at SBP
- All lending = profit-sharing (Musharaka) not interest

Alternative Approach (Without Full License):
- Partner with Meezan Bank or DIB Pakistan as primary bank
- They hold the license, you provide the technology layer
- Like how Pocket Money partners with DIB Pakistan
- Faster (3-6 months vs 12-18 months)
```

---

## SECTION 8: DEMO ENHANCEMENTS — SHOW HOW EVERYTHING WORKS (STATIC)

### 8A. Add These Screens to Impress Client (Static/Mock)

#### New Screen 1: Stablecoin Wallet Page
```
Path: /erp/wallet
Show:
- PKR Balance: PKR 245,890
- USDC Balance: $1,247.50
- USD1 Balance: $320.00
- Recent transactions with blockchain hash (fake but clickable)
- "Send Internationally" button
- QR code for receiving
- Exchange rate widget (PKR/USD live rate — use free API)
```

#### New Screen 2: Remittance Tracker
```
Path: /erp/remittance
Show:
- Active remittances with progress bar:
  [UAE Sender] → [Blockchain] → [Pakistan] → [Recipient Bank]
- Steps: Initiated → Blockchain Confirmed → PKR Converted → Delivered
- Timeline: "Completed in 47 seconds"
- Cost comparison: "You saved PKR 8,450 vs Western Union"
- Fake transaction hash: 5Kj7...9xPQ (linkable to Solscan)
```

#### New Screen 3: FBR Auto-Filing Status
```
Path: /erp/fbr-dashboard  (upgrade existing Taxpayers page)
Show:
- Filing calendar with upcoming deadlines
- Auto-filed returns with FBR reference numbers
- Tax liability vs payments chart
- STRN certificate display
- "Next filing due: June 15, 2026 — Sales Tax Return"
- Green checkmarks for filed returns
```

#### New Screen 4: KYC Verification Status
```
Path: /settings/kyc
Show:
- CNIC verification: NADRA Nishaan ✓ Verified
- Biometric: Fingerprint ✓ Matched  
- Business: SECP eZfile ✓ Verified
- AML: No flags ✓ Clean
- Compliance Level: Tier 2 (PKR 500k/month limit)
- Upgrade path to Tier 1 (biometric + income proof)
```

#### New Screen 5: Multi-Currency Payment Terminal
```
Path: /pos (upgrade existing)
Add payment options:
- PKR Cash
- JazzCash
- EasyPaisa  
- Raast QR (show animated QR code)
- USDC (show wallet address QR)
- USD1
Show: "Payment received in USDC, converted to PKR at rate: 278.45"
```

### 8B. Free APIs to Make Demo Feel Live
```javascript
// Exchange rates (free, no key needed)
fetch('https://open.er-api.com/v6/latest/USD')

// Crypto prices (free)
fetch('https://api.coingecko.com/api/v3/simple/price?ids=usd-coin&vs_currencies=usd,pkr')

// Fake blockchain explorer link
// https://solscan.io/tx/[fake-hash] — shows real Solana explorer
// For demo: generate a realistic-looking hash

// Pakistan prayer times (for Sharia compliance demo)
// hallmark of Islamic bank

// Gold price (for Sharia-compliant savings comparison)
fetch('https://api.metals.live/v1/spot/gold')
```

### 8C. New npm Packages for Demo Features
```bash
# QR code generation (for Raast P2M and USDC wallet)
npm install qrcode.react

# Animated number counters
npm install react-countup

# Copy to clipboard (blockchain hash copy button)
npm install react-copy-to-clipboard

# Live exchange rates
npm install axios

# Better charts (more impressive than recharts)
npm install @tremor/react

# Skeleton loaders (make static data look like it's loading from API)
npm install antd (already installed — use Skeleton component)

# Confetti on payment success
npm install canvas-confetti @types/canvas-confetti
```

---

## SECTION 9: ALL LEGAL REQUIREMENTS

### 9A. Pakistan Legal Requirements
```
1. SECP Registration
   - Private Limited Company (Pvt. Ltd.)
   - Minimum 2 directors
   - Minimum capital: PKR 100,000 (increase later for licenses)
   - Online: eservices.secp.gov.pk
   - Cost: PKR 1,500-3,500
   - Time: 3-5 working days

2. NTN Registration (FBR)
   - National Tax Number for the company
   - Online: iris.fbr.gov.pk
   - Required for: opening bank accounts, government contracts
   - Time: 1-3 days (online, instant sometimes)

3. STRN Registration (FBR)
   - Sales Tax Registration Number
   - Required when turnover exceeds PKR 10M/year
   - Online via Iris portal
   - Time: 3-7 days

4. Corporate Bank Account
   - HBL, UBL, or Meezan Bank (recommended for fintech)
   - Meezan: Sharia-compliant, best for Islamic fintech
   - Required: SECP certificate + NTN + directors' CNICs
   - Time: 1-2 weeks

5. PVARA VASP License
   - As described in Section 7A
   - Most important for stablecoin/remittance features

6. SBP EMI License (if not full digital bank)
   - Electronic Money Institution
   - Allows: digital wallets, payments, limited lending
   - Capital: PKR 200M+
   - Alternative to full digital bank license
   - Time: 6-12 months

7. PTA Registration (Pakistan Telecom Authority)
   - Required for SMS services, app-based communications
   - Online: pta.gov.pk
   - Time: 2-4 weeks

8. Data Protection
   - Personal Data Protection Act (PDPA) 2023
   - Must have: Privacy Policy, Data Processing Agreement
   - Data residency: user data must be stored in Pakistan
   - Appoint Data Protection Officer (DPO)
```

### 9B. UAE Legal Requirements (for GCC remittance launch)
```
1. DIFC (Dubai International Financial Centre)
   - Best jurisdiction for fintech startups in UAE
   - DFSA (Dubai Financial Services Authority) regulated
   - License: Money Services license
   - Capital: $500,000 minimum
   - Time: 3-6 months

2. ADGM (Abu Dhabi Global Market) — Alternative
   - FSRA regulated
   - Slightly less established than DIFC

3. Mainland UAE Option
   - UAE Central Bank CBUAE license
   - Stored Value Facility (SVF) or Payment Token Service license
   - More complex, requires UAE national partner (49% local ownership)
   - Time: 9-12 months

4. Partnership Approach (Fastest)
   - Partner with Al Ansari Exchange or UAE Exchange
   - They have all licenses — you provide technology layer
   - White-label arrangement
   - Time: 2-3 months negotiation
```

### 9C. UK Legal Requirements
```
1. FCA Registration
   - Financial Conduct Authority
   - Type: Electronic Money Institution (EMI) or Payment Institution (PI)
   - Capital: €350,000 (EMI) or €125,000 (PI)
   - Time: 12-18 months average
   - Cost: £10,000-25,000 application + legal fees

2. Faster Approach: Authorized Representative
   - Partner with FCA-authorized firm
   - Act as their agent in UK
   - They take regulatory responsibility
   - Partners: Currencycloud, Railsr, Modulr

3. UK Company Registration
   - Companies House: £12 online
   - Takes: 24 hours
```

### 9D. US Legal Requirements
```
1. FinCEN MSB Registration
   - Money Services Business
   - Cost: Free (online registration)
   - Time: 2 weeks
   - Report: Suspicious Activity Reports (SARs) + Currency Transaction Reports (CTRs)

2. State Money Transmitter Licenses
   - Required in each state separately
   - 49 states have different requirements
   - Cost: $500-$100,000+ per state
   - Most expensive: New York (BitLicense) $5,000+, 12-24 months
   - Easiest: Montana, Idaho

3. Fastest US Approach: Partner with Licensed Entity
   - Use Stripe Treasury API (for USD wallet features)
   - Use Circle API (for USDC — they hold all licenses)
   - Use Synapse Financial or Unit.co (Banking-as-a-Service)
   - They are licensed — you build on top of them

4. SEC Consideration
   - If offering any investment products: SEC registration needed
   - Stablecoins: currently not classified as securities (2026)
   - Monitor: SEC crypto regulatory guidance
```

### 9E. Sharia Compliance Requirements (CRITICAL for Pakistan)
```
Why Needed:
- Pakistan is Islamic Republic
- Conventional interest (Riba) is haram (prohibited)
- Estimated 70%+ Pakistanis prefer Islamic banking products
- SBP requires Sharia compliance for Islamic windows

What Needs Sharia Approval:
1. Savings Account → Must be Mudaraba (profit-sharing), not interest
2. Lending → Must be Murabaha (cost-plus) or Musharaka (partnership)
3. Stablecoin → Must be evaluated: is holding USDC = holding USD? Scholars differ
4. FX conversion → Must avoid Riba al-Fadl (excess in currency exchange)
5. Insurance → Must be Takaful (mutual), not conventional insurance

How to Get Certification:
1. Appoint Sharia Supervisory Board (minimum 3 scholars)
2. Scholars review every product before launch
3. Annual Sharia audit
4. Get fatwa (religious ruling) for stablecoin operations

Recommended Scholars/Consultants:
- Institute of Islamic Banking, SBP (sbp.org.pk)
- AAOIFI (Accounting and Auditing Organization for Islamic Financial Institutions)
- Meezan Bank's Sharia Board (can consult on retainer)

Cost: PKR 500,000 - 2,000,000 per year for Sharia Board
```

---

## SECTION 10: COMPLETE REQUIREMENTS CHECKLIST

### Immediate (This Week)
- [ ] Install xlsx, jspdf, react-to-print, zustand, zod
- [ ] Fix Export buttons (Reports page)
- [ ] Fix Print Receipt (POS Terminal)
- [ ] Add state persistence via Zustand + localStorage
- [ ] Add QR code display for Raast demo
- [ ] Add live PKR/USD exchange rate widget (free API)
- [ ] Add Stablecoin Wallet screen (static)
- [ ] Add Remittance Tracker screen (static)
- [ ] Add confetti animation on payment success

### Month 1-2 (Demo Polish)
- [ ] Upgrade to real form validation (Zod)
- [ ] Add skeleton loaders so UI feels live
- [ ] Add KYC verification status screen
- [ ] Add FBR auto-filing dashboard
- [ ] Add multi-currency payment terminal
- [ ] Add animated counters for dashboard KPIs
- [ ] Add real exchange rate API calls
- [ ] Create demo reset button

### Month 2-4 (Backend)
- [ ] Set up Node.js + Express + TypeScript backend
- [ ] Set up PostgreSQL with Prisma ORM
- [ ] Implement JWT authentication
- [ ] Build all REST API endpoints
- [ ] Connect frontend to real API
- [ ] Deploy backend to Railway/Render
- [ ] Deploy frontend to Vercel

### Month 4-6 (Pakistan Payments)
- [ ] JazzCash merchant account + API integration
- [ ] EasyPaisa merchant account + API integration
- [ ] Raast P2M via bank partnership (HBL or Meezan)
- [ ] HBL PayConnect for card payments
- [ ] FBR API integration via PRAL
- [ ] NADRA Nishaan KYC API

### Month 6-9 (Legal & Licensing)
- [ ] SECP company registration
- [ ] NTN + STRN from FBR
- [ ] Corporate bank account (Meezan recommended)
- [ ] PVARA Sandbox application (NOC)
- [ ] Appoint MLRO
- [ ] Draft AML/CFT policy manual
- [ ] Sharia Supervisory Board appointment
- [ ] PCI DSS assessment (SAQ-A minimum)
- [ ] Data Protection Officer appointment

### Month 9-12 (Stablecoin & Remittance MVP)
- [ ] Circle API integration (USDC)
- [ ] World Liberty Financial USD1 API (when available)
- [ ] Solana wallet infrastructure (Fireblocks or Privy)
- [ ] UAE exchange partner agreement
- [ ] DIFC license application (UAE)
- [ ] Chainalysis or Elliptic for blockchain AML
- [ ] Notabene for FATF Travel Rule
- [ ] WhatsApp Business API for remittance notifications

### Month 12-18 (Scale)
- [ ] UK FCA registration or authorized representative
- [ ] Canada FINTRAC MSB registration
- [ ] AI credit scoring model (train on Raast data)
- [ ] MSME merchant OS full launch
- [ ] SBP Digital Bank license application
- [ ] Bitcoin custody infrastructure (if sovereign reserve deal)

---

## SECTION 11: ESTIMATED BUDGET

### Phase 1: Demo Polish (Month 1)
```
npm packages: Free (open source)
Developer time: 40-80 hours
Total: PKR 0-160,000 (if self-built)
```

### Phase 2: Backend + Hosting (Month 2-4)
```
Hosting (Railway/Render free tier): $0/month
Supabase (PostgreSQL): $0-25/month
Upstash Redis: $0-10/month
Cloudflare R2: $0-5/month
Resend email: $0-20/month
Total: $0-60/month
```

### Phase 3: Pakistan Payments (Month 4-6)
```
JazzCash merchant: Free setup, 1.5% per transaction
EasyPaisa merchant: Free setup, 1.5% per transaction
HBL PayConnect: PKR 2,500/month + 2% per card txn
NADRA API: PKR 50,000 setup + PKR 15-30 per verification
FBR PRAL API: PKR 25,000 setup
Total setup: PKR ~100,000
```

### Phase 4: Legal & Licensing (Month 6-12)
```
SECP registration: PKR 3,500
PVARA NOC application: PKR 50,000 (estimated)
AML software (Comply Advantage): $200/month
Sharia Board: PKR 500,000-2,000,000/year
Legal counsel: PKR 500,000-2,000,000
DIFC UAE setup: $15,000-50,000
PCI DSS audit: $5,000-50,000
Total: PKR 5,000,000-15,000,000 (Year 1 legal)
```

### Phase 5: Stablecoin Infrastructure (Month 9-18)
```
Fireblocks wallet custody: $1,000-3,000/month
Chainalysis AML: $500-2,000/month
Circle API: Free (pay on volume)
Solana RPC node: $200-500/month
Travel Rule (Notabene): $500/month
Total: $2,200-6,000/month
```

---

## SECTION 12: HOW TO RESEARCH REQUIREMENTS (Your Method)

### For Payment APIs
```
1. JazzCash: developer.jazzcash.com.pk (or email tech@jazzcash.com.pk)
2. EasyPaisa: developers.easypaisa.com.pk
3. 1Link Raast: Visit 1link.net.pk → developer portal
4. HBL: hbl.com → business → payment solutions
```

### For Regulations
```
1. PVARA: pvara.gov.pk — read all circulars
2. SBP: sbp.org.pk → banking policy → payments → BPRD circulars
3. FBR: fbr.gov.pk → Iris portal for NTN/STRN
4. SECP: secp.gov.pk → eZfile for company registration
```

### For Stablecoin Integration
```
1. Circle (USDC): developers.circle.com (best documentation)
2. Solana: docs.solana.com
3. Fireblocks: developers.fireblocks.com
4. World Liberty (USD1): worldlibertyfinancial.com
```

### For International Expansion Research
```
1. UAE DIFC: difc.ae/business → fintech license
2. UK FCA: fca.org.uk → apply for authorisation
3. USA FinCEN: fincen.gov → MSB registration
4. Canada FINTRAC: fintrac-canafe.gc.ca → MSB registration
5. MiCA (EU): esma.europa.eu → crypto-asset regulation
```

---

*Document generated: May 2026*
*Project: Indus Nexus / POS System TS*
*Status: Phase 1 — Frontend Demo Complete, Backend Pending*
