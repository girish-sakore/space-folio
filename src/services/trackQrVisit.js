import { supabase } from '../utils/supabaseClient';

const trackQrVisit = async (data) => {
  try {
    // Maps your camelCase frontend object to snake_case Supabase columns
    const { data: result, error } = await supabase
      .from('qr_visits')
      .insert([
        {
          source: data.source,
          timestamp: data.timestamp,
          user_agent: data.userAgent,
          page_path: data.pagePath,
        }
      ]); // Returns the created row matching your old API footprint

    if (error) throw error;

    return { success: true, data: result };
  } catch (error) {
    console.error('Tracking Error:', error.message);
    throw new Error(`Supabase tracking failed: ${error.message}`);
  }
};

export default trackQrVisit;