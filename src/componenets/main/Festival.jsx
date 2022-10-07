import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { instance } from "../../shared/Api";
import Slider from "react-slick";

const Festival = () => {
  const navigate = useNavigate();

  const settings = {
    // dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    pauseOnHover: true,
  };

  const [festival, setFestival] = useState();

  const getEvents = async () => {
    const res = await instance.get("/api/events");
    setFestival(res.data);
  };

  useEffect(() => {
    getEvents();
  }, []);

  if (festival === undefined) {
    return;
  }

  return (
    <StFestival>
      <Title>이 달의 축제</Title>
      <FestivalList>
        <Slider {...settings}>
          {festival.map((festival) => {
            return (
              <Card
                key={festival.id}
                onClick={() => (window.location.href = "{festival.linkUrl}")}
              >
                <img alt="" src={festival.imageUrl} />
                <p style={{ fontWeight: "bold" }}>{festival.title}</p>
                <p>{festival.period}</p>
              </Card>
            );
          })}
        </Slider>
      </FestivalList>
    </StFestival>
  );
};

export default Festival;

const StFestival = styled.div`
  max-width: 428px;
  width: 100%;
  text-align: center;
  font-size: 37px;
  color: #79b9d3;
  height: 500px;
  padding-top: 80px;
`;

const Title = styled.div`
  color: white;
  background: #c4e0ec;
  border-radius: 30px;
  width: 236px;
  height: 50px;
  font-size: 35px;
  line-height: 46px;
  margin: 35px auto;
  padding-top: 5px;
`;

const FestivalList = styled.div`
  height: 200px;
`;

const Card = styled.div`
  img {
    width: 100%;
    border-radius: 30px;
    &:hover {
      cursor: pointer;
      box-shadow: 4px 4px 4px rgba(0, 0, 0, 0.3);
    }
  }
  p {
    margin: 20px auto;
    font-size: 25px;
    color: #414141;
  }
`;
