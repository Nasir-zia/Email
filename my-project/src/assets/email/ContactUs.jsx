import { useRef, useState } from 'react';
import emailjs from '@emailjs/browser';

export const ContactUs = () => {
  const form = useRef();
  const [statusMessage, setStatusMessage] = useState('');
  const [statusType, setStatusType] = useState('');
  const [Name, setName] = useState('');
  const [Email, setEmail] = useState('');
  const [Message, setMessage] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    const publicKey = "u4YxxFf_cigoGhDYq";
    const serviceId = "service_rc8u2lt";
    const templateId = "template_fhgqwfc";

    const templateParams = {
      from_name: Name,
      from_email: Email,
      message: Message,
      toEmail: "superman@gmail.com",
      toname: 'Superman(Admin)',
    };

    emailjs
      .send(serviceId, templateId, templateParams, publicKey)
      .then(
        () => {
          setStatusMessage('Your message has been sent successfully!');
          setStatusType('success');
          form.current.reset(); // Reset form fields
          setName('');
          setEmail('');
          setMessage('');
        },
        (error) => {
          setStatusMessage('Failed to send message. Please try again later.');
          setStatusType('error');
          console.error('FAILED...', error.text);
        }
      );
  };

  return (
    <form
      ref={form}
      onSubmit={sendEmail}
      className="max-w-lg mx-auto bg-white p-8 rounded-lg shadow-md border border-gray-200 mt-10"
    >
      <h2 className="text-3xl font-semibold mb-6 text-gray-800 text-center">
        Contact Us
      </h2>

      {statusMessage && (
        <div
          className={`mb-4 p-4 rounded-md text-center ${
            statusType === 'success'
              ? 'bg-green-100 text-green-700'
              : 'bg-red-100 text-red-700'
          }`}
        >
          {statusMessage}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Name</label>
        <input
          type="text"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Your Name"
          required
          name="from_name"
          value={Name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 font-medium mb-2">Email</label>
        <input
          type="email"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Your Email"
          required
          name="from_email"
          value={Email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div className="mb-6">
        <label className="block text-gray-700 font-medium mb-2">Message</label>
        <textarea
          name="message"
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          placeholder="Your message..."
          rows="5"
          required
          value={Message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 rounded-md transition duration-300"
      >
        Send Message
      </button>
    </form>
  );
};
