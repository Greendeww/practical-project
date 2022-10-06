/* global kakao */
import React, { useCallback } from 'react'
import styled from "styled-components";
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/scrollbar';
import 'swiper/css';
import { useEffect,useState } from 'react';
import { Map, MapMarker } from "react-kakao-maps-sdk";
import DetailForm from '../../componenets/details/DetailForm';
import { useDispatch, useSelector } from 'react-redux';
import { onLikeDetail, _getDetail} from '../../redux/modules/post';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { _getComments } from '../../redux/modules/comment';
import Review from '../../componenets/details/Review';
import DetailImage from '../../componenets/details/DetailImage';
import { instance } from '../../shared/Api';
import StarDetail from '../../componenets/star/StarDetail';
import Like from '../../componenets/like/Like';
import Header from '../../componenets/header/Header';
import { FaStar } from 'react-icons/fa';
import ThemeList from '../../componenets/theme/ThemeList';


const Detail = () => {
  const navigate = useNavigate();
  const {id} = useParams();
  const dispatch = useDispatch();
  const [formOpen,setFormOpen] = useState(false)
  const [posts, setPosts] = useState("")
  const [commentList,setCommentList] = useState([])
  const [currentComments,setCurrnetComments] = useState([])
  const [page, setPage] = useState(1);
  const [postPerPage] = useState(5)
  const [number, setNumber] = useState(1)
  const indexOfLastPost = page*postPerPage;
  const indexOfFirstPage = indexOfLastPost - postPerPage
  // console.log(posts)

  const close = () => {
    setFormOpen(false);
  }
  const {isLoading, error,comment} = useSelector((state) => state.comment)

  const fetch = async () => {
    const response = await instance.get(`/api/place/${id}`); 
    setPosts(response?.data)
  }
  useEffect(() => {
      dispatch(_getComments(id));
      // dispatch(_getDetail(id))
      fetch()
  }, []);

  useEffect(() => {
      setCommentList([...comment].reverse())
      setCurrnetComments(commentList.slice(indexOfFirstPage, indexOfLastPost))
  },[indexOfFirstPage,indexOfLastPost,page,comment]);

  if (isLoading) {
    return <div>로딩중....</div>;
  }
  
  if(error) {
    return <div>{error.message}</div>;
  }

  const handlePageChange = (page) => {
    setPage(page)
  }
  // const onLike = async (event) => {
  //   event.preventDefault();
  //   dispatch(onLikeDetail(id));
  // };
  const newText = posts?.content?.replace(/(<([^>]+)>)/gi, "\n"); //태그 제거
  const tmp = newText?.replace(/&nbsp;/gi, " "); //공백 제거
  const tmp2 = tmp?.replace(/&lt;/gi, ""); //부등호(<) 제거
  const tmp3 = tmp2?.replace(/&gt;/gi, ""); //부등호(>) 제거

  return (
    <>
    <BoxDiv>
    <Header/>
      <Box>
        <Cover>
          <ImgDiv>
          <ImgCover>
             <DetailImage post={posts} key={posts.id}/>
             <ThemeDiv>
              <ThemeList post={posts}/>
             </ThemeDiv>
             <TitleLikeDiv>
              <TitleSpan>{posts.title}</TitleSpan> 
              <Like id={id}></Like>
             </TitleLikeDiv>

             {/* {posts.likes} */}
             <StarThemeDiv>
              <div style={{display:"flex",}}>
                <FaStar style={{color:"#fcc419",marginRight:"0.3rem",}}/>
                <span style={{fontWeight:"600",lineHeight:"1rem"}}>{posts.star}</span>
                <span style={{color:"#8f8f8f",lineHeight:"1rem"}}>/5</span>
              </div>
             </StarThemeDiv>
          </ImgCover>
          </ImgDiv>
        </Cover>
        <Title>
          </Title> 
          <Location>
            <div style={{justifyContent:"center",marginBottom:"30px"}}>
            <p style={{color:"#BFB8B8",fontSize:"1.3rem"}}>위치</p>
            <p style={{fontWeight:"600"}}>{posts.address}</p>
            </div>
            <MapDiv>
              <Map
                center={{ lat: posts?.mapY || "", lng: posts?.mapX || ""}}
                level={8}
                style={{ width: "100%", height: "30vh" ,borderRadius: "20px",margin:"0 auto"}}
              >
              <MapMarker 
                position={{
                  lat: posts?.mapY || "",
                  lng: posts?.mapX || "",
                }}
              /> 
              </Map>
            </MapDiv>
          </Location>
          <DescDiv>
            <p style={{color:"#BFB8B8",fontSize:"1.3rem"}}>설명</p>
            <DesP>{tmp3}</DesP>
          </DescDiv>
          <SearchDate>
            <SearchP>더 알아보기</SearchP>
            <SearchDiv>
              <ALink target='_blank' rel='noreferrer' href = {`https://search.naver.com/search.naver?where=nexearch&sm=top_hty&fbm=1&ie=utf8&query=${posts.title}`}>
                <ImgLink alt='' src='https://www.siksinhot.com/static2/images/mobile/bg_site_img01.gif'/>
              </ALink>
              <ALink target='_blank' rel='noreferrer' href = {`https://search.daum.net/search?w=tot&DA=YZR&t__nil_searchbox=btn&sug=&sugo=&sq=&o=&q=${posts.title}`}>
                <ImgLink alt='' src='https://www.siksinhot.com/static2/images/mobile/bg_site_img02.gif'/>
              </ALink>
              <ALink target='_blank' rel='noreferrer' href = {`https://www.google.com/search?q=${posts.title}`}>
                <ImgLink alt='' src='https://www.siksinhot.com/static2/images/mobile/bg_site_img03.gif'/>
              </ALink>
            </SearchDiv>
          </SearchDate>
          {formOpen === true
          ?<DetailForm close={close}/>
          :null}
          <Review comment={comment} number={number}/>
          <h1 style={{color:"white"}}>공백</h1>
      </Box>
    </BoxDiv>
    </>
  )
}

