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
    GET_ORDER_SUCCESS,
    PENDING_ORDER,
    GET_ORDER_ERROR,
    SHOW_ALERT_VOUCHER,
    RESET_CART,
    SEND_USER_TO_SERVER,
    GET_SL_GIO_HANG,
    PRODUCT_RECEIVED_SEARCH

} from '../constants/24h.constant'


const initialState = {
    AllProducts: [],
    callApiSuccess: false,
    MaxPrice: 0,
    MinPrice: 0,
    WhatBrand: "",
    ProductOrigin: [],
    ProductResult: [],
    phanKhuc: null,
    brand: null,
    ProductEx: [],

    getMaxPrice: 0,
    getMinPrice: 0,
    CartArr: [],
    exA: {},

    pending: null,
    voucherIs: "",
    error2: null,
    error3: null,
    validOK: false,
    openModal: false,

    VoucherAndCustomerInfor: [],
    pendingCreateOrder: false,
    alertOrder: false,
    productOK2: {},
    showResult: false,
    reset: false,
    resetCart: false,
    useGG: null,
    datHangThanhCong: false,
    nIncart: 0,
    listProductSearch: [],
    SearchOK: false
}



const ReducerOne = (state = initialState, action) => {

    switch (action.type) {
        case PRODUCT_RECEIVED_SEARCH:
            state.SearchOK = true
            //console.log("1", state.listProductSearch);
            state.listProductSearch = action.dataSearch
            console.log("2", state.listProductSearch);
            break

        case GET_SL_GIO_HANG:
            state.nIncart = action.data
            break

        case SEND_USER_TO_SERVER:
            state.useGG = action.data
            break

        case RESET_CART:
            state.resetCart = !state.resetCart
            break

        case SHOW_ALERT_VOUCHER:
            state.alertOrder = true
            break

        case GET_ORDER_SUCCESS:
            state.pendingCreateOrder = false;
            //state.openModal = false;
            state.productOK2 = action.data;
            state.showResult = true;
            state.datHangThanhCong = true
            break

        case PENDING_ORDER:
            state.pendingCreateOrder = true
            state.openModal = false
            break

        case GET_INFORMATON:
            state.VoucherAndCustomerInfor = action.info
            break
        case OFF_MODAL:
            state.openModal = action.value;
            break
        case OPEN_MODAL:
            state.openModal = action.value;
            if (state.openModal = true) {
                //state.error2 = false;
                state.alertOrder = false;
            }
            break

        case GET_VOUCHER_ERROR:
            state.error2 = true;
            // state.pending = false;
            state.validOK = false
            break
        case GET_ORDER_ERROR:
            break
        case GET_VOUCHER_SUCCESS:
            state.pending = false;
            state.voucherIs = action.data
            state.validOK = true
            state.error2 = false;
            break

        case PENDING_VOUCHER:
            state.pending = true;
            break

        case ADD_ARRAY_CART:
            state.exA = action.object
            state.CartArr.push(state.exA)
            break


        case GET_MAX_MIN:
            state.getMaxPrice = action.maxP
            state.getMinPrice = action.minP
            state.ProductResult = state.ProductResult
                .filter(item => state.getMinPrice <= item.buyPrice * 0.7 && item.buyPrice * 0.7 <= state.getMaxPrice)
            break

        case GET_PHAN_KHUC:
            state.phanKhuc = action.phanKhuc


            break;

        case GET_BRAND:
            state.brand = action.brand

            break;
        case PRODUCT_RECEIVED:
            state.AllProducts = action.data;
            state.callApiSuccess = true
            state.ProductOrigin = state.AllProducts.allProducts.sort((a, b) => b.buyPrice * 0.7 - a.buyPrice * 0.7)
            state.ProductResult = state.ProductOrigin
            state.MinPrice = Math.ceil(state.ProductOrigin[state.ProductResult.length - 1].buyPrice * 0.7)
            state.MaxPrice = Math.ceil(state.ProductOrigin[0].buyPrice * 0.7)
            break;

        case CLEAR_ALL:
            state.ProductOrigin = state.AllProducts.allProducts.sort((a, b) => a.buyPrice * 0.7 - b.buyPrice * 0.7)
            state.ProductResult = state.ProductOrigin
            state.MinPrice = Math.ceil(state.ProductOrigin[state.ProductResult.length - 1].buyPrice * 0.7)
            state.MaxPrice = Math.ceil(state.ProductOrigin[0].buyPrice * 0.7)
            state.checkPriceInp = false
            state.phanKhuc = null;
            state.brand = null
            break;

        default:
            break;
    }
    return { ...state }
}

export default ReducerOne