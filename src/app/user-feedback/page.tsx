'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';


export default function FeedbackFormPage() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async () => {
    if (!token) {
      setStatus('error');
      setErrorMessage('Invalid or missing token.');
      return;
    }

    if (!content.trim()) {
      setStatus('error');
      setErrorMessage('Feedback cannot be empty.');
      return;
    }

    try {
      setSubmitting(true);
      setStatus('idle');

      const response = await axios.post('/api/feedback/submit', {
        token,
        content,
        isAnonymous,
      });

      if (response.status === 200) {
        setStatus('success');
        setContent('');
        setIsAnonymous(false);
      } else {
        setStatus('error');
        setErrorMessage('Something went wrong.');
      }
    } catch (err: any) {
      setStatus('error');
      setErrorMessage(err?.response?.data?.message || 'Server error.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white text-gray-700 shadow-md rounded-lg border">
      <h1 className="text-2xl font-bold mb-4">Submit Feedback</h1>

      <textarea
        rows={5}
        className="w-full border p-3 rounded mb-3"
        placeholder="Write your feedback here..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />

      <div className="flex items-center gap-2 mb-4">
        <input
          type="checkbox"
          checked={isAnonymous}
          onChange={(e) => setIsAnonymous(e.target.checked)}
          id="anonymous"
        />
        <label htmlFor="anonymous" className="text-sm text-gray-600">
          Submit anonymously
        </label>
      </div>

      <button
        disabled={submitting}
        onClick={handleSubmit}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 disabled:opacity-50"
      >
        {submitting ? 'Submitting...' : 'Submit Feedback'}
      </button>

      {status === 'success' && (
        <p className="text-green-600 mt-4">Feedback submitted successfully.</p>
      )}
      {status === 'error' && (
        <p className="text-red-600 mt-4">{errorMessage}</p>
      )}
    </div>
  );
}
