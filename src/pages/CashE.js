import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";

const CashE = () => {
  const [params] = useSearchParams();

  useEffect(() => {
    if (params.get("id")) redirectUserCashE(params.get("id"));
  }, [params]);

  const redirectUserCashE = async (id) => {
    const res = await axios.get(`https://dgtm.co/cashe/${id}`);

    window.location.href = res.data.url;
  };

  return (
    <div>
      <span class="ml-2 dot-pulse"></span>
    </div>
  );
};

export default CashE;
