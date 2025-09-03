import React, { useState, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { Send, Mic, Paperclip } from 'lucide-react';

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  isCenter?: boolean;
}

export const ChatInput: React.FC<ChatInputProps> = ({ onSendMessage, disabled, isCenter = false }) => {
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

  const handleFocus = () => setIsFocused(true);
  const handleBlur = () => setIsFocused(false);

  return (
    <form onSubmit={handleSubmit} className="w-full group">
      <div className={`relative flex items-end bg-input/50 backdrop-blur-sm rounded-3xl border-2 shadow-lg transition-all duration-300 ease-out transform ${
        isFocused 
          ? 'border-ring/60 shadow-xl scale-[1.02] bg-input/70' 
          : 'border-border/30 hover:border-border/50 hover:shadow-md hover:scale-[1.01]'
      } ${disabled ? 'opacity-60' : ''}`}>
        
        <Button
          type="button"
          variant="ghost"
          size="icon"
          className={`absolute left-3 bottom-3 z-10 h-8 w-8 text-muted-foreground transition-all duration-300 ease-out ${
            isFocused ? 'text-foreground scale-110' : 'hover:text-foreground hover:scale-105'
          }`}
        >
          <Paperclip className="h-4 w-4 transition-transform duration-300" />
        </Button>
        
        <textarea
          ref={textareaRef}
          value={message}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholder="Let's make it Work..."
          disabled={disabled}
          rows={1}
          className={`flex-1 ${isCenter ? 'min-h-[60px]' : 'min-h-[52px]'} max-h-[120px] pl-12 pr-20 py-3 bg-transparent border-0 resize-none text-foreground placeholder:text-muted-foreground focus:outline-none ${isCenter ? 'text-lg' : 'text-base'} leading-6 overflow-hidden transition-all duration-300 ease-out placeholder:transition-colors placeholder:duration-300`}
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
            className={`h-8 w-8 text-muted-foreground transition-all duration-300 ease-out ${
              isFocused ? 'text-foreground scale-110' : 'hover:text-foreground hover:scale-105'
            }`}
          >
            <Mic className="h-4 w-4 transition-transform duration-300" />
          </Button>
          
          <Button
            type="submit"
            variant="ghost"
            size="icon"
            disabled={!message.trim() || disabled}
            className={`h-8 w-8 transition-all duration-300 ease-out ${
              message.trim() && !disabled
                ? 'text-foreground hover:text-primary hover:scale-110 hover:bg-accent/50 active:scale-95'
                : 'text-muted-foreground/50 cursor-not-allowed'
            }`}
          >
            <Send className={`h-4 w-4 transition-all duration-300 ${
              message.trim() && !disabled ? 'group-hover:translate-x-0.5' : ''
            }`} />
          </Button>
        </div>
      </div>
    </form>
  );
};