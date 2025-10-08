import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useAuth } from '@/contexts/AuthContext';

export interface BettingOpportunity {
  id: string;
  type: 'arbitrage' | 'positive_ev' | 'promo_conversion';
  sport: string;
  game_info: {
    home_team: string;
    away_team: string;
    date: string;
    channel?: string;
  };
  opportunity_data: any;
  profit_amount: number;
  profit_percentage: number;
  is_active: boolean;
  expires_at: string;
  created_at: string;
}

export function useBettingOpportunities(type?: string) {
  const [opportunities, setOpportunities] = useState<BettingOpportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setOpportunities([]);
      setLoading(false);
      return;
    }

    fetchOpportunities();
  }, [user, type]);

  const fetchOpportunities = async () => {
    try {
      setLoading(true);
      let query = supabase
        .from('betting_opportunities_2025_10_07_21_00')
        .select('*')
        .eq('is_active', true)
        .order('created_at', { ascending: false });

      if (type) {
        query = query.eq('type', type);
      }

      const { data, error } = await query;

      if (error) throw error;

      setOpportunities(data || []);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setOpportunities([]);
    } finally {
      setLoading(false);
    }
  };

  return { opportunities, loading, error, refetch: fetchOpportunities };
}

export function useUserProfile() {
  const [profile, setProfile] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setProfile(null);
      setLoading(false);
      return;
    }

    fetchProfile();
  }, [user]);

  const fetchProfile = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_profiles_2025_10_07_21_00')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) throw error;

      setProfile(data);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  const updateProfile = async (updates: any) => {
    try {
      const { data, error } = await supabase
        .from('user_profiles_2025_10_07_21_00')
        .update(updates)
        .eq('id', user?.id)
        .select()
        .single();

      if (error) throw error;

      setProfile(data);
      return { data, error: null };
    } catch (err: any) {
      return { data: null, error: err };
    }
  };

  return { profile, loading, error, updateProfile, refetch: fetchProfile };
}

export function useBettingHistory() {
  const [history, setHistory] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) {
      setHistory([]);
      setLoading(false);
      return;
    }

    fetchHistory();
  }, [user]);

  const fetchHistory = async () => {
    try {
      setLoading(true);
      const { data, error } = await supabase
        .from('user_betting_history_2025_10_07_21_00')
        .select('*')
        .eq('user_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;

      setHistory(data || []);
      setError(null);
    } catch (err: any) {
      setError(err.message);
      setHistory([]);
    } finally {
      setLoading(false);
    }
  };

  const addBet = async (betData: any) => {
    try {
      const { data, error } = await supabase
        .from('user_betting_history_2025_10_07_21_00')
        .insert([{ ...betData, user_id: user?.id }])
        .select()
        .single();

      if (error) throw error;

      setHistory(prev => [data, ...prev]);
      return { data, error: null };
    } catch (err: any) {
      return { data: null, error: err };
    }
  };

  return { history, loading, error, addBet, refetch: fetchHistory };
}