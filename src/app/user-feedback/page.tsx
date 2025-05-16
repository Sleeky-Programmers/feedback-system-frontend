'use client';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
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
  const [submitting, setSubmitting] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [isClient, setIsClient] = useState(false);
  const searchParams = useSearchParams();
    
    useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div>Loading...</div>;
  }

  const token = searchParams.get('token');




  

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
  } catch (error: unknown) {
  setStatus('error');
  const errorMsg = 
    (typeof error === 'object' && error !== null && 'response' in error) 
      ? (error as CustomError).response?.data?.message || (error as unknown as Error).message
      : error instanceof Error 
        ? error.message 
        : 'Server error.';
  setErrorMessage(errorMsg);
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
