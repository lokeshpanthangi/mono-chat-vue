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

    // Move input to bottom after first message with smooth transition
    if (inputPosition === 'center') {
      setTimeout(() => setInputPosition('bottom'), 150);
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
    const fullResponse = "I'm Shravan GPT, your AI assistant. I can help you with various tasks and answer your questions. What would you like to know more about?";
    
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
    <div className="relative z-10 flex flex-col h-screen overflow-hidden">
      {inputPosition === 'center' && (
        <div className="flex-1 flex items-center justify-center px-4 transition-all duration-700 ease-out">
          <div className="text-center max-w-2xl w-full animate-fade-in">
            <h1 className="text-4xl font-medium text-foreground mb-8 transition-all duration-500">
              What can I help with?
            </h1>
            <div className="transform transition-all duration-500 ease-out scale-110">
              <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} isCenter={true} />
            </div>
          </div>
        </div>
      )}
      
      {inputPosition === 'bottom' && (
        <>
          <div className="flex-1 overflow-hidden animate-slide-in-from-top">
            <MessageList messages={messages} isLoading={false} />
          </div>
          
          <div className="flex-shrink-0 border-t border-border/20 bg-background/80 backdrop-blur-sm animate-slide-in-from-bottom">
            <div className="max-w-4xl mx-auto p-4 transform transition-all duration-500 ease-out">
              <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} isCenter={false} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};