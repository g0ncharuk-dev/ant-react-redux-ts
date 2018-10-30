import * as React from 'react';
import {Table, Button, Form, Input,
    Icon, Row, Col, Cascader, Select
} from 'antd';
import _last from 'lodash/last';
import _map from 'lodash/map';

import request from '@app/utils/request';
import auth from '@app/utils/auth';
import {API, NOTIFICATION} from "@app/config/app";

import ActionDrawer from "@app/components/ActionDrawer";
import Notification from "@app/components/Notification";

const FormItem = Form.Item;
const Option = Select.Option;

const dataScheme = [
    {
        title: 'id',
        dataIndex: 'id',
        width: 60,
        sorter: (a: any, b: any) => a.id - b.id,
    },
    {
        title: 'Название',
        dataIndex: 'name',
    },
    {
        title: 'Родительский каталог',
        dataIndex: 'parent.name',
        width: 150,
    },
    {
        title: 'Уровень',
        dataIndex: 'level',
        width: 100,
    },
    {
        title: 'Обновлено',
        dataIndex: 'updated_at',
        width: 150,
    }];

class Categories extends React.Component<any, any, any> {
    public mounted: boolean;

    constructor(props: any) {
        super(props);
        this.state = {
            loading: false,
            visibleDrawer: false
        };
    }

    public componentDidMount() {
        this.mounted = true;
        this.setState({
            loading: true
        });
        this.requestGet();
        this.requestGetTree();
        this.requestGetCharacteristic();
    }

    public componentWillUnmount() {
        this.mounted = false;
    }

    public handleShowDrawer = (action: string, record: any) => {
        const form = this.props.form;
        this.setState({
            visibleDrawer: true,
            actionType: action || 'add',
            actionId: record.id
        });

        setTimeout(()=>{
            if (this.state.actionType === 'edit') {
                form.setFields({
                    name: {
                        value: record.name
                    },
                });
            }
        })
    };

    public handleClose = () => {
        this.handleResetForm();
    };

    // TODO: Submit broken
    public handleSubmit = (id: number) => {
        const form = this.props.form;
        form.validateFields((err: any, values: any) => {
            console.log(values);
            // console.log(
            //     values.parent.length,
            //     _last(values.parent)
            // );

            if (err) {
                return;
            }

            switch (this.state.actionType) {
                case 'add123':
                    return this.requestAdd({
                        'remember_token': auth.getToken(),
                        ...values
                    });
                case 'edit123':
                    return this.requestEdit({
                        'remember_token': auth.getToken(),
                        'id': id,
                        ...values
                    })
                        ;
                default:
                    return
            }

        });
    };

    public handleDelete = (id: number) => {
        this.requestDelete({
            'remember_token': auth.getToken(),
            'id': id}
        );
    };

    public handleResetForm() {
        this.setState({visibleDrawer: false});
        const form = this.props.form;
        form.resetFields();
    }

