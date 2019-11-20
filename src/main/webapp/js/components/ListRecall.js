import React, { Component } from 'react';
import { AgGridReact } from 'ag-grid-react';
import APIService from "../APIService";

import BasicModal from './BasicModal';
import Dropdown from 'react-dropdown';
import { Container } from 'react-bootstrap';

import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';
import "bootstrap/dist/css/bootstrap.min.css";
import 'react-datepicker/dist/react-datepicker.min.css';
import '../../styles/main.css';
import ToolBox from "./ToolBox";

const RECALL_API_URL = '/simple/recall';

class ListRecall extends Component{

    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [
                {
                    headerName: "Recall",
                    children: [
                        {headerName: 'Id', field: 'id', sort : "asc"},
                        {headerName: 'Datevisite', field: 'datevisite'},
                        {headerName: 'Rating', field: 'rating'},
                        {headerName: 'Description', field: 'description'}
                    ]
                }
                ],
            rowSelection: "single",
            rowData: [],
            isAddModalOpen: false,
            isEditModalOpen: false,
            rowSelected: false,

            id : null,
            datevisite : "",
            rating : "",
            description : 0,
        };
        this.reloadList = this.reloadList.bind(this);
        this.openAddRecordModal = this.openAddRecordModal.bind(this);
        this.openEditRecordModal = this.openEditRecordModal.bind(this);
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridApi.sizeColumnsToFit();
    };

    reloadList(){
        APIService.getAll(RECALL_API_URL)
            .then(result => result.json())
            .then(rowData => this.setState({rowData}))
    };

    componentDidMount() {
        this.reloadList();
    };

    delete = params =>
    {
        var data = this.getSelectRowData();
        APIService.delete(RECALL_API_URL,data.id)
            .then(this.reloadList);
    };

    create = params =>
    {
        var data = this.fillData();
        APIService.save(RECALL_API_URL,data)
            .then(this.reloadList);
        this.clearState();
        this.closeModal();
    };

    put = params =>
    {
        var data = this.fillData();
        APIService.put(RECALL_API_URL,data)
            .then(this.reloadList);
        this.clearState();
        this.closeModal();
    };

    fillData()
    {
        var data = {
            id : null,
            datevisite : "",
            rating : "",
            description : "",
        };

        data['id'] = this.state.id;
        data['datevisite'] = this.state.datevisite;
        data['rating'] = this.state.rating;
        data['description'] = this.state.description;
        return data;
    }

    getSelectRowData()
    {
        const selectRows = this.gridApi.getSelectedNodes();
        const data = selectRows.map(row => row.data);
        return data[0];
    }

    clearState()
    {
        this.setState({id: null});
        this.setState({datevisite : null});
        this.setState({rating : null});
        this.setState({description : null});
    }

    openAddRecordModal() {
        this.clearState();
        this.setState({ isAddModalOpen: true });
    }

    openEditRecordModal() {
        const data = this.getSelectRowData();

        if(!data) {
            return;
        }

        this.setState({id: data['id']});
        this.setState({datevisite : data['datevisite']});
        this.setState({rating : data['rating']});
        this.setState({description : data['description']});

        this.setState({ isEditModalOpen: true });
    }

    closeModal() {
        this.setState({ isAddModalOpen: false });
        this.setState({ isEditModalOpen: false });
        this.clearState();
    }

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

    render() {
        return (
            <div className="col-lg-10 col-md-8 col-8 list">
                <BasicModal
                    isOpen={this.state.isAddModalOpen || this.state.isEditModalOpen}
                    onClose={() => this.closeModal()}
                    onSubmit={this.checkModal}
                    title="Condition sets">{
                    <Container>
                        <div className="form-group row">
                            <div className="col-5 nec">Code:</div>
                            <div className="col-7">
                                <input
                                    className="form-control form-input"
                                    name="name"
                                    value={this.state.datevisite}
                                    onChange={this.updateInput}
                                    maxLength="16"
                                    required
                                />
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-5">Description:</div>
                            <div className="col-7">
                                <input
                                    type="text"
                                    className="form-control form-input"
                                    name="surname"
                                    value={this.state.rating}
                                    onChange={this.updateInput}
                                    maxLength="512"
                                />
                            </div>
                        </div>

                        <div className="form-group row">
                            <div className="col-5">Description:</div>
                            <div className="col-7">
                                <input
                                    type="text"
                                    className="form-control form-input"
                                    name="email"
                                    value={this.state.description}
                                    onChange={this.updateInput}
                                    maxLength="512"
                                />
                            </div>
                        </div>
                    </Container>
                }
                </BasicModal>

                <div
                    id="myGrid"
                    className="ag-theme-balham">
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

export default ListRecall;