import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { __checkPrice, __getPriceInfo } from "../redux/modules/PriceSlice";
import Footer from "./Footer";
import Header from "./Header";
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
    category: "",
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

    dispatch(__getPriceInfo(`${params.category}/${params.year}/${value}`));
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
        `${params.category}/${params.year}/${params.model}/${value}`
      )
    );
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
    if (tag.careOX === "false") {
      setTag({ ...tag, careDate: "" });
    }
    console.log("전개", { ...tag });
    const objMac = {
      category: tag.category,
      year: tag.year,
      model: tag.model,
      option: tag.option,
      ram: tag.ram,
      keyboard: save2.keyboard[0],
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
    const objMac2 = {
      category: tag.category,
      year: tag.year,
      model: tag.model,
      option: tag.option,
      ram: tag.ram,
      keyboard: save2.keyboard[0],
      storage: tag.storage,
      batteryState: tag.batteryState,
      careOX: tag.careOX,
      careDate: "",
    };

    const objPhone2 = {
      category: tag.category,
      year: tag.year,
      model: tag.model,
      option: tag.option,
      batteryState: tag.batteryState,
      displayState: tag.displayState,
      scratchState: tag.scratchState,
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

    dispatch(__checkPrice(passData));
    navigate(`/Pricingfinal`);
    setTag({});
  };
  useEffect(() => {
    setSave(tagList);
    setSave2(tagList2);
  }, [params]);

  return (
    <>
      <Layout>
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
                <option value={"year"}>year</option>
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
                <option value={"model"}>model</option>
                {save.map((list) => {
                  return <option value={list}> {list} </option>;
                })}
              </select>
              <button onClick={onClickHandler34}>스텝4로</button>
            </div>
          )}
          {tag.step4 && (
            <div>
              <select name="option" onChange={onChangeHandler4}>
                <option value={"option"}> option </option>
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
                  <div>{save2.keyboard}</div>

                  <select name="ram" onChange={onChangeHandler4}>
                    <option value={"ram"}> ram </option>
                    {save2.ram &&
                      save2.ram.map((list) => {
                        return <option value={list}> {list} </option>;
                      })}
                  </select>

                  <select name="storage" onChange={onChangeHandler4}>
                    <option value={"storage"}> storage </option>
                    {save2.storage &&
                      save2.storage.map((list) => {
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
                    <option value={"A급"}>A급!</option>
                    <option value={"B급"}>B급!</option>
                    <option value={"C급"}>C급!</option>
                  </select>

                  <select name="scratchState" onChange={onChangeHandler4}>
                    <option value={"scratchState"}>흠집 상태</option>
                    <option value={"A급"}>A급!</option>
                    <option value={"B급"}>B급!</option>
                    <option value={"C급"}>C급!</option>
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

              {tag.careOX === "true" && (
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
            </div>
          )}
        </div>
        <Footer />
      </Layout>
    </>
  );
};

export default PricingInput;

const Select = styled.select`
  width: 300px;
  height: 50px;
  overflow: auto;
`;
