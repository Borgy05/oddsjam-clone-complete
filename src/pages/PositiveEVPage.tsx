import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, TrendingUp, Calculator, Target } from "lucide-react";

const mockPositiveEVBets = [
  {
    id: 1,
    sport: "NFL",
    game: "Chiefs vs Bills",
    market: "Player Props",
    player: "Josh Allen Over 2.5 Passing TDs",
    book: "DraftKings",
    odds: "+180",
    fairOdds: "+140",
    ev: "+12.4%",
    betAmount: "$50",
    expectedProfit: "$6.20",
    time: "1 hour ago"
  },
  {
    id: 2,
    sport: "NBA",
    game: "Lakers vs Warriors",
    market: "Player Props",
    player: "LeBron James Over 25.5 Points",
    book: "FanDuel",
    odds: "+110",
    fairOdds: "+85",
    ev: "+8.7%",
    betAmount: "$100",
    expectedProfit: "$8.70",
    time: "45 minutes ago"
  },
  {
    id: 3,
    sport: "MLB",
    game: "Yankees vs Red Sox",
    market: "Moneyline",
    player: "Yankees ML",
    book: "BetMGM",
    odds: "+125",
    fairOdds: "+105",
    ev: "+5.2%",
    betAmount: "$75",
    expectedProfit: "$3.90",
    time: "30 minutes ago"
  }
];

const features = [
  {
    icon: <Target className="h-6 w-6 text-brand-blue" />,
    title: "Mathematical Edge",
    description: "Find bets where you have a statistical advantage over the sportsbook"
  },
  {
    icon: <Calculator className="h-6 w-6 text-brand-blue" />,
    title: "EV Calculations",
    description: "We calculate the expected value of every bet automatically"
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-brand-blue" />,
    title: "Long-term Profits",
    description: "Build consistent profits over time with positive expected value"
  }
];

const faqs = [
  {
    question: "What is Positive Expected Value (EV) Betting?",
    answer: "Positive EV betting is when you place bets that have a higher probability of winning than what the odds suggest. Over time, these bets will be profitable even if you lose some individual wagers."
  },
  {
    question: "How do you calculate Expected Value?",
    answer: "Expected Value = (Probability of Winning × Amount Won) - (Probability of Losing × Amount Lost). When this number is positive, the bet has positive expected value."
  },
  {
    question: "How does OddsJam find +EV bets?",
    answer: "OddsJam finds mistakes in betting markets and shows you in real-time. Basically, these are bets where the chances of winning are higher than they should be based on the odds offered."
  },
  {
    question: "What's the difference between +EV and Arbitrage?",
    answer: "Arbitrage guarantees profit regardless of outcome, while +EV betting gives you a mathematical edge over time but individual bets can still lose."
  },
  {
    question: "How much can I expect to make with +EV betting?",
    answer: "Returns vary based on bankroll and volume, but consistent +EV betting typically yields 5-15% ROI monthly for experienced bettors."
  }
];

export default function PositiveEVPage() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-oj-bg-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-brand-blue/10 text-brand-blue border-brand-blue/20">
            OUR MOST POPULAR PRODUCT
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-brand-gray mb-4">
            <span className="text-brand-blue">POSITIVE EV</span> Betting Tool
          </h1>
          <p className="text-xl text-brand-gray-7 max-w-3xl mx-auto mb-8">
            We find you bets where you have a mathematical edge against the sportsbooks.
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
                    <strong className="text-brand-gray">Step 1:</strong> OddsJam finds mistakes in betting markets and shows you in real-time
                  </div>
                  <div className="text-brand-gray-7">
                    <strong className="text-brand-gray">Step 2:</strong> We tell you the exact sportsbook, game, market, players, even amount to bet
                  </div>
                  <div className="text-brand-gray-7">
                    <strong className="text-brand-gray">Step 3:</strong> You make the bet on the book (FanDuel, DraftKings, etc)
                  </div>
                  <div className="text-brand-gray-7">
                    <strong className="text-brand-gray">Step 4:</strong> OddsJam makes it easy to track your bets while providing insights
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Live Opportunities */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-brand-gray">Live +EV Opportunities</h2>
            <Button className="bg-brand-blue hover:bg-brand-blue-2">
              Start Free Trial to View All
            </Button>
          </div>

          <div className="space-y-4">
            {mockPositiveEVBets.map((bet) => (
              <Card key={bet.id} className="bg-brand-gray-1 border-brand-gray-3 relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 items-center">
                    <div className="lg:col-span-2">
                      <Badge className="mb-2 bg-brand-blue/10 text-brand-blue border-brand-blue/20">
                        {bet.sport}
                      </Badge>
                      <div className="text-brand-gray font-semibold">{bet.game}</div>
                      <div className="text-brand-gray-7 text-sm">{bet.market}</div>
                    </div>

                    <div>
                      <div className="text-brand-gray font-semibold">{bet.player}</div>
                      <div className="text-brand-gray-7 text-sm">{bet.book}</div>
                    </div>

                    <div className="text-center">
                      <div className="text-brand-blue font-semibold">{bet.odds}</div>
                      <div className="text-brand-gray-7 text-sm">Book Odds</div>
                    </div>

                    <div className="text-center">
                      <div className="text-brand-gray-7">{bet.fairOdds}</div>
                      <div className="text-brand-gray-7 text-sm">Fair Odds</div>
                    </div>

                    <div className="text-center">
                      <div className="text-green-400 font-bold">{bet.ev}</div>
                      <div className="text-green-400 text-sm">Expected Value</div>
                    </div>

                    <div className="text-center">
                      <div className="text-brand-gray">{bet.betAmount}</div>
                      <div className="text-green-400 text-sm">+{bet.expectedProfit}</div>
                      <div className="text-brand-gray-7 text-xs">{bet.time}</div>
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
                    <p className="text-brand-gray-7 text-sm">View all +EV opportunities</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* What's Included */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-brand-gray text-center mb-8">
            INCLUDED IN ALL PLANS
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-brand-blue font-semibold">Positive EV</div>
            </div>
            <div className="text-center">
              <div className="text-brand-blue font-semibold">Arbitrage</div>
            </div>
            <div className="text-center">
              <div className="text-brand-blue font-semibold">Parlay Builder</div>
            </div>
            <div className="text-center">
              <div className="text-brand-blue font-semibold">Promo Converter</div>
            </div>
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
                  <span className="text-brand-gray-7">Positive EV Tool</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                  <span className="text-brand-gray-7">Arbitrage Tool</span>
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
                  <span className="text-brand-gray-7">Live Betting (2x Profits)</span>
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
            Get the latest +EV opportunities and profitable betting strategies delivered to your inbox.
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