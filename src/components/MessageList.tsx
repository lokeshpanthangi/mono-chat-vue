import React from 'react';

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  isStreaming?: boolean;
}

interface MessageListProps {
  messages: Message[];
  isLoading: boolean;
}

export const MessageList: React.FC<MessageListProps> = ({ messages, isLoading }) => {
  return (
    <div className="h-full overflow-y-auto scrollbar-custom">
      <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
        {messages.map((message, index) => (
          <div 
            key={message.id} 
            className={`flex items-start gap-4 animate-fade-in transform transition-all duration-300 hover:scale-[1.01]`}
            style={{ animationDelay: `${index * 0.1}s` }}
          >
            {!message.isUser && (
              <div className="w-8 h-8 rounded-full bg-accent flex items-center justify-center flex-shrink-0 mt-1 transition-all duration-200 hover:scale-110">
                <div className="w-4 h-4 bg-foreground/60 rounded-sm"></div>
              </div>
            )}
            
            <div className={`flex-1 ${message.isUser ? 'text-right' : 'text-left'}`}>
              {message.isUser && (
                <div className="text-sm font-medium text-muted-foreground mb-1">You</div>
              )}
              {!message.isUser && (
                <div className="text-sm font-medium text-primary mb-1">Shravan GPT</div>
              )}
              <div className={`inline-block max-w-none transition-all duration-300 ${
                message.isUser 
                  ? 'bg-accent text-accent-foreground rounded-2xl rounded-br-md px-4 py-3 hover:bg-accent/80' 
                  : 'text-foreground'
              }`}>
                {message.text ? message.text : (message.isStreaming ? (
                  <div className="flex space-x-1 py-2">
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
                    <div className="w-2 h-2 bg-muted-foreground rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
                  </div>
                ) : null)}
              </div>
            </div>

            {message.isUser && (
              <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center flex-shrink-0 mt-1 text-sm font-medium transition-all duration-200 hover:scale-110">
                U
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};