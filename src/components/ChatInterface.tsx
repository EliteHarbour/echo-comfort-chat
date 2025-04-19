import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Avatar } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Loader2, Send, User, Bot, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { generateChatResponse, Message } from "@/lib/api";
import { useToast } from "@/hooks/use-toast";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Progress } from "@/components/ui/progress";

const INITIAL_MESSAGE: Message = {
  role: "system",
  content: "You are EchoComfort AI, a compassionate and supportive mental health assistant. Your purpose is to provide empathetic guidance, coping strategies, and emotional support. You are not a licensed therapist, and you should make that clear when appropriate. Always prioritize the user's wellbeing, suggest professional help when necessary, and maintain a warm, understanding tone."
};

const WELCOME_MESSAGE: Message = {
  role: "assistant",
  content: "Hi there! I'm your EchoComfort AI assistant. I'm here to listen and provide support for whatever you're going through. What's on your mind today?"
};

const ERROR_MESSAGE: Message = {
  role: "assistant",
  content: "I'm having trouble connecting to my knowledge base right now. This could be due to high demand or a temporary service disruption. Please try again in a moment, or you can continue typing and I'll respond when the connection is restored."
};

const ChatInterface = () => {
  const [messages, setMessages] = useState<Message[]>([WELCOME_MESSAGE]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [connectionError, setConnectionError] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Store chat history in localStorage
  useEffect(() => {
    const storedMessages = localStorage.getItem("chatMessages");
    if (storedMessages) {
      try {
        const parsedMessages = JSON.parse(storedMessages);
        if (Array.isArray(parsedMessages) && parsedMessages.length > 0) {
          setMessages(parsedMessages);
        }
      } catch (error) {
        console.error("Failed to parse stored messages:", error);
      }
    }
  }, []);

  // Save messages to localStorage whenever they change
  useEffect(() => {
    if (messages.length > 0) {
      localStorage.setItem("chatMessages", JSON.stringify(messages));
    }
  }, [messages]);

  // Improved scroll to bottom function that works more reliably
  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      const messagesContainer = scrollContainer?.lastElementChild;
      
      if (messagesContainer && messagesEndRef.current) {
        setTimeout(() => {
          messagesEndRef.current?.scrollIntoView({
            behavior: "smooth",
            block: "end",
          });
        }, 100);
      }
    }
  };

  // Scroll to bottom when messages change
  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!input.trim()) return;
    
    const userMessage: Message = { role: "user", content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setIsLoading(true);
    setConnectionError(false);

    try {
      // Prepare conversation history for the API
      const conversationHistory = [
        INITIAL_MESSAGE,
        ...messages.filter(msg => msg.role !== "system"),
        userMessage
      ];
      
      // Get response from API
      const response = await generateChatResponse(conversationHistory);
      
      const assistantMessage: Message = {
        role: "assistant",
        content: response
      };
      
      setMessages((prev) => [...prev, assistantMessage]);
      // Force scroll to bottom after response is received
      scrollToBottom();
    } catch (error) {
      console.error("Chat error:", error);
      
      // Add a visible error message to the chat
      setConnectionError(true);
      setMessages((prev) => [...prev, ERROR_MESSAGE]);
      
      toast({
        title: "Connection Error",
        description: "Having trouble reaching the AI service. Please try again later.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const clearChat = () => {
    setMessages([WELCOME_MESSAGE]);
    setConnectionError(false);
    localStorage.removeItem("chatMessages");
    toast({
      description: "Chat history cleared",
    });
  };

  return (
    <div className="flex flex-col h-[calc(100vh-13rem)] border rounded-md overflow-hidden bg-background shadow-md">
      <div className="flex items-center justify-between border-b px-4 py-3 bg-muted/30">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <Bot className="h-5 w-5 text-primary" />
          AI Counselor Chat
        </h2>
        <Button variant="ghost" size="sm" onClick={clearChat}>
          Clear Chat
        </Button>
      </div>
      
      {connectionError && (
        <Alert variant="destructive" className="mx-4 mt-2">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>
            Connection issues detected. Your messages are saved and will be answered when the connection is restored.
          </AlertDescription>
        </Alert>
      )}
      
      <ScrollArea 
        className="flex-1 p-4" 
        ref={scrollAreaRef}
      >
        <div className="space-y-4">
          {messages.map((message, index) => (
            message.role !== "system" && (
              <div
                key={index}
                className={cn(
                  "flex gap-3",
                  message.role === "user" ? "justify-end" : "justify-start"
                )}
              >
                {message.role === "assistant" && (
                  <Avatar className="h-8 w-8 bg-muted">
                    <Bot className="h-5 w-5" />
                  </Avatar>
                )}
                <div
                  className={cn(
                    "rounded-lg px-4 py-2 text-sm max-w-[80%]",
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-muted"
                  )}
                >
                  {message.content}
                </div>
                {message.role === "user" && (
                  <Avatar className="h-8 w-8 bg-primary">
                    <User className="h-5 w-5 text-primary-foreground" />
                  </Avatar>
                )}
              </div>
            )
          ))}
          
          {isLoading && (
            <div className="flex gap-3">
              <Avatar className="h-8 w-8 bg-muted">
                <Bot className="h-5 w-5" />
              </Avatar>
              <div className="rounded-lg px-4 py-2 text-sm bg-muted flex items-center">
                <Loader2 className="h-4 w-4 animate-spin mr-2" />
                Thinking...
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
      </ScrollArea>
      
      <div className="border-t p-4 bg-muted/20">
        <div className="flex gap-2">
          <Textarea
            placeholder="Type your message here..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            className="resize-none min-h-[60px] focus-visible:ring-1 focus-visible:ring-primary"
            disabled={isLoading}
          />
          <Button 
            className="shrink-0" 
            onClick={handleSendMessage}
            disabled={isLoading || !input.trim()}
          >
            {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
          </Button>
        </div>
        <p className="text-[10px] text-muted-foreground mt-2 text-center">
          Responses are AI-generated. For emergencies, please contact a crisis helpline or dial emergency services.
        </p>
      </div>
    </div>
  );
};

export default ChatInterface;
