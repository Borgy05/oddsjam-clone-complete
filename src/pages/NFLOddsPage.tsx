import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";

// Mock data for NFL games
const mockGames = [
  {
    id: 1,
    homeTeam: "Philadelphia Eagles",
    awayTeam: "New York Giants",
    date: "Thursday • 8:15PM",
    channel: "Amazon",
    moneyline: { home: -375, away: +315 },
    spread: { home: -7.5, away: +7.5 },
    total: { over: 42.5, under: 42.5 }
  },
  {
    id: 2,
    homeTeam: "Denver Broncos",
    awayTeam: "New York Jets",
    date: "Sunday • 1:00PM",
    channel: "CBS",
    moneyline: { home: -180, away: +155 },
    spread: { home: -3.5, away: +3.5 },
    total: { over: 44.5, under: 44.5 }
  },
  {
    id: 3,
    homeTeam: "Kansas City Chiefs",
    awayTeam: "Buffalo Bills",
    date: "Sunday • 4:25PM",
    channel: "FOX",
    moneyline: { home: -125, away: +105 },
    spread: { home: -2.5, away: +2.5 },
    total: { over: 48.5, under: 48.5 }
  },
  {
    id: 4,
    homeTeam: "Dallas Cowboys",
    awayTeam: "Green Bay Packers",
    date: "Sunday • 8:20PM",
    channel: "NBC",
    moneyline: { home: +140, away: -165 },
    spread: { home: +3, away: -3 },
    total: { over: 46.5, under: 46.5 }
  }
];

const sportsbooks = ["DraftKings", "FanDuel", "BetMGM", "Caesars", "ESPN BET"];

const faqs = [
  {
    question: "How to use OddsJam's NFL Odds Comparison Tool",
    answer: "Our NFL odds comparison tool analyzes odds from 40+ sportsbooks to find the best lines for every game. Simply browse the upcoming games and click on any bet to see detailed odds comparison across all books."
  },
  {
    question: "How to Read NFL Moneylines",
    answer: "NFL moneylines show which team is favored and by how much. Negative numbers (-150) indicate favorites - you bet $150 to win $100. Positive numbers (+130) indicate underdogs - you bet $100 to win $130."
  },
  {
    question: "How to Read NFL Point Spreads",
    answer: "Point spreads level the playing field by giving the underdog a head start. If the Chiefs are -7, they must win by more than 7 points to cover the spread. If you bet the underdog +7, they can lose by up to 6 points and you still win."
  },
  {
    question: "How to Read NFL Over/Unders or Totals",
    answer: "Over/Under bets are on the total points scored by both teams combined. If the total is 45.5, you bet whether the final score will be over or under that number."
  },
  {
    question: "What are NFL Prop Bets?",
    answer: "Prop bets are wagers on specific events within a game that don't directly relate to the final score. Examples include player touchdown bets, passing yards, or first team to score."
  }
];

