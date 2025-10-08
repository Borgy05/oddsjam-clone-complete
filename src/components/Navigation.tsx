import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { 
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { ChevronDown, Menu, X, User, LogOut } from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/contexts/AuthContext";

const sportsOdds = [
  { name: "NFL Odds", href: "/nfl/odds" },
  { name: "NBA Odds", href: "/nba/odds" },
  { name: "MLB Odds", href: "/mlb/odds" },
  { name: "NHL Odds", href: "/nhl/odds" },
  { name: "NCAAF Odds", href: "/ncaaf/odds" },
  { name: "NCAAB Odds", href: "/ncaab/odds" },
  { name: "Soccer Odds", href: "/soccer/odds" },
  { name: "Golf Odds", href: "/golf/odds" },
];

const bettingTools = [
  { name: "Arbitrage", href: "/betting-tools/arbitrage", description: "Risk-free betting opportunities" },
  { name: "Positive EV", href: "/betting-tools/positive-ev", description: "Mathematical edge betting" },
  { name: "Parlay Builder", href: "/betting-tools/parlay-builder", description: "Build perfect parlays" },
  { name: "Promo Converter", href: "/betting-tools/promo-converter", description: "Maximize bonus bets" },
  { name: "Middles", href: "/betting-tools/middles", description: "Middle betting opportunities" },
  { name: "Low Hold", href: "/betting-tools/low-hold", description: "Low commission bets" },
];

const resources = [
  { name: "Betting Education", href: "/betting-education" },
  { name: "Calculators", href: "/calculators" },
  { name: "API", href: "/api" },
  { name: "About Us", href: "/about-us" },
  { name: "All News", href: "/all-news" },
];

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const location = useLocation();
  const { user, signOut } = useAuth();

  return (
    <nav className="bg-oj-bg-black border-b border-brand-gray-3 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center">
            <div className="text-2xl font-bold text-brand-blue">OddsJam</div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <NavigationMenu>
              <NavigationMenuList>
                {/* Sports Odds Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-brand-gray hover:text-brand-blue">
                    Sports Odds
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                      {sportsOdds.map((sport) => (
                        <NavigationMenuLink key={sport.name} asChild>
                          <Link
                            to={sport.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-brand-gray-1 hover:text-brand-blue focus:bg-brand-gray-1 focus:text-brand-blue"
                          >
                            <div className="text-sm font-medium leading-none">{sport.name}</div>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Tools Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-brand-gray hover:text-brand-blue">
                    Tools
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px]">
                      {bettingTools.map((tool) => (
                        <NavigationMenuLink key={tool.name} asChild>
                          <Link
                            to={tool.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-brand-gray-1 hover:text-brand-blue focus:bg-brand-gray-1 focus:text-brand-blue"
                          >
                            <div className="text-sm font-medium leading-none">{tool.name}</div>
                            <p className="line-clamp-2 text-sm leading-snug text-brand-gray-7">
                              {tool.description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Resources Dropdown */}
                <NavigationMenuItem>
                  <NavigationMenuTrigger className="bg-transparent text-brand-gray hover:text-brand-blue">
                    Resources
                  </NavigationMenuTrigger>
                  <NavigationMenuContent>
                    <div className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-1 lg:w-[600px]">
                      {resources.map((resource) => (
                        <NavigationMenuLink key={resource.name} asChild>
                          <Link
                            to={resource.href}
                            className="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-brand-gray-1 hover:text-brand-blue focus:bg-brand-gray-1 focus:text-brand-blue"
                          >
                            <div className="text-sm font-medium leading-none">{resource.name}</div>
                          </Link>
                        </NavigationMenuLink>
                      ))}
                    </div>
                  </NavigationMenuContent>
                </NavigationMenuItem>

                {/* Pricing */}
                <NavigationMenuItem>
                  <NavigationMenuLink asChild>
                    <Link
                      to="/subscribe"
                      className="text-brand-gray hover:text-brand-blue transition-colors px-3 py-2"
                    >
                      Pricing
                    </Link>
                  </NavigationMenuLink>
                </NavigationMenuItem>
              </NavigationMenuList>
            </NavigationMenu>
          </div>

          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="text-brand-gray hover:text-brand-blue">
                    <User className="h-4 w-4 mr-2" />
                    {user.email}
                    <ChevronDown className="h-4 w-4 ml-2" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="bg-brand-gray-1 border-brand-gray-3">
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="text-brand-gray hover:text-brand-blue">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem 
                    onClick={signOut}
                    className="text-brand-gray hover:text-brand-blue cursor-pointer"
                  >
                    <LogOut className="h-4 w-4 mr-2" />
                    Sign out
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <>
                <Link to="/login">
                  <Button variant="ghost" className="text-brand-gray hover:text-brand-blue">
                    Login
                  </Button>
                </Link>
                <Link to="/register">
                  <Button className="bg-brand-blue hover:bg-brand-blue-2 text-white">
                    Try for free
                  </Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-brand-gray"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-brand-gray-1 rounded-lg mt-2">
              <div className="space-y-2">
                <div className="text-brand-gray-7 text-sm font-medium px-3 py-2">Sports Odds</div>
                {sportsOdds.map((sport) => (
                  <Link
                    key={sport.name}
                    to={sport.href}
                    className="block px-3 py-2 text-sm text-brand-gray hover:text-brand-blue"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {sport.name}
                  </Link>
                ))}
                
                <div className="text-brand-gray-7 text-sm font-medium px-3 py-2 mt-4">Tools</div>
                {bettingTools.map((tool) => (
                  <Link
                    key={tool.name}
                    to={tool.href}
                    className="block px-3 py-2 text-sm text-brand-gray hover:text-brand-blue"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {tool.name}
                  </Link>
                ))}
                
                <div className="text-brand-gray-7 text-sm font-medium px-3 py-2 mt-4">Resources</div>
                {resources.map((resource) => (
                  <Link
                    key={resource.name}
                    to={resource.href}
                    className="block px-3 py-2 text-sm text-brand-gray hover:text-brand-blue"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    {resource.name}
                  </Link>
                ))}
                
                <div className="border-t border-brand-gray-3 pt-4 mt-4">
                  <Link
                    to="/login"
                    className="block px-3 py-2 text-sm text-brand-gray hover:text-brand-blue"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Login
                  </Link>
                  <Link
                    to="/subscribe"
                    className="block px-3 py-2 text-sm text-brand-blue font-medium"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    Try for free
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}