import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import useInput from "../hook/useInput";
import { __getPriceInfo } from "../redux/modules/PriceSlice";
import Header from "./Header";

const PricingInput = (props) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const params = useParams();
  const initialState = {
    step1: true,
    step2: false,
    step3: false,
    step4: false,
    step5: false,
    category: "",
  };
  const [tag, setTag, tagHandler] = useInput(initialState);
  // const [getTag, setGetTag, getTagHandler] = useInput("");
  // const [subTag, setSubTag, subTagHandler] = useInput(initialState);
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
    console.log("tag태그", tag);
    console.log("value", value);
  };
  const onChangeHandler2 = (e) => {
    const { value, name } = e.target;
    setTag({
      ...tag,
      [name]: value,
    });
    dispatch(__getPriceInfo(`${tag.category}/${value}`));
    console.log("tag태그", tag);
    console.log("value", value);
  };
  const onChangeHandler3 = (e) => {
    const { value, name } = e.target;
    setTag({
      ...tag,
      [name]: value,
    });
    dispatch(__getPriceInfo(`${params.category}/${params.year}/${value}`));
    console.log("tag태그", tag);
    console.log("value", value);
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
    // dispatch(
    //   __getPriceInfo(
    //     `${params.category}/${params.year}/${params.model}/${value}`
    //   )
    // );
    console.log("tag태그", tag);
    console.log("value", value);
  };

  const onClickHandler12 = (e) => {
    e.preventDefault();
    setTag({ ...tag, step1: false, step2: true });
    navigate(`/pricingInput/${tag.category}`);
  };

  const onClickHandler23 = (e) => {
    e.preventDefault();
    setTag({ ...tag, step2: false, step3: true });
    navigate(`/pricingInput/${params.category}/${tag.year}`);
  };

  const onClickHandler34 = (e) => {
    e.preventDefault();
    setTag({ ...tag, step3: false, step4: true });
    navigate(`/pricingInput/${params.category}/${params.year}/${tag.model}`);
  };
  const onClickHandler45 = (e) => {
    e.preventDefault();
    setTag({
      ...tag,
      step4: false,
      step5: true,
      keyboard: save.keyboard !== undefined ? save.keyboard[0] : "",
    });

    navigate(
      `/pricingInput/${params.category}/${params.year}/${params.model}/${tag.option}`
    );
  };

  const onSubmitHandler = () => {
    const objMac = {
      category: tag.category,
      year: tag.year,
      model: tag.model,
      option: tag.option,
      ram: tag.ram,
      keyboard: tag.keyboard,
      storage: tag.storage,
      batteryState: tag.batteryState,
      careOX: tag.careOX,
      careDate: tag.careDate,
    };

    const objPhone = {
      category: tag.category,
      year: tag.year,
      model: tag.model,
      option: tag.option,
      batteryState: tag.batteryState,
      displayState: tag.displayState,
      scratchState: tag.scratchState,
      careOX: tag.careOX,
      careDate: tag.careDate,
    };
    const data = {
      category: tag.category,
      objMac: objMac,
      objPhone: objPhone,
    };
    navigate(`/Pricingfinal`, { state: data });
  };
  useEffect(() => {
    console.log("유즈 이펙트tag", tag);
    console.log("tagList", tagList);
    console.log("유즈 파람스", params);
    setSave(tagList);
    setSave2(tagList2);
  }, [params]);

  return (
    <>
      <Header />
      <br />
      <br />
      <div>
        {tag.step1 && (
          <div>
            <select name="category" onChange={onChangeHandler1}>
              <option value={"category"}>Category</option>
              <option value={"macbook"}>macbook</option>
              <option value={"iphone"}>iphone</option>
            </select>
            <button onClick={onClickHandler12}>스텝2로</button>
          </div>
        )}
        {tag.step2 && (
          <div>
            <select name="year" onChange={onChangeHandler2}>
              {save.map((list) => {
                return <option value={list}> {list} </option>;
              })}
            </select>
            <button onClick={onClickHandler23}>스텝3로</button>
          </div>
        )}
        {tag.step3 && (
          <div>
            <select name="model" onChange={onChangeHandler3}>
              {save.map((list) => {
                return <option value={list}> {list} </option>;
              })}
            </select>
            <button onClick={onClickHandler34}>스텝4로</button>
          </div>
        )}
        {tag.step4 && (
          <div>
            <select
              defaultValue={"1111"}
              name="option"
              onChange={onChangeHandler4}
            >
              <option value={"adasdasd"}> adasdasd </option>;
              {save.map((list) => {
                return <option value={list}> {list} </option>;
              })}
            </select>
            <button onClick={onClickHandler45}>스텝5로</button>
          </div>
        )}
        {tag.step5 && (
          <div>
            {tag.category === "macbook" ? (
              <div>
                <div>save2.keyboard[0]</div>

                <select name="ram" onChange={onChangeHandler4}>
                  {save2.ram.map((list) => {
                    return <option value={list}> {list} </option>;
                  })}
                </select>

                <select name="storage" onChange={onChangeHandler4}>
                  {save2.storage.map((list) => {
                    return <option value={list}> {list} </option>;
                  })}
                </select>
                <input
                  placeholder="배터리 사이클"
                  value={tag.batteryState}
                  type="Number"
                  min="0"
                  name="batteryState"
                  onChange={onChangeHandler4}
                />
              </div>
            ) : (
              <div>
                <select name="displayState" onChange={onChangeHandler4}>
                  <option value={"displayState"}>액정 상태</option>
                  <option value={"A"}>A급!</option>
                  <option value={"B"}>B급!</option>
                  <option value={"C"}>C급!</option>
                </select>

                <select name="scratchState" onChange={onChangeHandler4}>
                  <option value={"scratchState"}>흠집 상태</option>
                  <option value={"A"}>A급!</option>
                  <option value={"B"}>B급!</option>
                  <option value={"C"}>C급!</option>
                </select>

                <input
                  placeholder="배터리 성능 최대치"
                  value={tag.batteryState}
                  type="Number"
                  min="0"
                  max="100"
                  name="batteryState"
                  onChange={onChangeHandler4}
                />
              </div>
            )}

            <select name="careOX" onChange={onChangeHandler4}>
              <option value={"careOX"}>애플케어 유무</option>
              <option value={true}>있음!</option>
              <option value={false}>없음!</option>
            </select>

            {tag.careOX && (
              <input
                placeholder="애플케어 보증기간"
                type="date"
                name="careDate"
                onChange={onChangeHandler4}
              />
            )}

            <button
              onClick={() => {
                onSubmitHandler();
              }}
            >
              가격측정
            </button>

            {/* <button
              onClick={() => {
                navigate(`/postcreate`);
              }}
            >
              상품 등록
            </button>
            <button
              onClick={() => {
                navigate(`/objectioncreate`);
              }}
            >
              이의제기
            </button> */}
          </div>
        )}
        {/* {tag.category === "macbook" && (
          <select name="tagList" onChange={tagHandler}>
            {tagLists &&
              tagLists.map((list) => {
                return(
                <option value={list}> {list} </option>;
              )})}
          </select>
        )} */}
      </div>
      {/* <div> */}
      {/* <select name="category" onChange={tagHandler}>
          <option value={"category"}>Category</option>
          <option value={"macbook"}>macbook</option>
          <option value={"iphone"}>iphone</option>
        </select> */}
      {/* 론리&& 연산자로 해결하기*/}
      {/* {tag.category === "macbook" && (
          <div>
            <Select>
              <option>맥북 기종</option>
              <option value="4654">APPLE 2021 맥북프로14 MKGR3KH/A </option>
              <option value="4655">APPLE 2021 맥북프로14 MKGP3KH/A </option>
              <option value="4657">APPLE 2021 맥북프로16 MK1E3KH/A </option>
              <option value="4658">APPLE 2021 맥북프로16 MK1H3KH/A </option>
              <option value="4659">APPLE 2021 맥북프로16 MK1A3KH/A </option>
              <option value="4660">APPLE 2021 맥북프로14 MKGT3KH/A </option>
              <option value="4661">APPLE 2021 맥북프로16 MK183KH/A </option>
              <option value="4662">APPLE 2021 맥북프로14 MKGQ3KH/A </option>
              <option value="4663">APPLE 2021 맥북프로16 MK1F3KH/A </option>
              <option value="4664">APPLE 2021 맥북프로16 MK193KH/A </option>
            </Select>
            배터리 사이클
            <input placeholder="배터리 사이클을 입력해주세요" />
            <Select>
              <option>메모리</option>
              <option value="4">4GB</option>
              <option value="8">8GB</option>
              <option value="16">16GB</option>
              <option value="24">24GB</option>
              <option value="32">32GB</option>
              <option value="64">64GB</option>
              <option value="128">128GB</option>
            </Select>
            <Select>
              <option>SSD 용량</option>
              <option value="128">128GB</option>
              <option value="256">256GB</option>
              <option value="512">512GB</option>
              <option value="1">1TB</option>
              <option value="2">2TB</option>
              <option value="4">4TB</option>
              <option value="8">8TB</option>
            </Select>
            <Select>
              <option>키보드 형태</option>
              <option value="나비식">나비식</option>
              <option value="가위식">가위식</option>
            </Select>
            애플케어 보증기간
            <input type="date" />
          </div>
        )}
        {tag.category === "iphone" && (
          <div>
            <Select>
              <option value="choice">아이폰 기종</option>
              <option value="1810">아이폰 12 64GB</option>
              <option value="1811">아이폰 12 128GB</option>
              <option value="1812">아이폰 12 256GB</option>
              <option value="1814">아이폰 12 프로 128GB</option>
              <option value="1815">아이폰 12 프로 256GB</option>
              <option value="1816">아이폰 12 프로 512GB</option>
              <option value="1884">아이폰 12 미니 64GB </option>
              <option value="1885">아이폰 12 미니 128GB</option>
              <option value="1886">아이폰 12 미니 256GB</option>
              <option value="1887">아이폰 12 프로 맥스 128GB</option>
              <option value="1888">아이폰 12 프로 맥스 256GB</option>
              <option value="1889">아이폰 12 프로 맥스 512GB</option>
            </Select>
            배터리 성능상태
            <input placeholder="%를 제외하고 입력해주세요" />
            <Select>
              <option>액정 상태</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </Select>
            <Select>
              <option>기스 상태</option>
              <option value="A">A</option>
              <option value="B">B</option>
              <option value="C">C</option>
            </Select>
            애플케어 보증기간
            <input type="date" />
          </div>
        )} */}
      {/* 
        <div>측정가격</div>

        <button>가격책정</button>
        <br />
        <br />
        <button
          onClick={() => {
            navigate("/postcreate");
          }}
        >
          상품등록
        </button>
        <br />
        <br />
        <button
          onClick={() => {
            navigate("/objectioncreate");
          }}
        >
          이의제기
        </button> */}
      {/* </div>
    </br> */}
    </>
  );
};

export default PricingInput;

const Select = styled.select`
  width: 300px;
  height: 50px;
  overflow: auto;
`;
