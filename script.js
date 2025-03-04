const svg = d3.select("#visualization");

// 清除當前 SVG 圖像
function clearSVG() {
    svg.selectAll("*").remove();
}

// **BPNN（神經網路）動畫**
function showBPNN() {
    clearSVG();

    const layers = [3, 5, 2]; // 三層神經網路：輸入層 3、隱藏層 5、輸出層 2
    let xOffset = 150;
    let ySpacing = 60;
    
    layers.forEach((neurons, layerIdx) => {
        let yOffset = (svg.attr("height") - neurons * ySpacing) / 2;

        for (let i = 0; i < neurons; i++) {
            svg.append("circle")
                .attr("cx", xOffset)
                .attr("cy", yOffset + i * ySpacing)
                .attr("r", 20)
                .attr("fill", "#3498db")
                .attr("opacity", 0)
                .transition().duration(800)
                .attr("opacity", 1);
        }

        xOffset += 200;
    });

    // 連接神經元
    setTimeout(() => {
        svg.selectAll("line").remove();
        for (let i = 0; i < layers.length - 1; i++) {
            for (let j = 0; j < layers[i]; j++) {
                for (let k = 0; k < layers[i + 1]; k++) {
                    svg.append("line")
                        .attr("x1", 150 + i * 200)
                        .attr("y1", (svg.attr("height") - layers[i] * ySpacing) / 2 + j * ySpacing)
                        .attr("x2", 150 + (i + 1) * 200)
                        .attr("y2", (svg.attr("height") - layers[i + 1] * ySpacing) / 2 + k * ySpacing)
                        .attr("stroke", "#ccc")
                        .attr("stroke-width", 2)
                        .attr("opacity", 0)
                        .transition().duration(800)
                        .attr("opacity", 1);
                }
            }
        }
    }, 1000);
}

// **KNN（K-最近鄰）動畫**
function showKNN() {
    clearSVG();

    let points = [];
    for (let i = 0; i < 20; i++) {
        points.push({
            x: Math.random() * 700 + 50,
            y: Math.random() * 400 + 50,
            category: Math.random() > 0.5 ? "red" : "blue"
        });
    }

    let testPoint = { x: 400, y: 250 };

    svg.selectAll("circle")
        .data(points)
        .enter().append("circle")
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", 8)
        .attr("fill", d => d.category);

    svg.append("circle")
        .attr("cx", testPoint.x)
        .attr("cy", testPoint.y)
        .attr("r", 12)
        .attr("fill", "green");

    // 連接最近鄰
    setTimeout(() => {
        svg.selectAll("line").remove();
        let sorted = points.sort((a, b) => Math.hypot(a.x - testPoint.x, a.y - testPoint.y) - Math.hypot(b.x - testPoint.x, b.y - testPoint.y));
        let neighbors = sorted.slice(0, 5);
        
        neighbors.forEach(n => {
            svg.append("line")
                .attr("x1", testPoint.x)
                .attr("y1", testPoint.y)
                .attr("x2", n.x)
                .attr("y2", n.y)
                .attr("stroke", "black")
                .attr("stroke-width", 2);
        });
    }, 1000);
}

// **DT（決策樹）動畫**
function showDT() {
    clearSVG();

    let nodes = [
        { x: 400, y: 50, text: "Root" },
        { x: 250, y: 150, text: "Feature A" },
        { x: 550, y: 150, text: "Feature B" },
        { x: 150, y: 250, text: "Class 1" },
        { x: 350, y: 250, text: "Class 2" },
        { x: 450, y: 250, text: "Class 3" }
    ];

    nodes.forEach(n => {
        svg.append("circle").attr("cx", n.x).attr("cy", n.y).attr("r", 20).attr("fill", "orange");
        svg.append("text").attr("x", n.x).attr("y", n.y + 5).attr("text-anchor", "middle").text(n.text);
    });

    svg.append("line").attr("x1", 400).attr("y1", 70).attr("x2", 250).attr("y2", 130).attr("stroke", "black");
}
