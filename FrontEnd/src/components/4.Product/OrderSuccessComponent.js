import { Container, Col } from "reactstrap"



const OrderSuccessComponent = () => {
    return (
        <>
            <Container style={{ marginBottom: "497px", marginTop: "150px", scroll: "no" }}>
                <Col id="trangthanhtoanMobile">
                    <Col className="mx-auto mb-4">
                        <i className="far fa-check-square fa-lg"></i>
                    </Col>
                    <Col className="mx-auto" >
                        <h5 style={{ fontFamily: "Montserrat" }}>Cảm ơn bạn đã đặt hàng, chúng tôi sẽ liên hệ trong thời gian sớm nhất</h5>
                    </Col>
                </Col>
            </Container>
        </>
    )
}

export default OrderSuccessComponent