const _jsxFileName = "src/components/dashboard/DashboardSidebar.tsx";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import { LayoutDashboard, ArrowLeftRight, BarChart3, Lightbulb, Settings } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";

const navItems = [
  { title: "Dashboard", icon: LayoutDashboard, href: "#dashboard" },
  { title: "Transactions", icon: ArrowLeftRight, href: "#transactions" },
  { title: "Analytics", icon: BarChart3, href: "#charts" },
  { title: "Insights", icon: Lightbulb, href: "#insights" },
  { title: "Settings", icon: Settings, href: "#settings" },
];

/** Left navigation sidebar */
export default function DashboardSidebar() {
  return (
    _jsxDEV(Sidebar, { collapsible: "icon", children: 
      _jsxDEV(SidebarContent, { children: [
        /* Brand */
        _jsxDEV('div', { className: "flex items-center gap-2 px-4 py-5"    , children: [
          _jsxDEV('div', { className: "flex h-8 w-8 items-center justify-center rounded-lg bg-primary"      , children: 
            _jsxDEV(BarChart3, { className: "h-4 w-4 text-primary-foreground"  ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 29}, this )
          }, void 0, false, {fileName: _jsxFileName, lineNumber: 28}, this)
          , _jsxDEV('span', { className: "text-lg font-bold text-sidebar-accent-foreground group-data-[collapsible=icon]:hidden"   , children: "Finova"

          }, void 0, false, {fileName: _jsxFileName, lineNumber: 31}, this)
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 27}, this)

        , _jsxDEV(SidebarGroup, { children: [
          _jsxDEV(SidebarGroupLabel, { children: "Menu"}, void 0, false, {fileName: _jsxFileName, lineNumber: 37}, this)
          , _jsxDEV(SidebarGroupContent, { children: 
            _jsxDEV(SidebarMenu, { children: 
              navItems.map((item) => (
                _jsxDEV(SidebarMenuItem, { children: 
                  _jsxDEV(SidebarMenuButton, { asChild: true, children: 
                    _jsxDEV('a', { href: item.href, className: "flex items-center gap-2"  , children: [
                      _jsxDEV(item.icon, { className: "h-4 w-4" ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 44}, this )
                      , _jsxDEV('span', { children: item.title}, void 0, false, {fileName: _jsxFileName, lineNumber: 45}, this)
                    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 43}, this)
                  }, void 0, false, {fileName: _jsxFileName, lineNumber: 42}, this)
                }, item.title, false, {fileName: _jsxFileName, lineNumber: 41}, this)
              ))
            }, void 0, false, {fileName: _jsxFileName, lineNumber: 39}, this)
          }, void 0, false, {fileName: _jsxFileName, lineNumber: 38}, this)
        ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 36}, this)
      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 25}, this)
    }, void 0, false, {fileName: _jsxFileName, lineNumber: 24}, this)
  );
}
