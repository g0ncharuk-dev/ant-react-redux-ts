import {notification} from "antd";

export default (config:any) => {
    const notificationType = config.type;
    notification[notificationType](config);
}