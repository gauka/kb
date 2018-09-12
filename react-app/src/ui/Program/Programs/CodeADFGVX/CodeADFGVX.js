import React from 'react'
import './CodeADFGVX.css'
import { getCryptoResult } from '../../../../math_logic/CodeADFGVX/code_adfgvx_math'

class FormGroupBlock extends React.Component {
    state = {
        message: 'АБУНАГИМОВ',
        key: 'ДЯДИНА',
    }

    render() {
        return (<div className="vertical-replace-code">
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
                    <label>Ключ</label>
                    <input
                        type="text"
                        className="form-control"
                        defaultValue={this.state.key}
                        onChange={(e) => { this.setState({ key: e.currentTarget.value }) }}
                    />
                </div>
                <button className="btn btn-primary" onClick={(e) => { this.props.calc(this.state.key, this.state.message, e) }}>Зашифровать сообщение</button>
            </form>
        </div>)
    }
}

const ResultBlock = ({ codeMessage, cryptoMatrix, ADFGVXsMatrix }) => (
    <div className="vertical-replace-code result">
        <div className="container">
            <div className="row">
                <div className="col-md-4 col-xs-12">
                    {ADFGVXsMatrix && cryptoMatrix.length > 0 &&
                        <div>
                            <h5>Таблица шифрозамен</h5>
                            <table className="table table-bordered">
                                <tbody>
                                    {ADFGVXsMatrix.map((row, indexRow) =>
                                        <tr key={indexRow}>
                                            {row.map((item, index) =>
                                                <td
                                                    key={index}
                                                    className={(index === 0 || indexRow === 0) ? 'main-adfgvx adfgvx' : 'adfgvx'}
                                                >
                                                    {item === undefined ? '*' : item}
                                                </td>
                                            )}
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
                <div className="col-md-4 col-xs-12">
                    {cryptoMatrix && cryptoMatrix.length > 0 &&
                        <div>
                            <h5>Шифрующая таблица</h5>
                            <table className="table table-bordered">
                                <tbody>
                                    {cryptoMatrix.map((row, indexRow) =>
                                        <tr key={indexRow} className={indexRow === 0 ? 'main' : ''}>
                                            {row.map((item, index) =>
                                                <td key={index}>{item === undefined ? '*' : item}</td>
                                            )}
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    }
                </div>
                <div className="col-md-4 col-xs-12" style={{ paddingLeft: '70px' }}>
                    {codeMessage &&
                        <div>
                            <h5>Зашифрованное сообщение</h5>
                            <p>{codeMessage}</p>
                        </div>
                    }
                </div>
            </div>
        </div>
    </div>

)

class CodeADFGVX extends React.Component {
    state = {
        codeMessage: '',
        cryptoMatrix: null,
        ADFGVXsMatrix: null,
    }

    calc = (key, message, e) => {
        e.preventDefault()
        const result = getCryptoResult(message, key)
        this.setState({ codeMessage: result.codeMessage })
        this.setState({ cryptoMatrix: result.cryptoMatrix })
        this.setState({ ADFGVXsMatrix: result.ADFGVXsMatrix })
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
                            ADFGVXsMatrix={this.state.ADFGVXsMatrix}
                        />
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-10 col-xs-12 descr">
                        <p>
                            ADFGVX-шифр — один из самых известных шифров времён Первой мировой войны,
                            который использовался немецкой армией на западном фронте. Особенность
                            шифра заключается в том, что он построен на соединении базовых операций
                            замены и перестановки. Часть шифра, отвечающая замене, основывается на
                            квадрате Полибия.
                        </p>
                    </div>
                </div>
            </div>
        )
    }
}

export default CodeADFGVX
