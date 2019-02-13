import * as React from 'react';

class NoMatch extends React.Component {
    public render() {
        return (
            <div style={{
                background: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                color: 'black',
                textTransform: 'uppercase',
                height: '100%',
            }}>
                Страница отсутствует!🙄       
            </div>
        );
    }
}

export default NoMatch;