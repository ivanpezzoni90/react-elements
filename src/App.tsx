import React from 'react';
import styled from 'styled-components';
import './App.css';
import IEComponent from './components/InterfaceElementsComponent';

const AppComponent = styled.div`
    text-align: left;
    overflow: hidden;
`;

function App() {
    return (
        <AppComponent>
            <IEComponent />
        </AppComponent>
    );
}

export default App;
