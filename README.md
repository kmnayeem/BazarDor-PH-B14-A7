# 🛒 BazarDor – বাজার দর

**Essential Product Prices at a Glance**

BazarDor is a modern, responsive market price tracking web application developed for **Programming Hero Batch 14 — Assignment 7**. Explore essential product prices, track price changes, compare prices across local markets, and view detailed product information.

## ✨ Features

- **Product Price Overview:** Browse the latest prices of everyday essentials.
- **Price Tracking:** Find products with increased or decreased prices.
- **Product Details:** View minimum, maximum, and average prices.
- **Market-wise Comparison:** Compare prices across local markets.
- **Category Navigation:** Browse products by category.
- **Product Sorting:** Sort products from low to high or high to low.
- **User Authentication:** Sign in using email and password or Google.
- **Profile Management:** View and update profile information.
- **Responsive Design:** Optimized for mobile, tablet, and desktop.
- **Skeleton Loading:** See loading placeholders while data is being fetched.
- **Toast Notifications:** Get helpful authentication and validation messages.
- **Custom 404 Page:** See a user-friendly error page for invalid routes.

## 🛠️ Technologies Used

| Technology | Purpose |
|---|---|
| Next.js | Frontend framework |
| React | UI development |
| TypeScript | Type safety |
| Tailwind CSS | Styling |
| HeroUI | UI components |
| Better Auth | Authentication |
| React Hot Toast | Notifications |
| React Fast Marquee | Price ticker |
| Lucide React | Icons |

## 🚀 Getting Started

### Prerequisites

Install [Node.js](https://nodejs.org/) and npm before getting started.

### 1. Clone the repository

```bash
git clone https://github.com/kmnayeem/BazarDor-PH-B14-A7.git
```

### 2. Navigate to the project directory

```bash
cd BazarDor-PH-B14-A7
```

### 3. Install dependencies

```bash
npm install
```

### 4. Configure environment variables

Create a `.env.local` file in the project root and add the following variables:

```env
NEXT_PUBLIC_API_URL=your_api_url

BETTER_AUTH_SECRET=your_secret_key
BETTER_AUTH_URL=your_auth_url

GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

Replace the placeholder values with the credentials for your API and authentication providers.

### 5. Start the development server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📱 Responsive Design

BazarDor is designed to provide a smooth experience on:

- Mobile devices
- Tablets
- Desktop computers

## 🔐 Authentication

The application uses Better Auth to provide:

- Google OAuth
- User profile management
- Session management

## 🎯 Project Objectives

- Make daily market prices easy to access.
- Help users understand product price changes.
- Provide market-wise price comparisons.
- Improve the shopping experience through transparent price information.

## 👨‍💻 Project Details

- **Project:** BazarDor (বাজার দর)
- **Course:** Programming Hero
- **Batch:** 14
- **Assignment:** 7
- **GitHub Repository:** [BazarDor-PH-B14-A7](https://github.com/kmnayeem/BazarDor-PH-B14-A7)
- **Developer:** [kmnayeem](https://github.com/kmnayeem)