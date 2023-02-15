import "./App.css";
import { useEffect, useState, useCallback } from "react"; //useEffectとuseSateを使うための設定

const App = () => {
  return <Weather></Weather>;
};
const Weather = () => {
  const [data, setData] = useState([]); //JSONで返ってきたデータを保存するためのもの
  const [loading, setloading] = useState(true); //ローディング中か否かのフラグを設定する
  const [city, setcityCode] = useState(130000); //都市コード用、初期値は東京エリア
  const queryWeather = useCallback(async () => {
    //useCallback(第一引数、第二引数)
    //第二引数の値[city]の値が変化したときのみ、コールバック内の関数が再実行される。useCallbackはビルトインフックの1つ
    const url = `https://www.jma.go.jp/bosai/forecast/data/forecast/${city}.json`;
    const response = await fetch(url);
    const jsondata = await response.json();
    //必要な部分のデータを上から順番に辿って指定する。JSONは階層構造になっている
    //console.log(jsondata[0].timeSeries[0].areas[0].weathers);

    //必要なデータだけをsetData()で抜き出してステートに保存する
    setData(jsondata[0].timeSeries[0].areas[0]);
    setloading(false);
  }, [city]);
  const handleChange = (event) => {
    setcityCode(event.target.value);
    setloading(true);
  };
  useEffect(() => {
    //コンポーネントが描画されてから実行するためuseEffectを使用する
    queryWeather();
  }, [city, queryWeather]);
  let weatherInfo;
  if (loading) {
    weatherInfo = <p>loading</p>;
  } else {
    weatherInfo = (
      <p>
        {data.area.name}の明日の天気{data.weathers[0]}
      </p>
    );
  }

  return (
    <>
      <h1>Weather</h1>
      {weatherInfo}
      <select onChange={handleChange}>
        <option value="130000">東京</option>
        <option value="270000">大阪</option>
        <option value="016000">札幌</option>
      </select>
    </>
  );
};

export default App;
