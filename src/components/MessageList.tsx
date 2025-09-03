import React from 'react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
}

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
  return (
    <div className="flex-1 overflow-y-auto">
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {messages.map((message) => (
          <div key={message.id} className="flex items-start gap-4">
            {!message.isUser && (
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-1">
                <div className="w-4 h-4 bg-foreground/60 rounded-sm"></div>
              </div>
            )}
            
            <div className={`flex-1 ${message.isUser ? 'text-right' : 'text-left'}`}>
              {message.isUser && (
                <div className="text-sm font-medium text-muted-foreground mb-1">You</div>
              )}
              <div className={`inline-block max-w-none ${
                message.isUser 
                  ? 'bg-accent text-accent-foreground rounded-2xl rounded-br-md px-4 py-3' 
                  : 'text-foreground'
              }`}>
                {message.text}
              </div>
            </div>

            {message.isUser && (
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 mt-1 text-sm font-medium">
                U
              </div>
            )}
          </div>
        ))}
        
        {isLoading && (
          <div className="flex items-start gap-4">
            <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-1">
              <div className="w-4 h-4 bg-foreground/60 rounded-sm"></div>
            </div>
            <div className="flex-1">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};