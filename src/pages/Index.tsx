import { useState } from "react";
import { cn } from "@/lib/utils";
import { SidebarProvider } from "@/components/ui/sidebar";
import { UserPanel } from "@/components/UserPanel";

interface Message {
  id: string;
  content: string;
  sender: "user" | "other";
  timestamp: Date;
}

interface Conversation {
  [userId: string]: Message[];
}

const Index = () => {
  const [conversations, setConversations] = useState<Conversation>({
    "1": [
      {
        id: "1",
        content: "Hello! How are you?",
        sender: "other",
        timestamp: new Date(Date.now() - 60000),
      },
      {
        id: "2",
        content: "I'm doing great, thanks for asking!",
        sender: "user",
        timestamp: new Date(),
      },
    ],
    "2": [
      {
        id: "1",
        content: "Hey there!",
        sender: "other",
        timestamp: new Date(Date.now() - 120000),
      },
    ],
    "3": [
      {
        id: "1",
        content: "Good morning!",
        sender: "other",
        timestamp: new Date(Date.now() - 180000),
      },
    ],
    "4": [
      {
        id: "1",
        content: "Hi! Nice to meet you!",
        sender: "other",
        timestamp: new Date(Date.now() - 240000),
      },
    ],
  });
  const [newMessage, setNewMessage] = useState("");
  const [selectedUserId, setSelectedUserId] = useState("1");

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    const message: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "user",
      timestamp: new Date(),
    };

    setConversations((prev) => ({
      ...prev,
      [selectedUserId]: [...(prev[selectedUserId] || []), message],
    }));
    setNewMessage("");

    // Simulate received message
    setTimeout(() => {
      const response: Message = {
        id: (Date.now() + 1).toString(),
        content: "Thanks for your message!",
        sender: "other",
        timestamp: new Date(),
      };
      setConversations((prev) => ({
        ...prev,
        [selectedUserId]: [...(prev[selectedUserId] || []), response],
      }));
    }, 1000);
  };

  const currentMessages = conversations[selectedUserId] || [];

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-gray-50">
        <UserPanel onSelectUser={setSelectedUserId} selectedUserId={selectedUserId} />
        <div className="flex flex-1 flex-col">
          <div className="flex-1 overflow-y-auto p-4 space-y-4">
            {currentMessages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  "flex animate-fade-in",
                  message.sender === "user" ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[80%] rounded-lg p-3 shadow-sm",
                    message.sender === "user"
                      ? "bg-blue-500 text-white"
                      : "bg-white text-gray-900"
                  )}
                >
                  <p className="text-sm">{message.content}</p>
                  <p
                    className={cn(
                      "text-xs mt-1",
                      message.sender === "user"
                        ? "text-blue-100"
                        : "text-gray-500"
                    )}
                  >
                    {message.timestamp.toLocaleTimeString([], {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
          <form
            onSubmit={handleSend}
            className="p-4 border-t bg-white flex gap-2 items-center"
          >
            <input
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type a message..."
              className="flex-1 rounded-full px-4 py-2 border focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button
              type="submit"
              className="bg-blue-500 text-white rounded-full p-2 w-10 h-10 flex items-center justify-center hover:bg-blue-600 transition-colors"
            >
              →
            </button>
          </form>
        </div>
      </div>
    </SidebarProvider>
  );
};

export default Index;