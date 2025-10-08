import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, Gift, Calculator, TrendingUp } from "lucide-react";

const mockPromoOpportunities = [
  {
    id: 1,
    sport: "NFL",
    game: "Chiefs vs Bills",
    market: "Moneyline",
    book: "DraftKings",
    promoType: "$100 Free Bet",
    hedgeBook: "FanDuel",
    hedgeOdds: "+180",
    conversion: "68%",
    profit: "$68.00",
    time: "2 hours ago"
  },
  {
    id: 2,
    sport: "NBA",
    game: "Lakers vs Warriors",
    market: "Point Spread",
    book: "BetMGM",
    promoType: "$50 Bonus Bet",
    hedgeBook: "Caesars",
    hedgeOdds: "-110",
    conversion: "75%",
    profit: "$37.50",
    time: "1 hour ago"
  },
  {
    id: 3,
    sport: "MLB",
    game: "Yankees vs Red Sox",
    market: "Over/Under",
    book: "ESPN BET",
    promoType: "$25 Site Credit",
    hedgeBook: "Hard Rock",
    hedgeOdds: "+150",
    conversion: "70%",
    profit: "$17.50",
    time: "45 minutes ago"
  }
];

const features = [
  {
    icon: <Gift className="h-6 w-6 text-brand-blue" />,
    title: "Maximize Bonus Value",
    description: "Convert free bets and bonuses into real cash with optimal strategies"
  },
  {
    icon: <Calculator className="h-6 w-6 text-brand-blue" />,
    title: "Conversion Calculator",
    description: "Automatically calculate the best hedge bets for maximum conversion"
  },
  {
    icon: <TrendingUp className="h-6 w-6 text-brand-blue" />,
    title: "Real-Time Opportunities",
    description: "Find the best conversion opportunities across all major sportsbooks"
  }
];

const faqs = [
  {
    question: "What is a Promo Converter?",
    answer: "A promo converter helps you turn free bets, bonus bets, and site credits into real cash by finding optimal hedge betting opportunities. Instead of risking the bonus on a single bet, you can guarantee a profit."
  },
  {
    question: "How does bonus bet conversion work?",
    answer: "You place your bonus bet on one outcome at one sportsbook, then hedge by betting the opposite outcome at another sportsbook with your own money. This guarantees profit regardless of the outcome."
  },
  {
    question: "What's a good conversion rate?",
    answer: "Conversion rates typically range from 60-80%. A 70% conversion on a $100 free bet means you'll end up with about $70 in real cash, which is much better than risking the entire bonus."
  },
  {
    question: "Which promotions work best?",
    answer: "Free bets, bonus bets, and site credits all work well. Risk-free bets and deposit matches can also be converted, though the strategy may vary slightly."
  },
  {
    question: "How often should I convert bonuses?",
    answer: "Convert bonuses as soon as you receive them and find good opportunities. The longer you wait, the more likely the odds will change and reduce your conversion rate."
  }
];

