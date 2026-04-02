import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAppContext } from "@/context/AppContext";
import { Bell, User } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { UserRole } from "@/context/AppContext";

/** Top header bar with role switcher */
export default function Header() {
  const { role, setRole } = useAppContext();

  return (
    <header className="flex h-14 items-center justify-between border-b bg-card px-4">
      <div className="flex items-center gap-3">
        <SidebarTrigger aria-label="Toggle sidebar" />
        <h1 className="text-lg font-semibold">Dashboard</h1>
      </div>

      <div className="flex items-center gap-3">
        {/* Role switcher */}
        <Select value={role} onValueChange={(v) => setRole(v as UserRole)}>
          <SelectTrigger className="w-[120px] h-8 text-xs" aria-label="Switch user role">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="admin">Admin</SelectItem>
            <SelectItem value="viewer">Viewer</SelectItem>
          </SelectContent>
        </Select>

        <button className="rounded-md p-1.5 hover:bg-accent" aria-label="Notifications">
          <Bell className="h-4 w-4 text-muted-foreground" />
        </button>
        <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary">
          <User className="h-4 w-4 text-primary-foreground" />
        </div>
      </div>
    </header>
  );
}
