import { useEffect, useState } from "react";

const RandomImageGenerator = (props) => {
    const [color, setColor] = useState();
    const randomColorGenerator = () => {
        const randomColor = Math.floor(Math.random() * 16777215)
            .toString(16)
            .padStart(6, "0")
            .toUpperCase();
        return `#${randomColor}`;
    };

    useEffect(() => {
        const bgColor = randomColorGenerator();
        setColor(bgColor);
    }, []);

    return (
        <div
            className={`h-[50px] flex items-center justify-center text-[22px] w-[50px] rounded-[50px]`}
            style={{
                backgroundColor: color,
            }}
        >
            {props.name[0]}
        </div>
    );
};

export default RandomImageGenerator;
