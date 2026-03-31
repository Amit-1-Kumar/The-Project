// config.example.js
// Rename to config.js and update with your actual values

const config = {
    // ========== CONTACT INFORMATION ==========
    whatsapp: {
        // Your WhatsApp Business number (international format, no + or -)
        number: '918567496847',
        // Pre-filled message for WhatsApp
        message: 'Hi! I need help with printer setup.'
    },
    
    phone: {
        // Your phone number for calls
        number: '918567496847',
        // Call button text
        text: 'Call Now'
    },
    
    email: {
        // Support email
        support: 'support@connectprintersetup.com',
        // Lead notification email
        leads: 'leads@connectprintersetup.com'
    },

    // ========== API CONFIGURATION ==========
    api: {
        // Your backend endpoint
        baseUrl: 'https://api.example.com',
        // Lead endpoint
        leadsEndpoint: '/api/leads',
        // Timeout in milliseconds
        timeout: 5000,
        // Retry failed requests
        retryAttempts: 3
    },

    // ========== CHAT CONFIGURATION ==========
    chat: {
        // Header color (hex)
        headerColor: '#667eea',
        // Button color
        buttonColor: '#667eea',
        // Maximum width on desktop
        maxWidth: '350px',
        // Show typing indicator
        showTyping: true,
        // Message delay (ms)
        messageDelay: 500
    },

    // ========== ANALYTICS ==========
    analytics: {
        // Google Analytics ID
        googleId: 'GA_MEASUREMENT_ID',
        // Enable tracking
        enabled: true,
        // Track all events
        trackAllEvents: true
    },

    // ========== NOTIFICATIONS ==========
    notifications: {
        // Send WhatsApp notification to customer
        whatsappToCustomer: true,
        // Send email notification to admin
        emailToAdmin: true,
        // Send SMS notification
        smsToCustomer: false,
        // Notification delay (ms)
        delay: 1000
    },

    // ========== CHAT FLOW STEPS ==========
    // These are shown in the chat popup in order
    chatFlow: [
        {
            id: 1,
            question: "Hi 👋 Need help with printer setup?",
            type: "greeting",
            delay: 500
        },
        {
            id: 2,
            question: "What's your name?",
            type: "text",
            field: "name",
            required: true,
            placeholder: "John Doe"
        },
        {
            id: 3,
            question: "What's your phone number?",
            type: "phone",
            field: "phone",
            required: true,
            placeholder: "10-digit number",
            validation: /^\d{10,}$/,
            errorMessage: "Please enter a valid phone number"
        },
        {
            id: 4,
            question: "What's your printer issue?",
            type: "select",
            field: "issue",
            required: true,
            options: [
                "WiFi Connection Issues",
                "Driver Installation",
                "Printing Not Working",
                "Scanner Problems",
                "Mobile Printing Setup",
                "Network Configuration",
                "Other Issue"
            ]
        },
        {
            id: 5,
            question: "Perfect! Connect with our expert now?",
            type: "confirmation"
        }
    ],

    // ========== EXIT POPUP ==========
    exitPopup: {
        // Enable exit popup
        enabled: true,
        // Delay before showing (ms)
        delay: 3000,
        // Show only once per session
        oncePerSession: true,
        // Headline
        headline: "🎁 WAIT! Get FREE Printer Setup Help",
        // Subheadline
        subheadline: "Don't leave without expert assistance. Limited time offer!",
        // Button text
        buttons: {
            chat: "💬 Chat Now",
            whatsapp: "WhatsApp"
        }
    },

    // ========== TRUST ELEMENTS ==========
    trust: {
        // Show on hero section
        elements: [
            "🔥 24/7 Support Available",
            "⚡ Instant Remote Setup",
            "👨‍🔧 Certified Experts"
        ]
    },

    // ========== MOBILE ==========
    mobile: {
        // Show sticky CTA bar on mobile
        stickyBar: true,
        // Breakpoint for mobile (px)
        breakpoint: 768,
        // Sticky bar buttons
        buttons: [
            { icon: "phone", text: "Call", action: "callNow" },
            { icon: "whatsapp", text: "WhatsApp", action: "openWhatsApp" },
            { icon: "chat", text: "Chat", action: "openChat" }
        ]
    },

    // ========== CTA CUSTOMIZATION ==========
    cta: {
        // Primary button text variations
        primary: [
            "Fix My Printer Now 🚀",
            "Get Instant Support",
            "Talk to Expert"
        ],
        // Secondary button text
        secondary: [
            "Get Help Now",
            "Talk to Technician",
            "Get Instant Support",
            "Chat Now"
        ]
    },

    // ========== FORM VALIDATION ==========
    form: {
        // Required fields
        required: ['name', 'phone', 'issue'],
        // Minimum phone length
        minPhoneLength: 10,
        // Email pattern (if email field is added)
        emailPattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
        // Auto-submit after collecting all fields
        autoSubmit: true
    },

    // ========== FEATURE FLAGS ==========
    features: {
        // Enable chat popup
        chatPopup: true,
        // Enable exit popup
        exitPopup: true,
        // Enable sticky mobile bar
        stickyBar: true,
        // Enable WhatsApp button
        whatsappButton: true,
        // Enable call button
        callButton: true,
        // Enable contact form
        contactForm: true,
        // Enable analytics
        analytcs: true,
        // Auto-open chat on page load
        autoOpenChat: false,
        // Show delay (ms)
        autoOpenDelay: 5000
    },

    // ========== INTEGRATIONS ==========
    integrations: {
        // Twilio (WhatsApp/SMS)
        twilio: {
            enabled: false,
            accountSid: 'YOUR_ACCOUNT_SID',
            authToken: 'YOUR_AUTH_TOKEN',
            fromNumber: '+1234567890'
        },
        // SendGrid (Email)
        sendgrid: {
            enabled: false,
            apiKey: 'YOUR_API_KEY'
        },
        // Mailgun (Email)
        mailgun: {
            enabled: false,
            domain: 'mail.example.com',
            apiKey: 'YOUR_API_KEY'
        },
        // CRM Integration
        crm: {
            type: 'pipedrive', // salesforce, hubspot, pipedrive, zoho
            enabled: false,
            apiKey: 'YOUR_API_KEY',
            endpoint: 'https://api.pipedrive.com/v1'
        }
    },

    // ========== DATABASE ==========
    database: {
        // MongoDB
        mongodb: {
            enabled: false,
            url: 'mongodb://localhost:27017/printer-leads'
        },
        // PostgreSQL
        postgres: {
            enabled: false,
            host: 'localhost',
            port: 5432,
            database: 'printer_leads',
            user: 'root',
            password: 'password'
        },
        // MySQL
        mysql: {
            enabled: false,
            host: 'localhost',
            user: 'root',
            password: 'password',
            database: 'printer_leads'
        }
    },

    // ========== COLORS & STYLING ==========
    colors: {
        primary: '#667eea',
        secondary: '#764ba2',
        accent: '#25D366',
        success: '#4CAF50',
        error: '#FF5252',
        warning: '#FFC107',
        background: '#f9f9f9',
        text: '#333333',
        textLight: '#666666',
        border: '#e0e0e0'
    },

    // ========== ENVIRONMENT ==========
    env: process.env.NODE_ENV || 'development',
    debug: true,
    logLevel: 'info' // error, warn, info, debug, trace
};

// Export for Node.js
if (typeof module !== 'undefined' && module.exports) {
    module.exports = config;
}

// Usage in HTML
// <script src="config.js"></script>
// Then access: config.whatsapp.number
