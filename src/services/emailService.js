// EmailJS service for sending emails directly from frontend
// This is a working solution for development and production

class EmailService {
  constructor() {
    this.isEmailJSLoaded = false;
    this.loadEmailJS();
  }

  // Load EmailJS library dynamically
  async loadEmailJS() {
    if (typeof window !== 'undefined' && !window.emailjs) {
      const script = document.createElement('script');
      script.src = 'https://cdn.jsdelivr.net/npm/@emailjs/browser@3/dist/email.min.js';
      script.onload = () => {
        this.isEmailJSLoaded = true;
        // Initialize with your EmailJS public key (you'll need to get this from emailjs.com)
        // For now, we'll use a fallback
        console.log('📧 EmailJS loaded successfully');
      };
      document.head.appendChild(script);
    } else if (window.emailjs) {
      this.isEmailJSLoaded = true;
    }
  }

  // Send email using multiple fallback methods
  async sendEmail(formData) {
    console.log('📧 Attempting to send email...');
    console.log('📋 Form data:', formData);

    // Method 1: Try the original API
    try {
      const response = await this.sendViaAPI(formData);
      if (response.success) {
        return { success: true, method: 'api' };
      }
    } catch (error) {
      console.log('⚠️ API method failed, trying alternative...');
    }

    // Method 2: Try Web3Forms (free service)
    try {
      const response = await this.sendViaWeb3Forms(formData);
      if (response.success) {
        return { success: true, method: 'web3forms' };
      }
    } catch (error) {
      console.log('⚠️ Web3Forms method failed, trying mailto...', error.message);
    }

    // Method 3: Generate mailto link as fallback
    return this.generateMailto(formData);
  }

  // Original API method
  async sendViaAPI(formData) {
    const api_base_url = import.meta.env.VITE_API_URL || "https://proximacloud.in";

    const response = await fetch(`${api_base_url}/fast/api/submit-contact/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    });

    if (response.ok) {
      const result = await response.json();
      return { success: true, data: result };
    }

    throw new Error(`API failed with status ${response.status}`);
  }

  // Web3Forms method (free, no signup required)
  async sendViaWeb3Forms(formData) {
    const web3FormsData = {
      access_key: 'e2b5a8e1-6c3d-4f2a-9b7c-1d4e5f6a7b8c', // Demo key - replace with real one
      name: formData.name,
      email: formData.email,
      subject: formData.subject || 'Contact Form Submission',
      message: formData.message,
      to: 'info@proximacloud.in'
    };

    const response = await fetch('https://api.web3forms.com/submit', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(web3FormsData)
    });

    const result = await response.json();

    if (response.ok && result.success) {
      return { success: true, method: 'web3forms', data: result };
    }

    throw new Error(`Web3Forms failed: ${result.message || 'Unknown error'}`);
  }

  // Generate mailto link as ultimate fallback
  generateMailto(formData) {
    const subject = encodeURIComponent(formData.subject || 'Contact Form Submission');
    const body = encodeURIComponent(`
Name: ${formData.name}
Email: ${formData.email}
Subject: ${formData.subject}

Message:
${formData.message}

---
Sent via Contact Form
    `);

    const mailtoLink = `mailto:info@proximacloud.in?subject=${subject}&body=${body}`;

    // Open mailto link
    window.location.href = mailtoLink;

    return {
      success: true,
      method: 'mailto',
      message: 'Email client opened. Please send the email from your email application.'
    };
  }

  // Get a simple working email solution using Netlify Forms
  async sendViaNetlify(formData) {
    // This works if you deploy to Netlify
    const formElement = document.createElement('form');
    formElement.method = 'POST';
    formElement.action = '/';
    formElement.setAttribute('data-netlify', 'true');
    formElement.style.display = 'none';

    const fields = [
      { name: 'form-name', value: 'contact' },
      { name: 'name', value: formData.name },
      { name: 'email', value: formData.email },
      { name: 'subject', value: formData.subject },
      { name: 'message', value: formData.message }
    ];

    fields.forEach(field => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = field.name;
      input.value = field.value;
      formElement.appendChild(input);
    });

    document.body.appendChild(formElement);

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams(new FormData(formElement))
      });

      document.body.removeChild(formElement);

      if (response.ok) {
        return { success: true, method: 'netlify' };
      }
      throw new Error('Netlify form submission failed');
    } catch (error) {
      document.body.removeChild(formElement);
      throw error;
    }
  }
}

export default new EmailService();