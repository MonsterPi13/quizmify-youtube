"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import D3WordCloud from "react-d3-cloud";

const data = [
  { text: "Hey", value: 1000 },
  { text: "lol", value: 200 },
  { text: "first impression", value: 800 },
  { text: "very cool", value: 1000000 },
  { text: "duck", value: 10 },
];

const fontSizeWrapper = (word: { value: number }) =>
  Math.log2(word.value) * 5 + 16;

const CustomCloudWord = () => {
  const theme = useTheme();
  const router = useRouter();

  return (
    <D3WordCloud
      data={data}
      height={550}
      font={"Times"}
      fontSize={fontSizeWrapper}
      rotate={0}
      padding={10}
      fill={theme.theme === "dark" ? "white" : "dark"}
      onWordClick={(event, word) => {
        router.push("/quiz?topic=" + word.text);
      }}
    />
  );
};

export default CustomCloudWord;
