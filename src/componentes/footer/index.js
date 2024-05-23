import React from "react";
import "./styles.css";

function Footer() {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="footer">
            <p>&copy; {currentYear} RenovAção</p>
            <p>Todos os direitos reservados.</p>
            <p>Material de propriedade do projeto RenovAção.</p>
        </footer>
    );
}

export default Footer;