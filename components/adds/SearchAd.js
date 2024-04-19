import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { showAdds } from "./service";
import LoadingIcon from "../LoadingIcon";
import { searchAdvertisements } from "../api";

function AdvertisementList() {
  const [advertisements, setAdvertisements] = useState([]);
  const [loading, setLoading] = useState(false);
  const { name } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await searchAdvertisements(name);
        setAdvertisements(data);
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [name]);

  return (
    <>
      {loading && <LoadingIcon />}
      {showAdds(advertisements)}
    </>
  );
}

export default AdvertisementList;
