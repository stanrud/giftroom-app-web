import React from 'react';
import { Row, Col } from 'reactstrap';

const Footer = () => (
  <footer className="mt-5">
    <Row>
      <Col sm="12" className="text-right pt-3">
        <p>
          More details on the <a target="_blank" rel="noopener noreferrer" href="https://github.com/stanrud/giftroom-app-web">Github Repo</a> &nbsp; | &nbsp; Developed by <a target="_blank" rel="noopener noreferrer" href="http://stanrud.com">Stan Rud</a>.
        </p>
      </Col>
    </Row>
  </footer>
);

export default Footer;
