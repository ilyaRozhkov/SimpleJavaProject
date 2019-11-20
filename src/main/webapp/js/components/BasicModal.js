import React from "react";
import {Modal} from "react-bootstrap";

export default class BasicModal extends React.Component {
    render() {
        return (
            <Modal show={this.props.isOpen} size={this.props.size == null ? "" : this.props.size} dialogClassName={this.props.dialogClassName == null ? "" : this.props.dialogClassName}>
                <form role="form" onSubmit={this.props.onSubmit}>
                    <Modal.Header>
                        <Modal.Title>{this.props.title}</Modal.Title>
                        <button type="button" className="btn-x btn btn-danger" onClick={this.props.onClose}>X</button>
                    </Modal.Header>
                    <Modal.Body>
                        {this.props.children}
                    </Modal.Body>
                    <Modal.Footer>
                        <button className="btn btn-primary" type="submit">Save</button>
                        <button className="btn btn-secondary" type="button" onClick={this.props.onClose}>Close</button>
                    </Modal.Footer>
                </form>
            </Modal>
        );
    }
}