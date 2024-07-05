// src/components/DataComponent.jsx
import React, { useEffect, useState } from "react";
import axios from "axios";

const DataComponent = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("https://api.example.com/data"); // Replace with your API endpoint
        setData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      {loading ? "Loading..." : <pre>{JSON.stringify(data, null, 2)}</pre>}
    </div>
  );
};

export default DataComponent;
