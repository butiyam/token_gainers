"use client";

import { useLayoutEffect, useRef, useEffect } from "react";
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import am4themes_animated from "@amcharts/amcharts4/themes/animated";

// Apply the animated theme
am4core.useTheme(am4themes_animated);

const Chart3D = ({ data }) => {
  const chartDiv = useRef(null);
  const chartRef = useRef(null); // To store the chart instance

  useLayoutEffect(() => {
    // Create chart instance
    const chart = am4core.create("chartdiv", am4charts.PieChart3D);
    chart.hiddenState.properties.opacity = 0; // initial fade-in

    // Store chart instance in ref
    chartRef.current = chart;

    // Explicitly disable and hide the logo/watermark
    chart.logo.disabled = true;
    chart.logo.opacity = 0; // Ensure it’s invisible
    chart.logo.height = 0; // Collapse its size
    chart.logo.width = 0;

    // Add custom tokenomics data with separate height and adjusted values
    chart.data = data;

    // Remove inner radius to make it a full pie (not donut)
    chart.innerRadius = 0;
    chart.depth = 300;
    chart.angle = 40;

    // Remove legend completely
    chart.legend = null;

    // Create series
    const series = chart.series.push(new am4charts.PieSeries3D());
    series.dataFields.value = "value";
    series.dataFields.depthValue = "height"; // Use custom height
    series.dataFields.category = "name";
    series.slices.template.cornerRadius = 5;

    // Use custom colors from data
    series.slices.template.adapter.add("fill", (fill, target) => {
      if (target.dataItem && target.dataItem.dataContext.color) {
        return am4core.color(target.dataItem.dataContext.color);
      }
      return fill;
    });

    // Remove external labels and connector lines
    series.ticks.template.disabled = true;
    series.labels.template.disabled = false;

    // Add percentage labels inside each slice with 3D Z-axis tilt
    series.labels.template.text = "{displayValue}%";
    series.labels.template.radius = am4core.percent(-40); // Move labels closer to the center
    series.labels.template.fill = am4core.color("#FFFFFF");
    series.labels.template.fontSize = 18; // Default font size
    series.labels.template.fontWeight = "bold";
    series.alignLabels = false;

    // Center the labels within each slice
    series.labels.template.adapter.add("verticalCenter", () => "middle");
    series.labels.template.adapter.add("horizontalCenter", () => "middle");

    // Apply realistic 3D rotation effect
    series.labels.template.adapter.add("html", (html, target) => {
      return `<div style="transform: perspective(800px) rotateX(25deg) rotateZ(-25deg); transform-origin: center; display: inline-block;">${target.text}</div>`;
    });

    // Disable label truncation
    series.labels.template.maxWidth = undefined;
    series.labels.template.wrap = false;

    // Customize tooltip
    series.slices.template.tooltipText = "{name} ({displayValue}%)";

    // Clean up function
    return () => {
      chart.dispose();
    };
  }, []);

  // Effect to monitor screen width and adjust font size
  useEffect(() => {
    const updateFontSize = () => {
      const chart = chartRef.current;
      if (chart && chart.series.length > 0) {
        const series = chart.series.getIndex(0); // Get the first series
        if (window.innerWidth < 640) {
          series.labels.template.fontSize = 15; // Set font size to 12px below 640px
        } else {
          series.labels.template.fontSize = 18; // Revert to default 18px
        }
      }
    };

    // Initial call to set font size based on current width
    updateFontSize();

    // Add resize event listener
    window.addEventListener("resize", updateFontSize);

    // Cleanup listener on unmount
    return () => {
      window.removeEventListener("resize", updateFontSize);
    };
  }, []); // Empty dependency array to run only once on mount

  return (
    <div
      id="chartdiv"
      className="sm:w-[550px] w-[350px] h-[400px] lg:h-[550px] xl:h-[650px] mx-auto my-auto mt-[30px] xl:pe-0 lg:pe-5"
      ref={chartDiv}
    ></div>
  );
};

export default Chart3D;
