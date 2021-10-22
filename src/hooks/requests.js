const API_URL='http://localhost:5000/api/v1'

async function httpGetPlanets() {
  const response = await fetch(`${API_URL}/planets`);
  return await response.json();
  // Load planets and return as JSON.
}
// Load launches, sort by flight number, and return as JSON.
async function httpGetLaunches() {
  const response = await fetch(`${API_URL}/launches`);
  const retrievedLaunches = await response.json();
  return retrievedLaunches.sort((x, y) => {
    return x.flightNumber - y.flightNumber;
  });
}

//Submit given launch data to launch system.
async function httpSubmitLaunch(launch) {

  try {
    return await fetch(`${API_URL}/launches`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(launch),
    });
  } catch (error) {
    return {
      ok: false,
    };
  }
  
}

async function httpAbortLaunch(id) {
  try {
    return await fetch(`${API_URL}/launches/${id}`, {
   method:"DELETE",
 })
  } catch (error) {
    return {
      ok:false,
    }
  }
  
  
}

export {
  httpGetPlanets,
  httpGetLaunches,
  httpSubmitLaunch,
  httpAbortLaunch,
};