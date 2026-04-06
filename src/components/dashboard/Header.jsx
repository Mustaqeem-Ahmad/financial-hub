const _jsxFileName = "src/components/dashboard/Header.tsx";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import { SidebarTrigger } from "@/components/ui/sidebar";
import { useAppContext } from "@/context/AppContext";
import { Bell, User } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import ThemeToggle from "@/components/ThemeToggle";

/** Top header bar with role switcher and theme toggle */
export default function Header() {
  const { role, setRole } = useAppContext();

  return (
    _jsxDEV('header', { className: "flex h-14 items-center justify-between border-b bg-card px-4"      , children: [
      _jsxDEV('div', { className: "flex items-center gap-3"  , children: [
        _jsxDEV(SidebarTrigger, { 'aria-label': "Toggle sidebar" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 21}, this )
        , _jsxDEV('h1', { className: "text-lg font-semibold hidden sm:block"   , children: "Dashboard"}, void 0, false, {fileName: _jsxFileName, lineNumber: 22}, this)
      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 20}, this)

      , _jsxDEV('div', { className: "flex items-center gap-2 sm:gap-3"   , children: [
        /* Role switcher */
        _jsxDEV(Select, { value: role, onValueChange: (v) => setRole(v ), children: [
          _jsxDEV(SelectTrigger, { className: "w-[100px] sm:w-[120px] h-8 text-xs"   , 'aria-label': "Switch user role"  , children: 
            _jsxDEV(SelectValue, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 29}, this )
          }, void 0, false, {fileName: _jsxFileName, lineNumber: 28}, this)
          , _jsxDEV(SelectContent, { children: [
            _jsxDEV(SelectItem, { value: "admin", children: "Admin"}, void 0, false, {fileName: _jsxFileName, lineNumber: 32}, this)
            , _jsxDEV(SelectItem, { value: "viewer", children: "Viewer"}, void 0, false, {fileName: _jsxFileName, lineNumber: 33}, this)
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 31}, this)
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 27}, this)

        , _jsxDEV(ThemeToggle, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 37}, this )

        , _jsxDEV('button', { className: "rounded-md p-1.5 hover:bg-accent"  , 'aria-label': "Notifications", children: 
          _jsxDEV(Bell, { className: "h-4 w-4 text-muted-foreground"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 40}, this )
        }, void 0, false, {fileName: _jsxFileName, lineNumber: 39}, this)
        , _jsxDEV('div', { className: "flex h-8 w-8 items-center justify-center rounded-full bg-primary"      , children: 
          _jsxDEV(User, { className: "h-4 w-4 text-primary-foreground"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 43}, this )
        }, void 0, false, {fileName: _jsxFileName, lineNumber: 42}, this)
      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 25}, this)
    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 19}, this)
  );
}
