export const getMapping = async (getData) => {
  try {
    const response = await fetch(`http://localhost:8082/${getData}`, {
      headers: { token: localStorage.getItem("token") },
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching data:", error);
  }
};

export const postMapping = async (postData) => {

  const response = await fetch(`http://localhost:8082/${postData.url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
    body: JSON.stringify(postData.body),
  });

  if (!response.ok) {
   alert("invalid credentials")
  }
  const data = await response.text();
  return true;
};

export const postMappingLogin = async (postData) => {
  const response = await fetch(`http://localhost:8082/${postData.url}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(postData.body),
  });
  if (!response.ok) {
   alert("invalid credentials")
   window.location.href="/"
  }
  const data = await response.text();
  localStorage.setItem("token",data);
  return true;
};

export const putMapping = async (putData) => {
  const response = await fetch(`http://localhost:8082/${putData.url}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      token: localStorage.getItem("token"),
    },
    body: JSON.stringify(putData.body),
  });
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(`PUT request failed with status: ${response.status}`);
  }
};

export const deleteMapping = async (value) => {
  const response = await fetch(`http://localhost:8082/${value}`, {
    method: "DELETE",
    headers: {
      token: localStorage.getItem("token"),
    },
  });
  if (response.ok) {
    return response.json();
  } else {
    throw new Error(`DELETE request failed with status: ${response.status}`);
  }
};
