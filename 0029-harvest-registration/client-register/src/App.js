import React, { useState } from "react";

const App = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [event, setEvent] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name && !email && !phone && !event) {
      alert("Please fill all essential fields!");
      return; // End the program
    }

    try {
      const res = await fetch("http://localhost:4000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name, email, phone, event, message }),
      });

      const data = await res.json();

      if (res.ok) {
        console.log(res.status);
        alert(data.message); // Successful login message
        setName("");
        setEmail("");
        setPhone("");
        setEvent("");
        setMessage("");
      } else {
        console.log(res.status);
        alert(data.message); // Error message from server
      }
    } catch (err) {
      console.error("Error: ", err);
    }
  };

  return (
    <div className="bg-gradient-to-b from-yellow-100 via-orange-100 to-yellow-50 min-h-screen flex items-center justify-center">
      <div className="bg-white shadow-xl rounded-lg p-8 max-w-2xl w-full border-t-8 border-yellow-600">
        <h1 className="text-4xl font-extrabold text-yellow-700 text-center mb-6">
          <i className="fas fa-seedling text-green-600"></i> Harvest Festival
          Registration
        </h1>
        <p className="text-gray-700 text-center mb-6">
          Join us for a time of celebration, fellowship, and thanksgiving to the
          Lord!
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Full Name */}
          <div>
            <label
              htmlFor="fullName"
              className="block text-sm font-medium text-gray-800"
            >
              Full Name
            </label>
            <div className="mt-1 flex items-center bg-yellow-50 rounded-md p-2">
              <i className="fas fa-user text-yellow-600 mr-3"></i>
              <input
                type="text"
                id="fullName"
                name="fullName"
                className="block w-full p-2 border-none rounded-md bg-transparent focus:ring-yellow-600"
                placeholder="Enter your full name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Email */}
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-800"
            >
              Email
            </label>
            <div className="mt-1 flex items-center bg-yellow-50 rounded-md p-2">
              <i className="fas fa-envelope text-yellow-600 mr-3"></i>
              <input
                type="email"
                id="email"
                name="email"
                className="block w-full p-2 border-none rounded-md bg-transparent focus:ring-yellow-600"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Phone Number */}
          <div>
            <label
              htmlFor="phone"
              className="block text-sm font-medium text-gray-800"
            >
              Phone Number
            </label>
            <div className="mt-1 flex items-center bg-yellow-50 rounded-md p-2">
              <i className="fas fa-phone text-yellow-600 mr-3"></i>
              <input
                type="tel"
                id="phone"
                name="phone"
                className="block w-full p-2 border-none rounded-md bg-transparent focus:ring-yellow-600"
                placeholder="Enter your phone number"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Event Selection */}
          <div>
            <label
              htmlFor="event"
              className="block text-sm font-medium text-gray-800"
            >
              Select Event
            </label>
            <div className="mt-1 flex items-center bg-yellow-50 rounded-md p-2">
              <i className="fas fa-calendar-alt text-yellow-600 mr-3"></i>
              <select
                id="event"
                name="event"
                className="block w-full p-2 border-none rounded-md bg-transparent focus:ring-yellow-600"
                value={event}
                onChange={(e) => setEvent(e.target.value)}
                required
              >
                <option value="" disabled>
                  Select an event
                </option>
                <option value="fruit-carving">Fruit Carving</option>
                <option value="pie-baking">Pie Baking</option>
                <option value="scarecrow-contest">Scarecrow Contest</option>
                <option value="choir-performance">Choir Performance</option>
              </select>
            </div>
          </div>

          {/* Message */}
          <div>
            <label
              htmlFor="message"
              className="block text-sm font-medium text-gray-800"
            >
              Message (Optional)
            </label>
            <div className="mt-1 flex items-start bg-yellow-50 rounded-md p-2">
              <i className="fas fa-comment text-yellow-600 mr-3 mt-2"></i>
              <textarea
                id="message"
                name="message"
                rows="4"
                className="block w-full p-2 border-none rounded-md bg-transparent focus:ring-yellow-600"
                placeholder="Leave a message..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
              ></textarea>
            </div>
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full bg-yellow-600 text-white py-2 px-4 rounded-md hover:bg-yellow-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 font-bold"
          >
            Register Now
          </button>
        </form>
      </div>
    </div>
  );
};

export default App;
