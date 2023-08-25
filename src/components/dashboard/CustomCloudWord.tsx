"use client";

import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import D3WordCloud from "react-d3-cloud";

const fontSizeWrapper = (word: { value: number }) =>
  Math.log2(word.value) * 5 + 16;

interface props {
  formattedTopics: {
    text: string;
    value: number;
  }[];
}

const CustomCloudWord: React.FC<props> = ({ formattedTopics }) => {
  const theme = useTheme();
  const router = useRouter();

  return (
    <D3WordCloud
      data={formattedTopics}
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
