// src/utils/getAvailableColors.ts
import { supabase } from "@/lib/supabaseClient";

export const getAvailableColors = async (
  startDate: string,
  endDate: string
): Promise<string[]> => {
  const { data, error } = await supabase.rpc("get_available_colors", {
    start: startDate,
    end: endDate,
  });

  if (error) {
    console.error("Error fetching available colors:", error.message);
    return [];
  }

  return data || [];
};
