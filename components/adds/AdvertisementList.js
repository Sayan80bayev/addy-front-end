import React, { useState, useEffect } from "react";
import LoadingIcon from "../LoadingIcon";
import { fetchAdvertisements } from "../api";
import { showAdds } from "./service";

function AdvertisementList() {
  const [advertisements, setAdvertisements] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAdvertisements();
        setAdvertisements(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  return (
    <>
      {loading && <LoadingIcon />}
      {showAdds(advertisements)}
    </>
  );
}

export default AdvertisementList;
