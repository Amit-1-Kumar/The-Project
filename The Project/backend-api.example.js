// Backend API Example (Node.js/Express)
// This is a sample implementation for handling leads from the frontend

const express = require('express');
const app = express();
app.use(express.json());

// In-memory storage (use database in production)
let leads = [];

// POST /api/leads - Save lead from chat or form
app.post('/api/leads', (req, res) => {
    try {
        const { name, phone, issue, timestamp, source } = req.body;
        
        // Validate
        if (!name || !phone || !issue) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        
        // Create lead object
        const lead = {
            id: Date.now(),
            name,
            phone,
            issue,
            timestamp: timestamp || new Date().toISOString(),
            source: source || 'unknown',
            status: 'new',
            createdAt: new Date()
        };
        
        // Save to database
        leads.push(lead);
        
        // Send to WhatsApp (optional - via WhatsApp API)
        sendWhatsAppNotification(lead);
        
        // Send to Email (optional)
        sendEmailNotification(lead);
        
        // Send SMS (optional)
        sendSMSNotification(lead);
        
        console.log('Lead saved:', lead);
        res.json({ success: true, lead });
    } catch (error) {
        console.error('Error saving lead:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// GET /api/leads - Retrieve all leads
app.get('/api/leads', (req, res) => {
    res.json(leads);
});

// GET /api/leads/:id - Get single lead
app.get('/api/leads/:id', (req, res) => {
    const lead = leads.find(l => l.id === parseInt(req.params.id));
    if (!lead) return res.status(404).json({ error: 'Lead not found' });
    res.json(lead);
});

// PUT /api/leads/:id - Update lead status
app.put('/api/leads/:id', (req, res) => {
    const lead = leads.find(l => l.id === parseInt(req.params.id));
    if (!lead) return res.status(404).json({ error: 'Lead not found' });
    
    lead.status = req.body.status || lead.status;
    lead.notes = req.body.notes || lead.notes;
    lead.updatedAt = new Date();
    
    res.json(lead);
});

// ========== NOTIFICATION FUNCTIONS ==========

// Send WhatsApp notification to customer
function sendWhatsAppNotification(lead) {
    // Using WhatsApp Business API (Twilio, MessageBird, etc.)
    const message = `Hi ${lead.name}, thanks for reaching out! Our expert will contact you shortly for your ${lead.issue}. -Support Team`;
    
    try {
        // Example with Twilio
        // twilio.messages.create({
        //     body: message,
        //     from: 'whatsapp:+1234567890',
        //     to: `whatsapp:+${lead.phone}`
        // });
        console.log('WhatsApp sent to:', lead.phone);
    } catch (error) {
        console.error('Error sending WhatsApp:', error);
    }
}

// Send email notification
function sendEmailNotification(lead) {
    try {
        // Example with NodeMailer
        // const mailOptions = {
        //     from: 'support@example.com',
        //     to: lead.email,
        //     subject: 'We received your printer support request',
        //     html: `<h2>Hi ${lead.name}</h2>
        //            <p>We've received your request about: ${lead.issue}</p>
        //            <p>Our expert will contact you on ${lead.phone}</p>`
        // };
        // transporter.sendMail(mailOptions);
        console.log('Email notification queued for:', lead.name);
    } catch (error) {
        console.error('Error sending email:', error);
    }
}

// Send SMS notification
function sendSMSNotification(lead) {
    try {
        // Example with Twilio
        // twilio.messages.create({
        //     body: `Hi ${lead.name}, thanks for contacting support. We'll be in touch shortly!`,
        //     from: '+1234567890',
        //     to: lead.phone
        // });
        console.log('SMS notification sent to:', lead.phone);
    } catch (error) {
        console.error('Error sending SMS:', error);
    }
}

// Admin dashboard route
app.get('/admin/leads', (req, res) => {
    const html = `
        <h1>Leads Dashboard</h1>
        <table border="1" cellpadding="10">
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Phone</th>
                <th>Issue</th>
                <th>Source</th>
                <th>Status</th>
                <th>Date</th>
            </tr>
            ${leads.map(lead => `
                <tr>
                    <td>${lead.id}</td>
                    <td>${lead.name}</td>
                    <td>${lead.phone}</td>
                    <td>${lead.issue}</td>
                    <td>${lead.source}</td>
                    <td>${lead.status}</td>
                    <td>${new Date(lead.timestamp).toLocaleString()}</td>
                </tr>
            `).join('')}
        </table>
        <p>Total Leads: ${leads.length}</p>
        <p><a href="/">Back to Site</a></p>
    `;
    res.send(html);
});

// Analytics endpoints
app.get('/api/analytics', (req, res) => {
    const stats = {
        totalLeads: leads.length,
        leadsBySource: {
            chat: leads.filter(l => l.source === 'chat').length,
            contact_form: leads.filter(l => l.source === 'contact_form').length,
            whatsapp: leads.filter(l => l.source === 'whatsapp').length
        },
        leadsByStatus: {
            new: leads.filter(l => l.status === 'new').length,
            contacted: leads.filter(l => l.status === 'contacted').length,
            converted: leads.filter(l => l.status === 'converted').length,
            lost: leads.filter(l => l.status === 'lost').length
        },
        conversionRate: (leads.filter(l => l.status === 'converted').length / leads.length * 100).toFixed(2) + '%'
    };
    res.json(stats);
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});

module.exports = app;
