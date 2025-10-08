import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { CheckCircle, TrendingUp, Calculator, Zap, Shield, Users } from "lucide-react";

const features = [
  {
    icon: <TrendingUp className="h-8 w-8 text-brand-blue" />,
    title: "Arbitrage",
    description: "Risk-free betting opportunities with guaranteed profits",
    link: "/betting-tools/arbitrage"
  },
  {
    icon: <Calculator className="h-8 w-8 text-brand-blue" />,
    title: "Positive EV",
    description: "Mathematical edge betting for long-term profitability",
    link: "/betting-tools/positive-ev"
  },
  {
    icon: <Zap className="h-8 w-8 text-brand-blue" />,
    title: "Live Betting",
    description: "Real-time opportunities with 2x profit potential",
    link: "/betting-tools/live"
  },
  {
    icon: <Shield className="h-8 w-8 text-brand-blue" />,
    title: "Promo Converter",
    description: "Maximize returns from bonus bets and promotions",
    link: "/betting-tools/promo-converter"
  }
];

const testimonials = [
  {
    name: "@BettingPro2024",
    content: "Made $47,875 last month using OddsJam's tools. The arbitrage finder is incredible!",
    profit: "$47,875"
  },
  {
    name: "@SportsInvestor",
    content: "Up $80K+ total with OddsJam. The positive EV tool changed my betting game completely.",
    profit: "$80K+"
  },
  {
    name: "@ValueBettor",
    content: "Consistent $500-1000 weekly profits. OddsJam makes it so easy to find profitable bets.",
    profit: "$500-1000/week"
  }
];

const faqs = [
  {
    question: "How Does OddsJam Work?",
    answer: "OddsJam analyzes millions of odds from 40+ sportsbooks every second to find profitable betting opportunities. We identify arbitrage bets, positive expected value bets, and other profitable strategies, then alert you in real-time."
  },
  {
    question: "How many sportsbooks do I need?",
    answer: "We recommend having accounts with at least 5-10 major sportsbooks to maximize your opportunities. The more books you have, the more profitable bets you'll find."
  },
  {
    question: "Is this legal?",
    answer: "Yes, sports betting arbitrage and positive EV betting are completely legal. You're simply taking advantage of price differences between different sportsbooks."
  },
  {
    question: "How much can I make?",
    answer: "Earnings vary based on your bankroll and time commitment. Our users typically make $500-$1000+ per week, with some advanced users earning much more."
  },
  {
    question: "Do I need betting experience?",
    answer: "No! OddsJam is designed for both beginners and experts. We provide step-by-step guidance and educational resources to help you get started."
  }
];

export default function HomePage() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-oj-bg-black">
      {/* Hero Section */}
      <section className="relative py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto text-center">
          <Badge className="mb-6 bg-brand-blue/10 text-brand-blue border-brand-blue/20">
            Trusted by 100k+ bettors worldwide
          </Badge>
          
          <h1 className="text-4xl md:text-6xl font-bold text-brand-gray mb-6">
            With OddsJam,{" "}
            <span className="text-brand-blue">profit is the expectation</span>
          </h1>
          
          <p className="text-xl text-brand-gray-7 mb-8 max-w-3xl mx-auto">
            Make $500-$1000+ every week with math, not luck. Our tools analyze millions of odds 
            to find guaranteed profitable betting opportunities.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
            <div className="flex max-w-md w-full">
              <Input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-brand-gray-1 border-brand-gray-3 text-brand-gray"
              />
              <Button className="ml-2 bg-brand-blue hover:bg-brand-blue-2 whitespace-nowrap">
                Start Free Trial
              </Button>
            </div>
          </div>

          <p className="text-brand-gray-7 text-sm">
            7-day free trial • No credit card required • Cancel anytime
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brand-gray-1">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-gray mb-4">
              Powerful Tools for Profitable Betting
            </h2>
            <p className="text-xl text-brand-gray-7 max-w-3xl mx-auto">
              Our suite of professional betting tools gives you the edge you need to beat the sportsbooks
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="bg-brand-gray-2 border-brand-gray-3 hover:border-brand-blue transition-colors">
                <CardHeader>
                  <div className="mb-4">{feature.icon}</div>
                  <CardTitle className="text-brand-gray">{feature.title}</CardTitle>
                  <CardDescription className="text-brand-gray-7">
                    {feature.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <Link to={feature.link}>
                    <Button variant="outline" className="w-full border-brand-blue text-brand-blue hover:bg-brand-blue hover:text-white">
                      Learn More
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-brand-blue mb-2">100,000+</div>
              <div className="text-brand-gray-7">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-blue mb-2">1M+</div>
              <div className="text-brand-gray-7">Odds Analyzed Per Second</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-brand-blue mb-2">89+</div>
              <div className="text-brand-gray-7">Sportsbooks Supported</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brand-gray-1">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-gray mb-4">
              Real Results from Real Users
            </h2>
            <p className="text-xl text-brand-gray-7">
              See what our community is saying about their profits
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card key={index} className="bg-brand-gray-2 border-brand-gray-3">
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-brand-blue text-lg">{testimonial.name}</CardTitle>
                    <Badge className="bg-green-500/10 text-green-400 border-green-500/20">
                      {testimonial.profit}
                    </Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-brand-gray-7">{testimonial.content}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Preview */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-brand-gray mb-4">
            Fast track your profits. Get 7 days on us.
          </h2>
          <p className="text-xl text-brand-gray-7 mb-8">
            Join thousands of profitable bettors using our tools
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
            <Card className="bg-brand-gray-1 border-brand-gray-3">
              <CardHeader>
                <CardTitle className="text-brand-gray">Gold Plan</CardTitle>
                <div className="text-3xl font-bold text-brand-blue">$6.60<span className="text-lg text-brand-gray-7">/month</span></div>
                <CardDescription className="text-brand-gray-7">
                  Perfect for getting started
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                  <span className="text-brand-gray-7">40+ US Sportsbooks</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                  <span className="text-brand-gray-7">Arbitrage & Positive EV</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                  <span className="text-brand-gray-7">Push Notifications</span>
                </div>
                <div className="flex items-center">
                  <CheckCircle className="h-5 w-5 text-green-400 mr-3" />
                  <span className="text-brand-gray-7">1-Click Betting</span>
                </div>
              </CardContent>
            </Card>

            <Card className="bg-brand-gray-1 border-brand-blue relative">
              <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-brand-blue text-white">
                Most Popular
              </Badge>
              <CardHeader>
                <CardTitle className="text-brand-gray">Platinum Plan</CardTitle>
                <div className="text-3xl font-bold text-brand-blue">$19.99<span className="text-lg text-brand-gray-7">/month</span></div>
                <CardDescription className="text-brand-gray-7">
                  For serious bettors ($2000+ bankroll)
                </CardDescription>
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
                  <span className="text-brand-gray-7">1:1 Coaching Session</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <Link to="/subscribe">
            <Button size="lg" className="bg-brand-blue hover:bg-brand-blue-2 text-white px-8 py-3">
              Start Your Free Trial
            </Button>
          </Link>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-brand-gray-1">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-brand-gray mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-brand-gray-7">
              Everything you need to know about OddsJam
            </p>
          </div>

          <Accordion type="single" collapsible className="space-y-4">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`} className="bg-brand-gray-2 border-brand-gray-3 rounded-lg px-6">
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
      </section>
    </div>
  );
}