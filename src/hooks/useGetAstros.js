import { useState, useEffect } from "react";

const useGetAstros = () => {
    const [count, setCount] = useState(0);
    const [astro, setAstro] = useState();
    setTimeout(() => {
        setCount(count + 1);
    }, 1000);

    const getAstros = async function () {
        try {
            const response = await fetch(
                "http://api.open-notify.org/astros.json",
                {
                    mode: "no-cors",
                }
            );
            const issAstro = await response.json();
            setAstro(issAstro);
        } catch (err) {
            console.log("Couldn't get astronauts data", err);
        }
    };
    useEffect(() => {
        getAstros();
        return () => {
            getAstros();
        };
    }, [count]);
    return { astro };
};

export default useGetAstros;