export default function NFLOddsPage() {
  const [email, setEmail] = useState("");

  return (
    <div className="min-h-screen bg-oj-bg-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-gray mb-4">
            NFL Odds, Betting Lines, Point Spreads, Totals, Moneylines
          </h1>
          <p className="text-xl text-brand-gray-7 max-w-3xl mx-auto">
            Compare NFL odds from 40+ sportsbooks and find the best betting opportunities
          </p>
        </div>

        {/* Navigation Tabs */}
        <Tabs defaultValue="games" className="mb-8">
          <TabsList className="grid w-full grid-cols-6 bg-brand-gray-1">
            <TabsTrigger value="overview" className="text-brand-gray-7 data-[state=active]:text-brand-blue">Overview</TabsTrigger>
            <TabsTrigger value="games" className="text-brand-gray-7 data-[state=active]:text-brand-blue">Games</TabsTrigger>
            <TabsTrigger value="futures" className="text-brand-gray-7 data-[state=active]:text-brand-blue">Futures</TabsTrigger>
            <TabsTrigger value="teams" className="text-brand-gray-7 data-[state=active]:text-brand-blue">Teams</TabsTrigger>
            <TabsTrigger value="schedule" className="text-brand-gray-7 data-[state=active]:text-brand-blue">Schedule</TabsTrigger>
            <TabsTrigger value="injuries" className="text-brand-gray-7 data-[state=active]:text-brand-blue">Injuries</TabsTrigger>
          </TabsList>

          <TabsContent value="games" className="space-y-6">
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-bold text-brand-gray">Upcoming Games</h2>
              <Button className="bg-brand-blue hover:bg-brand-blue-2">
                Start your free trial
              </Button>
            </div>

            {/* Games List */}
            <div className="space-y-4">
              {mockGames.map((game) => (
                <Card key={game.id} className="bg-brand-gray-1 border-brand-gray-3">
                  <CardContent className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 items-center">
                      {/* Game Info */}
                      <div className="lg:col-span-1">
                        <div className="space-y-2">
                          <div className="text-brand-gray font-semibold">{game.awayTeam}</div>
                          <div className="text-brand-gray font-semibold">{game.homeTeam}</div>
                          <div className="text-brand-gray-7 text-sm">{game.date} • {game.channel}</div>
                        </div>
                      </div>

                      {/* Betting Options */}
                      <div className="lg:col-span-3 grid grid-cols-3 gap-4">
                        {/* Moneyline */}
                        <div className="text-center">
                          <div className="text-brand-gray-7 text-sm mb-2">Moneyline</div>
                          <div className="space-y-2">
                            <div className="bg-brand-gray-2 p-2 rounded border border-brand-gray-3">
                              <div className="text-brand-gray text-sm">{game.moneyline.away > 0 ? '+' : ''}{game.moneyline.away}</div>
                            </div>
                            <div className="bg-brand-gray-2 p-2 rounded border border-brand-gray-3">
                              <div className="text-brand-gray text-sm">{game.moneyline.home > 0 ? '+' : ''}{game.moneyline.home}</div>
                            </div>
                          </div>
                        </div>

                        {/* Spread */}
                        <div className="text-center">
                          <div className="text-brand-gray-7 text-sm mb-2">Spread</div>
                          <div className="space-y-2">
                            <div className="bg-brand-gray-2 p-2 rounded border border-brand-gray-3">
                              <div className="text-brand-gray text-sm">{game.spread.away > 0 ? '+' : ''}{game.spread.away}</div>
                            </div>
                            <div className="bg-brand-gray-2 p-2 rounded border border-brand-gray-3">
                              <div className="text-brand-gray text-sm">{game.spread.home > 0 ? '+' : ''}{game.spread.home}</div>
                            </div>
                          </div>
                        </div>

                        {/* Over/Under */}
                        <div className="text-center">
                          <div className="text-brand-gray-7 text-sm mb-2">Over/Under</div>
                          <div className="space-y-2">
                            <div className="bg-brand-gray-2 p-2 rounded border border-brand-gray-3">
                              <div className="text-brand-gray text-sm">O {game.total.over}</div>
                            </div>
                            <div className="bg-brand-gray-2 p-2 rounded border border-brand-gray-3">
                              <div className="text-brand-gray text-sm">U {game.total.under}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Sportsbooks */}
                    <div className="mt-4 pt-4 border-t border-brand-gray-3">
                      <div className="flex flex-wrap gap-2">
                        {sportsbooks.map((book) => (
                          <Badge key={book} variant="outline" className="border-brand-gray-3 text-brand-gray-7">
                            {book}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Trial CTA Overlay */}
                    <div className="absolute inset-0 bg-brand-gray-1/80 backdrop-blur-sm flex items-center justify-center rounded-lg">
                      <div className="text-center">
                        <Button className="bg-brand-blue hover:bg-brand-blue-2 mb-2">
                          Start your free trial
                        </Button>
                        <p className="text-brand-gray-7 text-sm">View all odds and betting opportunities</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            <div className="text-center">
              <Button variant="outline" className="border-brand-gray-3 text-brand-gray-7 hover:bg-brand-gray-2">
                Load More Games
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="overview">
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold text-brand-gray mb-4">NFL Overview</h3>
              <p className="text-brand-gray-7">Overview content coming soon...</p>
            </div>
          </TabsContent>

          <TabsContent value="futures">
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold text-brand-gray mb-4">NFL Futures</h3>
              <p className="text-brand-gray-7">Futures betting content coming soon...</p>
            </div>
          </TabsContent>

          <TabsContent value="teams">
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold text-brand-gray mb-4">NFL Teams</h3>
              <p className="text-brand-gray-7">Team information coming soon...</p>
            </div>
          </TabsContent>

          <TabsContent value="schedule">
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold text-brand-gray mb-4">NFL Schedule</h3>
              <p className="text-brand-gray-7">Schedule information coming soon...</p>
            </div>
          </TabsContent>

          <TabsContent value="injuries">
            <div className="text-center py-12">
              <h3 className="text-2xl font-bold text-brand-gray mb-4">NFL Injuries</h3>
              <p className="text-brand-gray-7">Injury reports coming soon...</p>
            </div>
          </TabsContent>
        </Tabs>

        {/* FAQ Section */}
        <div className="mt-16">
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
        <div className="mt-16 text-center">
          <h3 className="text-2xl font-bold text-brand-gray mb-4">
            Subscribe to our newsletter
          </h3>
          <p className="text-brand-gray-7 mb-6 max-w-2xl mx-auto">
            Get the latest NFL betting tips and profitable opportunities delivered to your inbox.
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