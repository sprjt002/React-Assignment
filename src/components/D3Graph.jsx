import { useEffect, useRef, useState } from 'react';
import * as d3 from 'd3';

function D3Graph() {
    const svgRef = useRef(null);
    const [data, setData] = useState([]);

    // Listen to d3Data events
    useEffect(() => {
        const handleD3Data = (event) => setData(event.detail);
        document.addEventListener("d3Data", handleD3Data);
        return () => document.removeEventListener("d3Data", handleD3Data);
    }, []);

    useEffect(() => {
        if (!data || data.length === 0) return;

        const svg = d3.select(svgRef.current);

        // Get dimensions
        const w = svg.node().getBoundingClientRect().width;
        const h = svg.node().getBoundingClientRect().height;

        // Clear previous graph
        svg.selectAll("*").remove();

        // Background
        svg.append('rect')
            .attr('width', w)
            .attr('height', h)
            .attr('fill', '#464646');

        // Parse data
        const parsedData = data.map((item, index) => {
            const numbers = item.match(/\d+\.?\d*/g);
            const value = numbers ? parseFloat(numbers[0]) : index;
            return { index, value };
        });

        // Scales
        const xScale = d3.scaleLinear()
            .domain([0, parsedData.length - 1])
            .range([0, w]);

        const yExtent = d3.extent(parsedData, d => d.value);
        const yScale = d3.scaleLinear()
            .domain([0, yExtent[1] || 100])   // always start at 0
            .range([h, 0]);

        const barWidth = w / parsedData.length;

        // Bars
        svg.append('g')
            .selectAll('rect')
            .data(parsedData)
            .enter()
            .append('rect')
            .attr('x', d => xScale(d.index))
            .attr('y', d => yScale(d.value))
            .attr('width', Math.max(barWidth - 1, 2))
            .attr('height', d => h - yScale(d.value))
            .attr('fill', (d, i) => `rgb(${20 + i * 2}, ${100 + i}, ${200 - i})`)
            .attr('opacity', 0.8);

    }, [data]);

    return (
        <div className="d3-graph-container mt-4">
            <svg ref={svgRef} width="100%" height="380px" className="rounded p-2"></svg>
        </div>
    );
}

export default D3Graph;
