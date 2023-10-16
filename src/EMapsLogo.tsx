import { AbsoluteFill, Img, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import data from './GB_data.json';

import {z} from 'zod'
import {Sequence} from 'remotion'
import { Img, staticFile } from "remotion";
import {Title} from './HelloWorld/Title';
import { Subtitle } from "./HelloWorld/Subtitle";
import { EMapsData } from "./HelloWorld/EMapsDataSubtitle";
import { ResponsiveLine } from '@nivo/line'


export const EmCompSchema = z.object({
	titleText: z.string(),
});



export const EmComp: React.FC = () => {
  const titleText = " 🔥 ElectricityMaps ❤️‍🔥";
  const titleColor = "cornflowerblue";
  const frame = useCurrentFrame();
	const { durationInFrames, fps } = useVideoConfig();

  const dataIndex = Math.floor(((frame - 140) / (durationInFrames - 140)) * data.length);
  const dataForThisFrame = data[dataIndex];
  const previousData = data.slice(0, dataIndex);
  // Const previousData = data;
  const chartData = [
    {
      id: 'carbonIntensity',
      data: previousData.map(d => ({
        x: d.datetime.slice(0, -3),
        y: JSON.parse(d.data).carbon_intensity_avg
      }))
    }
  ];
  console.log(chartData);


  return (
    // <AbsoluteFill style={{backgroundColor: 'white'}}>
    <AbsoluteFill style={{backgroundColor: 'transparent', position: 'relative'}}>
    <Img
      src={staticFile("map.png")} // Replace with your background image file
      style={{
        opacity: 0.9, // Adjust the opacity of the background image
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1, // Place the background image below other content
      }}
    />
    <Sequence from={10} durationInFrames={140}>
      <Img src={staticFile("logo.png")}
      style={{
        position: 'absolute',
        top: '50%', // Center vertically
        left: '50%', // Center horizontally
        transform: 'translate(-50%, -50%)', // Center both horizontally and vertically
        width: 150, // Adjust the width to make the logo smaller
        height: 150, // Adjust the height to make the logo smaller
        zIndex: 1, // Place the logo above the background image
      }} />
    </Sequence>
    <Sequence from={40} durationInFrames={100}>
      <Title titleText={titleText} titleColor={titleColor} />
    </Sequence>
    <Sequence from={65} durationInFrames={75}>
      <Subtitle />
    </Sequence>
    <Sequence from={140} durationInFrames={160}>
    <AbsoluteFill style={{position: 'absolute'}}>
				<div style={{
					position: 'absolute',
					bottom: 0,
					left: 0,
					padding: 0,
					width: '100%',
					height: 200,
					backgroundColor: 'rgba(255,255,255,0.7)',
					borderTopLeftRadius: 25,
					borderTopRightRadius: 25,
					zIndex: 9999,
				}}>
					<ResponsiveLine
						useMesh
						data={chartData}
						xScale={{
							type: 'time',
							format: '%Y-%m-%d %H:%M:%S',
							useUTC: true,
							precision: 'second',
							min: '2023-09-01 00:00:00',
							max: '2023-09-15 23:00:00',
						}}
						xFormat="time:%Y-%m-%d %H:%M:%S.%"
						yScale={{
							type: 'linear',
							min: 0,
							max: 800,
						}}
						axisLeft={{
							legend: 'CO2 (g/kWh)',
							legendOffset: -50,
							legendPosition: 'middle',
						}}
						axisBottom={{
							format: '%Y-%m-%d',
							tickValues: 'every 1 days',
						}}
						enablePointLabel={false}
						enableSlices={false}
						enablePoints={false}
						margin={{ top: 20, right: 110, bottom: 50, left: 60 }}
						legends={[
							{
								anchor: 'bottom-right',
								direction: 'column',
								justify: false,
								translateX: 100,
								translateY: 0,
								itemsSpacing: 0,
								itemDirection: 'left-to-right',
								itemWidth: 80,
								itemHeight: 20,
								itemOpacity: 0.75,
								symbolSize: 12,
								symbolShape: 'circle',
								symbolBorderColor: 'rgba(0, 0, 0, .5)',
								effects: [
									{
										on: 'hover',
										style: {
											itemBackground: 'rgba(0, 0, 0, .03)',
											itemOpacity: 1
										}
									}
								]
							}
						]}

					/>
				</div>
			</AbsoluteFill>
    </Sequence>
    </AbsoluteFill>
  );
};

