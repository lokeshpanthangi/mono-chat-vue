import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Send, Mic, Paperclip } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled }) => {
  const [message, setMessage] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (message.trim() && !disabled) {
      onSendMessage(message);
      setMessage('');
      if (textareaRef.current) {
        textareaRef.current.style.height = 'auto';
      }
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setMessage(e.target.value);
    
    // Auto-resize textarea
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
      textareaRef.current.style.height = `${Math.min(textareaRef.current.scrollHeight, 120)}px`;
    }
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className={`relative flex items-end bg-input rounded-3xl border border-border shadow-lg transition-all duration-300 ${
        isFocused ? 'border-ring shadow-xl scale-[1.02]' : 'hover:shadow-xl hover:scale-[1.01]'
      } ${disabled ? 'opacity-60' : ''}`}>
        
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className="absolute left-3 bottom-3 z-10 h-8 w-8 text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110"
        >
          <Paperclip className="h-4 w-4" />
        </Button>
        
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          placeholder="Ask anything"
          disabled={disabled}
          rows={1}
          className="flex-1 min-h-[52px] max-h-[120px] pl-12 pr-20 py-3 bg-transparent border-0 resize-none text-foreground placeholder:text-muted-foreground focus:outline-none text-base leading-6 overflow-hidden transition-all duration-200"
          style={{ 
            scrollbarWidth: 'none',
            msOverflowStyle: 'none',
          }}
        />
        
        <div className="absolute right-3 bottom-3 flex items-center gap-1">
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-muted-foreground hover:text-foreground transition-all duration-200 hover:scale-110"
          >
            <Mic className="h-4 w-4" />
          </Button>
          
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            disabled={!message.trim() || disabled}
            className={`h-8 w-8 transition-all duration-200 ${
              message.trim() && !disabled
                ? 'text-foreground hover:text-primary hover:scale-110 hover:bg-accent'
                : 'text-muted-foreground/50 cursor-not-allowed'
            }`}
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </form>
  );
};