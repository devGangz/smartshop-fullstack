import 'bootstrap/dist/css/bootstrap.min.css'
import * as mdb from 'mdb-ui-kit'; // lib

const CarouselDetail = (item) => {
    return (
        <div id="carouselMDExample" className="carousel slide carousel-fade mt-3" xs={12} data-mdb-ride="carousel" >
            <div className="carousel-inner mb-5 shadow-1-strong rounded-3">
                <div className="carousel-item active">
                    <img src={item.imgA} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src={item.imgB} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src={item.imgC} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src={item.imgD} className="d-block w-100" alt="..." />
                </div>
                <div className="carousel-item">
                    <img src={item.imgE} className="d-block w-100" alt="..." />
                </div>
            </div>

            <button className="carousel-control-prev" type="button" data-mdb-target="#carouselMDExample"
                data-mdb-slide="prev">
                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Previous</span>
            </button>
            <button className="carousel-control-next" type="button" data-mdb-target="#carouselMDExample"
                data-mdb-slide="next">
                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                <span className="visually-hidden">Next</span>
            </button>

            <div className="carousel-indicators" style={{ marginBottom: "-50px" }}>
                <button type="button" data-mdb-target="#carouselMDExample" data-mdb-slide-to="0" aria-label="Slide 1"
                    className="active" aria-current="true" style={{ width: "100px", border: "none", background: "none" }}>
                    <img className="d-block w-100 shadow-1-strong rounded img-fluid"
                        src={item.imgA}   ></img>
                </button>

                <button type="button" data-mdb-target="#carouselMDExample" data-mdb-slide-to="1" aria-label="Slide 2"
                    style={{ width: "100px", border: "none", background: "none" }}>
                    <img className="d-block w-100 shadow-1-strong rounded img-fluid"
                        src={item.imgB}   ></img>
                </button>

                <button type="button" data-mdb-target="#carouselMDExample" data-mdb-slide-to="2" aria-label="Slide 2"
                    style={{ width: "100px", border: "none", background: "none" }}>
                    <img className="d-block w-100 shadow-1-strong rounded img-fluid"
                        src={item.imgC} ></img>
                </button>

                <button type="button" data-mdb-target="#carouselMDExample" data-mdb-slide-to="3" aria-label="Slide 3"
                    style={{ width: "100px", border: "none", background: "none" }}>
                    <img className="d-block w-100 shadow-1-strong rounded img-fluid"
                        src={item.imgD} ></img>
                </button>

                <button type="button" data-mdb-target="#carouselMDExample" data-mdb-slide-to="4" aria-label="Slide 4"
                    style={{ width: "100px", border: "none", background: "none" }}>
                    <img className="d-block w-100 shadow-1-strong rounded img-fluid"
                        src={item.imgE} ></img>
                </button>
            </div>
        </div>
    )
}

export default CarouselDetail