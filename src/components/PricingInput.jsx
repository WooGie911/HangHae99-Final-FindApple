import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { __checkPrice, __getPriceInfo } from "../redux/modules/PriceSlice";
import Footer from "./Footer";
import Layout from "./Layout";

const PricingInput = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const initialState = {
    step1: true,
    step2: false,
    step3: false,
    step4: false,
    step5: false,
    category: " ",
    years: " ",
    model: " ",
    options: " ",
  };
  const [tag, setTag] = useState(initialState);
  const { tagList } = useSelector((state) => state.price);
  const { tagList2 } = useSelector((state) => state.price);
  const [save, setSave] = useState([]);
  const [save2, setSave2] = useState({});
  const [subTag, setSubTag] = useState({});

  const onChangeHandler1 = (e) => {
    const { value, name } = e.target;
    setTag({
      ...tag,
      [name]: value,
    });
    dispatch(__getPriceInfo(value));
  };
  const onChangeHandler2 = (e) => {
    const { value, name } = e.target;
    setTag({
      ...tag,
      [name]: value,
    });
    dispatch(__getPriceInfo(`${tag.category}/${value}`));
  };
  const onChangeHandler3 = (e) => {
    const { value, name } = e.target;
    setTag({
      ...tag,
      [name]: value,
    });

    dispatch(__getPriceInfo(`${params.category}/${params.years}/${value}`));
  };
  const onChangeHandler4 = (e) => {
    const { value, name } = e.target;
    setTag({
      ...tag,
      [name]: value,
    });

    setSubTag({
      ...subTag,
      [name]: value,
    });

    dispatch(
      __getPriceInfo(
        `${params.category}/${params.years}/${params.model}/${value}`
      )
    );
  };

  const onClickHandler12 = (e) => {
    e.preventDefault();
    if (window.confirm(`${tag.category} 맞습니까?`)) {
      if (tag.category === " " || tag.category === "category") {
        return alert("항목을 확인하세요");
      }
      setTag({ ...tag, step1: false, step2: true });
      navigate(`/pricingInput/${tag.category}`);
    }
  };

  const onClickHandler23 = (e) => {
    e.preventDefault();
    if (window.confirm(`${tag.years} 맞습니까?`)) {
      if (tag.years === " " || tag.years === "years") {
        return alert("항목을 확인하세요");
      }
      setTag({ ...tag, step2: false, step3: true });
      navigate(`/pricingInput/${params.category}/${tag.years}`);
    }
  };

  const onClickHandler34 = (e) => {
    e.preventDefault();
    if (window.confirm(`${tag.model} 맞습니까?`)) {
      if (tag.model === " " || tag.model === "model") {
        return alert("항목을 확인하세요");
      }
      setTag({ ...tag, step3: false, step4: true });
      navigate(`/pricingInput/${params.category}/${params.years}/${tag.model}`);
    }
  };
  const onClickHandler45 = (e) => {
    e.preventDefault();
    if (window.confirm(`${tag.options} 맞습니까?`)) {
      if (tag.options === " " || tag.options === "options") {
        return alert("항목을 확인하세요");
      }
      setTag({
        ...tag,
        step4: false,
        step5: true,
        keyboard: save.keyboard !== undefined ? save.keyboard[0] : "",
      });
      navigate(
        `/pricingInput/${params.category}/${params.years}/${params.model}/${tag.options}`
      );
    }
  };

  const onSubmitHandler = () => {
    if (tag.model === " " || tag.model === "model") {
      return alert("항목을 확인하세요");
    }

    console.log("전개", { ...tag });
    let objMac = {};
    let objMac2 = {};
    if (tag.category === "macbook") {
      objMac = {
        category: tag.category,
        years: Number(tag.years),
        model: tag.model,
        options: tag.options,
        ram: tag.ram,
        keyboard: save2.keyboard[0],
        storage: tag.storage,
        batteryState: Number(tag.batteryState),
        macbookState: tag.macbookState,
        careOX: tag.careOX,
        careDate: tag.careDate,
      };
      objMac2 = {
        category: tag.category,
        years: Number(tag.years),
        model: tag.model,
        options: tag.options,
        ram: tag.ram,
        keyboard: save2.keyboard[0],
        storage: tag.storage,
        macbookState: tag.macbookState,
        batteryState: Number(tag.batteryState),
        careOX: tag.careOX,
        careDate: "",
      };
    }
    const objPhone = {
      category: tag.category,
      years: Number(tag.years),
      model: tag.model,
      options: tag.options,
      batteryState: Number(tag.batteryState),
      iphoneState: tag.iphoneState,
      careOX: tag.careOX,
      careDate: tag.careDate,
    };

    const objPhone2 = {
      category: tag.category,
      years: Number(tag.years),
      model: tag.model,
      options: tag.options,
      batteryState: Number(tag.batteryState),
      iphoneState: tag.iphoneState,
      careOX: tag.careOX,
      careDate: "",
    };

    const Data =
      tag.category === "macbook"
        ? tag.careOX === "false"
          ? objMac2
          : objMac
        : tag.careOX === "false"
        ? objPhone2
        : objPhone;

    const passData = {
      category: tag.category,
      Data: Data,
    };
    console.log(passData);
    if (window.confirm(`확실해요?`)) {
      dispatch(__checkPrice(passData));
      navigate(`/Pricingfinal`);
      setTag({});
    }
  };
  useEffect(() => {
    setSave(tagList);
    setSave2(tagList2);
  }, [params]);

  return (
    <>
      <Layout>
        <div>
          {tag.step1 && (
            <ContainerDiv>
              <TitleDiv>
                <Backbutton
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  〈
                </Backbutton>
                <Xbutton
                  onClick={() => {
                    navigate("/main");
                  }}
                >
                  X
                </Xbutton>
                <span>가격책정</span>
              </TitleDiv>

              <ContentDiv>카테고리를 선택해주세요</ContentDiv>

              <CategoryDiv>
                <SelectBox
                  type="radio"
                  name="category"
                  onChange={onChangeHandler1}
                >
                  <option value={"category"}>Category</option>
                  <option value={"macbook"}>macbook</option>
                  <option value={"iphone"}>iphone</option>
                </SelectBox>
              </CategoryDiv>
              <StepDiv>
                <svg
                  width="70"
                  height="6"
                  viewBox="0 0 70 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    r="3"
                    transform="matrix(-1 0 0 1 3 3)"
                    fill="#3D6AF2"
                  />
                  <circle cx="19" cy="3" r="3" fill="#D9D9D9" />
                  <circle cx="35" cy="3" r="3" fill="#D9D9D9" />
                  <circle cx="51" cy="3" r="3" fill="#D9D9D9" />
                  <circle cx="67" cy="3" r="3" fill="#D9D9D9" />
                </svg>
              </StepDiv>
              <NextButton onClick={onClickHandler12}>다음으로</NextButton>
            </ContainerDiv>
          )}
          {tag.step2 && (
            <ContainerDiv>
              <TitleDiv>
                <Backbutton
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  〈
                </Backbutton>
                <Xbutton
                  onClick={() => {
                    navigate("/main");
                  }}
                >
                  X
                </Xbutton>
                <span>가격책정</span>
              </TitleDiv>

              <ContentDiv>출시년도</ContentDiv>
              <CategoryDiv>
                <SelectBox name="years" onChange={onChangeHandler2}>
                  <option value={"years"}>years</option>
                  {save.map((list) => {
                    return <option value={list}> {list} </option>;
                  })}
                </SelectBox>
              </CategoryDiv>
              <StepDiv>
                <svg
                  width="70"
                  height="6"
                  viewBox="0 0 70 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    r="3"
                    transform="matrix(-1 0 0 1 3 3)"
                    fill="#D9D9D9"
                  />
                  <circle cx="19" cy="3" r="3" fill="#3D6AF2" />
                  <circle cx="35" cy="3" r="3" fill="#D9D9D9" />
                  <circle cx="51" cy="3" r="3" fill="#D9D9D9" />
                  <circle cx="67" cy="3" r="3" fill="#D9D9D9" />
                </svg>
              </StepDiv>
              <NextButton onClick={onClickHandler23}>다음으로</NextButton>
            </ContainerDiv>
          )}
          {tag.step3 && (
            <ContainerDiv>
              <TitleDiv>
                <Backbutton
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  〈
                </Backbutton>
                <Xbutton
                  onClick={() => {
                    navigate("/main");
                  }}
                >
                  X
                </Xbutton>
                <span>가격책정</span>
              </TitleDiv>

              <ContentDiv>기종</ContentDiv>
              <CategoryDiv>
                <SelectBox name="model" onChange={onChangeHandler3}>
                  <option value={"model"}>model</option>
                  {save.map((list) => {
                    return <option value={list}> {list} </option>;
                  })}
                </SelectBox>
              </CategoryDiv>
              <StepDiv>
                <svg
                  width="70"
                  height="6"
                  viewBox="0 0 70 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    r="3"
                    transform="matrix(-1 0 0 1 3 3)"
                    fill="#D9D9D9"
                  />
                  <circle cx="19" cy="3" r="3" fill="#D9D9D9" />
                  <circle cx="35" cy="3" r="3" fill="#3D6AF2" />
                  <circle cx="51" cy="3" r="3" fill="#D9D9D9" />
                  <circle cx="67" cy="3" r="3" fill="#D9D9D9" />
                </svg>
              </StepDiv>
              <NextButton onClick={onClickHandler34}>다음으로</NextButton>
            </ContainerDiv>
          )}
          {tag.step4 && (
            <ContainerDiv>
              <TitleDiv>
                <Backbutton
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  〈
                </Backbutton>
                <Xbutton
                  onClick={() => {
                    navigate("/main");
                  }}
                >
                  X
                </Xbutton>
                <span>가격책정</span>
              </TitleDiv>

              <ContentDiv>옵션</ContentDiv>
              <CategoryDiv>
                <SelectBox name="options" onChange={onChangeHandler4}>
                  <option value={"options"}> option </option>
                  {save.map((list) => {
                    return <option value={list}> {list} </option>;
                  })}
                </SelectBox>
              </CategoryDiv>
              <StepDiv>
                <svg
                  width="70"
                  height="6"
                  viewBox="0 0 70 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    r="3"
                    transform="matrix(-1 0 0 1 3 3)"
                    fill="#D9D9D9"
                  />
                  <circle cx="19" cy="3" r="3" fill="#D9D9D9" />
                  <circle cx="35" cy="3" r="3" fill="#D9D9D9" />
                  <circle cx="51" cy="3" r="3" fill="#3D6AF2" />
                  <circle cx="67" cy="3" r="3" fill="#D9D9D9" />
                </svg>
              </StepDiv>
              <NextButton onClick={onClickHandler45}>다음으로</NextButton>
            </ContainerDiv>
          )}
          {tag.step5 && (
            <ContainerDiv>
              <TitleDiv>
                <Backbutton
                  onClick={() => {
                    navigate(-1);
                  }}
                >
                  〈
                </Backbutton>
                <Xbutton
                  onClick={() => {
                    navigate("/main");
                  }}
                >
                  X
                </Xbutton>
                <span>가격책정</span>
              </TitleDiv>

              <div>
                {tag.category === "macbook" ? (
                  <div>
                    <ContentDiv>램 메모리</ContentDiv>
                    <CategoryDiv>
                      <SelectBox name="ram" onChange={onChangeHandler4}>
                        <option value={"ram"}> ram </option>
                        {save2.ram &&
                          save2.ram.map((list) => {
                            return <option value={list}> {list} </option>;
                          })}
                      </SelectBox>
                    </CategoryDiv>

                    <ContentDiv>SSD 용량</ContentDiv>
                    <CategoryDiv>
                      <SelectBox name="storage" onChange={onChangeHandler4}>
                        <option value={"storage"}> storage </option>
                        {save2.storage &&
                          save2.storage.map((list) => {
                            return <option value={list}> {list} </option>;
                          })}
                      </SelectBox>
                    </CategoryDiv>
                    <ContentDiv>배터리 사이클</ContentDiv>
                    <CategoryDiv>
                      <PriceInput
                        placeholder="배터리 사이클을 입력해주세요"
                        value={tag.batteryState}
                        type="Number"
                        min="0"
                        name="batteryState"
                        onChange={onChangeHandler4}
                      />
                    </CategoryDiv>
                    <ContentDiv>맥북 상태</ContentDiv>
                    <CategoryDiv>
                      <SelectBox
                        name="macbookState"
                        onChange={onChangeHandler4}
                      >
                        <option value={"macbookState"}>맥북 상태</option>
                        <option value={"A급"}>A급!</option>
                        <option value={"B급"}>B급!</option>
                        <option value={"C급"}>C급!</option>
                      </SelectBox>
                    </CategoryDiv>
                  </div>
                ) : (
                  <div>
                    <ContentDiv>아이폰 상태</ContentDiv>
                    <CategoryDiv>
                      <SelectBox name="iphoneState" onChange={onChangeHandler4}>
                        <option value={"iphoneState"}>아이폰 상태</option>
                        <option value={"A급"}>A급!</option>
                        <option value={"B급"}>B급!</option>
                        <option value={"C급"}>C급!</option>
                      </SelectBox>
                    </CategoryDiv>
                    <ContentDiv>배터리 성능 최대치</ContentDiv>
                    <CategoryDiv>
                      <PriceInput
                        placeholder="0% ~ 100%"
                        value={tag.batteryState}
                        type="Number"
                        min="0"
                        max="100"
                        name="batteryState"
                        onChange={onChangeHandler4}
                      />
                    </CategoryDiv>
                  </div>
                )}

                <ContentDiv>애플케어 유무</ContentDiv>
                <CategoryDiv>
                  <SelectBox name="careOX" onChange={onChangeHandler4}>
                    <option value={"careOX"}>애플케어 유무</option>
                    <option value={true}>있음!</option>
                    <option value={false}>없음!</option>
                  </SelectBox>
                </CategoryDiv>

                {tag.careOX === "true" && (
                  <>
                    <ContentDiv>애플케어 보증기간</ContentDiv>
                    <CategoryDiv>
                      <DateInput
                        placeholder="애플케어 보증기간"
                        type="date"
                        name="careDate"
                        onChange={onChangeHandler4}
                      />
                    </CategoryDiv>
                  </>
                )}
              </div>
              <StepDiv>
                <svg
                  width="70"
                  height="6"
                  viewBox="0 0 70 6"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <circle
                    r="3"
                    transform="matrix(-1 0 0 1 3 3)"
                    fill="#D9D9D9"
                  />
                  <circle cx="19" cy="3" r="3" fill="#D9D9D9" />
                  <circle cx="35" cy="3" r="3" fill="#D9D9D9" />
                  <circle cx="51" cy="3" r="3" fill="#D9D9D9" />
                  <circle cx="67" cy="3" r="3" fill="#3D6AF2" />
                </svg>
              </StepDiv>
              <NextButton onClick={onSubmitHandler}>다음으로</NextButton>
            </ContainerDiv>
          )}
        </div>
        {/* <Footer /> */}
      </Layout>
    </>
  );
};

