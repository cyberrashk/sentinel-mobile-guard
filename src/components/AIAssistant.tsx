
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Shield, User, Zap } from 'lucide-react';

const AIAssistant = () => {
  const [messages, setMessages] = useState([
    {
      id: 1,
      type: 'bot',
      content: "Hi! I'm your AI security assistant. I can help explain threats, analyze apps, and provide security recommendations. What would you like to know?",
      time: '2:30 PM'
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');

  const suggestedQuestions = [
    "Why is this app risky?",
    "How to protect against phishing?",
    "What is ransomware?",
    "Is my device secure?"
  ];

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    const newMessage = {
      id: messages.length + 1,
      type: 'user',
      content: inputMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };

    setMessages([...messages, newMessage]);
    setInputMessage('');

    // Simulate AI response
    setTimeout(() => {
      const botResponse = {
        id: messages.length + 2,
        type: 'bot',
        content: "I understand your concern. Let me analyze this for you. Based on my security database, I can provide detailed information about potential risks and recommend appropriate security measures.",
        time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
      };
      setMessages(prev => [...prev, botResponse]);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center flex items-center justify-center">
            <Shield className="h-6 w-6 mr-2 text-primary" />
            AI Security Assistant
          </CardTitle>
          <p className="text-center text-muted-foreground">Get instant answers to your security questions</p>
        </CardHeader>
      </Card>

      <Card className="bg-card/50 backdrop-blur-sm border-border h-96">
        <CardContent className="p-0 h-full flex flex-col">
          {/* Chat Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div className={`flex items-start space-x-2 max-w-[80%] ${message.type === 'user' ? 'flex-row-reverse space-x-reverse' : ''}`}>
                  <div className={`p-2 rounded-full ${message.type === 'user' ? 'bg-primary/20' : 'bg-secondary/20'}`}>
                    {message.type === 'user' ? (
                      <User className="h-4 w-4 text-primary" />
                    ) : (
                      <Shield className="h-4 w-4 text-primary" />
                    )}
                  </div>
                  <div className={`p-3 rounded-lg ${message.type === 'user' ? 'bg-primary/20 text-primary-foreground' : 'bg-secondary/20'}`}>
                    <p className="text-sm">{message.content}</p>
                    <p className="text-xs text-muted-foreground mt-1">{message.time}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Input Area */}
          <div className="p-4 border-t border-border">
            <div className="flex space-x-2">
              <Input
                placeholder="Ask about security concerns..."
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                className="bg-secondary/20 border-border"
              />
              <Button onClick={handleSendMessage} className="bg-primary/20 hover:bg-primary/30">
                <Zap className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Suggested Questions */}
      <Card className="bg-card/50 backdrop-blur-sm border-border">
        <CardContent className="p-4">
          <h3 className="text-sm font-medium mb-3 text-muted-foreground">Suggested Questions</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {suggestedQuestions.map((question, index) => (
              <Button
                key={index}
                variant="outline"
                size="sm"
                onClick={() => setInputMessage(question)}
                className="text-left justify-start h-auto p-3 border-border/50 hover:border-primary/30"
              >
                {question}
              </Button>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default AIAssistant;
