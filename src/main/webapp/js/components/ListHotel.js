import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import APIService from "../APIService";
import DatePicker from "react-datepicker";
import { Modal, Container, Row } from 'react-bootstrap';

import BasicModal from './BasicModal';
import Dropdown from 'react-dropdown';

import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-datepicker/dist/react-datepicker.min.css';
import '../../styles/main.css';
import ToolBox from "./ToolBox";

const HOTEL_API_URL = '/simple/hotel';

class ListHotel extends Component{
    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [
                {
                    headerName: "Hotel",
                    children: [
                        {headerName: 'Id', field: 'id', sort : "asc"},
                        {headerName: 'Name', field: 'name'},
                        {headerName: 'Shortname', field: 'shortname'},
                        {headerName: 'Country', field: 'country'},
                        {headerName: 'City', field: 'city'},
                        {headerName: 'Rating', field: 'rating'},
                        {headerName: 'Site', field: 'site'}
                    ]
                }
            ],
            rowSelection: "single",
            rowData: [],
            isAddModalOpen: false,
            isEditModalOpen: false,
            rowSelected: false,
            
            id : null,
            name : null,
            shortname : null,
            country: null,
            city : "",
            rating : "",
            site : "",
        };

        this.updateInput = this.updateInput.bind(this);
        this.reloadList = this.reloadList.bind(this);
        this.openAddRecordModal = this.openAddRecordModal.bind(this);
        this.openEditRecordModal = this.openEditRecordModal.bind(this);
    }

    onGridReady = params => {
        this.gridApi = params.api;
    };

    reloadList(){
        APIService.getAll(HOTEL_API_URL)
            .then(result => result.json())
            .then(rowData => this.setState({rowData}))
    };

    componentDidMount() {
        this.reloadList();
    };

    delete = params =>
    {
        var data = this.getSelectRowData();
        APIService.delete(HOTEL_API_URL,data.id)
            .then(this.reloadList);
    };

    create = params =>
    {
        var data = this.fillData();
        APIService.save(HOTEL_API_URL,data)
            .then(this.reloadList);
        this.clearState();
        this.closeModal();
    };

    put = params =>
    {
        var data = this.fillData();
        APIService.put(HOTEL_API_URL,data)
            .then(this.reloadList);
        this.clearState();
        this.closeModal();
    };

    checkModal = params =>
    {
        params.preventDefault();
        if(this.state.isAddModalOpen === true)
        {
            this.create(params);
        }
        if( this.state.isEditModalOpen === true)
        {
            this.put(params);
        }
    };

    fillData()
    {
        var data = {};
        data['id'] = this.state.id;
        data['name'] = this.state.name;
        data['shortname'] = this.state.shortname;
        data['country'] = this.state.country;
        data['city'] = this.state.city ;
        data['rating'] = this.state.rating ;
        data['site'] = this.state.site ;
        return data;
    }

    updateInput(event){
        if(event.target.value) {
            this.setState({[event.target.name] : event.target.value});
        } else {
            this.setState({[event.target.name]: ""});
        }
    }


    getSelectRowData()
    {
        const selectRows = this.gridApi.getSelectedNodes();
        const data = selectRows.map(row => row.data);
        return data[0];
    }

    clearState()
    {
        this.setState({id : null});
        this.setState({name : null});
        this.setState({shortname : null});
        this.setState({country: null});
        this.setState({city : ""});
        this.setState({rating : ""});
        this.setState({site : ""});

    }

    openAddRecordModal() {
        this.clearState();
        this.setState({ isAddModalOpen: true });
    }

    openEditRecordModal()
    {
        const data = this.getSelectRowData();

        if(!data) {
            return;
        }

        this.setState({id : data['id']});
        this.setState({name : data['name']});
        this.setState({shortname : data['shortname']});
        this.setState({country : data['country']});
        this.setState({city : data['city']});
        this.setState({rating : data['rating']});
        this.setState({site : data['site']});

        this.setState({ isEditModalOpen: true });
    }

    closeModal() {
        this.setState({ isAddModalOpen: false });
        this.setState({ isEditModalOpen: false });
        this.clearState();
    }

    render() {
        return (
            <div className="col-lg-10 col-md-8 col-8 list">
                <BasicModal
                    isOpen={this.state.isAddModalOpen || this.state.isEditModalOpen}
                    onClose={() => this.closeModal()}
                    onSubmit={params => this.checkModal(params)}
                    title="Conditions"
                    dialogClassName="modal-95w">
                    <Container>
                        <div className="bord">
                            <span>General information</span>
                        </div>

                        <div className="row">
                            <div className="form-group form-row col-lg-3 col-6">
                                <div className="nec col-5">Code:</div>
                                <div className="col-7">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="name"
                                        value={this.state.name}
                                        onChange={this.updateInput}
                                        maxLength="32"
                                    />
                                </div>
                            </div>
                            <div className="form-group form-row col-lg-3 col-6">
                                <div className="col-5">Short name:</div>
                                <div className="col-7">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="shortName"
                                        value={this.state.shortname}
                                        onChange={this.updateInput}
                                        maxLength="128"
                                    />
                                </div>
                            </div>
                            <div className="form-group form-row col-lg-3 col-6">
                                <div className="col-5 nec">Name:</div>
                                <div className="col-7">
                                    <input type="text"
                                           className="form-control"
                                           name="country"
                                           value={this.state.country}
                                           onChange={this.updateInput}
                                           maxLength="256"
                                           required
                                    />
                                </div>
                            </div>
                            <div className="form-group form-row col-lg-3 col-6">
                                <div className="col-5">Description:</div>
                                <div className="col-7">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="city"
                                        value={this.state.city}
                                        onChange={this.updateInput}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="row">
                            <div className="form-group form-row col-lg-3 col-6">
                                <div className="col-5 nec">Status:</div>
                                <div className="col-7">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="rating"
                                        value={this.state.rating}
                                        onChange={this.updateInput}
                                    />
                                </div>
                            </div>
                            <div className="form-group form-row col-lg-3 col-6">
                                <div className="col-5">Payment type:</div>
                                <div className="col-7">
                                    <input
                                        type="text"
                                        className="form-control"
                                        name="site"
                                        value={this.state.site}
                                        onChange={this.updateInput}
                                    />
                                </div>
                            </div>
                        </div>

                    </Container>
                </BasicModal>

                <div
                    id="myGrid"
                    className="ag-theme-balham"
                >
                    <ToolBox
                        onCreate={this.openAddRecordModal}
                        onEdit={this.openEditRecordModal}
                        onDelete={this.delete}
                        rowSelected={this.state.rowSelected}/>
                    <AgGridReact
                        enableFilter={true}
                        columnDefs={this.state.columnDefs}
                        rowData={this.state.rowData}
                        pagination={true}
                        onRowDoubleClicked={() => this.openEditRecordModal()}
                        onGridReady={ this.onGridReady}
                        rowSelection="single"
                        onSelectionChanged={() => { this.setState({rowSelected: this.getSelectRowData() != null}); }}
                        onRowDataChanged={() => {this.setState({rowSelected: false});}}
                    />
                </div>
            </div>
        );
    }
}

export default ListHotel;