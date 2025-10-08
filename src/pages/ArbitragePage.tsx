import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, TrendingUp, Calculator, Zap } from "lucide-react";
import { useBettingOpportunities } from "@/hooks/useSupabase";
import { useAuth } from "@/contexts/AuthContext";

const mockArbitrageOpportunities = [
  {
    id: 1,
    sport: "NFL",
    game: "Philadelphia Eagles vs New York Giants",
    market: "Moneyline",
    book1: { name: "DraftKings", team: "Eagles", odds: "+150", bet: "$100" },
    book2: { name: "FanDuel", team: "Giants", odds: "+130", bet: "$108.70" },
    profit: "$41.30",
    profitPercent: "19.8%",
    time: "2 hours ago"
  },
  {
    id: 2,
    sport: "NBA",
    game: "Lakers vs Warriors",
    market: "Point Spread",
    book1: { name: "BetMGM", team: "Lakers +5.5", odds: "-110", bet: "$110" },
    book2: { name: "Caesars", team: "Warriors -5.5", odds: "+105", bet: "$95.24" },
    profit: "$15.76",
    profitPercent: "7.7%",
    time: "1 hour ago"
  },
  {
    id: 3,
    sport: "MLB",
    game: "Yankees vs Red Sox",
    market: "Over/Under",
    book1: { name: "ESPN BET", team: "Over 8.5", odds: "+110", bet: "$90.91" },
    book2: { name: "Hard Rock", team: "Under 8.5", odds: "-105", bet: "$105" },
    profit: "$4.09",
    profitPercent: "2.1%",
    time: "30 minutes ago"
  }
];

const features = [
  {
    icon: <TrendingUp className="h-6 w-6 text-brand-blue" />,
    title: "Risk-Free Profits",
    description: "Guaranteed profits regardless of game outcome"
  },
  {
    icon: <Calculator className="h-6 w-6 text-brand-blue" />,
    title: "Automatic Calculations",
    description: "We calculate optimal bet sizes for maximum profit"
  },
  {
    icon: <Zap className="h-6 w-6 text-brand-blue" />,
    title: "Real-Time Alerts",
    description: "Get notified instantly when opportunities arise"
  }
];

const faqs = [
  {
    question: "What is Arbitrage Betting?",
    answer: "Arbitrage betting, or 'arbing,' is a strategy that enables finding the differences in odds among bookmakers. It involves placing bets on more than one possible outcome of an event, to take advantage of odds discrepancies, and result in a guaranteed profit."
  },
  {
    question: "How does it work?",
    answer: "Imagine DraftKings has the Patriots to win at +150 odds (bet $100 to win $150 profit) and FanDuel has the Dolphins to win at +130 odds (bet $100 to win $130 profit). If you bet $100 on the Patriots and $108.70 on the Dolphins, no matter who wins, you'll end up with $41.30 profit."
  },
  {
    question: "Is arbitrage betting legal?",
    answer: "Yes, arbitrage betting is completely legal. You're simply taking advantage of price differences between different sportsbooks, which is a normal market activity."
  },
  {
    question: "How often do arbitrage opportunities occur?",
    answer: "With our tool monitoring 40+ sportsbooks, we find hundreds of arbitrage opportunities daily across all major sports."
  },
  {
    question: "What's the typical profit margin?",
    answer: "Arbitrage opportunities typically offer 1-5% profit margins, but some can be higher. While individual profits may seem small, they add up quickly with consistent betting."
  }
];

