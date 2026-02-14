'use client';

import { useState, useRef } from 'react';

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
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-2xl mx-auto pt-8">
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-6 text-white">
            <h1 className="text-3xl font-bold mb-2">🎤 Kurdish TTS Chat</h1>
            <p className="text-blue-100">Type in Kurdish and hear it spoken!</p>
          </div>

          {/* Messages */}
          <div className="p-6 space-y-3 h-96 overflow-y-auto">
            {messages.length === 0 ? (
              <div className="text-center text-gray-400 py-12">
                <p className="text-lg">سڵاو! Start typing to hear Kurdish speech...</p>
              </div>
            ) : (
              messages.map((msg, idx) => (
                <div
                  key={idx}
                  className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-500"
                >
                  <p className="text-gray-800 text-lg">{msg.text}</p>
                  <p className="text-xs text-gray-500 mt-1">
                    {msg.timestamp.toLocaleTimeString()}
                  </p>
                </div>
              ))
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={handleSubmit} className="p-6 border-t">
            <div className="flex gap-3">
              <input
                type="text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="بنووسە... (Type in Kurdish)"
                disabled={isLoading}
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 text-lg"
                dir="rtl"
              />
              <button
                type="submit"
                disabled={isLoading || !text.trim()}
                className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-300 disabled:cursor-not-allowed transition-colors"
              >
                {isLoading ? '🔊...' : '🔊 Speak'}
              </button>
            </div>
          </form>
        </div>

        {/* Hidden audio element */}
        <audio ref={audioRef} className="hidden" />
      </div>
    </main>
  );
}
