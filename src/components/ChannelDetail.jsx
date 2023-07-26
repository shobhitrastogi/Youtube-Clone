import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box } from "@mui/material";

import { Videos, ChannelCard } from "./";
import { FetchFromAPI } from "../utils/FetchFromAPI";

const ChannelDetail = () => {
  const [channelDetail, setChannelDetail] = useState();
  const [videos, setVideos] = useState(null);

  const { id } = useParams();

  useEffect(() => {
    const fetchResults = async () => {
      try {
        const data = await FetchFromAPI(`channels?part=snippet&id=${id}`);

        // Check if data.items is an array with at least one element before accessing it
        if (Array.isArray(data?.items) && data.items.length > 0) {
          setChannelDetail(data.items[0]);
        } else {
          setChannelDetail(null); // Set to null if no channel detail is found
        }
        const videosData = await FetchFromAPI(
          `search?channelId=${id}&part=snippet%2Cid&order=date`
        );

        // Check if videosData.items is an array before accessing it
        if (Array.isArray(videosData?.items)) {
          setVideos(videosData.items);
        } else {
          setVideos(null); // Set to null if no videos are found
        }
      } catch (error) {
        console.error("Error fetching data:", error);
        setChannelDetail(null); // Set to null in case of an error
        setVideos(null); // Set to null in case of an error
      }
    };

    fetchResults();
  }, [id]);

  return (
    <Box minHeight="95vh">
      <Box>
        <div style={{
          height:'300px',
          background: 'linear-gradient(90deg, rgba(0,238,247,1) 0%, rgba(206,3,184,1) 100%, rgba(0,212,255,1) 100%)',
          zIndex: 10,
        }} />
        <ChannelCard channelDetail={channelDetail} marginTop="-93px" />
      </Box>
      <Box p={2} display="flex">
      <Box sx={{ mr: { sm: '100px' } }}/>
        <Videos videos={videos} />
      </Box>
    </Box>
  );
};

export default ChannelDetail;