export default function ArbitragePage() {
  const [email, setEmail] = useState("");
  const { opportunities, loading } = useBettingOpportunities('arbitrage');
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-oj-bg-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-brand-blue/10 text-brand-blue border-brand-blue/20">
            INCLUDED IN ALL PLANS
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-brand-gray mb-4">
            Arbitrage Betting Tool
          </h1>
          <p className="text-xl text-brand-gray-7 max-w-3xl mx-auto mb-8">
            Finding bets with lower risk is extremely time consuming... but our tool finds them in seconds, automatically.
          </p>
          <Button className="bg-brand-blue hover:bg-brand-blue-2 text-white px-8 py-3">
            Start Free Trial
          </Button>
        </div>

        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="bg-brand-gray-1 border-brand-gray-3 text-center">
              <CardHeader>
                <div className="mx-auto mb-4 p-3 bg-brand-blue/10 rounded-full w-fit">
                  {feature.icon}
                </div>
                <CardTitle className="text-brand-gray">{feature.title}</CardTitle>
                <CardDescription className="text-brand-gray-7">
                  {feature.description}
                </CardDescription>
              </CardHeader>
            </Card>
          ))}
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-brand-gray text-center mb-8">
            HOW DOES IT WORK?
          </h2>
          <div className="max-w-4xl mx-auto">
            <Card className="bg-brand-gray-1 border-brand-gray-3">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="text-brand-gray-7">
                    <strong className="text-brand-gray">Step 1:</strong> Our system monitors odds from 40+ sportsbooks in real-time
                  </div>
                  <div className="text-brand-gray-7">
                    <strong className="text-brand-gray">Step 2:</strong> We identify price discrepancies between different books
                  </div>
                  <div className="text-brand-gray-7">
                    <strong className="text-brand-gray">Step 3:</strong> You place calculated bets on both outcomes
                  </div>
                  <div className="text-brand-gray-7">
                    <strong className="text-brand-gray">Step 4:</strong> Guaranteed profit regardless of the result
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Live Opportunities */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-brand-gray">Live Arbitrage Opportunities</h2>
            <Button className="bg-brand-blue hover:bg-brand-blue-2">
              Start Free Trial to View All
            </Button>
          </div>

          <div className="space-y-4">
            {loading ? (
              <div className="text-center py-8">
                <div className="text-brand-gray-7">Loading opportunities...</div>
              </div>
            ) : !user ? (
              <div className="text-center py-8">
                <div className="text-brand-gray-7 mb-4">Sign in to view arbitrage opportunities</div>
                <Button className="bg-brand-blue hover:bg-brand-blue-2">
                  Sign In
                </Button>
              </div>
            ) : opportunities.length === 0 ? (
              <div className="text-center py-8">
                <div className="text-brand-gray-7">No arbitrage opportunities available at the moment.</div>
              </div>
            ) : (
              opportunities.map((opportunity) => (
              <Card key={opportunity.id} className="bg-brand-gray-1 border-brand-gray-3 relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 items-center">
                    <div className="lg:col-span-2">
                      <Badge className="mb-2 bg-brand-blue/10 text-brand-blue border-brand-blue/20">
                        {opportunity.sport}
                      </Badge>
                      <div className="text-brand-gray font-semibold">{opportunity.game_info.away_team} vs {opportunity.game_info.home_team}</div>
                      <div className="text-brand-gray-7 text-sm">{opportunity.game_info.date}</div>
                    </div>

                    <div className="text-center">
                      <div className="text-brand-gray font-semibold">{opportunity.opportunity_data.book1?.name}</div>
                      <div className="text-brand-gray-7">{opportunity.opportunity_data.book1?.team}</div>
                      <div className="text-brand-blue">{opportunity.opportunity_data.book1?.odds}</div>
                      <div className="text-brand-gray-7 text-sm">Bet: {opportunity.opportunity_data.book1?.bet}</div>
                    </div>

                    <div className="text-center">
                      <div className="text-brand-gray font-semibold">{opportunity.opportunity_data.book2?.name}</div>
                      <div className="text-brand-gray-7">{opportunity.opportunity_data.book2?.team}</div>
                      <div className="text-brand-blue">{opportunity.opportunity_data.book2?.odds}</div>
                      <div className="text-brand-gray-7 text-sm">Bet: {opportunity.opportunity_data.book2?.bet}</div>
                    </div>

                    <div className="text-center">
                      <div className="text-green-400 font-bold text-lg">${opportunity.profit_amount}</div>
                      <div className="text-green-400">{opportunity.profit_percentage}%</div>
                      <div className="text-brand-gray-7 text-sm">{new Date(opportunity.created_at).toLocaleTimeString()}</div>
                    </div>

                    <div className="text-center">
                      <Button className="bg-brand-blue hover:bg-brand-blue-2 w-full">
                        1-Click Bet
                      </Button>
                    </div>
                  </div>
                </CardContent>

                {/* Blur overlay for non-subscribers */}
                <div className="absolute inset-0 bg-brand-gray-1/80 backdrop-blur-sm flex items-center justify-center">
                  <div className="text-center">
                    <Button className="bg-brand-blue hover:bg-brand-blue-2 mb-2">
                      Start Free Trial
                    </Button>
                    <p className="text-brand-gray-7 text-sm">View all arbitrage opportunities</p>
                  </div>
                </div>
              </Card>
              ))
            )}
          </div>
        </div>

        {/* Pricing Plans */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-brand-gray text-center mb-8">
            Choose Your Plan
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="bg-brand-gray-1 border-brand-gray-3">
              <CardHeader>
                <CardTitle className="text-brand-gray">Gold Plan</CardTitle>
                <div className="text-3xl font-bold text-brand-blue">$6.60<span className="text-lg text-brand-gray-7">/month</span></div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                  <span className="text-brand-gray-7">Arbitrage Tool</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                  <span className="text-brand-gray-7">Positive EV Tool</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                  <span className="text-brand-gray-7">40+ US Sportsbooks</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                  <span className="text-brand-gray-7">Push Notifications</span>
                </div>
                <Button className="w-full bg-brand-blue hover:bg-brand-blue-2 mt-4">
                  Start Free Trial
                </Button>
              </CardContent>
            </Card>

            <Card className="bg-brand-gray-1 border-brand-blue relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-brand-blue text-white">
                Most Popular
              </Badge>
              <CardHeader>
                <CardTitle className="text-brand-gray">Platinum Plan</CardTitle>
                <div className="text-3xl font-bold text-brand-blue">$19.99<span className="text-lg text-brand-gray-7">/month</span></div>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                  <span className="text-brand-gray-7">Everything in Gold</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                  <span className="text-brand-gray-7">89+ Global Sportsbooks</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                  <span className="text-brand-gray-7">Live Betting</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                  <span className="text-brand-gray-7">1:1 Coaching</span>
                </div>
                <Button className="w-full bg-brand-blue hover:bg-brand-blue-2 mt-4">
                  Start Free Trial
                </Button>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-brand-gray text-center mb-8">
            Frequently Asked Questions
          </h2>
          <Accordion type="single" collapsible className="space-y-4 max-w-4xl mx-auto">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-brand-gray-1 border-brand-gray-3 rounded-lg px-6">
                <AccordionTrigger className="text-brand-gray hover:text-brand-blue">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-brand-gray-7">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>

        {/* Newsletter Section */}
        <div className="text-center">
          <h3 className="text-2xl font-bold text-brand-gray mb-4">
            Subscribe to our newsletter
          </h3>
          <p className="text-brand-gray-7 mb-6 max-w-2xl mx-auto">
            Get the latest arbitrage opportunities and profitable betting tips delivered to your inbox.
          </p>
          <div className="flex max-w-md mx-auto">
            <Input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="bg-brand-gray-1 border-brand-gray-3 text-brand-gray"
            />
            <Button className="ml-2 bg-brand-blue hover:bg-brand-blue-2">
              Subscribe
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}