export default Detail

const BoxDiv =styled.div`
  width: 100%;
  max-width:428px;
  margin: 0 auto;
`
const Box = styled.div`
  padding-top:4rem;
  width: 100%;
  max-width:428px;
  margin: 0 auto;
  /* border:2px solid #79B9D3; */
  font-family: "Noto Sans KR", sans-serif;
`;
const Cover = styled.div`
  display: flex;
  -webkit-box-pack: center;
  justify-content: center;
  /* background: rgb(249, 249, 249); */
  margin: 0 auto;
  margin-bottom:20px;
`
const ImgDiv =styled.div`
  background-color:#EBF8FF;
  padding: 20px 0px 20px;
  z-index:0;
`
const ImgCover = styled.div`
  flex-shrink: 0;
  width:90%;
  max-width: 428px;
  min-height:430px;
  max-height:430px;
  justify-content:center;
  align-items:center;
  margin: 0 auto;
  
`
const ThemeDiv =styled.div`
  padding-top:0.8rem;
`
const TitleLikeDiv =styled.div`
  display:flex;
  justify-content:space-between;
  padding-top:0.5rem;
`
const TitleSpan =styled.b`
  font-weight:700;
  font-size:18px;
`
const Img = styled.img`
  border: 1px solid rgb(238, 238, 238);
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  margin-bottom:20px;
  z-index:-10;
`
const Title = styled.div`
  margin:0 auto;
  width:100%;
  justify-content:space-between;
  display:flex;
`
const StarThemeDiv =styled.div`
  padding-top:0.5rem;
  display:flex;
  /* justify-content:space-between; */
  align-items:center;
`
const Location = styled.div`
  margin: 0 auto;
  width:90%;
  justify-content:center;
  align-items:center;
  padding-top:30px;
`
const MapDiv =styled.div`
  width: 100%;
  justify-content:center;
  align-items:center;
  margin:0 auto;
`
const DescDiv = styled.div`
  width:90%;
  justify-content:center;
  align-items:center;
  margin:0 auto;
  padding-top:50px;
`
const DesP =styled.p`
  text-align:justify;
  white-space:pre-wrap;
`
const SearchDate = styled.div`
  padding-top:20px;
  width:90%;
  margin:0 auto;
`
const SearchP = styled.p`
  color:#BFB8B8;
  font-size:1.3rem;
  margin-bottom:10px;
`
const SearchDiv = styled.div`
  display:flex;
  justify-content:flex-start
`
const ALink = styled.a`
  width:6rem;
  height:40px;
`
const ImgLink = styled.img`
 width:100%;
 height:100%;
`
// const CommentDiv = styled.div`
//   border-top: 3px solid #522772;
//   border-bottom: 3px solid #522772;
//   text-align:start;
//   margin-top:10px;
// `
// const FormBut = styled.div`
//  display:flex;
//  justify-content:flex-end;
//  margin-top:60px;
// `