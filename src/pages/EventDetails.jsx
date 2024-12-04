import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

function EventDetails({ events, setEvents }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const event = events.find((event) => event.id === id);

  const [review, setReview] = useState("");
  const currentUser = "John Doe";

  if (!event) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-900 text-white">
        <div className="text-center">
          <h1 className="text-3xl font-bold mb-4">Event Not Found</h1>
          <button
            onClick={() => navigate("/events")}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Back to Events
          </button>
        </div>
      </div>
    );
  }

  const handleRSVP = () => {
    if (event.registeredUsers.includes(currentUser)) {
      alert("You have already registered for this event!");
      return;
    }

    if (event.registeredUsers.length >= event.maxAttendees) {
      alert("Registration is full!");
      return;
    }

    const updatedEvents = events.map((e) =>
      e.id === event.id
        ? {
            ...e,
            registeredUsers: [...e.registeredUsers, currentUser],
          }
        : e
    );
    setEvents(updatedEvents);
    alert("You have successfully registered for this event!");
  };

  const handleReviewSubmit = (e) => {
    e.preventDefault();
    if (!review.trim()) {
      alert("Review cannot be empty.");
      return;
    }

    const updatedEvents = events.map((e) =>
      e.id === event.id
        ? {
            ...e,
            reviews: [...e.reviews, { user: currentUser, comment: review }],
          }
        : e
    );
    setEvents(updatedEvents);
    setReview("");
    alert("Thank you for your feedback!");
  };

  const handleShareEvent = () => {
    const eventLink = `${window.location.origin}/events/${event.id}`;
    navigator.clipboard.writeText(eventLink).then(() => {
      alert("Event link copied to clipboard!");
    });
  };

  return (
    <div className="bg-gray-900 text-white min-h-screen py-8">
      {/* Back Button */}
      <button
        onClick={() => navigate("/events")}
        className="bg-gray-700 text-white py-2 px-4 rounded mb-4 ml-6 hover:bg-gray-600"
      >
        &larr; Back to Events
      </button>

      <div className="container mx-auto px-6">
        <div className="bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <img
            src={event.image}
            alt={event.name}
            className="w-full h-64 object-cover"
          />
          <div className="p-8">
            {/* Event Header */}
            <div className="flex justify-between items-start mb-6">
              <h1 className="text-3xl font-bold">{event.name}</h1>
              <button
                onClick={handleShareEvent}
                className="bg-green-500 text-white py-2 px-4 rounded hover:bg-green-600"
              >
                Share Event
              </button>
            </div>

            {/* Event Details */}
            <p className="text-gray-300 mb-4">{event.description}</p>
            <p className="mb-2">
              <strong>Date:</strong> {event.date}
            </p>
            <p className="mb-2">
              <strong>Location:</strong> {event.location}
            </p>
            <p className="mb-6">
              <strong>Remaining Spots:</strong>{" "}
              {event.maxAttendees - event.registeredUsers.length}
            </p>

            {/* RSVP Button */}
            <div className="mb-6">
              {event.registeredUsers.length < event.maxAttendees ? (
                <button
                  onClick={handleRSVP}
                  className={`${
                    event.registeredUsers.includes(currentUser)
                      ? "bg-gray-500 cursor-not-allowed"
                      : "bg-blue-500 hover:bg-blue-600"
                  } text-white py-2 px-6 rounded`}
                  disabled={event.registeredUsers.includes(currentUser)}
                >
                  {event.registeredUsers.includes(currentUser)
                    ? "Already Registered"
                    : "RSVP for Event"}
                </button>
              ) : (
                <p className="text-red-400 text-lg font-semibold">
                  Registration is full!
                </p>
              )}
            </div>

            {/* Registered Users */}
            <div className="mb-6">
              <h2 className="text-2xl font-semibold">Registered Users</h2>
              <ul className="list-disc list-inside mt-4">
                {event.registeredUsers.length > 0 ? (
                  event.registeredUsers.map((user, index) => (
                    <li key={index} className="text-gray-300">
                      {user}
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500">No one has registered yet.</p>
                )}
              </ul>
            </div>

            {/* Reviews Section */}
            <div>
              <h2 className="text-2xl font-semibold">Reviews</h2>
              <ul className="space-y-4 mt-4">
                {event.reviews.length > 0 ? (
                  event.reviews.map((review, index) => (
                    <li
                      key={index}
                      className="bg-gray-700 p-4 rounded shadow-md"
                    >
                      <p>
                        <strong>{review.user}</strong>: {review.comment}
                      </p>
                    </li>
                  ))
                ) : (
                  <p className="text-gray-500">No reviews yet. Be the first!</p>
                )}
              </ul>

              {/* Add Review Form */}
              <form
                onSubmit={handleReviewSubmit}
                className="mt-6 bg-gray-700 p-4 rounded shadow"
              >
                <textarea
                  value={review}
                  onChange={(e) => setReview(e.target.value)}
                  placeholder="Write your review here..."
                  className="w-full p-2 border rounded bg-gray-800 text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                  rows="3"
                />
                <button
                  type="submit"
                  className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                  Submit Review
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default EventDetails;
