'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import { submitFeedback, validateInvitationToken } from '@/lib/api';

interface CustomError {
  response?: {
    data?: {
      message?: string;
    };
  };
  message?: string;
}

export default function FeedbackFormPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <FeedbackFormContent />
    </Suspense>
  );
}

function FeedbackFormContent() {
  const [content, setContent] = useState('');
  const [isAnonymous, setIsAnonymous] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const searchParams = useSearchParams();
  const token = searchParams.get('token');

 useEffect(() => {
  const validateToken = async () => {
    if (!token) {
      setStatus('error');
      setErrorMessage('Invalid or missing token.');
      return;
    }

    try {
      await validateInvitationToken(token); 
    } catch {
      setStatus('error');
      setErrorMessage('This feedback link is invalid or has already been used.');
    }
  };

  validateToken();
}, [token]);


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

  if (!isAnonymous && !userEmail.trim()) {
    setStatus('error');
    setErrorMessage('Please provide your email address or submit anonymously.');
    return;
  }

  try {
    setSubmitting(true);
    setStatus('idle');

    await submitFeedback({
      token,
      message: content,
      isAnonymous,
      email: isAnonymous ? undefined : userEmail.trim(),
    });

    setStatus('success');
    setContent('');
    setUserEmail('');
    setIsAnonymous(false);
  } catch (error: unknown) {
    setStatus('error');
    const errorMsg =
      (typeof error === 'object' &&
        error !== null &&
        'response' in error &&
        (error as CustomError).response?.data?.message) ||
      (error as Error).message ||
      'Server error.';
    setErrorMessage(errorMsg);
  } finally {
    setSubmitting(false);
  }
};

  if (status === 'error') {
    return <p className="text-red-600 text-center mt-10">{errorMessage}</p>;
  }

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

      <div className="flex items-center gap-2 mb-3">
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

      {!isAnonymous && (
        <input
          type="email"
          value={userEmail}
          onChange={(e) => setUserEmail(e.target.value)}
          placeholder="Your email address"
          className="w-full border p-3 rounded mb-3"
        />
      )}

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
    </div>
  );
}
