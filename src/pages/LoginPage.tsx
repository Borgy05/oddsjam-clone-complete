import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useAuth } from "@/contexts/AuthContext";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const { signIn } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const { error } = await signIn(email, password);
    
    if (!error) {
      navigate('/');
    }
    
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-oj-bg-black flex items-center justify-center px-4">
      <Card className="w-full max-w-md bg-brand-gray-1 border-brand-gray-3">
        <CardHeader className="text-center">
          <CardTitle className="text-2xl text-brand-gray">Sign in to your account</CardTitle>
          <CardDescription className="text-brand-gray-7">
            Enter your email and password to access your OddsJam account
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email" className="text-brand-gray">Email address</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-brand-gray-2 border-brand-gray-3 text-brand-gray"
                required
              />
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-brand-gray">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-brand-gray-2 border-brand-gray-3 text-brand-gray"
                required
              />
            </div>

            <Button type="submit" className="w-full bg-brand-blue hover:bg-brand-blue-2" disabled={loading}>
              {loading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full bg-brand-gray-3" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-brand-gray-1 px-2 text-brand-gray-7">or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <Button variant="outline" className="border-brand-gray-3 text-brand-gray-7 hover:bg-brand-gray-2">
              <span className="sr-only">Continue with Google</span>
              G
            </Button>
            <Button variant="outline" className="border-brand-gray-3 text-brand-gray-7 hover:bg-brand-gray-2">
              <span className="sr-only">Continue with Apple</span>
              A
            </Button>
            <Button variant="outline" className="border-brand-gray-3 text-brand-gray-7 hover:bg-brand-gray-2">
              <span className="sr-only">Continue with Phone</span>
              📱
            </Button>
          </div>

          <div className="text-center">
            <p className="text-brand-gray-7 text-sm">
              Don't have an account?{" "}
              <Link to="/subscribe" className="text-brand-blue hover:text-brand-blue-3">
                Start a free trial
              </Link>
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}