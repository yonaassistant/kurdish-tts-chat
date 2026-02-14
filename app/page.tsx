'use client';

import { useState, useRef } from 'react';

const VERSION = '1.0.1';

export default function Home() {
  const [text, setText] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string; timestamp: Date }>>([]);
  const audioRef = useRef<HTMLAudioElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsLoading(true);
    const newMessage = { text: text.trim(), timestamp: new Date() };
    setMessages(prev => [...prev, newMessage]);

    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: text.trim(), lang: 'ckb' }),
      });

      if (!response.ok) throw new Error('Failed to generate speech');

      const blob = await response.blob();
      const audioUrl = URL.createObjectURL(blob);
      
      if (audioRef.current) {
        audioRef.current.src = audioUrl;
        audioRef.current.play();
      }

      setText('');
    } catch (error) {
      console.error('Error:', error);
      alert('Failed to generate speech. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-2 sm:p-4">
      <div className="max-w-2xl mx-auto pt-4 sm:pt-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-4 sm:p-6 text-white">
            <div className="flex justify-between items-start">
              <div>
                <h1 className="text-2xl sm:text-3xl font-bold mb-2">🎤 Kurdish TTS Chat</h1>
                <p className="text-blue-100 text-sm sm:text-base">Type in Kurdish and hear it spoken!</p>
              </div>
              <span className="text-xs text-blue-200 bg-blue-700 px-2 py-1 rounded">v{VERSION}</span>
            </div>
          </div>

          {/* Messages */}
          <div className="p-3 sm:p-6 space-y-3 h-64 sm:h-96 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="text-center text-gray-400 py-8 sm:py-12">
                <p className="text-base sm:text-lg">سڵاو! Start typing to hear Kurdish speech...</p>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className="bg-blue-50 rounded-lg p-3 sm:p-4 border-l-4 border-blue-500"
                >
                  <p className="text-gray-900 text-base sm:text-lg font-medium">{msg.text}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {msg.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-3 sm:p-6 border-t bg-gray-50">
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="بنووسە... (Type in Kurdish)"
                disabled={isLoading}
                className="flex-1 px-3 sm:px-4 py-3 border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100 text-base sm:text-lg font-medium text-gray-900"
                dir="rtl"
              />
              <button
                type="submit"
                disabled={isLoading || !text.trim()}
                className="w-full sm:w-auto px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors text-base sm:text-lg whitespace-nowrap"
              >
                {isLoading ? '🔊 Loading...' : '🔊 Speak'}
              </button>
            </div>
          </form>
        </div>

        {/* Footer */}
        <div className="text-center text-gray-500 text-xs sm:text-sm mt-4">
          <p>Powered by razhan/mms-tts-ckb • Kurdish (Sorani) TTS</p>
        </div>

        {/* Hidden audio element */}
        <audio ref={audioRef} className="hidden" />
      </div>
    </main>
  );
}
