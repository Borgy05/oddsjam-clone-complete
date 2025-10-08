import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { CheckCircle, Star } from "lucide-react";

const goldFeatures = [
  "40+ US Sportsbooks",
  "Pre-game betting recommendations",
  "Push notifications",
  "Arbitrage betting",
  "Positive EV betting",
  "Promo maximization",
  "Middles",
  "Low holds",
  "5 devig methods",
  "1-click betting"
];

const platinumFeatures = [
  "Everything in Gold",
  "89+ Global Sportsbooks",
  "Live betting (2x profits)",
  "Auto-refresh",
  "Odds movement history",
  "1:1 coaching session with profitable coach",
  "Sports betting screener"
];

export default function SubscribePage() {
  const [isYearly, setIsYearly] = useState(false);

  const goldPrice = isYearly ? 79.20 : 6.60;
  const platinumPrice = isYearly ? 239.88 : 19.99;
  const goldOriginalPrice = isYearly ? 96 : 8;
  const platinumOriginalPrice = isYearly ? 288 : 24;

  return (
    <div className="min-h-screen bg-oj-bg-black py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-6 bg-brand-blue/10 text-brand-blue border-brand-blue/20">
            Trusted by 100k+ bettors worldwide
          </Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-brand-gray mb-6">
            Fast track your profits. Get 7 days on us.
          </h1>
          <p className="text-xl text-brand-gray-7 mb-8 max-w-3xl mx-auto">
            High-value bets at your fingertips. Join thousands of profitable bettors using our tools.
          </p>

          {/* Billing Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <Label htmlFor="billing-toggle" className="text-brand-gray-7">Monthly</Label>
            <Switch
              id="billing-toggle"
              checked={isYearly}
              onCheckedChange={setIsYearly}
            />
            <Label htmlFor="billing-toggle" className="text-brand-gray-7">
              Yearly <Badge className="ml-2 bg-green-500/10 text-green-400 border-green-500/20">Save 15%</Badge>
            </Label>
          </div>
        </div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-5xl mx-auto mb-16">
          {/* Gold Plan */}
          <Card className="bg-brand-gray-1 border-brand-gray-3 relative">
            <CardHeader>
              <CardTitle className="text-2xl text-brand-gray">Gold</CardTitle>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-brand-blue">${goldPrice}</span>
                <span className="text-brand-gray-7 ml-2">/{isYearly ? 'year' : 'month'}</span>
                <span className="text-brand-gray-7 line-through ml-4">${goldOriginalPrice}</span>
              </div>
              <CardDescription className="text-brand-gray-7">
                Perfect for getting started with profitable betting
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {goldFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-brand-gray-7">{feature}</span>
                  </div>
                ))}
              </div>
              <Button className="w-full bg-brand-blue hover:bg-brand-blue-2 mt-6">
                Start Free Trial
              </Button>
              <p className="text-center text-brand-gray-7 text-sm">
                7-day free trial • Cancel anytime
              </p>
            </CardContent>
          </Card>

          {/* Platinum Plan */}
          <Card className="bg-brand-gray-1 border-brand-blue relative">
            <Badge className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-brand-blue text-white">
              <Star className="h-4 w-4 mr-1" />
              Most Popular
            </Badge>
            <CardHeader>
              <CardTitle className="text-2xl text-brand-gray">Platinum</CardTitle>
              <div className="flex items-baseline">
                <span className="text-4xl font-bold text-brand-blue">${platinumPrice}</span>
                <span className="text-brand-gray-7 ml-2">/{isYearly ? 'year' : 'month'}</span>
                <span className="text-brand-gray-7 line-through ml-4">${platinumOriginalPrice}</span>
              </div>
              <CardDescription className="text-brand-gray-7">
                For serious bettors with $2000+ bankroll
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-3">
                {platinumFeatures.map((feature, index) => (
                  <div key={index} className="flex items-center">
                    <CheckCircle className="h-5 w-5 text-green-400 mr-3 flex-shrink-0" />
                    <span className="text-brand-gray-7">{feature}</span>
                  </div>
                ))}
              </div>
              <Button className="w-full bg-brand-blue hover:bg-brand-blue-2 mt-6">
                Start Free Trial
              </Button>
              <p className="text-center text-brand-gray-7 text-sm">
                7-day free trial • Cancel anytime
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Trust Indicators */}
        <div className="text-center mb-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <div className="text-3xl font-bold text-brand-blue mb-2">100,000+</div>
              <div className="text-brand-gray-7">Profitable Bettors</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-blue mb-2">$50M+</div>
              <div className="text-brand-gray-7">In User Profits</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-brand-blue mb-2">4.9/5</div>
              <div className="text-brand-gray-7">User Rating</div>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-brand-gray text-center mb-12">
            What Our Users Say
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <Card className="bg-brand-gray-1 border-brand-gray-3">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="text-brand-blue font-semibold">@BettingPro2024</div>
                  <Badge className="ml-2 bg-green-500/10 text-green-400 border-green-500/20">
                    +$47,875
                  </Badge>
                </div>
                <p className="text-brand-gray-7">
                  "Made $47,875 last month using OddsJam's tools. The arbitrage finder is incredible!"
                </p>
              </CardContent>
            </Card>
            
            <Card className="bg-brand-gray-1 border-brand-gray-3">
              <CardContent className="pt-6">
                <div className="flex items-center mb-4">
                  <div className="text-brand-blue font-semibold">@SportsInvestor</div>
                  <Badge className="ml-2 bg-green-500/10 text-green-400 border-green-500/20">
                    +$80K
                  </Badge>
                </div>
                <p className="text-brand-gray-7">
                  "Up $80K+ total with OddsJam. The positive EV tool changed my betting game completely."
                </p>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Final CTA */}
        <div className="text-center mt-16">
          <p className="text-brand-gray-7 mb-4">
            Ready to start making consistent profits?
          </p>
          <Button size="lg" className="bg-brand-blue hover:bg-brand-blue-2 px-8 py-3">
            Start Your 7-Day Free Trial
          </Button>
          <p className="text-brand-gray-7 text-sm mt-4">
            No credit card required • Cancel anytime • Join 100k+ profitable bettors
          </p>
        </div>
      </div>
    </div>
  );
}