-- Enable RLS
ALTER TABLE auth.users ENABLE ROW LEVEL SECURITY;

-- Create user profiles table
CREATE TABLE public.user_profiles_2025_10_07_21_00 (
    id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
    email TEXT NOT NULL,
    full_name TEXT,
    username TEXT UNIQUE,
    subscription_plan TEXT DEFAULT 'free' CHECK (subscription_plan IN ('free', 'gold', 'platinum')),
    subscription_status TEXT DEFAULT 'inactive' CHECK (subscription_status IN ('active', 'inactive', 'trial', 'cancelled')),
    trial_ends_at TIMESTAMPTZ,
    subscription_ends_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create betting opportunities table (for arbitrage, +EV, promo conversions)
CREATE TABLE public.betting_opportunities_2025_10_07_21_00 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    type TEXT NOT NULL CHECK (type IN ('arbitrage', 'positive_ev', 'promo_conversion')),
    sport TEXT NOT NULL,
    game_info JSONB NOT NULL, -- Store game details, teams, etc.
    opportunity_data JSONB NOT NULL, -- Store odds, books, calculations, etc.
    profit_amount DECIMAL(10,2),
    profit_percentage DECIMAL(5,2),
    is_active BOOLEAN DEFAULT true,
    expires_at TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create user betting history table
CREATE TABLE public.user_betting_history_2025_10_07_21_00 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    opportunity_id UUID REFERENCES public.betting_opportunities_2025_10_07_21_00(id),
    bet_type TEXT NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    potential_profit DECIMAL(10,2),
    status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'won', 'lost', 'void')),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create user preferences table
CREATE TABLE public.user_preferences_2025_10_07_21_00 (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    favorite_sports TEXT[] DEFAULT '{}',
    notification_settings JSONB DEFAULT '{"email": true, "push": true, "arbitrage": true, "positive_ev": true, "promo": true}',
    betting_bankroll DECIMAL(10,2),
    risk_tolerance TEXT DEFAULT 'medium' CHECK (risk_tolerance IN ('low', 'medium', 'high')),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create RLS policies
-- User profiles policies
CREATE POLICY "Users can view own profile" ON public.user_profiles_2025_10_07_21_00
    FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update own profile" ON public.user_profiles_2025_10_07_21_00
    FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Users can insert own profile" ON public.user_profiles_2025_10_07_21_00
    FOR INSERT WITH CHECK (auth.uid() = id);

-- Betting opportunities policies (read-only for users, admin can manage)
CREATE POLICY "Authenticated users can view betting opportunities" ON public.betting_opportunities_2025_10_07_21_00
    FOR SELECT USING (auth.role() = 'authenticated');

-- User betting history policies
CREATE POLICY "Users can view own betting history" ON public.user_betting_history_2025_10_07_21_00
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own betting history" ON public.user_betting_history_2025_10_07_21_00
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own betting history" ON public.user_betting_history_2025_10_07_21_00
    FOR UPDATE USING (auth.uid() = user_id);

-- User preferences policies
CREATE POLICY "Users can view own preferences" ON public.user_preferences_2025_10_07_21_00
    FOR SELECT USING (auth.uid() = user_id);

CREATE POLICY "Users can insert own preferences" ON public.user_preferences_2025_10_07_21_00
    FOR INSERT WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can update own preferences" ON public.user_preferences_2025_10_07_21_00
    FOR UPDATE USING (auth.uid() = user_id);

-- Enable RLS on all tables
ALTER TABLE public.user_profiles_2025_10_07_21_00 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.betting_opportunities_2025_10_07_21_00 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_betting_history_2025_10_07_21_00 ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.user_preferences_2025_10_07_21_00 ENABLE ROW LEVEL SECURITY;

-- Create function to handle user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user_2025_10_07_21_00()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.user_profiles_2025_10_07_21_00 (id, email, full_name)
    VALUES (NEW.id, NEW.email, NEW.raw_user_meta_data->>'full_name');
    
    INSERT INTO public.user_preferences_2025_10_07_21_00 (user_id)
    VALUES (NEW.id);
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user profile creation
CREATE TRIGGER on_auth_user_created_2025_10_07_21_00
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user_2025_10_07_21_00();

-- Insert sample betting opportunities
INSERT INTO public.betting_opportunities_2025_10_07_21_00 (type, sport, game_info, opportunity_data, profit_amount, profit_percentage, expires_at) VALUES
('arbitrage', 'NFL', 
 '{"home_team": "Philadelphia Eagles", "away_team": "New York Giants", "date": "Thursday • 8:15PM", "channel": "Amazon"}',
 '{"book1": {"name": "DraftKings", "team": "Eagles", "odds": "+150", "bet": "$100"}, "book2": {"name": "FanDuel", "team": "Giants", "odds": "+130", "bet": "$108.70"}}',
 41.30, 19.8, NOW() + INTERVAL '2 hours'),

('positive_ev', 'NFL',
 '{"home_team": "Kansas City Chiefs", "away_team": "Buffalo Bills", "date": "Sunday • 4:25PM", "channel": "FOX"}',
 '{"player": "Josh Allen Over 2.5 Passing TDs", "book": "DraftKings", "odds": "+180", "fair_odds": "+140", "bet_amount": "$50"}',
 6.20, 12.4, NOW() + INTERVAL '1 hour'),

('promo_conversion', 'NBA',
 '{"home_team": "Los Angeles Lakers", "away_team": "Golden State Warriors", "date": "Tonight • 10:00PM", "channel": "ESPN"}',
 '{"promo_type": "$100 Free Bet", "book": "DraftKings", "hedge_book": "FanDuel", "hedge_odds": "+180", "conversion": "68%"}',
 68.00, 68.0, NOW() + INTERVAL '2 hours');