import React, { useState } from 'react';
import './App.css';

function App() {
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const [feedbacks, setFeedbacks] = useState([]);
  const [showFeedbacks, setShowFeedbacks] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/feedback', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, feedback }),
      });

      if (response.ok) {
        alert('Feedback submitted successfully!');
        setName('');
        setFeedback('');
      } else {
        alert('Failed to submit feedback.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while submitting feedback.');
    }
  };

  const handleShowFeedbacks = async () => {
    try {
      const response = await fetch('http://127.0.0.1:8000/api/v1/feedback', {
        method: 'GET',
      });

      if (response.ok) {
        const result = await response.json();
        setFeedbacks(result.data.feedbacks);
        setShowFeedbacks(true);
      } else {
        alert('Failed to fetch feedbacks.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while fetching feedbacks.');
    }
  };

  const handleHideFeedbacks = () => {
    setShowFeedbacks(false);
  };

  return (
    <div className="container">
      <h1>Feedback Page</h1>
      <div className="form-container">
        <h2>Submit Feedback</h2>
        <form id="feedback-form" onSubmit={handleSubmit}>
          <input
            type="text"
            id="feedback-name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
          <textarea
            id="feedback-text"
            placeholder="Enter your feedback here..."
            value={feedback}
            onChange={(e) => setFeedback(e.target.value)}
            required
          ></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
      <div className="buttons">
        <button id="show-feedbacks" onClick={handleShowFeedbacks}>
          Show Feedbacks
        </button>
        {showFeedbacks && (
          <button id="hide-feedbacks" onClick={handleHideFeedbacks}>
            Hide Feedbacks
          </button>
        )}
      </div>
      {showFeedbacks && (
        <div className="feedback-list" id="feedback-list">
          {feedbacks.map((fb, index) => (
            <div className="feedback-item" key={index}>
              <strong>{fb.name}</strong>: {fb.feedback}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
