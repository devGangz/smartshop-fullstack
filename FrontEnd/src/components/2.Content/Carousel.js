import Carousel from 'react-bootstrap/Carousel';
import { Row, Col, Button, Container } from "reactstrap"
import Form from 'react-bootstrap/Form'
import a1 from '../../Images/slide/a1.jpg'


function CarouselComponent() {
    return (
        <Carousel className='' style={{ maxWidth: "100%", marginTop: "90px" }}>
            <Carousel.Item >
                <img
                    className="d-block mx-auto carouselAirPad carouselIphone"
                    src="https://cdn.tgdd.vn/2023/04/banner/MacBook-Air-M1-2880-800-1920x533.png"
                    alt="1"
                />
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block  mx-auto carouselAirPad carouselIphone"
                    src="https://cdn.tgdd.vn/2023/05/banner/2880-800-1920x533.png"
                    alt="2"
                />
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block   mx-auto carouselAirPad carouselIphone"
                    src="https://cdn.tgdd.vn/2023/04/banner/iPad-102880-800-1920x533.png"
                    alt="3"
                />
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block  mx-auto carouselAirPad carouselIphone"
                    src="https://cdn.tgdd.vn/2023/04/banner/AW-S8-2880-800-1920x533.png"
                    alt="4"
                />
            </Carousel.Item>

            <Carousel.Item>
                <img
                    className="d-block mx-auto carouselAirPad carouselIphone"
                    src="https://cdn.tgdd.vn/2023/04/banner/GTN2880-800-1920x533.png"
                    alt="5"
                />
            </Carousel.Item>
        </Carousel>
    );
}

export default CarouselComponent;