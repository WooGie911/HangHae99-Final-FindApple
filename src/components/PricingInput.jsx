import React, { useState } from "react";
import styled from "styled-components";
import PostsCreate from "./PostsCreate";

const PricingInput = (props) => {
  const [tag, setTag] = useState("");
  // const onChangeHandler = (event) => {
  //   props.setState({ ...props.State, category: event.target.value });
  //   setTag(event.target.value);
  //   console.log(tag);
  // };
  return (
    <div>
      <select name="category" onChange={props.stateHandle}>
        <option value={"category"}>Category</option>
        <option value={"macbook"}>macbook</option>
        <option value={"iphone"}>iphone</option>
      </select>
      {/* 론리&& 연산자로 해결하기*/}
      {props.State.category === "macbook" && (
        <div>
          <Select>
            <option>맥북 기종</option>
            <option value="1293">맥북 12인치 2015년형 </option>
            <option value="1294">맥북 12인치 2016년형 </option>
            <option value="1295">맥북 12인치 2017년형 </option>
            <option value="1316">맥북에어 2010년형 11인치</option>
            <option value="1317">맥북에어 2011년형 11인치</option>
            <option value="1318">맥북에어 2012년형 11인치</option>
            <option value="1319">맥북에어 2013년형 11인치</option>
            <option value="1320">맥북에어 2014년형 11인치</option>
            <option value="1321">맥북에어 2015년형 11인치</option>
            <option value="1323">맥북에어 2010년형 13인치</option>
            <option value="1324">맥북에어 2011년형 13인치</option>
            <option value="1325">맥북에어 2012년형 13인치</option>
            <option value="1326">맥북에어 2013년형 13인치</option>
            <option value="1327">맥북에어 2014년형 13인치</option>
            <option value="1328">맥북에어 2015년형 13인치</option>
            <option value="1329">맥북에어 2016년형 13인치</option>
            <option value="1330">맥북에어 2017년형 13인치</option>
            <option value="1332">맥북에어 2018년형 13인치</option>
            <option value="1333">맥북에어 2019년형 13인치</option>
            <option value="1367">맥북프로 2010년형 13인치</option>
            <option value="1368">맥북프로 2011년형 13인치</option>
            <option value="1369">맥북프로 2012년형 13인치</option>
            <option value="1370">맥북프로 2013년형 13인치</option>
            <option value="1371">맥북프로 2014년형 13인치</option>
            <option value="1372">맥북프로 2015년형 13인치</option>
            <option value="1373">맥북프로 2016년형 13인치</option>
            <option value="1374">맥북프로 2017년형 13인치</option>
            <option value="1375">맥북프로 2018년형 13인치</option>
            <option value="1376">맥북프로 2019년형 13인치</option>
            <option value="1377">맥북프로 2010년형 15인치</option>
            <option value="1378">맥북프로 2011년형 15인치</option>
            <option value="1379">맥북프로 2012년형 15인치</option>
            <option value="1380">맥북프로 2013년형 15인치</option>
            <option value="1381">맥북프로 2014년형 15인치</option>
            <option value="1382">맥북프로 2015년형 15인치</option>
            <option value="1383">맥북프로 2016년형 15인치</option>
            <option value="1384">맥북프로 2017년형 15인치</option>
            <option value="1385">맥북프로 2018년형 15인치</option>
            <option value="1386">맥북프로 2019년형 15인치</option>
            <option value="1455">맥북프로 2019년형 16인치</option>
            <option value="1980">맥북프로 2020년형 13인치 M1칩</option>
            <option value="1983">맥북에어 2020년형 13인치 M1칩</option>
            <option value="2022">뉴맥북 12인치 2015년</option>
            <option value="2023">뉴맥북 12인치 2016년</option>
            <option value="2024">뉴맥북 12인치 2017년</option>
            <option value="2025">맥북에어 11인치 2012년</option>
            <option value="2026">맥북에어 11인치 2013년</option>
            <option value="2027">맥북에어 11인치 2014년</option>
            <option value="2028">맥북에어 11인치 2015년</option>
            <option value="2029">맥북에어 13인치 2012년</option>
            <option value="2030">맥북에어 13인치 2013년</option>
            <option value="2031">맥북에어 13인치 2014년</option>
            <option value="2032">맥북에어 13인치 2015년</option>
            <option value="2033">맥북에어 13인치 2016년</option>
            <option value="2034">맥북에어 13인치 2017년</option>
            <option value="2035">맥북에어 13인치 2018년</option>
            <option value="2036">맥북에어 13인치 2019년</option>
            <option value="2037">맥북에어 13인치 2020년</option>
            <option value="2038">맥북프로 13인치 2014년</option>
            <option value="2039">맥북프로 13인치 2013년</option>
            <option value="2040">맥북프로 13인치 2015년</option>
            <option value="2041">맥북프로 13인치 2016년</option>
            <option value="2042">맥북프로 13인치 2017년</option>
            <option value="2043">맥북프로 13인치 2018년</option>
            <option value="2044">맥북프로 13인치 2019년</option>
            <option value="2045">맥북프로 13인치 2020년</option>
            <option value="2046">맥북프로 15인치 2013년</option>
            <option value="2047">맥북프로 15인치 2014년</option>
            <option value="2048">맥북프로 15인치 2015년</option>
            <option value="2049">맥북프로 15인치 2016년</option>
            <option value="2050">맥북프로 15인치 2017년</option>
            <option value="2051">맥북프로 15인치 2018년</option>
            <option value="2052">맥북프로 15인치 2019년</option>
            <option value="2053">맥북프로 16인치 2019년</option>
            <option value="2146">맥북프로 13인치 2012년</option>
            <option value="4639">맥북프로 13인치 2022년</option>
            <option value="4644">맥북에어 13인치 2022년</option>
            <option value="4653">맥북프로 14인치 2021년</option>
            <option value="4656">맥북프로 16인치 2021년</option>
            <option value="1296">
              뉴맥북 12인치 2015년 MF865KH/A 코어M 1.2GHZ 8GB SSD512 실버{" "}
            </option>
            <option value="1297">
              뉴맥북 12인치 2015년 MJY42KH/A 코어M 1.2GHZ 8GB SSD512 그레이 골드
            </option>
            <option value="1298">
              뉴맥북 12인치 2015년 MK4M2KH/A 코어M 1.1GHZ 8GB SSD256 골드{" "}
            </option>
            <option value="1299">
              뉴맥북 12인치 2015년 MF855KH/A 코어M 1.1GHZ 8GB SSD256 실버{" "}
            </option>
            <option value="1300">
              뉴맥북 12인치 2015년 MJY32KH/A 코어M 1.1GHZ 8GB SSD256 그레이{" "}
            </option>
            <option value="1301">
              뉴맥북 12인치 2016년 MMGM2KH/A 코어M 1.2GHz 8GB 512GB SSD 로즈골드
            </option>
            <option value="1302">
              뉴맥북 12인치 2016년 MLHF2KH/A 코어M 1.2GHz 8GB 512GB SSD 골드
            </option>
            <option value="1303">
              뉴맥북 12인치 2016년 MLHC2KH/A 코어M 1.2GHz 8GB 512GB SSD 실버{" "}
            </option>
            <option value="1304">
              뉴맥북 12인치 2016년 MMGL2KH/A 코어M 1.1GHz 8GB 256GB SSD 로즈골드{" "}
            </option>
            <option value="1305">
              뉴맥북 12인치 2016년 MLHE2KH/A 코어M 1.1GHz 8GB 256GB SSD 골드{" "}
            </option>
            <option value="1306">
              뉴맥북 12인치 2016년 MLHA2KH/A 코어M 1.1GHz 8GB 256GB SSD 실버{" "}
            </option>
            <option value="1307">
              뉴맥북 12인치 2016년 MLH72KH/A 코어M 1.1GHz 8GB 256GB SSD 그레이{" "}
            </option>
            <option value="1308">
              뉴맥북 12인치 2017년 MNYN2KH/A i5-7세대 8GB 512GB 로즈골드{" "}
            </option>
            <option value="1309">
              뉴맥북 12인치 2017년 MNYL2KH/A i5-7세대 8GB 512GB 골드{" "}
            </option>
            <option value="1310">
              뉴맥북 12인치 2017년 MNYJ2KH/A i5-7세대 8GB 512GB 실버{" "}
            </option>
            <option value="1311">
              뉴맥북 12인치 2017년 MNYG2KH/A i5-7세대 8GB 512GB 그레이{" "}
            </option>
            <option value="1312">
              뉴맥북 12인치 2017년 MNYM2KH/A 코어M 1.2GHz 8GB 256GB 로즈골드{" "}
            </option>
            <option value="1313">
              뉴맥북 12인치 2017년 MNYK2KH/A 코어M 1.2GHz 8GB 256GB 골드
            </option>
            <option value="1314">
              뉴맥북 12인치 2017년 MNYH2KH/A 코어M 1.2GHz 8GB 256GB 실버
            </option>
            <option value="1315">
              뉴맥북 12인치 2017년 MNYH2KH/A 코어M 1.2GHz 8GB 256GB 그레이
            </option>
            <option value="1336">
              맥북에어 11인치 2012년 MD224KH/A i5-3세대 1.7GHZ 4GB SSD128
            </option>
            <option value="1337">
              맥북에어 11인치 2012년 MD223KH/A i5-3세대 1.7GHZ 4GB SSD64
            </option>
            <option value="1338">
              맥북에어 11인치 2013년 MD712KH/A i5-4세대 1.3GHZ 4GB SSD256
            </option>
            <option value="1339">
              맥북에어 11인치 2013년 MD711KH/A i5-4세대 1.3GHZ 4GB SSD128
            </option>
            <option value="1340">
              맥북에어 11인치 2014년 MD712KH/B I5-4세대 1.4GHZ 4GB SSD256
            </option>
            <option value="1341">
              맥북에어 11인치 2014년 MD711KH/B I5-4세대 1.4GHZ 4GB SSD128
            </option>
            <option value="1342">
              맥북에어 11인치 2015년 MJVM2KH/A I5-5세대 1.6GHZ 4GB SSD256
            </option>
            <option value="1343">
              맥북에어 11인치 2015년 MJVP2KH/A I5-5세대 1.6GHZ 4GB SSD128
            </option>
            <option value="1349">
              맥북에어 13인치 2012년 MD232KH/A I5-3세대 1.8GHZ 4GB SSD256
            </option>
            <option value="1350">
              맥북에어 13인치 2012년 MD231KH/A I5-3세대 1.8GHZ 4GB SSD128
            </option>
            <option value="1351">
              맥북에어 13인치 2013년 MD761KH/A I5-4세대 1.3GHZ 4GB SSD256
            </option>
            <option value="1352">
              맥북에어 13인치 2013년 MD760KH/A I5-4세대 1.3GHZ 4GB SSD128
            </option>
            <option value="1353">
              맥북에어 13인치 2014년 MD761KH/B I5-4세대 1.4GHZ 4GB SSD256
            </option>
            <option value="1354">
              맥북에어 13인치 2014년 MD760KH/B I5-4세대 1.4GHZ 4GB SSD128
            </option>
            <option value="1355">
              맥북에어 13인치 2015년 MJVG2KH/A I5-4세대 1.4GHZ 4GB SSD256
            </option>
            <option value="1356">
              맥북에어 13인치 2015년 MJVE2KH/A I5-4세대 1.4GHZ 4GB SSD128
            </option>
            <option value="1358">
              맥북에어 13인치 2016년 MMGF2KH/A I5-5세대 1.6GHZ 8GB SSD128
            </option>
            <option value="1359">
              맥북에어 13인치 2016년 MMGG2KH/A I5-5세대 1.6GHZ 8GB SSD256
            </option>
            <option value="1360">
              맥북에어 13인치 2017년 MQD42KH I5-5세대 1.8GHZ 8GB SSD256
            </option>
            <option value="1361">
              맥북에어 13인치 2017년 MQD32KH I5-5세대 1.8GHZ 8GB SSD128
            </option>
            <option value="1362">
              맥북에어 13인치 2018년 레티나 256G MREC2KH MRE92KH MREF2KH
            </option>
            <option value="1363">
              맥북에어 13인치 2018년 레티나 128G MREA2KH MRE82KH MREF2KH
            </option>
            <option value="1364">
              맥북에어 13인치 2019년 레티나 256G MVFJ2KH MVFN2KH MVFL2KH
            </option>
            <option value="1365">
              맥북에어 13인치 2019년 레티나 128G MVFH2KH MVFM2KH MVFK2KH
            </option>
            <option value="1389">
              맥북프로 13인치 2012년 MD213KH/A retina i5-3세대 2.5GHZ 8GB SSD
              256G
            </option>
            <option value="1390">
              맥북프로 13인치 2012년 MD212KH/A retina i5-3세대 2.5GHZ 8GB SSD
              128G
            </option>
            <option value="1391">
              맥북프로 13인치 2012년 MD102KH/A i7-3세대 2.5GHZ 8GB SSD 750G
            </option>
            <option value="1392">
              맥북프로 13인치 2012년 MD101KH/A i5-3세대 2.5GHZ 4GB SSD 500G
            </option>
            <option value="1393">
              맥북프로 13인치 2013년 ME662KH/A retina i5-3세대 2.6GHZ 8GB
              SSD256G
            </option>
            <option value="1394">
              맥북프로 13인치 2013년 ME864KH/A retina i5-4세대 2.6GHZ 4GB
              SSD128G
            </option>
            <option value="1395">
              맥북프로 13인치 2013년 ME865KH/A retina i5-4세대 2.4GHZ 8GB
              SSD256G
            </option>
            <option value="1396">
              맥북프로 13인치 2013년 ME866KH/A retina i5-4세대 2.6GHZ 8GB
              SSD512G
            </option>
            <option value="1397">
              맥북프로 13인치 2014 MGX92KH/A i5-4세대 2.8GHZ 8GB SSD 512G
            </option>
            <option value="1398">
              맥북프로 13인치 2014 MGX82KH/A i5-4세대 2.6GHZ 8GB SSD 256G
            </option>
            <option value="1399">
              맥북프로 13인치 2014 MGX72KH/A i5-4세대 2.6GHZ 8GB SSD 128G
            </option>
            <option value="1400">
              맥북프로 13인치 2015 MF841KH/A i5-5세대 2.9GHZ 8GB SSD 512G
            </option>
            <option value="1401">
              맥북프로 13인치 2015 MF840KH/A i5-5세대 2.7GHZ 8GB 256G
            </option>
            <option value="1402">
              맥북프로 13인치 2015년 MF839KH/A i5-5세대 2.7GHZ 8GB SSD128G
            </option>
            <option value="1403">
              맥북프로 13인치 2016년 MNQG2KH/A i5-6세대 2.9GHZ 8GB SSD 512GB
              실버 터치바{" "}
            </option>
            <option value="1404">
              맥북프로 13인치 2016년 MNQF2KH/A i5-6세대 2.9GHZ 8GB SSD 512GB
              그레이 터치바{" "}
            </option>
            <option value="1405">
              맥북프로 13인치 2016년 MLVP2KH/A i5-6세대 2.9GHZ 8GB SSD 256GB
              실버 터치바{" "}
            </option>
            <option value="1406">
              맥북프로 13인치 2016년 MLH12KH/A i5-6세대 2.9GHZ 8GB SSD 256GB
              그레이 터치바{" "}
            </option>
            <option value="1407">
              맥북프로 13인치 2016년 MLUQ2KH/A i5-6세대 2.9GHZ 8GB SSD 256GB
              실버{" "}
            </option>
            <option value="1408">
              맥북프로 13인치 2016년 MLL42KH/A i5-6세대 2.9GHZ 8GB SSD 256GB
              그레이{" "}
            </option>
            <option value="1409">
              맥북프로 13인치 2017년 MPXY2KH/A i5-7세대 3.1GHZ 8GB SSD 512GB
              실버 터치바{" "}
            </option>
            <option value="1410">
              맥북프로 13인치 2017년 MPXW2KH/A i5-7세대 3.1GHZ 8GB SSD 512GB
              그레이 터치바{" "}
            </option>
            <option value="1411">
              맥북프로 13인치 2017년 MPXX2KH/A i5-7세대 3.1GHZ 8GB SSD 256GB
              실버 터치바{" "}
            </option>
            <option value="1412">
              맥북프로 13인치 2017년 MPXV2KH/A i5-7세대 3.1GHZ 8GB SSD 256GB
              그레이 터치바{" "}
            </option>
            <option value="1413">
              맥북프로 13인치 2017년 MPXU2KH/A i5-7세대 2.3GHZ 8GB SSD 256GB
              실버{" "}
            </option>
            <option value="1414">
              맥북프로 13인치 2017년 MPXT2KH/A i5-7세대 2.3GHZ 8GB SSD 256GB
              그레이
            </option>
            <option value="1415">
              맥북프로 13인치 2017년 MPXR2KH/A i5-7세대 2.3GHZ 8GB SSD 128GB
              실버
            </option>
            <option value="1416">
              맥북프로 13인치 2017년 MPXQ2KH/A i5-7세대 2.3GHZ 8GB SSD 128GB
              그레이
            </option>
            <option value="1417">
              맥북프로 13인치 2018년 MR9V2KH/A i5-8세대 2.3GHZ 8GB SSD 512GB
              실버 터치바{" "}
            </option>
            <option value="1418">
              맥북프로 13인치 2018년 MR9R2KH/A i5-8세대 2.3GHZ 8GB SSD 512GB
              그레이 터치바{" "}
            </option>
            <option value="1419">
              맥북프로 13인치 2018년 MR9U2KH/A i5-8세대 2.3GHZ 8GB SSD 256GB
              실버 터치바{" "}
            </option>
            <option value="1420">
              맥북프로 13인치 2018년 MR9Q2KH/A i5-8세대 2.3GHZ 8GB SSD 256GB
              그레이 터치바{" "}
            </option>
            <option value="1421">
              맥북프로 13인치 2019년 MV9A2KH/A i5-8세대 2.4GHZ 8GB SSD 512GB
              실버 터치바{" "}
            </option>
            <option value="1422">
              맥북프로 13인치 2019년 MV972KH/A i5-8세대 2.4GHZ 8GB SSD 512GB
              그레이 터치바{" "}
            </option>
            <option value="1423">
              맥북프로 13인치 2019년 MV992KH/A i5-8세대 2.4GHZ 8GB SSD 256GB
              실버 터치바{" "}
            </option>
            <option value="1424">
              맥북프로 13인치 2019년 MV962KH/A i5-8세대 2.4GHZ 8GB SSD 256GB
              그레이 터치바{" "}
            </option>
            <option value="1425">
              맥북프로 13인치 2019년 MUHP2KH/A i5-8세대 2.4GHZ 8GB SSD 256GB
              실버 터치바{" "}
            </option>
            <option value="1426">
              맥북프로 13인치 2019년 MUHQ2KH/A i5-8세대 2.4GHZ 8GB SSD 128GB
              실버 터치바{" "}
            </option>
            <option value="1427">
              맥북프로 13인치 2019년 MUHN2KH/A i5-8세대 2.4GHZ 8GB SSD 128GB
              그레이 터치바{" "}
            </option>
            <option value="1431">
              맥북프로 15인치 2013 ME294KH/A i7-7세대 2.3GHZ 16GB SSD 512GB
            </option>
            <option value="1432">
              맥북프로 15인치 2013 ME293KH/A i7-7세대 2.0GHZ 8GB SSD 256GB
            </option>
            <option value="1433">
              맥북프로 15인치 2013년 ME665KH/A i7-3세대 2.7GHz 16GB SSD 512GB
              지포스 GT650M
            </option>
            <option value="1434">
              맥북프로 15인치 2013년 ME664KH/A i7-3세대 2.4GHz 8GB SSD 256GB
              지포스 GT650M
            </option>
            <option value="1435">
              맥북프로 15인치 2014 MGXC2KH/A i7-4세대 2.5GHZ 16GB SSD512GB
            </option>
            <option value="1436">
              맥북프로 15인치 2014 MGXA2KH/A i7-4세대 2.2GHZ 16GB SSD256GB
            </option>
            <option value="1437">
              맥북프로 15인치 2015년 MJLT2KH/A i7-4세대 2.5GHZ 16GB SSD512
            </option>
            <option value="1438">
              맥북프로 15인치 2015년 MJLQ2KH/A i7-4세대 2.2GHZ 16GB SSD256
            </option>
            <option value="1439">
              맥북프로 15인치 2016년 MLW82KH/A i7-6세대 2.7GHZ 16GB SSD 512GB
              실버 터치바
            </option>
            <option value="1440">
              맥북프로 15인치 2016년 MLH42KH/A i7-6세대 2.7GHZ 16GB SSD 512GB
              그레이 터치바
            </option>
            <option value="1441">
              맥북프로 15인치 2016년 MLW72KH/A i7-6세대 2.6GHZ 16GB SSD 256GB
              실버 터치바
            </option>
            <option value="1442">
              맥북프로 15인치 2016년 MLH32KH/A i7-6세대 2.6GHZ 16GB SSD 256GB
              그레이 터치바
            </option>
            <option value="1443">
              맥북프로 15인치 2017년 MPTV2KH/A i7-7세대 2.9GHZ 16GB SSD 512GB
              실버 터치바{" "}
            </option>
            <option value="1444">
              맥북프로 15인치 2017년 MPTT2KH/A i7-7세대 2.9GHZ 16GB SSD 512GB
              그레이 터치바{" "}
            </option>
            <option value="1445">
              맥북프로 15인치 2017년 MPTU2KH/A i7-7세대 2.8GHZ 16GB SSD 256GB
              실버 터치바{" "}
            </option>
            <option value="1446">
              맥북프로 15인치 2017년 MPTR2KH/A i7-7세대 2.8GHZ 16GB SSD 256GB
              그레이 터치바{" "}
            </option>
            <option value="1447">
              맥북프로 15인치 2018 MR972KH/A I7-8세대 2.6GHZ 16GB SSD 512GB
              라데온 Pro 560X 실버 터치바{" "}
            </option>
            <option value="1448">
              맥북프로 15인치 2018 MR942KH/A I7-8세대 2.6GHZ 16GB SSD 512GB
              라데온 Pro 560X 그레이 터치바{" "}
            </option>
            <option value="1449">
              맥북프로 15인치 2018 MR962KH/A I7-8세대 2.6GHZ 16GB SSD 256GB
              라데온 Pro 555X 실버 터치바{" "}
            </option>
            <option value="1450">
              맥북프로 15인치 2018 MR932KH/A I7-8세대 2.6GHZ 16GB SSD 256GB
              라데온 Pro 555X 그레이 터치바{" "}
            </option>
            <option value="1451">
              맥북프로 15인치 2019년 MV932KH/A i9-9세대 2.3GHZ 16GB SSD 512GB
              라데온 560X 실버 터치바{" "}
            </option>
            <option value="1452">
              맥북프로 15인치 2019년 MV912KH/A i9-9세대 2.3GHZ 16GB SSD 512GB
              라데온 560X 그레이 터치바{" "}
            </option>
            <option value="1453">
              맥북프로 15인치 2019년 MV922KH/A i7-9세대 2.3GHZ 16GB SSD 256GB
              라데온 555X 실버 터치바{" "}
            </option>
            <option value="1454">
              맥북프로 15인치 2019년 MV902KH/A i7-9세대 2.3GHZ 16GB SSD 256GB
              라데온 555X 그레이 터치바{" "}
            </option>
            <option value="1456">
              맥북프로 16인치 2019 MVVM2KH/A i9-9세대 2.3GHZ 16GB SSD 1TB 라데온
              Pro 5500M 실버 터치바{" "}
            </option>
            <option value="1457">
              맥북프로 16인치 2019 MVVK2KH/A i9-9세대 2.3GHZ 16GB SSD 1TB 라데온
              Pro 5500M 그레이 터치바{" "}
            </option>
            <option value="1458">
              맥북프로 16인치 2019 MVVL2KH/A i9-9세대 2.6GHZ 16GB SSD 512GB
              라데온 Pro 5300M 실버 터치바{" "}
            </option>
            <option value="1459">
              맥북프로 16인치 2019 MVVJ2KH/A i9-9세대 2.6GHZ 16GB SSD 512GB
              라데온 Pro 5300M 그레이 터치바{" "}
            </option>
            <option value="1916">
              맥북에어 13인치 2020년 MWTJ2KH/A MWTK2KH/A MWTL2KH/A i3-10세대
              1.1GHz 8GB SSD256
            </option>
            <option value="1917">
              맥북에어 13인치 2020년 MVH52KH/A MVH22KH/A MVH42KH/A i5-10세대
              1.1GHz 8GB SSD512
            </option>
            <option value="1918">
              맥북프로 13인치 2020년 MXK32KH/A MXK62KH/A i5-8세대 1.4GHz 8GB SSD
              256GB 아이리스 플러스 645 실버 그레이 터치바
            </option>
            <option value="1919">
              맥북프로 13인치 2020년 MXK52KH/A MXK72KH/A i5-8세대 1.4GHz 8GB SSD
              512GB 아이리스 플러스 645 실버 그레이 터치바
            </option>
            <option value="1920">
              맥북프로 13인치 2020년 MWP42KH/A MWP72KH/A i5-10세대 2.0GHz 16GB
              SSD 512GB 아이리스 플러스 실버 그레이 터치바
            </option>
            <option value="1921">
              맥북프로 13인치 2020년 MWP52KH/A MWP82KH/A i5-10세대 2.0GHz 16GB
              SSD 1TB 아이리스 플러스 실버 그레이 터치바
            </option>
            <option value="1981">
              맥북프로 13인치 2020년 MYDA2KH/A MYD82KH/A Apple M1 3.2GHz 8GB
              256GB 실버 그레이 터치바
            </option>
            <option value="1982">
              맥북프로 13인치 2020년 MYDC2KH/A MYD92KH/A Apple M1 3.2GHz 8GB
              512GB 실버 그레이 터치바
            </option>
            <option value="1984">
              맥북에어 13인치 2020년 MGN93KH/A MGN63KH/A MGND3KH/A Apple M1
              3.2GHz 8GB 256GB 실버 그레이 골드
            </option>
            <option value="1985">
              맥북에어 13인치 2020년 MGNA3KH/A MGN73KH/A MGNE3KH/A Apple M1
              3.2GHz 8GB 512GB 실버 그레이 골드
            </option>
            <option value="4640">APPLE 2022 맥북프로13 MNEQ3KH/A</option>
            <option value="4641">APPLE 2022 맥북프로13 MNEJ3KH/A </option>
            <option value="4642">APPLE 2022 맥북프로13 MNEP3KH/A </option>
            <option value="4643">APPLE 2022 맥북프로13 MNEH3KH/A </option>
            <option value="4645">APPLE 2022 맥북에어 MLY03KH/A </option>
            <option value="4646">APPLE 2022 맥북에어 MLY23KH/A </option>
            <option value="4647">APPLE 2022 맥북에어 MLY43KH/A </option>
            <option value="4648">APPLE 2022 맥북에어 MLXX3KH/A </option>
            <option value="4649">APPLE 2022 맥북에어 MLXW3KH/A </option>
            <option value="4650">APPLE 2022 맥북에어 MLY13KH/A </option>
            <option value="4651">APPLE 2022 맥북에어 MLXY3KH/A </option>
            <option value="4652">APPLE 2022 맥북에어 MLY33KH/A </option>
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
      {props.State.category === "iphone" && (
        <div>
          <Select>
            <option value="choice">아이폰 기종</option>
            <option value="1687">아이폰5</option>
            <option value="1688">아이폰5S</option>
            <option value="1689">아이폰6</option>
            <option value="1690">아이폰6S</option>
            <option value="1691">아이폰6 플러스</option>
            <option value="1692">아이폰6S 플러스</option>
            <option value="1693">아이폰5C</option>
            <option value="1694">아이폰SE</option>
            <option value="1695">아이폰7</option>
            <option value="1696">아이폰7 플러스</option>
            <option value="1697">아이폰8</option>
            <option value="1698">아이폰8 플러스</option>
            <option value="1699">아이폰X</option>
            <option value="1700">아이폰XS</option>
            <option value="1701">아이폰XS MAX</option>
            <option value="1702">아이폰XR</option>
            <option value="1703">아이폰11</option>
            <option value="1704">아이폰11 Pro</option>
            <option value="1705">아이폰11 Pro MAX</option>
            <option value="1809">아이폰 12 (2020년형) 출시</option>
            <option value="1813">아이폰 12 프로 (2020년형) 출시</option>
            <option value="1706">아이폰 5 16GB</option>
            <option value="1707">아이폰 5 32GB</option>
            <option value="1708">아이폰 5 64GB</option>
            <option value="1709">아이폰 5S 16GB</option>
            <option value="1710">아이폰 5S 32GB</option>
            <option value="1711">아이폰 5S 64GB</option>
            <option value="1712">아이폰 6 16GB</option>
            <option value="1713">아이폰 6 64GB</option>
            <option value="1715">아이폰 6S 32GB</option>
            <option value="1716">아이폰 6S 64GB</option>
            <option value="1717">아이폰 6S 128GB</option>
            <option value="1718">아이폰 6S 플러스 16GB</option>
            <option value="1719">아이폰 6S 플러스 32GB</option>
            <option value="1720">아이폰 6S 플러스 64GB</option>
            <option value="1721">아이폰 6S 플러스 128GB</option>
            <option value="1722">아이폰 SE 16GB</option>
            <option value="1723">아이폰 SE 32GB</option>
            <option value="1724">아이폰 SE 64GB</option>
            <option value="1725">아이폰 7 32GB</option>
            <option value="1726">아이폰 7 128GB</option>
            <option value="1727">아이폰 7 256GB</option>
            <option value="1728">아이폰 7 플러스 32GB</option>
            <option value="1730">아이폰 7 플러스 128GB</option>
            <option value="1731">아이폰 7 플러스 256GB</option>
            <option value="1732">아이폰 8 64GB</option>
            <option value="1734">아이폰 8 256GB</option>
            <option value="1735">아이폰 8 플러스 64GB</option>
            <option value="1736">아이폰 8 플러스 256GB</option>
            <option value="1737">아이폰 X 64GB</option>
            <option value="1738">아이폰 X 256GB</option>
            <option value="1740">아이폰 XS 64GB</option>
            <option value="1741">아이폰 XS 256GB</option>
            <option value="1742">아이폰 XS 512GB</option>
            <option value="1743">아이폰 XS MAX 64GB</option>
            <option value="1744">아이폰 XS MAX 256GB</option>
            <option value="1745">아이폰 XS MAX 512GB</option>
            <option value="1746">아이폰 XR 64GB</option>
            <option value="1747">아이폰 XR 128GB</option>
            <option value="1748">아이폰 XR 256GB</option>
            <option value="1749">아이폰 11 64GB</option>
            <option value="1750">아이폰 11 128GB</option>
            <option value="1751">아이폰 11 256GB</option>
            <option value="1752">아이폰 11 Pro 64GB</option>
            <option value="1753">아이폰 11 Pro 256GB</option>
            <option value="1754">아이폰 11 Pro 512GB</option>
            <option value="1755">아이폰 11 Pro MAX 64GB</option>
            <option value="1756">아이폰 11 Pro MAX 256GB</option>
            <option value="1757">아이폰 11 Pro MAX 512GB</option>
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
      )}

      <div>측정가격</div>

      <button>가격책정</button>
    </div>
  );
};

export default PricingInput;

const Select = styled.select`
  width: 300px;
  height: 50px;
  overflow: auto;
`;
