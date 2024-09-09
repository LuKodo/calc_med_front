import logopharmaser from "../images/logo-color-pharmaser.png"

export const FooterComponent = () => {

    return (
        <footer className="is-flex is-justify-content-space-between align-items-center py-3 my-4 border-top border-warning">
            <p className="">
              Copyright © 2024 Todos los derechos reservados
            </p>
            <a
              href="#"
              className="col-md-4 is-flex is-align-items-center is-justify-content-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
            >
              <img
                className="img-responsive"
                width={150}
                src={logopharmaser}
                alt="Logo"
              />
            </a>
          </footer>
    )
}