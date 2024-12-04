import React, { useState } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

function ManageEvents() {
  const navigate = useNavigate();

  const [events, setEvents] = useState([
    {
      id: 1,
      name: "Tech Summit 2024",
      date: "2024-12-15",
      description: "A premier tech conference bringing together innovators.",
      image: null,
    },
    {
      id: 2,
      name: "Art Exhibition 2024",
      date: "2024-12-20",
      description: "A modern art exhibition showcasing local artists.",
      image: null,
    },
  ]);

  const [isEditing, setIsEditing] = useState(false);
  const [currentEvent, setCurrentEvent] = useState({
    name: "",
    date: "",
    description: "",
    image: null,
  });

  const [newEvent, setNewEvent] = useState({
    name: "",
    date: "",
    description: "",
    image: null,
  });

  const handleNewEventChange = (e) => {
    const { name, value } = e.target;
    setNewEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleNewEventImage = (e) => {
    const file = e.target.files[0];
    setNewEvent((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
  };

  const handleAddEvent = (e) => {
    e.preventDefault();
    const newEventData = { ...newEvent, id: events.length + 1 };
    setEvents([...events, newEventData]);
    setNewEvent({ name: "", date: "", description: "", image: null });
  };

  const handleEditEventChange = (e) => {
    const { name, value } = e.target;
    setCurrentEvent((prev) => ({ ...prev, [name]: value }));
  };

  const handleEditEventImage = (e) => {
    const file = e.target.files[0];
    setCurrentEvent((prev) => ({ ...prev, image: URL.createObjectURL(file) }));
  };

  const handleEditEvent = (e) => {
    e.preventDefault();
    const updatedEvents = events.map((event) =>
      event.id === currentEvent.id ? currentEvent : event
    );
    setEvents(updatedEvents);
    setIsEditing(false);
  };

  const handleDeleteEvent = (id) => {
    const updatedEvents = events.filter((event) => event.id !== id);
    setEvents(updatedEvents);
  };

  const openEditForm = (event) => {
    setCurrentEvent(event);
    setIsEditing(true);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <motion.h1
        className="text-4xl font-bold mb-8 text-center"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Manage Events
      </motion.h1>

      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="bg-white text-black py-2 px-4 rounded-md self-start ml-6 hover:bg-gray-200 transition duration-300"
      >
        &larr; Back to Dashboard
      </button>

      {/* Add or Edit Event Form */}
      <div className="container mx-auto px-4 mt-8">
        <form
          onSubmit={isEditing ? handleEditEvent : handleAddEvent}
          className="bg-gray-800 p-6 rounded-lg shadow-md mb-6"
        >
          <h2 className="text-2xl font-semibold mb-4">
            {isEditing ? "Edit Event" : "Add New Event"}
          </h2>
          <div className="mb-4">
            <label htmlFor="name" className="block text-lg font-medium mb-2">
              Event Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={isEditing ? currentEvent.name : newEvent.name}
              onChange={isEditing ? handleEditEventChange : handleNewEventChange}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="date" className="block text-lg font-medium mb-2">
              Event Date
            </label>
            <input
              type="date"
              id="date"
              name="date"
              value={isEditing ? currentEvent.date : newEvent.date}
              onChange={isEditing ? handleEditEventChange : handleNewEventChange}
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="description" className="block text-lg font-medium mb-2">
              Description
            </label>
            <textarea
              id="description"
              name="description"
              value={isEditing ? currentEvent.description : newEvent.description}
              onChange={
                isEditing ? handleEditEventChange : handleNewEventChange
              }
              className="w-full p-2 bg-gray-700 border border-gray-600 rounded-md text-white"
              required
            />
          </div>
          <div className="mb-4">
            <label htmlFor="image" className="block text-lg font-medium mb-2">
              Event Image
            </label>
            <input
              type="file"
              id="image"
              accept="image/*"
              onChange={isEditing ? handleEditEventImage : handleNewEventImage}
              className="block w-full text-sm text-gray-400 file:py-2 file:px-4 file:border-0 file:bg-gray-700 file:text-gray-200 hover:file:bg-gray-600"
            />
          </div>
          <div className="flex space-x-4">
            <button
              type="submit"
              className="bg-white text-black py-2 px-4 rounded-md hover:bg-gray-200 transition duration-300"
            >
              {isEditing ? "Save Changes" : "Add Event"}
            </button>
            {isEditing && (
              <button
                type="button"
                onClick={() => setIsEditing(false)}
                className="bg-gray-700 text-white py-2 px-4 rounded-md hover:bg-gray-600 transition duration-300"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </div>

      {/* Events List */}
      <div className="container mx-auto px-4">
        <h2 className="text-2xl font-semibold mb-4 text-center">All Events</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-gray-800 p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              {event.image && (
                <img
                  src={event.image}
                  alt={event.name}
                  className="w-full h-32 object-cover rounded-md mb-4"
                />
              )}
              <h3 className="text-xl font-semibold">{event.name}</h3>
              <p className="text-gray-400 mb-2">{event.date}</p>
              <p className="text-gray-500 mb-4">{event.description}</p>
              <Link
                to={`/events/${event.id}`}
                className="text-blue-400 hover:underline mb-4 inline-block"
              >
                View Details
              </Link>
              <div className="flex space-x-4">
                <button
                  onClick={() => openEditForm(event)}
                  className="text-blue-400 hover:underline"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDeleteEvent(event.id)}
                  className="text-red-400 hover:underline"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default ManageEvents;
