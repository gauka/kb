import React from 'react'
import './Program.css'
import TrisCode from './Programs/TrisCode/TrisCode'
import VizhCode from './Programs/VizhCode/VizhCode'
import Description from '../Description/Description'
import VerticalReplaceCode from './Programs/VerticalReplaceCode/VerticalReplaceCode'
import TableRouteReplaceCode from './Programs/TableRouteReplaceCode/TableRouteReplaceCode'
import ModularGammaEncoding from './Programs/ModularGammaEncoding/ModularGammaEncoding'
import VernamsCode from './Programs/VernamsCode/VernamsCode'
import CodeADFGVX from './Programs/CodeADFGVX/CodeADFGVX'
import CodeDESECB from './Programs/CodeDES-ECB/CodeDES-ECB'
import EuclidGcd from './Programs/EuclidGcd/EuclidGcd'
import CodeRSA from './Programs/CodeRSA/CodeRSA'
import CodeElGamal from './Programs/CodeElGamal/CodeElGamal'

class Program extends React.Component {

    render() {
        if (this.props.content) {
            let Component
            switch (this.props.content.comp) {
                case 'TrisCode':
                    Component = TrisCode
                    break;
                case 'VizhCode':
                    Component = VizhCode
                    break;
                case 'VerticalReplaceCode':
                    Component = VerticalReplaceCode
                    break;
                case 'TableRouteReplaceCode':
                    Component = TableRouteReplaceCode
                    break;
                case 'ModularGammaEncoding':
                    Component = ModularGammaEncoding
                    break;
                case 'VernamsCode':
                    Component = VernamsCode
                    break;
                case 'CodeADFGVX':
                    Component = CodeADFGVX
                    break;
                case 'CodeDES-ECB':
                    Component = CodeDESECB
                    break;
                case 'EuclidGcd':
                    Component = EuclidGcd
                    break;
                case 'CodeRSA':
                    Component = CodeRSA
                    break;
                case 'CodeElGamal':
                    Component = CodeElGamal
                    break;
                default:
                    return ('Program')
            }
            return (
                <div>
                    <Component {...this.props} />
                    <Description {...this.props} />
                </div>
            )
        }
        else return ('Program')
    }
}

export default Program;