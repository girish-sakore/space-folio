const trackQrVisit = async (data) => {
  const api_base_url = import.meta.env.VITE_API_URL || "https://proximacloud.in/fast/api";
  const response = await fetch(`${api_base_url}/track-qr-visit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (response.ok) {
    const result = await response.json();
    return { success: true, data: result };
  }

  throw new Error(`API failed with status ${response.status}`);
};

export default trackQrVisit;