export default PricingInput;

const RLDiv = styled.div`
  .C02:checked {
    .C01 {
      border: 1px solid #949497;
      background-color: #4f75ff;
      color: #ff0000;
    }
  }
`;
const RadioInput = styled.input`
  /* appearance: none; */
  &:checked {
    ${RLDiv} {
      border: 1px solid #949497;
      background-color: #4f75ff;
      color: #ff0000;
    }
  }
`;

const RadioLabel = styled.label`
  width: 100px;
  height: 35px;
  overflow: auto;
  border: 1px solid #4f75ff;
  border-radius: 50px;
  font-size: 15px;
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: center;
  ${RadioInput}:checked {
    border: 1px solid #949497;
    background-color: #4f75ff;
    color: #ff0000;
  }
`;

const ContentDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  position: relative;
  font-size: 15px;
  font-weight: bold;
  margin-top: 5px;
  margin-left: 10px;
  padding-left: 10px;
  width: 100%;
  height: 50px;
  background-color: transparent;
`;

const SelectBox = styled.select`
  width: 330px;
  height: 40px;
  overflow: auto;
  border: 1px solid #000000;
  background-color: transparent;
  border-radius: 50px;
  font-size: 15px;
`;

const ContainerDiv = styled.div`
  display: flex;
  position: relative;
  flex-direction: column;
  background-color: transparent;
  width: 375px;
  height: 100vh;
