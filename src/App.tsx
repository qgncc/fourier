import "./App.scss";
import { CartesianGraph, PolarGraph } from "./components/Graph/";
import { useState } from "react";
import "katex/dist/katex.min.css";
import { BlockMath as Latex, InlineMath as LatexInline } from "react-katex";
import { Input, Label } from "./components/Input";
import { Text } from "./components/Text";

function App() {
  let { sqrt, PI: π, abs, cos, sin } = Math;
  let [frequency, setFrequency] = useState(1);

  function δ(arg: number) {
    const ε = 0.005;
    return sin(π * 8 * arg) / (π * 8 * arg);
  }

  let exampleFunction = (x: number) => cos(x) + cos(4 * x);

  return (
    <div className="App">
      <h1>Преобразование Фурье</h1>
      <Text>
        Как известно, любую переодическую (а на конкретном промежутке и
        непериодическую) функцию можно разложить в ряд Фурье.
        <Latex>{String.raw`f(x)={\frac {a_{0}}{2}}+\sum \limits _{k=1}^{+\infty }A_{k}\cos \left(k{\frac {2\pi }{\tau }}x+\theta _{k}\right)`}</Latex>
        Возьмем функцию
        <Latex>f(x) = \cos x + \cos 4x</Latex>
        Её график выглядит так:
      </Text>
      <CartesianGraph
        detailLevel={300}
        width={500}
        height={500}
        axisColor={"#fff"}
        graphColor={"#f55"}
        strokeWidth={3}
        unitInterval={50}
        center={[0, 250]}
        fn={exampleFunction}
      />
      <Text>
        Теперь "обернём" функцию вокруг центра системы координат, например, с
        помощью полярных координат:
      </Text>
      <PolarGraph
        detailLevel={300}
        width={500}
        height={500}
        strokeWidth={3}
        axisColor={"#fff"}
        graphColor={"#f55"}
        period={[0, 8 * π]}
        unitInterval={50}
        frequency={frequency}
        fn={exampleFunction}
      />
      <Label>
        Изменить частоту:
        <Input
          type="number"
          step={0.02}
          value={frequency}
          onChange={(e) => setFrequency(e.target.valueAsNumber)}
        />
      </Label>
      <Text>
        Если мы поиграемся с частотой "оборота", то заметим, что основная "масса
        функции", при частотах 1 обр/с и 4 обр/с, смещается от начала координат
        в сторону. <br />
        Одним из способов "обернуть" функцию вокруг начала координат, является
        формула Эйлера:
        <Latex>{String.raw`e^{ix}=\cos x+i\sin x`}</Latex>
        Умножая функцию <LatexInline>{"f(x)"}</LatexInline>
        на
        <LatexInline>{String.raw`e^{i \omega x}`}</LatexInline>
        где <LatexInline>\omega</LatexInline> — частота оборота. Взяв интеграл
        от получившейся функции:
        <Latex>{String.raw`{\hat {f}}(\omega )={\frac {1}{{\sqrt {2\pi }}}}\int \limits _{{-\infty }}^{{\infty }}f(x)e^{{ix\omega }}\,dx.`}</Latex>
        получаем комплексную функцию , которая отслеживает изменение "центра
        массы" в зависимости от частоты. Взяв модуль получившейся функции{" "}
        <LatexInline>{String.raw`|\hat {f(\omega)}|`}</LatexInline>, сможем
        отследить его смещение относительно начала координат, в зависимости от
        частоты. Отобразив функцию на графике видим экстремумы в точках с
        частотами, содержащимися в изначальной функции{" "}
        <LatexInline> f(x) = \cos x + \cos 4x</LatexInline>.
      </Text>
      <CartesianGraph
        detailLevel={300}
        width={500}
        height={250}
        axisColor={"#fff"}
        graphColor={"#f55"}
        strokeWidth={3}
        unitInterval={75}
        center={[0, 200]}
        fn={(x) => abs(sqrt(π / 2) * δ(x - 4) + sqrt(π / 2) * δ(x - 1))}
      />
    </div>
  );
}

export default App;
