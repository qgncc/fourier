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
    
    const xViewBox = 500
    const yViewBox = 500
    
    const coordsStartX = 250
    const coordsStartY = xViewBox/2

    const unitInterval = 1*scale

    function centerCoordsToSVGCoords([x,y]:Coords):Coords {
      return [x+250, -y+250]
    }

    function createLine(func: MathFunction) {
      let line = ""
      for (let x = (-xViewBox/2)/unitInterval; x < (xViewBox/2)/unitInterval; x+=1/detailLevel) {
        let [SVGX, SVGY] = centerCoordsToSVGCoords([x*unitInterval, func(x)*unitInterval])

        line += `L ${SVGX} ${SVGY} `
      }
      return line
    }

    let line = createLine(mathFunction)  

    return( 
      <svg width={width} height={height} viewBox={`0 0 ${xViewBox} ${yViewBox}`}>
        <path d={`M ${coordsStartX} 0 L ${coordsStartX} ${yViewBox}`} fill="transparent" stroke="#312312"/>
        <path d={`M 0 ${coordsStartY} L ${xViewBox} ${coordsStartY}`} fill="transparent" stroke="#312312"/>
        <path d={`M 0 ${coordsStartY}`+ line}  fill="transparent" stroke="#ff0000"/>
      </svg>
      )
}