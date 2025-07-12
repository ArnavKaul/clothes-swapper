# 🚀 Clothes Swapper

Swap clothes with your friends and community!

A web application to easily organize and manage clothes swapping events built for the odoo hackathon round 1.

![License](https://img.shields.io/github/license/MokshShahh/clothes-swapper)
![GitHub stars](https://img.shields.io/github/stars/MokshShahh/clothes-swapper?style=social)
![GitHub forks](https://img.shields.io/github/forks/MokshShahh/clothes-swapper?style=social)
![GitHub issues](https://img.shields.io/github/issues/MokshShahh/clothes-swapper)
![GitHub pull requests](https://img.shields.io/github/issues-pr/MokshShahh/clothes-swapper)
![GitHub last commit](https://img.shields.io/github/last-commit/MokshShahh/clothes-swapper)

![JavaScript](https://img.shields.io/badge/javascript-%23F7DF1E.svg?style=for-the-badge&logo=javascript&logoColor=black)
![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![NodeJS](https://img.shields.io/badge/node.js-%2343853D.svg?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![MongoDB](https://img.shields.io/badge/mongodb-%234EA94B.svg?style=for-the-badge&logo=mongodb&logoColor=white)
![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)

## 📋 Table of Contents

- [About](#about)
- [Features](#features)
- [Demo](#demo)
- [Quick Start](#quick-start)
- [Installation](#installation)
- [Usage](#usage)
- [Configuration](#configuration)
- [Project Structure](#project-structure)
- [Contributing](#contributing)
- [Testing](#testing)
- [Deployment](#deployment)
- [FAQ](#faq)
- [License](#license)
- [Support](#support)
- [Acknowledgments](#acknowledgments)

## About

Clothes Swapper is a web application designed to facilitate clothes swapping events within communities. It addresses the challenge of decluttering wardrobes sustainably and affordably by connecting individuals who wish to exchange clothing items. The application aims to reduce textile waste, promote eco-conscious consumption, and foster community engagement through organized swapping events.

The target audience includes environmentally conscious individuals, fashion enthusiasts looking for affordable alternatives, and community organizers seeking to host sustainable events. Clothes Swapper utilizes a MERN (MongoDB, Express.js, React.js, Node.js) stack architecture, providing a robust and scalable platform for managing user accounts, event listings, and item details.

The unique selling point lies in its user-friendly interface, comprehensive event management features, and focus on promoting sustainable practices within the fashion industry. It provides a space for users to connect, share their style, and contribute to a more circular economy.

## ✨ Features

- 🎯 **User Authentication**: Secure registration, login, and profile management.
- 👕 **Item Listing**: Ability to list clothes with descriptions, sizes, and images.
- 🔍 **Search and Filtering**: Robust search functionality to find events or items based on location, category, and keywords.
- 🎨 **UI/UX**: Intuitive and responsive design using Material UI for a seamless user experience.
- 📱 **Responsive**: Cross-platform compatibility accessible on desktops, tablets, and mobile devices.



Clone and run in 3 steps:

```bash
git clone https://github.com/MokshShahh/clothes-swapper.git
cd clothes-swapper
npm install && npm start
```

Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

## 📦 Installation

### Prerequisites

- Node.js 18+ and npm
- Git
- MongoDB account and connection string

### Option 1: From Source

```bash
# Clone repository
git clone https://github.com/MokshShahh/clothes-swapper.git
cd clothes-swapper

# Install dependencies
npm install

# Start development server
npm run dev
```

## 💻 Usage

### Basic Usage

1.  Register an account or log in.
2.  Browse existing swapping events or create your own.
3.  List the clothes you want to swap with descriptions and images.
4.  Communicate with other participants through the messaging system.

### Creating an Event
```javascript
// Example event object
const event = {
  title: 'Summer Clothes Swap',
  date: '2024-07-20',
  location: 'Community Center',
  description: 'Swap your summer clothes with others!',
  organizer: 'user123'
};

// Send to the backend API
fetch('/api/events', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(event)
}).then(response => response.json())
  .then(data => console.log(data));
```

### Adding an Item
```javascript
// Example item object
const item = {
  name: 'Summer Dress',
  size: 'M',
  description: 'Light and airy summer dress.',
  imageUrl: 'https://example.com/dress.jpg',
  owner: 'user123'
};

// Send to the backend API
fetch('/api/items', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(item)
}).then(response => response.json())
  .then(data => console.log(data));
```

## ⚙️ Configuration

### Environment Variables

Create a `.env` file in the root directory:

```env
# Database
MONGODB_URI=mongodb+srv://<username>:<password>@cluster0.mongodb.net/clothes-swapper

# Server
PORT=3000
NODE_ENV=development

# JWT Secret
JWT_SECRET=your_jwt_secret_key
```

## 📁 Project Structure

```
clothes-swapper/
├── 📁 client/
│   ├── 📁 src/
│   │   ├── 📁 components/          # Reusable UI components
│   │   ├── 📁 pages/              # Application pages
│   │   ├── 📁 context/            # React Contexts
│   │   ├── 📁 styles/             # CSS/styling files
│   │   ├── 📄 App.js            # Application entry point
│   │   └── 📄 index.js           # React DOM render
│   ├── 📁 public/                 # Static assets
│   ├── 📄 package.json           # Client dependencies
│   └── 📄 README.md
├── 📁 server/
│   ├── 📁 models/              # Mongoose models
│   ├── 📁 routes/              # API routes
│   ├── 📁 controllers/         # Route handlers
│   ├── 📁 config/              # Configuration files
│   ├── 📄 server.js            # Express server entry point
│   └── 📄 package.json           # Server dependencies
├── 📄 .env.example           # Environment variables template
├── 📄 .gitignore             # Git ignore rules
├── 📄 package.json           # Project dependencies
├── 📄 README.md              # Project documentation
└── 📄 LICENSE                # License file
```

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](CONTRIBUTING.md) for details.

### Quick Contribution Steps

1.  🍴 Fork the repository
2.  🌟 Create your feature branch (`git checkout -b feature/AmazingFeature`)
3.  ✅ Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4.  📤 Push to the branch (`git push origin feature/AmazingFeature`)
5.  🔃 Open a Pull Request

### Development Setup

```bash
# Fork and clone the repo
git clone https://github.com/yourusername/clothes-swapper.git

# Install dependencies (client and server)
cd clothes-swapper/client && npm install
cd ../server && npm install

# Create a .env file in the server directory

# Start the development servers (client and server)
cd clothes-swapper/client && npm start
cd ../server && npm start
```

### Code Style

-   Follow existing code conventions
-   Run `npm run lint` before committing
-   Add tests for new features
-   Update documentation as needed

## Testing

To run the tests, execute the following command:

```bash
npm test
```

This will run all tests defined in the `tests` directory.

## Deployment

### Vercel

The client application can be easily deployed to Vercel.

1.  Create a Vercel account and install the Vercel CLI.
2.  Run `vercel` in the `client` directory.
3.  Follow the prompts to link your project and deploy.

### Heroku

The server application can be deployed to Heroku.

1.  Create a Heroku account and install the Heroku CLI.
2.  Create a new Heroku app.
3.  Set the necessary environment variables in the Heroku app settings.
4.  Push the server code to the Heroku app.

```bash
# Deploy the server to Heroku
git push heroku main
```

## FAQ

**Q: How do I create a new event?**
A: Log in to your account and click on the "Create Event" button. Fill in the event details and submit the form.

**Q: How do I list an item for swapping?**
A: Go to your profile page and click on the "Add Item" button. Provide the item details, upload an image, and submit the form.

**Q: How do I contact other participants?**
A: Use the built-in messaging system to communicate with other event attendees.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

### License Summary

-   ✅ Commercial use
-   ✅ Modification
-   ✅ Distribution
-   ✅ Private use
-   ❌ Liability
-   ❌ Warranty

## 💬 Support

-   📧 **Email**: moksh.shah2001@gmail.com
-   🐛 **Issues**: [GitHub Issues](https://github.com/MokshShahh/clothes-swapper/issues)

## 🙏 Acknowledgments

-   🎨 **Design inspiration**: Material UI
-   📚 **Libraries used**:
    -   [React](https://reactjs.org/) - Front-end framework
    -   [Express](https://expressjs.com/) - Back-end framework
    -   [MongoDB](https://www.mongodb.com/) - Database
    -   [MUI](https://mui.com/) - UI Component Library
-   👥 **Contributors**: Thanks to all [contributors](https://github.com/MokshShahh/clothes-swapper/contributors)
```