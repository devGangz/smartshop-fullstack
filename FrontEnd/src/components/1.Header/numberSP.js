import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux"

import { getNumberIncart } from '../../actions/24h.action'


const NumberSL = () => {
    const dispatch = useDispatch()
    const { resetCart } = useSelector((reduxData) => reduxData.ReducerOne)

    const [n, setN] = useState(0)
    useEffect(() => {
        let products = JSON.parse(localStorage.getItem('products')) || []
        const newSetProductOK = products.reduce((acc, current) => {
            const x = acc.find(item => item.model === current.model);
            if (!x) {
                return acc.concat([current]);
            } else {
                return acc;
            }
        }, []);


        let sum = 0
        newSetProductOK.forEach((item) => {
            sum += item.qtt
        })
        setN(sum)
        dispatch(getNumberIncart(sum))
    }, [resetCart])

    return (
        <>
            <h6 className="css-notify">{n > 0 ? n : 0}</h6>
        </>
    )
}


export default NumberSL