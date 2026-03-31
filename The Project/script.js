// ========== STATE VARIABLES ==========
let chatStep = 0;
let userData = {};
const whatsappNumber = "919876543210"; // Replace with your real WhatsApp number

// DOM Elements
const chatBox = document.getElementById("chatBox");
const chatMessages = document.getElementById("chatMessages");
const userInput = document.getElementById("userInput");
const exitPopup = document.getElementById("exitPopup");

// ========== CHAT FUNCTIONALITY ==========
function openChat() {
    chatBox.style.display = "flex";
    if (chatStep === 0) {
        // Clear default HTML message if we are starting fresh
        chatMessages.innerHTML = "";
        startChatFunnel();
    }
}

function closeChat() {
    chatBox.style.display = "none";
}

function addMessage(msg, sender = "bot") {
    const msgDiv = document.createElement("div");
    msgDiv.className = `chat-message ${sender}-message`;
    msgDiv.innerText = msg;
    chatMessages.appendChild(msgDiv);
    
    // Auto-scroll to bottom
    chatMessages.scrollTop = chatMessages.scrollHeight;
}

function startChatFunnel() {
    if (chatStep === 0) {
        addMessage("Hi 👋 Need help with printer setup?", "bot");
        setTimeout(() => {
            addMessage("What is your name?", "bot");
        }, 600);
        chatStep++;
    }
}

function sendMessage() {
    const inputVal = userInput.value.trim();
    if (!inputVal) return;

    // Show user message
    addMessage(inputVal, "user");
    userInput.value = "";

    // Process logic based on step
    if (chatStep === 1) {
        userData.name = inputVal;
        setTimeout(() => addMessage("Thanks, " + inputVal + "! Enter your phone number:", "bot"), 500);
        chatStep++;
    } 
    else if (chatStep === 2) {
        userData.phone = inputVal;
        setTimeout(() => addMessage("Got it. What issue are you facing?", "bot"), 500);
        chatStep++;
    } 
    else if (chatStep === 3) {
        userData.issue = inputVal;
        setTimeout(() => addMessage("Connecting you to an expert...", "bot"), 500);
        
        // WhatsApp Redirect
        setTimeout(() => {
            const msg = `Name: ${userData.name}%0APhone: ${userData.phone}%0AIssue: ${userData.issue}`;
            window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, "_blank");
            addMessage("We have redirected you to WhatsApp to connect with our expert securely.", "bot");
        }, 1500);
        
        chatStep++;
    }
}

// Enter key to send message
userInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        sendMessage();
    }
});

// ========== AUTO POPUP TRIGGERS ==========
// 1. Trigger after 5 seconds
setTimeout(() => {
    openChat();
}, 5000);

// ========== EXIT INTENT logic ==========
let exitIntentTriggered = false;

document.addEventListener("mouseleave", (e) => {
    if (e.clientY < 0 && !exitIntentTriggered) {
        exitIntentTriggered = true;
        exitPopup.style.display = "flex";
    }
});

function closeExitPopup() {
    exitPopup.style.display = "none";
}

// ========== MOBILE CALL NOW ==========
function callNow() {
    window.location.href = "tel:+919876543210";
}

// ========== CONTACT FORM AJAX OVERRIDE ==========
function handleContactForm(e) {
    e.preventDefault();
    const name = document.getElementById("contactName").value;
    const phone = document.getElementById("contactPhone").value;
    const issue = document.getElementById("contactIssue").value;
    
    // Simulate ajax and send to whatsapp
    const msg = `Form Lead%0AName: ${name}%0APhone: ${phone}%0AIssue: ${issue}`;
    window.open(`https://wa.me/${whatsappNumber}?text=${msg}`, "_blank");
    
    // reset form
    document.getElementById("contactForm").reset();
    alert("Thanks! An expert will connect with you via WhatsApp immediately.");
}

// Back to Top function for footer
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
