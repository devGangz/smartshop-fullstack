import { Col } from "reactstrap"
import '@fortawesome/fontawesome-free/css/all.min.css';
import Logo from '../1.Header/Logo'

function Socials() {
    return (
        <Col className="border">
            <Col className='d-flex justify-content-around mx-auto'>
                <Logo className="text-center border" ></Logo>
            </Col>

            <Col sm={2} className="d-flex justify-content-around mx-auto mt-5">
                <i className="fab fa-facebook fa-xl"></i>  &nbsp;&nbsp;
                <i className="fab fa-instagram-square fa-xl"></i> &nbsp;&nbsp;
                <i className="fab fa-youtube fa-xl"></i> &nbsp;&nbsp;
                <i className="fab fa-twitter-square fa-xl"></i>
            </Col>
        </Col>

    )
}


export default Socials