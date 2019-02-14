import * as React from 'react';
import { Table, Button, Form, Input, Icon, Modal } from 'antd';

import request from '@app/utils/request';
import jsonToForm from '@app/utils/formdata';
import auth from '@app/utils/localStorage';
import { API, NOTIFICATION } from "@app/config/app";

import ActionDrawer from "@app/components/ActionDrawer";
import Notification from "@app/components/Notification";

const FormItem = Form.Item;
const Confirm = Modal.confirm;

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
        title: 'Ключ',
        dataIndex: 'translit',
        width: 150,
    },
    {
        title: 'Обновлено',
        dataIndex: 'updated_at',
        width: 150,
    }];

class Filters extends React.Component<any, any, any> {
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

        setTimeout(() => {
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

    public handleSubmit = (id: number) => {
        const form = this.props.form;
        form.validateFields((err: any, values: any) => {
            if (err) {
                return;
            }          

            switch (this.state.actionType) {
                case 'add':
                    return this.requestAdd(jsonToForm.transform({
                        'remember_token': auth.getToken(),
                        ...values
                    }));
                case 'edit':
                    return this.requestEdit(jsonToForm.transform({
                        'remember_token': auth.getToken(),
                        'id': id,
                        ...values
                    }));
                default:
                    return
            }

        });
    };

    public handleDelete = (id: number) => {
        const deleteItem = () => {
            this.requestDelete({
                'remember_token': auth.getToken(),
                'id': id
            });
        }
        Confirm({
            title: 'Вы уверены что хотите удалить?',
            okText: 'Да',
            okType: 'danger',
            cancelText: 'Нет',
            onOk() {
                deleteItem();
            }
        });

    };

    public handleResetForm() {
        this.setState({ visibleDrawer: false });
        const form = this.props.form;
        form.resetFields();
    }

    public render() {
        const { height, form } = this.props;
        const { getFieldDecorator } = form;

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

        const formFields = () => {
            return (
                <>
                    <Form layout="vertical">
                        <FormItem label="Название">
                            {getFieldDecorator('name', {
                                rules: [{ required: true, message: 'Пожалуйста, введите название фильтра!' }],
                            })(
                                <Input />
                            )}
                        </FormItem>
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
                        <div style={{ flex: 1 }}>
                            {deleteButton()}
                        </div>
                        <Button
                            style={{ marginRight: 8 }}
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
                    width={320}
                    visible={this.state.visibleDrawer}
                    onClose={this.handleClose}>
                    {formFields()}
                </ActionDrawer>
                <div style={{ background: '#fff', padding: 10 }}>
                    <div style={{ paddingBottom: 10 }}>
                        <Button type="primary" onClick={this.handleShowDrawer.bind(this, '')}>Создать</Button>
                    </div>
                    <Table
                        rowKey="id"
                        bordered={true}
                        loading={this.state.loading}
                        size={'middle'}
                        dataSource={this.state.data}
                        pagination={{ pageSize: 50 }}
                        scroll={{ y: height - 160 }}>
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
        request.post(API.getFilters)
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

export default Form.create()(Filters);