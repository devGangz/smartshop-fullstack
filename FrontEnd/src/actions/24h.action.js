import { type } from "@testing-library/user-event/dist/type";
import {
    PRODUCT_RECEIVED,
    MINMAX_PRICE_REQUIRE,
    CLEAR_ALL,
    GET_PHAN_KHUC,
    GET_BRAND,
    GET_MAX_MIN,
    ADD_ARRAY_CART,
    PENDING_VOUCHER,
    GET_VOUCHER_SUCCESS,
    GET_VOUCHER_ERROR,
    OPEN_MODAL,
    OFF_MODAL,
    GET_INFORMATON,
    PENDING_ORDER,
    GET_ORDER_SUCCESS,
    GET_ORDER_ERROR,
    SHOW_ALERT_VOUCHER,

    RESET_CART,
    SEND_USER_TO_SERVER,
    GET_SL_GIO_HANG,
    PRODUCT_RECEIVED_SEARCH

} from "../constants/24h.constant";

export const getNumberIncart = (sl) => {
    return {
        type: GET_SL_GIO_HANG,
        data: sl
    }
}


export const sendUserToServer = (objectOne) => {
    return {
        type: SEND_USER_TO_SERVER,
        data: objectOne,
    }
}


export const onClickReset = () => {
    return {
        type: RESET_CART
    }
}

export const clickSearchValue = (searchValue) => {
    return async (dispatch) => {
        try {
            var requestOptions = {
                method: "GET",
                redirect: "follow",
            };
            const responseOne = await fetch("http://localhost:8080/productFull", requestOptions)

            const params = new URLSearchParams({
                search: searchValue
            })

            const responseTwo = await fetch("http://localhost:8080/productFullB?" + params.toString(), requestOptions)
            const responseSearch = await responseTwo.json()
            //console.log(params.toString());
            //console.log("responseSearch", responseSearch.allProducts)
            return dispatch({
                type: PRODUCT_RECEIVED_SEARCH,
                dataSearch: responseSearch.allProducts
            })
        } catch (error) {
            return dispatch({
                type: GET_ORDER_ERROR,
                error: error
            })
        }
    }
}


export const clickFilterProduct = (brand, loaisp, maxCost, minCost) => {
    return async (dispatch) => {
        try {
            var requestOptions = {
                method: "GET",
                redirect: "follow",
            };
            const responseOne = await fetch("http://localhost:8080/productFull", requestOptions)

            const params = new URLSearchParams({
                brand: brand,
                loaisp: loaisp,
                minCost: minCost,
                maxCost: maxCost
            })

            const responseTwo = await fetch("http://localhost:8080/productFullA?" + params.toString(), requestOptions)
            const response3 = await responseTwo.json()
            // console.log(params.toString());
            // console.log("res3", response3);
            return dispatch({
                type: PRODUCT_RECEIVED,
                data: response3
            })
        } catch (error) {
            return dispatch({
                type: GET_ORDER_ERROR,
                error: error
            })
        }
    }
}


export const sendInformation = (data1, data2, data3) => {
    return async (dispatch) => {
        try {
            var myHeaders = new Headers()
            myHeaders.append("Content-Type", "application/json")

            var vObjinput = {
                cartList: data1,
                voucherAndCost: data2,
                inforCustomer: data3,
            }


            var vObjectReq = JSON.stringify(vObjinput)
            console.log(vObjectReq);
            var requestOptions = {
                method: "POST",
                headers: myHeaders,
                body: vObjectReq,
                redirect: "follow",
            }


            const responseProducts = await fetch("http://localhost:8080/order", requestOptions)
            const productOrder = await responseProducts.json()
            console.log("GGG", productOrder);

            return dispatch({
                type: GET_ORDER_SUCCESS,
                data: productOrder
            })


        } catch (error) {
            return dispatch({
                type: GET_ORDER_ERROR,
                error: error
            })
        }
    }
}

export const requestAlertVoucher = (value) => {
    return {
        type: SHOW_ALERT_VOUCHER,
        value: value
    }
}


export const getInformation = (arr0) => {
    return {
        type: GET_INFORMATON,
        info: arr0
    }
}

export const openOpenModal = (value) => {
    return {
        type: OPEN_MODAL,
        value: value
    }
}

export const offModal = (value) => {
    return {
        type: OFF_MODAL,
        value: value
    }
}



export const getApiVoucher = (voucherCode) => {
    return async (dispatch) => {
        try {
            var requestOptions = {
                method: "GET",
                redirect: "follow",
            };

            await dispatch({
                type: PENDING_VOUCHER
            })

            const responseVoucher = await fetch("http://localhost:8080/voucher/" + voucherCode, requestOptions)
            const gotVoucher = await responseVoucher.json()
            //console.log("gotVoucher", gotVoucher);

            if (gotVoucher.voucher == []) {
                return dispatch({
                    type: GET_VOUCHER_ERROR,
                })
            } else
                return dispatch({
                    type: GET_VOUCHER_SUCCESS,
                    data: gotVoucher.voucher[0]
                })



        } catch (error) {
            return dispatch({
                type: GET_VOUCHER_ERROR,
                error: error
            })
        }
    }
}



export const getArrayCart = (object) => {
    return {
        type: ADD_ARRAY_CART,
        object: object
    }
}

export const Clear = () => {
    return {
        type: CLEAR_ALL
    }
}


export const getApiProducts = () => {
    return async (dispatch) => {
        try {
            var requestOptions = {
                method: "GET",
                redirect: "follow",
            };
            const responseAllProduct = await fetch("http://localhost:8080/productFull", requestOptions)
            const AllProductsFirst = await responseAllProduct.json()
            return dispatch({
                type: PRODUCT_RECEIVED,
                data: AllProductsFirst
            })
        } catch (error) {
            return dispatch({
                error: error
            })
        }
    }
}

// export const Getloaisp = (value) => {
//     return {
//         type: GET_PHAN_KHUC,
//         loaisp: value
//     }
// }
// export const GetBrand = (valueBrand) => {
//     return {
//         type: GET_BRAND,
//         brand: valueBrand
//     }
// }

export const getMaxMinPrice = (vMax, vMin) => {
    return {
        type: GET_MAX_MIN,
        maxP: vMax,
        minP: vMin
    }
}

