import { useState, useEffect } from "react";

const useGetData = () => {
    const [count, setCount] = useState(0);
    const [issData, setissData] = useState();
    setTimeout(() => {
        setCount(count + 1);
    }, 1000);

    const getData = async function () {
        try {
            const response = await fetch(
                "http://api.open-notify.org/iss-now.json",
                {
                    mode: "no-cors",
                }
            );
            const issPos = await response.json();
            setissData(issPos);
        } catch (err) {
            console.log("Opps", err);
        }
    };

    useEffect(() => {
        getData();
        return () => {
            getData();
        };
    }, [count]);

    return { issData };
};

export default useGetData;
