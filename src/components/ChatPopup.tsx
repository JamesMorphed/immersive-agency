import React, { useState, useRef, useEffect } from 'react';
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogClose } from './ui/dialog';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { X } from 'lucide-react';

const N8N_WEBHOOK_URL = 'http://n8n-immersive-insights-dev.captain.digitalpfizer.com/webhook/immersive-ai';

const getSessionId = () => {
  let sessionId = localStorage.getItem('immersive_ai_session_id');
  if (!sessionId) {
    sessionId = Math.random().toString(36).substring(2) + Date.now();
    localStorage.setItem('immersive_ai_session_id', sessionId);
  }
  return sessionId;
};

const ChatPopup = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: 'user' | 'ai'; text: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const sessionId = getSessionId();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (open && messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, open]);

  const sendMessage = async () => {
    if (!input.trim()) return;
    setMessages((msgs) => [...msgs, { sender: 'user', text: input }]);
    setLoading(true);
    try {
      const res = await fetch(N8N_WEBHOOK_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input, sessionId }),
      });
      const data = await res.json();
      setMessages((msgs) => [...msgs, { sender: 'ai', text: data.output || 'No response.' }]);
    } catch (err) {
      setMessages((msgs) => [...msgs, { sender: 'ai', text: 'Sorry, there was an error.' }]);
    } finally {
      setLoading(false);
      setInput('');
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="fixed bottom-6 right-6 z-50 rounded-full bg-cyberpunk-magenta text-white shadow-lg w-16 h-16 text-2xl flex items-center justify-center hover:bg-cyberpunk-cyan transition-all">
          💬
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md p-0 border-2 border-cyberpunk-magenta/70 shadow-2xl fixed bottom-24 right-6 m-0 rounded-2xl overflow-hidden bg-black/60 backdrop-blur-lg" style={{boxShadow: '0 8px 32px 0 rgba(51,102,255,0.25), 0 0 0 2px #FF37BB55'}}>
        {/* Header Bar */}
        <div className="flex items-center justify-between px-6 py-3 bg-gradient-to-r from-cyberpunk-magenta/80 via-cyberpunk-cyan/60 to-black/60 border-b border-cyberpunk-magenta/40">
          <DialogTitle className="text-lg font-bold text-white tracking-wide">Chat with Immersive AI</DialogTitle>
          <DialogClose asChild>
            <button className="rounded-full p-1 hover:bg-cyberpunk-magenta/30 focus:outline-none focus:ring-2 focus:ring-cyberpunk-magenta">
              <X className="h-5 w-5 text-white" />
              <span className="sr-only">Close</span>
            </button>
          </DialogClose>
        </div>
        {/* Chat Area */}
        <div className="flex flex-col h-96 bg-black/40 px-4 py-3 overflow-y-auto" style={{backdropFilter: 'blur(8px)'}}>
          {messages.length === 0 && <div className="text-gray-400 text-center my-auto">How can I help you today?</div>}
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`text-sm px-4 py-2 my-1 rounded-2xl max-w-[80%] shadow-md animate-fade-in ${
                msg.sender === 'user'
                  ? 'bg-cyberpunk-magenta text-white self-end rounded-br-md'
                  : 'bg-gray-900/80 text-cyberpunk-cyan self-start rounded-bl-md border border-cyberpunk-cyan/30'
              }`}
              style={{transition: 'all 0.2s'}}
            >
              {msg.text}
            </div>
          ))}
          {loading && <div className="text-xs text-gray-400 self-start animate-pulse">AI is typing...</div>}
          <div ref={messagesEndRef} />
        </div>
        {/* Input Area */}
        <form
          className="flex items-center gap-2 border-t border-cyberpunk-magenta/30 bg-black/70 px-4 py-3"
          onSubmit={e => {
            e.preventDefault();
            sendMessage();
          }}
        >
          <Input
            className="flex-1 bg-black/60 text-white border border-cyberpunk-magenta/40 rounded-full px-4 py-2 focus:border-cyberpunk-magenta focus:ring-cyberpunk-magenta/40 shadow-sm"
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            disabled={loading}
            autoFocus
            style={{minWidth: 0}}
          />
          <Button
            type="submit"
            className="bg-cyberpunk-magenta hover:bg-cyberpunk-cyan text-white font-semibold rounded-full px-6 py-2 shadow-md transition-all"
            disabled={loading || !input.trim()}
            style={{minWidth: 80}}
          >
            Send
          </Button>
        </form>
        <style>{`
          .animate-fade-in {
            animation: fadeIn 0.3s;
          }
          @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
          }
        `}</style>
      </DialogContent>
    </Dialog>
  );
};

export default ChatPopup; 