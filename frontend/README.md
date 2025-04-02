# Phone E-commerce

A modern e-commerce application for mobile phones built with Next.js 14 and TypeScript.

## 🚀 Features

- Browse phone catalog
- Detailed product views
- Shopping cart functionality
- Responsive design
- Color and storage selection
- Real-time price updates

## 🛠️ Technologies

- Next.js 14
- TypeScript
- SCSS Modules
- Jest & React Testing Library
- Context API for state management

## 📦 Installation

1. Clone the repository:

```bash
git clone https://github.com/yourusername/phone-ecommerce.git
```

2. Install dependencies:

```bash
cd phone-ecommerce
npm install
```

3. Create a `.env.local` file in the frontend directory with:

```bash
NEXT_PUBLIC_API_URL=https://prueba-tecnica-api-tienda-moviles.onrender.com
```

4. Run the development server:

```bash
npm run dev
```
### Production Mode

```bash
npm run build
npm run start
```

5. Open your browser and navigate to `http://localhost:3000` to see the app in action.

## 🧪 Testing

Run the test suite:

```bash
npm test
```

## 📁 Project Structure

```
frontend/
├── src/
│   ├── app/             # App routes
│   ├── components/      # React components
│   ├── context/        # Context providers
│   ├── services/       # API services
│   ├── types/         # TypeScript types
│   └── styles/        # Global styles
├── .env.local         # Environment variables
```

## 🌟 Main Components

- `PhoneDetail`: Detailed view of each phone with color and storage selection
- `Cart`: Shopping cart with item management
- `Catalog`: Phone listing with filters and search
- `Navbar`: Navigation and cart status

## 🧑‍💻 Author

[Ángela Chicano](https://github.com/chicano85)
