// AdvertisementList.js
import React, { useState, useEffect } from "react";
import LoadingIcon from "../LoadingIcon";
import { fetchAdvertisements, fetchAdvertisementsWithSort } from "../api"; // предполагается, что fetchAdvertisements принимает параметр сортировки
import Adds from "./Adds";
import Sorting from "../Sorting";

function AdvertisementList() {
  const [advertisements, setAdvertisements] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sortCriteria, setSortCriteria] = useState(null); // default sorting by date

  useEffect(() => {
    if (sortCriteria !== null) {
      const fetchData = async (criteria) => {
        setAdvertisements([]);
        setLoading(true);
        try {
          const data = await fetchAdvertisementsWithSort(criteria);
          setAdvertisements(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      fetchData(sortCriteria);
    } else {
      const fetchData = async () => {
        setLoading(true);
        try {
          const data = await fetchAdvertisements();
          setAdvertisements(data);
        } catch (error) {
          console.error(error);
        } finally {
          setLoading(false);
        }
      };
      fetchData();
    }
  }, [sortCriteria]);

  const handleSort = (criteria) => {
    setSortCriteria(criteria);
  };

  return (
    <>
      <Sorting onSort={handleSort} />
      {loading && <LoadingIcon />}
      <Adds advertisements={advertisements} />
    </>
  );
}

export default AdvertisementList;
