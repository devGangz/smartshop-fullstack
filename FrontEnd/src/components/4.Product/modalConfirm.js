import { Button, Modal, ModalHeader, ModalBody, ModalFooter, Col } from 'reactstrap';
import { CircularProgress } from "@mui/material"
import { useDispatch, useSelector } from 'react-redux';
import { offModal, sendInformation } from '../../actions/24h.action'
import { Table } from "reactstrap";
const ConfirmModal = () => {
    const dispatch = useDispatch()
    const { showResult, alertVoucher, alertOrder, openModal, VoucherAndCustomerInfor, pendingCreateOrder, productOK2 } = useSelector((reduxData) => reduxData.ReducerOne)
    let Data = JSON.parse(localStorage.getItem('products')) || []

    const productOK = Data.reduce((acc, current) => {
        const x = acc.find(item => item.price === current.price);
        if (!x) {
            return acc.concat([current]);
        } else {
            return acc;
        }
    }, []);
    console.log("productOK2", productOK2._id);
    const clickOffModal = () => {
        dispatch(offModal(!openModal))
        if (showResult) {
            localStorage.setItem("products", JSON.stringify([]))
        }
    }

    const clickContinueModal = () => {
        dispatch(sendInformation(productOK, VoucherAndCustomerInfor))
    }

    return (
        <>  {pendingCreateOrder ? <CircularProgress /> : []}
            <Modal isOpen={openModal}>
                <ModalHeader>Product confirm</ModalHeader>
                <ModalBody>
                    <Table>
                        <thead>
                            <tr>
                                <td style={{ fontWeight: 'bold' }}>STT</td>
                                <td style={{ fontWeight: 'bold' }}>Sản phẩm</td>
                                <td style={{ fontWeight: 'bold' }}>Số lượng</td>
                                <td style={{ fontWeight: 'bold' }}>Đơn giá</td>
                                <td style={{ fontWeight: 'bold' }}>Tạm tính</td>
                            </tr>
                        </thead>
                        <tbody>
                            {productOK.map((item, index) => {
                                return <tr style={{ fontFamily: "monospace" }} key={index}>
                                    <td className='text-center'>
                                        {index + 1}.
                                    </td>
                                    <td className='text-center'>
                                        {item.model}
                                    </td>
                                    <td className='text-center'>
                                        {item.qtt}
                                    </td>
                                    <td className='text-center'>
                                        ${item.price}
                                    </td>
                                    <td className='text-center'>
                                        ${item.qtt * item.price}
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </Table>
                    <Col className='d-flex justify-content-around'>
                        <Col >
                            <p>Subtotal:</p>
                        </Col>
                        <Col className='text-end' style={{ marginRight: "20px" }}>
                            <h6>${VoucherAndCustomerInfor[0]}</h6>
                        </Col>
                    </Col>
                    <Col className='d-flex justify-content-around'>
                        <Col >
                            <p>Voucher is:</p>
                        </Col>
                        <Col className='text-end' style={{ marginRight: "20px" }}>
                            <h6>{VoucherAndCustomerInfor[1]}</h6>
                        </Col>
                    </Col>
                    <Col className='d-flex justify-content-around'>
                        <Col >
                            <p>Discount</p>
                        </Col>
                        <Col className='text-end' style={{ marginRight: "20px" }}>
                            <h6>{VoucherAndCustomerInfor[1] == "" ?
                                VoucherAndCustomerInfor[2] = 0 :
                                VoucherAndCustomerInfor[2]}</h6>
                        </Col>
                    </Col>

                    <Col className='d-flex justify-content-around'>
                        <Col >
                            <p>Paid:</p>
                        </Col>
                        <Col className='text-end' style={{ marginRight: "20px" }}>
                            <h6 style={{ color: "red" }}>${VoucherAndCustomerInfor[0] - VoucherAndCustomerInfor[0] * VoucherAndCustomerInfor[2] / 100}</h6>
                        </Col>
                    </Col>


                    <Col className='d-flex justify-content-around'>
                        <Col >
                            <p>Customer's name:</p>
                        </Col>
                        <Col className='text-end' style={{ marginRight: "20px" }}>
                            <h6>{VoucherAndCustomerInfor[4]}</h6>
                        </Col>
                    </Col>
                    <Col className='d-flex justify-content-around'>
                        <Col >
                            <p>Customer's address:</p>
                        </Col>
                        <Col className='text-end' style={{ marginRight: "20px" }}>
                            <h6>{VoucherAndCustomerInfor[5]}</h6>
                        </Col>
                    </Col>
                    <Col className='d-flex justify-content-around'>
                        <Col >
                            <p>Customer's number phone:</p>
                        </Col>
                        <Col className='text-end' style={{ marginRight: "20px" }}>
                            <h6>{VoucherAndCustomerInfor[6]}</h6>
                        </Col>
                    </Col>
                </ModalBody>
                {showResult ?
                    <Col>
                        <Col >
                            <h5 className='text-center' style={{ fontWeight: "bold" }}>Success!</h5>
                        </Col>
                        <Col className='text-center' style={{ marginRight: "20px" }}>
                            <p style={{ fontWeight: "bold" }}>Your Purchase code is:</p>
                            <h6>{productOK2._id}</h6>
                        </Col>
                    </Col>
                    : []}
                <ModalFooter>
                    <Button disabled={showResult} style={{ maxHeight: "36px", maxWidth: "90px" }} className='btn btn-info' onClick={clickContinueModal}>Continue</Button>
                    {showResult ?
                        <Button href="/" style={{ maxHeight: "36px", maxWidth: "80px" }} className='btn btn-dark' onClick={clickOffModal}>Dismiss</Button>
                        :
                        <Button style={{ maxHeight: "36px", maxWidth: "80px" }} className='btn btn-dark' onClick={clickOffModal}>Dismiss</Button>
                    }

                </ModalFooter>
            </Modal>
        </>

    )
}

export default ConfirmModal