
import Layout from "@/components/Layout";
import ChatInterface from "@/components/ChatInterface";
import { MessageCircle, Info } from "lucide-react";

const Chat = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col items-start gap-2 mb-8">
          <h1 className="text-3xl font-bold flex items-center gap-2">
            <MessageCircle className="h-8 w-8 text-primary" />
            Chat with AI Counselor
          </h1>
          <p className="text-muted-foreground max-w-2xl">
            Have a conversation with our AI counselor about your thoughts, feelings, or concerns. 
            All chats are anonymous and private.
          </p>
        </div>

        <div className="bg-gradient-to-r from-mint-50/80 to-mint-100/50 dark:from-mint-900/50 dark:to-mint-800/30 rounded-lg p-6 mb-8 border border-mint-200 dark:border-mint-800 shadow-sm">
          <div className="flex items-start gap-4">
            <div className="bg-primary/10 p-2 rounded-full">
              <Info className="h-6 w-6 text-primary" />
            </div>
            <div>
              <h2 className="text-lg font-semibold mb-2 text-primary">How This Works</h2>
              <p className="text-muted-foreground">
                Our AI counselor is here to listen and provide support. You can share your thoughts and feelings freely, 
                and the AI will respond with empathetic guidance and helpful strategies.
              </p>
              <div className="mt-3 text-sm text-muted-foreground">
                <p>Remember, this is not a replacement for professional mental health care. 
                In case of emergency, please contact a crisis helpline or emergency services.</p>
              </div>
            </div>
          </div>
        </div>

        <ChatInterface />
      </div>
    </Layout>
  );
};

export default Chat;