export default function PromoConverterPage() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-oj-bg-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-brand-blue/10 text-brand-blue border-brand-blue/20">
            INCLUDED IN ALL PLANS
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-brand-gray mb-4">
            Promo Converter Tool
          </h1>
          <p className="text-xl text-brand-gray-7 max-w-3xl mx-auto mb-8">
            Maximize returns of bonus bets and turn free bets into guaranteed cash
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
                    <strong className="text-brand-gray">Step 1:</strong> Receive a free bet or bonus from a sportsbook
                  </div>
                  <div className="text-brand-gray-7">
                    <strong className="text-brand-gray">Step 2:</strong> Our tool finds the best conversion opportunity with optimal odds
                  </div>
                  <div className="text-brand-gray-7">
                    <strong className="text-brand-gray">Step 3:</strong> Place your bonus bet on one outcome, hedge with cash on the opposite
                  </div>
                  <div className="text-brand-gray-7">
                    <strong className="text-brand-gray">Step 4:</strong> Guaranteed profit regardless of which bet wins
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Live Opportunities */}
        <div className="mb-16">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold text-brand-gray">Live Conversion Opportunities</h2>
            <Button className="bg-brand-blue hover:bg-brand-blue-2">
              Start Free Trial to View All
            </Button>
          </div>

          <div className="space-y-4">
            {mockPromoOpportunities.map((opportunity) => (
              <Card key={opportunity.id} className="bg-brand-gray-1 border-brand-gray-3 relative overflow-hidden">
                <CardContent className="p-6">
                  <div className="grid grid-cols-1 lg:grid-cols-7 gap-4 items-center">
                    <div className="lg:col-span-2">
                      <Badge className="mb-2 bg-brand-blue/10 text-brand-blue border-brand-blue/20">
                        {opportunity.sport}
                      </Badge>
                      <div className="text-brand-gray font-semibold">{opportunity.game}</div>
                      <div className="text-brand-gray-7 text-sm">{opportunity.market}</div>
                    </div>

                    <div>
                      <div className="text-brand-gray font-semibold">{opportunity.book}</div>
                      <div className="text-brand-gray-7 text-sm">{opportunity.promoType}</div>
                    </div>

                    <div>
                      <div className="text-brand-gray font-semibold">{opportunity.hedgeBook}</div>
                      <div className="text-brand-blue">{opportunity.hedgeOdds}</div>
                      <div className="text-brand-gray-7 text-sm">Hedge Odds</div>
                    </div>

                    <div className="text-center">
                      <div className="text-green-400 font-bold text-lg">{opportunity.conversion}</div>
                      <div className="text-brand-gray-7 text-sm">Conversion Rate</div>
                    </div>

                    <div className="text-center">
                      <div className="text-green-400 font-bold">{opportunity.profit}</div>
                      <div className="text-brand-gray-7 text-sm">Expected Profit</div>
                    </div>

                    <div className="text-center">
                      <div className="text-brand-gray-7 text-sm">{opportunity.time}</div>
                    </div>

                    <div className="text-center">
                      <Button className="bg-brand-blue hover:bg-brand-blue-2 w-full">
                        Convert Now
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
                    <p className="text-brand-gray-7 text-sm">View all conversion opportunities</p>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Example Conversion */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-brand-gray text-center mb-8">
            Example: $100 Free Bet Conversion
          </h2>
          <div className="max-w-4xl mx-auto">
            <Card className="bg-brand-gray-1 border-brand-gray-3">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div>
                    <h3 className="text-brand-blue font-semibold mb-4">Free Bet (DraftKings)</h3>
                    <div className="space-y-2">
                      <div className="text-brand-gray-7">Game: Chiefs vs Bills</div>
                      <div className="text-brand-gray-7">Bet: Chiefs ML +200</div>
                      <div className="text-brand-gray-7">Stake: $100 (Free Bet)</div>
                      <div className="text-brand-gray-7">Potential Win: $200</div>
                    </div>
                  </div>
                  <div>
                    <h3 className="text-brand-blue font-semibold mb-4">Hedge Bet (FanDuel)</h3>
                    <div className="space-y-2">
                      <div className="text-brand-gray-7">Game: Chiefs vs Bills</div>
                      <div className="text-brand-gray-7">Bet: Bills ML -250</div>
                      <div className="text-brand-gray-7">Stake: $133.33 (Cash)</div>
                      <div className="text-brand-gray-7">Potential Win: $53.33</div>
                    </div>
                  </div>
                </div>
                <div className="mt-8 p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
                  <div className="text-center">
                    <div className="text-green-400 font-bold text-xl mb-2">Guaranteed Profit: $66.67</div>
                    <div className="text-brand-gray-7">
                      If Chiefs win: $200 - $133.33 = $66.67 profit<br/>
                      If Bills win: $53.33 - $0 = $66.67 profit (free bet loses)
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
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
                  <span className="text-brand-gray-7">Promo Converter</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                  <span className="text-brand-gray-7">Arbitrage & Positive EV</span>
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
            Get the latest promo conversion opportunities and bonus betting strategies delivered to your inbox.
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