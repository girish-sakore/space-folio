import { useState } from 'react';

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Form submitted:', formData);
    // You can add your form submission logic here
    alert('Message sent! We\'ll get back to you shortly.');
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      subject: '',
      message: ''
    });
  };

  return (
    <section className="py-20" id="contact">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="section-title text-4xl">Get in Touch</h2>
          <p className="mt-4 text-lg text-slate-400 max-w-2xl mx-auto">
            Ready to start your mission? Send us a message and we'll get back
            to you shortly.
          </p>
        </div>
        <div className="max-w-2xl mx-auto">
          <div className="bg-slate-800 p-8 rounded-lg shadow-lg border border-slate-700">
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <input
                className="form-input w-full"
                placeholder="Your Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
              <input
                className="form-input w-full"
                placeholder="Your Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <input
                className="form-input w-full"
                placeholder="Subject"
                type="text"
                name="subject"
                value={formData.subject}
                onChange={handleChange}
                required
              />
            </div>
            <div className="mb-6">
              <textarea
                className="form-input w-full"
                placeholder="Your Message"
                rows="5"
                name="message"
                value={formData.message}
                onChange={handleChange}
                required
              />
            </div>
            <div className="text-center">
              <button 
                className="btn-primary w-full md:w-auto" 
                type="submit"
                onClick={handleSubmit}
              >
                Send Message
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}