import { useState } from "react";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    honeypot: "", // Hidden field for bot detection
    captcha: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [captchaQuestion, setCaptchaQuestion] = useState(generateCaptcha());

  // Generate simple math captcha
  function generateCaptcha() {
    const num1 = Math.floor(Math.random() * 10) + 1;
    const num2 = Math.floor(Math.random() * 10) + 1;
    const operators = ["+", "-", "*"];
    const operator = operators[Math.floor(Math.random() * operators.length)];

    let answer;
    switch (operator) {
      case "+":
        answer = num1 + num2;
        break;
      case "-":
        answer = num1 - num2;
        break;
      case "*":
        answer = num1 * num2;
        break;
      default:
        answer = num1 + num2;
    }

    return {
      question: `${num1} ${operator} ${num2} = ?`,
      answer: answer,
    };
  }

  // Validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateName = (name) => {
    const nameRegex = /^[a-zA-Z\s]{2,50}$/;
    return nameRegex.test(name.trim());
  };

  const validateMessage = (message) => {
    const trimmed = message.trim();
    return trimmed.length >= 10 && trimmed.length <= 1000;
  };

  const validateSubject = (subject) => {
    const trimmed = subject.trim();
    return trimmed.length >= 3 && trimmed.length <= 100;
  };

  // Check for spam patterns
  const checkSpamPatterns = (text) => {
    const spamPatterns = [
      /https?:\/\//gi, // URLs
      /\b(?:click here|buy now|limited time|act now)\b/gi,
      /(.)\1{4,}/g, // Repeated characters
      /\b\d{10,}\b/g, // Long numbers (phone numbers)
    ];

    return spamPatterns.some((pattern) => pattern.test(text));
  };

  const validateForm = () => {
    const newErrors = {};

    // Honeypot check (should be empty)
    if (formData.honeypot) {
      newErrors.bot = "Bot detected";
      return newErrors;
    }

    // Name validation
    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    } else if (!validateName(formData.name)) {
      newErrors.name =
        "Name should be 2-50 characters and contain only letters";
    }

    // Email validation
    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(formData.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    // Subject validation
    if (!formData.subject.trim()) {
      newErrors.subject = "Subject is required";
    } else if (!validateSubject(formData.subject)) {
      newErrors.subject = "Subject should be 3-100 characters";
    }

    // Message validation
    if (!formData.message.trim()) {
      newErrors.message = "Message is required";
    } else if (!validateMessage(formData.message)) {
      newErrors.message = "Message should be 10-1000 characters";
    }

    // Spam detection
    const fullText = `${formData.name} ${formData.email} ${formData.subject} ${formData.message}`;
    if (checkSpamPatterns(fullText)) {
      newErrors.spam = "Message contains suspicious content";
    }

    // Captcha validation
    if (!formData.captcha) {
      newErrors.captcha = "Please solve the math problem";
    } else if (parseInt(formData.captcha) !== captchaQuestion.answer) {
      newErrors.captcha = "Incorrect answer";
    }

    return newErrors;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const validationErrors = validateForm();

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }

    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    try {
      // Your form submission logic here
      console.log("Form submitted:", formData);
      const response = await fetch("https://proximacloud.ddns.net/fast/api/submit-contact/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok) {
        alert("Message sent! We'll get back to you shortly.");
        // Reset form
        setFormData({
          name: "",
          email: "",
          subject: "",
          message: "",
          honeypot: "",
          captcha: "",
        });
        setErrors({});
        setCaptchaQuestion(generateCaptcha());
      } else {
        console.error(
          `Failed to send message: ${result.detail || "Unknown error"}`
        );
      }
    } catch (error) {
      setErrors({ submit: "Failed to send message. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-20" id="contact">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Get in Touch</h2>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Ready to start your mission? Send us a message and we'll get back to
            you shortly.
          </p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-slate-800 p-8 rounded-lg shadow-lg border border-slate-700">
            <div>
              {/* Honeypot field - hidden from users */}
              <input
                type="text"
                name="honeypot"
                value={formData.honeypot}
                onChange={handleChange}
                style={{ display: "none" }}
                tabIndex="-1"
                autoComplete="off"
              />

              <div className="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                  <input
                    className={`w-full px-4 py-3 bg-slate-900 text-white rounded-lg border ${
                      errors.name ? "border-red-500" : "border-slate-600"
                    } focus:outline-none focus:border-teal-500 transition-colors`}
                    placeholder="Your Name"
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                  />
                  {errors.name && (
                    <p className="text-red-400 text-sm mt-1">{errors.name}</p>
                  )}
                </div>

                <div>
                  <input
                    className={`w-full px-4 py-3 bg-slate-900 text-white rounded-lg border ${
                      errors.email ? "border-red-500" : "border-slate-600"
                    } focus:outline-none focus:border-teal-500 transition-colors`}
                    placeholder="Your Email"
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                  {errors.email && (
                    <p className="text-red-400 text-sm mt-1">{errors.email}</p>
                  )}
                </div>
              </div>

              <div className="mb-6">
                <input
                  className={`w-full px-4 py-3 bg-slate-900 text-white rounded-lg border ${
                    errors.subject ? "border-red-500" : "border-slate-600"
                  } focus:outline-none focus:border-teal-500 transition-colors`}
                  placeholder="Subject"
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  required
                />
                {errors.subject && (
                  <p className="text-red-400 text-sm mt-1">{errors.subject}</p>
                )}
              </div>

              <div className="mb-6">
                <textarea
                  className={`w-full px-4 py-3 bg-slate-900 text-white rounded-lg border ${
                    errors.message ? "border-red-500" : "border-slate-600"
                  } focus:outline-none focus:border-teal-500 transition-colors resize-none`}
                  placeholder="Your Message (minimum 10 characters)"
                  rows="5"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
                {errors.message && (
                  <p className="text-red-400 text-sm mt-1">{errors.message}</p>
                )}
                <p className="text-slate-400 text-sm mt-1">
                  {formData.message.length}/1000 characters
                </p>
              </div>

              {/* Simple Math Captcha */}
              <div className="mb-6">
                <label className="block text-white mb-2">
                  Security Check: {captchaQuestion.question}
                </label>
                <input
                  className={`w-full px-4 py-3 bg-slate-900 text-white rounded-lg border ${
                    errors.captcha ? "border-red-500" : "border-slate-600"
                  } focus:outline-none focus:border-teal-500 transition-colors`}
                  placeholder="Enter your answer"
                  type="number"
                  name="captcha"
                  value={formData.captcha}
                  onChange={handleChange}
                  required
                />
                {errors.captcha && (
                  <p className="text-red-400 text-sm mt-1">{errors.captcha}</p>
                )}
              </div>

              {/* Error messages */}
              {errors.spam && (
                <p className="text-red-400 text-sm mb-4">{errors.spam}</p>
              )}
              {errors.submit && (
                <p className="text-red-400 text-sm mb-4">{errors.submit}</p>
              )}
              {errors.bot && (
                <p className="text-red-400 text-sm mb-4">
                  Bot detected. Please try again.
                </p>
              )}

              <div className="text-center">
                <button
                  className={`px-8 py-3 rounded-lg font-semibold transition-all ${
                    isSubmitting
                      ? "bg-slate-600 text-slate-400 cursor-not-allowed"
                      : "bg-teal-600 hover:bg-teal-700 text-white"
                  }`}
                  type="submit"
                  disabled={isSubmitting}
                  onClick={handleSubmit}
                >
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
