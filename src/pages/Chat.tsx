
import Layout from "@/components/Layout";
import ChatInterface from "@/components/ChatInterface";

const Chat = () => {
  return (
    <Layout>
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Chat with AI Counselor</h1>
        <p className="text-gray-600 mb-6">
          Have a conversation with our AI counselor about your thoughts, feelings, or concerns. All chats are anonymous and private.
        </p>
        <ChatInterface />
      </div>
    </Layout>
  );
};

export default Chat;
