
import Layout from "@/components/Layout";
import ChatInterface from "@/components/ChatInterface";

const Chat = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Chat with AI Counselor</h1>
        <ChatInterface />
      </div>
    </Layout>
  );
};

export default Chat;