    public render() {
        const {height, form} = this.props;
        const {getFieldDecorator} = form;

        const editButton = (empty: any, record: any) => {
            return <Button type="primary"
                           onClick={this.handleShowDrawer.bind(this, 'edit', record)}
                           ghost={true}>Редактировать</Button>
        };

        const deleteButton = () => {
            return this.state.actionType === 'edit' ?
                <Button onClick={this.handleDelete.bind(this, this.state.actionId)}
                        type="danger"><Icon type="delete" theme="outlined" /></Button> : ''
        };

        const submitButton = () => {
            return <Button onClick={this.handleSubmit.bind(this, this.state.actionId)} type="primary">Отправить</Button>
        };

        const selectOption = (data:any)=>{
            return _map(data, (item:any) => {
                const valItem =
                typeof item === 'string' ? JSON.parse(item) : item;
                const valString:string = JSON.stringify({id:valItem.id,name:valItem.name});
                return <Option key={valItem.id} value={valString}>{valItem.name}</Option>
            })
        };
        const selectCharacteristic:any = selectOption(this.state.dataCharacteristic);
        const selectFilters:any = selectOption(form.getFieldValue('characteristic'));

        const formFields = () => {
            return (
                <>
                    <Form layout="vertical">
                        <Row gutter={16}>
                            <Col span={12}>
                                <FormItem label="Название">
                                    {getFieldDecorator('name', {
                                        rules: [{required: true, message: 'Пожалуйста, введите название фильтра!'}],
                                    })(<Input placeholder="Пожалуйста введите"/>)}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="Родительский каталог">
                                    {getFieldDecorator('parent', {
                                        rules: [{ type: 'array', required: true, message: 'Пожалуйста выберите каталог!' }],
                                    })(<Cascader
                                            options={this.state.dataTree}
                                            fieldNames={{ label: 'name', value: 'id', children: 'children' }}
                                            placeholder="Пожалуйста выберите"
                                            changeOnSelect={true}
                                        />
                                    )}
                                </FormItem>
                            </Col>
                        </Row>
                        <Row gutter={16}>
                            <Col span={12}>
                                <FormItem label="Все характеристики">
                                    {getFieldDecorator('characteristic', {
                                        rules: [{required: true, message: 'Пожалуйста, выберите характеристики!'}],
                                    })(<Select
                                        mode="multiple"
                                        placeholder="Пожалуйста выберите">
                                        {selectCharacteristic}
                                    </Select>)}
                                </FormItem>
                            </Col>
                            <Col span={12}>
                                <FormItem label="Фильтры">
                                    {getFieldDecorator('filters', {
                                        rules: [{required: true, message: 'Пожалуйста, выберите фильтры!'}],
                                    })(<Select
                                        mode="multiple"
                                        placeholder="Пожалуйста выберите">
                                        {selectFilters}
                                    </Select>)}
                                </FormItem>
                            </Col>
                        </Row>
                    </Form>
                    <div
                        style={{
                            position: 'absolute',
                            bottom: 0,
                            width: '100%',
                            borderTop: '1px solid #e8e8e8',
                            padding: '10px 16px',
                            display: 'flex',
                            left: 0,
                            background: '#fff',
                            borderRadius: '0 0 4px 4px',
                        }}>
                        <div style={{flex: 1}}>
                            {deleteButton()}
                        </div>
                        <Button
                            style={{marginRight: 8}}
                            onClick={this.handleClose}>
                            Отменить
                        </Button>
                        {submitButton()}
                    </div>
                </>
            )
        };

        return (
            <>
                <ActionDrawer
                    title={this.state.actionType === 'edit' ? 'Редактировать' : 'Создать'}
                    width={720}
                    visible={this.state.visibleDrawer}
                    onClose={this.handleClose}>
                    {formFields()}
                </ActionDrawer>
                <div style={{background: '#ffffff', padding: 10}}>
                    <div style={{paddingBottom: 10}}>
                        <Button type="primary" onClick={this.handleShowDrawer.bind(this, '')}>Создать</Button>
                    </div>
                    <Table
                        rowKey="id"
                        bordered={true}
                        loading={this.state.loading}
                        size={'middle'}
                        dataSource={this.state.data}
                        pagination={{pageSize: 50}}
                        scroll={{y: height - 40 - 40 - 40}}>
                        {dataScheme.map(item => <Table.Column key={item.title} {...item} />)}
                        <Table.Column
                            key="action"
                            width={140}
                            render={editButton.bind('', '')}
                        />
                    </Table>
                </div>
            </>
        );
    }

    private requestGet() {
        request.post(API.getCategory)
            .then((response) => {
                if (this.mounted) {
                    if (response.status === 200) {
                        this.setState({
                            loading: false,
                            data: response.data
                        });
                    }
                }
            }).catch((error) => {
            Notification(NOTIFICATION.getError);
            return error
        });
    }

    private requestGetTree() {
        request.post(API.getCategoryTree)
            .then((response) => {
                if (this.mounted) {
                    if (response.status === 200) {
                        this.setState({
                            loading: false,
                            dataTree: response.data
                        });
                    }
                }
            }).catch((error) => {
            Notification(NOTIFICATION.getError);
            return error
        });
    }

    private requestGetCharacteristic() {
        request.post(API.getFilters)
            .then((response) => {
                if (this.mounted) {
                    if (response.status === 200) {
                        this.setState({
                            loading: false,
                            dataCharacteristic: response.data
                        });
                    }
                }
            }).catch((error) => {
            Notification(NOTIFICATION.getError);
            return error
        });
    }

    private requestAdd(data: any) {
        request.post(API.addFilter, data)
            .then((response) => {
                if (response.status === 200) {
                    Notification(NOTIFICATION.addSuccess);
                    this.handleResetForm();
                    this.requestGet();
                }
            })
    };

    private requestEdit(data: any) {
        request.post(API.editFilter, data)
            .then((response) => {
                if (response.status === 200) {
                    Notification(NOTIFICATION.editSuccess);
                    this.handleResetForm();
                    this.requestGet();
                }
            })
    };

    private requestDelete(data: any) {
        request.post(API.deleteFilter, data)
            .then((response) => {
                if (response.status === 200) {
                    Notification(NOTIFICATION.deleteSuccess);
                    this.handleResetForm();
                    this.requestGet();
                }
            })
    };

}

export default Form.create()(Categories);