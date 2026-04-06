const _jsxFileName = "src/App.tsx";import {jsxDEV as _jsxDEV} from "react/jsx-dev-runtime";import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ThemeProvider } from "next-themes";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";

const queryClient = new QueryClient();

const App = () => (
  _jsxDEV(ThemeProvider, { attribute: "class", defaultTheme: "system", enableSystem: true, children: 
    _jsxDEV(QueryClientProvider, { client: queryClient, children: 
      _jsxDEV(TooltipProvider, { children: [
        _jsxDEV(Toaster, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 16}, this )
        , _jsxDEV(Sonner, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 17}, this )
        , _jsxDEV(BrowserRouter, { children: 
          _jsxDEV(Routes, { children: [
            _jsxDEV(Route, { path: "/", element: _jsxDEV(Index, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 20}, this ),}, void 0, false, {fileName: _jsxFileName, lineNumber: 20}, this )
            /* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */
            , _jsxDEV(Route, { path: "*", element: _jsxDEV(NotFound, {}, void 0, false, {fileName: _jsxFileName, lineNumber: 22}, this ),}, void 0, false, {fileName: _jsxFileName, lineNumber: 22}, this )
          ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 19}, this)
        }, void 0, false, {fileName: _jsxFileName, lineNumber: 18}, this)
      ]}, void 0, true, {fileName: _jsxFileName, lineNumber: 15}, this)
    }, void 0, false, {fileName: _jsxFileName, lineNumber: 14}, this)
  }, void 0, false, {fileName: _jsxFileName, lineNumber: 13}, this)
);

export default App;
