import React, { Component } from 'react';
import Program from '../Program/Program'
import SourceCode from '../SourceCode/SourceCode'
import Ticket from '../Ticket/Ticket'
import './MainBlock.css'

class MainBlock extends React.Component {
    // state = {
    //     componentNameToUpdate: null,
    // }

    // updateMainBlock = (component) => {
    //     this.setState({ componentNameToUpdate: component })
    // }

    render() {
        if (this.props.content) {
            let Component
            switch (this.props.content.type) {
                case 'Program':
                    Component = Program
                    break;
                case 'SourceCode':
                    Component = SourceCode
                    break;
                case 'Ticket':
                    Component = Ticket
                    break;
                default:
                    return ('Hello!!!')
            }
            return (
                <div className="main-block">
                    <div className="container">
                        <div className="row">
                            <div className="col-md-12">
                                <Component {...this.props} updateMainBlock={this.props.updateMainBlock}/>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
        else return (
            'Hello!!!'
        )
    }
}

export default MainBlock