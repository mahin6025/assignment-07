# বাজার দর (BazarDor) 🛒

## Short Description

**বাজার দর (BazarDor)** is a modern, responsive web application designed to help users track daily market prices of essential commodities in Bangladesh. Whether it's rice, lentils, vegetables, or fish, users can easily view today's prices, market-wise comparisons, and whether the price has increased or decreased. Built with Next.js and Tailwind CSS, it provides a seamless and fast experience for checking daily bazar rates.

---

## Technologies Used 🛠️

This project is built using the following modern web technologies:

- **Framework:** Next.js 14+ (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **UI Components:** DaisyUI
- **Authentication:** Better Auth (with MongoDB)
- **Database:** MongoDB
- **Icons & Fonts:** Next/Font (Noto Serif Bengali), Emojis

---

## 5 Key Features of the Project 🌟

1.  **Dynamic Category & Product Browsing:**
    Users can browse through various categories (Rice, Dal, Oil, Vegetables, Fish, etc.) and view a comprehensive list of products with their current prices and today's price change percentage.
2.  **Detailed Market-wise Price Breakdown:**
    Clicking on any specific product takes the user to a detailed page showing a table of prices across different markets (e.g., Karwan Bazar, Mirpur, etc.), along with the minimum, maximum, and average prices.
3.  **Secure Authentication & Protected Routes:**
    Integrated with Better Auth (Google & GitHub login). Certain features, like viewing detailed product information, require the user to be signed in. Unauthenticated users are gracefully redirected to the sign-in page.
4.  **Interactive Hero Section & Live Ticker:**
    The homepage features a dynamic Hero section that displays stats (Products, Markets, Divisions) when logged in, and a fallback image when logged out. It also includes a scrolling ticker for quick price updates.
5.  **Smart Sorting & Bengali Numerals:**
    Users can sort products by price (Low to High, High to Low, or Default). The application correctly handles and displays all numbers in Bengali numerals (e.g., ১৪৮ টাকা) and sorts them based on their actual numeric value, not as strings.

---

## How to Run Locally 🚀

1. Clone the repository: `git clone https://github.com/your-username/sabji-mandi.git`
2. Install dependencies: `npm install`
3. Set up environment variables in `.env` (MongoDB URI, Better Auth secrets, Google/GitHub keys).
4. Run the development server: `npm run dev`
5. Open [http://localhost:3000](http://localhost:3000) in your browser.

---

_Created as part of the Programming Hero Assignment._
