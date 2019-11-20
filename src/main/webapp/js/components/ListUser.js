import React from 'react';
import { AgGridReact } from 'ag-grid-react';
import { Container } from 'react-bootstrap';
import APIService from "../APIService";
import BasicModal from './BasicModal';
import ToolBox from './ToolBox';

import 'ag-grid/dist/styles/ag-grid.css';
import 'ag-grid/dist/styles/ag-theme-balham.css';
import "bootstrap/dist/css/bootstrap.min.css";

import '../../styles/main.css';

const USER_API_URL = '/simple/user';

class ListUser extends React.Component{
    constructor(props) {
        super(props);
        this.state = {
            columnDefs: [
                {
                    headerName: "User",
                    children: [
                        {headerName: 'Id', field: 'id', sort : "asc"},
                        {headerName: 'Name', field: 'name'},
                        {headerName: 'Surname', field: 'surname'},
                        {headerName: 'Email', field: 'email'},
                        {headerName: 'Dateofbirthday', field: 'dateofbirthday'},
                        {headerName: 'Sex', field: 'sex'}
                    ]
                }
            ],
            rowSelection: "single",
            rowData: [],
            isAddModalOpen: false,
            isEditModalOpen: false,
            rowSelected: false,

            id : null,
            name : "",
            surname : "",
            email : "",
            dateofbirthday : "",
            code : "",
            sex : ""
        };
        this.updateInput = this.updateInput.bind(this);
        this.reloadList = this.reloadList.bind(this);
        this.openAddRecordModal = this.openAddRecordModal.bind(this);
        this.openEditRecordModal = this.openEditRecordModal.bind(this);
    }

    onGridReady = params => {
        this.gridApi = params.api;
        this.gridApi.sizeColumnsToFit();
    };

    reloadList(){
        APIService.getAll(USER_API_URL)
            .then(result => result.json())
            .then(rowData => this.setState({rowData}))
    };

    componentDidMount() {
        this.reloadList();
    };

    delete = params =>
    {
        var data = this.getSelectRowData();
        APIService.delete(USER_API_URL,data.id)
            .then(this.reloadList);
    };

    create = params =>
    {
        var data = this.fillData();
        APIService.save(USER_API_URL,data)
            .then(this.reloadList);
        this.clearState();
        this.closeModal();
    };

    put = params =>
    {
        var data = this.fillData();
        APIService.put(USER_API_URL,data)
            .then(this.reloadList);
        this.clearState();
        this.closeModal();
    };

    fillData()
    {
        var data = {
            id : null,
            name : "",
            surname : "",
            email : "",
            dateofbirthday : "",
            sex : ""
        };
        data['id'] = this.state.id;
        data['name'] = this.state.name;
        data['surname'] = this.state.surname;
        data['email'] = this.state.email;
        data['dateofbirthday'] = this.state.dateofbirthday;
        data['sex'] = this.state.sex;
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
        this.setState({id: 0});
        this.setState({name : ""});
        this.setState({surname : ""});
        this.setState({email : ""});
        this.setState({dateofbirthday : ""});
        this.setState({sex : ""});
    }

    openAddRecordModal() {
        this.clearState();
        this.setState({isAddModalOpen: true});
    }

    openEditRecordModal() {
        const data = this.getSelectRowData();

        if(!data) {
            return;
        }

        this.setState({id: data['id']});
        this.setState({name : data['name']});
        this.setState({surname : data['surname']});
        this.setState({email : data['email']});
        this.setState({dateofbirthday : data['dateofbirthday']});
        this.setState({sex : data['sex']});

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

    render(){

        return(<div className="col-lg-10 col-md-8 col-8 list">
            <BasicModal
                isOpen={this.state.isAddModalOpen || this.state.isEditModalOpen}
                onClose={() => this.closeModal()}
                onSubmit={this.checkModal}
                title="Bank operation codes"
            >{
                <Container>
                    <div className="form-group row">
                        <div className="col-5 nec">Code:</div>
                        <div className="col-7">
                            <input
                                className="form-control form-input"
                                name="name"
                                value={this.state.name}
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
                                value={this.state.surname}
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
                                value={this.state.email}
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
                                name="dateofbirthday"
                                value={this.state.dateofbirthday}
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
                                name="sex"
                                value={this.state.sex}
                                onChange={this.updateInput}
                                maxLength="512"
                            />
                        </div>
                    </div>

                </Container>
            }</BasicModal>

            <div
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
        </div>);
    }

}

export default ListUser;
