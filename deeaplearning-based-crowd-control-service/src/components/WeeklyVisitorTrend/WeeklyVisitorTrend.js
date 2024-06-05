import React, { useState, useEffect } from "react";
import axios from "axios";
import styles from "./WeeklyVisitorTrend.module.css";
import SmallLinePlot from "../SmallLineChart/SmallLineChart";

const WeeklyVisitorTrend = ({
  width,
  height,
  color1,
  color2,
  useAxis,
  useDp,
  useCurve,
  weekavg,
}) => {
  console.log("주평균 전달데이터", weekavg)
  

  const [parsedData1, setParseData1] = useState([]);
  const [parsedData2, setParseData2] = useState([]);
  const [icons, setIcons] = useState({ icon1: null, icon2: null });
  const [twvisitor, setTwVisitor] = useState([]);
  const [lwvisitor, setLwVisitor] = useState([]);
  const [llwvisitor, setLLwVisitor] = useState([]);

  
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId = sessionStorage.getItem("userID");

        if (!userId) {
          console.error("세션에서 userID를 가져올 수 없습니다.");
          return;
        }

        const response = await axios.get(`http://localhost:4000/thisweek`, {
          params: { userId }, // 쿼리스트링으로 userId 전달
          withCredentials: true,
        });
     
        const response2 = await axios.get(`http://localhost:4000/lastweek`, {
          params: { userId }, // 쿼리스트링으로 userId 전달
          withCredentials: true,
        });
        if (response.status === 200) {
          console.log("이번주 추이", response.data);
          const parsedData1 = response.data.map(d => ({
            day: new Date(d.day),
            avg_population: +d.avg_population
          }));
          setParseData1(parsedData1);
        }
        if (response2.status === 200) {
          console.log("저번주 추이", response2.data);

          const parsedData2 = response2.data.map(d => ({
            day: new Date(d.day),
            avg_population: +d.avg_population
          }));
    
          setParseData2(parsedData2);

          setTwVisitor(weekavg.this_week);
          setLwVisitor(weekavg.last_week);
          setLLwVisitor(weekavg.last_month);

    
        }
      

  
  let icon1 = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      fill="#3498DB"
      class="bi bi-dash"
      viewBox="0 0 16 16"
    >
      <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
    </svg>
  );
  let icon2 = (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="25"
      height="25"
      fill="#3498DB"
      class="bi bi-dash"
      viewBox="0 0 16 16"
    >
      <path d="M4 8a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7A.5.5 0 0 1 4 8" />
    </svg>
  );
  if (twvisitor >= lwvisitor) {
    icon1 = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="#EC5454"
        class="bi bi-triangle-fill"
        viewBox="0 0 16 16"
        style={{ marginLeft: "2rem" }}
      >
        <path
          fill-rule="evenodd"
          d="M7.022 1.566a1.13 1.13 0 0 1 1.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767z"
        />
      </svg>
    );
  } else {
    icon1 = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="#3498DB"
        class="bi bi-triangle-fill"
        viewBox="0 0 16 16"
        style={{ marginLeft: "2rem", transform: "rotate(60deg)" }}
      >
        <path
          fill-rule="evenodd"
          d="M7.022 1.566a1.13 1.13 0 0 1 1.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767z"
        />
      </svg>
    );
  }
  if (lwvisitor > llwvisitor) {
    icon2 = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="#EC5454"
        class="bi bi-triangle-fill"
        viewBox="0 0 16 16"
        style={{ marginLeft: "2rem" }}
      >
        <path
          fill-rule="evenodd"
          d="M7.022 1.566a1.13 1.13 0 0 1 1.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767z"
        />
      </svg>
    );
  } else {
    icon2 = (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="16"
        height="16"
        fill="#3498DB"
        class="bi bi-triangle-fill"
        viewBox="0 0 16 16"
        style={{ marginLeft: "2rem", transform: "rotate(60deg)" }}
      >
        <path
          fill-rule="evenodd"
          d="M7.022 1.566a1.13 1.13 0 0 1 1.96 0l6.857 11.667c.457.778-.092 1.767-.98 1.767H1.144c-.889 0-1.437-.99-.98-1.767z"
        />
      </svg>
    );
  }

  setIcons({ icon1, icon2 });

      } catch (error) {
        console.error("Error fetching data:", error);
      }

      

      

      

    };

    fetchData();

    const interval = setInterval(fetchData, 60000);

    return () => clearInterval(interval); // 컴포넌트가 unmount될 때 interval 해제
  }, []);
  return (
    <div className={styles.VisitorTrend}>
      <table className={styles.visitor}>
        <tr>
          <td className={styles.td}>
            <SmallLinePlot
              data={parsedData1}
              width={width}
              height={height}
              color={color1}
              useAxis={useAxis}
              useDp={useDp}
              useCurve={useCurve}
            />
          </td>
          <td className={styles.td}>
            <div className={styles.infoCol}>
              <div className={styles.numOrGuideRaw}>
                <div className={styles.numCol}>
                  <p className={styles.num}>{twvisitor}</p>

                  <div className={styles.arrawCol}>{icons.icon1}</div>
                </div>
              </div>
              <div className={styles.numOrGuideRaw}>
                <div className={styles.guide}>
                  <p className={styles.rguide}>이번주 방문자</p>
                </div>
              </div>
            </div>
          </td>
        </tr>
        <div className={styles.borderLine} />
        <tr>
          <td className={styles.td}>
            <SmallLinePlot
              data={parsedData2}
              width={width}
              height={height}
              color={color2}
              useAxis={useAxis}
              useDp={useDp}
              useCurve={useCurve}
            />
          </td>
          <td className={styles.td}>
            <div className={styles.infoCol}>
              <div className={styles.numOrGuideRaw}>
                <div className={styles.numCol}>
                  <p className={styles.num}>{lwvisitor}</p>
                </div>
                <div className={styles.arrawCol}>{icons.icon2}</div>
              </div>
              <div className={styles.numOrGuideRaw}>
                <div className={styles.guide}>
                  <p className={styles.rguide}>지난주 방문자</p>
                </div>
              </div>
            </div>
          </td>
        </tr>
      </table>
    </div>
  );
};

export default WeeklyVisitorTrend;
