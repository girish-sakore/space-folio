import { supabase } from '../utils/supabaseClient';

const trackQrVisit = async (data) => {
  let geoData = { country_name: "Unknown", city: "Unknown" };

  try {
    // 1. Fetch geographic details anonymously without needing an API key
    const geoResponse = await fetch('https://ipapi.co/json/');
    if (geoResponse.ok) {
      geoData = await geoResponse.json();
    }
  } catch (geoError) {
    console.warn("Could not fetch location data:", geoError.message);
  }

  try {
    // 2. Insert the enriched payload straight into Supabase
    const { error } = await supabase
      .from('qr_visits')
      .insert([
        {
          source: data.source,
          timestamp: data.timestamp,
          user_agent: data.userAgent,
          page_path: data.pagePath,
          referrer: data.referrer,
          // Storing geographic location instead of a raw IP address
          country: geoData.country_name,
          city: geoData.city,
        }
      ]);

    if (error) throw error;

    return { success: true };
  } catch (error) {
    console.error('Tracking Error:', error.message);
    throw new Error(`Supabase tracking failed: ${error.message}`);
  }
};

export default trackQrVisit;