export interface PlaceRow {
  rank: string;
  rank_numeric: number;
  tied: boolean;
  name: string;
  fatality_rate_per_100k: number;
  deaths_2020_2024: number;
  deaths_2015_2019: number;
  trend: number;
}

export interface KeyStats {
  report_title: string;
  publisher: string;
  period_analyzed: string;
  headline: {
    total_road_deaths_2024: number;
    pedestrian_deaths_2024: number;
    pedestrian_fatality_increase_2009_2024_pct: number;
    pedestrian_fatality_decrease_2022_2024_pct: number;
    pedestrian_share_of_2019_deaths: number;
    pct_fatalities_on_state_owned_roads_2024: number;
    years_to_return_to_2009_levels_at_current_decline_rate: number;
    additional_deaths_projected_by_2042_at_current_rate: number;
  };
  measurement_note: string;
  demographics: {
    note: string;
    national_total_rate: number;
    by_race_ethnicity: Record<string, number>;
    by_age: Record<string, number>;
    income_note: string;
    race_disparity_note: string;
  };
  international_comparison: {
    us_traffic_fatality_rate_per_100k: number;
    peer_benchmark_rate_per_100k: number;
    peer_benchmark_note: string;
    us_pedestrian_fatality_change_2014_2024_pct: number;
    us_pedestrian_deaths_2014: number;
    us_pedestrian_deaths_2024: number;
    peer_examples: Record<string, { change_pct?: number; note?: string; traffic_fatality_rate_per_100k?: number }>;
    lives_that_could_have_been_saved_if_us_matched_peers_over_10yr: number;
  };
  case_study: {
    location: string;
    context: string;
    problems_identified: string[];
    interventions_shown: string[];
  };
  methodology: {
    metro_ranking_count: number;
    state_ranking_count: number;
    comparison_periods: string[];
    trend_field_meaning: string;
  };
}
