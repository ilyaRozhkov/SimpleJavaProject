import React from "react";
import '../../styles/main.css';
import "bootstrap/dist/css/bootstrap.min.css"
import { Modal } from 'react-bootstrap';

export default class Toolbox extends React.Component {
    constructor(props) {
        super(props);
        this.state = { isDeleteModalOpen: false };

        this.openDeleteModal = this.openDeleteModal.bind(this);
        this.closeDeleteModal = this.closeDeleteModal.bind(this);
    }

    openDeleteModal() {
        this.setState({ isDeleteModalOpen: true });
    }

    closeDeleteModal() {
        this.setState({ isDeleteModalOpen: false });
    }

    render() {
        return (
            <section>
                <div className="tool-bar container-fluid">
                    <div className="row">
                        <div className="col-lg-10 col-md-8 col-8">
                            <div className="buttons-tool-bar">
                                <button className="btn btn-success" onClick={this.props.onCreate}>Create</button>
                                <button disabled={!this.props.rowSelected} className="btn btn-success" onClick={this.props.onEdit}>Edit</button>
                                <button disabled={!this.props.rowSelected} className="btn btn-danger" onClick={() => this.openDeleteModal()}>Delete</button>
                            </div>
                        </div>
                    </div>
                    <Modal show={this.state.isDeleteModalOpen}>
                        <Modal.Header>
                            <h5 className="pSure">Are you sure to remove this record?</h5>
                        </Modal.Header>
                        <Modal.Footer className="p-1">
                            <button className="my-1 btn btn-secondary" onClick={params => { this.props.onDelete(); this.closeDeleteModal(); }}>Yes</button>
                            <button className="my-1 btn btn-secondary" onClick={() => this.closeDeleteModal()}>No</button>
                        </Modal.Footer>
                    </Modal>
                </div>
            </section>
        );
    }
}
