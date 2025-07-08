
import { useState, useRef, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { MessageCircle, Send, Bot, User, Minimize2, Maximize2, X } from "lucide-react";
import { useTranslation } from 'react-i18next';
import { generateAIResponse } from '@/utils/chatbotAI';

interface Message {
  id: string;
  content: string;
  sender: 'user' | 'bot';
  timestamp: Date;
}

export function Chatbot() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      content: `Welcome to DRONA! I'm your AI assistant here to help you learn about our Defence Ready Operations for Networked Aircrafts system. Ask me anything about aircraft health monitoring, threat detection, or mission readiness capabilities!`,
      sender: 'bot',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const [isMaximized, setIsMaximized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const aiResponse = await generateAIResponse(inputMessage);
      const botMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: aiResponse,
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (error) {
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        content: "I apologize, but I'm having trouble connecting right now. However, I can still help you learn about DRONA's capabilities! Try asking about our aircraft monitoring features, threat detection systems, or mission readiness tools.",
        sender: 'bot',
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      // Focus back to input after sending
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([{
      id: '1',
      content: `Welcome to DRONA! I'm your AI assistant here to help you learn about our Defence Ready Operations for Networked Aircrafts system. Ask me anything about aircraft health monitoring, threat detection, or mission readiness capabilities!`,
      sender: 'bot',
      timestamp: new Date()
    }]);
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsMinimized(false)}
          className="h-14 w-14 rounded-full bg-blue-600 hover:bg-blue-700 text-white shadow-lg pulse-glow"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      </div>
    );
  }

  const chatWidth = isMaximized ? 'w-full max-w-4xl' : 'w-96';
  const chatHeight = isMaximized ? 'h-[80vh]' : 'h-[600px]';

  return (
    <div className={`fixed ${isMaximized ? 'inset-4' : 'bottom-4 right-4'} z-50 ${chatWidth} ${chatHeight} max-h-[90vh]`}>
      <Card className="bg-slate-800/95 border-slate-700 backdrop-blur-sm h-full flex flex-col shadow-2xl">
        <CardHeader className="pb-3 flex-shrink-0 border-b border-slate-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center">
                <Bot className="h-5 w-5 text-white" />
              </div>
              <div>
                <CardTitle className="text-white text-lg">DRONA AI Assistant</CardTitle>
                <div className="flex items-center gap-2 mt-1">
                  <Badge variant="outline" className="border-green-500 text-green-400 text-xs">
                    Online
                  </Badge>
                  <span className="text-xs text-slate-400">
                    {messages.length - 1} messages
                  </span>
                </div>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={clearChat}
                className="text-slate-400 hover:text-white h-8 w-8 p-0"
                title="Clear chat"
              >
                <X className="h-4 w-4" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMaximized(!isMaximized)}
                className="text-slate-400 hover:text-white h-8 w-8 p-0"
                title={isMaximized ? "Minimize" : "Maximize"}
              >
                {isMaximized ? <Minimize2 className="h-4 w-4" /> : <Maximize2 className="h-4 w-4" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(true)}
                className="text-slate-400 hover:text-white h-8 w-8 p-0"
                title="Minimize to tray"
              >
                <Minimize2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardHeader>
        
        <CardContent className="flex-1 flex flex-col p-0 overflow-hidden">
          <ScrollArea className="flex-1 px-4 py-2">
            <div className="space-y-4 pb-4">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex gap-3 ${message.sender === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  {message.sender === 'bot' && (
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <Bot className="h-4 w-4 text-white" />
                    </div>
                  )}
                  <div
                    className={`max-w-[85%] p-3 rounded-lg text-sm leading-relaxed ${
                      message.sender === 'user'
                        ? 'bg-blue-600 text-white ml-auto rounded-br-sm'
                        : 'bg-slate-700 text-slate-100 rounded-bl-sm'
                    } hover:shadow-md transition-shadow`}
                  >
                    <div className="whitespace-pre-wrap">{message.content}</div>
                    <div className={`text-xs mt-2 opacity-70 ${
                      message.sender === 'user' ? 'text-blue-100' : 'text-slate-400'
                    }`}>
                      {message.timestamp.toLocaleTimeString([], { 
                        hour: '2-digit', 
                        minute: '2-digit' 
                      })}
                    </div>
                  </div>
                  {message.sender === 'user' && (
                    <div className="w-8 h-8 bg-slate-600 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <User className="h-4 w-4 text-white" />
                    </div>
                  )}
                </div>
              ))}
              {isLoading && (
                <div className="flex gap-3 animate-fade-in">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-full flex items-center justify-center mt-1">
                    <Bot className="h-4 w-4 text-white" />
                  </div>
                  <div className="bg-slate-700 p-3 rounded-lg rounded-bl-sm">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                      <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>
          
          <div className="flex gap-2 p-4 border-t border-slate-700 bg-slate-800/50">
            <Input
              ref={inputRef}
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask about DRONA capabilities..."
              className="flex-1 bg-slate-700 border-slate-600 text-white placeholder-slate-400 focus:border-blue-500 focus:ring-blue-500"
              disabled={isLoading}
              autoFocus
            />
            <Button
              onClick={handleSendMessage}
              disabled={isLoading || !inputMessage.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:opacity-50 transition-all duration-200 hover:scale-105"
            >
              <Send className="h-4 w-4" />
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
