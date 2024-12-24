import { User, MessageSquare } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarGroup,
  SidebarGroupContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Input } from "@/components/ui/input";
import { useState } from "react";

interface UserPanelProps {
  onSelectUser: (userId: string) => void;
  selectedUserId: string;
}

const users = [
  { id: "1", name: "Alice Smith", status: "online" },
  { id: "2", name: "Bob Johnson", status: "offline" },
  { id: "3", name: "Carol Williams", status: "online" },
  { id: "4", name: "David Brown", status: "away" },
];

export function UserPanel({ onSelectUser, selectedUserId }: UserPanelProps) {
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = users.filter((user) =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Sidebar>
      <SidebarHeader className="border-b border-border p-4">
        <Input
          placeholder="Search users..."
          className="h-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {filteredUsers.map((user) => (
                <SidebarMenuItem key={user.id}>
                  <SidebarMenuButton
                    onClick={() => onSelectUser(user.id)}
                    data-active={selectedUserId === user.id}
                    className="flex items-center gap-3"
                  >
                    <div className="relative">
                      <User className="h-5 w-5" />
                      <div
                        className={`absolute -right-0.5 -bottom-0.5 h-2.5 w-2.5 rounded-full border-2 border-background ${
                          user.status === "online"
                            ? "bg-green-500"
                            : user.status === "away"
                            ? "bg-yellow-500"
                            : "bg-gray-500"
                        }`}
                      />
                    </div>
                    <span>{user.name}</span>
                    <MessageSquare className="ml-auto h-4 w-4 opacity-50" />
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
    </Sidebar>
  );
}