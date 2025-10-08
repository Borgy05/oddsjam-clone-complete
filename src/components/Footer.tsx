import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Facebook, Instagram, Twitter, Youtube } from "lucide-react";

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
  { name: "Arbitrage Betting Tool", href: "/betting-tools/arbitrage" },
  { name: "Positive EV Betting Tool", href: "/betting-tools/positive-ev" },
  { name: "Parlay Builder Tool", href: "/betting-tools/parlay-builder" },
  { name: "Promo Converter Tool", href: "/betting-tools/promo-converter" },
  { name: "Middles Tool", href: "/betting-tools/middles" },
  { name: "Low Hold Tool", href: "/betting-tools/low-hold" },
];

const calculators = [
  { name: "Arbitrage Calculator", href: "/calculators/arbitrage" },
  { name: "Expected Value Calculator", href: "/calculators/expected-value" },
  { name: "Parlay Calculator", href: "/calculators/parlay" },
  { name: "Odds Converter", href: "/calculators/odds-converter" },
  { name: "Free Bet Converter", href: "/calculators/free-bet-converter" },
  { name: "Hold Calculator", href: "/calculators/hold" },
];

const bettingEducation = [
  { name: "What is Arbitrage Betting?", href: "/betting-education/arbitrage" },
  { name: "What is Positive EV Betting?", href: "/betting-education/positive-ev" },
  { name: "How to Read Moneylines", href: "/betting-education/moneylines" },
  { name: "How to Read Point Spreads", href: "/betting-education/point-spreads" },
  { name: "How to Read Over/Unders", href: "/betting-education/over-unders" },
  { name: "What are Prop Bets?", href: "/betting-education/prop-bets" },
];

const oddsJamLinks = [
  { name: "Getting Started Guide", href: "/getting-started" },
  { name: "FAQ", href: "/faq" },
  { name: "Privacy Policy", href: "/privacy" },
  { name: "Terms of Service", href: "/terms" },
  { name: "Careers", href: "/careers" },
  { name: "Responsible Gambling", href: "/responsible-gambling" },
];

export function Footer() {
  return (
    <footer className="bg-oj-bg-black border-t border-brand-gray-3">
      {/* Newsletter Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h3 className="text-2xl font-bold text-brand-gray mb-4">
            Subscribe to our newsletter
          </h3>
          <p className="text-brand-gray-7 mb-6 max-w-2xl mx-auto">
            Get the latest betting tips, tools, and profitable opportunities delivered to your inbox.
          </p>
          <div className="flex max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              className="bg-brand-gray-1 border-brand-gray-3 text-brand-gray"
            />
            <Button className="ml-2 bg-brand-blue hover:bg-brand-blue-2">
              Subscribe
            </Button>
          </div>
        </div>

        {/* Links Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Sports Betting Odds */}
          <div>
            <h4 className="text-brand-blue font-semibold mb-4">Sports Betting Odds</h4>
            <ul className="space-y-2">
              {sportsOdds.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-brand-gray-7 hover:text-brand-blue transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Betting Tools */}
          <div>
            <h4 className="text-brand-blue font-semibold mb-4">Betting Tools</h4>
            <ul className="space-y-2">
              {bettingTools.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-brand-gray-7 hover:text-brand-blue transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Calculators */}
          <div>
            <h4 className="text-brand-blue font-semibold mb-4">Calculators</h4>
            <ul className="space-y-2">
              {calculators.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-brand-gray-7 hover:text-brand-blue transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Betting Education */}
          <div>
            <h4 className="text-brand-blue font-semibold mb-4">Betting Education</h4>
            <ul className="space-y-2">
              {bettingEducation.map((link) => (
                <li key={link.name}>
                  <Link
                    to={link.href}
                    className="text-brand-gray-7 hover:text-brand-blue transition-colors text-sm"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* OddsJam Links */}
        <div className="mb-8">
          <h4 className="text-brand-blue font-semibold mb-4">OddsJam</h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {oddsJamLinks.map((link) => (
              <Link
                key={link.name}
                to={link.href}
                className="text-brand-gray-7 hover:text-brand-blue transition-colors text-sm"
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>

        {/* Social Media & Legal */}
        <div className="border-t border-brand-gray-3 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-6 mb-4 md:mb-0">
              <Link to="/" className="text-2xl font-bold text-brand-blue">
                OddsJam
              </Link>
              <div className="flex space-x-4">
                <a href="#" className="text-brand-gray-7 hover:text-brand-blue">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="text-brand-gray-7 hover:text-brand-blue">
                  <Instagram className="h-5 w-5" />
                </a>
                <a href="#" className="text-brand-gray-7 hover:text-brand-blue">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="text-brand-gray-7 hover:text-brand-blue">
                  <Youtube className="h-5 w-5" />
                </a>
              </div>
            </div>
            
            <div className="text-center md:text-right">
              <p className="text-brand-gray-7 text-sm mb-2">
                © Copyright OddsJam, Inc. 2025. All rights reserved.
              </p>
              <p className="text-brand-gray-7 text-xs">
                GAMBLING PROBLEM? CALL 1-800-GAMBLER
              </p>
              <p className="text-brand-gray-7 text-xs">
                Must be 21+ to participate. Please gamble responsibly.
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}