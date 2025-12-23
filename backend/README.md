
 Backend directory structure.

EncroLink/
└── backend/
    ├── config/
    │   └── db.js                     # MongoDB connection setup
    │
    ├── controllers/
    │   ├── adminController.js       # Admin-related logic
    │   ├── authController.js        # Authentication logic (register, login, verify)
    │   └── messageController.js     # Message handling (send/receive encrypted messages)
    │
    ├── middleware/
    │   ├── authMiddleware.js        # JWT authentication guard
    │   ├── encryptMiddleware.js     # Middleware to encrypt messages before saving
    │   └── errorHandler.js          # Centralized error handling
    │
    ├── models/
    │   ├── Message.js               # Mongoose schema for messages
    │   └── User.js                  # Mongoose schema for users
    │
    ├── routes/
    │   ├── adminRoutes.js           # Routes for admin dashboard actions
    │   ├── authRoutes.js            # Auth routes (login, register, verify)
    │   └── messageRoutes.js         # Encrypted messaging routes
    │
    ├── utils/
    │   ├── emailService.js          # Email delivery via Nodemailer or SendGrid
    │   └── encryptUtils.js          # Message encryption/decryption helpers
    │
    ├── .env                         # Environment variables (ENCRYPT_KEY, DB_URI, JWT_SECRET, etc.)
    ├── .gitignore                   # Excludes node_modules, .env, etc.
    ├── package.json                 # Project dependencies and scripts
    ├── server.js                    # Express app entry point
    └── README.md                    # Project description and setup instructions

