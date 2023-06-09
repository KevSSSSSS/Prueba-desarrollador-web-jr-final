import React, { useEffect, useRef } from 'react'

function LineGraph(props) {

    const canvasRef = useRef(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        // Limpiar la grafica
        ctx.clearRect(0, 0, canvas.width, canvas.height);

        // Datos de la gráfica
        const data = props.data;
        const dataLength = data.length;

        // Tamaño del lienzo
        const width = canvas.width;
        const height = canvas.height;

        // Calcula el ancho de cada barra en función del número de datos
        const barWidth = width / dataLength;

        // Dibuja la gráfica
        ctx.beginPath();
        ctx.moveTo(0, height - data[0].value * height);

        for (let i = 1; i < dataLength; i++) {
            ctx.lineTo(i * barWidth, height - data[i].value * height);
        }

        ctx.lineWidth = 3;
        ctx.strokeStyle = 'white';
        ctx.stroke();

        // Etiquetas de valor en el eje y
        ctx.fillStyle = 'white';
        ctx.font = '12px Arial';

        ctx.fillText('1', 10 , 15);
        ctx.fillText('0', 10 , height - 5);

        for (let i = 0; i < dataLength; i++) {
            const label = data[i].date.toString().slice(8,10) + "-" + data[i].date.toString().slice(5,7) + "-"+ data[i].date.toString().slice(2,4);
            const xPos = ((i + 1) * barWidth ) - 30;
            const yPos = height;

            ctx.fillText(label, xPos, yPos);
        }

    }, [props.data])
    return (
        <canvas ref={canvasRef} width={800} height={200}></canvas>
    )
}

export default LineGraph