type Points = Array<[number, number]>
type MathFunction = (x: number)=>number 

interface GraphProps{
    mathFunction: MathFunction,
    width: number,
    height: number,
    scale?: number,
    detailLevel?: number
}

type Coords = [number, number]




export function Graph({scale = 1, mathFunction, width, height, detailLevel = 1}: GraphProps){
    
    const xViewBox = width
    const yViewBox = height
    
    const centerX = width/2
    const centerY = height/2


    const unitInterval = 1*scale

    function centerCoordsToSVGCoords([x,y]:Coords):Coords {
      return [x+centerX, -y+centerY]
    }

    function createLine(func: MathFunction) {
      let startX = -centerX/unitInterval
      let endX = centerX/unitInterval
      
      let line = `M ${centerCoordsToSVGCoords([startX*unitInterval, func(startX)*unitInterval]).join(" ")} `

      for (let x = startX; x < endX; x+=1/detailLevel) {
        let [SVGX, SVGY] = centerCoordsToSVGCoords([x*unitInterval, func(x)*unitInterval])
        line += `L ${SVGX} ${SVGY} `
      }
      return line
    }

    let line = createLine(mathFunction)  

    return( 
      <svg width={width} height={height} viewBox={`0 0 ${xViewBox} ${yViewBox}`}>
        <path d={`M ${centerX} 0 L ${centerX} ${yViewBox}`} fill="transparent" stroke="#312312"/>
        <path d={`M 0 ${centerY} L ${xViewBox} ${centerY}`} fill="transparent" stroke="#312312"/>
        <path d={line}  fill="transparent" stroke="#ff0000"/>
      </svg>
      )
}