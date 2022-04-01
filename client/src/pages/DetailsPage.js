import React, {useCallback, useContext, useEffect, useState} from "react";
import { useParams } from "react-router-dom";
import { useHttp } from "../hooks/http.hook";
import { AuthContext } from "../context/AuthContext";
import {Loader} from "../components/Loader";
import {LinkCard} from "../components/LinkCard";

export const DetailsPage = () => {
  const { token } = useContext(AuthContext);
  const [link, setLink] = useState(null);
  const linkId = useParams();
  const { request, loading } = useHttp();

  const getLink = useCallback(async () => {
    try {
      const fetched = await request(`/api/links/${linkId.id}`, "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setLink(fetched)
    } catch (e) {
      console.log(e)
    }
  }, [token, linkId, request]);

  useEffect(()=>{
    getLink()
  },[getLink])

  if(loading){
    return <Loader/>
  }

  return (
      <>
        {!loading&&link&&<LinkCard link={link}/>}
      </>
  )

};
