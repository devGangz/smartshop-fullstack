import { Col } from "reactstrap"
import i1 from '../../Images/icon1.png'
function Logo() {
    return (
        <Col sm={1} xs={2} style={{ height: "60px", marginRight: "155px" }} className='header2 header7'>
            <a href='/'><img src={i1} className="mt-2" width="100%" style={{ marginLeft: "300px" }}></img></a>
        </Col >
    )
}


export default Logo