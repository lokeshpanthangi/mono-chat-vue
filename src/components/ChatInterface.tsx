import React, { useState } from 'react';
import { ChatInput } from './ChatInput';
import { MessageList } from './MessageList';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

export const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleSendMessage = async (text: string) => {
    const userMessage: Message = {
      id: Date.now().toString(),
      text,
      isUser: true,
    };

    setMessages(prev => [...prev, userMessage]);
    setIsLoading(true);

    // Simulate AI response
    setTimeout(() => {
      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        text: "I'm a simple AI assistant. I can help you with various tasks. What would you like to know?",
        isUser: false,
      };
      setMessages(prev => [...prev, aiMessage]);
      setIsLoading(false);
    }, 1000);
  };

  const hasMessages = messages.length > 0;

  return (
    <div className="flex flex-col min-h-screen bg-background">
      <div className="flex-1 flex flex-col">
        {!hasMessages ? (
          <div className="flex-1 flex items-center justify-center px-4">
            <div className="text-center max-w-2xl w-full">
              <h1 className="text-4xl font-medium text-foreground mb-8">
                What can I help with?
              </h1>
            </div>
          </div>
        ) : (
          <div className="flex-1 overflow-hidden">
            <MessageList messages={messages} isLoading={isLoading} />
          </div>
        )}
        
        <div className={`${hasMessages ? 'border-t border-border' : ''}`}>
          <div className="max-w-4xl mx-auto p-4">
            <ChatInput onSendMessage={handleSendMessage} disabled={isLoading} />
          </div>
        </div>
      </div>
    </div>
  );
};