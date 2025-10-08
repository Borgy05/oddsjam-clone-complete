import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAuth } from "@/contexts/AuthContext";
import { useUserProfile, useBettingHistory } from "@/hooks/useSupabase";
import { toast } from "sonner";

export default function ProfilePage() {
  const { user } = useAuth();
  const { profile, loading: profileLoading, updateProfile } = useUserProfile();
  const { history, loading: historyLoading } = useBettingHistory();
  const [editing, setEditing] = useState(false);
  const [formData, setFormData] = useState({
    full_name: "",
    username: "",
    betting_bankroll: ""
  });

  const handleUpdateProfile = async (e: React.FormEvent) => {
    e.preventDefault();
    const { error } = await updateProfile(formData);
    
    if (!error) {
      toast.success("Profile updated successfully!");
      setEditing(false);
    } else {
      toast.error("Failed to update profile");
    }
  };

  if (profileLoading) {
    return (
      <div className="min-h-screen bg-oj-bg-black flex items-center justify-center">
        <div className="text-brand-gray-7">Loading profile...</div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-oj-bg-black flex items-center justify-center">
        <div className="text-brand-gray-7">Please sign in to view your profile.</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-oj-bg-black py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-brand-gray mb-2">Profile</h1>
          <p className="text-brand-gray-7">Manage your account settings and betting preferences</p>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-3 bg-brand-gray-1">
            <TabsTrigger value="profile" className="text-brand-gray-7 data-[state=active]:text-brand-blue">Profile</TabsTrigger>
            <TabsTrigger value="subscription" className="text-brand-gray-7 data-[state=active]:text-brand-blue">Subscription</TabsTrigger>
            <TabsTrigger value="history" className="text-brand-gray-7 data-[state=active]:text-brand-blue">Betting History</TabsTrigger>
          </TabsList>

          <TabsContent value="profile">
            <Card className="bg-brand-gray-1 border-brand-gray-3">
              <CardHeader>
                <CardTitle className="text-brand-gray">Profile Information</CardTitle>
                <CardDescription className="text-brand-gray-7">
                  Update your personal information and betting preferences
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {editing ? (
                  <form onSubmit={handleUpdateProfile} className="space-y-4">
                    <div className="space-y-2">
                      <Label htmlFor="full_name" className="text-brand-gray">Full Name</Label>
                      <Input
                        id="full_name"
                        value={formData.full_name}
                        onChange={(e) => setFormData(prev => ({ ...prev, full_name: e.target.value }))}
                        className="bg-brand-gray-2 border-brand-gray-3 text-brand-gray"
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="username" className="text-brand-gray">Username</Label>
                      <Input
                        id="username"
                        value={formData.username}
                        onChange={(e) => setFormData(prev => ({ ...prev, username: e.target.value }))}
                        className="bg-brand-gray-2 border-brand-gray-3 text-brand-gray"
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="betting_bankroll" className="text-brand-gray">Betting Bankroll ($)</Label>
                      <Input
                        id="betting_bankroll"
                        type="number"
                        value={formData.betting_bankroll}
                        onChange={(e) => setFormData(prev => ({ ...prev, betting_bankroll: e.target.value }))}
                        className="bg-brand-gray-2 border-brand-gray-3 text-brand-gray"
                      />
                    </div>

                    <div className="flex space-x-2">
                      <Button type="submit" className="bg-brand-blue hover:bg-brand-blue-2">
                        Save Changes
                      </Button>
                      <Button type="button" variant="outline" onClick={() => setEditing(false)} className="border-brand-gray-3 text-brand-gray-7">
                        Cancel
                      </Button>
                    </div>
                  </form>
                ) : (
                  <div className="space-y-4">
                    <div>
                      <Label className="text-brand-gray">Email</Label>
                      <div className="text-brand-gray-7 mt-1">{user.email}</div>
                    </div>
                    
                    <div>
                      <Label className="text-brand-gray">Full Name</Label>
                      <div className="text-brand-gray-7 mt-1">{profile?.full_name || "Not set"}</div>
                    </div>
                    
                    <div>
                      <Label className="text-brand-gray">Username</Label>
                      <div className="text-brand-gray-7 mt-1">{profile?.username || "Not set"}</div>
                    </div>

                    <div>
                      <Label className="text-brand-gray">Betting Bankroll</Label>
                      <div className="text-brand-gray-7 mt-1">
                        {profile?.betting_bankroll ? `$${profile.betting_bankroll}` : "Not set"}
                      </div>
                    </div>

                    <Button 
                      onClick={() => {
                        setFormData({
                          full_name: profile?.full_name || "",
                          username: profile?.username || "",
                          betting_bankroll: profile?.betting_bankroll || ""
                        });
                        setEditing(true);
                      }}
                      className="bg-brand-blue hover:bg-brand-blue-2"
                    >
                      Edit Profile
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="subscription">
            <Card className="bg-brand-gray-1 border-brand-gray-3">
              <CardHeader>
                <CardTitle className="text-brand-gray">Subscription Status</CardTitle>
                <CardDescription className="text-brand-gray-7">
                  Manage your OddsJam subscription
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-brand-gray font-semibold">Current Plan</div>
                    <div className="text-brand-gray-7">
                      <Badge className={`${
                        profile?.subscription_plan === 'platinum' ? 'bg-brand-blue/10 text-brand-blue border-brand-blue/20' :
                        profile?.subscription_plan === 'gold' ? 'bg-yellow-500/10 text-yellow-400 border-yellow-500/20' :
                        'bg-brand-gray-3 text-brand-gray-7 border-brand-gray-3'
                      }`}>
                        {profile?.subscription_plan?.toUpperCase() || 'FREE'}
                      </Badge>
                    </div>
                  </div>
                  <div>
                    <div className="text-brand-gray font-semibold">Status</div>
                    <div className="text-brand-gray-7">
                      <Badge className={`${
                        profile?.subscription_status === 'active' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                        profile?.subscription_status === 'trial' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' :
                        'bg-brand-gray-3 text-brand-gray-7 border-brand-gray-3'
                      }`}>
                        {profile?.subscription_status?.toUpperCase() || 'INACTIVE'}
                      </Badge>
                    </div>
                  </div>
                </div>

                {profile?.subscription_plan === 'free' && (
                  <div className="p-4 bg-brand-blue/10 border border-brand-blue/20 rounded-lg">
                    <div className="text-brand-blue font-semibold mb-2">Upgrade Your Plan</div>
                    <div className="text-brand-gray-7 mb-4">
                      Get access to all betting tools and opportunities with a paid subscription.
                    </div>
                    <Button className="bg-brand-blue hover:bg-brand-blue-2">
                      View Plans
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="history">
            <Card className="bg-brand-gray-1 border-brand-gray-3">
              <CardHeader>
                <CardTitle className="text-brand-gray">Betting History</CardTitle>
                <CardDescription className="text-brand-gray-7">
                  Track your betting performance and profits
                </CardDescription>
              </CardHeader>
              <CardContent>
                {historyLoading ? (
                  <div className="text-center py-8">
                    <div className="text-brand-gray-7">Loading betting history...</div>
                  </div>
                ) : history.length === 0 ? (
                  <div className="text-center py-8">
                    <div className="text-brand-gray-7">No betting history yet. Start placing bets to see your performance!</div>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {history.map((bet) => (
                      <div key={bet.id} className="p-4 bg-brand-gray-2 rounded-lg border border-brand-gray-3">
                        <div className="flex justify-between items-start">
                          <div>
                            <div className="text-brand-gray font-semibold">{bet.bet_type}</div>
                            <div className="text-brand-gray-7 text-sm">Amount: ${bet.amount}</div>
                            {bet.potential_profit && (
                              <div className="text-green-400 text-sm">Potential Profit: ${bet.potential_profit}</div>
                            )}
                          </div>
                          <div className="text-right">
                            <Badge className={`${
                              bet.status === 'won' ? 'bg-green-500/10 text-green-400 border-green-500/20' :
                              bet.status === 'lost' ? 'bg-red-500/10 text-red-400 border-red-500/20' :
                              bet.status === 'void' ? 'bg-gray-500/10 text-gray-400 border-gray-500/20' :
                              'bg-blue-500/10 text-blue-400 border-blue-500/20'
                            }`}>
                              {bet.status.toUpperCase()}
                            </Badge>
                            <div className="text-brand-gray-7 text-sm mt-1">
                              {new Date(bet.created_at).toLocaleDateString()}
                            </div>
                          </div>
                        </div>
                        {bet.notes && (
                          <div className="text-brand-gray-7 text-sm mt-2">{bet.notes}</div>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}