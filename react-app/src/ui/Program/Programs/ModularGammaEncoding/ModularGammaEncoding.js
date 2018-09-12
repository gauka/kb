import React from 'react'
import './ModularGammaEncoding.css'
import { getCryptoResult } from '../../../../math_logic/ModularGammaEncoding/modular_gamma_code_math'
import { copyText } from '../../../../ui/utils/textUI'

class FormGroupBlock extends React.Component {
    state = {
        message: 'кафедра систем информатики',
        key: 'символ',
        isCoding: true,
    }

    render() {
        return (<div className="tris-code">
            <form>
                <div className="form-group">
                    <label>Сообщение</label>
                    <textarea
                        className="form-control"
                        defaultValue={this.state.message}
                        onChange={(e) => { this.setState({ message: e.currentTarget.value }) }}
                    />
                </div>
                <div className="form-group">
                    <label>Гамма</label>
                    <input
                        type="text"
                        className="form-control"
                        defaultValue={this.state.key}
                        onChange={(e) => { this.setState({ key: e.currentTarget.value }) }}
                    />
                </div>
                <div className="custom-control custom-radio">
                    <input
                        type="radio"
                        className="custom-control-input"
                        id="defaultGroupExample1"
                        name="groupOfDefaultRadios"
                        defaultChecked={this.state.isCoding}
                        onClick={() => { this.setState({ isCoding: true }) }}
                    />
                    <label className="custom-control-label" htmlFor="defaultGroupExample1">Зашифровать сообщение</label>
                </div>
                <div className="custom-control custom-radio">
                    <input
                        type="radio"
                        className="custom-control-input"
                        id="defaultGroupExample2"
                        name="groupOfDefaultRadios"
                        defaultChecked={!this.state.isCoding}
                        onClick={() => { this.setState({ isCoding: false }) }}
                    />
                    <label className="custom-control-label" htmlFor="defaultGroupExample2">Расшифровать сообщение</label>
                </div>
                <br />
                <button className="btn btn-primary" onClick={(e) => { this.props.calc(this.state.key, this.state.message, this.state.isCoding, e) }}>
                    {this.state.isCoding ? 'Зашифровать сообщение' : 'Расшифровать сообщение'}
                </button>
            </form>
        </div>)
    }
}

const ResultBlock = ({ codeMessage, cryptoMatrix, isCoding, formattedKey}) => (
    <div className="tris-code result">
        <div className="container">
            <div className="row">
                <div className="col-md-7 col-xs-12">
                    {cryptoMatrix && cryptoMatrix.length > 0 &&
                        <div className="table-responsive">
                            <h5>Шифрующая таблица</h5>
                            <table className="table table-bordered">
                                <tbody>
                                    {cryptoMatrix.map((row, indexRow) =>
                                        <tr key={indexRow}>
                                            {row.map((item, index) =>
                                                <td
                                                    key={index}
                                                    className={index === 0 ? 'first' : ''}
                                                >
                                                    {item}
                                                </td>
                                            )}
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
                <div className="col-md-5 col-xs-12">
                    {codeMessage && formattedKey &&
                        <div className="code-block">
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12 col-xs-12" >
                                        <h6>{isCoding ? 'Зашифрованное сообщение:' : 'Расшифрованное сообщение:'}</h6>
                                        <p>{codeMessage}
                                            <i 
                                                className="fa fa-clone copy-message" 
                                                onClick={() => copyText(codeMessage)}
                                                data-toggle="tooltip"
                                                data-html="true"
                                                title="Копировать"
                                            ></i>
                                        </p>
                                    </div>
                                </div>
                            </div>
                            <div className="container">
                                <div className="row">
                                    <div className="col-md-12 col-xs-12" >
                                        <h6>Форматированный ключ:</h6>
                                        <p>{formattedKey}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>
        </div>
    </div>
)

class ModularGammaEncoding extends React.Component {
    state = {
        codeMessage: '',
        cryptoMatrix: null,
        isCoding: null,
        formattedKey: '',
    }

    calc = (key, message, _isCoding, e) => {
        e.preventDefault()
        const result = getCryptoResult(message, key, _isCoding)
        this.setState({ codeMessage: result.codeMessage })
        this.setState({ cryptoMatrix: result.cryptoMatrix })
        this.setState({ isCoding: _isCoding })
        this.setState({ formattedKey: result.formattedKey })
        this.setTableView(result.cryptoMatrix, _isCoding)
    }

    setTableView = (_cryptoMatrix, _isCoding) => {
        let cryptoMatrix = _cryptoMatrix
        if (_isCoding) {
            cryptoMatrix[0].unshift('T')
            cryptoMatrix[1].unshift('G')
            cryptoMatrix[2].unshift('T')
            cryptoMatrix[3].unshift('G')
            cryptoMatrix[4].unshift('T+G')
            cryptoMatrix[5].unshift('mod(N)')
            cryptoMatrix[6].unshift('0->N')
            cryptoMatrix[7].unshift('C')
        } else {
            cryptoMatrix[0].unshift('C')
            cryptoMatrix[1].unshift('G')
            cryptoMatrix[2].unshift('C')
            cryptoMatrix[3].unshift('G')
            cryptoMatrix[4].unshift('C-G')
            cryptoMatrix[5].unshift('C-G+N')
            cryptoMatrix[6].unshift('mod(N)')
            cryptoMatrix[7].unshift('0->N')
            cryptoMatrix[8].unshift('T')
        }
        this.setState({ cryptoMatrix })
    }

    render() {

        const {
            title,
        } = this.props.content

        return (
            <div className="container">
                <div className="row">
                    <div className="col-md-12 col-xs-12">
                        <h3>{title}</h3>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-3 col-xs-12">
                        <FormGroupBlock calc={this.calc} />
                    </div>
                    <div className="col-md-9 col-xs-12 result">
                        <ResultBlock
                            codeMessage={this.state.codeMessage}
                            cryptoMatrix={this.state.cryptoMatrix}
                            isCoding={this.state.isCoding}
                            formattedKey={this.state.formattedKey}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-10 col-xs-12 descr">
                        <p>
                            Процесс зашифрования открытого текста с помощью гаммы называют также наложением гаммы,
                            или гаммированием. Перед зашифрованием, формируется двухстрочная запись,
                            где в одной строке последовательно выписаны знаки открытого текста,
                            а в другой - соответствующие знаки гаммы. Каждому знаку открытого текста
                            соответствует свой знак гаммы, т.е. они образуют вертикальные биграммы знаков.
                            Различают два вида гаммирования - модульное и табличное. Модульное наложение было
                            описано выше. При табличном гаммирование вертикальные пары, составленные из
                            соответствующих знаков открытого текста и гаммы, заменяются на знаки шифртекста по
                            некоторой таблице.
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default ModularGammaEncoding
