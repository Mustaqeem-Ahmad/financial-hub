const _jsxFileName = "src/components/ThemeToggle.tsx";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui/button";

/** Toggle between light and dark mode */
export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    _jsxDEV(Button, {
      variant: "ghost",
      size: "icon",
      className: "h-8 w-8" ,
      onClick: () => setTheme(theme === "dark" ? "light" : "dark"),
      'aria-label': "Toggle dark mode"  ,
 children: [
      _jsxDEV(Sun, { className: "h-4 w-4 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0"      ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 17}, this )
      , _jsxDEV(Moon, { className: "absolute h-4 w-4 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100"       ,}, void 0, false, {fileName: _jsxFileName, lineNumber: 18}, this )
    ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 10}, this)
  );
}
