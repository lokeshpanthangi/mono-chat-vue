import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Send, Mic } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative flex items-end bg-input rounded-3xl border border-border shadow-sm">
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute left-3 bottom-3 z-10 h-8 w-8 text-muted-foreground hover:text-foreground"
        >
          <div className="w-4 h-4 rounded-full bg-muted-foreground/20 flex items-center justify-center">
            <span className="text-xs font-medium">+</span>
          </div>
        </Button>
        
        <Textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Ask anything"
          disabled={disabled}
          className="flex-1 min-h-[52px] max-h-32 pl-12 pr-20 py-3 bg-transparent border-0 resize-none text-foreground placeholder:text-muted-foreground focus-visible:ring-0 focus-visible:ring-offset-0"
        />
        
        <div className="absolute right-3 bottom-3 flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground"
          >
            <Mic className="h-4 w-4" />
          </Button>
          
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            disabled={!message.trim() || disabled}
            className="h-8 w-8 text-muted-foreground hover:text-foreground disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </form>
  );
};