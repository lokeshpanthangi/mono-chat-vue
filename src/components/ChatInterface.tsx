import React, { useState } from 'react';
import { ChatInput } from './ChatInput';
import { MessageList } from './MessageList';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  isStreaming?: boolean;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [inputPosition, setInputPosition] = useState<'center' | 'bottom'>('center');

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Move input to bottom after first message
    if (inputPosition === 'center') {
      setInputPosition('bottom');
    }

    // Create AI message placeholder
    const aiMessageId = (Date.now() + 1).toString();
    const aiMessage: Message = {
      id: aiMessageId,
      text: '',
      isUser: false,
      isStreaming: true,
    };

    setMessages(prev => [...prev, aiMessage]);

    // Simulate streaming response
    const fullResponse = "I'm a simple AI assistant. I can help you with various tasks and answer your questions. What would you like to know more about?";
    
    setTimeout(() => {
      setIsLoading(false);
      
      // Stream the response word by word
      const words = fullResponse.split(' ');
      let currentWordIndex = 0;
      
      const streamInterval = setInterval(() => {
        const currentText = words.slice(0, currentWordIndex + 1).join(' ');
        
        setMessages(prev => 
          prev.map(msg => 
            msg.id === aiMessageId 
              ? { ...msg, text: currentText }
              : msg
          )
        );
        
        currentWordIndex++;
        
        if (currentWordIndex >= words.length) {
          clearInterval(streamInterval);
          setMessages(prev => 
            prev.map(msg => 
              msg.id === aiMessageId 
                ? { ...msg, isStreaming: false }
                : msg
            )
          );
        }
      }, 100);
    }, 800);
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="flex flex-col min-h-screen bg-background transition-all duration-500">
      <div className="flex-1 flex flex-col">
        {inputPosition === 'center' && (
          <div className="flex-1 flex items-center justify-center px-4">
            <div className="text-center max-w-2xl w-full animate-fade-in">
              <h1 className="text-4xl font-medium text-foreground mb-8">
                What can I help with?
              </h1>
              <div className="animate-pulse-glow">
                <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
              </div>
            </div>
          </div>
        )}
        
        {inputPosition === 'bottom' && (
          <>
            <div className="flex-1 overflow-hidden animate-slide-down">
              <MessageList messages={messages} isLoading={isLoading} />
            </div>
            
            <div className="animate-slide-down">
              <div className="max-w-4xl mx-auto p-4">
                <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};