`;

const TitleDiv = styled.div`
  display: flex;
  justify-content: center;
  justify-items: center;
  align-items: center;
  position: relative;
  width: 100%;
  height: 60px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 18px;
  line-height: 22px;
  font-weight: bold;
  border-bottom: solid 1px gray;
  /* background-color: blue; */
`;

const CategoryDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  align-items: center;
  position: relative;
  font-family: "Inter";
  font-style: normal;
  font-weight: 600;
  font-size: 16px;
  line-height: 19px;
  width: 100%;
  height: 50px;
  /* background-color: #ff7300; */
`;

const PriceInput = styled.input`
  position: absolute;
  width: 330px;
  height: 38px;
  left: 19px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  border: 1px solid #d9d9d9;
  border-radius: 5px;
  background-color: transparent;
`;
const DateInput = styled.input`
  position: absolute;
  width: 177px;
  height: 38px;
  left: 19px;
  font-family: "Inter";
  font-style: normal;
  font-weight: 400;
  font-size: 14px;
  line-height: 17px;
  border-radius: 50px;
  border: 1px solid #c4c4c4;
  background-color: transparent;
`;

const Backbutton = styled.button`
  position: absolute;
  left: 0px;
  width: 56px;
  height: 100%;
  font-size: 18px;
  font-weight: bold;
  border: none;
  background-color: transparent;
`;

const Xbutton = styled.button`
  position: absolute;
  right: 0px;
  width: 56px;
  height: 100%;
  font-size: 18px;
  font-weight: bold;
  border: none;
  background-color: transparent;
`;

const StepDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  justify-items: center;
  position: absolute;
  bottom: 50px;
  width: 100%;
  height: 56px;
  border: none;
  background-color: transparent;
`;

const NextButton = styled.button`
  position: absolute;
  bottom: 0px;
  width: 100%;
  height: 56px;
  color: white;
  border: none;
  background-color: #4f75ff;
`;
