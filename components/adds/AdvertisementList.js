import React, { useState, useEffect } from "react";
import LoadingIcon from "../LoadingIcon";
import { fetchAdvertisements } from "../api";
import Adds from "./Adds";

function AdvertisementList() {
  const [advertisements, setAdvertisements] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
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
      <Adds advertisements={advertisements} />
    </>
  );
}

export default AdvertisementList;
