import React, { useState }  from 'react'
import MapCose from './MapCose';
import styled from "styled-components";
import CoseHeader from '../header/CoseHeader';
import { useEffect } from 'react';
import ModalPortal from '../modal/ModalPortal';
import CoseImage from '../modal/CoseImage';



const MapLine = () => {
    const [modal, setModal] = useState(false);
    const [titleMessage, setTitleMessage] = useState("");
    const [isTitle, setIsTitle] = useState(false);
    const [title, setTitle] = useState(
      JSON.parse(localStorage.getItem('NAME')) || ""
     );

    const onChangeTitle = (e) => {
      const TitleRegex = /^(?=.*[a-zA-z0-9가-힣ㄱ-ㅎㅏ-ㅣ!@#$%^*+=-]).{1,20}$/;
      const TitleCurrnet = e.target.value;
      setTitle(TitleCurrnet);
  
      if (!TitleRegex.test(TitleCurrnet)) {
        setTitleMessage("20글자 이하로 작성해주세요 ");
        setIsTitle(false);
      } else {
        setTitleMessage(null);
        setIsTitle(true);
      }
    };
    //Help모달 
    const onClose = () => {
      setModal(false)
    };
    const onOpen = () => {
      setModal(true)
    };

    useEffect(() => {
      localStorage.setItem('NAME', JSON.stringify(title))
    },[title]);
    
    return (
      <>
        <CoseBox>
          <CoseHeader/>
          <HelpP>추가하고 싶은 장소를 상단 검색창에 입력해주세요</HelpP>
          <CoseDiv>
           <NameDiv>
              <p>Course</p>
           </NameDiv>
           <HelpDiv>
              <span onClick={onOpen}>?</span>
            </HelpDiv>
          </CoseDiv>
            <TitleDiv>
              <PTitle>제목</PTitle>
              <InputTit
                type="text"
                name="title"
                value={title}
                onChange={onChangeTitle}
                placeholder="제목을 입력해주세요"
              />
            </TitleDiv>
              <Message>
                {title.length > 0 && <p style={{ color: "red" }}>{titleMessage}</p>}
              </Message>
              <DescDiv>
                <p>코스를 마우스로 드래그해서 조정할 수 있습니다</p>
              </DescDiv>
            <MapCose title={title} isTitle={isTitle}/>
            <ModalPortal>
                {modal && <CoseImage onClose={onClose}/>}
            </ModalPortal>
        </CoseBox>
      </>
    )
  }

export default MapLine

const CoseBox = styled.div`
  width: 100%;
  max-width: 428px;
  margin: 0 auto;
  font-family: bold;
`
const HelpP = styled.p`
  padding-top:8.8rem;
  text-align:left;
  margin-left:3.2rem;
  color:rgb(255, 133, 133);
`
const CoseDiv =styled.div`
  text-align:center;
  padding-top:3.5rem;
  display:flex;
  justify-content:center;
  align-items:center;
  p{
    font-size:3rem;
    color:#abd4e2;
  }
`
const HelpDiv = styled.div`
  width:50%;
  margin:auto;
  display:flex;
  justify-content:flex start;
  align-items:center;
    span{ 
      font-size:2.3rem;
      width:25%;
      border:3px solid #abd4e2;
      text-align:center;
      border-radius:35px;
      background-color:#abd4e2;
      color:#fff;
      cursor: pointer;
      &:hover{
        border:3px solid #abd4e2;
        background-color:#fff;
        color:black;
      }
    }
`
const NameDiv = styled.div`
  width:90%;
  display:flex;
  justify-content:flex-end;
  align-items:center;
  text-align:center;
  margin-right:1rem;
`
const TitleDiv = styled.div`
  display:flex;
  padding-top:1.8rem;
  width:80%;
  margin: auto;
`
const PTitle = styled.p`
  padding-left: 0.5rem;
  height: 48px;
  align-items: center;
  display: flex;
  margin-top:0.2rem;
  font-size: 20px;
  margin-right:0.5rem;
`;
const InputTit = styled.input`
  width: 80%;
  height: 52px;
  background-color: rgba(172, 212, 228, 0.35);
  border-radius: 15px;
  border: none;
  padding-left:0.5rem;
  font-family: bold;
  font-size: 18px;
`
const Message = styled.div`
  margin-bottom: 25px;
  font-weight: 500;
  width: 85%;
  font-size: 1rem;
  text-align: end;
  margin-top:0.5rem;
`;
const DescDiv = styled.div`
  width:80%;
  margin: auto;
  text-align:right;
  color: rgb(255, 133, 133);
`